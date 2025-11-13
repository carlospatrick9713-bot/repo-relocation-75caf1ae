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
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function SecurityAlerts() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { alerts, lastUpdate } = useSecurityAlerts();
  const { isPremium, isLoading } = usePremium();
  const { user, loading: authLoading } = useAuth();

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000 / 60);
    
    if (diff < 1) return t('sidebar.timeAgo.now');
    if (diff < 60) return t('sidebar.timeAgo.minutes', { count: diff });
    const hours = Math.floor(diff / 60);
    return t('sidebar.timeAgo.hours', { count: hours });
  };

  const regionAlerts = [
    { region: 'Centro', level: 'medium' as const, message: 'Atenção redobrada após 22h. Evite ruas desertas.', areas: ['Praça Mauá', 'Lapa', 'Cinelândia'] },
    { region: 'Zona Norte', level: 'high' as const, message: 'Evitar áreas isoladas. Prefira vias principais.', areas: ['Maracanã', 'São Cristóvão', 'Tijuca'] },
    { region: 'Zona Sul', level: 'low' as const, message: 'Região com boa segurança. Mantenha atenção básica.', areas: ['Copacabana', 'Ipanema', 'Leblon'] },
    { region: 'Zona Oeste', level: 'medium' as const, message: 'Atenção em horários noturnos. Evite ostentação.', areas: ['Barra da Tijuca', 'Recreio', 'Jacarepaguá'] },
  ];

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <img src={logo} alt="Safe Trip" className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')} />
              <h1 className="text-xl font-bold">{t('header.title')}</h1>
            </div>
            <AppMenu />
          </div>
        </header>

        {/* Blurred content in background */}
        <div className="blur-md pointer-events-none">
          <main className="container py-8 px-4 space-y-8">
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-bold">Alertas de Segurança</h2>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-lg text-muted-foreground">
                  Informações atualizadas sobre segurança nas diferentes regiões do Rio
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Atualizado {formatLastUpdate()}
                  </span>
                  <Badge variant="secondary">Atualiza a cada 5min</Badge>
                </div>
              </div>
            </div>

            <Card className="animate-fade-in border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Alertas em Tempo Real
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={alert.id} className="p-4 border rounded-lg bg-background/50">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <RiskBadge level={alert.level} />
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regionAlerts.map((alert) => (
                <Card key={alert.region}>
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
                      <div className="text-sm font-medium mb-2">Principais áreas:</div>
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
        </div>

        {/* Premium Card overlay */}
        <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div className="max-w-md w-full pointer-events-auto mt-20">
            <PremiumCard />
            {!user && (
              <Button 
                className="w-full mt-4 bg-secondary hover:bg-secondary/90"
                onClick={() => navigate('/auth')}
              >
                Fazer Login / Cadastro
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
      <main className="container py-8 px-4 space-y-8">
        {/* Hero Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">Alertas de Segurança</h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-lg text-muted-foreground">
              Informações atualizadas sobre segurança nas diferentes regiões do Rio
            </p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Atualizado {formatLastUpdate()}
              </span>
              <Badge variant="secondary">Atualiza a cada 5min</Badge>
            </div>
          </div>
        </div>

        {/* Real-time Alerts */}
        <Card className="animate-fade-in border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Alertas em Tempo Real
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
                    {alert.time === 'now' ? 'Agora' : alert.time}
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
                  <div className="text-sm font-medium mb-2">Principais áreas:</div>
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
    </div>
  );
}
