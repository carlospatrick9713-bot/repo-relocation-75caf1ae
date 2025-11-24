/**
 * ⚠️ ATENÇÃO: MIGRAÇÃO DE IMAGENS ⚠️
 * 
 * Este hook busca dados de pontos turísticos do Supabase e gera URLs públicas
 * para as imagens armazenadas no bucket 'tourist-spot-images'.
 * 
 * 🔧 MIGRAÇÃO AUTOMÁTICA DISPONÍVEL:
 * - Acesse o menu do app (usuário logado)
 * - Clique em "Migrar Imagens para Storage"
 * - O processo fará upload automático das imagens e atualizará o banco
 * 
 * ✅ REQUISITOS:
 * 1. O bucket 'tourist-spot-images' DEVE estar configurado como PÚBLICO
 * 2. Após a migração, os paths no banco devem ser apenas nomes de arquivo
 *    (ex: 'cristo-redentor.jpg' em vez de '/src/assets/cristo-redentor.jpg')
 * 
 * ❌ SEM O BUCKET PÚBLICO:
 * - As URLs geradas retornarão erro 404/403
 * - As imagens não carregarão na aplicação
 */

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

      // 3. Transforma o campo 'image' de path para uma URL pública do Supabase Storage
      const spotsWithPublicUrls = data.map((spot) => {
        // Tratamento de nulos: mantém string vazia se não houver imagem
        if (!spot.image) {
          return {
            ...spot,
            image: '',
          };
        }

        // Gera a URL pública completa do Supabase Storage
        // Após a migração, todos os paths devem ser apenas nomes de arquivo (ex: 'cristo-redentor.jpg')
        const { data: imageUrlData } = supabase.storage
          .from(IMAGE_BUCKET_NAME)
          .getPublicUrl(spot.image);
        
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
