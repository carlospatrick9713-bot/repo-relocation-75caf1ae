-- Add translation columns to tourist_spots table for multiple languages
ALTER TABLE public.tourist_spots
  ADD COLUMN IF NOT EXISTS name_en TEXT,
  ADD COLUMN IF NOT EXISTS name_es TEXT,
  ADD COLUMN IF NOT EXISTS name_fr TEXT,
  ADD COLUMN IF NOT EXISTS name_de TEXT,
  ADD COLUMN IF NOT EXISTS description_en TEXT,
  ADD COLUMN IF NOT EXISTS description_es TEXT,
  ADD COLUMN IF NOT EXISTS description_fr TEXT,
  ADD COLUMN IF NOT EXISTS description_de TEXT,
  ADD COLUMN IF NOT EXISTS category_en TEXT,
  ADD COLUMN IF NOT EXISTS category_es TEXT,
  ADD COLUMN IF NOT EXISTS category_fr TEXT,
  ADD COLUMN IF NOT EXISTS category_de TEXT;

-- Update the name column to be name_pt for clarity (Portuguese is the default)
COMMENT ON COLUMN public.tourist_spots.name IS 'Name in Portuguese (default language)';
COMMENT ON COLUMN public.tourist_spots.description IS 'Description in Portuguese (default language)';
COMMENT ON COLUMN public.tourist_spots.category IS 'Category in Portuguese (default language)';