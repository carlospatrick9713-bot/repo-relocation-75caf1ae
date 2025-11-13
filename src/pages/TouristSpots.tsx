import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { touristSpots, TouristSpot } from '@/data/touristSpots';
import TouristSpotCard from '@/components/TouristSpotCard';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import RiskBadge from '@/components/RiskBadge';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function TouristSpots() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSpotClick = (spot: TouristSpot) => {
    setSelectedSpot(spot);
    setDialogOpen(true);
  };

  const filteredSpots = touristSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const spotsByRisk = {
    low: filteredSpots.filter(s => s.risk === 'low'),
    medium: filteredSpots.filter(s => s.risk === 'medium'),
    high: filteredSpots.filter(s => s.risk === 'high'),
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
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <MapPin className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Pontos Turísticos</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Descubra todos os pontos turísticos do Rio de Janeiro com informações de segurança em tempo real
            </p>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar pontos turísticos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs by Risk Level */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos ({filteredSpots.length})</TabsTrigger>
              <TabsTrigger value="low">
                <RiskBadge level="low" className="scale-75" />
                ({spotsByRisk.low.length})
              </TabsTrigger>
              <TabsTrigger value="medium">
                <RiskBadge level="medium" className="scale-75" />
                ({spotsByRisk.medium.length})
              </TabsTrigger>
              <TabsTrigger value="high">
                <RiskBadge level="high" className="scale-75" />
                ({spotsByRisk.high.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSpots.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
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
            </TabsContent>

            <TabsContent value="low" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spotsByRisk.low.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
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
            </TabsContent>

            <TabsContent value="medium" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spotsByRisk.medium.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
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
            </TabsContent>

            <TabsContent value="high" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spotsByRisk.high.map((spot, index) => (
                  <div 
                    key={spot.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
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
            </TabsContent>
          </Tabs>
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
