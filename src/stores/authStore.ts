import { create } from 'zustand'
import { STORAGE_KEYS, useLocalStorage } from '@/lib'

interface Usuario {
  id: string
  nombre: string
  email: string
}

interface AuthStore {
  // Estado
  usuario: Usuario | null
  token: string | null
  estaLogueado: boolean

  // Acciones
  login: (email: string) => Promise<void>
  logout: () => void
  cargarDelStorage: () => void
  setUsuario: (usuario: Usuario | null) => void
  setToken: (token: string | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  token: null,
  estaLogueado: false,

  login: async (email: string) => {
    // TODO: Conectar con API real
    // Por ahora, simulamos login exitoso
    const usuarioFake: Usuario = {
      id: '1',
      nombre: 'Operador',
      email: email,
    }
    const tokenFake = 'token_temporal'

    const { guardar } = useLocalStorage<Usuario>(STORAGE_KEYS.USUARIO)
    const { guardar: guardarToken } = useLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN)

    guardar(usuarioFake)
    guardarToken(tokenFake)

    set({
      usuario: usuarioFake,
      token: tokenFake,
      estaLogueado: true,
    })
  },

  logout: () => {
    const { eliminar: eliminarUsuario } = useLocalStorage(STORAGE_KEYS.USUARIO)
    const { eliminar: eliminarToken } = useLocalStorage(STORAGE_KEYS.AUTH_TOKEN)

    eliminarUsuario()
    eliminarToken()

    set({
      usuario: null,
      token: null,
      estaLogueado: false,
    })
  },

  cargarDelStorage: () => {
    const { obtener: obtenerUsuario } = useLocalStorage<Usuario>(STORAGE_KEYS.USUARIO)
    const { obtener: obtenerToken } = useLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN)

    const usuario = obtenerUsuario()
    const token = obtenerToken()

    set({
      usuario,
      token,
      estaLogueado: !!usuario && !!token,
    })
  },

  setUsuario: (usuario: Usuario | null) => set({ usuario }),
  setToken: (token: string | null) => set({ token }),
}))
