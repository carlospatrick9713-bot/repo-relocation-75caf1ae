import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DEBUG = Deno.env.get('DEBUG') === 'true';

const spotDataSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  category: z.string().min(1).max(100),
  tips: z.array(z.string().max(500)).max(10).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { spotId, targetLanguage, spotData } = await req.json();

    if (!targetLanguage) {
      return new Response(
        JSON.stringify({ error: 'Target language is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (DEBUG) {
      console.log('Processing translation request');
    }

    // Validate spotData if provided
    if (spotData) {
      try {
        spotDataSchema.parse(spotData);
      } catch (validationError) {
        if (DEBUG) {
          console.error('[INTERNAL] Validation error:', validationError);
        }
        return new Response(
          JSON.stringify({ error: 'Invalid input data' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let spot = spotData;
    
    // Only fetch from database if spotData is not provided and spotId is a UUID
    if (!spot && spotId && typeof spotId === 'string' && spotId.includes('-')) {
      const { data: dbSpot, error: spotError } = await supabase
        .from("tourist_spots")
        .select("*")
        .eq("id", spotId)
        .maybeSingle();

      if (spotError) {
        if (DEBUG) {
          console.error('[INTERNAL] Database error:', spotError);
        }
        return new Response(
          JSON.stringify({ error: 'Unable to process request' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      spot = dbSpot;
    }

    if (!spot) {
      return new Response(
        JSON.stringify({ error: 'Tourist spot data not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if translation already exists in database (only for Supabase spots)
    if (spotId && typeof spotId === 'string' && spotId.includes('-')) {
      const nameCol = `name_${targetLanguage}`;
      const descCol = `description_${targetLanguage}`;
      const catCol = `category_${targetLanguage}`;

      if (spot[nameCol] && spot[descCol] && spot[catCol]) {
        return new Response(
          JSON.stringify({
            name: spot[nameCol],
            description: spot[descCol],
            category: spot[catCol],
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Translate using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      if (DEBUG) {
        console.error('[INTERNAL] LOVABLE_API_KEY not configured');
      }
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
    };

    const prompt = `Translate the following tourist spot information to ${languageNames[targetLanguage]}. Keep the same tone and meaning. Return ONLY a JSON object with "name", "description", "category", and "tips" (array of strings) fields, no additional text.

Original (Portuguese):
Name: ${spot.name}
Description: ${spot.description}
Category: ${spot.category}
${spot.tips && spot.tips.length > 0 ? `Tips:\n${spot.tips.map((tip: string, i: number) => `${i + 1}. ${tip}`).join('\n')}` : 'Tips: None'}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a professional translator. Return only valid JSON without any markdown formatting or code blocks.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (DEBUG) {
        const errorText = await aiResponse.text();
        console.error("[INTERNAL] AI translation error:", aiResponse.status, errorText);
      }
      return new Response(
        JSON.stringify({ error: 'Translation service unavailable' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const translatedText = aiData.choices[0].message.content.trim();
    
    // Remove markdown code blocks if present
    let cleanedText = translatedText;
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    
    const translation = JSON.parse(cleanedText);

    // Save translation to database only if spot has a UUID
    if (spotId && typeof spotId === 'string' && spotId.includes('-')) {
      const nameCol = `name_${targetLanguage}`;
      const descCol = `description_${targetLanguage}`;
      const catCol = `category_${targetLanguage}`;
      
      const updateData: any = {};
      updateData[nameCol] = translation.name;
      updateData[descCol] = translation.description;
      updateData[catCol] = translation.category;

      const { error: updateError } = await supabase
        .from("tourist_spots")
        .update(updateData)
        .eq("id", spotId);

      if (updateError && DEBUG) {
        console.error("[INTERNAL] Failed to save translation:", updateError);
      }
    } else if (DEBUG) {
      console.log("Skipping database save for local spot data");
    }

    return new Response(
      JSON.stringify(translation),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    if (DEBUG) {
      console.error('[INTERNAL] Translation error:', error);
    }
    return new Response(
      JSON.stringify({ error: 'Unable to process translation' }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
