/**
 * Script de Migração Completa de Dados
 * 
 * Este script migra TODOS os pontos turísticos do arquivo estático local
 * para o Supabase, incluindo upload de imagens e atualização do banco.
 */

import { supabase } from '@/integrations/supabase/client';
import { touristSpots } from '@/data/touristSpots';

// Função auxiliar para gerar nome de arquivo a partir do nome do spot
function generateImageFilename(spotName: string): string {
  // Converte nome do spot em um nome de arquivo válido
  // Ex: "Cristo Redentor (Corcovado)" => "cristo-redentor-corcovado.jpg"
  return spotName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    + '.jpg';
}

interface MigrationResult {
  success: boolean;
  totalSpots: number;
  inserted: number;
  updated: number;
  imagesUploaded: number;
  errors: string[];
}

export async function migrateAllTouristData(): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: false,
    totalSpots: touristSpots.length,
    inserted: 0,
    updated: 0,
    imagesUploaded: 0,
    errors: []
  };

  console.log(`🚀 [Migração] Iniciando migração de ${touristSpots.length} pontos turísticos...`);

  try {
    // 1. Processar cada ponto turístico
    for (const spot of touristSpots) {
      try {
        console.log(`📍 [Migração] Processando: ${spot.name}`);

        // 2. Processar imagem principal
        let imageFilename = '';
        
        if (spot.image) {
          // Se a imagem é um import do Vite, é uma URL blob ou data URL
          // Neste caso, precisamos fazer upload da imagem local
          if (typeof spot.image === 'string' && spot.image.startsWith('http')) {
            // É uma URL do Vite - precisamos buscar e fazer upload
            const imageName = generateImageFilename(spot.name);
            imageFilename = imageName;
            
            try {
              // Busca a imagem
              const response = await fetch(spot.image);
              const blob = await response.blob();
              
              // Faz upload para o Supabase Storage
              const { error: uploadError } = await supabase.storage
                .from('tourist-spot-images')
                .upload(imageFilename, blob, {
                  cacheControl: '3600',
                  upsert: true
                });

              if (uploadError) {
                console.warn(`⚠️ [Migração] Erro ao fazer upload da imagem ${imageFilename}:`, uploadError);
                result.errors.push(`Upload falhou para ${spot.name}: ${uploadError.message}`);
              } else {
                result.imagesUploaded++;
                console.log(`✅ [Migração] Imagem enviada: ${imageFilename}`);
              }
            } catch (uploadErr) {
              console.warn(`⚠️ [Migração] Erro ao processar imagem para ${spot.name}:`, uploadErr);
              result.errors.push(`Erro ao processar imagem para ${spot.name}`);
            }
          } else {
            // É um path relativo ou nome de arquivo - usa o nome gerado
            imageFilename = generateImageFilename(spot.name);
          }
        }

        // 3. Preparar dados para inserção/atualização
        const dbData = {
          name: spot.name,
          description: spot.description,
          category: spot.region, // 'region' no arquivo => 'category' no banco
          risk_level: spot.risk, // 'risk' no arquivo => 'risk_level' no banco
          lat: spot.location.lat,
          lng: spot.location.lng,
          image: imageFilename || '', // Apenas o nome do arquivo
        };

        // 4. Tentar inserir (upsert baseado no nome único)
        const { error: upsertError } = await supabase
          .from('tourist_spots')
          .upsert(dbData, {
            onConflict: 'name', // Assume que 'name' é único ou tem constraint
            ignoreDuplicates: false
          });

        if (upsertError) {
          console.error(`❌ [Migração] Erro ao inserir/atualizar ${spot.name}:`, upsertError);
          result.errors.push(`DB error para ${spot.name}: ${upsertError.message}`);
        } else {
          result.inserted++;
          console.log(`✅ [Migração] Dados salvos: ${spot.name}`);
        }

      } catch (spotError) {
        console.error(`❌ [Migração] Erro ao processar ${spot.name}:`, spotError);
        result.errors.push(`Erro geral para ${spot.name}: ${String(spotError)}`);
      }
    }

    // 5. Finalizar
    result.success = result.errors.length === 0;
    console.log(`✅ [Migração] Concluída!`);
    console.log(`   📊 Total: ${result.totalSpots}`);
    console.log(`   ✅ Inseridos/Atualizados: ${result.inserted}`);
    console.log(`   🖼️ Imagens enviadas: ${result.imagesUploaded}`);
    console.log(`   ❌ Erros: ${result.errors.length}`);

    return result;

  } catch (error) {
    console.error('❌ [Migração] Erro fatal:', error);
    result.errors.push(`Erro fatal: ${String(error)}`);
    return result;
  }
}
