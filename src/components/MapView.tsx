import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import type { TouristSpot } from '@/hooks/useTouristSpots';
import type { Restaurant } from '@/hooks/useRestaurants';

const containerStyle = {
  width: '100%',
  height: '400px',
  minHeight: '400px'
};

const center = {
  lat: -22.9068,
  lng: -43.1729
};

interface DangerZone {
  name: string;
  level: 'low' | 'medium' | 'high';
  areas: string[];
}

interface MapViewProps {
  spots?: TouristSpot[];
  restaurants?: Restaurant[];
  dangerZones?: DangerZone[];
}

// Coordenadas das regiões do Rio de Janeiro
const regionCoordinates: Record<string, { lat: number; lng: number }[]> = {
  'Centro': [
    { lat: -22.895, lng: -43.215 },
    { lat: -22.895, lng: -43.165 },
    { lat: -22.925, lng: -43.165 },
    { lat: -22.925, lng: -43.215 },
  ],
  'Downtown': [
    { lat: -22.895, lng: -43.215 },
    { lat: -22.895, lng: -43.165 },
    { lat: -22.925, lng: -43.165 },
    { lat: -22.925, lng: -43.215 },
  ],
  'Zona Norte': [
    { lat: -22.850, lng: -43.320 },
    { lat: -22.850, lng: -43.220 },
    { lat: -22.920, lng: -43.220 },
    { lat: -22.920, lng: -43.320 },
  ],
  'North Zone': [
    { lat: -22.850, lng: -43.320 },
    { lat: -22.850, lng: -43.220 },
    { lat: -22.920, lng: -43.220 },
    { lat: -22.920, lng: -43.320 },
  ],
  'Zona Sul': [
    { lat: -22.940, lng: -43.230 },
    { lat: -22.940, lng: -43.160 },
    { lat: -23.020, lng: -43.160 },
    { lat: -23.020, lng: -43.230 },
  ],
  'South Zone': [
    { lat: -22.940, lng: -43.230 },
    { lat: -22.940, lng: -43.160 },
    { lat: -23.020, lng: -43.160 },
    { lat: -23.020, lng: -43.230 },
  ],
  'Zona Oeste': [
    { lat: -22.920, lng: -43.470 },
    { lat: -22.920, lng: -43.320 },
    { lat: -23.020, lng: -43.320 },
    { lat: -23.020, lng: -43.470 },
  ],
  'West Zone': [
    { lat: -22.920, lng: -43.470 },
    { lat: -22.920, lng: -43.320 },
    { lat: -23.020, lng: -43.320 },
    { lat: -23.020, lng: -43.470 },
  ],
};

const getLevelColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'high': return '#ef4444';
    case 'medium': return '#f59e0b';
    case 'low': return '#10b981';
  }
};

export default function MapView({ spots = [], restaurants = [], dangerZones = [] }: MapViewProps) {
  const { t } = useTranslation();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center bg-muted/10 h-[400px] rounded-lg">
        <div className="text-center space-y-4 p-8 max-w-md">
          <h3 className="text-lg font-semibold">Google Maps API Key não configurada</h3>
          <p className="text-sm text-muted-foreground">
            Adicione a variável de ambiente VITE_GOOGLE_MAPS_KEY nas configurações do projeto.
          </p>
        </div>
      </div>
    );
  }

  // Create polygons from danger zones
  const dangerPolygons = dangerZones.map(zone => {
    const paths = regionCoordinates[zone.name] || [];
    return {
      name: zone.name,
      paths,
      level: zone.level,
      color: getLevelColor(zone.level),
    };
  });

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {/* Danger zones */}
          {dangerPolygons.map((zone, index) => (
            <Polygon
              key={`${zone.name}-${index}`}
              paths={zone.paths}
              options={{
                fillColor: zone.color,
                fillOpacity: 0.3,
                strokeColor: zone.color,
                strokeOpacity: 0.8,
                strokeWeight: 2
              }}
            />
          ))}

          {/* Tourist spots */}
          {spots.map(spot => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              title={spot.name}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
          ))}

          {/* Restaurants */}
          {restaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              title={restaurant.name}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Legend */}
      {dangerZones.length > 0 && (
        <div className="absolute right-4 bottom-6 bg-background rounded-lg shadow-lg p-4 space-y-2 z-10">
          <h4 className="font-semibold text-sm mb-3">{t('securityAlerts.legend')}</h4>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
            <span>{t('securityAlerts.lowRisk')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm bg-[#f59e0b]" />
            <span>{t('securityAlerts.mediumRisk')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm bg-[#ef4444]" />
            <span>{t('securityAlerts.highRisk')}</span>
          </div>
        </div>
      )}
    </div>
  );
}
