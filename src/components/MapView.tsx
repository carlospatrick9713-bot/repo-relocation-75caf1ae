import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -22.9068,
  lng: -43.1729
};

// Zonas de risco (exemplo - áreas do Rio)
const riskZones = [
  {
    id: 'zone1',
    paths: [
      { lat: -22.88, lng: -43.25 },
      { lat: -22.88, lng: -43.20 },
      { lat: -22.92, lng: -43.20 },
      { lat: -22.92, lng: -43.25 },
    ],
    level: 'high',
    color: '#ef4444'
  },
  {
    id: 'zone2',
    paths: [
      { lat: -22.95, lng: -43.18 },
      { lat: -22.95, lng: -43.14 },
      { lat: -22.98, lng: -43.14 },
      { lat: -22.98, lng: -43.18 },
    ],
    level: 'medium',
    color: '#f59e0b'
  },
  {
    id: 'zone3',
    paths: [
      { lat: -22.97, lng: -43.20 },
      { lat: -22.97, lng: -43.16 },
      { lat: -23.00, lng: -43.16 },
      { lat: -23.00, lng: -43.20 },
    ],
    level: 'low',
    color: '#10b981'
  }
];

// Pontos turísticos
const touristSpots = [
  { id: 1, name: 'Cristo Redentor', lat: -22.9519, lng: -43.2105 },
  { id: 2, name: 'Pão de Açúcar', lat: -22.9489, lng: -43.1567 },
  { id: 3, name: 'Copacabana', lat: -22.9711, lng: -43.1822 },
  { id: 4, name: 'Ipanema', lat: -22.9838, lng: -43.2044 },
  { id: 5, name: 'Maracanã', lat: -22.9122, lng: -43.2302 }
];

export default function MapView() {
  const { t } = useTranslation();
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

  if (!apiKey) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/10">
        <div className="text-center space-y-4 p-8 max-w-md">
          <h3 className="text-lg font-semibold">Google Maps API Key não configurada</h3>
          <p className="text-sm text-muted-foreground">
            Adicione a variável de ambiente VITE_GOOGLE_MAPS_KEY nas configurações do projeto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
        >
          {/* Zonas de risco */}
          {riskZones.map(zone => (
            <Polygon
              key={zone.id}
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

          {/* Pontos turísticos */}
          {touristSpots.map(spot => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              title={spot.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {/* Legenda */}
      <div className="absolute right-4 bottom-6 bg-background rounded-lg shadow-lg p-4 space-y-2">
        <h4 className="font-semibold text-sm mb-3">{t('legend.title')}</h4>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-sm bg-[#10b981]" />
          <span>{t('legend.safe')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-sm bg-[#f59e0b]" />
          <span>{t('legend.moderate')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-sm bg-[#ef4444]" />
          <span>{t('legend.danger')}</span>
        </div>
      </div>
    </div>
  );
}
