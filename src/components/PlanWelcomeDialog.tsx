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
import { Crown, Check } from 'lucide-react';

interface PlanWelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
  onContinueFree: () => void;
}

export default function PlanWelcomeDialog({ 
  open, 
  onOpenChange, 
  onUpgrade, 
  onContinueFree 
}: PlanWelcomeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl flex items-center gap-2">
            Bem-vindo ao Safe Trip Rio! 🎉
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-6 text-left">
            <p className="text-base">
              Escolha seu plano para começar a explorar o Rio de Janeiro com segurança:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Free Plan */}
              <div className="border rounded-lg p-5 space-y-3 bg-muted/30">
                <h3 className="font-semibold text-lg text-foreground">Plano Free</h3>
                <p className="text-2xl font-bold text-foreground">Grátis</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Visualização de pontos turísticos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Informações básicas de segurança</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Horários de funcionamento</span>
                  </li>
                </ul>
              </div>

              {/* Premium Plan */}
              <div className="border-2 border-primary rounded-lg p-5 space-y-3 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  Plano Premium
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                    Recomendado
                  </span>
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  R$ 29,90<span className="text-sm font-normal">/ano</span>
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="font-medium">Tudo do Plano Free, mais:</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Rotas seguras personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Dicas detalhadas de segurança</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Navegação em tempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Acesso completo a todos os recursos</span>
                  </li>
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={onContinueFree}>
            Continuar com Plano Free
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onUpgrade}
            className="bg-gradient-to-r from-yellow-500 to-primary hover:from-yellow-600 hover:to-primary/90"
          >
            <Crown className="w-4 h-4 mr-2" />
            Assinar Plano Premium
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
