/**
 * ⚠️ ATENÇÃO CRÍTICA: CONFIGURAÇÃO DO BUCKET DE IMAGENS ⚠️
 * 
 * Para que as imagens dos pontos turísticos sejam exibidas corretamente,
 * o bucket 'tourist-spot-images' DEVE estar configurado como 'Public Bucket'
 * no painel do Supabase (Storage > tourist-spot-images > Settings > Public bucket).
 * 
 * ❌ SEM ESSA CONFIGURAÇÃO:
 * - As URLs públicas geradas retornarão erro 404/403
 * - As imagens NÃO carregarão na aplicação
 * - Você verá apenas placeholders de imagem quebrada
 * 
 * ✅ COMO CONFIGURAR:
 * 1. Acesse o painel do Supabase
 * 2. Vá em Storage > tourist-spot-images
 * 3. Clique em Settings
 * 4. Ative a opção "Public bucket"
 * 5. Salve as alterações
 * 
 * Certifique-se de que o bucket 'tourist-spot-images' está definido como 
 * PÚBLICO para que as URLs funcionem corretamente.
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

      // 3. Transforma o campo 'image' de path para uma URL pública
      const spotsWithPublicUrls = data.map((spot) => {
        // Tratamento de nulos: mantém como está se não houver imagem
        if (!spot.image) {
          return {
            ...spot,
            image: '', // String vazia para fallback no componente UI
          };
        }

        // Verifica se é um path local do projeto (começa com /src/ ou path relativo)
        // Paths locais são mantidos como estão para o Vite processar
        if (spot.image.startsWith('/src/') || spot.image.startsWith('src/') || spot.image.startsWith('./')) {
          return {
            ...spot,
            image: spot.image,
          };
        }

        // Para paths do Supabase Storage, gera a URL pública completa
        const { data: imageUrlData } = supabase.storage
          .from(IMAGE_BUCKET_NAME)
          .getPublicUrl(spot.image);
        
        // Retorna o objeto do spot com o campo 'image' como URL pública
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
