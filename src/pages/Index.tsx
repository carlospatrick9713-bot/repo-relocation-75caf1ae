import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import HeroCarousel from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, LogOut, User, Crown } from 'lucide-react';
import rioBackground from '@/assets/rio-background.jpg';
import logo from '@/assets/logo-transparent.png';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import '@/lib/i18n';

const Index = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const [lang, setLang] = useState(i18n.language || 'pt');
  const [showHero, setShowHero] = useState(true);

  const changeLang = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const handleExplore = () => {
    setShowHero(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logout realizado com sucesso!');
    navigate('/auth');
  };

  const getLangLabel = (code: string) => {
    const labels: Record<string, string> = {
      pt: '🇧🇷 PT',
      en: '🇺🇸 EN',
      es: '🇪🇸 ES'
    };
    return labels[code] || code;
  };

  const getExploreText = () => {
    if (lang === 'es') return 'Explorar Mapa';
    if (lang === 'en') return 'Explore Map';
    return 'Explorar Mapa';
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
              <img src={logo} alt="Safe Trip" className="w-16 h-16 drop-shadow-2xl" />
              <h1 className="text-xl font-bold drop-shadow-md">{t('header.title')}</h1>
            </div>
            <div className="flex items-center gap-3">
              {user && isPremium && (
                <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-300 px-3 py-1.5 rounded-lg animate-fade-in">
                  <Crown className="w-4 h-4" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 animate-fade-in"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    {getLangLabel(lang)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
                  <DropdownMenuItem onClick={() => changeLang('pt')} className="cursor-pointer">
                    🇧🇷 Português
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLang('en')} className="cursor-pointer">
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => changeLang('es')} className="cursor-pointer">
                    🇪🇸 Español
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {user ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
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
                  {getExploreText()}
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
            <img src={logo} alt="Safe Trip" className="w-12 h-12" />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            {user && isPremium && (
              <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 px-3 py-1.5 rounded-lg">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-semibold">Premium</span>
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  {getLangLabel(lang)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
                <DropdownMenuItem onClick={() => changeLang('pt')} className="cursor-pointer">
                  🇧🇷 Português
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLang('en')} className="cursor-pointer">
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLang('es')} className="cursor-pointer">
                  🇪🇸 Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {user ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          <Sidebar />
          <MapView />
        </main>

        {/* Footer */}
        <footer className="h-11 border-t bg-background/80 backdrop-blur-md flex items-center justify-center">
          <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
