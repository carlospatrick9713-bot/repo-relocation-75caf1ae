import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Image as ImageIcon, Trash2, X, Crown, Lock, Camera, Play, Pause, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { touristSpots } from '@/data/touristSpots';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

interface Photo {
  id: string;
  user_id: string;
  storage_path: string;
  caption: string | null;
  location: string | null;
  created_at: string;
  url?: string;
}

export default function TouristGallery() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const { isPremium } = usePremium();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    file: null as File | null,
    caption: '',
    location: ''
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Wait for auth to load before checking user
    if (authLoading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchPhotos();
  }, [user, authLoading, navigate]);

  // Filter photos based on user plan
  const visiblePhotos = isPremium 
    ? photos 
    : photos.filter(photo => photo.user_id === user?.id);

  // Get sorted tourist spots for dropdown
  const sortedTouristSpots = [...touristSpots]
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .map(spot => spot.name);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || visiblePhotos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % visiblePhotos.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, visiblePhotos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % visiblePhotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + visiblePhotos.length) % visiblePhotos.length);
  };

  const fetchPhotos = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tourist_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get signed URLs for all photos (valid for 1 hour)
      const photosWithUrls = await Promise.all(
        (data || []).map(async (photo) => {
          const { data: urlData, error: urlError } = await supabase.storage
            .from('tourist-photos')
            .createSignedUrl(photo.storage_path, 3600); // 1 hour expiration
          
          if (urlError) {
            console.error('Error creating signed URL:', urlError);
            return {
              ...photo,
              url: ''
            };
          }
          
          return {
            ...photo,
            url: urlData.signedUrl
          };
        })
      );

      setPhotos(photosWithUrls);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error('Erro ao carregar fotos');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo muito grande. Máximo 10MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        toast.error('Formato não suportado. Use JPG, PNG ou WEBP');
        return;
      }
      setUploadData({ ...uploadData, file });
    }
  };

  const handleUpload = async () => {
    if (!user || !uploadData.file) return;

    try {
      setUploading(true);

      // Upload to storage with random UUID filename
      const fileExt = uploadData.file.name.split('.').pop();
      const randomId = crypto.randomUUID();
      const fileName = `${user.id}/${randomId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('tourist-photos')
        .upload(fileName, uploadData.file);

      if (uploadError) throw uploadError;

      // Save metadata
      const { error: dbError } = await supabase
        .from('tourist_photos')
        .insert({
          user_id: user.id,
          storage_path: fileName,
          caption: uploadData.caption || null,
          location: uploadData.location || null
        });

      if (dbError) throw dbError;

      toast.success('Foto enviada com sucesso!');
      setUploadDialogOpen(false);
      setUploadData({ file: null, caption: '', location: '' });
      fetchPhotos();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Erro ao enviar foto');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photo: Photo) => {
    if (!user || photo.user_id !== user.id) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('tourist-photos')
        .remove([photo.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('tourist_photos')
        .delete()
        .eq('id', photo.id);

      if (dbError) throw dbError;

      toast.success('Foto deletada com sucesso!');
      setSelectedPhoto(null);
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Erro ao deletar foto');
    }
  };

  // Show loading state while auth is loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Carregando galeria...</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center gap-3">
              {isPremium && (
                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-primary">
                  <Crown className="w-3 h-3" />
                </Badge>
              )}
              <AppMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container py-8 px-4 space-y-8">
          {/* Hero Section */}
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Camera className="w-10 h-10 text-primary" />
                <div>
                  <h2 className="text-4xl font-bold">Galeria dos Turistas</h2>
                  <p className="text-lg text-muted-foreground">
                    Compartilhe suas experiências no Rio de Janeiro
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setUploadDialogOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Upload className="w-5 h-5 mr-2" />
                Enviar Foto
              </Button>
            </div>

            {/* Info Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {isPremium ? (
                      <Crown className="w-8 h-8 text-yellow-500" />
                    ) : (
                      <Lock className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="space-y-2">
                    {isPremium ? (
                      <>
                        <h3 className="font-semibold">Acesso Premium Ativo</h3>
                        <p className="text-sm text-muted-foreground">
                          Você pode ver todas as fotos compartilhadas por outros turistas e fazer upload das suas!
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="font-semibold">Plano Free</h3>
                        <p className="text-sm text-muted-foreground">
                          Você pode fazer upload de fotos, mas só poderá ver suas próprias imagens. 
                          Assine o plano Premium por apenas R$ 19,90/ano para ver as fotos de todos os turistas!
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold">{visiblePhotos.length}</div>
                  <div className="text-sm text-muted-foreground">
                    {isPremium ? 'Fotos na Galeria' : 'Suas Fotos'}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold">
                    {photos.filter(p => p.user_id === user?.id).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Fotos Enviadas</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold">{photos.length}</div>
                  <div className="text-sm text-muted-foreground">Total de Fotos</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Photos Grid */}
          {visiblePhotos.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma foto ainda</h3>
                <p className="text-muted-foreground mb-4">
                  Seja o primeiro a compartilhar suas experiências!
                </p>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Foto
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Animated Carousel */}
              <Card className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
                    {visiblePhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                          index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption || 'Foto do turista'}
                          className="w-full h-full object-cover animate-zoom"
                          style={{
                            animation: index === currentSlide ? 'kenBurns 5s ease-out' : 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          {photo.location && (
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-lg font-semibold">{photo.location}</span>
                            </div>
                          )}
                          {photo.caption && (
                            <p className="text-sm opacity-90 line-clamp-2">{photo.caption}</p>
                          )}
                        </div>
                        {photo.user_id === user?.id && (
                          <Badge className="absolute top-4 right-4 bg-primary/90">
                            Sua foto
                          </Badge>
                        )}
                      </div>
                    ))}
                    
                    {/* Carousel Controls */}
                    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={prevSlide}
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="pointer-events-auto bg-black/50 hover:bg-black/70 text-white rounded-full"
                        onClick={nextSlide}
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </div>

                    {/* Play/Pause Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white rounded-full z-10"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    >
                      {isAutoPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {visiblePhotos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentSlide 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visiblePhotos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.02}s` }}
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <CardContent className="p-0 relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.caption || 'Foto do turista'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {photo.caption && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-sm text-white line-clamp-2">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      )}
                      {photo.user_id === user?.id && (
                        <Badge className="absolute top-2 right-2 bg-primary/90">
                          Sua foto
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Foto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Escolher Foto (máx 10MB)
              </label>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileSelect}
                disabled={uploading}
              />
            </div>
            {uploadData.file && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ponto Turístico <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={uploadData.location}
                    onValueChange={(value) => setUploadData({ ...uploadData, location: value })}
                    disabled={uploading}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Selecione o ponto turístico..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-background z-[100]">
                      {sortedTouristSpots.map((spotName) => (
                        <SelectItem key={spotName} value={spotName}>
                          {spotName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Legenda (opcional)
                  </label>
                  <Textarea
                    placeholder="Descreva sua foto..."
                    value={uploadData.caption}
                    onChange={(e) => setUploadData({ ...uploadData, caption: e.target.value })}
                    disabled={uploading}
                    rows={3}
                  />
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setUploadDialogOpen(false);
                  setUploadData({ file: null, caption: '', location: '' });
                }}
                disabled={uploading}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!uploadData.file || !uploadData.location || uploading}
                className="flex-1"
              >
                {uploading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-5 h-5" />
          </Button>
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || 'Foto do turista'}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <div className="p-6 space-y-4">
                {selectedPhoto.caption && (
                  <div>
                    <h3 className="font-semibold mb-1">Legenda</h3>
                    <p className="text-muted-foreground">{selectedPhoto.caption}</p>
                  </div>
                )}
                {selectedPhoto.location && (
                  <div>
                    <h3 className="font-semibold mb-1">Local</h3>
                    <p className="text-muted-foreground">{selectedPhoto.location}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-1">Data</h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedPhoto.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {selectedPhoto.user_id === user?.id && (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedPhoto)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deletar Foto
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
