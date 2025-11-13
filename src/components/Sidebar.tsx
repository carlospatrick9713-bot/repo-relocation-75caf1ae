import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Sparkles, Bell } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PremiumCard from './PremiumCard';
import TouristSpotCard from './TouristSpotCard';
import RiskBadge from './RiskBadge';
import copacabanaImg from '@/assets/copacabana.jpg';
import paoDeAcucarImg from '@/assets/pao-de-acucar.jpg';
import cristoRedentorImg from '@/assets/cristo-redentor.jpg';
import ipanemaImg from '@/assets/ipanema.jpg';
import maracanaImg from '@/assets/maracana.jpg';

const alerts = [
  { id: 1, title: 'Centro', level: 'medium' as const, message: 'Atenção redobrada após 22h' },
  { id: 2, title: 'Zona Norte', level: 'high' as const, message: 'Evitar áreas isoladas' }
];

const notifications = [
  { 
    id: 1, 
    title: 'Zona de Alto Risco Detectada', 
    level: 'high' as const, 
    message: 'Você está se aproximando de uma área com alto índice de criminalidade',
    time: 'now'
  },
  { 
    id: 2, 
    title: 'Alerta de Trânsito', 
    level: 'medium' as const, 
    message: 'Manifestação reportada na Av. Rio Branco',
    time: '15m'
  },
  { 
    id: 3, 
    title: 'Condições Seguras', 
    level: 'low' as const, 
    message: 'Zona Sul apresenta baixos índices neste horário',
    time: '1h'
  }
];

const touristSpots = [
  { id: 1, name: 'Cristo Redentor', risk: 'low' as const, image: cristoRedentorImg },
  { id: 2, name: 'Pão de Açúcar', risk: 'low' as const, image: paoDeAcucarImg },
  { id: 3, name: 'Copacabana', risk: 'medium' as const, image: copacabanaImg },
  { id: 4, name: 'Ipanema', risk: 'low' as const, image: ipanemaImg },
  { id: 5, name: 'Maracanã', risk: 'medium' as const, image: maracanaImg }
];

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <div className="w-80 border-r bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 space-y-4">
          {/* Premium Card */}
          <PremiumCard />

          {/* Tabs para Alertas e Notificações */}
          <Card className="animate-fade-in">
            <Tabs defaultValue="alerts" className="w-full">
              <CardHeader className="pb-3">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="alerts" className="text-xs">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {t('sidebar.alerts')}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="text-xs">
                    <Bell className="w-3 h-3 mr-1" />
                    {t('sidebar.notifications')}
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="pt-0">
                <TabsContent value="alerts" className="mt-0 space-y-3">
                  {alerts.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {t('sidebar.noAlerts')}
                    </p>
                  ) : (
                    alerts.map((alert, index) => (
                      <div 
                        key={alert.id} 
                        className="space-y-2 pb-3 border-b last:border-0 last:pb-0 animate-fade-in hover:bg-muted/30 p-2 rounded-lg transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{alert.title}</span>
                          <RiskBadge level={alert.level} />
                        </div>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                      </div>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="notifications" className="mt-0 space-y-3">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {t('sidebar.noNotifications')}
                    </p>
                  ) : (
                    notifications.map((notification, index) => (
                      <div 
                        key={notification.id} 
                        className="space-y-2 pb-3 border-b last:border-0 last:pb-0 animate-fade-in hover:bg-muted/30 p-2 rounded-lg transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-sm flex-1">{notification.title}</span>
                          <RiskBadge level={notification.level} />
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                        <span className="text-xs text-muted-foreground/60">
                          {notification.time === 'now' ? t('sidebar.timeAgo.now') : notification.time}
                        </span>
                      </div>
                    ))
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
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
