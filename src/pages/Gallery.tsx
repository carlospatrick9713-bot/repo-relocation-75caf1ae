import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, Images, MapPin, X } from 'lucide-react';
import { touristSpots } from '@/data/touristSpots';
import RiskBadge from '@/components/RiskBadge';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function Gallery() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<{ src: string; name: string; risk: 'low' | 'medium' | 'high' } | null>(null);

  const allImages = touristSpots.flatMap(spot =>
    spot.images.map(image => ({
      src: image,
      name: spot.name,
      risk: spot.risk,
      spotId: spot.id
    }))
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
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <Images className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Galeria de Pontos Turísticos</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore as belezas do Rio de Janeiro através de imagens incríveis dos principais pontos turísticos
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allImages.map((image, index) => (
              <Card
                key={`${image.spotId}-${index}`}
                className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.02}s` }}
                onClick={() => setSelectedImage(image)}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 flex-1">
                          <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                          <h3 className="text-sm font-semibold text-white line-clamp-2">
                            {image.name}
                          </h3>
                        </div>
                        <RiskBadge level={image.risk} className="flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-5 h-5" />
          </Button>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <h3 className="text-xl font-semibold">{selectedImage.name}</h3>
                  </div>
                  <RiskBadge level={selectedImage.risk} />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
