import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mountain, Waves, Building2, Trees, Landmark, Church, Maximize2, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import touristMap from '@/assets/rio-tourist-map-illustrated.jpg';

interface MapMarker {
  id: number;
  name: string;
  icon: typeof MapPin;
  position: { top: string; left: string };
  color: string;
  region: 'north' | 'south' | 'west' | 'center';
}

export default function IllustrativeMap() {
  const { t } = useTranslation();
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mainAttractions: MapMarker[] = [
    { 
      id: 1, 
      name: 'Cristo Redentor', 
      icon: Mountain, 
      position: { top: '28%', left: '52%' },
      color: 'text-blue-500',
      region: 'north'
    },
    { 
      id: 2, 
      name: 'Pão de Açúcar', 
      icon: Mountain, 
      position: { top: '45%', left: '72%' },
      color: 'text-orange-500',
      region: 'south'
    },
    { 
      id: 3, 
      name: 'Copacabana', 
      icon: Waves, 
      position: { top: '68%', left: '48%' },
      color: 'text-cyan-500',
      region: 'south'
    },
    { 
      id: 4, 
      name: 'Ipanema', 
      icon: Waves, 
      position: { top: '72%', left: '35%' },
      color: 'text-teal-500',
      region: 'south'
    },
    { 
      id: 5, 
      name: 'Maracanã', 
      icon: Building2, 
      position: { top: '42%', left: '38%' },
      color: 'text-green-500',
      region: 'north'
    },
    { 
      id: 6, 
      name: 'Jardim Botânico', 
      icon: Trees, 
      position: { top: '52%', left: '30%' },
      color: 'text-emerald-500',
      region: 'west'
    },
    { 
      id: 7, 
      name: 'Arcos da Lapa', 
      icon: Landmark, 
      position: { top: '48%', left: '45%' },
      color: 'text-yellow-500',
      region: 'center'
    },
    { 
      id: 8, 
      name: 'Museu do Amanhã', 
      icon: Building2, 
      position: { top: '55%', left: '52%' },
      color: 'text-purple-500',
      region: 'center'
    },
    { 
      id: 9, 
      name: 'Pedra da Gávea', 
      icon: Mountain, 
      position: { top: '38%', left: '18%' },
      color: 'text-amber-500',
      region: 'west'
    },
    { 
      id: 10, 
      name: 'Floresta da Tijuca', 
      icon: Trees, 
      position: { top: '32%', left: '25%' },
      color: 'text-lime-500',
      region: 'north'
    },
    { 
      id: 11, 
      name: 'AquaRio', 
      icon: Waves, 
      position: { top: '58%', left: '60%' },
      color: 'text-blue-400',
      region: 'center'
    },
    { 
      id: 12, 
      name: 'Sambódromo', 
      icon: Building2, 
      position: { top: '50%', left: '48%' },
      color: 'text-pink-500',
      region: 'center'
    }
  ];

  const getRegionSpots = (region: string) => {
    return mainAttractions.filter(marker => marker.region === region);
  };

  const MapContent = ({ isFullscreenView = false }: { isFullscreenView?: boolean }) => (
    <div className={`relative w-full ${isFullscreenView ? 'h-screen' : 'aspect-[16/10]'} overflow-hidden`}>
      {/* Imagem do mapa turístico ilustrado */}
      <div className="absolute inset-0">
        <img 
          src={touristMap} 
          alt="Mapa Turístico Ilustrado do Rio de Janeiro" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10" />
      </div>
      
      {/* Overlay de interatividade */}
      <div className="absolute inset-0">
        {/* Regiões interativas */}
        <div 
          className={`absolute top-0 left-0 w-[35%] h-[50%] bg-primary/20 transition-all duration-500 cursor-pointer ${hoveredRegion === 'north' ? 'bg-primary/40 scale-105' : ''}`}
          style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}
          onMouseEnter={() => setHoveredRegion('north')}
          onMouseLeave={() => setHoveredRegion(null)}
        />
        <div 
          className={`absolute top-[35%] left-[10%] w-[30%] h-[40%] bg-emerald-500/20 transition-all duration-500 cursor-pointer ${hoveredRegion === 'west' ? 'bg-emerald-500/40 scale-105' : ''}`}
          style={{ clipPath: 'polygon(0 20%, 100% 0, 90% 100%, 0 100%)' }}
          onMouseEnter={() => setHoveredRegion('west')}
          onMouseLeave={() => setHoveredRegion(null)}
        />
        <div 
          className={`absolute top-[30%] left-[35%] w-[35%] h-[35%] bg-yellow-500/20 transition-all duration-500 cursor-pointer ${hoveredRegion === 'center' ? 'bg-yellow-500/40 scale-105' : ''}`}
          style={{ clipPath: 'polygon(10% 0, 100% 10%, 90% 90%, 0 100%)' }}
          onMouseEnter={() => setHoveredRegion('center')}
          onMouseLeave={() => setHoveredRegion(null)}
        />
        <div 
          className={`absolute top-[50%] left-[30%] w-[50%] h-[50%] bg-cyan-500/20 transition-all duration-500 cursor-pointer ${hoveredRegion === 'south' ? 'bg-cyan-500/40 scale-105' : ''}`}
          style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 20% 100%)' }}
          onMouseEnter={() => setHoveredRegion('south')}
          onMouseLeave={() => setHoveredRegion(null)}
        />
      </div>

      {/* Marcadores Animados */}
      {mainAttractions.map((marker) => {
        const Icon = marker.icon;
        const isHovered = hoveredMarker === marker.id;
        const isRegionHighlighted = hoveredRegion === marker.region;
        
        return (
          <div
            key={marker.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-500 ${isRegionHighlighted ? 'scale-125 z-20' : 'scale-100 z-10'}`}
            style={marker.position}
            onMouseEnter={() => setHoveredMarker(marker.id)}
            onMouseLeave={() => setHoveredMarker(null)}
          >
            {/* Pulso animado */}
            <div className={`absolute inset-0 w-12 h-12 rounded-full ${marker.color} opacity-20 animate-ping`} 
                 style={{ animationDuration: '2s' }} 
            />
            
            {/* Círculo de fundo */}
            <div className={`relative w-12 h-12 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border-2 ${marker.color.replace('text-', 'border-')} flex items-center justify-center transition-all duration-300 ${isHovered || isRegionHighlighted ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}`}>
              <Icon className={`w-6 h-6 ${marker.color} ${isHovered ? 'animate-bounce' : ''}`} />
            </div>

            {/* Label do ponto turístico */}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border whitespace-nowrap transition-all duration-300 ${isHovered || isRegionHighlighted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              <p className="text-xs font-semibold">{marker.name}</p>
            </div>

            {/* Linha conectora (ao hover) */}
            {(isHovered || isRegionHighlighted) && (
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

      {/* Botão de tela cheia */}
      {!isFullscreenView && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm"
          onClick={() => setIsFullscreen(true)}
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  return (
    <>
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
              12 {t('touristSpots.attractions')}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <MapContent />
        </CardContent>
      </Card>

      {/* Dialog de tela cheia */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[100vw] h-screen w-screen p-0 gap-0">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-30 bg-background/95 backdrop-blur-sm"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
          <MapContent isFullscreenView />
        </DialogContent>
      </Dialog>
    </>
  );
}
