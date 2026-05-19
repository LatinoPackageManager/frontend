import Link from 'next/link'
import { Navbar } from '@/components/navbar'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="border-b border-border bg-card/50 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Política de Privacidad
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 prose prose-invert">
          <p className="text-muted-foreground">Última actualización: Mayo 2026</p>

          <h2>Información que Recopilamos</h2>
          <p>
            LatinoPM recopila y almacena la siguiente información:
          </p>
          <ul>
            <li><strong>Información de cuenta:</strong> email, nombre de usuario, contraseña (hasheada)</li>
            <li><strong>Perfil público:</strong> nombre para mostrar, bio, avatar, website, GitHub</li>
            <li><strong>Paquetes:</strong> nombre, descripción, keywords, readme, metadata</li>
            <li><strong>Estadísticas de uso:</strong> descargas de paquetes (anónimas)</li>
          </ul>

          <h2>Cómo Usamos tu Información</h2>
          <p>
            Usamos tu información para:
          </p>
          <ul>
            <li>Proporcionar y mantener el servicio</li>
            <li>Mostrar tu perfil público y tus paquetes</li>
            <li>Autenticar tu identidad para publicar paquetes</li>
            <li>Generar estadísticas agregadas de uso</li>
          </ul>

          <h2>Información Pública</h2>
          <p>
            La siguiente información es públicamente visible:
          </p>
          <ul>
            <li>Nombre de usuario y nombre para mostrar</li>
            <li>Avatar y bio</li>
            <li>Lista de paquetes publicados</li>
            <li>Website y GitHub (si proporcionados)</li>
          </ul>

          <h2>Información Privada</h2>
          <p>
            La siguiente información NO es públicamente visible:
          </p>
          <ul>
            <li>Email (solo visible para ti)</li>
            <li>Contraseña (siempre hasheada)</li>
            <li>Token de autenticación</li>
          </ul>

          <h2>Seguridad</h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información:
          </p>
          <ul>
            <li>Contraseñas hasheadas con algoritmos seguros</li>
            <li>Tokens de autenticación con expiración</li>
            <li>Conexiones HTTPS obligatorias</li>
          </ul>

          <h2>Derechos del Usuario</h2>
          <p>
            Tienes derecho a:
          </p>
          <ul>
            <li>Acceder a tu información personal</li>
            <li>Corregir información incorrecta</li>
            <li>Eliminar tu cuenta y datos asociados</li>
            <li>Exportar tus datos</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            LatinoPM utiliza cookies para:
          </p>
          <ul>
            <li>Mantener tu sesión autenticada</li>
            <li>Preferencias de usuario</li>
            <li>Análisis de uso (anónimo)</li>
          </ul>

          <h2>Contacto</h2>
          <p>
            Para preguntas sobre privacidad, contacta al equipo de LatinoPM.
          </p>
        </div>
      </main>
    </>
  )
}
