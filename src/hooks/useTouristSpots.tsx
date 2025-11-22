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
 * ⚠️ ATENÇÃO: TRADUÇÕES NO BANCO DE DADOS ⚠️
 * 
 * Para que as traduções funcionem corretamente, a tabela 'tourist_spots' 
 * DEVE ter as seguintes colunas preenchidas no Supabase:
 * 
 * - name_en, name_es, name_fr, name_de (nomes traduzidos)
 * - description_en, description_es, description_fr, description_de (descrições traduzidas)
 * - category_en, category_es, category_fr, category_de (categorias traduzidas)
 * 
 * ❌ SE NÃO ESTIVEREM PREENCHIDAS:
 * - O sistema tentará invocar a edge function 'translate-tourist-spot'
 * - Pode haver lentidão na exibição das traduções
 * - Em caso de erro, exibirá o texto original em português
 * 
 * 💡 DICA: Verifique os logs do console (🌍 [Translation Debug]) para depurar 
 * problemas de tradução e confirmar se as colunas estão populadas.
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
        // Se o campo de imagem estiver vazio ou inválido, usa placeholder
        if (!spot.image || spot.image.trim() === '') {
          return {
            ...spot,
            image: '', // Será tratado pelo componente TranslatedTouristSpotCard
          };
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
