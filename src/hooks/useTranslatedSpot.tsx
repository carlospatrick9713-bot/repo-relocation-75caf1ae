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

    // 🐛 DEBUG LOG: Verificando traduções no banco de dados
    console.log('🌍 [Translation Debug]', {
      spotId: spot.id,
      spotName: spot.name,
      currentLang,
      nameKey,
      hasNameTranslation: !!spot[nameKey],
      hasDescTranslation: !!spot[descKey],
      hasCatTranslation: !!spot[catKey],
      translatedName: spot[nameKey] || '(não encontrado)',
    });

    if (spot[nameKey] && spot[descKey] && spot[catKey]) {
      console.log('✅ Usando tradução do banco de dados');
      setTranslatedData({
        name: spot[nameKey] as string,
        description: spot[descKey] as string,
        category: spot[catKey] as string,
        tips: (spot as any).tips || [],
      });
      return;
    }

    console.log('⚠️ Tradução não encontrada no banco. Invocando edge function...');

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

        if (error) throw error;

        if (data) {
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
