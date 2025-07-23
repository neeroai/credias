#!/usr/bin/env node

/**
 * Script para procesar y extraer colores, tipografía y componentes del diseño de Figma
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colores extraídos del diseño
const extractedColors = new Map();
const extractedFonts = new Map();
const extractedComponents = [];

/**
 * Convierte color de Figma (0-1) a HEX
 */
function figmaColorToHex(color) {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Procesa un nodo recursivamente para extraer colores y estilos
 */
function processNode(node, path = '') {
  const nodePath = path ? `${path} > ${node.name}` : node.name;
  
  // Extraer colores de fills
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach(fill => {
      if (fill.type === 'SOLID' && fill.color) {
        const hex = figmaColorToHex(fill.color);
        const colorKey = `${hex}-${nodePath}`;
        if (!extractedColors.has(hex)) {
          extractedColors.set(hex, {
            hex,
            rgb: fill.color,
            usedIn: [nodePath],
            count: 1
          });
        } else {
          const existing = extractedColors.get(hex);
          existing.usedIn.push(nodePath);
          existing.count++;
        }
      }
    });
  }
  
  // Extraer colores de strokes
  if (node.strokes && Array.isArray(node.strokes)) {
    node.strokes.forEach(stroke => {
      if (stroke.type === 'SOLID' && stroke.color) {
        const hex = figmaColorToHex(stroke.color);
        const colorKey = `${hex}-stroke-${nodePath}`;
        if (!extractedColors.has(hex)) {
          extractedColors.set(hex, {
            hex,
            rgb: stroke.color,
            usedIn: [`${nodePath} (stroke)`],
            count: 1
          });
        }
      }
    });
  }
  
  // Extraer información de texto
  if (node.type === 'TEXT' && node.style) {
    const fontKey = `${node.style.fontFamily || 'Unknown'}-${node.style.fontSize || 0}`;
    if (!extractedFonts.has(fontKey)) {
      extractedFonts.set(fontKey, {
        family: node.style.fontFamily,
        size: node.style.fontSize,
        weight: node.style.fontWeight,
        lineHeight: node.style.lineHeightPx,
        letterSpacing: node.style.letterSpacing,
        usedIn: [nodePath]
      });
    }
  }
  
  // Registrar componentes importantes
  if (node.type === 'FRAME' || node.type === 'GROUP') {
    extractedComponents.push({
      id: node.id,
      name: node.name,
      type: node.type,
      path: nodePath,
      bounds: node.absoluteBoundingBox
    });
  }
  
  // Procesar hijos recursivamente
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(child => processNode(child, nodePath));
  }
}

/**
 * Genera la paleta de colores para Tailwind
 */
function generateColorPalette(colors) {
  // Agrupar colores similares
  const colorGroups = {
    primary: [],
    secondary: [],
    neutral: [],
    success: [],
    warning: [],
    error: [],
    other: []
  };
  
  // Clasificar colores por tonalidad
  colors.forEach((colorInfo, hex) => {
    const r = colorInfo.rgb.r * 255;
    const g = colorInfo.rgb.g * 255;
    const b = colorInfo.rgb.b * 255;
    
    // Clasificación básica por color dominante
    if (r > 200 && g < 100 && b < 100) {
      colorGroups.error.push({ ...colorInfo, hex });
    } else if (r > 200 && g > 150 && b < 100) {
      colorGroups.warning.push({ ...colorInfo, hex });
    } else if (r < 100 && g > 200 && b < 100) {
      colorGroups.success.push({ ...colorInfo, hex });
    } else if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20) {
      colorGroups.neutral.push({ ...colorInfo, hex });
    } else if (b > r && b > g) {
      colorGroups.primary.push({ ...colorInfo, hex });
    } else {
      colorGroups.other.push({ ...colorInfo, hex });
    }
  });
  
  return colorGroups;
}

/**
 * Función principal
 */
async function processDesign() {
  try {
    // Leer el archivo extraído
    const extractPath = path.join(__dirname, '../src/design/figma-extract.json');
    const data = JSON.parse(await fs.readFile(extractPath, 'utf8'));
    
    console.log('🎨 Procesando diseño de Figma...\n');
    
    // Procesar todos los nodos
    Object.values(data.nodeData).forEach(nodeData => {
      if (nodeData.document) {
        processNode(nodeData.document);
      }
    });
    
    // Generar reporte de colores
    console.log(`📊 Colores encontrados: ${extractedColors.size}`);
    const colorPalette = generateColorPalette(extractedColors);
    
    // Generar reporte de tipografía
    console.log(`📝 Fuentes encontradas: ${extractedFonts.size}`);
    
    // Generar reporte de componentes
    console.log(`🧩 Componentes encontrados: ${extractedComponents.length}\n`);
    
    // Crear documentación del sistema de diseño
    const designSystem = {
      metadata: {
        ...data.metadata,
        processedAt: new Date().toISOString()
      },
      colors: {
        all: Array.from(extractedColors.entries()).map(([hex, info]) => ({
          hex,
          rgb: info.rgb,
          usage: info.count,
          locations: info.usedIn.slice(0, 3) // Primeras 3 ubicaciones
        })),
        palette: colorPalette
      },
      typography: Array.from(extractedFonts.values()),
      components: extractedComponents,
      summary: {
        totalColors: extractedColors.size,
        totalFonts: extractedFonts.size,
        totalComponents: extractedComponents.length
      }
    };
    
    // Guardar el sistema de diseño procesado
    const outputPath = path.join(__dirname, '../docs/design-system.json');
    await fs.writeFile(outputPath, JSON.stringify(designSystem, null, 2), 'utf8');
    console.log(`✓ Sistema de diseño guardado en: docs/design-system.json`);
    
    // Crear documentación en Markdown
    await createMarkdownDocs(designSystem);
    
    // Actualizar configuración de Tailwind
    await updateTailwindConfig(designSystem);
    
    console.log('\n✅ Procesamiento completado exitosamente!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

/**
 * Crea documentación en Markdown
 */
async function createMarkdownDocs(designSystem) {
  const mdContent = `# Sistema de Diseño - CrediAS

Extraído del diseño de Figma el ${new Date(designSystem.metadata.processedAt).toLocaleString()}

## 📊 Resumen

- **Colores únicos**: ${designSystem.summary.totalColors}
- **Estilos de texto**: ${designSystem.summary.totalFonts}
- **Componentes**: ${designSystem.summary.totalComponents}

## 🎨 Paleta de Colores

### Colores Principales
${designSystem.colors.palette.primary.map(c => `- ${c.hex} - Usado ${c.count} veces`).join('\n') || '- No se encontraron colores primarios definidos'}

### Colores Neutrales
${designSystem.colors.palette.neutral.map(c => `- ${c.hex} - Usado ${c.count} veces`).join('\n') || '- No se encontraron colores neutrales'}

### Todos los Colores
${designSystem.colors.all.slice(0, 20).map(c => `- ${c.hex} - Usado ${c.usage} veces`).join('\n')}
${designSystem.colors.all.length > 20 ? `\n... y ${designSystem.colors.all.length - 20} colores más` : ''}

## 📝 Tipografía

${designSystem.typography.map(font => `
### ${font.family || 'Sin definir'} - ${font.size}px
- Peso: ${font.weight || 'normal'}
- Altura de línea: ${font.lineHeight || 'auto'}px
- Espaciado: ${font.letterSpacing || 0}px
`).join('\n') || 'No se encontraron estilos de texto definidos'}

## 🧩 Componentes Principales

${designSystem.components.slice(0, 10).map(comp => `
### ${comp.name}
- Tipo: ${comp.type}
- ID: ${comp.id}
`).join('\n')}

---

*Documento generado automáticamente desde Figma*
`;

  const outputPath = path.join(__dirname, '../docs/design-system.md');
  await fs.writeFile(outputPath, mdContent, 'utf8');
  console.log(`✓ Documentación creada en: docs/design-system.md`);
}

/**
 * Actualiza la configuración de Tailwind con los colores extraídos
 */
async function updateTailwindConfig(designSystem) {
  // Por ahora, solo mostraremos qué colores deberían agregarse
  console.log('\n📝 Colores sugeridos para Tailwind:');
  
  // Obtener los 5 colores más usados de cada categoría
  Object.entries(designSystem.colors.palette).forEach(([category, colors]) => {
    if (colors.length > 0) {
      console.log(`\n${category}:`);
      colors.slice(0, 5).forEach(color => {
        console.log(`  '${category}-custom': '${color.hex}', // Usado ${color.count} veces`);
      });
    }
  });
}

// Ejecutar
processDesign();