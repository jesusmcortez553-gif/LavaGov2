// Helper para manejar localStorage de forma type-safe
export const useLocalStorage = <T>(clave: string) => {
  const obtener = (): T | null => {
    try {
      const item = localStorage.getItem(clave)
      return item ? (JSON.parse(item) as T) : null
    } catch {
      return null
    }
  }

  const guardar = (valor: T): boolean => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor))
      return true
    } catch {
      return false
    }
  }

  const eliminar = (): boolean => {
    try {
      localStorage.removeItem(clave)
      return true
    } catch {
      return false
    }
  }

  return { obtener, guardar, eliminar }
}

// Claves estándar de localStorage
export const STORAGE_KEYS = {
  PEDIDOS: 'lava_go:pedidos',
  CLIENTES: 'lava_go:clientes',
  CONDUCTORES: 'lava_go:conductores',
  LAVANDERIAS: 'lava_go:lavanderias',
  AUTH_TOKEN: 'lava_go:auth_token',
  USUARIO: 'lava_go:usuario',
} as const
