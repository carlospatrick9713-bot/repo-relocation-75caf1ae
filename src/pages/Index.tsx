import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, AlertTriangle, MapPin } from 'lucide-react';
import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import HeroCarousel from '@/components/HeroCarousel';
import logo from '@/assets/logo-transparent.png';
import rioBackground from '@/assets/rio-background.jpg';
import AppMenu from '@/components/AppMenu';
import LanguageSelector from '@/components/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { useTouristSpots } from '@/hooks/useTouristSpots';
import { useRestaurants } from '@/hooks/useRestaurants';
import { usePremium } from '@/hooks/usePremium';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { useRealSecurityData } from '@/hooks/useRealSecurityData';
import RiskBadge from '@/components/RiskBadge';
import TranslatedTouristSpotCard from '@/components/TranslatedTouristSpotCard';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import PremiumCard from '@/components/PremiumCard';
import { ZoomableMap } from '@/components/ZoomableMap';
import type { TouristSpot } from '@/hooks/useTouristSpots';
import newMapImage from '@/assets/rio-pois-map-v3.png';
import '@/lib/i18n';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium, isLoading } = usePremium();
  const { data: touristSpots = [] } = useTouristSpots();
  const { data: restaurants = [] } = useRestaurants();
  const { alerts: securityAlerts } = useSecurityAlerts(isPremium);
  const { data: securityData, isLoading: isLoadingSecurityData } = useRealSecurityData(isPremium ?? false);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showHero, setShowHero] = useState(() => {
    return localStorage.getItem('hideHero') !== 'true';
  });

  const featuredSpots = touristSpots.filter(spot => spot.risk_level === 'low').slice(0, 15);
  const featuredRestaurants = restaurants.slice(0, 10);

  const handleExplore = () => {
    localStorage.setItem('hideHero', 'true');
    setShowHero(false);
  };

  const handleLogoClick = () => {
    localStorage.removeItem('hideHero');
    setShowHero(true);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setShowHero(localStorage.getItem('hideHero') !== 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleMenuNavigation = (section: string) => {
    console.log('Navegando para:', section);
    // Implementar navegação para seções específicas
  };

  if (showHero) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Hero Background Carousel */}
        <HeroCarousel />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <header className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white animate-fade-in">
              <img 
                src={logo} 
                alt="Safe Trip" 
                className="w-16 h-16 drop-shadow-2xl cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={handleLogoClick}
              />
              <h1 className="text-xl font-bold drop-shadow-md">{t('header.title')}</h1>
            </div>
          <div className="flex items-center gap-3">
            <div className="animate-fade-in">
              <LanguageSelector />
            </div>
            <div className="animate-fade-in">
              <AppMenu onNavigate={handleMenuNavigation} />
            </div>
          </div>
          </header>

          {/* Hero Text */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                {t('hero.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                {t('hero.subtitle')}
              </p>
              <div className="pt-4">
                <Button 
                  onClick={handleExplore}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-2xl hover-scale text-lg px-8 py-6"
                >
                  <img src={logo} alt="" className="w-6 h-6 mr-2 drop-shadow-lg" />
                  {t('hero.exploreButton')}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6 text-center">
            <p className="text-sm text-white/70 animate-fade-in drop-shadow-md">{t('footer.copyright')}</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${rioBackground})` }}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen bg-transparent animate-fade-in">
        {/* Header */}
        <header className="h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Safe Trip" 
              className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={handleLogoClick}
            />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AppMenu onNavigate={handleMenuNavigation} />
          </div>
        </header>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col h-screen overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-6 space-y-8 pt-6 pb-20">
          {/* Featured Spots Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <MapPin className="w-8 h-8 text-primary" />
                {t('sidebar.featured')}
              </h2>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {featuredSpots.slice(0, 15).map(spot => (
                <TranslatedTouristSpotCard
                  key={spot.id}
                  spot={spot}
                  onClick={() => {
                    setSelectedSpot(spot);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/tourist-spots')}
            >
              {t('touristSpots.viewAll')}
            </Button>
          </div>

          {/* Illustrative Map Section */}
          <ZoomableMap />

          {/* New Detailed Map */}
          <Card className="relative overflow-hidden">
            <img 
              src={newMapImage} 
              alt="Mapa detalhado do Rio de Janeiro"
              className="w-full h-auto"
            />
          </Card>

          {/* Premium Security Data Section */}
          {isPremium && securityData && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <AlertTriangle className="w-7 h-7 text-primary" />
                  Dados de Segurança por Região
                </CardTitle>
                <CardDescription>
                  Informações detalhadas de segurança atualizadas em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {securityData.data.map((region, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-background/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{region.regionName}</h4>
                      <RiskBadge level={region.level} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Incidentes:</span>
                        <span className="ml-2 font-semibold">{region.incidents}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Horários críticos:</span>
                        <span className="ml-2 font-semibold">{region.dangerousHours.join(', ')}</span>
                      </div>
                    </div>

                    {region.crimeTypes.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Tipos de crime:</p>
                        <div className="flex flex-wrap gap-2">
                          {region.crimeTypes.map((crime, i) => (
                            <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded">
                              {crime.type}: {crime.count}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {region.safetyTips.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Dicas de segurança:</p>
                        <ul className="space-y-1 pl-4">
                          {region.safetyTips.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground">• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground text-center">
                  Última atualização: {new Date(securityData.lastUpdate).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Security Alerts Summary */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="w-7 h-7 text-primary" />
                {t('securityAlerts.title')}
              </CardTitle>
              <CardDescription>
                {t('securityAlerts.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              {/* Blur overlay for non-premium users */}
              {!isPremium && !isLoading && (
                <div className="absolute inset-0 backdrop-blur-md bg-background/30 z-10 flex flex-col items-center justify-center rounded-lg">
                  <Crown className="w-12 h-12 text-primary mb-3 animate-pulse" />
                  <p className="text-center font-semibold text-lg mb-2">{t('premium.required')}</p>
                  <Button 
                    className="bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => window.open('https://pay.kiwify.com.br/lBcZdOF', '_blank')}
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    {t('premium.cta')}
                  </Button>
                </div>
              )}
              
              {securityAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-base">{alert.title}</h4>
                        <RiskBadge level={alert.level} />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/security-alerts')}
                disabled={!isPremium && !isLoading}
              >
                {t('securityAlerts.viewAll')}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Card - only for non-premium users */}
          {!isPremium && !isLoading && (
            <PremiumCard />
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen pb-20">
        <div className="w-full max-w-4xl mx-auto px-4 space-y-8 pt-6">
          {/* Featured Spots Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                {t('sidebar.featured')}
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {featuredSpots.slice(0, 8).map(spot => (
                <TranslatedTouristSpotCard
                  key={spot.id}
                  spot={spot}
                  onClick={() => {
                    setSelectedSpot(spot);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/tourist-spots')}
            >
              {t('touristSpots.viewAll')}
            </Button>
          </div>

          {/* Illustrative Map Section */}
          <ZoomableMap />

          {/* New Detailed Map */}
          <Card className="relative overflow-hidden">
            <img 
              src={newMapImage} 
              alt="Mapa detalhado do Rio de Janeiro"
              className="w-full h-auto"
            />
          </Card>

          {/* Premium Security Data Section */}
          {isPremium && securityData && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  Dados de Segurança
                </CardTitle>
                <CardDescription>
                  Informações detalhadas por região
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityData.data.slice(0, 3).map((region, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-background/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{region.regionName}</h4>
                      <RiskBadge level={region.level} />
                    </div>
                    
                    <div className="text-xs space-y-1">
                      <p>
                        <span className="text-muted-foreground">Incidentes:</span>
                        <span className="ml-1 font-semibold">{region.incidents}</span>
                      </p>
                      {region.safetyTips.length > 0 && (
                        <p className="text-muted-foreground line-clamp-2">
                          • {region.safetyTips[0]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground text-center">
                  Atualizado: {securityData && new Date(securityData.lastUpdate).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Security Alerts Summary */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="w-6 h-6 text-primary" />
                {t('securityAlerts.title')}
              </CardTitle>
              <CardDescription>
                {t('securityAlerts.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              {/* Blur overlay for non-premium users */}
              {!isPremium && !isLoading && (
                <div className="absolute inset-0 backdrop-blur-md bg-background/30 z-10 flex flex-col items-center justify-center rounded-lg">
                  <Crown className="w-10 h-10 text-primary mb-2 animate-pulse" />
                  <p className="text-center font-semibold text-sm mb-2 px-4">{t('premium.required')}</p>
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => window.open('https://pay.kiwify.com.br/lBcZdOF', '_blank')}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {t('premium.cta')}
                  </Button>
                </div>
              )}
              
              {securityAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <RiskBadge level={alert.level} />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate('/security-alerts')}
                disabled={!isPremium && !isLoading}
              >
                {t('securityAlerts.viewAll')}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Card - only for non-premium users */}
          {!isPremium && !isLoading && (
            <PremiumCard />
          )}
        </div>
      </div>

      {/* Tourist Spot Dialog */}
      <TouristSpotDialog
        spot={selectedSpot as any}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

        {/* Footer */}
        <footer className="h-11 border-t bg-background/80 backdrop-blur-md flex items-center justify-center">
          <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
