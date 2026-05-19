'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { PackageCard } from '@/components/package-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import { api, Package, SearchResults } from '@/lib/api'

function ExploreContent() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''
  const pageParam = Number(searchParams.get('page') || 1)
  
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [sortBy, setSortBy] = useState('downloads')
  const [packages, setPackages] = useState<Package[]>([])
  const [popularTags, setPopularTags] = useState<{ tag: string; count: number; usageCount: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(pageParam)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10
  const startIdx = (currentPage - 1) * limit

  useEffect(() => {
    async function loadPopularTags() {
      try {
        const data = await api.fetch<{ tags: { tag: string; count: number; usageCount: number }[] }>('/v1/tags/popular?limit=20')
        setPopularTags(data.tags || [])
      } catch (error) {
        console.error('Failed to load popular tags:', error)
      }
    }
    loadPopularTags()
  }, [])

  useEffect(() => {
    async function loadPackages() {
      setLoading(true)
      try {
        const query = searchQuery.trim()
        const endpoint = query 
          ? `/v1/search?q=${encodeURIComponent(query)}&limit=${limit}&page=${currentPage}`
          : `/v1/search?limit=${limit}&page=${currentPage}`
        
        const data = await api.fetch<SearchResults>(endpoint)
        let results = data.results || []

        if (sortBy === 'downloads') {
          results.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
        } else if (sortBy === 'name') {
          results.sort((a, b) => a.name.localeCompare(b.name))
        }

        setPackages(results)
        setTotalPages(data.pagination?.totalPages || 1)
      } catch (error) {
        console.error('Failed to load packages:', error)
        setPackages([])
        setTotalPages(1)
      } finally {
        setLoading(false)
      }
    }
    
    const debounceTimer = setTimeout(loadPackages, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, sortBy, currentPage])

  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Explorar paquetes
            </h1>
            <p className="text-muted-foreground">
              {loading ? 'Cargando...' : `Más de ${packages.length} paquetes disponibles`}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64">
              <div className="sticky top-20 space-y-6">
                {/* Search */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Buscar</h3>
                  <input
                    type="text"
                    placeholder="Nombre, descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                {/* Sort */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Ordenar por
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="downloads">Descargas</option>
                    <option value="name">Nombre (A-Z)</option>
                  </select>
                </div>

                {/* Popular keywords */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Palabras clave populares</h3>
                  <div className="space-y-2">
                    {popularTags.length > 0 ? (
                      popularTags.slice(0, 8).map((tag) => (
                        <button
                          key={tag.tag}
                          onClick={() => {
                            setSearchQuery(tag.tag)
                            setCurrentPage(1)
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg border border-border bg-card text-foreground hover:border-primary hover:bg-card/80 transition-all text-sm flex items-center justify-between"
                        >
                          <span>{tag.tag}</span>
                          <span className="text-xs text-muted-foreground">{tag.usageCount} pkg</span>
                        </button>
                      ))
                    ) : (
                      ['framework', 'database', 'utils', 'testing', 'cli', 'ui'].map((keyword) => (
                        <button
                          key={keyword}
                          onClick={() => {
                            setSearchQuery(keyword)
                            setCurrentPage(1)
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg border border-border bg-card text-foreground hover:border-primary hover:bg-card/80 transition-all text-sm"
                        >
                          {keyword}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  {packages.length > 0 
                    ? `Mostrando ${startIdx + 1}-${startIdx + packages.length} paquetes`
                    : 'No hay paquetes disponibles'
                  }
                </p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Cargando paquetes...</p>
                </div>
              ) : packages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? `No se encontraron paquetes para "${searchQuery}"` : 'No hay paquetes disponibles'}
                  </p>
                  {searchQuery && (
                    <Button onClick={() => setSearchQuery('')} variant="outline">
                      Limpiar búsqueda
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {packages.map((pkg) => (
                      <PackageCard
                        key={pkg.name}
                        name={pkg.name}
                        version={pkg.version || '1.0.0'}
                        description={pkg.description}
                        author={pkg.owner?.displayName || pkg.owner?.username}
                        authorAvatar={pkg.owner?.avatarUrl}
                        downloads={pkg.downloadCount || 0}
                        keywords={pkg.keywords || []}
                        href={`/packages/${pkg.name}`}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg border transition-colors ${
                              currentPage === page
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>}>
      <ExploreContent />
    </Suspense>
  )
}
