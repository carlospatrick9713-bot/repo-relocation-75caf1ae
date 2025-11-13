import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Crown, Mail, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { usePremium } from '@/hooks/usePremium';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Delete user account using Supabase Admin API would be needed here
      // For now, we'll sign out the user and show a message
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast({
        title: "Solicitação enviada",
        description: "Entre em contato com o suporte para concluir a exclusão da sua conta.",
      });
      
      navigate('/');
    } catch (error: any) {
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
                onClick={() => navigate('/')} 
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
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
