import { FormStep } from '@/types/credit';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressStepsProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export default function ProgressSteps({ steps, currentStep, onStepClick }: ProgressStepsProps) {
  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden md:block">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className={cn(
                stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '',
                'relative'
              )}>
                {/* Connector line */}
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={cn(
                      'h-0.5 w-full',
                      step.isComplete || currentStep > step.id
                        ? 'bg-brand-purple-500'
                        : 'bg-gray-200'
                    )} />
                  </div>
                )}
                
                {/* Step button */}
                <button
                  onClick={() => step.isAccessible ? onStepClick(step.id) : undefined}
                  disabled={!step.isAccessible}
                  className={cn(
                    'relative w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
                    step.isComplete || currentStep > step.id
                      ? 'bg-brand-purple-500 border-brand-purple-500 text-white hover:bg-brand-purple-600'
                      : step.isActive
                      ? 'bg-white border-brand-purple-500 text-brand-purple-500'
                      : step.isAccessible
                      ? 'bg-white border-gray-300 text-gray-400 hover:border-gray-400'
                      : 'bg-gray-100 border-gray-200 text-gray-300 cursor-not-allowed'
                  )}
                >
                  {step.isComplete || currentStep > step.id ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>
                
                {/* Step label */}
                <div className="mt-2">
                  <div className={cn(
                    'text-xs font-medium',
                    step.isActive
                      ? 'text-brand-purple-600'
                      : step.isAccessible
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  )}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 max-w-20 leading-tight">
                    {step.description}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={cn(
              'w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold',
              'bg-brand-purple-500 border-brand-purple-500 text-white'
            )}>
              {steps.find(s => s.isActive)?.isComplete ? (
                <Check className="w-4 h-4" />
              ) : (
                currentStep
              )}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                {steps.find(s => s.isActive)?.title}
              </div>
              <div className="text-xs text-gray-500">
                {steps.find(s => s.isActive)?.description}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {currentStep} de {steps.length}
          </div>
        </div>

        {/* Mobile progress dots */}
        <div className="flex space-x-2 mb-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => step.isAccessible ? onStepClick(step.id) : undefined}
              disabled={!step.isAccessible}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                step.isComplete || currentStep > step.id
                  ? 'bg-brand-purple-500'
                  : step.isActive
                  ? 'bg-brand-purple-400'
                  : step.isAccessible
                  ? 'bg-gray-300 hover:bg-gray-400'
                  : 'bg-gray-200'
              )}
              aria-label={`Ir al paso ${step.id}: ${step.title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}