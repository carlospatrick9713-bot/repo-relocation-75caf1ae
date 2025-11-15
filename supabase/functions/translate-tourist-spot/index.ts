import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { spotId, targetLanguage } = await req.json();

    if (!spotId || !targetLanguage) {
      throw new Error("spotId and targetLanguage are required");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the tourist spot data
    const { data: spot, error: spotError } = await supabase
      .from("tourist_spots")
      .select("*")
      .eq("id", spotId)
      .single();

    if (spotError || !spot) {
      throw new Error("Tourist spot not found");
    }

    // Check if translation already exists
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

    // Translate using Lovable AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
    };

    const prompt = `Translate the following tourist spot information to ${languageNames[targetLanguage]}. Keep the same tone and meaning. Return ONLY a JSON object with "name", "description", and "category" fields, no additional text.

Original (Portuguese):
Name: ${spot.name}
Description: ${spot.description}
Category: ${spot.category}`;

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
      const errorText = await aiResponse.text();
      console.error("AI translation error:", aiResponse.status, errorText);
      throw new Error("Translation failed");
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

    // Save translation to database
    const updateData: any = {};
    updateData[nameCol] = translation.name;
    updateData[descCol] = translation.description;
    updateData[catCol] = translation.category;

    const { error: updateError } = await supabase
      .from("tourist_spots")
      .update(updateData)
      .eq("id", spotId);

    if (updateError) {
      console.error("Failed to save translation:", updateError);
      // Still return the translation even if save fails
    }

    return new Response(
      JSON.stringify(translation),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Translation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Translation failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
