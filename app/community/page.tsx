import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comunidad Latino
            </h1>
            <p className="text-muted-foreground text-lg">
              Únete a miles de desarrolladores que usan Latino
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-lg border border-border bg-card text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Paquetes</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card text-center">
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <p className="text-muted-foreground">Descargas/mes</p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card text-center">
              <div className="text-3xl font-bold text-primary mb-2">5K+</div>
              <p className="text-muted-foreground">Desarrolladores</p>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-8">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-4">Recursos Oficiales</h2>
              <div className="space-y-3">
                <a href="https://lenguajelatino.org" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    🌐 Lenguaje Latino - Sitio Oficial
                  </Button>
                </a>
                <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    📦 GitHub Organization
                  </Button>
                </a>
                <a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full justify-start">
                    💬 Discord Community
                  </Button>
                </a>
                <Link href="/docs">
                  <Button variant="outline" className="w-full justify-start">
                    📚 Documentación del CLI
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-4">Comunidades</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Discord</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Únete al servidor de Discord para chatear con otros desarrolladores
                  </p>
                  <Button variant="outline" size="sm">Próximamente</Button>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-foreground mb-2">Foro</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Haz preguntas, comparte proyectos y ayuda a otros
                  </p>
                  <Button variant="outline" size="sm">Próximamente</Button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-4">Contribuir</h2>
              <p className="text-muted-foreground mb-4">
                ¿Quieres ayudar a mejorar LatinoPM? Hay muchas formas de contribuir:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li>• Reporta bugs y sugerencias</li>
                <li>• Mejora la documentación</li>
                <li>• Contribuye código al proyecto</li>
                <li>• Ayuda a otros en la comunidad</li>
              </ul>
              <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                <Button>Ver en GitHub</Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
