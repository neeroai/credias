#!/usr/bin/env node

/**
 * Script para extraer información de diseño desde Figma
 * Usa la API de Figma para obtener colores, tipografía y componentes
 */

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN || 'YOUR_FIGMA_TOKEN_HERE';
const FILE_KEY = 'AWFBI9O2rG27A5Cr6qSHKu';
const NODE_ID = '2274-12564';

// Configuración de la API
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const headers = {
  'X-Figma-Token': FIGMA_TOKEN
};

/**
 * Hace una petición a la API de Figma
 */
async function fetchFigmaAPI(endpoint) {
  try {
    const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from Figma:', error);
    throw error;
  }
}

/**
 * Extrae información del archivo de Figma
 */
async function extractFigmaFile() {
  console.log('🎨 Extrayendo información del archivo de Figma...\n');
  
  try {
    // 1. Obtener información del archivo
    console.log('📄 Obteniendo información del archivo...');
    const fileData = await fetchFigmaAPI(`/files/${FILE_KEY}`);
    console.log(`✓ Archivo: ${fileData.name}`);
    console.log(`✓ Última modificación: ${fileData.lastModified}\n`);
    
    // 2. Obtener estilos del archivo
    console.log('🎨 Obteniendo estilos...');
    const stylesData = await fetchFigmaAPI(`/files/${FILE_KEY}/styles`);
    console.log(`✓ Estilos encontrados: ${stylesData.meta?.styles?.length || 0}\n`);
    
    // 3. Obtener componentes
    console.log('🧩 Obteniendo componentes...');
    const componentsData = await fetchFigmaAPI(`/files/${FILE_KEY}/components`);
    console.log(`✓ Componentes encontrados: ${Object.keys(componentsData.meta?.components || {}).length}\n`);
    
    // 4. Obtener nodo específico si se proporciona
    if (NODE_ID) {
      console.log('📍 Obteniendo nodo específico...');
      const nodeData = await fetchFigmaAPI(`/files/${FILE_KEY}/nodes?ids=${NODE_ID}`);
      console.log('✓ Nodo obtenido\n');
      
      // Procesar y guardar la información
      await processAndSaveDesignData({
        file: fileData,
        styles: stylesData,
        components: componentsData,
        node: nodeData
      });
    }
    
  } catch (error) {
    console.error('❌ Error durante la extracción:', error.message);
    process.exit(1);
  }
}

/**
 * Procesa y guarda los datos de diseño extraídos
 */
async function processAndSaveDesignData(data) {
  const { promises: fs } = await import('fs');
  const path = await import('path');
  
  console.log('💾 Procesando y guardando datos...\n');
  
  // Crear objeto con toda la información extraída
  const designSystem = {
    metadata: {
      fileName: data.file.name,
      lastModified: data.file.lastModified,
      extractedAt: new Date().toISOString()
    },
    styles: data.styles.meta?.styles || [],
    components: data.components.meta?.components || {},
    nodeData: data.node.nodes || {}
  };
  
  // Guardar en formato JSON
  const outputPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../src/design/figma-extract.json');
  await fs.writeFile(
    outputPath,
    JSON.stringify(designSystem, null, 2),
    'utf8'
  );
  
  console.log(`✓ Datos guardados en: ${outputPath}`);
  console.log('\n🎉 Extracción completada exitosamente!\n');
  
  // Mostrar resumen
  console.log('📊 Resumen de la extracción:');
  console.log(`- Estilos: ${designSystem.styles.length}`);
  console.log(`- Componentes: ${Object.keys(designSystem.components).length}`);
  console.log(`- Nodos: ${Object.keys(designSystem.nodeData).length}`);
}

// Ejecutar el script
console.log('🚀 Iniciando extracción del diseño de Figma...\n');
console.log('📋 Configuración:');
console.log(`- File Key: ${FILE_KEY}`);
console.log(`- Node ID: ${NODE_ID}\n`);

extractFigmaFile().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});