import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const steps = [
  {
    title: 'Instalar el CLI',
    description: 'Primero necesitas instalar la herramienta de línea de comandos de LatinoPM',
    code: 'bun add -g latipm-cli',
  },
  {
    title: 'Configurar Registry',
    description: 'Configura el registry oficial de LatinoPM',
    code: 'lpm set-registry https://registry-lpm.mdcdev.me',
  },
  {
    title: 'Iniciar Sesión',
    description: 'Autentícate para poder publicar paquetes',
    code: 'lpm login tu@email.com tu-password',
  },
  {
    title: 'Inicializar Proyecto',
    description: 'Crea un nuevo proyecto Latino con su manifiesto',
    code: 'lpm init mi-paquete 1.0.0',
  },
  {
    title: 'Desarrollar',
    description: 'Crea tu código Latino en el directorio del proyecto',
    code: 'nano codigo.latino',
  },
  {
    title: 'Publicar',
    description: 'Publica tu paquete en el registry',
    code: 'lpm publish',
  },
]

export default function GettingStartedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Guía</Badge>
              <span className="text-muted-foreground">5 min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Guía de Inicio Rápido
            </h1>
            <p className="text-muted-foreground text-lg">
              Comienza a usar LatinoPM en menos de 10 minutos
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Prerequisites */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Requisitos Previos</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Bun</strong> instalado (recomendado v1.0+)</li>
              <li>• <strong>Lenguaje Latino</strong> instalado en tu sistema</li>
              <li>• Una cuenta en LatinoPM (puedes crearla gratis)</li>
            </ul>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step indicator */}
                <div className="absolute -left-4 top-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                <div className="ml-8 p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <code className="block bg-background rounded-lg p-4 text-foreground font-mono text-sm">
                    {step.code}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mt-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Siguientes Pasos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/docs/publish">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">📦 Publicar tu Primer Paquete</h3>
                  <p className="text-sm text-muted-foreground">
                    Guía detallada para publicar
                  </p>
                </div>
              </Link>
              <Link href="/explore">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">🔍 Explorar Paquetes</h3>
                  <p className="text-sm text-muted-foreground">
                    Descubre paquetes existentes
                  </p>
                </div>
              </Link>
              <Link href="/docs">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">📚 Documentación Completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos los comandos del CLI
                  </p>
                </div>
              </Link>
              <Link href="/help">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">❓ Centro de Ayuda</h3>
                  <p className="text-sm text-muted-foreground">
                    Preguntas frecuentes
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              ¿Tienes problemas o preguntas?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button variant="outline">Centro de Ayuda</Button>
              </Link>
              <a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  💬 Discord
                </Button>
              </a>
              <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  🐛 GitHub Issues
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
