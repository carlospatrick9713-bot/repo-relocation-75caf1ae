import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mountain, Waves, Building2, Trees, Landmark, Church } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MapMarker {
  id: number;
  name: string;
  icon: typeof MapPin;
  position: { top: string; left: string };
  color: string;
}

export default function IllustrativeMap() {
  const { t } = useTranslation();
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const mainAttractions: MapMarker[] = [
    { 
      id: 1, 
      name: 'Cristo Redentor', 
      icon: Mountain, 
      position: { top: '25%', left: '55%' },
      color: 'text-blue-500'
    },
    { 
      id: 2, 
      name: 'Pão de Açúcar', 
      icon: Mountain, 
      position: { top: '60%', left: '65%' },
      color: 'text-orange-500'
    },
    { 
      id: 3, 
      name: 'Copacabana', 
      icon: Waves, 
      position: { top: '70%', left: '50%' },
      color: 'text-cyan-500'
    },
    { 
      id: 4, 
      name: 'Ipanema', 
      icon: Waves, 
      position: { top: '75%', left: '40%' },
      color: 'text-teal-500'
    },
    { 
      id: 5, 
      name: 'Maracanã', 
      icon: Building2, 
      position: { top: '35%', left: '45%' },
      color: 'text-green-500'
    },
    { 
      id: 6, 
      name: 'Jardim Botânico', 
      icon: Trees, 
      position: { top: '50%', left: '35%' },
      color: 'text-emerald-500'
    },
    { 
      id: 7, 
      name: 'Santa Teresa', 
      icon: Church, 
      position: { top: '40%', left: '55%' },
      color: 'text-purple-500'
    },
    { 
      id: 8, 
      name: 'Lapa', 
      icon: Landmark, 
      position: { top: '45%', left: '60%' },
      color: 'text-yellow-500'
    },
    { 
      id: 9, 
      name: 'Lagoa Rodrigo de Freitas', 
      icon: Waves, 
      position: { top: '55%', left: '40%' },
      color: 'text-blue-400'
    },
    { 
      id: 10, 
      name: 'Parque Lage', 
      icon: Trees, 
      position: { top: '30%', left: '50%' },
      color: 'text-lime-500'
    }
  ];

  return (
    <Card className="overflow-hidden border-2 border-primary/20 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="w-6 h-6 text-primary" />
              {t('touristSpots.mapTitle')}
            </CardTitle>
            <CardDescription className="mt-1">
              {t('touristSpots.mapDescription')}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/20">
            10 {t('touristSpots.attractions')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
          {/* Ilustração de fundo estilo satélite */}
          <div className="absolute inset-0">
            {/* Oceano */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-blue-200/20 to-cyan-300/30 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-cyan-900/30" />
            
            {/* Área terrestre */}
            <div className="absolute top-0 left-0 w-[70%] h-full bg-gradient-to-br from-green-200/40 via-green-100/30 to-yellow-100/20 dark:from-green-900/40 dark:via-green-800/30 dark:to-yellow-900/20" 
                 style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} 
            />
            
            {/* Morros e montanhas (ilustrativo) */}
            <div className="absolute top-[20%] left-[50%] w-32 h-32 rounded-full bg-gradient-radial from-green-300/50 to-transparent dark:from-green-700/50 blur-2xl" />
            <div className="absolute top-[55%] left-[60%] w-24 h-24 rounded-full bg-gradient-radial from-green-400/40 to-transparent dark:from-green-600/40 blur-2xl" />
            <div className="absolute top-[35%] left-[40%] w-28 h-28 rounded-full bg-gradient-radial from-emerald-300/40 to-transparent dark:from-emerald-700/40 blur-2xl" />
            
            {/* Lagoa */}
            <div className="absolute top-[50%] left-[35%] w-20 h-16 rounded-full bg-gradient-radial from-blue-400/60 to-cyan-300/40 dark:from-blue-600/60 dark:to-cyan-700/40 blur-md" />
            
            {/* Grid decorativo */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5" 
                 style={{ 
                   backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                   backgroundSize: '50px 50px'
                 }} 
            />
          </div>

          {/* Marcadores Animados */}
          {mainAttractions.map((marker) => {
            const Icon = marker.icon;
            const isHovered = hoveredMarker === marker.id;
            
            return (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={marker.position}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Pulso animado */}
                <div className={`absolute inset-0 w-12 h-12 rounded-full ${marker.color} opacity-20 animate-ping`} 
                     style={{ animationDuration: '2s' }} 
                />
                
                {/* Círculo de fundo */}
                <div className={`relative w-12 h-12 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border-2 ${marker.color.replace('text-', 'border-')} flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`}>
                  <Icon className={`w-6 h-6 ${marker.color} ${isHovered ? 'animate-bounce' : ''}`} />
                </div>

                {/* Label do ponto turístico */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <p className="text-xs font-semibold">{marker.name}</p>
                </div>

                {/* Linha conectora (ao hover) */}
                {isHovered && (
                  <div className={`absolute top-1/2 left-1/2 w-px h-16 ${marker.color.replace('text-', 'bg-')} opacity-50 animate-fade-in`} />
                )}
              </div>
            );
          })}

          {/* Legenda */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border px-4 py-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">{t('touristSpots.hoverToExplore')}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
