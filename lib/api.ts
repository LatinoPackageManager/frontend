export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://registry-lpm.mdcdev.me'

export const INSTALL_SCRIPTS_URL = `${API_BASE_URL.replace('/v1', '')}`

export const api = {
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }
    
    return response.json()
  },
  
  async fetchWithAuth<T>(endpoint: string, token: string, options?: RequestInit): Promise<T> {
    return this.fetch<T>(endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Authorization': `Bearer ${token}`,
      },
    })
  },
  
  getDownloadUrl(name: string, version: string): string {
    return `${API_BASE_URL}/v1/download/${name}/${version}`
  },
  
  async getPopularStats(limit?: number): Promise<PopularStats> {
    const params = limit ? `?limit=${limit}` : ''
    return this.fetch<PopularStats>(`/v1/stats/popular${params}`)
  },
  
  async getPackageStats(name: string): Promise<PackageStats> {
    return this.fetch<PackageStats>(`/v1/packages/${name}/stats`)
  },
}

export interface Package {
  name: string
  description: string
  keywords?: string[]
  license?: string
  downloadCount?: number
  updatedAt?: string
  createdAt?: string
  version?: string
  latestVersion?: string
  author?: string
  rating?: number
  ownerId?: string
  owner?: UserProfile
  readme?: string
  repository?: string
  homepage?: string
  versions?: PackageVersion[]
  latest?: {
    version: string
    manifest: Record<string, unknown>
  }
}

export interface PackageVersion {
  version: string
  dist: {
    tarball: string
    shasum: string
  }
  manifest: Record<string, unknown>
  readme?: string
  licenseText?: string
  downloadCount?: number
  createdAt?: string
}

export interface UserProfile {
  id: string
  username?: string
  displayName: string
  avatarUrl?: string
  bio?: string
  website?: string
  github?: string
  createdAt?: string
}

export interface User {
  id: string
  email: string
  username?: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  website?: string
  github?: string
  createdAt?: string
  updatedAt?: string
  packages?: Package[]
}

export interface SearchResults {
  results: Package[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface AuthResponse {
  token: string
}

export interface SiteStats {
  packages: number
  users: number
  monthlyDownloads: number
  totalDownloads: number
}

export interface PackageStats {
  name: string
  downloadCount: {
    total: number
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  versions: { version: string; downloadCount: number }[]
}

export interface PackageDependents {
  name: string
  dependents: { name: string; version: string; range: string }[]
}

export interface PopularPackage {
  name: string
  description?: string
  keywords?: string[]
  weeklyDownloads: number
  totalDownloads: number
}

export interface PopularTag {
  tag: string
  count: number
}

export interface PopularStats {
  packages: PopularPackage[]
  tags: PopularTag[]
}
