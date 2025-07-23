import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ProductsProps {
  className?: string
}

const Products: React.FC<ProductsProps> = ({ className }) => {
  const products = [
    {
      name: 'Crédito Personal',
      description: 'Para tus proyectos personales y gastos imprevistos',
      icon: '👤',
      badge: 'Más Popular',
      badgeColor: 'bg-primary/10 text-primary border-primary/20',
      features: [
        'Montos desde $500 hasta $15,000',
        'Plazos de 6 a 36 meses',
        'Tasa desde 18% anual',
        'Sin garantías requeridas',
        'Aprobación en 24 horas'
      ],
      cta: 'Solicitar Ahora',
      highlighted: true
    },
    {
      name: 'Crédito PYME',
      description: 'Impulsa el crecimiento de tu pequeña o mediana empresa',
      icon: '🏢',
      badge: 'Para Empresas',
      badgeColor: 'bg-secondary/10 text-secondary border-secondary/20',
      features: [
        'Montos desde $5,000 hasta $100,000',
        'Plazos de 12 a 60 meses',
        'Tasa desde 15% anual',
        'Capital de trabajo',
        'Financiamiento de equipos'
      ],
      cta: 'Más Información',
      highlighted: false
    },
    {
      name: 'Crédito Hipotecario',
      description: 'Haz realidad el sueño de tener tu casa propia',
      icon: '🏠',
      badge: 'Vivienda',
      badgeColor: 'bg-accent/10 text-accent-foreground border-accent/20',
      features: [
        'Montos hasta $500,000',
        'Plazos hasta 25 años',
        'Tasa desde 8.5% anual',
        'Financiamiento hasta 90%',
        'Primera y segunda vivienda'
      ],
      cta: 'Consultar',
      highlighted: false
    }
  ]

  const benefits = [
    {
      icon: '📋',
      title: 'Requisitos Mínimos',
      description: 'Solo necesitas identificación, comprobante de ingresos y ser mayor de edad.'
    },
    {
      icon: '⚡',
      title: 'Proceso Rápido',
      description: 'Completa tu solicitud en 5 minutos y recibe respuesta en máximo 24 horas.'
    },
    {
      icon: '💳',
      title: 'Desembolso Inmediato',
      description: 'Una vez aprobado, el dinero llega a tu cuenta en el mismo día.'
    },
    {
      icon: '📱',
      title: 'Gestión Digital',
      description: 'Consulta tu saldo, realiza pagos y gestiona tu crédito desde la app.'
    }
  ]

  return (
    <section id="productos" className={cn("section-padding bg-muted/20", className)}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-accent/10 text-accent-foreground hover:bg-accent/20 border-accent/20"
            >
              💰 Nuestros Productos
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Encuentra el{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                crédito perfecto
              </span>{' '}
              para ti
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ofrecemos una amplia gama de productos financieros diseñados para 
              adaptarse a tus necesidades específicas y objetivos financieros.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative transition-all duration-300 hover:-translate-y-2",
                product.highlighted 
                  ? "border-primary shadow-lg scale-105 bg-background" 
                  : "border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur"
              )}
            >
              {product.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    ⭐ Recomendado
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {product.icon}
                  </div>
                  <Badge className={product.badgeColor}>
                    {product.badge}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {product.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Separator />
                
                <div className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={cn(
                    "w-full font-semibold",
                    product.highlighted 
                      ? "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" 
                      : "variant-outline border-primary text-primary hover:bg-primary hover:text-white"
                  )}
                  variant={product.highlighted ? "default" : "outline"}
                >
                  {product.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-background rounded-3xl p-8 lg:p-12 shadow-lg border">
          <div className="text-center space-y-6 mb-12">
            <h3 className="text-3xl font-bold text-foreground">
              ¿Cómo funciona nuestro proceso?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hemos simplificado el proceso para que obtengas tu crédito de manera rápida y sencilla.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-3xl">
                  {benefit.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products