import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FinancialInfo, CreditProductType } from '@/types/credit';
import { financialInfoSchema, FinancialInfoFormData } from '@/utils/creditValidation';
import { 
  performCreditAnalysis, 
  formatCurrency, 
  suggestAlternativeAmount, 
  getProductLimits
} from '@/utils/creditCalculations';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';
import { 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialInfoFormProps {
  data?: FinancialInfo;
  productType?: CreditProductType;
  onDataChange: (data: FinancialInfo) => void;
}

export default function FinancialInfoForm({ data, productType = 'personal', onDataChange }: FinancialInfoFormProps) {
  const [calculation, setCalculation] = useState<any>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const form = useForm<FinancialInfoFormData>({
    resolver: zodResolver(financialInfoSchema),
    defaultValues: {
      monthlyIncome: data?.monthlyIncome || 0,
      monthlyExpenses: data?.monthlyExpenses || 0,
      existingDebts: data?.existingDebts || 0,
      requestedAmount: data?.requestedAmount || 300000,
      requestedTerm: data?.requestedTerm || 12,
    }
  });

  const watchedValues = form.watch();
  const productLimits = getProductLimits(productType);

  // Calcular en tiempo real
  useEffect(() => {
    const { monthlyIncome, monthlyExpenses, existingDebts, requestedAmount, requestedTerm } = watchedValues;
    
    if (monthlyIncome > 0 && requestedAmount > 0 && requestedTerm > 0) {
      const analysis = performCreditAnalysis(
        requestedAmount,
        requestedTerm,
        monthlyIncome,
        monthlyExpenses,
        existingDebts,
        productType
      );
      setCalculation(analysis);
      
      // Mostrar sugerencia si no está aprobado
      setShowSuggestion(!analysis.isApproved && analysis.paymentCapacity > 0);
    }
  }, [watchedValues, productType]);

  // Enviar datos al padre cuando cambien
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.monthlyIncome && values.requestedAmount && values.requestedTerm) {
        const financialData: FinancialInfo = {
          ...values,
          paymentCapacity: calculation?.paymentCapacity,
          debtToIncomeRatio: calculation?.debtToIncomeRatio,
        } as FinancialInfo;
        onDataChange(financialData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange, calculation]);

  const applySuggestion = () => {
    if (calculation?.paymentCapacity) {
      const suggestion = suggestAlternativeAmount(
        calculation.paymentCapacity, 
        productType, 
        watchedValues.requestedTerm
      );
      form.setValue('requestedAmount', suggestion.amount);
      setShowSuggestion(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Información Financiera
        </h3>
        <p className="text-gray-600 mt-2">
          Cuéntanos sobre tus ingresos para calcular tu capacidad de pago
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Ingresos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-brand-purple-500" />
                Ingresos y Gastos Mensuales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingresos Mensuales *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            placeholder="1500000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-12 pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Incluye salario, pensión, ingresos por ventas, etc.
                      </p>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="monthlyExpenses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gastos Mensuales *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            placeholder="800000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-12 pl-8"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        Arriendo, servicios, alimentación, transporte, etc.
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="existingDebts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deudas Existentes (Cuotas Mensuales)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <Input
                          type="number"
                          placeholder="200000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="h-12 pl-8"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500">
                      Suma de todas las cuotas mensuales de otros créditos
                    </p>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Crédito Solicitado */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-brand-purple-500" />
                Crédito Solicitado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="requestedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto Solicitado *</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-12 pl-8"
                          />
                        </div>
                        <Slider
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          max={productLimits.maxAmount}
                          min={300000}
                          step={100000}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>$300,000</span>
                          <span>{formatCurrency(productLimits.maxAmount)}</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requestedTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plazo (Meses) *</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="h-12"
                        />
                        <Slider
                          value={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          max={productLimits.maxTerm}
                          min={6}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>6 meses</span>
                          <span>{productLimits.maxTerm} meses</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Resultados del Cálculo */}
      {calculation && (
        <Card className={cn(
          'border-2',
          calculation.isApproved 
            ? 'border-green-200 bg-green-50' 
            : 'border-red-200 bg-red-50'
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className={cn(
                'w-5 h-5',
                calculation.isApproved ? 'text-green-600' : 'text-red-600'
              )} />
              Análisis de Crédito
              <Badge variant={calculation.isApproved ? 'default' : 'destructive'}>
                {calculation.isApproved ? 'Aprobado' : 'Requiere Ajustes'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(calculation.monthlyPayment)}
                </div>
                <div className="text-sm text-gray-600">Cuota Mensual</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(calculation.totalAmount)}
                </div>
                <div className="text-sm text-gray-600">Total a Pagar</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">
                  {calculation.debtToIncomeRatio.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Endeudamiento</div>
              </div>
              
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-gray-900">
                  {calculation.apr.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Tasa Anual</div>
              </div>
            </div>

            {/* Advertencias */}
            {calculation.warnings.length > 0 && (
              <div className="space-y-2">
                {calculation.warnings.map((warning, index) => (
                  <Alert key={index} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{warning}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {/* Sugerencia de monto alternativo */}
            {showSuggestion && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>
                    Basado en tu capacidad de pago, te sugerimos un monto de{' '}
                    <strong>
                      {formatCurrency(
                        suggestAlternativeAmount(
                          calculation.paymentCapacity, 
                          productType, 
                          watchedValues.requestedTerm
                        ).amount
                      )}
                    </strong>
                  </span>
                  <Button size="sm" onClick={applySuggestion} className="ml-4">
                    Aplicar
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Mensaje de aprobación */}
            {calculation.isApproved && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  ¡Excelente! Tu solicitud cumple con todos los requisitos financieros. 
                  Puedes continuar con el siguiente paso.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Información educativa */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">
                Tips para mejorar tu capacidad de pago
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mantén tu relación deuda-ingreso por debajo del 30%</li>
                <li>• Considera un plazo mayor para reducir la cuota mensual</li>
                <li>• Asegúrate de tener ingresos estables y demostrables</li>
                <li>• Evita solicitar montos superiores a tu capacidad real</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}