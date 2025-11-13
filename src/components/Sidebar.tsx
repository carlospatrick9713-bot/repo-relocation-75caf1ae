import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const alerts = [
  { id: 1, title: 'Centro', level: 'medium', message: 'Atenção redobrada após 22h' },
  { id: 2, title: 'Zona Norte', level: 'high', message: 'Evitar áreas isoladas' }
];

const touristSpots = [
  { id: 1, name: 'Cristo Redentor', risk: 'low' },
  { id: 2, name: 'Pão de Açúcar', risk: 'low' },
  { id: 3, name: 'Copacabana', risk: 'medium' },
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
      <Badge variant={variants[level] || 'default'}>
        {t(`sidebar.${level}`)}
      </Badge>
    );
  };

  return (
    <div className="w-80 border-r bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Alertas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="w-4 h-4" />
                {t('sidebar.alerts')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('sidebar.noAlerts')}</p>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className="space-y-1 pb-3 border-b last:border-0 last:pb-0">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="w-4 h-4" />
                {t('sidebar.touristSpots')}
              </CardTitle>
              <CardDescription className="text-xs">
                {t('sidebar.riskLevel')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {touristSpots.map(spot => (
                <div key={spot.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm">{spot.name}</span>
                  {getRiskBadge(spot.risk)}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
