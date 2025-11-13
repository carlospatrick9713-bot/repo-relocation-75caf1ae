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
import { Menu, User, Sparkles, MapPin, Cloud, AlertTriangle, Images, LogOut, Crown, Utensils, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

interface AppMenuProps {
  onNavigate?: (section: string) => void;
}

export default function AppMenu({ onNavigate }: AppMenuProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = usePremium();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logout realizado com sucesso!');
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
      'highlights': '/highlights',
      'spots': '/tourist-spots',
      'restaurants': '/restaurants',
      'weather': '/weather',
      'security-alerts': '/security-alerts',
      'gallery': '/gallery'
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
          <SheetTitle className="text-xl">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* User Section */}
          {user ? (
            <div className="space-y-3 pb-4 border-b">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.email}</p>
                  {isPremium ? (
                    <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      <Crown className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Plano Free</p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
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
              onClick={() => handleMenuClick('highlights')}
            >
              <Sparkles className="w-5 h-5 mr-3 text-primary" />
              Destaques
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12"
              onClick={() => handleMenuClick('spots')}
            >
              <MapPin className="w-5 h-5 mr-3 text-primary" />
              Pontos Turísticos
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12 relative"
              onClick={() => handleMenuClick('restaurants')}
            >
              <Utensils className="w-5 h-5 mr-3 text-primary" />
              Restaurantes
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
              Meteorologia
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-base h-12 relative"
              onClick={() => handleMenuClick('security-alerts')}
            >
              <Shield className="w-5 h-5 mr-3 text-primary" />
              Alertas de Segurança
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
              Galeria dos Turistas
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
                  <p className="text-lg font-bold text-primary">R$ 19,90/ano</p>
                </div>
              </div>
              <Button className="w-full" size="sm">
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
