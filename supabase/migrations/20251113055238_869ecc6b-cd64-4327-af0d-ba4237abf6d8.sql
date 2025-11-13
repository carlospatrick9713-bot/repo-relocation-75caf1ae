-- Create function to delete user photos when user account is deleted
CREATE OR REPLACE FUNCTION public.delete_user_photos()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  photo_record RECORD;
BEGIN
  -- Delete all photos from storage for this user
  FOR photo_record IN 
    SELECT storage_path FROM public.tourist_photos WHERE user_id = OLD.id
  LOOP
    -- Delete from storage bucket
    PERFORM storage.delete_object('tourist-photos', photo_record.storage_path);
  END LOOP;
  
  -- Delete all photo records from database (CASCADE will handle this, but explicit is safer)
  DELETE FROM public.tourist_photos WHERE user_id = OLD.id;
  
  RETURN OLD;
END;
$$;

-- Create trigger to delete photos when user profile is deleted
CREATE TRIGGER on_profile_delete_photos
  BEFORE DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.delete_user_photos();

-- Also add ON DELETE CASCADE to tourist_photos table if not already present
-- This ensures photos are deleted if profile is deleted
ALTER TABLE public.tourist_photos
DROP CONSTRAINT IF EXISTS tourist_photos_user_id_fkey;

ALTER TABLE public.tourist_photos
ADD CONSTRAINT tourist_photos_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;