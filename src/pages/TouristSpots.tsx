import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MapPin, Search, Crown } from 'lucide-react';
import { touristSpots, regions, TouristSpot } from '@/data/touristSpots';
import TouristSpotCard from '@/components/TouristSpotCard';
import TouristSpotDialog from '@/components/TouristSpotDialog';
import RiskBadge from '@/components/RiskBadge';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';
import { usePremium } from '@/hooks/usePremium';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import PremiumCard from '@/components/PremiumCard';

export default function TouristSpots() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllPremium, setShowAllPremium] = useState(false);
  const [showPremiumCard, setShowPremiumCard] = useState(false);
  const { isPremium } = usePremium();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSpotClick = (spot: TouristSpot) => {
    setSelectedSpot(spot);
    setDialogOpen(true);
  };

  const handleShowAllPremium = () => {
    if (!isPremium) {
      setShowPremiumCard(true);
      return;
    }
    setShowAllPremium(true);
  };

  const filteredSpots = touristSpots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    spot.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const spotsByRegion = regions.reduce((acc, region) => {
    acc[region] = filteredSpots.filter(s => s.region === region);
    return acc;
  }, {} as Record<string, TouristSpot[]>);

  const spotsByRisk = {
    low: filteredSpots.filter(s => s.risk === 'low'),
    medium: filteredSpots.filter(s => s.risk === 'medium'),
    high: filteredSpots.filter(s => s.risk === 'high'),
  };

  return (
    <>
      {showPremiumCard && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center overflow-auto">
          <div className="container max-w-4xl py-8 px-4">
            <div className="mb-4">
              <Button variant="ghost" onClick={() => setShowPremiumCard(false)}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
            </div>
            {!user ? (
              <Card className="p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold">Faça Login para Continuar</h2>
                <p className="text-muted-foreground">Você precisa estar logado para acessar o plano premium.</p>
                <Button onClick={() => navigate('/auth')}>Fazer Login / Cadastro</Button>
              </Card>
            ) : (
              <PremiumCard />
            )}
          </div>
        </div>
      )}
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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

        <main className="container py-8 px-4 space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <MapPin className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Pontos Turísticos do Rio de Janeiro</h2>
            </div>
            <p className="text-lg text-muted-foreground">Descubra mais de 100 pontos turísticos por todo o estado</p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar por nome ou região..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card><CardContent className="pt-6"><div className="text-center space-y-1"><div className="text-3xl font-bold">{filteredSpots.length}</div><div className="text-sm text-muted-foreground">Pontos Turísticos</div></div></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-center space-y-1"><div className="text-3xl font-bold">{regions.length}</div><div className="text-sm text-muted-foreground">Regiões</div></div></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-center space-y-1"><div className="text-3xl font-bold">{spotsByRisk.low.length}</div><div className="text-sm text-muted-foreground">Baixo Risco</div></div></CardContent></Card>
            <Card><CardContent className="pt-6"><div className="text-center space-y-1"><div className="text-3xl font-bold">★ 4.8</div><div className="text-sm text-muted-foreground">Avaliação Média</div></div></CardContent></Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex h-auto w-full min-w-max">
                <TabsTrigger value="all" className="text-xs">Todos ({filteredSpots.length})</TabsTrigger>
                {regions.map(region => (
                  <TabsTrigger key={region} value={region} className="text-xs whitespace-nowrap">{region} ({spotsByRegion[region]?.length || 0})</TabsTrigger>
                ))}
              </TabsList>
            </ScrollArea>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSpots.map((spot, index) => (
                  <div key={spot.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.02}s` }}>
                    <TouristSpotCard name={spot.name} risk={spot.risk} image={spot.image} onClick={() => handleSpotClick(spot)} />
                  </div>
                ))}
              </div>
            </TabsContent>

            {regions.map(region => (
              <TabsContent key={region} value={region} className="mt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold">{region}</h3>
                  <p className="text-muted-foreground">{spotsByRegion[region]?.length || 0} pontos turísticos</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {spotsByRegion[region]?.map((spot, index) => (
                    <div key={spot.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.02}s` }}>
                      <TouristSpotCard name={spot.name} risk={spot.risk} image={spot.image} onClick={() => handleSpotClick(spot)} />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>

      <TouristSpotDialog spot={selectedSpot} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
