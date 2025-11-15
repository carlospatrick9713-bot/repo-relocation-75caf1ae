import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Crown, Mail, Calendar, AlertTriangle, Camera, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';
import PremiumCard from '@/components/PremiumCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const { isPremium } = usePremium();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma imagem válida.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Delete old avatar if exists
      if (profile?.avatar_url) {
        const oldPath = profile.avatar_url.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`${user.id}/${oldPath}`]);
        }
      }

      // Upload new avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Invalidate profile query to refetch
      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });

      toast({
        title: "Sucesso",
        description: "Foto de perfil atualizada com sucesso!",
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Erro ao atualizar foto",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      if (!user) return;

      // Delete the user profile (this will trigger the cascade delete of photos)
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Sign out the user
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      toast({
        title: "Conta deletada",
        description: "Sua conta e todas as suas fotos foram removidas permanentemente.",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: "Erro ao deletar conta",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta com sucesso.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro ao fazer logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            <img 
              src={logo} 
              alt="Safe Trip" 
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => {
                localStorage.removeItem('hideHero');
                navigate('/');
              }}
            />
              <h1 className="text-xl font-bold">{t('header.title')}</h1>
            </div>
            <AppMenu />
          </div>
        </header>

        <main className="container py-8 px-4 max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <User className="w-10 h-10 text-primary" />
              <h2 className="text-4xl font-bold">Meu Perfil</h2>
            </div>
            <p className="text-lg text-muted-foreground">Gerencie suas informações e configurações</p>
          </div>

          {/* User Info Card */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Informações da Conta</span>
                {isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-primary">
                    <Crown className="w-3 h-3" />
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4 pb-4 border-b">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={user.email || 'User'} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <Upload className="w-6 h-6 text-white animate-pulse" />
                    ) : (
                      <Camera className="w-6 h-6 text-white" />
                    )}
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Clique na foto para alterar
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Membro desde</p>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Crown className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Plano</p>
                  <p className="font-medium">{isPremium ? 'Premium' : 'Gratuito'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Card for Non-Premium Users */}
          {!isPremium && (
            <div className="animate-fade-in">
              <PremiumCard />
            </div>
          )}

          {/* Actions Card */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Ações da Conta</CardTitle>
              <CardDescription>
                Gerencie sua conta e preferências
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full"
                variant="outline"
                onClick={handleLogout}
              >
                Sair da Conta
              </Button>

              <Button 
                className="w-full"
                variant="outline"
                onClick={() => navigate('/')}
              >
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone Card */}
          <Card className="animate-fade-in border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>
                Ações irreversíveis que afetam permanentemente sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive"
                className="w-full"
                onClick={() => setShowDeleteDialog(true)}
              >
                Deletar Minha Conta
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Tem certeza absoluta?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Esta ação não pode ser desfeita. Isso irá permanentemente deletar sua conta e remover todos os seus dados dos nossos servidores.</p>
              <p className="font-semibold text-foreground">Todos os seus dados serão perdidos, incluindo:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Informações de perfil</li>
                <li>Assinatura Premium (se houver)</li>
                <li>Histórico de uso</li>
                <li>Fotos e dados salvos</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? 'Deletando...' : 'Sim, deletar minha conta'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
