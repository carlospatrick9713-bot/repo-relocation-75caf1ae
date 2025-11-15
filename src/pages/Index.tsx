import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import RiskBadge from '@/components/RiskBadge';
import TouristSpotCard from '@/components/TouristSpotCard';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import PremiumCard from '@/components/PremiumCard';
import type { TouristSpot } from '@/hooks/useTouristSpots';
import '@/lib/i18n';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium, isLoading } = usePremium();
  const { data: touristSpots = [] } = useTouristSpots();
  const { data: restaurants = [] } = useRestaurants();
  const { alerts: securityAlerts } = useSecurityAlerts(isPremium);
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showHero, setShowHero] = useState(() => {
    return localStorage.getItem('hideHero') !== 'true';
  });

  const featuredSpots = touristSpots.filter(spot => spot.risk_level === 'low').slice(0, 10);
  const featuredRestaurants = restaurants.slice(0, 10);

  const handleExplore = () => {
    localStorage.setItem('hideHero', 'true');
    setShowHero(false);
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
                onClick={() => window.location.href = '/'}
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
              onClick={() => window.location.href = '/'}
            />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AppMenu onNavigate={handleMenuNavigation} />
          </div>
        </header>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        <div className="w-80 border-r overflow-y-auto">
          <Sidebar />
        </div>
        <div className="flex-1">
          <MapView spots={featuredSpots} restaurants={featuredRestaurants} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-screen pb-20">
        <div className="w-full max-w-md mx-auto px-4 space-y-6 pt-6">
          {/* Security Alerts */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="w-5 h-5 text-primary" />
                {t('sidebar.alerts')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
                size="sm"
                onClick={() => navigate('/security-alerts')}
              >
                {t('sidebar.viewAll')}
              </Button>
            </CardContent>
          </Card>

          {/* Featured Spots */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5 text-primary" />
                {t('sidebar.featured')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {featuredSpots.slice(0, 3).map(spot => (
                <div 
                  key={spot.id}
                  className="cursor-pointer hover:opacity-80 transition-opacity p-3 border rounded-lg bg-background/50 hover:bg-background/80"
                  onClick={() => {
                    setSelectedSpot(spot);
                    setDialogOpen(true);
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">{spot.name}</h4>
                    <RiskBadge level={spot.risk_level as 'low' | 'medium' | 'high'} />
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{spot.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Premium Card - only for non-premium users */}
          {!isPremium && !isLoading && (
            <PremiumCard />
          )}

          {/* Map */}
          <Card>
            <CardContent className="p-0">
              <div className="h-[400px] rounded-lg overflow-hidden">
                <MapView spots={featuredSpots} restaurants={featuredRestaurants} />
              </div>
            </CardContent>
          </Card>
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
