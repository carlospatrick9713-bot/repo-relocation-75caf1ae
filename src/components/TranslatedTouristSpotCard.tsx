import { Card, CardContent } from '@/components/ui/card';
import RiskBadge from './RiskBadge';
import { TouristSpot } from '@/hooks/useTouristSpots';
import { useTranslatedSpot } from '@/hooks/useTranslatedSpot';
import { Loader2, ImageOff } from 'lucide-react';
import { useState } from 'react';
import noImagePlaceholder from '@/assets/no-image.png';

interface TranslatedTouristSpotCardProps {
  spot: TouristSpot;
  onClick: () => void;
}

export default function TranslatedTouristSpotCard({ spot, onClick }: TranslatedTouristSpotCardProps) {
  const { translatedData, isTranslating } = useTranslatedSpot(spot);
  const [imageError, setImageError] = useState(false);
  
  const hasValidImage = spot.image && !imageError;
  const imageUrl = hasValidImage ? spot.image : noImagePlaceholder;

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {hasValidImage ? (
          <img 
            src={imageUrl} 
            alt={translatedData?.name || spot.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              setImageError(true);
              e.currentTarget.src = noImagePlaceholder;
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <ImageOff className="w-12 h-12 text-muted-foreground/40" />
            <span className="text-sm text-muted-foreground/60 font-medium">Sem imagem</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 flex-1 flex items-center gap-2">
            {isTranslating && <Loader2 className="w-3 h-3 animate-spin flex-shrink-0" />}
            {translatedData?.name || spot.name}
          </h3>
          <RiskBadge level={spot.risk_level} />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {translatedData?.description || spot.description}
        </p>
      </CardContent>
    </Card>
  );
}
