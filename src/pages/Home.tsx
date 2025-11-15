import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { useTouristSpots } from '@/hooks/useTouristSpots';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import TranslatedTouristSpotCard from '@/components/TranslatedTouristSpotCard';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import { useState } from 'react';
import { TouristSpot } from '@/hooks/useTouristSpots';
import LanguageSelector from '@/components/LanguageSelector';
import AppMenu from '@/components/AppMenu';
import { Shield } from 'lucide-react';
import mapImage from '@/assets/rio-pois-map-v4.png';

export default function Home() {
  const { t } = useTranslation();
  const { data: spots = [] } = useTouristSpots();
  const { alerts = [] } = useSecurityAlerts();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  const featuredSpots = spots.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">{t('common.home')}</h1>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <AppMenu />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Featured Tourist Spots */}
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('tourist.highlights')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpots.map((spot) => (
              <TranslatedTouristSpotCard
                key={spot.id}
                spot={spot}
                onClick={() => setSelectedSpot(spot)}
              />
            ))}
          </div>
        </section>

        {/* Map Image */}
        <section>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={mapImage} 
                alt="Mapa de Pontos Turísticos do Rio" 
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </section>

        {/* Security Alerts Summary */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">{t('security.alerts')}</h2>
          </div>
          
          {alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.slice(0, 3).map((alert) => (
                <Card key={alert.id} className={`border-l-4 ${
                  alert.level === 'high' 
                    ? 'border-l-red-500' 
                    : alert.level === 'medium' 
                    ? 'border-l-yellow-500' 
                    : 'border-l-blue-500'
                }`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                {t('security.noAlerts')}
              </CardContent>
            </Card>
          )}
        </section>
      </div>

      <TouristSpotDialog
        spot={selectedSpot}
        open={selectedSpot !== null}
        onOpenChange={(open) => !open && setSelectedSpot(null)}
      />
    </div>
  );
}
