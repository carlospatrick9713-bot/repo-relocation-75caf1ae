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
  name_en?: string;
  name_es?: string;
  name_fr?: string;
  name_de?: string;
  description_en?: string;
  description_es?: string;
  description_fr?: string;
  description_de?: string;
  category_en?: string;
  category_es?: string;
  category_fr?: string;
  category_de?: string;
}

export function useTouristSpots() {
  return useQuery({
    queryKey: ['tourist-spots'],
    queryFn: async () => {
      // 1. Defina o nome do seu bucket público de imagens no Supabase
      const IMAGE_BUCKET_NAME = 'tourist-spot-images'; // <-- Altere aqui se o nome do seu bucket for outro

      // 2. Busca os dados da tabela normalmente
      const { data, error } = await supabase
        .from('tourist_spots')
        .select('*')
        .order('name');

      if (error) throw error;

      // 3. Transforma o campo 'image' de path para uma URL pública
      const spotsWithPublicUrls = data.map((spot) => {
        // Ignora se o campo de imagem estiver vazio
        if (!spot.image) {
          return spot;
        }

        // Gera a URL pública usando o path (spot.image)
        const { data: imageUrlData } = supabase.storage
          .from(IMAGE_BUCKET_NAME)
          .getPublicUrl(spot.image); // spot.image é o path/nome do arquivo
        
        // Retorna o objeto do spot com o campo 'image' atualizado
        return {
          ...spot,
          image: imageUrlData.publicUrl,
        };
      });

      // 4. Retorna os dados transformados
      return spotsWithPublicUrls as TouristSpot[];
    },
  });
}
