import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Términos de Servicio
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
          <p className="text-muted-foreground">Última actualización: Mayo 2026</p>

          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder o usar LatinoPM, aceptas estar obligado por estos Términos de Servicio.
            Si no estás de acuerdo, por favor no uses este servicio.
          </p>

          <h2>2. Uso del Servicio</h2>
          <p>
            LatinoPM es un servicio gratuito para la comunidad de Latino. Puedes:
          </p>
          <ul>
            <li>Buscar y descargar paquetes públicamente</li>
            <li>Publicar tus propios paquetes</li>
            <li>Crear una cuenta para gestionar tus paquetes</li>
          </ul>

          <h2>3. Publicación de Paquetes</h2>
          <p>
            Al publicar un paquete en LatinoPM, aceptas que:
          </p>
          <ul>
            <li>El código es tuyo o tienes permiso para distribuirlo</li>
            <li>El paquete no contiene malware o código malicioso</li>
            <li>La información del paquete es precisa y veraz</li>
          </ul>

          <h2>4. Licencias</h2>
          <p>
            Cada paquete mantiene su propia licencia. Los usuarios deben respetar
            los términos de licencia de cada paquete que utilicen.
          </p>

          <h2>5. Privacidad</h2>
          <p>
            Tu privacidad es importante. Consulta nuestra{' '}
            <Link href="/privacy" className="text-primary hover:underline">
              Política de Privacidad
            </Link> para más información.
          </p>

          <h2>6. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios entrarán en vigor inmediatamente después de su publicación.
          </p>

          <h2>7. Contacto</h2>
          <p>
            Para preguntas sobre estos términos, contacta al equipo de LatinoPM.
          </p>
        </div>
      </main>
    </>
  )
}
