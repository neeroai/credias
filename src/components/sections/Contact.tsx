import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface ContactProps {
  className?: string
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const contactMethods = [
    {
      icon: '📞',
      title: 'Llámanos',
      description: 'Horario de atención: Lunes a Viernes 8:00 AM - 6:00 PM',
      value: '+57 (1) 234-5678',
      action: 'tel:+571234567'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Respuesta inmediata a tus consultas',
      value: 'Iniciar Chat',
      action: '#chat'
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'Te respondemos en menos de 24 horas',
      value: 'info@credias.com',
      action: 'mailto:info@credias.com'
    },
    {
      icon: '📍',
      title: 'Oficina Principal',
      description: 'Carrera 7 #71-21, Bogotá, Colombia',
      value: 'Ver en Mapa',
      action: '#mapa'
    }
  ]

  const faqs = [
    {
      question: '¿Cuáles son los requisitos para solicitar un crédito?',
      answer: 'Ser mayor de edad, tener ingresos comprobables y contar con una buena historia crediticia.'
    },
    {
      question: '¿En cuánto tiempo obtengo respuesta?',
      answer: 'Nuestro proceso de evaluación toma máximo 24 horas hábiles.'
    },
    {
      question: '¿Puedo pagar antes del plazo establecido?',
      answer: 'Sí, puedes realizar pagos anticipados sin penalización alguna.'
    }
  ]

  return (
    <section id="contacto" className={cn("section-padding", className)}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
            >
              📞 Contáctanos
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              ¿Tienes{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                preguntas?
              </span>{' '}
              Estamos aquí para ayudarte
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Nuestro equipo de expertos está disponible para resolver todas tus dudas 
              y guiarte en el proceso de solicitud de tu crédito.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Contact Form */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-foreground">
                  Envíanos un mensaje
                </h3>
                <p className="text-muted-foreground">
                  Completa el formulario y nos comunicaremos contigo a la brevedad.
                </p>
              </div>

              <Card className="border-0 shadow-lg bg-background/80 backdrop-blur">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Tu nombre"
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Tu apellido"
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+57 (1) 234-5678"
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tipo de consulta</Label>
                    <select 
                      id="subject"
                      className="w-full px-3 py-2 border border-border/50 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="credito-personal">Crédito Personal</option>
                      <option value="credito-pyme">Crédito PYME</option>
                      <option value="credito-hipotecario">Crédito Hipotecario</option>
                      <option value="soporte">Soporte Técnico</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <textarea 
                      id="message"
                      rows={4}
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                      className="w-full px-3 py-2 border border-border/50 rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 font-semibold h-12"
                  >
                    Enviar Mensaje
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Al enviar este formulario, aceptas nuestros{' '}
                    <a href="#terminos" className="text-primary hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y{' '}
                    <a href="#privacidad" className="text-primary hover:underline">
                      política de privacidad
                    </a>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Contact Methods & FAQs */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Otras formas de contactarnos
              </h3>
              
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {method.icon}
                        </div>
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {method.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {method.description}
                          </CardDescription>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-primary font-semibold"
                            asChild
                          >
                            <a href={method.action}>{method.value}</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Preguntas Frecuentes
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6 space-y-3">
                      <h4 className="font-semibold text-foreground">
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Ver Todas las Preguntas
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              ¿Listo para comenzar?
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Solicita tu crédito ahora y da el primer paso hacia tus metas financieras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 font-semibold px-8"
              >
                Solicitar Crédito Ahora
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8"
              >
                Simular Crédito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact