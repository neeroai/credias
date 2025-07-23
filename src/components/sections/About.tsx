import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AboutProps {
  className?: string
}

const About: React.FC<AboutProps> = ({ className }) => {
  const stats = [
    {
      number: '+10,000',
      label: 'Clientes activos',
      description: 'Personas que confían en nosotros'
    },
    {
      number: '$50M+',
      label: 'Desembolsados',
      description: 'En créditos otorgados'
    },
    {
      number: '99.8%',
      label: 'Satisfacción',
      description: 'De nuestros clientes'
    },
    {
      number: '5+',
      label: 'Años',
      description: 'De experiencia en el mercado'
    }
  ]

  const values = [
    {
      icon: '🎯',
      title: 'Transparencia',
      description: 'Sin letra pequeña ni costos ocultos. Todo claro desde el inicio.'
    },
    {
      icon: '⚡',
      title: 'Rapidez',
      description: 'Procesos optimizados para darte respuestas en tiempo récord.'
    },
    {
      icon: '🛡️',
      title: 'Confianza',
      description: 'Regulados y supervisados por las autoridades financieras.'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Tecnología de vanguardia para mejorar tu experiencia.'
    }
  ]

  return (
    <section id="nosotros" className={cn("section-padding", className)}>
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex">
                <Badge 
                  variant="secondary" 
                  className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20"
                >
                  🏢 Quiénes Somos
                </Badge>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                  Más que una{' '}
                  <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    fintech
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Somos CrediAS, una empresa comprometida con democratizar el acceso 
                  al crédito en Latinoamérica. Creemos que todos merecen oportunidades 
                  financieras justas y transparentes.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Nuestros Valores
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="text-2xl">{value.icon}</div>
                    <div className="space-y-1">
                      <div className="font-semibold text-foreground">{value.title}</div>
                      <div className="text-sm text-muted-foreground">{value.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Conoce Nuestro Equipo
              </Button>
            </div>
          </div>

          {/* Right Column - Stats & Image */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card 
                  key={index}
                  className="text-center p-6 border-0 shadow-md bg-gradient-to-br from-primary/5 to-secondary/5"
                >
                  <CardContent className="p-0 space-y-2">
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="font-semibold text-foreground">
                      {stat.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/assets/images/image-1.png"
                  alt="Equipo CrediAS"
                  className="w-full h-80 object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      parent.className += ' bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center'
                      parent.innerHTML = '<div class="text-center p-8"><div class="text-3xl font-bold text-primary mb-2">Nuestro Equipo</div><div class="text-muted-foreground">Profesionales comprometidos contigo</div></div>'
                    }
                  }}
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4">
                <Card className="p-4 shadow-lg border-0 bg-background">
                  <CardContent className="p-0 text-center">
                    <div className="text-2xl font-bold text-primary">🏆</div>
                    <div className="text-sm font-semibold text-foreground">Premio</div>
                    <div className="text-xs text-muted-foreground">Mejor Fintech 2024</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About