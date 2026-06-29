import { create } from 'zustand'
import type { Cliente } from '@/types'

interface ClienteStore {
  clientes: Cliente[]
  clienteSeleccionado: Cliente | null
  cargando: boolean

  setClientes: (clientes: Cliente[]) => void
  agregarCliente: (cliente: Cliente) => void
  actualizarCliente: (cliente: Cliente) => void
  eliminarCliente: (id: string) => void
  seleccionar: (cliente: Cliente | null) => void
  setCargando: (cargando: boolean) => void
}

export const useClienteStore = create<ClienteStore>((set, get) => ({
  clientes: [],
  clienteSeleccionado: null,
  cargando: false,

  setClientes: (clientes: Cliente[]) => set({ clientes }),

  agregarCliente: (cliente: Cliente) => {
    const { clientes } = get()
    set({ clientes: [...clientes, cliente] })
  },

  actualizarCliente: (cliente: Cliente) => {
    const { clientes, clienteSeleccionado } = get()
    const actualizados = clientes.map((c) => (c.id === cliente.id ? cliente : c))
    const nuevoSeleccionado =
      clienteSeleccionado?.id === cliente.id ? cliente : clienteSeleccionado
    set({ clientes: actualizados, clienteSeleccionado: nuevoSeleccionado })
  },

  eliminarCliente: (id: string) => {
    const { clientes } = get()
    set({
      clientes: clientes.filter((c) => c.id !== id),
      clienteSeleccionado: null,
    })
  },

  seleccionar: (cliente: Cliente | null) => set({ clienteSeleccionado: cliente }),

  setCargando: (cargando: boolean) => set({ cargando }),
}))
