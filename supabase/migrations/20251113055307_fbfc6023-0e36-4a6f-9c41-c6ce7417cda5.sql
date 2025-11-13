-- Add DELETE policy to profiles table to allow users to delete their own account
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = id);