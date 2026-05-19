'use client'

import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Badge } from '@/components/ui/badge'
import { INSTALL_SCRIPTS_URL } from '@/lib/api'

const commands = [
  {
    name: 'init',
    description: 'Inicializa un nuevo proyecto Latino',
    usage: 'lpm init [nombre] [version]',
    example: 'lpm init mi-proyecto 1.0.0',
    details: 'Crea el archivo latino.pkg.json y el directorio latino_modules/',
  },
  {
    name: 'set-registry',
    description: 'Configura el registry a usar',
    usage: 'lpm set-registry <url>',
    example: 'lpm set-registry https://registry-lpm.mdcdev.me',
    details: 'Guarda la URL del registry en ~/.latipm/config.json',
  },
  {
    name: 'login',
    description: 'Inicia sesión en el registry',
    usage: 'lpm login <email> <password>',
    example: 'lpm login usuario@ejemplo.com mi-password',
    details: 'Guarda el token de autenticación para publicar paquetes',
  },
  {
    name: 'logout',
    description: 'Cierra sesión',
    usage: 'lpm logout',
    example: 'lpm logout',
    details: 'Elimina el token de autenticación guardado',
  },
  {
    name: 'whoami',
    description: 'Muestra el usuario autenticado',
    usage: 'lpm whoami',
    example: 'lpm whoami',
    details: 'Devuelve la información del usuario logueado actualmente',
  },
  {
    name: 'add / i',
    description: 'Agrega una dependencia al proyecto',
    usage: 'lpm add <paquete@[version]>',
    example: 'lpm add latino-web@1.0.0',
    details: 'Agrega la dependencia a latino.pkg.json e instala el paquete',
  },
  {
    name: 'install',
    description: 'Instala todas las dependencias',
    usage: 'lpm install',
    example: 'lpm install',
    details: 'Lee latino.pkg.json e instala todas las dependencias en latino_modules/',
  },
  {
    name: 'publish',
    description: 'Publica un paquete en el registry',
    usage: 'lpm publish [directorio]',
    example: 'lpm publish',
    details: 'Empaqueta y sube el paquete al registry. Requiere autenticación.',
  },
  {
    name: 'update',
    description: 'Actualiza las dependencias',
    usage: 'lpm update [paquete]',
    example: 'lpm update latino-web',
    details: 'Actualiza un paquete específico o todos si no se especifica',
  },
  {
    name: 'tree',
    description: 'Muestra el árbol de dependencias',
    usage: 'lpm tree',
    example: 'lpm tree',
    details: 'Muestra visualmente la jerarquía de dependencias instaladas',
  },
  {
    name: 'why',
    description: 'Explica por qué una dependencia está instalada',
    usage: 'lpm why <paquete>',
    example: 'lpm why latino-utils',
    details: 'Muestra qué paquetes requieren la dependencia especificada',
  },
]

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Documentación del CLI
            </h1>
            <p className="text-muted-foreground">
              Guía de comandos de LatinoPM (lpm)
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Start */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">Inicio Rápido</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>1. Instala el CLI globalmente:</p>
              <code className="block bg-background rounded-lg p-4 text-foreground">
                bash &lt;(curl -sL {INSTALL_SCRIPTS_URL}/install.sh)
              </code>
              <p className="text-sm text-muted-foreground">
                O en PowerShell: <code className="text-accent">iwr -useb {INSTALL_SCRIPTS_URL}/install.ps1 | iex</code>
              </p>
              <p>2. Configura el registry:</p>
              <code className="block bg-background rounded-lg p-4 text-foreground">
                lpm set-registry {INSTALL_SCRIPTS_URL}
              </code>
              <p>3. Inicia un proyecto:</p>
              <code className="block bg-background rounded-lg p-4 text-foreground">
                lpm init mi-proyecto
              </code>
            </div>
          </div>

          {/* Commands */}
          <div className="space-y-8">
            {commands.map((cmd) => (
              <div key={cmd.name} className="p-6 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-foreground font-mono">
                    lpm {cmd.name}
                  </h3>
                  <Badge variant="secondary">{cmd.description}</Badge>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Uso:</h4>
                    <code className="block bg-background rounded-lg p-3 text-foreground text-sm">
                      {cmd.usage}
                    </code>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Ejemplo:</h4>
                    <code className="block bg-background rounded-lg p-3 text-foreground text-sm">
                      {cmd.example}
                    </code>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Descripción:</h4>
                    <p className="text-muted-foreground">{cmd.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to home */}
          <div className="mt-12 text-center">
            <Link href="/">
              <p className="text-muted-foreground hover:text-foreground transition-colors">
                ← Volver al inicio
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
