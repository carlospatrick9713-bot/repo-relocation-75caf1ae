import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { 
  MapPin, 
  Clock, 
  Lightbulb, 
  Navigation, 
  ChevronLeft, 
  ChevronRight,
  X,
  Crown,
  Lock
} from 'lucide-react';
import RiskBadge from './RiskBadge';
import { TouristSpot } from '@/data/touristSpots';
import { toast } from 'sonner';
import { usePremium } from '@/hooks/usePremium';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface TouristSpotDialogProps {
  spot: TouristSpot | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TouristSpotDialog({ spot, open, onOpenChange }: TouristSpotDialogProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPremiumAlert, setShowPremiumAlert] = useState(false);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % spot.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + spot.images.length) % spot.images.length);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
          <ScrollArea className="max-h-[90vh]">
            {/* Image Gallery */}
            <div className="relative w-full h-64 md:h-96 bg-muted">
              <img
                src={spot.images[currentImageIndex]}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              
              {/* Gallery Controls */}
              {spot.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {spot.images.length}
                  </div>
                </>
              )}
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
                  <RiskBadge level={spot.risk} className="flex-shrink-0" />
                </div>
              </DialogHeader>

              <Separator />

              {/* Hours */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4 text-primary" />
                  Horário de Funcionamento
                </div>
                <p className="text-sm text-muted-foreground pl-6">{spot.hours}</p>
              </div>

              <Separator />

              {/* Tips */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Dicas Importantes
                </div>
                <ul className="space-y-2 pl-6">
                  {spot.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
