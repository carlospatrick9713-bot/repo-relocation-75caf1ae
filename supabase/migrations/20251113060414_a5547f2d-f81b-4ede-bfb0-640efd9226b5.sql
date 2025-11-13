-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view tourist photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own photos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own photos" ON storage.objects;

-- Create policy for users to upload their own photos
CREATE POLICY "Users can upload their own photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'tourist-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for anyone to view tourist photos
CREATE POLICY "Anyone can view tourist photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'tourist-photos');

-- Create policy for users to update their own photos
CREATE POLICY "Users can update their own photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'tourist-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy for users to delete their own photos
CREATE POLICY "Users can delete their own photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'tourist-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);