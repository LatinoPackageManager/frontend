'use client'

import Link from 'next/link'
import { Download, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface PackageCardProps {
  name: string
  version: string
  description: string
  author?: string
  authorAvatar?: string
  downloads?: number
  rating?: number
  keywords?: string[]
  href: string
}

export function PackageCard({
  name,
  version,
  description,
  author,
  authorAvatar,
  downloads = 0,
  rating,
  keywords = [],
  href,
}: PackageCardProps) {
  const formatDownloads = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <Link href={href}>
      <div className="group p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-lg transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{version}</p>
          </div>
          {author && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={authorAvatar} />
              <AvatarFallback className="text-xs">
                {author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>

        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {keywords.slice(0, 2).map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {keywords.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{keywords.length - 2}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {downloads > 0 && (
              <div className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>{formatDownloads(downloads)}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          {author && <span className="text-foreground/60">by {author}</span>}
        </div>
      </div>
    </Link>
  )
}
