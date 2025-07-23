import { z } from 'zod';
import { CreditProductType, EmploymentType } from '@/types/credit';

// Esquemas de validación base
export const personalInfoSchema = z.object({
  firstName: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'El nombre solo puede contener letras'),
  
  lastName: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'El apellido solo puede contener letras'),
  
  documentNumber: z.string()
    .min(6, 'La cédula debe tener al menos 6 dígitos')
    .max(12, 'La cédula no puede exceder 12 dígitos')
    .regex(/^\d+$/, 'La cédula solo puede contener números'),
  
  email: z.string()
    .email('Ingrese un email válido')
    .min(5, 'El email debe tener al menos 5 caracteres')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(10, 'El teléfono debe tener exactamente 10 dígitos')
    .regex(/^3\d{9}$/, 'Ingrese un número de celular válido (debe empezar con 3)'),
  
  address: z.string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(100, 'La dirección no puede exceder 100 caracteres'),
  
  city: z.string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(50, 'La ciudad no puede exceder 50 caracteres'),
  
  department: z.string()
    .min(4, 'El departamento debe tener al menos 4 caracteres')
    .max(50, 'El departamento no puede exceder 50 caracteres'),
  
  birthDate: z.string()
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 80;
    }, 'Debe ser mayor de 18 años y menor de 80 años'),
  
  employmentType: z.enum(['empleado', 'pensionado', 'independiente', 'microempresario'] as const),
  
  companyName: z.string()
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres')
    .max(100, 'El nombre de la empresa no puede exceder 100 caracteres')
    .optional(),
  
  jobTitle: z.string()
    .min(2, 'El cargo debe tener al menos 2 caracteres')
    .max(50, 'El cargo no puede exceder 50 caracteres')
    .optional(),
  
  workExperience: z.number()
    .min(0, 'La experiencia laboral no puede ser negativa')
    .max(50, 'La experiencia laboral no puede exceder 50 años')
    .optional(),
});

export const financialInfoSchema = z.object({
  monthlyIncome: z.number()
    .min(737717, 'Los ingresos mensuales deben ser al menos 1 SMMLV ($737,717)')
    .max(50000000, 'Los ingresos mensuales no pueden exceder $50,000,000'),
  
  monthlyExpenses: z.number()
    .min(0, 'Los gastos mensuales no pueden ser negativos')
    .max(50000000, 'Los gastos mensuales no pueden exceder $50,000,000'),
  
  existingDebts: z.number()
    .min(0, 'Las deudas existentes no pueden ser negativas')
    .max(50000000, 'Las deudas existentes no pueden exceder $50,000,000'),
  
  requestedAmount: z.number()
    .min(300000, 'El monto mínimo a solicitar es $300,000')
    .max(3000000, 'El monto máximo a solicitar es $3,000,000'),
  
  requestedTerm: z.number()
    .min(6, 'El plazo mínimo es 6 meses')
    .max(24, 'El plazo máximo es 24 meses'),
});

// Validación condicional basada en tipo de empleo
export const conditionalPersonalInfoSchema = (employmentType: EmploymentType) => {
  const baseSchema = personalInfoSchema;
  
  if (employmentType === 'empleado') {
    return baseSchema.extend({
      companyName: z.string().min(2, 'El nombre de la empresa es requerido'),
      jobTitle: z.string().min(2, 'El cargo es requerido'),
      workExperience: z.number().min(3, 'Se requiere mínimo 3 meses de experiencia'),
    });
  }
  
  if (employmentType === 'microempresario') {
    return baseSchema.extend({
      companyName: z.string().min(2, 'El nombre del negocio es requerido'),
      workExperience: z.number().min(6, 'El negocio debe tener mínimo 6 meses de operación'),
    });
  }
  
  return baseSchema;
};

// Validación de documentos requeridos
export const validateRequiredDocuments = (
  documents: Array<{ type: string; isRequired: boolean }>,
  productType: CreditProductType
): { isValid: boolean; missingDocuments: string[] } => {
  const requiredDocs = documents.filter(doc => doc.isRequired);
  const uploadedDocs = documents.filter(doc => doc.type);
  
  const missingDocuments = requiredDocs
    .filter(doc => !uploadedDocs.some(uploaded => uploaded.type === doc.type))
    .map(doc => doc.type);
  
  return {
    isValid: missingDocuments.length === 0,
    missingDocuments
  };
};

// Validación de términos y condiciones
export const termsSchema = z.object({
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Debe aceptar los términos y condiciones'
  }),
  dataProcessingAccepted: z.boolean().refine(val => val === true, {
    message: 'Debe autorizar el tratamiento de datos personales'
  }),
  creditBureauAccepted: z.boolean().refine(val => val === true, {
    message: 'Debe autorizar la consulta en centrales de riesgo'
  }),
});

// Esquema completo de la aplicación
export const creditApplicationSchema = z.object({
  productType: z.enum(['personal', 'microcrédito', 'libranza'] as const),
  personalInfo: personalInfoSchema,
  financialInfo: financialInfoSchema,
  documents: z.array(z.object({
    type: z.string(),
    name: z.string(),
    isRequired: z.boolean(),
  })).min(1, 'Debe cargar al menos un documento'),
  termsAccepted: z.boolean().refine(val => val === true),
});

// Tipos derivados de los esquemas
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type FinancialInfoFormData = z.infer<typeof financialInfoSchema>;
export type TermsFormData = z.infer<typeof termsSchema>;
export type CreditApplicationFormData = z.infer<typeof creditApplicationSchema>;