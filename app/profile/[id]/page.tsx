'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Package, Download, Calendar, Github, Globe } from 'lucide-react'
import { api, User, Package as PackageType } from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'next/navigation'
import { getGravatarUrl } from '@/lib/gravatar'

export default function PublicProfilePage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [packages, setPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      try {
        const userData = await api.fetch<User>(`/v1/users/${userId}`)
        setUser(userData)
        
        if (userData.packages) {
          setPackages(userData.packages)
        }
      } catch (err) {
        console.error('Failed to load profile:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [userId])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Cargando perfil...</p>
        </main>
      </>
    )
  }

  if (error || !user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Usuario no encontrado</h1>
            <p className="text-muted-foreground mb-6">El usuario que buscas no existe o fue eliminado</p>
            <Link href="/explore">
              <Button>Volver a explorar</Button>
            </Link>
          </div>
        </main>
      </>
    )
  }

  const displayName = user.displayName || user.username || 'Usuario'
  const avatarUrl = user.avatarUrl || getGravatarUrl(user.username || user.id)
  const totalDownloads = packages.reduce((sum, pkg) => sum + (pkg.downloadCount || 0), 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-3xl">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  {displayName}
                </h1>
                {user.username && (
                  <p className="text-muted-foreground">@{user.username}</p>
                )}
                {user.bio && (
                  <p className="text-muted-foreground mt-2 max-w-2xl">{user.bio}</p>
                )}
              </div>
            </div>

            {/* Links */}
            {(user.website || user.github) && (
              <div className="flex gap-3 mb-6">
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      Sitio web
                    </Button>
                  </a>
                )}
                {user.github && (
                  <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background">
                <div className="text-sm text-muted-foreground mb-1">Total de paquetes</div>
                <div className="text-2xl font-bold text-primary">{packages.length}</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <div className="text-sm text-muted-foreground mb-1">Total de descargas</div>
                <div className="text-2xl font-bold text-primary">{totalDownloads.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <div className="text-sm text-muted-foreground mb-1">Miembro desde</div>
                <div className="text-2xl font-bold text-primary">
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                    : 'N/A'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Packages */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Package className="h-6 w-6" />
            Paquetes publicados
          </h2>

          {packages.length === 0 ? (
            <div className="text-center py-12 rounded-lg border border-border bg-card/50">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                {displayName} aún no ha publicado ningún paquete
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Link key={pkg.name} href={`/packages/${pkg.name}`}>
                  <div className="group p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          v{pkg.latestVersion || '1.0.0'}
                        </p>
                      </div>
                      <Badge variant="secondary">{pkg.latestVersion || '1.0.0'}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {pkg.description}
                    </p>

                    {pkg.keywords && pkg.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {pkg.keywords.slice(0, 3).map((keyword) => (
                          <Badge key={keyword} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{pkg.downloadCount?.toLocaleString() || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {pkg.updatedAt 
                            ? new Date(pkg.updatedAt).toLocaleDateString('es-ES')
                            : 'N/A'
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
