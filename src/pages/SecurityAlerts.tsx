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
import LanguageSelector from '@/components/LanguageSelector';
import MapView from '@/components/MapView';
import { useRealSecurityData } from '@/hooks/useRealSecurityData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Info } from 'lucide-react';

export default function SecurityAlerts() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isPremium, isLoading } = usePremium();
  const { user, loading: authLoading } = useAuth();
  const { alerts, lastUpdate } = useSecurityAlerts(isPremium);
  const { data: realData, isLoading: loadingRealData } = useRealSecurityData(isPremium);
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
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AppMenu />
          </div>
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

        {/* Danger Zone Map */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t('securityAlerts.dangerZoneMap')}
            </CardTitle>
            <CardDescription>
              {t('securityAlerts.dangerZoneMapDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapView 
              spots={[]} 
              restaurants={[]}
              dangerZones={regionAlerts.map(alert => ({
                name: alert.region,
                level: alert.level,
                areas: alert.areas,
              }))}
            />
          </CardContent>
        </Card>

        {/* Real Security Data from ISP Conecta */}
        {loadingRealData ? (
          <Card className="animate-fade-in">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">{t('common.loading')}</p>
            </CardContent>
          </Card>
        ) : realData && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {realData.data.map((region, index) => (
                <Card key={region.regionName} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <span>{region.regionName}</span>
                      <RiskBadge level={region.level} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{region.incidents}</div>
                    <p className="text-xs text-muted-foreground mt-1">Incidentes (últimas 24h)</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Regional Information */}
            <div className="space-y-6">
              {realData.data.map((region, index) => (
                <Card key={region.regionName} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {region.regionName}
                      </div>
                      <RiskBadge level={region.level} />
                    </CardTitle>
                    <CardDescription>
                      {region.incidents} incidentes registrados nas últimas 24 horas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="crimes" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="crimes">Tipos de Crime</TabsTrigger>
                        <TabsTrigger value="hours">Horários</TabsTrigger>
                        <TabsTrigger value="tips">Dicas</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="crimes" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          {region.crimeTypes.map((crime, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                              <span className="text-sm">{crime.type}</span>
                              <Badge variant="outline">{crime.count} casos</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="hours" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Horários de maior risco:</p>
                          {region.dangerousHours.map((hour, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10">
                              <Clock className="w-4 h-4 text-destructive" />
                              <span className="text-sm">{hour}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tips" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          {region.safetyTips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-primary/5">
                              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contacts */}
            <Card className="animate-fade-in bg-gradient-to-br from-destructive/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-destructive" />
                  Telefones de Emergência
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">Polícia Militar</span>
                    <a href="tel:190" className="text-lg font-bold text-primary hover:underline">190</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">Bombeiros</span>
                    <a href="tel:193" className="text-lg font-bold text-primary hover:underline">193</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">SAMU</span>
                    <a href="tel:192" className="text-lg font-bold text-primary hover:underline">192</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">Defesa Civil</span>
                    <a href="tel:199" className="text-lg font-bold text-primary hover:underline">199</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">Disque Denúncia</span>
                    <a href="tel:21971997" className="text-lg font-bold text-primary hover:underline">2197-1997</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">Polícia Rodoviária</span>
                    <a href="tel:191" className="text-lg font-bold text-primary hover:underline">191</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Source */}
            <Card className="animate-fade-in">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground text-center">
                  Dados fornecidos por: {realData.source} | Última atualização: {new Date(realData.lastUpdate).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          </>
        )}
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
