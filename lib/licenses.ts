export interface LicenseInfo {
  id: string
  name: string
  url?: string
  permissions: string[]
  prohibitions: string[]
  conditions: string[]
}

export const KNOWN_LICENSES: Record<string, LicenseInfo> = {
  'MIT': {
    id: 'MIT',
    name: 'MIT License',
    url: 'https://choosealicense.com/licenses/mit/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright'],
  },
  'Apache-2.0': {
    id: 'Apache-2.0',
    name: 'Apache License 2.0',
    url: 'https://choosealicense.com/licenses/apache-2.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado', 'Uso de patentes'],
    prohibitions: ['Uso de marcas registradas', 'Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Incluir texto de licencia'],
  },
  'GPL-3.0': {
    id: 'GPL-3.0',
    name: 'GNU General Public License v3.0',
    url: 'https://choosealicense.com/licenses/gpl-3.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente', 'Misma licencia'],
  },
  'GPL-2.0': {
    id: 'GPL-2.0',
    name: 'GNU General Public License v2.0',
    url: 'https://choosealicense.com/licenses/gpl-2.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente', 'Misma licencia'],
  },
  'LGPL-3.0': {
    id: 'LGPL-3.0',
    name: 'GNU Lesser General Public License v3.0',
    url: 'https://choosealicense.com/licenses/lgpl-3.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente', 'Misma licencia (librería)'],
  },
  'BSD-3-Clause': {
    id: 'BSD-3-Clause',
    name: 'BSD 3-Clause License',
    url: 'https://choosealicense.com/licenses/bsd-3-clause/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Uso de marcas registradas', 'Responsabilidad'],
    conditions: ['Aviso de licencia y copyright'],
  },
  'BSD-2-Clause': {
    id: 'BSD-2-Clause',
    name: 'BSD 2-Clause License',
    url: 'https://choosealicense.com/licenses/bsd-2-clause/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Uso de marcas registradas', 'Responsabilidad'],
    conditions: ['Aviso de licencia y copyright'],
  },
  'ISC': {
    id: 'ISC',
    name: 'ISC License',
    url: 'https://choosealicense.com/licenses/isc/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright'],
  },
  'MPL-2.0': {
    id: 'MPL-2.0',
    name: 'Mozilla Public License 2.0',
    url: 'https://choosealicense.com/licenses/mpl-2.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Uso de marcas registradas', 'Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente (archivos modificados)'],
  },
  'EPL-2.0': {
    id: 'EPL-2.0',
    name: 'Eclipse Public License 2.0',
    url: 'https://choosealicense.com/licenses/epl-2.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado', 'Uso de patentes'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente', 'Misma licencia'],
  },
  'Unlicense': {
    id: 'Unlicense',
    name: 'The Unlicense',
    url: 'https://choosealicense.com/licenses/unlicense/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: [],
    conditions: [],
  },
  'CC0-1.0': {
    id: 'CC0-1.0',
    name: 'Creative Commons Zero v1.0 Universal',
    url: 'https://choosealicense.com/licenses/cc0-1.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: [],
    conditions: [],
  },
  'AGPL-3.0': {
    id: 'AGPL-3.0',
    name: 'GNU Affero General Public License v3.0',
    url: 'https://choosealicense.com/licenses/agpl-3.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios', 'Divulgar fuente', 'Misma licencia', 'Divulgar fuente (red)'],
  },
  'BSL-1.0': {
    id: 'BSL-1.0',
    name: 'Boost Software License 1.0',
    url: 'https://choosealicense.com/licenses/bsl-1.0/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Incluir texto de licencia'],
  },
  'Zlib': {
    id: 'Zlib',
    name: 'zlib License',
    url: 'https://choosealicense.com/licenses/zlib/',
    permissions: ['Uso comercial', 'Modificación', 'Distribución', 'Uso privado'],
    prohibitions: ['Responsabilidad'],
    conditions: ['Aviso de licencia y copyright', 'Notar cambios'],
  },
}

export function getLicenseInfo(licenseId: string): LicenseInfo | null {
  const normalized = licenseId.trim().toUpperCase()
  
  for (const [key, info] of Object.entries(KNOWN_LICENSES)) {
    if (key.toUpperCase() === normalized || 
        info.id.toUpperCase() === normalized ||
        info.name.toUpperCase().includes(normalized)) {
      return info
    }
  }
  
  return null
}

export function isKnownLicense(licenseId: string): boolean {
  return getLicenseInfo(licenseId) !== null
}

export function isCustomLicense(licenseId: string): boolean {
  const normalized = licenseId.trim().toUpperCase()
  return normalized === 'CUSTOM' || normalized === 'SEE LICENSE' || !isKnownLicense(licenseId)
}
