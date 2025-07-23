import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Content Container */}
      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Badge */}
              <div className="flex">
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 text-sm font-medium px-4 py-2"
                >
                  🚀 Créditos rápidos y seguros
                </Badge>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                  Tu{' '}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    aliado confiable
                  </span>{' '}
                  en soluciones de crédito
                </h1>
                
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                  Obtén el financiamiento que necesitas de forma rápida, segura y transparente. 
                  Con CrediAS, tu futuro financiero está en buenas manos.
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-4 h-14 text-lg"
              >
                Solicitar Crédito Ahora
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 h-14 text-lg"
              >
                Conocer Requisitos
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border/50">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary">+10K</div>
                  <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary">24h</div>
                  <div className="text-sm text-muted-foreground">Aprobación promedio</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl font-bold text-primary">99.8%</div>
                  <div className="text-sm text-muted-foreground">Tasa de satisfacción</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/banner.png"
                  alt="CrediAS - Soluciones de crédito confiables"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    // Fallback to gradient background if image fails
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.className += ' bg-gradient-to-br from-primary/20 to-secondary/20 aspect-[4/3] flex items-center justify-center'
                      parent.innerHTML = '<div class="text-center p-8"><div class="text-4xl font-bold text-primary mb-4">CrediAS</div><div class="text-muted-foreground">Tu aliado en créditos</div></div>'
                    }
                  }}
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full animate-float opacity-80" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/3 -right-8 w-12 h-12 bg-primary rounded-full animate-float opacity-70" style={{ animationDelay: '4s' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-muted/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}

export default Hero