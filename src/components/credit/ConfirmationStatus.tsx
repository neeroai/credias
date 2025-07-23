import { CreditApplication } from '@/types/credit';

interface ConfirmationStatusProps {
  application: Partial<CreditApplication>;
  onStartNew: () => void;
}

export default function ConfirmationStatus({ 
  application, 
  onStartNew 
}: ConfirmationStatusProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Confirmación de Solicitud
        </h3>
        <p className="text-gray-600 mt-1">
          Tu solicitud ha sido enviada exitosamente
        </p>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <p className="text-gray-600">
          🚧 Pantalla en construcción
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Este componente se implementará en el siguiente paso
        </p>
      </div>
    </div>
  );
}