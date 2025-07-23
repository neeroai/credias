import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FeatureProps {
  className?: string
}

const Features: React.FC<FeatureProps> = ({ className }) => {
  const features = [
    {
      icon: '🚀',
      title: 'Aprobación Rápida',
      description: 'Respuesta en menos de 24 horas. Nuestro sistema automatizado evalúa tu solicitud de forma eficiente.',
      highlight: 'Hasta 24h'
    },
    {
      icon: '🔒',
      title: 'Totalmente Seguro',
      description: 'Tus datos están protegidos con encriptación de nivel bancario y cumplimos todas las normativas.',
      highlight: 'Seguridad total'
    },
    {
      icon: '💰',
      title: 'Tasas Competitivas',
      description: 'Ofrecemos las mejores tasas del mercado adaptadas a tu perfil crediticio.',
      highlight: 'Desde 1.5%'
    },
    {
      icon: '📱',
      title: 'Proceso 100% Digital',
      description: 'Sin papeleos ni filas. Todo el proceso se realiza desde tu móvil o computadora.',
      highlight: '100% Digital'
    },
    {
      icon: '🎯',
      title: 'Montos Flexibles',
      description: 'Desde pequeños préstamos hasta grandes financiamientos según tus necesidades.',
      highlight: '$500 - $50K'
    },
    {
      icon: '🤝',
      title: 'Atención Personalizada',
      description: 'Un equipo de expertos te acompañará durante todo el proceso de solicitud.',
      highlight: 'Soporte 24/7'
    }
  ]

  return (
    <section id="servicios" className={cn("section-padding bg-muted/20", className)}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              ✨ Nuestros Servicios
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              ¿Por qué elegir{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CrediAS?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Somos más que una plataforma de créditos. Somos tu aliado estratégico 
              para alcanzar tus metas financieras con confianza y transparencia.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-background/80 backdrop-blur"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs font-medium border-primary/30 text-primary"
                  >
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-8 border-t border-border/50">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">
              ¿Listo para comenzar?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Únete a miles de personas que ya confían en CrediAS para sus necesidades financieras.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features