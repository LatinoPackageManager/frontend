'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Github, Globe, Code2, Package as PackageIcon, Calendar, FileText, Users } from 'lucide-react'
import { api, Package as PackageType, PackageVersion, PackageDependents } from '@/lib/api'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getGravatarUrl } from '@/lib/gravatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PackageVersionPage() {
  const params = useParams()
  const name = params.name as string
  const version = params.version as string
  const [copied, setCopied] = useState(false)
  const [pkg, setPkg] = useState<PackageType | null>(null)
  const [pkgVersion, setPkgVersion] = useState<PackageVersion | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dependents, setDependents] = useState<PackageDependents | null>(null)

  useEffect(() => {
    async function loadPackage() {
      try {
        const data = await api.fetch<PackageType>(`/v1/packages/${name}`)
        setPkg(data)
        const foundVersion = data.versions?.find(v => v.version === version)
        if (foundVersion) {
          setPkgVersion(foundVersion)
        }
      } catch (err) {
        console.error('Failed to load package:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadPackage()
  }, [name, version])

  useEffect(() => {
    if (!pkg) return
    async function loadDependents() {
      try {
        const data = await api.fetch<PackageDependents>(`/v1/packages/${name}/dependents`)
        setDependents(data)
      } catch (err) {
        console.error('Failed to load dependents:', err)
      }
    }
    loadDependents()
  }, [name, pkg])

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`lpm add ${name}@${version}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando versión...</p>
        </main>
      </>
    )
  }

  if (error || !pkg || !pkgVersion) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Versión no encontrada</h1>
            <p className="text-muted-foreground mb-6">La versión "{version}" del paquete "{name}" no existe</p>
            <Link href={`/packages/${name}`}>
              <Button>Ver paquete</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <Link 
              href={`/packages/${name}`} 
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              ← Volver a {name}
            </Link>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-foreground">{pkg.name}</h1>
                  <Badge variant="secondary">v{version}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {pkg.owner && (
                    <Link 
                      href={`/profile/${pkg.owner.id}`}
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={pkg.owner.avatarUrl || getGravatarUrl(pkg.owner.username || pkg.owner.id)} />
                        <AvatarFallback className="text-xs">
                          {(pkg.owner.displayName || pkg.owner.username || 'U').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{pkg.owner.displayName || pkg.owner.username}</span>
                    </Link>
                  )}
                  <span>•</span>
                  {pkgVersion.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Publicado el {new Date(pkgVersion.createdAt).toLocaleDateString('es-ES')}</span>
                    </div>
                  )}
                  {pkg.license && (
                    <>
                      <span>•</span>
                      <span>{pkg.license}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between mb-3">
              <code className="font-mono text-foreground">lpm add {pkg.name}@{version}</code>
              <button
                onClick={handleCopyInstall}
                className="p-2 hover:bg-border rounded-lg transition-colors"
              >
                <Copy className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
            {copied && (
              <p className="text-sm text-primary">Comando copiado al portapapeles</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="readme" className="w-full">
                <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 gap-0 rounded-none">
                  <TabsTrigger 
                    value="readme" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Readme
                  </TabsTrigger>
                  <TabsTrigger 
                    value="metadata" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <PackageIcon className="h-4 w-4 mr-2" />
                    Metadata
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dependencies" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    Dependencias
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="readme" className="mt-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Documentación</h2>
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-card border border-border rounded-lg p-6 text-muted-foreground space-y-4">
                        {pkg.readme ? (
                          pkg.readme.split('\n\n').map((paragraph, idx) => (
                            <div key={idx}>
                              {paragraph.startsWith('#') ? (
                                <h3 className="text-xl font-bold text-foreground mt-6 mb-4">
                                  {paragraph.replace(/#+\s/, '')}
                                </h3>
                              ) : paragraph.startsWith('```') ? (
                                <pre className="bg-background rounded-lg p-4 overflow-x-auto">
                                  <code className="text-sm font-mono text-foreground">
                                    {paragraph.replace(/```\w*\n?|\n?```/g, '').trim()}
                                  </code>
                                </pre>
                              ) : (
                                <p>{paragraph}</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground">Sin documentación disponible</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Metadata de la versión</h2>
                    <p className="text-muted-foreground">Información técnica de esta versión</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <PackageIcon className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-semibold text-foreground">VERSIÓN</p>
                      </div>
                      <code className="text-foreground">{pkgVersion.version}</code>
                    </div>
                    
                    {pkgVersion.dist?.tarball && (
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Download className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">TARBALL</p>
                        </div>
                        <a 
                          href={pkgVersion.dist.tarball}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {pkgVersion.dist.tarball}
                        </a>
                      </div>
                    )}
                    
                    {pkgVersion.dist?.shasum && (
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">SHA256</p>
                        </div>
                        <code className="text-xs text-foreground break-all">{pkgVersion.dist.shasum}</code>
                      </div>
                    )}
                    
                    {pkgVersion.createdAt && (
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">FECHA DE PUBLICACIÓN</p>
                        </div>
                        <p className="text-foreground">
                          {new Date(pkgVersion.createdAt).toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}

                    {pkgVersion.manifest && (
                      <div className="p-4 rounded-lg border border-border bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">MANIFEST</p>
                        </div>
                        <pre className="text-xs text-foreground overflow-x-auto mt-2">
                          {JSON.stringify(pkgVersion.manifest, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="dependencies" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Dependencias</h2>
                    <p className="text-muted-foreground">Paquetes de los que depende esta versión</p>
                  </div>
                  {pkgVersion.manifest?.dependencies ? (
                    <div className="space-y-2">
                      {Object.entries(pkgVersion.manifest.dependencies as Record<string, string>).map(([dep, range]) => (
                        <Link
                          key={dep}
                          href={`/packages/${dep}`}
                          className="block p-3 rounded-lg border border-border bg-card hover:border-primary transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{dep}</span>
                            <Badge variant="outline">{range}</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-lg border border-border bg-card text-center">
                      <p className="text-muted-foreground">Sin dependencias</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Quick Info */}
                <div className="p-4 rounded-lg border border-border bg-card space-y-4">
                  {pkg.owner && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">AUTOR</p>
                      <Link 
                        href={`/profile/${pkg.owner.id}`}
                        className="flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={pkg.owner.avatarUrl || getGravatarUrl(pkg.owner.username || pkg.owner.id)} />
                          <AvatarFallback className="text-xs">
                            {(pkg.owner.displayName || pkg.owner.username || 'U').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {pkg.owner.displayName || pkg.owner.username}
                      </Link>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">LICENCIA</p>
                    <p className="text-foreground font-semibold">{pkg.license || 'N/A'}</p>
                  </div>
                  {pkgVersion.createdAt && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">PUBLICADO</p>
                      <p className="text-foreground text-sm">{new Date(pkgVersion.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="space-y-3">
                  {pkg.homepage && (
                    <a href={pkg.homepage} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        Sitio web
                      </Button>
                    </a>
                  )}
                  {pkg.repository && (
                    <a href={pkg.repository} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant="outline">
                        <Github className="h-4 w-4 mr-2" />
                        Repositorio
                      </Button>
                    </a>
                  )}
                  {pkgVersion.dist?.tarball && (
                    <a href={pkgVersion.dist.tarball} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar tarball
                      </Button>
                    </a>
                  )}
                </div>

                {/* All Versions */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <PackageIcon className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">OTRAS VERSIONES</p>
                  </div>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {pkg.versions?.sort((a, b) => {
                      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
                      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
                      return dateB - dateA
                    }).slice(0, 10).map((v) => (
                      <Link
                        key={v.version}
                        href={`/packages/${name}/v/${v.version}`}
                        className={`block text-sm px-2 py-1 rounded hover:bg-border transition-colors ${
                          v.version === version ? 'bg-border font-semibold' : ''
                        }`}
                      >
                        v{v.version}
                      </Link>
                    ))}
                    {pkg.versions && pkg.versions.length > 10 && (
                      <Link
                        href={`/packages/${name}`}
                        className="block text-sm px-2 py-1 text-primary hover:text-primary/80 transition-colors"
                      >
                        Ver todas ({pkg.versions.length})
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
