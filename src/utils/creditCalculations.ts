import { CreditProductType, CreditCalculation } from '@/types/credit';

// Tasas de interés por tipo de producto (anuales)
const interestRates: Record<CreditProductType, number> = {
  personal: 0.24, // 24% anual
  microcrédito: 0.28, // 28% anual
  libranza: 0.18, // 18% anual (preferencial)
};

/**
 * Calcula la cuota mensual usando la fórmula de anualidades
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  termInMonths: number
): number => {
  const monthlyRate = annualRate / 12;
  
  if (monthlyRate === 0) {
    return principal / termInMonths;
  }
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termInMonths)) /
    (Math.pow(1 + monthlyRate, termInMonths) - 1);
    
  return Math.round(monthlyPayment);
};

/**
 * Calcula la capacidad de pago basada en ingresos y gastos
 */
export const calculatePaymentCapacity = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebts: number
): number => {
  const availableIncome = monthlyIncome - monthlyExpenses - existingDebts;
  // Máximo 30% del ingreso disponible puede ir a nuevo crédito
  return Math.round(availableIncome * 0.3);
};

/**
 * Calcula la relación deuda-ingreso
 */
export const calculateDebtToIncomeRatio = (
  totalMonthlyDebt: number,
  monthlyIncome: number
): number => {
  return (totalMonthlyDebt / monthlyIncome) * 100;
};

/**
 * Determina el monto máximo que se puede aprobar
 */
export const getMaxApprovedAmount = (
  paymentCapacity: number,
  productType: CreditProductType,
  termInMonths: number
): number => {
  const annualRate = interestRates[productType];
  const monthlyRate = annualRate / 12;
  
  if (monthlyRate === 0) {
    return paymentCapacity * termInMonths;
  }
  
  // Calcular capital usando la fórmula inversa de anualidades
  const maxAmount = 
    (paymentCapacity * (Math.pow(1 + monthlyRate, termInMonths) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, termInMonths));
    
  return Math.round(maxAmount);
};

/**
 * Realiza un análisis completo de crédito
 */
export const performCreditAnalysis = (
  requestedAmount: number,
  termInMonths: number,
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebts: number,
  productType: CreditProductType
): CreditCalculation => {
  const annualRate = interestRates[productType];
  const monthlyPayment = calculateMonthlyPayment(requestedAmount, annualRate, termInMonths);
  const totalAmount = monthlyPayment * termInMonths;
  const totalInterest = totalAmount - requestedAmount;
  
  const paymentCapacity = calculatePaymentCapacity(monthlyIncome, monthlyExpenses, existingDebts);
  const totalMonthlyDebt = existingDebts + monthlyPayment;
  const debtToIncomeRatio = calculateDebtToIncomeRatio(totalMonthlyDebt, monthlyIncome);
  
  const warnings: string[] = [];
  let isApproved = true;
  
  // Verificar capacidad de pago
  if (monthlyPayment > paymentCapacity) {
    isApproved = false;
    warnings.push(`La cuota mensual ($${monthlyPayment.toLocaleString()}) excede su capacidad de pago ($${paymentCapacity.toLocaleString()})`);
  }
  
  // Verificar relación deuda-ingreso
  if (debtToIncomeRatio > 50) {
    isApproved = false;
    warnings.push(`La relación deuda-ingreso (${debtToIncomeRatio.toFixed(1)}%) excede el límite del 50%`);
  } else if (debtToIncomeRatio > 40) {
    warnings.push(`La relación deuda-ingreso (${debtToIncomeRatio.toFixed(1)}%) es alta. Considere reducir el monto o plazo`);
  }
  
  // Verificar monto mínimo de ingresos
  const minimumIncome = monthlyPayment * 3; // Ingresos deben ser al menos 3 veces la cuota
  if (monthlyIncome < minimumIncome) {
    isApproved = false;
    warnings.push(`Los ingresos mensuales deben ser al menos $${minimumIncome.toLocaleString()}`);
  }
  
  // Verificar límites del producto
  const productLimits = getProductLimits(productType);
  if (requestedAmount > productLimits.maxAmount) {
    isApproved = false;
    warnings.push(`El monto solicitado excede el límite máximo de $${productLimits.maxAmount.toLocaleString()}`);
  }
  
  if (termInMonths > productLimits.maxTerm) {
    isApproved = false;
    warnings.push(`El plazo solicitado excede el límite máximo de ${productLimits.maxTerm} meses`);
  }
  
  return {
    monthlyPayment,
    totalAmount,
    totalInterest,
    apr: annualRate * 100,
    paymentCapacity,
    debtToIncomeRatio,
    isApproved,
    warnings
  };
};

/**
 * Obtiene los límites del producto
 */
export const getProductLimits = (productType: CreditProductType) => {
  switch (productType) {
    case 'personal':
      return { maxAmount: 3000000, maxTerm: 24 };
    case 'microcrédito':
      return { maxAmount: 5000000, maxTerm: 36 };
    case 'libranza':
      return { maxAmount: 10000000, maxTerm: 72 };
    default:
      return { maxAmount: 3000000, maxTerm: 24 };
  }
};

/**
 * Sugiere un monto alternativo basado en la capacidad de pago
 */
export const suggestAlternativeAmount = (
  paymentCapacity: number,
  productType: CreditProductType,
  preferredTerm: number
): { amount: number; monthlyPayment: number } => {
  const maxAmount = getMaxApprovedAmount(paymentCapacity, productType, preferredTerm);
  const productLimits = getProductLimits(productType);
  
  const suggestedAmount = Math.min(maxAmount, productLimits.maxAmount);
  const monthlyPayment = calculateMonthlyPayment(suggestedAmount, interestRates[productType], preferredTerm);
  
  return {
    amount: Math.round(suggestedAmount),
    monthlyPayment: Math.round(monthlyPayment)
  };
};

/**
 * Calcula el score básico de crédito
 */
export const calculateCreditScore = (
  monthlyIncome: number,
  debtToIncomeRatio: number,
  hasNegativeReports: boolean,
  employmentStability: number // meses en el trabajo actual
): { score: number; category: 'Excelente' | 'Bueno' | 'Regular' | 'Malo' } => {
  let score = 100;
  
  // Penalizar por reportes negativos
  if (hasNegativeReports) {
    score -= 40;
  }
  
  // Evaluar ingresos
  if (monthlyIncome >= 2000000) {
    score += 10;
  } else if (monthlyIncome < 1000000) {
    score -= 10;
  }
  
  // Evaluar relación deuda-ingreso
  if (debtToIncomeRatio > 50) {
    score -= 30;
  } else if (debtToIncomeRatio > 30) {
    score -= 15;
  } else if (debtToIncomeRatio < 20) {
    score += 10;
  }
  
  // Evaluar estabilidad laboral
  if (employmentStability >= 24) {
    score += 15;
  } else if (employmentStability >= 12) {
    score += 10;
  } else if (employmentStability < 6) {
    score -= 20;
  }
  
  // Normalizar score entre 0 y 100
  score = Math.max(0, Math.min(100, score));
  
  let category: 'Excelente' | 'Bueno' | 'Regular' | 'Malo';
  if (score >= 80) {
    category = 'Excelente';
  } else if (score >= 60) {
    category = 'Bueno';
  } else if (score >= 40) {
    category = 'Regular';
  } else {
    category = 'Malo';
  }
  
  return { score, category };
};

/**
 * Formatea valores monetarios
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Convierte tasa anual a mensual
 */
export const annualToMonthlyRate = (annualRate: number): number => {
  return annualRate / 12;
};

/**
 * Calcula el costo total del crédito
 */
export const calculateTotalCost = (
  principal: number,
  monthlyPayment: number,
  termInMonths: number
): { total: number; interest: number; costPercentage: number } => {
  const total = monthlyPayment * termInMonths;
  const interest = total - principal;
  const costPercentage = (interest / principal) * 100;
  
  return {
    total: Math.round(total),
    interest: Math.round(interest),
    costPercentage: Math.round(costPercentage * 100) / 100
  };
};