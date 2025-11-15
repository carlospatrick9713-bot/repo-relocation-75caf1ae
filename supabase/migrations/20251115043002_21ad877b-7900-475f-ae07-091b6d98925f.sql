-- Create a dedicated public bucket for cached TTS audio
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'slang-audio'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('slang-audio', 'slang-audio', true);
  END IF;
END $$;

-- Allow public read access to files in the 'slang-audio' bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND policyname = 'Public read for slang-audio'
  ) THEN
    CREATE POLICY "Public read for slang-audio"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'slang-audio');
  END IF;
END $$;