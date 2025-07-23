import { UploadedDocument, CreditProductType, EmploymentType } from '@/types/credit';

interface RequiredDocumentsProps {
  documents: UploadedDocument[];
  productType?: CreditProductType;
  employmentType?: EmploymentType;
  onDocumentsChange: (documents: UploadedDocument[]) => void;
}

export default function RequiredDocuments({ 
  documents, 
  productType, 
  employmentType, 
  onDocumentsChange 
}: RequiredDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Documentos Requeridos
        </h3>
        <p className="text-gray-600 mt-1">
          Carga los documentos necesarios para tu solicitud
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