'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const isAuthenticated = typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : false

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            {/* <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold">
              L
            </div> */}
            <Image src="/icon.svg" alt="LatinoPM Logo" width={32} height={32} className="rounded-md" />
            <span className="hidden sm:inline">LatinoPM</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar paquetes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center gap-4" suppressHydrationWarning>
            <Link
              href="/explore"
              className="text-sm text-foreground hover:text-primary transition-colors font-medium"
            >
              Explorar
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  Perfil
                </Link>
                <Button
                  onClick={() => {
                    localStorage.removeItem('auth_token')
                    router.refresh()
                  }}
                  variant="outline"
                  size="sm"
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar paquetes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </form>
        </div>
      </div>
    </nav>
  )
}
