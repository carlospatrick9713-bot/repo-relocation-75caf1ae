import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MapView from '@/components/MapView';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import '@/lib/i18n';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'pt');

  const toggleLang = () => {
    const next = i18n.language?.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(next);
    setLang(next);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="h-16 border-b bg-background flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">{t('header.title')}</h1>
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
