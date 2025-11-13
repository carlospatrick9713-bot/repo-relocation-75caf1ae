import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Crown, TrendingUp } from 'lucide-react';
import { touristSpots } from '@/data/touristSpots';
import TouristSpotCard from '@/components/TouristSpotCard';
import { useState } from 'react';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import { TouristSpot } from '@/data/touristSpots';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function Highlights() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const featuredSpots = touristSpots.filter(spot => spot.id <= 5);
  const premiumSpots = touristSpots.filter(spot => spot.risk === 'low');

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
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Destaques do Rio</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore os pontos turísticos mais populares e bem avaliados da Cidade Maravilhosa
            </p>
          </div>

          {/* Featured Spots */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Mais Visitados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredSpots.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TouristSpotCard
                      name={spot.name}
                      risk={spot.risk}
                      image={spot.image}
                      onClick={() => handleSpotClick(spot)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Premium Recommendations */}
          <Card className="animate-fade-in border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Recomendações Premium
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Locais com baixo índice de risco e alto nível de segurança
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {premiumSpots.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TouristSpotCard
                      name={spot.name}
                      risk={spot.risk}
                      image={spot.image}
                      onClick={() => handleSpotClick(spot)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
