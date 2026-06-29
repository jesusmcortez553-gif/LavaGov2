import { create } from 'zustand'
import type { Pedido } from '@/types'
import type { FiltrosPedidos } from '../types'

interface PedidoStore {
  // Estado
  pedidos: Pedido[]
  pedidoSeleccionado: Pedido | null
  filtros: FiltrosPedidos
  cargando: boolean

  // Acciones
  setPedidos: (pedidos: Pedido[]) => void
  agregarPedido: (pedido: Pedido) => void
  actualizarPedido: (pedido: Pedido) => void
  eliminarPedido: (id: string) => void
  seleccionar: (pedido: Pedido | null) => void
  setFiltros: (filtros: FiltrosPedidos) => void
  setCargando: (cargando: boolean) => void

  // Helpers
  obtenerPorEstado: (estado: string) => Pedido[]
  obtenerPendientes: () => Pedido[]
  obtenerEntregados: () => Pedido[]
}

export const usePedidoStore = create<PedidoStore>((set, get) => ({
  pedidos: [],
  pedidoSeleccionado: null,
  filtros: {},
  cargando: false,

  setPedidos: (pedidos: Pedido[]) => set({ pedidos }),

  agregarPedido: (pedido: Pedido) => {
    const { pedidos } = get()
    set({ pedidos: [...pedidos, pedido] })
  },

  actualizarPedido: (pedido: Pedido) => {
    const { pedidos, pedidoSeleccionado } = get()
    const actualizados = pedidos.map((p) => (p.id === pedido.id ? pedido : p))
    const nuevoSeleccionado =
      pedidoSeleccionado?.id === pedido.id ? pedido : pedidoSeleccionado
    set({ pedidos: actualizados, pedidoSeleccionado: nuevoSeleccionado })
  },

  eliminarPedido: (id: string) => {
    const { pedidos } = get()
    set({
      pedidos: pedidos.filter((p) => p.id !== id),
      pedidoSeleccionado: null,
    })
  },

  seleccionar: (pedido: Pedido | null) => set({ pedidoSeleccionado: pedido }),

  setFiltros: (filtros: FiltrosPedidos) => set({ filtros }),

  setCargando: (cargando: boolean) => set({ cargando }),

  // Helpers
  obtenerPorEstado: (estado: string) => {
    const { pedidos } = get()
    return pedidos.filter((p) => p.estado === estado)
  },

  obtenerPendientes: () => {
    const { pedidos } = get()
    return pedidos.filter((p) => p.estado !== 'entregado' && p.estado !== 'cancelado')
  },

  obtenerEntregados: () => {
    const { pedidos } = get()
    return pedidos.filter((p) => p.estado === 'entregado')
  },
}))
