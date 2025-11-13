import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PremiumCard from './PremiumCard';
import TouristSpotCard from './TouristSpotCard';
import copacabanaImg from '@/assets/copacabana.jpg';
import paoDeAcucarImg from '@/assets/pao-de-acucar.jpg';

const alerts = [
  { id: 1, title: 'Centro', level: 'medium', message: 'Atenção redobrada após 22h' },
  { id: 2, title: 'Zona Norte', level: 'high', message: 'Evitar áreas isoladas' }
];

const touristSpots = [
  { id: 1, name: 'Cristo Redentor', risk: 'low' },
  { id: 2, name: 'Pão de Açúcar', risk: 'low', image: paoDeAcucarImg },
  { id: 3, name: 'Copacabana', risk: 'medium', image: copacabanaImg },
  { id: 4, name: 'Ipanema', risk: 'low' },
  { id: 5, name: 'Maracanã', risk: 'medium' }
];

export default function Sidebar() {
  const { t } = useTranslation();

  const getRiskBadge = (level: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      low: 'default',
      medium: 'secondary',
      high: 'destructive'
    };
    return (
      <Badge variant={variants[level] || 'default'} className="text-xs">
        {t(`sidebar.${level}`)}
      </Badge>
    );
  };

  return (
    <div className="w-80 border-r bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Premium Card */}
          <PremiumCard />

          {/* Alertas */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="w-4 h-4 text-destructive" />
                {t('sidebar.alerts')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('sidebar.noAlerts')}</p>
              ) : (
                alerts.map((alert, index) => (
                  <div 
                    key={alert.id} 
                    className="space-y-1 pb-3 border-b last:border-0 last:pb-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{alert.title}</span>
                      {getRiskBadge(alert.level)}
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Pontos Turísticos */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('sidebar.featured')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {touristSpots.map((spot, index) => (
                <div 
                  key={spot.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TouristSpotCard 
                    name={spot.name} 
                    risk={spot.risk}
                    image={spot.image}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
