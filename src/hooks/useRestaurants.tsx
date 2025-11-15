import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  price_range: string;
  average_price: number;
  hours: string;
  image: string;
  rating: number;
  lat: number;
  lng: number;
}

export function useRestaurants(cuisineFilter?: string) {
  return useQuery({
    queryKey: ['restaurants', cuisineFilter],
    queryFn: async () => {
      let query = supabase
        .from('restaurants')
        .select('*')
        .order('rating', { ascending: false });

      if (cuisineFilter && cuisineFilter !== 'all') {
        query = query.eq('cuisine', cuisineFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Restaurant[];
    },
  });
}
