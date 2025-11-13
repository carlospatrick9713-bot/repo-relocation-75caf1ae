import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Utensils, Search, Clock, DollarSign, Star, MapPin } from 'lucide-react';
import { restaurants, cuisineTypes, Restaurant } from '@/data/restaurants';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ConfirmExitDialog from '@/components/ConfirmExitDialog';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';
import { usePremium } from '@/hooks/usePremium';
import PremiumCard from '@/components/PremiumCard';

export default function Restaurants() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isPremium, isLoading } = usePremium();
  const [searchQuery, setSearchQuery] = useState('');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY || '';

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const restaurantsByCuisine = cuisineTypes.reduce((acc, cuisine) => {
    acc[cuisine] = filteredRestaurants.filter(r => r.cuisine === cuisine);
    return acc;
  }, {} as Record<string, Restaurant[]>);

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <Card 
      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
      onClick={() => setSelectedRestaurant(restaurant)}
    >
      <CardContent className="p-0">
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-1">{restaurant.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {restaurant.cuisine}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {restaurant.description}
          </p>

          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{restaurant.hours}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="font-medium">{restaurant.priceRange}</span>
              <span className="text-muted-foreground">
                (Média: R$ {restaurant.averagePrice})
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium text-sm">{restaurant.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
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
      <main className={`container py-8 px-4 space-y-8 ${!isPremium && !isLoading ? 'blur-md pointer-events-none' : ''}`}>
        {/* Hero Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <Utensils className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">Restaurantes</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Os 20 melhores restaurantes do Rio de Janeiro
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar restaurantes ou tipo de culinária..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold">{restaurants.length}</div>
                <div className="text-sm text-muted-foreground">Restaurantes</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold">{cuisineTypes.length}</div>
                <div className="text-sm text-muted-foreground">Tipos de Culinária</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold">4.6</div>
                <div className="text-sm text-muted-foreground">Avaliação Média</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs by Cuisine */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="all" className="text-xs">
              Todos ({filteredRestaurants.length})
            </TabsTrigger>
            {cuisineTypes.slice(0, 5).map(cuisine => (
              <TabsTrigger key={cuisine} value={cuisine} className="text-xs">
                {cuisine} ({restaurantsByCuisine[cuisine]?.length || 0})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredRestaurants.map((restaurant, index) => (
                <div 
                  key={restaurant.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </TabsContent>

          {cuisineTypes.map(cuisine => (
            <TabsContent key={cuisine} value={cuisine} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {restaurantsByCuisine[cuisine]?.map((restaurant, index) => (
                  <div 
                    key={restaurant.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    <RestaurantCard restaurant={restaurant} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Premium Overlay */}
      {!isPremium && !isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/20">
          <div className="w-full max-w-md animate-fade-in">
            <PremiumCard />
          </div>
        </div>
      )}
    </div>

    <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {selectedRestaurant?.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Restaurant Info */}
          <div className="space-y-2">
            <Badge variant="secondary">{selectedRestaurant?.cuisine}</Badge>
            <p className="text-sm text-muted-foreground">{selectedRestaurant?.description}</p>
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span>{selectedRestaurant?.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>{selectedRestaurant?.priceRange}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-sm">{selectedRestaurant?.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          {selectedRestaurant && apiKey && (
            <div className="h-[400px] rounded-lg overflow-hidden border">
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
                  zoom={16}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true
                  }}
                >
                  <Marker
                    position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
                    title={selectedRestaurant.name}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
          )}

          {!apiKey && selectedRestaurant && (
            <div className="h-[400px] rounded-lg overflow-hidden border relative">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedRestaurant.lng - 0.01},${selectedRestaurant.lat - 0.01},${selectedRestaurant.lng + 0.01},${selectedRestaurant.lat + 0.01}&layer=mapnik&marker=${selectedRestaurant.lat},${selectedRestaurant.lng}`}
                style={{ border: 0 }}
              />
              <div className="absolute top-2 left-2 bg-background/90 backdrop-blur px-3 py-1.5 rounded-md text-xs">
                Prévia do Mapa
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedRestaurant?.lat},${selectedRestaurant?.lng}`, '_blank')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Abrir no Google Maps
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <ConfirmExitDialog 
      open={showExitDialog} 
      onOpenChange={setShowExitDialog}
      onConfirm={() => navigate('/')}
    />
    </>
  );
}
