import { create } from 'zustand'

interface AppStore {
  // Estado de UI
  cargando: boolean
  mensajeExito: string | null
  mensajeError: string | null

  // Acciones
  setCargando: (cargando: boolean) => void
  mostrarExito: (mensaje: string, duracion?: number) => void
  mostrarError: (mensaje: string, duracion?: number) => void
  limpiarMensajes: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  cargando: false,
  mensajeExito: null,
  mensajeError: null,

  setCargando: (cargando: boolean) => set({ cargando }),

  mostrarExito: (mensaje: string, duracion = 3000) => {
    set({ mensajeExito: mensaje })
    if (duracion > 0) {
      setTimeout(() => set({ mensajeExito: null }), duracion)
    }
  },

  mostrarError: (mensaje: string, duracion = 5000) => {
    set({ mensajeError: mensaje })
    if (duracion > 0) {
      setTimeout(() => set({ mensajeError: null }), duracion)
    }
  },

  limpiarMensajes: () => set({ mensajeExito: null, mensajeError: null }),
}))
