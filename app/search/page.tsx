'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { PackageCard } from '@/components/package-card'
import { Button } from '@/components/ui/button'
import { api, Package } from '@/lib/api'

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    async function loadPackages() {
      setLoading(true)
      try {
        const data = await api.fetch<{ results: Package[] }>(`/v1/search?q=${encodeURIComponent(query || '')}&limit=50`)
        setPackages(data.results || [])
      } catch (error) {
        console.error('Failed to load packages:', error)
        setPackages([])
      } finally {
        setLoading(false)
      }
    }
    loadPackages()
  }, [query])

  if (!query) {
    redirect('/explore')
  }

  const displayQuery = query || ''

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Resultados para {'"'}{displayQuery}{'"'}
            </h1>
            <p className="text-muted-foreground">
              {loading ? 'Cargando...' : `Se encontraron ${packages.length} paquete${packages.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando resultados...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No se encontraron paquetes para {'"'}{displayQuery}{'"'}
              </p>
              <Button variant="outline" onClick={() => redirect('/explore')}>
                Volver a explorar
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.name}
                  name={pkg.name}
                  version={pkg.latestVersion || '1.0.0'}
                  description={pkg.description}
                  author={pkg.owner?.displayName || pkg.owner?.username}
                  authorAvatar={pkg.owner?.avatarUrl}
                  downloads={pkg.downloadCount || 0}
                  keywords={pkg.keywords || []}
                  href={`/packages/${pkg.name}`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>}>
      <SearchContent />
    </Suspense>
  )
}
