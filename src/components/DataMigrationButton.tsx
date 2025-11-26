import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Database, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { migrateAllTouristData } from '@/utils/migrateAllData';

export default function DataMigrationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleMigration = async () => {
    setIsMigrating(true);
    setResults(null);
    
    try {
      console.log('🚀 Iniciando migração completa de dados...');
      const migrationResults = await migrateAllTouristData();
      
      setResults(migrationResults);
      
      if (migrationResults.success) {
        toast({
          title: "✅ Migração Concluída!",
          description: `${migrationResults.inserted} pontos turísticos migrados com sucesso.`,
        });
      } else {
        toast({
          title: "⚠️ Migração Concluída com Avisos",
          description: `${migrationResults.inserted} inseridos, mas ${migrationResults.errors.length} erros ocorreram.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('❌ Erro na migração:', error);
      toast({
        title: "❌ Erro na Migração",
        description: "Ocorreu um erro durante a migração. Veja o console para detalhes.",
        variant: "destructive",
      });
      setResults({
        success: false,
        errors: [String(error)]
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Database className="w-4 h-4" />
          Migrar Dados Completos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Migração Completa de Dados
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <p>
              Este processo irá migrar TODOS os {110}+ pontos turísticos do arquivo local
              para o banco de dados Supabase.
            </p>
            <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
              <p className="font-semibold">O que será feito:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Fazer upload de todas as imagens para o bucket 'tourist-spot-images'</li>
                <li>Inserir/atualizar todos os pontos turísticos no banco de dados</li>
                <li>Converter paths de imagem para apenas nomes de arquivo</li>
                <li>Mapear campos corretamente (region → category, risk → risk_level)</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              ⚠️ Este processo pode demorar alguns minutos. Não feche esta janela.
            </p>
          </DialogDescription>
        </DialogHeader>

        {!isMigrating && !results && (
          <div className="space-y-4">
            <Button onClick={handleMigration} className="w-full">
              <Database className="w-4 h-4 mr-2" />
              Iniciar Migração Completa
            </Button>
          </div>
        )}

        {isMigrating && (
          <div className="space-y-4 py-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground text-center">
                Migrando pontos turísticos... Este processo pode levar alguns minutos.
                <br />
                Por favor, aguarde...
              </p>
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              {results.success ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold">
                  {results.success ? 'Migração Concluída!' : 'Migração Concluída com Avisos'}
                </h3>
                <div className="text-sm space-y-1">
                  <p>📊 Total de spots: {results.totalSpots}</p>
                  <p>✅ Inseridos/Atualizados: {results.inserted}</p>
                  <p>🖼️ Imagens enviadas: {results.imagesUploaded}</p>
                  {results.errors.length > 0 && (
                    <p className="text-destructive">❌ Erros: {results.errors.length}</p>
                  )}
                </div>
              </div>
            </div>

            {results.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-destructive">Erros Detalhados:</h4>
                <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-40">
                  {results.errors.join('\n')}
                </pre>
              </div>
            )}

            <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
