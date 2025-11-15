import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const inFlight = new Map<string, Promise<ArrayBuffer>>();
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { text } = await req.json();

    // Validate text input
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (text.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Text must be 500 characters or less' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!LOVABLE_API_KEY) {
      console.error('[INTERNAL] Lovable API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client for storage
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Create a safe filename from text (hash-like identifier)
    const textHash = Array.from(new TextEncoder().encode(text))
      .reduce((hash, byte) => ((hash << 5) - hash) + byte, 0)
      .toString(36);
    const fileName = `slang-audio/${textHash}.mp3`;

    // Check if audio already exists in storage
    const { data: existingFile } = await supabase.storage
      .from('tourist-photos')
      .download(fileName);

    if (existingFile) {
      const arrayBuffer = await existingFile.arrayBuffer();
      const base64Audio = btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      );

      return new Response(
        JSON.stringify({ audioContent: base64Audio }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Deduplicate concurrent generations per text within this instance
    const doTTS = async (): Promise<ArrayBuffer> => {
      // Use Lovable AI to generate a natural pronunciation guide
      const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            {
              role: 'system',
              content: 'You are a Brazilian Portuguese pronunciation expert. Generate a phonetic guide for the text in Brazilian Portuguese, breaking it into syllables with stress marks. Be very brief and practical.'
            },
            {
              role: 'user',
              content: `Create a simple phonetic pronunciation guide for: "${text}"`
            }
          ],
        }),
      });

      if (!aiResponse.ok) {
        throw new Error(`AI generation failed: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      const pronunciationGuide = aiData.choices[0].message.content;

      // Create a simple text response as fallback (no actual audio)
      // This will be shown to the user as a pronunciation guide
      const textContent = `📢 Pronúncia: ${pronunciationGuide}\n\n"${text}"`;
      const encoder = new TextEncoder();
      return encoder.encode(textContent).buffer;
    };

    let promise = inFlight.get(fileName);
    if (!promise) {
      promise = doTTS().finally(() => inFlight.delete(fileName));
      inFlight.set(fileName, promise);
    }

    const arrayBuffer = await promise;
    
    // Cache the result in storage (background task - fire and forget)
    const audioBlob = new Blob([arrayBuffer], { type: 'text/plain' });
    supabase.storage
      .from('slang-audio')
      .upload(fileName, audioBlob, {
        contentType: 'text/plain',
        upsert: true
      })
      .then(() => console.log('Guide cached successfully:', fileName))
      .catch(err => console.error('Failed to cache guide:', err));

    // Convert to base64 and return immediately
    const base64Content = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    return new Response(
      JSON.stringify({ 
        pronunciationGuide: new TextDecoder().decode(arrayBuffer),
        audioContent: base64Content 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
