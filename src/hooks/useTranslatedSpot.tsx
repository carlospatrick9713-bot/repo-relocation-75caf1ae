import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { TouristSpot } from './useTouristSpots';

interface TranslatedSpot {
  name: string;
  description: string;
  category: string;
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
      });
      return;
    }

    // Check if translation exists in the database
    const nameKey = `name_${currentLang}` as keyof TouristSpot;
    const descKey = `description_${currentLang}` as keyof TouristSpot;
    const catKey = `category_${currentLang}` as keyof TouristSpot;

    if (spot[nameKey] && spot[descKey] && spot[catKey]) {
      setTranslatedData({
        name: spot[nameKey] as string,
        description: spot[descKey] as string,
        category: spot[catKey] as string,
      });
      return;
    }

    // Need to translate
    const translateSpot = async () => {
      setIsTranslating(true);
      try {
        const { data, error } = await supabase.functions.invoke('translate-tourist-spot', {
          body: {
            spotId: spot.id,
            targetLanguage: currentLang,
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
    } : null),
    isTranslating,
  };
}
