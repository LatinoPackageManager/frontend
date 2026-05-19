import md5 from 'blueimp-md5'

export function getGravatarUrl(identifier: string | undefined, size: number = 80): string {
  if (!identifier) {
    // Si no hay identificador, usar mystery person
    return `https://www.gravatar.com/avatar/?s=${size}&d=mp`
  }
  
  // Si parece un email (tiene @), usarlo directamente para MD5
  if (identifier.includes('@')) {
    const hash = md5(identifier.toLowerCase().trim())
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`
  }
  
  // Si es username o id, el usuario debería configurar avatarUrl en su perfil
  // Retornamos empty string para que el AvatarFallback muestre las iniciales
  return ''
}


