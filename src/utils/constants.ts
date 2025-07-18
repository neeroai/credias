// Constants for CrediAS website

export const SITE_CONFIG = {
  name: 'CrediAS',
  description: 'Plataforma de créditos rápidos y seguros',
  url: 'https://credias.com',
  email: 'contacto@credias.com',
  phone: '+1-800-CREDIAS',
} as const;

export const NAVIGATION = [
  { id: 'home', label: 'Inicio', href: '#home' },
  { id: 'services', label: 'Servicios', href: '#services' },
  { id: 'process', label: 'Proceso', href: '#process' },
  { id: 'testimonials', label: 'Testimonios', href: '#testimonials' },
  { id: 'contact', label: 'Contacto', href: '#contact' },
] as const;

export const SERVICES = [
  {
    id: 'personal-loans',
    title: 'Préstamos Personales',
    description: 'Obtén el dinero que necesitas de forma rápida y segura',
    icon: 'DollarSign',
    features: [
      'Aprobación en 24 horas',
      'Sin aval requerido',
      'Tasas competitivas',
      'Plazos flexibles'
    ]
  },
  {
    id: 'business-loans',
    title: 'Créditos Empresariales',
    description: 'Impulsa tu negocio con financiamiento especializado',
    icon: 'Building2',
    features: [
      'Capital de trabajo',
      'Equipamiento',
      'Expansión comercial',
      'Asesoría financiera'
    ]
  },
  {
    id: 'emergency-loans',
    title: 'Préstamos de Emergencia',
    description: 'Soluciones inmediatas para situaciones urgentes',
    icon: 'Zap',
    features: [
      'Desembolso inmediato',
      'Documentación mínima',
      'Sin restricciones',
      'Atención 24/7'
    ]
  }
] as const;

export const PROCESS_STEPS = [
  {
    id: 'step-1',
    number: 1,
    title: 'Solicita tu Crédito',
    description: 'Completa el formulario en línea con tus datos básicos',
    icon: 'FileText'
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Evaluación Rápida',
    description: 'Nuestro sistema evalúa tu solicitud en minutos',
    icon: 'Search'
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Aprobación',
    description: 'Recibe la aprobación y los términos de tu crédito',
    icon: 'CheckCircle'
  },
  {
    id: 'step-4',
    number: 4,
    title: 'Desembolso',
    description: 'El dinero se transfiere a tu cuenta en 24 horas',
    icon: 'CreditCard'
  }
] as const;

export const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'María González',
    role: 'Emprendedora',
    company: 'Café Artesanal',
    content: 'CrediAS me ayudó a expandir mi negocio cuando más lo necesitaba. El proceso fue súper rápido y la atención excelente.',
    avatar: '/avatars/maria.jpg',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Carlos Rodríguez',
    role: 'Profesional',
    company: 'Consultoría IT',
    content: 'Excelente experiencia. Obtuve mi préstamo personal en menos de 24 horas. Definitivamente los recomiendo.',
    avatar: '/avatars/carlos.jpg',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'Ana Martínez',
    role: 'Estudiante',
    company: 'Universidad',
    content: 'Necesitaba dinero para mis estudios y CrediAS me dio la solución perfecta. Tasas muy competitivas.',
    avatar: '/avatars/ana.jpg',
    rating: 5
  }
] as const;

export const SOCIAL_LINKS = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/credias',
    icon: 'Facebook'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/credias',
    icon: 'Twitter'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/credias',
    icon: 'Instagram'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/credias',
    icon: 'Linkedin'
  }
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: 'Acerca de', href: '/about' },
    { label: 'Nuestro Equipo', href: '/team' },
    { label: 'Carreras', href: '/careers' },
    { label: 'Prensa', href: '/press' }
  ],
  services: [
    { label: 'Préstamos Personales', href: '/services/personal' },
    { label: 'Créditos Empresariales', href: '/services/business' },
    { label: 'Préstamos de Emergencia', href: '/services/emergency' },
    { label: 'Asesoría Financiera', href: '/services/advice' }
  ],
  support: [
    { label: 'Centro de Ayuda', href: '/help' },
    { label: 'Contacto', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Soporte Técnico', href: '/support' }
  ],
  legal: [
    { label: 'Términos y Condiciones', href: '/terms' },
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Cookies', href: '/cookies' },
    { label: 'Aviso Legal', href: '/legal' }
  ]
} as const; 