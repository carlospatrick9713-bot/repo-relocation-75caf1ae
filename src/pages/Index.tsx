import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import rioHero from '@/assets/rio-hero.jpg';
import rioBackground from '@/assets/rio-background.jpg';
import logo from '@/assets/logo.png';
import '@/lib/i18n';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'pt');
  const [showHero, setShowHero] = useState(true);

  const changeLang = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const handleExplore = () => {
    setShowHero(false);
  };

  const getLangLabel = (code: string) => {
    const labels: Record<string, string> = {
      pt: '🇧🇷 Português',
      en: '🇺🇸 English',
      es: '🇪🇸 Español'
    };
    return labels[code] || code;
  };

  if (showHero) {
    return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-scale-in"
          style={{ backgroundImage: `url(${rioHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <header className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white animate-fade-in">
              <img src={logo} alt="Safe Trip" className="w-14 h-14" />
              <h1 className="text-xl font-bold">{t('header.title')}</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 animate-fade-in"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {getLangLabel(lang).split(' ')[0]}
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
          </header>

          {/* Hero Text */}
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center space-y-6 max-w-3xl animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                {t('hero.title')}
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>
              <div className="pt-4">
                <Button 
                  onClick={handleExplore}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white shadow-2xl hover-scale text-lg px-8 py-6"
                >
                  <img src={logo} alt="" className="w-5 h-5 mr-2" />
                  {lang === 'es' ? 'Explorar Mapa' : lang === 'en' ? 'Explore Map' : 'Explorar Mapa'}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="p-6 text-center">
            <p className="text-sm text-white/70 animate-fade-in">{t('footer.copyright')}</p>
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
            <img src={logo} alt="Safe Trip" className="w-10 h-10" />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                {getLangLabel(lang).split(' ')[0]}
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
