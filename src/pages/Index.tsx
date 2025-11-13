import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import rioHero from '@/assets/rio-hero.jpg';
import '@/lib/i18n';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'pt');
  const [showHero, setShowHero] = useState(true);

  const toggleLang = () => {
    const next = i18n.language?.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(next);
    setLang(next);
  };

  const handleExplore = () => {
    setShowHero(false);
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
            <div className="flex items-center gap-2 text-white animate-fade-in">
              <Shield className="w-8 h-8" />
              <h1 className="text-xl font-bold">{t('header.title')}</h1>
            </div>
            <Button 
              onClick={toggleLang} 
              variant="outline" 
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 animate-fade-in"
            >
              {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
            </Button>
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
                  <Shield className="w-5 h-5 mr-2" />
                  Explorar Mapa
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
    <div className="flex flex-col h-screen bg-background animate-fade-in">
      {/* Header */}
      <header className="h-16 border-b bg-background/95 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">{t('header.title')}</h1>
        </div>
        <Button onClick={toggleLang} variant="outline" size="sm">
          {lang === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <MapView />
      </main>

      {/* Footer */}
      <footer className="h-11 border-t bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default Index;
