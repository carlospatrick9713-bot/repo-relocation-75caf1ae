import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  lat: number;
  lng: number;
  risk_level: 'low' | 'medium' | 'high';
}

export function useTouristSpots() {
  return useQuery({
    queryKey: ['tourist-spots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tourist_spots')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as TouristSpot[];
    },
  });
}
