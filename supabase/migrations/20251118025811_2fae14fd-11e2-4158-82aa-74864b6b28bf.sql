-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('free', 'premium', 'admin');

-- Create user_roles table for proper role-based access control
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (expires_at IS NULL OR expires_at > now())
  )
$$;

-- Migrate existing premium users to role-based system
INSERT INTO public.user_roles (user_id, role, expires_at)
SELECT 
  id,
  'premium'::public.app_role,
  premium_expires_at
FROM public.profiles
WHERE is_premium = true
ON CONFLICT (user_id, role) DO NOTHING;

-- Insert free role for all users who don't have premium
INSERT INTO public.user_roles (user_id, role)
SELECT 
  id,
  'free'::public.app_role
FROM public.profiles
WHERE is_premium = false OR is_premium IS NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- RLS policies for user_roles table
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update RLS policies on tourist_photos to use role-based check
DROP POLICY IF EXISTS "Premium users can view all photos" ON public.tourist_photos;
CREATE POLICY "Premium users can view all photos"
ON public.tourist_photos
FOR SELECT
USING (public.has_role(auth.uid(), 'premium') OR public.has_role(auth.uid(), 'admin'));