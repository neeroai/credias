#!/usr/bin/env node

/**
 * Script para descargar assets (imágenes, iconos) desde Figma
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN || 'YOUR_FIGMA_TOKEN_HERE';
const FILE_KEY = 'AWFBI9O2rG27A5Cr6qSHKu';
const FIGMA_API_BASE = 'https://api.figma.com/v1';

const headers = {
  'X-Figma-Token': FIGMA_TOKEN
};

/**
 * Descarga una imagen desde una URL
 */
async function downloadImage(url, filepath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const buffer = await response.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(buffer));
    return true;
  } catch (error) {
    console.error(`Error descargando ${filepath}:`, error.message);
    return false;
  }
}

/**
 * Extrae IDs de nodos que contienen imágenes o son exportables
 */
function extractExportableNodes(node, exportableNodes = []) {
  // Buscar nodos con fills de tipo IMAGE
  if (node.fills && Array.isArray(node.fills)) {
    const hasImage = node.fills.some(fill => fill.type === 'IMAGE');
    if (hasImage) {
      exportableNodes.push({
        id: node.id,
        name: node.name,
        type: 'IMAGE'
      });
    }
  }
  
  // Buscar nodos que parezcan ser iconos o logos
  const iconKeywords = ['icon', 'logo', 'svg', 'brand', 'symbol'];
  const isIcon = iconKeywords.some(keyword => 
    node.name.toLowerCase().includes(keyword)
  );
  
  if (isIcon && (node.type === 'VECTOR' || node.type === 'GROUP' || node.type === 'FRAME')) {
    exportableNodes.push({
      id: node.id,
      name: node.name,
      type: 'ICON'
    });
  }
  
  // Buscar componentes importantes para exportar
  if (node.name && (
    node.name.toLowerCase().includes('hero') ||
    node.name.toLowerCase().includes('banner') ||
    node.name.toLowerCase().includes('illustration')
  )) {
    exportableNodes.push({
      id: node.id,
      name: node.name,
      type: 'COMPONENT'
    });
  }
  
  // Procesar hijos recursivamente
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(child => extractExportableNodes(child, exportableNodes));
  }
  
  return exportableNodes;
}

/**
 * Función principal
 */
async function downloadAssets() {
  try {
    console.log('🎨 Iniciando descarga de assets desde Figma...\n');
    
    // Leer el archivo extraído anteriormente
    const extractPath = path.join(__dirname, '../src/design/figma-extract.json');
    const data = JSON.parse(await fs.readFile(extractPath, 'utf8'));
    
    // Extraer nodos exportables
    const exportableNodes = [];
    Object.values(data.nodeData).forEach(nodeData => {
      if (nodeData.document) {
        extractExportableNodes(nodeData.document, exportableNodes);
      }
    });
    
    console.log(`📦 Nodos exportables encontrados: ${exportableNodes.length}\n`);
    
    if (exportableNodes.length === 0) {
      console.log('⚠️  No se encontraron assets para exportar');
      return;
    }
    
    // Limitar a los primeros 20 nodos más importantes
    const nodesToExport = exportableNodes.slice(0, 20);
    const nodeIds = nodesToExport.map(n => n.id).join(',');
    
    // Solicitar URLs de exportación
    console.log('🔗 Obteniendo URLs de exportación...');
    const imageUrlsEndpoint = `/images/${FILE_KEY}?ids=${nodeIds}&format=png&scale=2`;
    
    const response = await fetch(`${FIGMA_API_BASE}${imageUrlsEndpoint}`, { headers });
    if (!response.ok) {
      throw new Error(`Error en API de Figma: ${response.status}`);
    }
    
    const imageData = await response.json();
    
    if (!imageData.images || Object.keys(imageData.images).length === 0) {
      console.log('⚠️  No se obtuvieron URLs de imágenes');
      return;
    }
    
    console.log(`✓ URLs obtenidas: ${Object.keys(imageData.images).length}\n`);
    
    // Descargar cada imagen
    console.log('📥 Descargando assets...\n');
    
    for (const [nodeId, imageUrl] of Object.entries(imageData.images)) {
      const node = nodesToExport.find(n => n.id === nodeId);
      if (!node) continue;
      
      // Determinar carpeta según tipo
      let folder = 'images';
      if (node.type === 'ICON') folder = 'icons';
      if (node.type === 'IMAGE' && node.name.toLowerCase().includes('logo')) folder = 'logo';
      
      // Limpiar nombre para usar como filename
      const filename = node.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') + '.png';
      
      const filepath = path.join(__dirname, `../public/assets/${folder}/${filename}`);
      
      console.log(`📥 Descargando: ${node.name} → ${folder}/${filename}`);
      const success = await downloadImage(imageUrl, filepath);
      
      if (success) {
        console.log(`✓ Descargado exitosamente`);
      } else {
        console.log(`❌ Error al descargar`);
      }
    }
    
    // Crear archivo de índice de assets
    const assetsIndex = {
      timestamp: new Date().toISOString(),
      assets: nodesToExport.map(node => {
        const folder = node.type === 'ICON' ? 'icons' : 
                      (node.type === 'IMAGE' && node.name.toLowerCase().includes('logo')) ? 'logo' : 'images';
        const filename = node.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '') + '.png';
        
        return {
          id: node.id,
          name: node.name,
          type: node.type,
          path: `/assets/${folder}/${filename}`
        };
      })
    };
    
    await fs.writeFile(
      path.join(__dirname, '../public/assets/assets-index.json'),
      JSON.stringify(assetsIndex, null, 2),
      'utf8'
    );
    
    console.log('\n✅ Descarga de assets completada!');
    console.log(`📁 Assets guardados en: public/assets/`);
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Ejecutar
downloadAssets();