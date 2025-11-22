/**
 * ⚠️ ATENÇÃO - REQUISITOS DE TRADUÇÃO:
 * 
 * Este hook depende das colunas de tradução na tabela 'tourist_spots' do Supabase.
 * As seguintes colunas DEVEM estar preenchidas para cada idioma suportado:
 * 
 * - name_en, name_es, name_fr, name_de (nome traduzido)
 * - description_en, description_es, description_fr, description_de (descrição traduzida)
 * - category_en, category_es, category_fr, category_de (categoria traduzida)
 * 
 * Se essas colunas estiverem vazias (null), o hook fará uma chamada à edge function
 * 'translate-tourist-spot' para gerar as traduções automaticamente.
 * 
 * Para verificar: Acesse o Lovable Cloud e inspecione os registros da tabela tourist_spots.
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { TouristSpot } from './useTouristSpots';

interface TranslatedSpot {
  name: string;
  description: string;
  category: string;
  tips?: string[];
}

export function useTranslatedSpot(spot: TouristSpot | null) {
  const { i18n } = useTranslation();
  const [translatedData, setTranslatedData] = useState<TranslatedSpot | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    if (!spot) {
      setTranslatedData(null);
      return;
    }

    const currentLang = i18n.language;
    
    // If Portuguese or translation already exists in the spot data, use it directly
    if (currentLang === 'pt' || currentLang === 'pt-BR') {
      setTranslatedData({
        name: spot.name,
        description: spot.description,
        category: spot.category,
        tips: (spot as any).tips || [],
      });
      return;
    }

    // Check if translation exists in the database
    const nameKey = `name_${currentLang}` as keyof TouristSpot;
    const descKey = `description_${currentLang}` as keyof TouristSpot;
    const catKey = `category_${currentLang}` as keyof TouristSpot;

    // 🔍 DEBUG: Log para verificar se as colunas traduzidas existem
    console.log('🌐 [useTranslatedSpot] Verificando tradução:', {
      spotId: spot.id,
      spotName: spot.name,
      targetLanguage: currentLang,
      translationColumns: {
        [nameKey]: spot[nameKey] || '❌ VAZIO',
        [descKey]: spot[descKey] || '❌ VAZIO',
        [catKey]: spot[catKey] || '❌ VAZIO',
      },
      hasAllTranslations: !!(spot[nameKey] && spot[descKey] && spot[catKey]),
    });

    if (spot[nameKey] && spot[descKey] && spot[catKey]) {
      console.log('✅ [useTranslatedSpot] Tradução encontrada no banco, usando diretamente');
      setTranslatedData({
        name: spot[nameKey] as string,
        description: spot[descKey] as string,
        category: spot[catKey] as string,
        tips: (spot as any).tips || [],
      });
      return;
    }

    console.log('⚠️ [useTranslatedSpot] Tradução não encontrada, chamando edge function...');

    // Need to translate
    const translateSpot = async () => {
      setIsTranslating(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate-tourist-spot', {
          body: {
            spotId: spot.id,
            targetLanguage: currentLang,
            spotData: {
              name: spot.name,
              description: spot.description,
              category: spot.category || '',
              tips: (spot as any).tips || [],
            },
          },
        });

        if (error) {
          console.error('❌ [useTranslatedSpot] Erro na edge function:', error);
          throw error;
        }

        if (data) {
          console.log('✅ [useTranslatedSpot] Tradução recebida da edge function:', data);
          setTranslatedData(data);
        }
      } catch (error) {
        console.error('Translation error:', error);
        // Fallback to original text
        setTranslatedData({
          name: spot.name,
          description: spot.description,
          category: spot.category,
          tips: (spot as any).tips || [],
        });
      } finally {
        setIsTranslating(false);
      }
    };

    translateSpot();
  }, [spot, i18n.language]);

  return {
    translatedData: translatedData || (spot ? {
      name: spot.name,
      description: spot.description,
      category: spot.category,
      tips: (spot as any).tips || [],
    } : null),
    isTranslating,
  };
}
