import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Acerca de LatinoPM
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
          <p>
            <strong>LatinoPM</strong> es el registro oficial de paquetes para el lenguaje de programación Latino.
          </p>
          
          <h2>Misión</h2>
          <p>
            Proporcionar una plataforma centralizada y confiable para que la comunidad de Latino 
            comparta, descubra y utilice paquetes de código abierto.
          </p>

          <h2>Características</h2>
          <ul>
            <li>Registro público de paquetes</li>
            <li>Búsqueda avanzada por nombre, descripción y palabras clave</li>
            <li>Sistema de autenticación seguro</li>
            <li>CLI fácil de usar</li>
            <li>Estadísticas de descargas en tiempo real</li>
            <li>Perfiles de desarrollador</li>
          </ul>

          <h2>Tecnología</h2>
          <p>
            LatinoPM está construido con tecnologías modernas:
          </p>
          <ul>
            <li>Frontend: Next.js 16, React 19, TypeScript</li>
            <li>Backend: Bun, Hono (o similar)</li>
            <li>Base de datos: MongoDB</li>
            <li>Almacenamiento: Cloudflare R2</li>
          </ul>

          <h2>Comunidad</h2>
          <p>
            Únete a la comunidad de Latino en{' '}
            <a href="https://lenguajelatino.org" className="text-primary hover:underline">
              lenguajelatino.org
            </a>
          </p>
        </div>
      </main>
    </>
  )
}
