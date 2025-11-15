-- Create tourist_spots table
CREATE TABLE public.tourist_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create restaurants table
CREATE TABLE public.restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  description TEXT NOT NULL,
  price_range TEXT NOT NULL,
  average_price DOUBLE PRECISION NOT NULL,
  hours TEXT NOT NULL,
  image TEXT NOT NULL,
  rating DOUBLE PRECISION NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create security_alerts table
CREATE TABLE public.security_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_key TEXT NOT NULL,
  message_key TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('warning', 'danger', 'info')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tourist_spots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

-- Public read access policies (no authentication required)
CREATE POLICY "Anyone can view tourist spots"
  ON public.tourist_spots FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view restaurants"
  ON public.restaurants FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view active security alerts"
  ON public.security_alerts FOR SELECT
  USING (is_active = true);

-- Create updated_at triggers
CREATE TRIGGER update_tourist_spots_updated_at
  BEFORE UPDATE ON public.tourist_spots
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_restaurants_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_security_alerts_updated_at
  BEFORE UPDATE ON public.security_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();