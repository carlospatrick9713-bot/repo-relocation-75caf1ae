/**
 * Utilitário para migrar imagens de src/assets para Supabase Storage
 * Execute este arquivo uma vez para fazer a migração completa
 */

import { supabase } from '@/integrations/supabase/client';

// Mapeamento de imagens usadas pelos pontos turísticos
const imageMapping = {
  'cristo-redentor.jpg': '/src/assets/cristo-redentor.jpg',
  'pao-de-acucar.jpg': '/src/assets/pao-de-acucar.jpg',
  'maracana.jpg': '/src/assets/maracana.jpg',
  'jardim-botanico.jpg': '/src/assets/jardim-botanico.jpg',
  'copacabana.jpg': '/src/assets/copacabana.jpg',
  'ipanema.jpg': '/src/assets/ipanema.jpg',
};

interface MigrationResult {
  success: boolean;
  fileName: string;
  message: string;
}

export async function migrateImagesToStorage(): Promise<MigrationResult[]> {
  const results: MigrationResult[] = [];

  for (const [fileName, localPath] of Object.entries(imageMapping)) {
    try {
      // 1. Buscar a imagem local como blob
      const response = await fetch(localPath);
      if (!response.ok) {
        results.push({
          success: false,
          fileName,
          message: `Erro ao buscar imagem local: ${response.statusText}`,
        });
        continue;
      }

      const blob = await response.blob();

      // 2. Fazer upload para o Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('tourist-spot-images')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true, // Sobrescrever se já existir
        });

      if (uploadError) {
        results.push({
          success: false,
          fileName,
          message: `Erro no upload: ${uploadError.message}`,
        });
        continue;
      }

      results.push({
        success: true,
        fileName,
        message: 'Upload realizado com sucesso',
      });
    } catch (error) {
      results.push({
        success: false,
        fileName,
        message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      });
    }
  }

  return results;
}

export async function updateDatabasePaths(): Promise<{ success: boolean; message: string }> {
  try {
    // Buscar todos os registros com paths antigos
    const { data: spots, error: fetchError } = await supabase
      .from('tourist_spots')
      .select('id, image')
      .or('image.like./src/assets/%,image.like.src/assets/%');

    if (fetchError) {
      return { success: false, message: `Erro ao buscar registros: ${fetchError.message}` };
    }

    if (!spots || spots.length === 0) {
      return { success: true, message: 'Nenhum registro precisa ser atualizado' };
    }

    // Atualizar cada registro
    const updates = spots.map((spot) => {
      // Extrair apenas o nome do arquivo
      const fileName = spot.image.split('/').pop() || spot.image;
      return supabase
        .from('tourist_spots')
        .update({ image: fileName })
        .eq('id', spot.id);
    });

    const results = await Promise.all(updates);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
      return {
        success: false,
        message: `${errors.length} erros ao atualizar registros`,
      };
    }

    return {
      success: true,
      message: `${spots.length} registros atualizados com sucesso`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
    };
  }
}

export async function runFullMigration(): Promise<{
  uploadResults: MigrationResult[];
  databaseUpdate: { success: boolean; message: string };
}> {
  console.log('🚀 Iniciando migração de imagens...');

  // 1. Fazer upload das imagens
  console.log('📤 Fazendo upload das imagens para o Supabase Storage...');
  const uploadResults = await migrateImagesToStorage();

  // 2. Atualizar os paths no banco de dados
  console.log('🔄 Atualizando paths no banco de dados...');
  const databaseUpdate = await updateDatabasePaths();

  console.log('✅ Migração concluída!');
  return { uploadResults, databaseUpdate };
}
