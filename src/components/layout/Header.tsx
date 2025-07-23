import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const navigationItems = [
    { href: '#productos', label: 'Productos' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#contacto', label: 'Contacto' }
  ]

  return (
    <header className={cn("bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50", className)}>
      <nav className="container-custom" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#" 
              className="flex items-center space-x-3 group"
              aria-label="CrediAS - Inicio"
            >
              <img 
                src="/assets/icons/logotype.png" 
                alt="CrediAS Logo"
                className="w-8 h-8 lg:w-10 lg:h-10 transition-transform group-hover:scale-105"
                onError={(e) => {
                  // Fallback to gradient icon if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling as HTMLDivElement
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-brand-purple-500 to-brand-pink-500 rounded-lg hidden items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">C</span>
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-foreground">
                CrediAS
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
                        "disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      )}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="default">
              Iniciar Sesión
            </Button>
            <Button size="default" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
              Solicitar Crédito
            </Button>
          </div>

          {/* Mobile Sheet Menu */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Abrir menú de navegación"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left">CrediAS</SheetTitle>
                  <SheetDescription className="text-left">
                    Tu aliado confiable en soluciones de crédito
                  </SheetDescription>
                </SheetHeader>
                
                <div className="grid gap-4 py-6">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-3 text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Iniciar Sesión
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90" 
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Solicitar Crédito
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header