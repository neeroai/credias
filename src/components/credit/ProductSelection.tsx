import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Building2, 
  CreditCard, 
  Clock, 
  DollarSign, 
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { CreditProductType } from '@/types/credit';
import { creditProducts } from '@/utils/documentRequirements';
import { formatCurrency } from '@/utils/creditCalculations';
import { cn } from '@/lib/utils';

interface ProductSelectionProps {
  selectedProduct?: CreditProductType;
  onProductSelect: (product: CreditProductType) => void;
}

const productIcons = {
  personal: User,
  microcrédito: Building2,
  libranza: CreditCard,
};

const productColors = {
  personal: 'bg-blue-50 border-blue-200 text-blue-800',
  microcrédito: 'bg-green-50 border-green-200 text-green-800',
  libranza: 'bg-purple-50 border-purple-200 text-purple-800',
};

export default function ProductSelection({ selectedProduct, onProductSelect }: ProductSelectionProps) {
  const [showDetails, setShowDetails] = useState<CreditProductType | null>(null);

  const handleProductSelect = (productId: string) => {
    onProductSelect(productId as CreditProductType);
  };

  const toggleDetails = (productId: CreditProductType) => {
    setShowDetails(showDetails === productId ? null : productId);
  };

  return (
    <div className="space-y-6">
      {/* Descripción del paso */}
      <div className="text-center">
        <p className="text-gray-600 text-lg">
          Selecciona el tipo de crédito que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Selector de productos */}
      <RadioGroup 
        value={selectedProduct || ''} 
        onValueChange={handleProductSelect}
        className="space-y-4"
      >
        {Object.entries(creditProducts).map(([key, product]) => {
          const productId = key as CreditProductType;
          const Icon = productIcons[productId];
          const isSelected = selectedProduct === productId;
          const isDetailsOpen = showDetails === productId;

          return (
            <div key={productId} className="space-y-0">
              {/* Tarjeta principal del producto */}
              <div className={cn(
                'relative rounded-lg border-2 p-6 cursor-pointer transition-all duration-200',
                isSelected 
                  ? 'border-brand-purple-500 bg-brand-purple-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              )}>
                <div className="flex items-start space-x-4">
                  {/* Radio button */}
                  <div className="flex items-center">
                    <RadioGroupItem 
                      value={productId} 
                      id={productId}
                      className="w-5 h-5"
                    />
                  </div>

                  {/* Icono del producto */}
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center',
                    productColors[productId]
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <Label 
                      htmlFor={productId}
                      className="text-lg font-semibold text-gray-900 cursor-pointer"
                    >
                      {product.name}
                    </Label>
                    <p className="text-gray-600 mt-1 text-sm">
                      {product.description}
                    </p>

                    {/* Características principales */}
                    <div className="flex flex-wrap gap-3 mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Hasta {formatCurrency(product.maxAmount)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {product.minTerm} - {product.maxTerm} meses
                      </div>
                      <div className="flex items-center text-sm">
                        {product.acceptsReported ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                            <span className="text-green-600">Acepta reportados</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-1 text-red-500" />
                            <span className="text-red-600">No acepta reportados</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Desembolso */}
                    <div className="mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Desembolso: {product.disbursementTime}
                      </Badge>
                    </div>
                  </div>

                  {/* Botón de detalles */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(productId)}
                    className="text-brand-purple-600 hover:text-brand-purple-700"
                  >
                    {isDetailsOpen ? 'Ocultar' : 'Ver más'}
                  </Button>
                </div>

                {/* Indicador de selección */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-brand-purple-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Panel de detalles expandido */}
              {isDetailsOpen && (
                <Card className="border-t-0 rounded-t-none">
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Público objetivo */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          ¿Para quién es?
                        </h4>
                        <ul className="space-y-2">
                          {product.targetAudience.map((audience, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {audience}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Beneficios */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">
                          Beneficios principales
                        </h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Documentos requeridos */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Documentos que necesitarás
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.requiredDocuments.map((doc, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {doc.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Advertencias especiales */}
                    {!product.acceptsReported && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">
                              Importante
                            </p>
                            <p className="text-sm text-amber-700">
                              Este producto no está disponible para personas con reportes 
                              negativos en centrales de riesgo (DataCrédito, Cifin, etc.)
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </RadioGroup>

      {/* Información adicional */}
      {selectedProduct && (
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">
                ¡Perfecto! Has seleccionado {creditProducts[selectedProduct].name}
              </p>
              <p className="text-sm text-green-700 mt-1">
                En los siguientes pasos completarás tu información personal, 
                financiera y cargarás los documentos necesarios.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Ayuda al usuario */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">?</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              ¿No estás seguro cuál elegir?
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Puedes cambiar tu selección en cualquier momento antes de completar 
              la solicitud. Si tienes dudas específicas, nuestros asesores te 
              contactarán para orientarte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}