import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import RiskBadge from './RiskBadge';

interface TouristSpotCardProps {
  name: string;
  risk: 'low' | 'medium' | 'high';
  image?: string;
}

export default function TouristSpotCard({ name, risk, image }: TouristSpotCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all duration-300 hover-scale cursor-pointer">
      {image && (
        <div className="h-24 overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm font-medium line-clamp-1">{name}</span>
          </div>
          <RiskBadge level={risk} />
        </div>
      </div>
    </div>
  );
}
