'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Check, Terminal, Download } from 'lucide-react'
import { useState } from 'react'
import { INSTALL_SCRIPTS_URL } from '@/lib/api'

export default function InstallPage() {
  const [copiedPs1, setCopiedPs1] = useState(false)
  const [copiedSh, setCopiedSh] = useState(false)

  const handleCopy = async (text: string, setCopied: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Instalación</Badge>
              <span className="text-muted-foreground">2 min</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Instalar LatinoPM CLI
            </h1>
            <p className="text-muted-foreground text-lg">
              La forma más rápida de comenzar a usar paquetes Latino
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Windows PowerShell */}
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold text-foreground">Windows (PowerShell)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Ejecuta este comando en PowerShell (como administrador):
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm text-foreground mb-4 relative">
              <code>iwr -useb {INSTALL_SCRIPTS_URL}/install.ps1 | iex</code>
              <button
                onClick={() => handleCopy(`iwr -useb ${INSTALL_SCRIPTS_URL}/install.ps1 | iex`, copiedPs1)}
                className="absolute right-3 top-3 p-2 hover:bg-border rounded-lg transition-colors"
              >
                {copiedPs1 ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <a href={`${INSTALL_SCRIPTS_URL}/install.ps1`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Descargar install.ps1
              </Button>
            </a>
          </div>

          {/* Linux/macOS */}
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-bold text-foreground">Linux/macOS (Bash)</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Ejecuta este comando en tu terminal:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm text-foreground mb-4 relative">
              <code>bash &lt;(curl -sL {INSTALL_SCRIPTS_URL}/install.sh)</code>
              <button
                onClick={() => handleCopy(`bash <(curl -sL ${INSTALL_SCRIPTS_URL}/install.sh)`, copiedSh)}
                className="absolute right-3 top-3 p-2 hover:bg-border rounded-lg transition-colors"
              >
                {copiedSh ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <a href={`${INSTALL_SCRIPTS_URL}/install.sh`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Descargar install.sh
              </Button>
            </a>
          </div>

          {/* Alternative methods */}
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Métodos Alternativos</h2>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background border border-border">
                <h3 className="font-semibold text-foreground mb-2">Bun</h3>
                <code className="block text-sm text-muted-foreground">
                  bun add -g latipm-cli
                </code>
              </div>

              <div className="p-4 rounded-lg bg-background border border-border">
                <h3 className="font-semibold text-foreground mb-2">npm</h3>
                <code className="block text-sm text-muted-foreground">
                  npm install -g latipm-cli
                </code>
              </div>
            </div>
          </div>

          {/* Verify installation */}
          <div className="mb-8 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Verificar Instalación</h2>
            <p className="text-muted-foreground mb-4">
              Después de instalar, verifica que funcione correctamente:
            </p>
            <code className="block bg-background rounded-lg p-4 font-mono text-sm text-foreground">
              lpm
            </code>
          </div>

          {/* Next steps */}
          <div className="p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Siguientes Pasos</h2>
            <p className="text-muted-foreground mb-6">
              Ahora que tienes el CLI instalado, configura el registry y comienza a usar paquetes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/docs/guide">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">📚 Guía de Inicio</h3>
                  <p className="text-sm text-muted-foreground">
                    Aprende a usar el CLI paso a paso
                  </p>
                </div>
              </a>
              <a href="/explore">
                <div className="p-4 rounded-lg border border-border bg-background hover:border-primary transition-colors cursor-pointer">
                  <h3 className="font-semibold text-foreground mb-2">🔍 Explorar Paquetes</h3>
                  <p className="text-sm text-muted-foreground">
                    Descubre paquetes para tu proyecto
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              ¿Problemas con la instalación?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/help">
                <Button variant="outline">Centro de Ayuda</Button>
              </a>
              <a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">💬 Discord</Button>
              </a>
              <a href="https://github.com/LatinoPackageManager/cli" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">🐛 GitHub Issues</Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
