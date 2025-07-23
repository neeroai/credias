export type CreditProductType = 'personal' | 'microcrédito' | 'libranza';

export type EmploymentType = 'empleado' | 'pensionado' | 'independiente' | 'microempresario';

export type DocumentType = 
  | 'cedula'
  | 'comprobante_ingresos'
  | 'desprendible_pago'
  | 'extracto_bancario'
  | 'certificado_laboral'
  | 'documento_pension'
  | 'rut'
  | 'registro_mercantil'
  | 'autorizacion_libranza'
  | 'carta_pagaduria';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  birthDate: string;
  employmentType: EmploymentType;
  companyName?: string;
  jobTitle?: string;
  workExperience?: number;
}

export interface FinancialInfo {
  monthlyIncome: number;
  monthlyExpenses: number;
  existingDebts: number;
  requestedAmount: number;
  requestedTerm: number;
  paymentCapacity?: number;
  debtToIncomeRatio?: number;
}

export interface UploadedDocument {
  id: string;
  type: DocumentType;
  name: string;
  file: File;
  uploadedAt: Date;
  isRequired: boolean;
}

export interface EligibilityCheck {
  isEligible: boolean;
  reasons: string[];
  productType: CreditProductType;
}

export interface CreditProduct {
  id: CreditProductType;
  name: string;
  description: string;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  acceptsReported: boolean;
  requiredDocuments: DocumentType[];
  targetAudience: string[];
  benefits: string[];
  disbursementTime: string;
}

export interface CreditApplication {
  id: string;
  productType: CreditProductType;
  personalInfo: PersonalInfo;
  financialInfo: FinancialInfo;
  documents: UploadedDocument[];
  termsAccepted: boolean;
  currentStep: number;
  submissionStatus: 'draft' | 'submitted' | 'reviewing' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  applicationNumber?: string;
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
  isAccessible: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface CreditCalculation {
  monthlyPayment: number;
  totalAmount: number;
  totalInterest: number;
  apr: number;
  paymentCapacity: number;
  debtToIncomeRatio: number;
  isApproved: boolean;
  warnings: string[];
}