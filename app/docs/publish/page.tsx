import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PublishGuidePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Tutorial</Badge>
              <span className="text-muted-foreground">10 min de lectura</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Publicar tu Primer Paquete
            </h1>
            <p className="text-muted-foreground text-lg">
              Guía paso a paso para publicar un paquete en LatinoPM
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Estructura del proyecto */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              1. Estructura del Proyecto
            </h2>
            <p className="text-muted-foreground mb-4">
              Un paquete Latino típico tiene esta estructura:
            </p>
            <pre className="bg-background rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`mi-paquete/
├── latino.pkg.json    # Manifiesto del paquete
├── src/
│   └── principal.lat  # Código fuente
├── README.md          # Documentación
└── .gitignore         # Archivos a ignorar`}
            </pre>
          </div>

          {/* Manifiesto */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              2. Crear el Manifiesto
            </h2>
            <p className="text-muted-foreground mb-4">
              El archivo <code className="text-accent">latino.pkg.json</code> contiene 
              la metadata de tu paquete:
            </p>
            <pre className="bg-background rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`{
  "name": "mi-paquete",
  "version": "1.0.0",
  "description": "Descripción de tu paquete",
  "keywords": ["util", "helper"],
  "license": "MIT",
  "author": "Tu Nombre <tu@email.com>",
  "repository": "https://github.com/tu-usuario/mi-paquete",
  "main": "src/principal.lat"
}`}
            </pre>
            
            <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">⚠️ Reglas para el nombre:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Solo letras minúsculas, números y guiones</li>
                <li>• Debe ser único en el registry</li>
                <li>• No puede empezar con número</li>
                <li>• Longitud máxima: 214 caracteres</li>
              </ul>
            </div>
          </div>

          {/* Inicializar */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              3. Inicializar el Proyecto
            </h2>
            <p className="text-muted-foreground mb-4">
              Ejecuta el comando de inicialización:
            </p>
            <code className="block bg-background rounded-lg p-4 text-foreground font-mono text-sm mb-4">
              lpm init mi-paquete 1.0.0
            </code>
            <p className="text-muted-foreground">
              Esto creará el archivo <code className="text-accent">latino.pkg.json</code> 
              y el directorio <code className="text-accent">latino_modules/</code>.
            </p>
          </div>

          {/* Autenticación */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              4. Autenticarse
            </h2>
            <p className="text-muted-foreground mb-4">
              Necesitas una cuenta para publicar paquetes:
            </p>
            <code className="block bg-background rounded-lg p-4 text-foreground font-mono text-sm mb-4">
              lpm login tu@email.com tu-password
            </code>
            <p className="text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link href="/signup" className="text-primary hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>

          {/* Publicar */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              5. Publicar el Paquete
            </h2>
            <p className="text-muted-foreground mb-4">
              Navega al directorio de tu proyecto y publica:
            </p>
            <code className="block bg-background rounded-lg p-4 text-foreground font-mono text-sm mb-4">
              lpm publish
            </code>
            <p className="text-muted-foreground">
              El CLI empaquetará tu código y lo subirá al registry.
            </p>

            <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <h4 className="font-semibold text-green-500 mb-2">✓ Consejo:</h4>
              <p className="text-sm text-muted-foreground">
                Asegúrate de tener un <code className="text-accent">.gitignore</code> {" "}
                para excluir archivos innecesarios como <code className="text-accent">latino_modules/</code>, 
                <code className="text-accent">.latipm-cache/</code>, etc.
              </p>
            </div>
          </div>

          {/* Actualizar versión */}
          <div className="mb-12 p-6 rounded-lg border border-border bg-card">
            <h2 className="text-xl font-bold text-foreground mb-4">
              6. Actualizar Versiones
            </h2>
            <p className="text-muted-foreground mb-4">
              Para publicar una nueva versión, actualiza el número en tu manifiesto:
            </p>
            <pre className="bg-background rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`{
  "name": "mi-paquete",
  "version": "1.0.1",  // Cambia esto
  ...
}`}
            </pre>
            <p className="text-muted-foreground mb-4">
              Luego publica nuevamente:
            </p>
            <code className="block bg-background rounded-lg p-4 text-foreground font-mono text-sm">
              lpm publish
            </code>

            <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold text-foreground mb-2">📌 Versionado Semántico:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <code className="text-accent">1.0.0</code> - Versión inicial</li>
                <li>• <code className="text-accent">1.0.1</code> - Patch (bug fixes)</li>
                <li>• <code className="text-accent">1.1.0</code> - Minor (nuevas features)</li>
                <li>• <code className="text-accent">2.0.0</code> - Major (breaking changes)</li>
              </ul>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/docs/guide">
              <Button variant="outline">← Anterior: Guía de Inicio</Button>
            </Link>
            <Link href="/explore">
              <Button>Explorar Paquetes →</Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 rounded-lg border border-border bg-card text-center">
            <h2 className="text-xl font-bold text-foreground mb-4">¿Necesitas Ayuda?</h2>
            <p className="text-muted-foreground mb-6">
              Si tienes problemas al publicar, estamos aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/help">
                <Button variant="outline">Centro de Ayuda</Button>
              </Link>
              <a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">💬 Discord</Button>
              </a>
              <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">🐛 GitHub</Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
