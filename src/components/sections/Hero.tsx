import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const features = [
    'Aprobación en 24 horas',
    'Sin aval requerido',
    'Tasas competitivas',
    'Proceso 100% digital'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-blue rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-green rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-yellow rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Obtén tu{' '}
              <span className="text-gradient">crédito</span>
              <br />
              en minutos
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              CrediAS te ofrece la forma más rápida y segura de obtener el financiamiento que necesitas. 
              Sin complicaciones, sin esperas, sin avales.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-primary-green flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Solicitar Crédito
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Servicios
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                <span>+10,000 clientes satisfechos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                <span>99.9% aprobación</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-blue to-primary-green rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Crédito Aprobado</p>
                      <p className="text-2xl font-bold text-gray-900">$25,000</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tasa de interés</span>
                      <span className="font-semibold">8.5% anual</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Plazo</span>
                      <span className="font-semibold">24 meses</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cuota mensual</span>
                      <span className="font-semibold">$1,150</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-green-700">
                        ✓ Aprobado en 2 minutos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-green/10 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-blue/10 rounded-full animate-bounce animation-delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 