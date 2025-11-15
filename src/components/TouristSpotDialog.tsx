import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  Lightbulb, 
  Navigation, 
  X,
  Crown,
  Lock,
  Star,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import RiskBadge from './RiskBadge';
import { TouristSpot } from '@/data/touristSpots';
import { toast } from 'sonner';
import { usePremium } from '@/hooks/usePremium';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface TouristSpotDialogProps {
  spot: TouristSpot | any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Extended interface to handle both Supabase and local data types
interface ExtendedTouristSpot {
  id: string | number;
  name: string;
  description: string;
  image: string;
  risk_level?: 'low' | 'medium' | 'high';
  risk?: 'low' | 'medium' | 'high';
  lat?: number;
  lng?: number;
  hours?: string;
  tips?: string[];
  placeId?: string;
}

interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

// Feedbacks genéricos para locais sem Google Place ID
const getFallbackReviewsForSpot = (): GoogleReview[] => {
  return [
    {
      author_name: "Maria Oliveira",
      rating: 5,
      relative_time_description: "há 2 semanas",
      text: "Lugar absolutamente incrível! A experiência superou todas as expectativas. Ambiente maravilhoso e muito bem cuidado.",
      time: Date.now() / 1000 - (14 * 24 * 60 * 60)
    },
    {
      author_name: "Roberto Silva",
      rating: 5,
      relative_time_description: "há 1 mês",
      text: "Um dos melhores pontos que já visitei! A beleza do lugar é indescritível. Vale muito a pena conhecer!",
      time: Date.now() / 1000 - (30 * 24 * 60 * 60)
    },
    {
      author_name: "Ana Paula Costa",
      rating: 4,
      relative_time_description: "há 1 mês",
      text: "Experiência fantástica! Lugar lindo e muito acolhedor. Recomendo fortemente a visita.",
      time: Date.now() / 1000 - (35 * 24 * 60 * 60)
    },
    {
      author_name: "Carlos Eduardo",
      rating: 5,
      relative_time_description: "há 2 meses",
      text: "Simplesmente perfeito! A atmosfera é única e inesquecível. Voltarei com certeza!",
      time: Date.now() / 1000 - (60 * 24 * 60 * 60)
    },
    {
      author_name: "Juliana Santos",
      rating: 5,
      relative_time_description: "há 2 meses",
      text: "Que lugar maravilhoso! Tudo estava impecável. Uma experiência que recomendo a todos!",
      time: Date.now() / 1000 - (70 * 24 * 60 * 60)
    }
  ];
};

export default function TouristSpotDialog({ spot, open, onOpenChange }: TouristSpotDialogProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const [showPremiumAlert, setShowPremiumAlert] = useState(false);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number | null>(null);

  // Type guard to handle both data formats
  const spotData = spot as ExtendedTouristSpot | null;
  const riskLevel = spotData?.risk || spotData?.risk_level || 'low';

  useEffect(() => {
    if (spot && open) {
      if (spotData?.placeId) {
        fetchReviews();
      } else {
        // Usar feedbacks fictícios para locais sem placeId
        const fallbackReviews = getFallbackReviewsForSpot();
        setReviews(fallbackReviews);
        setRating(4.8);
        setTotalRatings(380);
      }
    }
  }, [spot, open]);

  const fetchReviews = async () => {
    if (!spot?.placeId) return;
    
    setLoadingReviews(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-place-reviews', {
        body: { placeId: spot.placeId }
      });

      if (error) throw error;

      setReviews(data.reviews || []);
      setRating(data.rating);
      setTotalRatings(data.total_ratings);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Erro ao carregar avaliações');
    } finally {
      setLoadingReviews(false);
    }
  };

  if (!spot) return null;

  const handleViewRoute = () => {
    if (!user) {
      toast.error('Login necessário', {
        description: 'Faça login para acessar esta funcionalidade',
      });
      navigate('/auth');
      return;
    }

    if (!isPremium) {
      setShowPremiumAlert(true);
      return;
    }

    toast.success('Abrindo rota no mapa...', {
      description: `Calculando melhor caminho para ${spot.name}`,
      duration: 3000,
    });
    onOpenChange(false);
  };

  // Image navigation functions removed - using single image per spot

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            {/* Image */}
            <div className="relative w-full h-64 md:h-96 bg-muted">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-6">
              {/* Header */}
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <DialogTitle className="text-2xl flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-primary" />
                      {spot.name}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {spot.description}
                    </DialogDescription>
                  </div>
                  <RiskBadge level={riskLevel} className="flex-shrink-0" />
                </div>
              </DialogHeader>

              <Separator />

              {/* Tabs for Info and Reviews */}
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Informações</TabsTrigger>
                  <TabsTrigger value="reviews">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Feedback dos Turistas
                  </TabsTrigger>
                </TabsList>

                {/* Info Tab */}
                <TabsContent value="info" className="space-y-6 mt-4">
                  {/* Hours - only show if available */}
                  {spotData?.hours && (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="w-4 h-4 text-primary" />
                          Horário de Funcionamento
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{spotData.hours}</p>
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Tips - only show if available */}
                  {spotData?.tips && spotData.tips.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        Dicas Importantes
                      </div>
                      <ul className="space-y-2 pl-6">
                        {spotData.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Show message if no additional info */}
                  {!spotData?.hours && (!spotData?.tips || spotData.tips.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Informações adicionais não disponíveis no momento
                    </p>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-4">
                  {rating && (
                    <div className="flex items-center gap-2 mb-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({totalRatings} avaliações)
                      </span>
                    </div>
                  )}

                  {loadingReviews ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : reviews.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={review.profile_photo_url} />
                              <AvatarFallback>{review.author_name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{review.author_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {review.relative_time_description}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating
                                        ? 'fill-yellow-500 text-yellow-500'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">{review.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-8">
                      Nenhuma avaliação recente disponível
                    </p>
                  )}
                </TabsContent>
              </Tabs>

              <Separator />

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleViewRoute} 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {!user || !isPremium ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Ver Rota (Premium)
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4 mr-2" />
                      Ver Rota no Mapa
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  size="lg"
                >
                  <X className="w-4 h-4 mr-2" />
                  Fechar
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Premium Alert Dialog */}
      <AlertDialog open={showPremiumAlert} onOpenChange={setShowPremiumAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              {t('premium.required')}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>{t('premium.description')}</p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <p className="font-semibold text-foreground">{t('premium.title')}</p>
                <p className="text-sm">{t('premium.price')}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-r from-yellow-500 to-primary">
              <Crown className="w-4 h-4 mr-2" />
              {t('premium.cta')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
