'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, User, Package, Download, Calendar, LogOut, Edit2, Github, Globe, Camera } from 'lucide-react'
import { api, User as UserType, Package as PackageType } from '@/lib/api'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { getGravatarUrl } from '@/lib/gravatar'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [packages, setPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editDisplayName, setEditDisplayName] = useState('')
  const [editBio, setEditBio] = useState('')
  const [editWebsite, setEditWebsite] = useState('')
  const [editGithub, setEditGithub] = useState('')
  const [editAvatarUrl, setEditAvatarUrl] = useState('')

  const avatarUrl = user?.avatarUrl || getGravatarUrl(user?.email || '')
  const editAvatarUrlValue = editAvatarUrl || getGravatarUrl(user?.email || '')

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const userData = await api.fetchWithAuth<UserType>('/v1/auth/me', token)
        setUser(userData)
        setEditDisplayName(userData.displayName || '')
        setEditBio(userData.bio || '')
        setEditWebsite(userData.website || '')
        setEditGithub(userData.github || '')
        setEditAvatarUrl(userData.avatarUrl || '')

        const packagesData = await api.fetchWithAuth<{ packages: PackageType[] }>('/v1/users/me/packages', token)
        setPackages(packagesData.packages || [])
      } catch (error) {
        console.error('Failed to load profile:', error)
        localStorage.removeItem('auth_token')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [router])

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('auth_token')
    if (!token || !user) return

    try {
      await api.fetchWithAuth('/v1/users/me', token, {
        method: 'PATCH',
        body: JSON.stringify({
          displayName: editDisplayName,
          bio: editBio,
          website: editWebsite,
          github: editGithub,
          avatarUrl: editAvatarUrl || undefined,
        }),
      })
      
      const updatedUser = await api.fetchWithAuth<UserType>('/v1/auth/me', token)
      setUser(updatedUser)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_name')
    router.push('/')
  }

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

  if (!user) {
    return null
  }

  const displayName = user.displayName || user.username || 'Usuario'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback className="text-2xl">
                    {displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    {displayName}
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  {user.username && (
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-border bg-background">
                <div className="text-sm text-muted-foreground mb-1">Total de paquetes</div>
                <div className="text-2xl font-bold text-primary">{packages.length}</div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-background">
                <div className="text-sm text-muted-foreground mb-1">Total de descargas</div>
                <div className="text-2xl font-bold text-primary">
                  {packages.reduce((sum, pkg) => sum + (pkg.downloadCount || 0), 0)}
                </div>
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

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Info */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Información del perfil</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 hover:bg-border rounded-lg transition-colors"
                    >
                      <Edit2 className="h-5 w-5 text-muted-foreground" />
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={editAvatarUrl || avatarUrl} />
                        <AvatarFallback className="text-2xl">
                          {editDisplayName.slice(0, 2).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          URL del avatar
                        </label>
                        <Input
                          type="url"
                          value={editAvatarUrl}
                          onChange={(e) => setEditAvatarUrl(e.target.value)}
                          placeholder="https://www.gravatar.com/avatar/tu-hash"
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Usa una URL de imagen o{' '}
                          <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Gravatar
                          </a>
                          {' '}con tu email
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nombre para mostrar
                      </label>
                      <input
                        type="text"
                        value={editDisplayName}
                        onChange={(e) => setEditDisplayName(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Bio
                      </label>
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        rows={3}
                        placeholder="Cuéntanos sobre ti..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Sitio web
                      </label>
                      <input
                        type="url"
                        value={editWebsite}
                        onChange={(e) => setEditWebsite(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="https://tu-sitio.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        GitHub
                      </label>
                      <input
                        type="text"
                        value={editGithub}
                        onChange={(e) => setEditGithub(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        placeholder="tu-usuario-github"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                        Guardar cambios
                      </Button>
                      <Button
                        onClick={() => {
                          setIsEditing(false)
                          setEditDisplayName(user.displayName || '')
                          setEditBio(user.bio || '')
                          setEditWebsite(user.website || '')
                          setEditGithub(user.github || '')
                          setEditAvatarUrl(user.avatarUrl || '')
                        }}
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">NOMBRE</p>
                        <p className="text-foreground font-medium">{displayName}</p>
                      </div>
                    </div>
                    {user.bio && (
                      <div className="p-4 rounded-lg bg-background border border-border">
                        <p className="text-xs text-muted-foreground mb-1">BIO</p>
                        <p className="text-foreground">{user.bio}</p>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">EMAIL</p>
                        <p className="text-foreground font-medium">{user.email}</p>
                      </div>
                    </div>
                    {(user.website || user.github) && (
                      <div className="space-y-2">
                        {user.website && (
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary transition-colors">
                            <Globe className="h-5 w-5 text-muted-foreground" />
                            <p className="text-foreground font-medium">{user.website}</p>
                          </a>
                        )}
                        {user.github && (
                          <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border hover:border-primary transition-colors">
                            <Github className="h-5 w-5 text-muted-foreground" />
                            <p className="text-foreground font-medium">{user.github}</p>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Packages */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Tus paquetes</h2>

                {packages.length === 0 ? (
                  <div className="text-center py-12 rounded-lg border border-border bg-card/50">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-4">
                      No has publicado ningún paquete aún
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Crea y publica paquetes usando LatinoPM CLI
                    </p>
                    <Link href="/docs/publish">
                      <Button className="bg-primary hover:bg-primary/90">
                        Ver guía de publicación
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <Link key={pkg.name} href={`/packages/${pkg.name}`}>
                        <div className="group p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {pkg.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">v{pkg.latestVersion || '1.0.0'}</p>
                            </div>
                            <Badge variant="secondary">{pkg.latestVersion || '1.0.0'}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{pkg.description}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{pkg.downloadCount || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{pkg.updatedAt ? new Date(pkg.updatedAt).toLocaleDateString('es-ES') : 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Help */}
              <div className="p-6 rounded-lg border border-border bg-card space-y-4">
                <h3 className="font-semibold text-foreground">Ayuda</h3>
                <div className="space-y-3">
                  <Link href="/docs">
                    <Button variant="outline" className="w-full justify-start">
                      Documentación
                    </Button>
                  </Link>
                  <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </a>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 space-y-4">
                <h3 className="font-semibold text-red-500">Zona de peligro</h3>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full text-red-500 hover:text-red-600 border-red-500/20 hover:border-red-500/40 hover:bg-red-500/5"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
