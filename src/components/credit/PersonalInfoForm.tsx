import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PersonalInfo, EmploymentType } from '@/types/credit';
import { personalInfoSchema, conditionalPersonalInfoSchema, PersonalInfoFormData } from '@/utils/creditValidation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { User, Building2, UserCheck, Briefcase } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PersonalInfoFormProps {
  data?: PersonalInfo;
  onDataChange: (data: PersonalInfo) => void;
}

const employmentOptions = [
  {
    id: 'empleado' as EmploymentType,
    label: 'Empleado',
    description: 'Trabajo con contrato laboral',
    icon: Briefcase
  },
  {
    id: 'pensionado' as EmploymentType,
    label: 'Pensionado',
    description: 'Recibo pensión',
    icon: UserCheck
  },
  {
    id: 'independiente' as EmploymentType,
    label: 'Independiente',
    description: 'Trabajo por cuenta propia',
    icon: User
  },
  {
    id: 'microempresario' as EmploymentType,
    label: 'Microempresario',
    description: 'Tengo mi propio negocio',
    icon: Building2
  }
];

export default function PersonalInfoForm({ data, onDataChange }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      documentNumber: data?.documentNumber || '',
      email: data?.email || '',
      phone: data?.phone || '',
      address: data?.address || '',
      city: data?.city || '',
      department: data?.department || '',
      birthDate: data?.birthDate || '',
      employmentType: data?.employmentType || 'empleado',
      companyName: data?.companyName || '',
      jobTitle: data?.jobTitle || '',
      workExperience: data?.workExperience || undefined,
    }
  });

  const watchedEmploymentType = form.watch('employmentType');

  // Actualizar esquema de validación cuando cambie el tipo de empleo
  useEffect(() => {
    const newSchema = conditionalPersonalInfoSchema(watchedEmploymentType);
    form.clearErrors();
    // Revalidar con el nuevo esquema
    form.trigger();
  }, [watchedEmploymentType, form]);

  // Enviar datos al padre cuando cambien los valores
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.firstName && values.lastName && values.documentNumber && values.email && values.phone) {
        onDataChange(values as PersonalInfo);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  const requiresCompanyInfo = ['empleado', 'microempresario'].includes(watchedEmploymentType);
  const requiresJobTitle = watchedEmploymentType === 'empleado';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Información Personal
        </h3>
        <p className="text-gray-600 mt-2">
          Completa tus datos básicos. Toda la información debe ser veraz y actualizada.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          {/* Datos Básicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-purple-500" />
                Datos Básicos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombres *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tus nombres"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellidos *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingresa tus apellidos"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Cédula *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234567890"
                          {...field}
                          type="text"
                          maxLength={12}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de Nacimiento *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-purple-500" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo Electrónico *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ejemplo@correo.com"
                          type="email"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Celular *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="3001234567"
                          type="tel"
                          maxLength={10}
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Residencia *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Calle 123 # 45-67, Barrio Centro"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Bogotá"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cundinamarca"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Información Laboral */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-purple-500" />
                Información Laboral
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Vinculación Laboral *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {employmentOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = field.value === option.id;
                          
                          return (
                            <div key={option.id} className="flex items-center space-x-2">
                              <RadioGroupItem 
                                value={option.id} 
                                id={option.id}
                                className="sr-only" 
                              />
                              <Label
                                htmlFor={option.id}
                                className={cn(
                                  'flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all w-full',
                                  isSelected 
                                    ? 'border-brand-purple-500 bg-brand-purple-50' 
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                )}
                              >
                                <Icon className={cn(
                                  'w-5 h-5 mr-3',
                                  isSelected ? 'text-brand-purple-500' : 'text-gray-400'
                                )} />
                                <div>
                                  <div className={cn(
                                    'font-medium',
                                    isSelected ? 'text-brand-purple-900' : 'text-gray-900'
                                  )}>
                                    {option.label}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {option.description}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campos condicionales según tipo de empleo */}
              {requiresCompanyInfo && (
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchedEmploymentType === 'microempresario' ? 'Nombre del Negocio' : 'Empresa'} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              watchedEmploymentType === 'microempresario' 
                                ? "Ej: Tienda La Esquina" 
                                : "Ej: Empresa XYZ S.A.S."
                            }
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="workExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {watchedEmploymentType === 'microempresario' 
                            ? 'Tiempo del Negocio (meses)' 
                            : 'Antigüedad Laboral (meses)'} *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="12"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {requiresJobTitle && (
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo que Desempeña *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Analista, Supervisor, Gerente"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Información importante */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">!</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-blue-800">
              Información importante
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Todos los datos que ingreses deben coincidir exactamente con los 
              documentos que subas posteriormente. Cualquier inconsistencia puede 
              retrasar el proceso de aprobación.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}