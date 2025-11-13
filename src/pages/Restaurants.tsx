import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Utensils, Search, Clock, DollarSign, Star } from 'lucide-react';
import { restaurants, cuisineTypes, Restaurant } from '@/data/restaurants';
import ConfirmExitDialog from '@/components/ConfirmExitDialog';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function Restaurants() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showExitDialog, setShowExitDialog] = useState(false);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const restaurantsByCuisine = cuisineTypes.reduce((acc, cuisine) => {
    acc[cuisine] = filteredRestaurants.filter(r => r.cuisine === cuisine);
    return acc;
  }, {} as Record<string, Restaurant[]>);

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
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
            <Utensils className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">Restaurantes</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Os 200 melhores restaurantes do Rio de Janeiro
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
    </div>

    <ConfirmExitDialog 
      open={showExitDialog} 
      onOpenChange={setShowExitDialog}
      onConfirm={() => navigate('/')}
    />
    </>
  );
}
