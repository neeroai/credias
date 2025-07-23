import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CreditApplication, FormStep, CreditProductType } from '@/types/credit';
import { cn } from '@/lib/utils';

// Componentes de pasos (por ahora solo importamos el shell)
import ProgressSteps from '@/components/credit/ProgressSteps';
import ProductSelection from '@/components/credit/ProductSelection';
import PersonalInfoForm from '@/components/credit/PersonalInfoForm';
import FinancialInfoForm from '@/components/credit/FinancialInfoForm';
import RequiredDocuments from '@/components/credit/RequiredDocuments';
import ReviewAndSubmit from '@/components/credit/ReviewAndSubmit';
import ConfirmationStatus from '@/components/credit/ConfirmationStatus';

interface CreditOnboardingProps {
  className?: string;
}

const STORAGE_KEY = 'credias_application_draft';

export default function CreditOnboarding({ className }: CreditOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<Partial<CreditApplication>>(() => {
    // Intentar recuperar borrador desde localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          updatedAt: new Date(parsed.updatedAt),
        };
      } catch {
        return {};
      }
    }
    return {};
  });

  const steps: FormStep[] = [
    { id: 1, title: 'Producto', description: 'Selecciona tu tipo de crédito', isComplete: false, isActive: currentStep === 1, isAccessible: true },
    { id: 2, title: 'Información Personal', description: 'Datos básicos de contacto', isComplete: false, isActive: currentStep === 2, isAccessible: currentStep >= 2 },
    { id: 3, title: 'Información Financiera', description: 'Ingresos y capacidad de pago', isComplete: false, isActive: currentStep === 3, isAccessible: currentStep >= 3 },
    { id: 4, title: 'Documentos', description: 'Carga los documentos requeridos', isComplete: false, isActive: currentStep === 4, isAccessible: currentStep >= 4 },
    { id: 5, title: 'Revisión', description: 'Confirma tu solicitud', isComplete: false, isActive: currentStep === 5, isAccessible: currentStep >= 5 },
    { id: 6, title: 'Confirmación', description: 'Estado de tu solicitud', isComplete: false, isActive: currentStep === 6, isAccessible: currentStep >= 6 },
  ];

  // Calcular progreso
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Guardar borrador cuando cambie la aplicación
  useEffect(() => {
    if (Object.keys(application).length > 0) {
      const toSave = {
        ...application,
        updatedAt: new Date(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    }
  }, [application]);

  // Limpiar localStorage cuando se complete la aplicación
  useEffect(() => {
    if (application.submissionStatus === 'submitted') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [application.submissionStatus]);

  const updateApplication = (updates: Partial<CreditApplication>) => {
    setApplication(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  };

  const canGoNext = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!application.productType;
      case 2:
        return !!application.personalInfo?.firstName && 
               !!application.personalInfo?.lastName && 
               !!application.personalInfo?.documentNumber &&
               !!application.personalInfo?.email &&
               !!application.personalInfo?.phone;
      case 3:
        return !!application.financialInfo?.monthlyIncome &&
               !!application.financialInfo?.requestedAmount &&
               !!application.financialInfo?.requestedTerm;
      case 4:
        return (application.documents?.length || 0) > 0;
      case 5:
        return !!application.termsAccepted;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || steps[stepId - 1].isAccessible) {
      setCurrentStep(stepId);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductSelection
            selectedProduct={application.productType}
            onProductSelect={(productType: CreditProductType) => {
              updateApplication({ productType });
            }}
          />
        );
      case 2:
        return (
          <PersonalInfoForm
            data={application.personalInfo}
            onDataChange={(personalInfo) => {
              updateApplication({ personalInfo });
            }}
          />
        );
      case 3:
        return (
          <FinancialInfoForm
            data={application.financialInfo}
            productType={application.productType}
            onDataChange={(financialInfo) => {
              updateApplication({ financialInfo });
            }}
          />
        );
      case 4:
        return (
          <RequiredDocuments
            documents={application.documents || []}
            productType={application.productType}
            employmentType={application.personalInfo?.employmentType}
            onDocumentsChange={(documents) => {
              updateApplication({ documents });
            }}
          />
        );
      case 5:
        return (
          <ReviewAndSubmit
            application={application}
            onTermsAccept={(termsAccepted) => {
              updateApplication({ termsAccepted });
            }}
            onSubmit={() => {
              updateApplication({ 
                submissionStatus: 'submitted',
                submittedAt: new Date(),
                applicationNumber: `CA-${Date.now()}`,
              });
              handleNext();
            }}
          />
        );
      case 6:
        return (
          <ConfirmationStatus
            application={application}
            onStartNew={() => {
              setApplication({});
              setCurrentStep(1);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('w-full max-w-4xl mx-auto p-6', className)}>
      {/* Header con progreso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Solicitar Crédito
            </h1>
            <p className="text-gray-600 mt-1">
              Completa tu solicitud paso a paso
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Paso {currentStep} de {steps.length}
            </div>
            <div className="text-lg font-semibold text-brand-purple-500">
              {Math.round(progress)}% Completado
            </div>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <Progress value={progress} className="h-2 mb-6" />
        
        {/* Indicador de pasos */}
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Contenido del paso actual */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="w-8 h-8 bg-brand-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {currentStep}
            </span>
            {steps[currentStep - 1].title}
          </CardTitle>
          <p className="text-gray-600">{steps[currentStep - 1].description}</p>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Botones de navegación */}
      {currentStep < 6 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canGoNext()}
            className="flex items-center gap-2 bg-brand-purple-500 hover:bg-brand-purple-600"
          >
            {currentStep === 5 ? 'Enviar Solicitud' : 'Siguiente'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Información de ayuda */}
      {currentStep < 6 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                ¿Necesitas ayuda?
              </h4>
              <p className="text-blue-700 text-sm">
                Tu información se guarda automáticamente. Puedes cerrar esta ventana 
                y continuar más tarde desde donde lo dejaste.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}