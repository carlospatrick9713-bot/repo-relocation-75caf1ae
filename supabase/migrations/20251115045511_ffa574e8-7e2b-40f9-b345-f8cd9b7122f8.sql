-- Make tourist-photos bucket private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'tourist-photos';

-- Create RLS policies for storage objects
CREATE POLICY "Users can view own photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'tourist-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Premium users can view all photos"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'tourist-photos'
  AND EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_premium = true
  )
);

CREATE POLICY "Users can insert own photos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'tourist-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own photos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'tourist-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own photos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'tourist-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);