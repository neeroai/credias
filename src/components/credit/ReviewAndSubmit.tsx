import { CreditApplication } from '@/types/credit';

interface ReviewAndSubmitProps {
  application: Partial<CreditApplication>;
  onTermsAccept: (accepted: boolean) => void;
  onSubmit: () => void;
}

export default function ReviewAndSubmit({ 
  application, 
  onTermsAccept, 
  onSubmit 
}: ReviewAndSubmitProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Revisión y Envío
        </h3>
        <p className="text-gray-600 mt-1">
          Revisa tu información antes de enviar la solicitud
        </p>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-600">
          🚧 Formulario en construcción
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Este componente se implementará en el siguiente paso
        </p>
      </div>
    </div>
  );
}