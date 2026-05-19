import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: '¿Qué es LatinoPM?',
    answer: 'LatinoPM es el registro oficial de paquetes para el lenguaje de programación Latino. Permite a los desarrolladores publicar, buscar y descargar paquetes de código abierto.',
  },
  {
    question: '¿Cómo instalo el CLI?',
    answer: 'Puedes instalar el CLI globalmente usando Bun: "bun add -g latipm-cli". Luego configura el registry con "lpm set-registry https://registry-lpm.mdcdev.me".',
  },
  {
    question: '¿Cómo publico mi primer paquete?',
    answer: '1) Crea un proyecto con "lpm init", 2) Desarrolla tu paquete, 3) Autentícate con "lpm login", 4) Publica con "lpm publish". Asegúrate de tener un archivo latino.pkg.json válido.',
  },
  {
    question: '¿Es gratuito usar LatinoPM?',
    answer: 'Sí, LatinoPM es completamente gratuito para la comunidad de Latino. Puedes publicar y descargar paquetes sin costo.',
  },
  {
    question: '¿Puedo eliminar un paquete publicado?',
    answer: 'Por políticas de integridad del registry, los paquetes publicados no pueden eliminarse permanentemente. Sin embargo, puedes publicar una nueva versión con cambios.',
  },
  {
    question: '¿Qué licencias puedo usar?',
    answer: 'Puedes usar cualquier licencia de código abierto. Te recomendamos MIT, Apache 2.0, o GPL. Especifica la licencia en tu latino.pkg.json.',
  },
  {
    question: '¿Cómo reporto un problema?',
    answer: 'Puedes reportar problemas en el GitHub del proyecto o contactar directamente al equipo de LatinoPM.',
  },
]

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-muted-foreground">
              Preguntas frecuentes y recursos de soporte
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <Link href="/docs">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">Documentación</h3>
                <p className="text-sm text-muted-foreground">Guía completa del CLI</p>
              </div>
            </Link>
            <Link href="/explore">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">Explorar Paquetes</h3>
                <p className="text-sm text-muted-foreground">Descubre paquetes</p>
              </div>
            </Link>
            <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
              <div className="p-6 rounded-lg border border-border bg-card hover:border-primary transition-colors cursor-pointer">
                <h3 className="font-semibold text-foreground mb-2">GitHub</h3>
                <p className="text-sm text-muted-foreground">Reporta issues</p>
              </div>
            </a>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Preguntas Frecuentes</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="p-6 rounded-lg border border-border bg-card text-center">
            <h2 className="text-xl font-bold text-foreground mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo está aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/docs">
                <Button>Ver Documentación</Button>
              </Link>
              <a href="https://github.com/lenguaje-latino" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Contactar en GitHub</Button>
              </a>
              <a href="https://discord.gg/tYQSwyyK87" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">Unirse a Discord</Button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
