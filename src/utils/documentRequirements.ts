import { CreditProductType, DocumentType, CreditProduct, EmploymentType } from '@/types/credit';

// Información detallada de cada producto de crédito
export const creditProducts: Record<CreditProductType, CreditProduct> = {
  personal: {
    id: 'personal',
    name: 'Crédito Personal',
    description: 'Para empleados, pensionados e independientes que necesitan financiamiento personal',
    maxAmount: 3000000,
    minTerm: 6,
    maxTerm: 24,
    acceptsReported: false,
    requiredDocuments: ['cedula', 'comprobante_ingresos', 'desprendible_pago'],
    targetAudience: ['Empleados con contrato laboral', 'Pensionados', 'Trabajadores independientes'],
    benefits: [
      'Preaprobación en minutos',
      'Proceso 100% online',
      'Sin penalidades por pago anticipado',
      'Cuotas fijas mensuales'
    ],
    disbursementTime: '48 horas'
  },
  
  microcrédito: {
    id: 'microcrédito',
    name: 'Microcrédito para Negocios',
    description: 'Capital de trabajo para microempresarios y emprendedores',
    maxAmount: 5000000,
    minTerm: 6,
    maxTerm: 36,
    acceptsReported: false,
    requiredDocuments: ['cedula', 'rut', 'extracto_bancario', 'registro_mercantil'],
    targetAudience: ['Microempresarios', 'Emprendedores con negocio establecido', 'Comerciantes'],
    benefits: [
      'Asesoría personalizada',
      'Visita al negocio',
      'Plazos adaptados al flujo de caja',
      'Sin cobros ocultos'
    ],
    disbursementTime: 'Variable según evaluación'
  },
  
  libranza: {
    id: 'libranza',
    name: 'Crédito por Libranza',
    description: 'Descuento directo de nómina para empleados con convenio',
    maxAmount: 10000000,
    minTerm: 12,
    maxTerm: 72,
    acceptsReported: true,
    requiredDocuments: ['cedula', 'certificado_laboral', 'desprendible_pago', 'autorizacion_libranza'],
    targetAudience: ['Empleados públicos', 'Empleados privados con convenio', 'Pensionados'],
    benefits: [
      'Tasas preferenciales',
      'Plazos más amplios',
      'Posible aprobación con reportes',
      'Descuento automático de nómina'
    ],
    disbursementTime: '24-48 horas'
  }
};

// Documentos requeridos según el tipo de empleo
export const getRequiredDocumentsByEmployment = (
  employmentType: EmploymentType,
  productType: CreditProductType
): DocumentType[] => {
  const baseDocuments: DocumentType[] = ['cedula'];
  
  switch (employmentType) {
    case 'empleado':
      if (productType === 'libranza') {
        return [...baseDocuments, 'certificado_laboral', 'desprendible_pago', 'autorizacion_libranza', 'carta_pagaduria'];
      }
      return [...baseDocuments, 'certificado_laboral', 'desprendible_pago'];
    
    case 'pensionado':
      if (productType === 'libranza') {
        return [...baseDocuments, 'documento_pension', 'autorizacion_libranza'];
      }
      return [...baseDocuments, 'documento_pension'];
    
    case 'independiente':
      return [...baseDocuments, 'extracto_bancario', 'rut'];
    
    case 'microempresario':
      return [...baseDocuments, 'rut', 'registro_mercantil', 'extracto_bancario'];
    
    default:
      return baseDocuments;
  }
};

// Información detallada de cada tipo de documento
export const documentInfo: Record<DocumentType, {
  name: string;
  description: string;
  acceptedFormats: string[];
  maxSize: number; // en MB
  example?: string;
}> = {
  cedula: {
    name: 'Cédula de Ciudadanía',
    description: 'Fotocopia de la cédula de ciudadanía por ambas caras al 150%',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 5,
    example: 'Asegúrese de que la información sea legible'
  },
  
  comprobante_ingresos: {
    name: 'Comprobante de Ingresos',
    description: 'Certificación de ingresos o extractos bancarios',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 10,
    example: 'Últimos 3 meses para independientes'
  },
  
  desprendible_pago: {
    name: 'Desprendible de Pago',
    description: 'Últimos 2 desprendibles de pago o nómina',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 10,
    example: 'Deben ser consecutivos y recientes'
  },
  
  extracto_bancario: {
    name: 'Extracto Bancario',
    description: 'Extractos bancarios de los últimos 3 meses',
    acceptedFormats: ['PDF'],
    maxSize: 15,
    example: 'Cuenta principal donde maneja sus ingresos'
  },
  
  certificado_laboral: {
    name: 'Certificado Laboral',
    description: 'Certificado laboral con antigüedad y salario actualizado',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 5,
    example: 'No mayor a 30 días de expedición'
  },
  
  documento_pension: {
    name: 'Documento de Pensión',
    description: 'Documento de pensión y último comprobante de pago',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 10,
    example: 'Resolución de pensión o documento equivalente'
  },
  
  rut: {
    name: 'RUT Actualizado',
    description: 'Registro Único Tributario actualizado',
    acceptedFormats: ['PDF'],
    maxSize: 5,
    example: 'No mayor a 90 días de expedición'
  },
  
  registro_mercantil: {
    name: 'Registro Mercantil',
    description: 'Registro mercantil vigente (si el negocio está formalizado)',
    acceptedFormats: ['PDF'],
    maxSize: 5,
    example: 'Solo si el negocio está registrado'
  },
  
  autorizacion_libranza: {
    name: 'Autorización de Libranza',
    description: 'Autorización de descuento por nómina firmada',
    acceptedFormats: ['PDF', 'JPG', 'PNG'],
    maxSize: 5,
    example: 'Formato específico de su entidad'
  },
  
  carta_pagaduria: {
    name: 'Carta de Pagaduría',
    description: 'Carta de autorización de la pagaduría o nómina',
    acceptedFormats: ['PDF'],
    maxSize: 5,
    example: 'Confirmación de la entidad pagadora'
  }
};

// Verificar elegibilidad básica según el producto
export const checkBasicEligibility = (
  age: number,
  hasNegativeReports: boolean,
  productType: CreditProductType,
  employmentType: EmploymentType
): { isEligible: boolean; reasons: string[] } => {
  const reasons: string[] = [];
  
  // Verificar edad
  if (age < 18) {
    reasons.push('Debe ser mayor de 18 años');
  }
  if (age > 75) {
    reasons.push('Debe ser menor de 75 años');
  }
  
  // Verificar reportes en centrales de riesgo
  if (hasNegativeReports && productType !== 'libranza') {
    reasons.push(`El ${creditProducts[productType].name} no acepta personas con reportes negativos`);
  }
  
  // Verificar compatibilidad de empleo con producto
  if (productType === 'libranza' && !['empleado', 'pensionado'].includes(employmentType)) {
    reasons.push('El crédito por libranza solo está disponible para empleados y pensionados');
  }
  
  if (productType === 'microcrédito' && employmentType !== 'microempresario') {
    reasons.push('El microcrédito está diseñado específicamente para microempresarios');
  }
  
  return {
    isEligible: reasons.length === 0,
    reasons
  };
};

// Obtener lista de pagadurías disponibles para libranza
export const getAvailablePayrolls = (): string[] => {
  return [
    'Alcaldía de Bogotá',
    'Alcaldía de Medellín',
    'Alcaldía de Cali',
    'Alcaldía de Barranquilla',
    'Colpensiones',
    'Policía Nacional',
    'Ejército Nacional',
    'Fuerza Aérea Colombiana',
    'Ministerio de Educación',
    'Ministerio de Salud',
    'Universidad Nacional',
    'Universidad de Antioquia',
    'Empresa de Acueducto y Alcantarillado de Bogotá',
    'EPM - Empresas Públicas de Medellín',
    'Otra entidad con convenio'
  ];
};

// Calcular documentos faltantes
export const getMissingDocuments = (
  uploadedDocs: string[],
  requiredDocs: DocumentType[]
): DocumentType[] => {
  return requiredDocs.filter(doc => !uploadedDocs.includes(doc));
};

// Validar formato de archivo
export const validateFileFormat = (
  fileName: string,
  documentType: DocumentType
): { isValid: boolean; error?: string } => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  const acceptedFormats = documentInfo[documentType].acceptedFormats.map(f => f.toLowerCase());
  
  if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      error: `Formato no válido. Formatos aceptados: ${documentInfo[documentType].acceptedFormats.join(', ')}`
    };
  }
  
  return { isValid: true };
};

// Validar tamaño de archivo
export const validateFileSize = (
  fileSize: number,
  documentType: DocumentType
): { isValid: boolean; error?: string } => {
  const maxSizeBytes = documentInfo[documentType].maxSize * 1024 * 1024; // Convertir MB a bytes
  
  if (fileSize > maxSizeBytes) {
    return {
      isValid: false,
      error: `El archivo es muy grande. Tamaño máximo: ${documentInfo[documentType].maxSize}MB`
    };
  }
  
  return { isValid: true };
};