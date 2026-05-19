'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { PackageCard } from '@/components/package-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Code2, Zap, Package as PackageIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api, Package } from '@/lib/api'

export default function Home() {
  const [featuredPackages, setFeaturedPackages] = useState<{ name: string; description?: string; weeklyDownloads: number; totalDownloads: number }[]>([])
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number }[]>([])
  const [stats, setStats] = useState<{ packages: number; monthlyDownloads: number; users: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [popularData, statsData] = await Promise.all([
          api.getPopularStats(6),
          api.fetch<{ packages: number; users: number; monthlyDownloads: number; totalDownloads: number }>('/v1/stats'),
        ])
        setFeaturedPackages(popularData.packages || [])
        setPopularTags(popularData.tags || [])
        setStats(statsData)
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-card border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 mb-6">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="text-sm font-medium text-primary">Bienvenido a LatinoPM</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance">
                El registro de paquetes para{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Lenguaje Latino
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
                Descubre, explora y utiliza miles de paquetes de código abierto para potenciar tu desarrollo con Latino
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/explore">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                    Explorar Paquetes
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Ver Documentación
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
                <div className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stats ? (stats.packages >= 1000 ? `${(stats.packages / 1000).toFixed(0)}K+` : `${stats.packages}+`) : '...'}
                  </div>
                  <p className="text-sm text-muted-foreground">Paquetes disponibles</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {stats ? (stats.monthlyDownloads >= 1000000 ? `${(stats.monthlyDownloads / 1000000).toFixed(1)}M+` : stats.monthlyDownloads >= 1000 ? `${(stats.monthlyDownloads / 1000).toFixed(0)}K+` : `${stats.monthlyDownloads}+`) : '...'}
                  </div>
                  <p className="text-sm text-muted-foreground">Descargas mensuales</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card/50">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {stats ? (stats.users >= 1000 ? `${(stats.users / 1000).toFixed(1)}K+` : `${stats.users}+`) : '...'}
                  </div>
                  <p className="text-sm text-muted-foreground">Desarrolladores</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Por qué elegir LatinoPM
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Herramientas y características diseñadas para desarrolladores de Latino
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <PackageIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Fácil de descubrir</h3>
                <p className="text-muted-foreground">
                  Busca y encuentra los paquetes que necesitas con nuestra poderosa búsqueda y filtros
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Instalación rápida</h3>
                <p className="text-muted-foreground">
                  Instala paquetes con un único comando desde la terminal usando LatinoPM CLI
                </p>
              </div>

              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">Código abierto</h3>
                <p className="text-muted-foreground">
                  Accede al código fuente, contribuye y mejora los paquetes de la comunidad
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="border-b border-border py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Paquetes populares
                </h2>
                <p className="text-muted-foreground">
                  Los paquetes más descargados esta semana
                </p>
              </div>
              <Link href="/explore">
                <Button variant="outline" className="hidden sm:flex">
                  Ver más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">Cargando paquetes...</div>
              ) : featuredPackages.length > 0 ? (
                featuredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.name}
                    name={pkg.name}
                    version="latest"
                    description={pkg.description}
                    author={undefined}
                    authorAvatar={undefined}
                    downloads={pkg.weeklyDownloads}
                    keywords={pkg.keywords || []}
                    href={`/packages/${pkg.name}`}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">No hay paquetes disponibles</div>
              )}
            </div>

            {popularTags.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-foreground mb-4">Tags populares</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.slice(0, 15).map((tag) => (
                    <Link key={tag.tag} href={`/explore?q=${tag.tag}`}>
                      <Badge variant="secondary" className="cursor-pointer hover:border-primary transition-colors">
                        {tag.tag} <span className="ml-1 text-xs text-muted-foreground">({tag.count.toLocaleString()})</span>
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 sm:hidden">
              <Link href="/explore" className="w-full">
                <Button variant="outline" className="w-full">
                  Ver más
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-b border-border py-20 sm:py-32 bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Listo para empezar
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Instala el CLI de LatinoPM y comienza a usar paquetes en tus proyectos Latino hoy
            </p>

            <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto mb-8">
              <code className="font-mono text-foreground">
                {'lpm add '}<span className="text-accent">nombre-paquete</span>
              </code>
            </div>

            <Link href="/install">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Instalar CLI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 bg-card/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-foreground mb-4">LatinoPM</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/about" className="hover:text-foreground transition-colors">Acerca de</Link></li>
                  <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentación</Link></li>
                  <li><Link href="/community" className="hover:text-foreground transition-colors">Comunidad</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Recursos</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/docs/guide" className="hover:text-foreground transition-colors">Guía de inicio</Link></li>
                  <li><Link href="/docs/publish" className="hover:text-foreground transition-colors">Publicar paquete</Link></li>
                  <li><Link href="/help" className="hover:text-foreground transition-colors">Ayuda</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link href="/terms" className="hover:text-foreground transition-colors">Términos</Link></li>
                  <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacidad</Link></li>
                  <li><Link href="/license" className="hover:text-foreground transition-colors">Licencia</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Latino</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="https://lenguajelatino.org" className="hover:text-foreground transition-colors">Lenguaje Latino</a></li>
                  <li><a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
                  <li><a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
              <p>&copy; 2024 LatinoPM. Todos los derechos reservados.</p>
              <p>Construido con amor para la comunidad de Latino</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
