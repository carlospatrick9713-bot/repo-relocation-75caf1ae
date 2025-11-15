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
    const { text } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client for storage
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Create a safe filename from text (hash-like identifier)
    const textHash = Array.from(new TextEncoder().encode(text))
      .reduce((hash, byte) => ((hash << 5) - hash) + byte, 0)
      .toString(36);
    const fileName = `slang-audio/${textHash}.mp3`;

    console.log('Checking cache for:', fileName);

    // Check if audio already exists in storage
    const { data: existingFile } = await supabase.storage
      .from('tourist-photos')
      .download(fileName);

    if (existingFile) {
      console.log('Cache hit! Returning cached audio');
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

    console.log('Cache miss. Generating speech for:', text);

    // Deduplicate concurrent generations per text within this instance
    const doTTS = async (): Promise<ArrayBuffer> => {
      let lastErrorText = '';
      for (let attempt = 1; attempt <= 3; attempt++) {
        const res = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: text,
            voice: 'nova',
            response_format: 'mp3',
          }),
        });

        if (res.ok) {
          return await res.arrayBuffer();
        }

        const errBody = await res.text();
        lastErrorText = `status=${res.status} body=${errBody}`;
        console.warn('OpenAI TTS attempt failed:', attempt, lastErrorText);
        if (res.status === 429) {
          const retryAfterHeader = res.headers.get('retry-after');
          const retryMs = retryAfterHeader ? Number(retryAfterHeader) * 1000 : 500 * attempt + 1000;
          await new Promise((r) => setTimeout(r, retryMs));
          continue;
        } else {
          throw new Error(`OpenAI API error: ${res.status} ${errBody}`);
        }
      }
      throw new Error(`OpenAI API rate limited after retries: ${lastErrorText}`);
    };

    let promise = inFlight.get(fileName);
    if (!promise) {
      promise = doTTS().finally(() => inFlight.delete(fileName));
      inFlight.set(fileName, promise);
    }

    const arrayBuffer = await promise;
    
    // Cache the audio in storage (background task - fire and forget)
    const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    supabase.storage
      .from('tourist-photos')
      .upload(fileName, audioBlob, {
        contentType: 'audio/mpeg',
        upsert: true
      })
      .then(() => console.log('Audio cached successfully:', fileName))
      .catch(err => console.error('Failed to cache audio:', err));

    // Convert to base64 and return immediately
    const base64Audio = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
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
