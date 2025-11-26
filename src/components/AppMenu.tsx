import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User, Sparkles, MapPin, Cloud, AlertTriangle, Images, LogOut, Crown, Utensils, Shield, MessageCircle, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { ImageMigrationButton } from '@/components/ImageMigrationButton';
import DataMigrationButton from '@/components/DataMigrationButton';

interface AppMenuProps {
  onNavigate?: (section: string) => void;
}

export default function AppMenu({ onNavigate }: AppMenuProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const [open, setOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url, full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success(t('auth.logoutSuccess'));
    setOpen(false);
    navigate('/auth');
  };

  const handleLogin = () => {
    setOpen(false);
    navigate('/auth');
  };

  const handleMenuClick = (section: string) => {
    setOpen(false);
    
    // Navigate to specific pages
    const routes: Record<string, string> = {
      'home': '/home',
      'highlights': '/highlights',
      'spots': '/tourist-spots',
      'restaurants': '/restaurants',
      'weather': '/weather',
      'security-alerts': '/security-alerts',
      'gallery': '/gallery',
      'slang': '/slang'
    };
    
    const route = routes[section];
    if (route) {
      navigate(route);
    } else if (onNavigate) {
      onNavigate(section);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl">{t('common.menu')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* User Section */}
          {user ? (
            <div className="space-y-3 pb-4 border-b">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors" onClick={() => { setOpen(false); navigate('/profile'); }}>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.full_name || user.email || 'User'} />
                  <AvatarFallback className="bg-primary/10">
                    <User className="w-5 h-5 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{profile?.full_name || user.email}</p>
                  {isPremium ? (
                    <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      <Crown className="w-3 h-3" />
                      <span>{t('profile.premiumPlan')}</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">{t('profile.freePlan')}</p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => { setOpen(false); navigate('/profile'); }}
              >
                <User className="w-4 h-4 mr-2" />
                Meu Perfil
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <div className="space-y-2">
                <DataMigrationButton />
                <ImageMigrationButton />
              </div>
            </div>
          ) : (
            <div className="pb-4 border-b">
              <Button
                variant="default"
                className="w-full justify-start"
                onClick={handleLogin}
              >
                <User className="w-4 h-4 mr-2" />
                Login / Cadastro
              </Button>
            </div>
          )}

          {/* Menu Items */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('home')}
            >
              <Home className="w-5 h-5 mr-3 text-primary" />
              {t('menu.home')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('highlights')}
            >
              <Sparkles className="w-5 h-5 mr-3 text-primary" />
              {t('menu.highlights')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('spots')}
            >
              <MapPin className="w-5 h-5 mr-3 text-primary" />
              {t('menu.touristSpots')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12 relative"
              onClick={() => handleMenuClick('restaurants')}
            >
              <Utensils className="w-5 h-5 mr-3 text-primary" />
              {t('menu.restaurants')}
              {!isPremium && (
                <Crown className="w-4 h-4 ml-auto text-yellow-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('weather')}
            >
              <Cloud className="w-5 h-5 mr-3 text-primary" />
              {t('menu.weather')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12 relative"
              onClick={() => handleMenuClick('security-alerts')}
            >
              <Shield className="w-5 h-5 mr-3 text-primary" />
              {t('menu.securityAlerts')}
              {!isPremium && (
                <Crown className="w-4 h-4 ml-auto text-yellow-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('gallery')}
            >
              <Images className="w-5 h-5 mr-3 text-primary" />
              {t('menu.gallery')}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12 relative"
              onClick={() => handleMenuClick('slang')}
            >
              <MessageCircle className="w-5 h-5 mr-3 text-primary" />
              {t('menu.slang')}
              {!isPremium && (
                <Crown className="w-4 h-4 ml-auto text-yellow-500" />
              )}
            </Button>
          </div>

          <Separator />

          {/* Premium CTA */}
          {!isPremium && (
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <Crown className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-1">Assine Premium</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Acesso completo a rotas seguras e recursos exclusivos
                  </p>
                  <p className="text-lg font-bold text-primary">R$ 29,90/ano</p>
                </div>
              </div>
              <Button 
                className="w-full" 
                size="sm"
                onClick={() => window.open('https://pay.kiwify.com.br/lBcZdOF', '_blank')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Assinar Agora
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
