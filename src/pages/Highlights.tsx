import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { useTouristSpots, TouristSpot } from '@/hooks/useTouristSpots';
import TranslatedTouristSpotCard from '@/components/TranslatedTouristSpotCard';
import { useState } from 'react';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';
import LanguageSelector from '@/components/LanguageSelector';

export default function Highlights() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: touristSpots = [], isLoading } = useTouristSpots();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const topTenSpots = touristSpots.slice(0, 10);

  const handleSpotClick = (spot: TouristSpot) => {
    setSelectedSpot(spot);
    setDialogOpen(true);
  };

  return (
    <>
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
              onClick={() => {
                localStorage.removeItem('hideHero');
                navigate('/');
              }}
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
        <main className="container py-8 px-4 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">{t('highlights.title')}</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('highlights.subtitle')}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Top 10 Most Visited */}
          {!isLoading && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t('highlights.topTenTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topTenSpots.map((spot, index) => (
                    <div 
                      key={spot.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TranslatedTouristSpotCard
                        spot={spot}
                        onClick={() => handleSpotClick(spot)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <TouristSpotDialog 
        spot={selectedSpot}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
