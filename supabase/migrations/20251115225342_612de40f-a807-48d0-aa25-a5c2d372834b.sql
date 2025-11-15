-- Add input validation to handle_new_user function to prevent malicious metadata injection
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_full_name TEXT;
BEGIN
  -- Validate and sanitize full_name
  v_full_name := TRIM(COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  
  -- Enforce length limit (100 characters max)
  IF LENGTH(v_full_name) > 100 THEN
    v_full_name := SUBSTRING(v_full_name, 1, 100);
  END IF;
  
  -- Remove potentially dangerous characters (allow alphanumeric, spaces, hyphens, apostrophes, periods)
  v_full_name := REGEXP_REPLACE(v_full_name, '[^a-zA-Z0-9\s\-''.]', '', 'g');
  
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, v_full_name);
  
  RETURN NEW;
END;
$$;