import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { runFullMigration } from '@/utils/migrateImages';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ImageMigrationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const { toast } = useToast();

  const handleMigration = async () => {
    setIsMigrating(true);
    setResults([]);

    try {
      const { uploadResults, databaseUpdate } = await runFullMigration();

      const logs: string[] = [];
      
      logs.push('=== UPLOAD DE IMAGENS ===');
      uploadResults.forEach((result) => {
        logs.push(
          `${result.success ? '✅' : '❌'} ${result.fileName}: ${result.message}`
        );
      });

      logs.push('\n=== ATUALIZAÇÃO DO BANCO ===');
      logs.push(`${databaseUpdate.success ? '✅' : '❌'} ${databaseUpdate.message}`);

      setResults(logs);

      toast({
        title: 'Migração concluída',
        description: databaseUpdate.success
          ? 'Todas as imagens foram migradas com sucesso!'
          : 'Migração concluída com alguns erros. Verifique os detalhes.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na migração',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
      });
      setResults(['❌ Erro fatal na migração']);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Upload className="h-4 w-4" />
        Migrar Imagens para Storage
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Migração de Imagens para Supabase Storage</DialogTitle>
            <DialogDescription>
              Esta ferramenta irá migrar todas as imagens de pontos turísticos de src/assets/
              para o bucket 'tourist-spot-images' do Supabase Storage e atualizar os registros
              no banco de dados.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">O que será feito:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Upload de 6 imagens para o bucket 'tourist-spot-images'</li>
                <li>Atualização dos paths no banco de dados</li>
                <li>Verificação de que o bucket está público</li>
              </ul>
            </div>

            <Button
              onClick={handleMigration}
              disabled={isMigrating}
              className="w-full"
              size="lg"
            >
              {isMigrating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migrando...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Iniciar Migração
                </>
              )}
            </Button>

            {results.length > 0 && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Resultados:</h4>
                <pre className="text-xs whitespace-pre-wrap font-mono">
                  {results.join('\n')}
                </pre>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
