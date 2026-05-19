'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Github, Globe, Star, Calendar, Code2, Package as PackageIcon, Users, FileText, Package, Scale, Check, X, TrendingUp } from 'lucide-react'
import { api, Package as PackageType, PackageDependents, PackageStats } from '@/lib/api'
import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getGravatarUrl } from '@/lib/gravatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getLicenseInfo, isCustomLicense } from '@/lib/licenses'

export default function PackagePage() {
  const params = useParams()
  const name = params.name as string
  const [copied, setCopied] = useState(false)
  const [pkg, setPkg] = useState<PackageType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dependents, setDependents] = useState<PackageDependents | null>(null)
  const [selectedVersion, setSelectedVersion] = useState<string>('')
  const [activeTab, setActiveTab] = useState('readme')
  const [packageStats, setPackageStats] = useState<PackageStats | null>(null)

  useEffect(() => {
    async function loadPackage() {
      try {
        const data = await api.fetch<Package>(`/v1/packages/${name}`)
        setPkg(data)
        if (data.latest?.version) {
          setSelectedVersion(data.latest.version)
        } else if (data.versions?.[0]?.version) {
          setSelectedVersion(data.versions[0].version)
        }
      } catch (err) {
        console.error('Failed to load package:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadPackage()
  }, [name])

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

  useEffect(() => {
    async function loadStats() {
      try {
        const stats = await api.getPackageStats(name)
        setPackageStats(stats)
      } catch (err) {
        console.error('Failed to load stats:', err)
      }
    }
    loadStats()
  }, [name])

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`lpm add ${name}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyVersion = () => {
    navigator.clipboard.writeText(`lpm add ${name}@${selectedVersion}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando paquete...</p>
        </main>
      </>
    )
  }

  if (error || !pkg) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Paquete no encontrado</h1>
            <p className="text-muted-foreground mb-6">El paquete "{name}" no existe o fue eliminado</p>
            <Link href="/explore">
              <Button>Volver a explorar</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  const currentVersion = pkg.versions?.find(v => v.version === selectedVersion) || pkg.versions?.[0]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/explore" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
              ← Volver a explorar
            </Link>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-foreground">{pkg.name}</h1>
                  <Badge variant="secondary">v{selectedVersion}</Badge>
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
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{pkg.downloadCount?.toLocaleString() || 0} descargas</span>
                  </div>
                  {currentVersion?.manifest?.license ? (
                    <>
                      <span>•</span>
                      <span>{currentVersion.manifest.license}</span>
                    </>
                  ) : (
                    <>
                      <span>•</span>
                      <span>Sin licencia</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between mb-3">
              <code className="font-mono text-foreground">lpm add {pkg.name}@{selectedVersion}</code>
              <button
                onClick={handleCopyVersion}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b border-border bg-transparent h-auto p-0 gap-0 rounded-none">
                  <TabsTrigger 
                    value="readme" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Readme
                  </TabsTrigger>
                  <TabsTrigger 
                    value="license" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <Scale className="h-4 w-4 mr-2" />
                    Licencia
                  </TabsTrigger>
                  <TabsTrigger 
                    value="versions" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    {pkg.versions?.length || 0} Versiones
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dependencies" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <Code2 className="h-4 w-4 mr-2" />
                    Dependencias
                  </TabsTrigger>
                  <TabsTrigger 
                    value="dependents" 
                    className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground border-b-2 border-transparent rounded-none px-4 py-3"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Dependientes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="readme" className="mt-6">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Documentación</h2>
                    <div className="prose prose-invert max-w-none">
                      <div className="bg-card border border-border rounded-lg p-6">
                        {currentVersion?.readme ? (
                          (() => {
                            const cleanMarkdown = (text: string) => {
                              let result = text
                                // Reemplazar escapes de newline y carriage return
                                .replace(/\\r\\n/g, '\n')
                                .replace(/\\r/g, '\n')
                                .replace(/\\n/g, '\n')
                                .replace(/\\t/g, '  ')
                                .replace(/\\"/g, '"');
                              
                              // Fusionar líneas donde hay solo un marcador de lista
                              // Patrón: - (newline) (espacios) contenido -> - contenido
                              result = result.replace(/^([-*+])\s*\n\s+(?=\S)/gm, '$1 ');
                              
                              // Reducir múltiples saltos de línea a 2 máximo
                              result = result.replace(/\n{3,}/g, '\n\n');
                              
                              return result;
                            };
                            const readme = cleanMarkdown(currentVersion.readme);
                            return (
                              <ReactMarkdown
                                components={{
                                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-foreground mt-6 mb-4" {...props} />,
                                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-foreground mt-5 mb-3" {...props} />,
                                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-foreground mt-4 mb-2" {...props} />,
                                  h4: ({node, ...props}) => <h4 className="text-lg font-bold text-foreground mt-3 mb-2" {...props} />,
                                  p: ({node, ...props}) => <p className="text-foreground my-2 leading-relaxed" {...props} />,
                                  code: ({node, inline, ...props}: any) => 
                                    inline ? (
                                      <code className="bg-background px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props} />
                                    ) : (
                                      <code className="text-sm font-mono text-foreground" {...props} />
                                    ),
                                  pre: ({node, ...props}) => <pre className="bg-background rounded-lg p-4 overflow-x-auto my-4" {...props} />,
                                  ul: ({node, ...props}) => <ul className="list-disc list-inside text-foreground my-2 space-y-1" {...props} />,
                                  ol: ({node, ...props}) => <ol className="list-decimal list-inside text-foreground my-2 space-y-1" {...props} />,
                                  li: ({node, ...props}) => <li className="text-foreground" {...props} />,
                                  strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                                  em: ({node, ...props}) => <em className="italic text-foreground" {...props} />,
                                  a: ({node, ...props}) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-border pl-4 my-4 text-muted-foreground italic" {...props} />,
                                  hr: ({node, ...props}) => <hr className="border-border my-6" {...props} />,
                                  table: ({node, ...props}) => <table className="w-full border-collapse my-4" {...props} />,
                                  th: ({node, ...props}) => <th className="border border-border px-4 py-2 bg-background font-bold text-foreground" {...props} />,
                                  td: ({node, ...props}) => <td className="border border-border px-4 py-2 text-foreground" {...props} />,
                                }}
                              >
                                {readme}
                              </ReactMarkdown>
                            );
                          })()
                        ) : (
                          <p className="text-muted-foreground">Sin documentación disponible</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  {currentVersion?.manifest?.keywords && currentVersion.manifest.keywords.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Palabras clave</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentVersion.manifest.keywords.map((keyword) => (
                          <Link key={keyword} href={`/explore?q=${keyword}`}>
                            <Badge variant="secondary" className="cursor-pointer hover:border-primary transition-colors">
                              {keyword}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="license" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Licencia</h2>
                    <p className="text-muted-foreground">Información sobre la licencia de este paquete</p>
                  </div>
                  {(() => {
                    const licenseId = currentVersion?.manifest?.license
                    if (!licenseId) {
                      return (
                        <div className="p-6 rounded-lg border border-border bg-card text-center">
                          <p className="text-muted-foreground">Sin licencia especificada</p>
                        </div>
                      )
                    }
                    
                    const licenseInfo = getLicenseInfo(licenseId)
                    const isCustom = isCustomLicense(licenseId)
                    
                    if (licenseInfo && !isCustom) {
                      return (
                        <div className="space-y-6">
                          <div className="p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-xl font-semibold text-foreground">{licenseInfo.name}</h3>
                              {licenseInfo.url && (
                                <a 
                                  href={licenseInfo.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline"
                                >
                                  Ver texto completo →
                                </a>
                              )}
                            </div>
                            <Badge variant="secondary" className="mb-4">{licenseId}</Badge>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-green-600 flex items-center gap-2">
                                  <Check className="h-4 w-4" />
                                  Permisos
                                </h4>
                                <ul className="space-y-1">
                                  {licenseInfo.permissions.map((permission) => (
                                    <li key={permission} className="text-sm text-muted-foreground flex items-center gap-2">
                                      <Check className="h-3 w-3 text-green-600" />
                                      {permission}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-red-600 flex items-center gap-2">
                                  <X className="h-4 w-4" />
                                  Prohibiciones
                                </h4>
                                <ul className="space-y-1">
                                  {licenseInfo.prohibitions.length > 0 ? (
                                    licenseInfo.prohibitions.map((prohibition) => (
                                      <li key={prohibition} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <X className="h-3 w-3 text-red-600" />
                                        {prohibition}
                                      </li>
                                    ))
                                  ) : (
                                    <li className="text-sm text-muted-foreground">Ninguna</li>
                                  )}
                                </ul>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                                  <Scale className="h-4 w-4" />
                                  Condiciones
                                </h4>
                                <ul className="space-y-1">
                                  {licenseInfo.conditions.length > 0 ? (
                                    licenseInfo.conditions.map((condition) => (
                                      <li key={condition} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Scale className="h-3 w-3 text-blue-600" />
                                        {condition}
                                      </li>
                                    ))
                                  ) : (
                                    <li className="text-sm text-muted-foreground">Ninguna</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          {currentVersion?.licenseText && (
                            <div className="p-4 rounded-lg border border-border bg-card">
                              <h4 className="text-sm font-semibold text-foreground mb-3">Texto completo de la licencia</h4>
                              <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all max-h-96 overflow-y-auto">
                                {currentVersion.licenseText}
                              </pre>
                            </div>
                          )}
                        </div>
                      )
                    }
                    
                    return (
                      <div className="space-y-6">
                        <div className="p-4 rounded-lg border border-border bg-card">
                          <h3 className="text-xl font-semibold text-foreground mb-2">Licencia Personalizada</h3>
                          <Badge variant="secondary" className="mb-4">{licenseId}</Badge>
                          <p className="text-muted-foreground mb-4">
                            Este paquete utiliza una licencia personalizada. A continuación se muestra el texto completo:
                          </p>
                          {currentVersion?.licenseText ? (
                            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all max-h-96 overflow-y-auto bg-background p-4 rounded-lg">
                              {currentVersion.licenseText}
                            </pre>
                          ) : (
                            <p className="text-muted-foreground">No se pudo cargar el texto de la licencia</p>
                          )}
                        </div>
                      </div>
                    )
                  })()}
                </TabsContent>

                <TabsContent value="versions" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Historial de versiones</h2>
                    <p className="text-muted-foreground">Todas las versiones publicadas de este paquete</p>
                  </div>
                  <div className="space-y-2">
                    {pkg.versions?.sort((a, b) => {
                      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
                      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
                      return dateB - dateA
                    }).map((version) => (
                      <div
                        key={version.version}
                        className="p-4 rounded-lg border border-border bg-card hover:border-primary transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <Link 
                                href={`/packages/${name}/v/${version.version}`}
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                v{version.version}
                              </Link>
                              {version.createdAt && (
                                <p className="text-sm text-muted-foreground">
                                  Publicado el {new Date(version.createdAt).toLocaleDateString('es-ES')}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedVersion(version.version)
                              setActiveTab('readme')
                            }}
                          >
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="dependencies" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Dependencias</h2>
                    <p className="text-muted-foreground">Paquetes de los que depende este paquete</p>
                  </div>
                  {currentVersion?.manifest?.dependencies && Object.keys(currentVersion.manifest.dependencies).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(currentVersion.manifest.dependencies as Record<string, string>).map(([dep, range]) => (
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

                <TabsContent value="dependents" className="mt-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground mb-2">Paquetes dependientes</h2>
                    <p className="text-muted-foreground">Paquetes que dependen de este paquete</p>
                  </div>
                  {dependents && dependents.dependents.length > 0 ? (
                    <div className="space-y-2">
                      {dependents.dependents.map((dep) => (
                        <Link
                          key={dep.name}
                          href={`/packages/${dep.name}`}
                          className="block p-3 rounded-lg border border-border bg-card hover:border-primary transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{dep.name}</span>
                            <Badge variant="outline">{dep.range}</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-lg border border-border bg-card text-center">
                      <p className="text-muted-foreground">No hay paquetes dependientes</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Install Command for selected version */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <p className="text-xs text-muted-foreground mb-2">INSTALAR VERSIÓN</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm text-foreground font-mono">lpm add {pkg.name}@{selectedVersion}</code>
                    <button
                      onClick={handleCopyVersion}
                      className="p-2 hover:bg-border rounded-lg transition-colors"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                </div>

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
                    <p className="text-foreground font-semibold">{currentVersion?.manifest?.license || 'Sin licencia'}</p>
                  </div>
                  {pkg.updatedAt && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ACTUALIZADO</p>
                      <p className="text-foreground text-sm">{new Date(pkg.updatedAt).toLocaleDateString('es-ES')}</p>
                    </div>
                  )}
                  {pkg.createdAt && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">PUBLICADO</p>
                      <p className="text-foreground text-sm">{new Date(pkg.createdAt).toLocaleDateString('es-ES')}</p>
                    </div>
                  )}
                </div>

                {/* Download Stats */}
                {packageStats && (
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground font-semibold">ESTADÍSTICAS DE DESCARGAS</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Diarias</span>
                        <span className="text-foreground font-medium">{packageStats.downloadCount.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Semanales</span>
                        <span className="text-foreground font-medium">{packageStats.downloadCount.weekly.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Mensuales</span>
                        <span className="text-foreground font-medium">{packageStats.downloadCount.monthly.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Anuales</span>
                        <span className="text-foreground font-medium">{packageStats.downloadCount.yearly.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground font-semibold">Totales</span>
                          <span className="text-primary font-bold">{packageStats.downloadCount.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                  {currentVersion?.dist?.tarball && (
                    <a href={currentVersion.dist.tarball} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar tarball
                      </Button>
                    </a>
                  )}
                </div>

                {/* Version Info */}
                {currentVersion && (
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">VERSIÓN ACTUAL</p>
                    </div>
                    <code className="text-sm text-foreground">{currentVersion.version}</code>
                    {currentVersion.dist?.shasum && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">SHA256</p>
                        <code className="text-xs text-foreground break-all">{currentVersion.dist.shasum}</code>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
