import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Clock, MapPin, Crown } from 'lucide-react';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { usePremium } from '@/hooks/usePremium';
import { useAuth } from '@/hooks/useAuth';
import RiskBadge from '@/components/RiskBadge';
import PremiumCard from '@/components/PremiumCard';
import ConfirmExitDialog from '@/components/ConfirmExitDialog';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function SecurityAlerts() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { alerts, lastUpdate } = useSecurityAlerts();
  const { isPremium, isLoading } = usePremium();
  const { user, loading: authLoading } = useAuth();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000 / 60);
    
    if (diff < 1) return t('sidebar.timeAgo.now');
    if (diff < 60) return t('sidebar.timeAgo.minutes', { count: diff });
    const hours = Math.floor(diff / 60);
    return t('sidebar.timeAgo.hours', { count: hours });
  };

  const regionAlerts = [
    { 
      region: t('securityAlerts.regions.centro.name'), 
      level: 'medium' as const, 
      message: t('securityAlerts.regions.centro.message'), 
      areas: t('securityAlerts.regions.centro.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaNorte.name'), 
      level: 'high' as const, 
      message: t('securityAlerts.regions.zonaNorte.message'), 
      areas: t('securityAlerts.regions.zonaNorte.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaSul.name'), 
      level: 'low' as const, 
      message: t('securityAlerts.regions.zonaSul.message'), 
      areas: t('securityAlerts.regions.zonaSul.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaOeste.name'), 
      level: 'medium' as const, 
      message: t('securityAlerts.regions.zonaOeste.message'), 
      areas: t('securityAlerts.regions.zonaOeste.areas', { returnObjects: true }) as string[]
    },
  ];

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src={logo} 
              alt="Safe Trip" 
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => navigate('/')}
            />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <AppMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className={`container py-8 px-4 space-y-8 ${!isPremium && !isLoading ? 'blur-md pointer-events-none' : ''}`}>
        {/* Hero Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">{t('securityAlerts.title')}</h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-lg text-muted-foreground">
              {t('securityAlerts.subtitle')}
            </p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t('securityAlerts.updated')} {formatLastUpdate()}
              </span>
              <Badge variant="secondary">{t('securityAlerts.updatesEvery')}</Badge>
            </div>
          </div>
        </div>

        {/* Real-time Alerts */}
        <Card className="animate-fade-in border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t('securityAlerts.realTimeAlerts')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className="p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{alert.title}</h3>
                      <RiskBadge level={alert.level} />
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {alert.time === 'now' ? t('sidebar.timeAgo.now') : alert.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Regional Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regionAlerts.map((alert, index) => (
            <Card
              key={alert.region}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {alert.region}
                  </div>
                  <RiskBadge level={alert.level} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <div>
                  <div className="text-sm font-medium mb-2">{t('securityAlerts.mainAreas')}</div>
                  <div className="flex flex-wrap gap-2">
                    {alert.areas.map((area) => (
                      <Badge key={area} variant="secondary">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Premium Overlay */}
      {!isPremium && !isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/20">
          <div className="w-full max-w-md animate-fade-in">
            <PremiumCard />
          </div>
        </div>
      )}
    </div>

    <ConfirmExitDialog 
      open={showExitDialog} 
      onOpenChange={setShowExitDialog}
      onConfirm={() => navigate('/')}
    />
    </>
  );
}
