import { STORAGE_KEYS, useLocalStorage } from '@/lib'
import type { Pedido, ActualizarEstadoPedidoRequest } from '@/types'
import type { CrearPedidoForm } from './types'

// Obtiene todos los pedidos
export const obtenerPedidosAPI = async (): Promise<Pedido[]> => {
  try {
    // TODO: Cambiar por llamada real a /api/pedidos
    const { obtener } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    return obtener() || []
  } catch (error) {
    console.error('Error obteniendo pedidos:', error)
    throw error
  }
}

// Obtiene un pedido por ID
export const obtenerPedidoAPI = async (id: string): Promise<Pedido | null> => {
  try {
    const { obtener } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []
    return pedidos.find((p) => p.id === id) || null
  } catch (error) {
    console.error('Error obteniendo pedido:', error)
    throw error
  }
}

// Crea un pedido
export const crearPedidoAPI = async (payload: CrearPedidoForm): Promise<Pedido> => {
  try {
    // TODO: Cambiar por POST real a /api/pedidos
    const nuevoPedido: Pedido = {
      id: Date.now().toString(),
      clienteId: payload.clienteId,
      monto: payload.monto,
      estado: 'nuevo' as any,
      fechaCreacion: new Date(),
      descripcion: payload.descripcion,
      direccion: payload.direccion,
      telefono: payload.telefono,
      ganancia: payload.monto * 0.3, // 30% ganancia temporal
      kg: payload.kg,
    }

    const { obtener, guardar } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []
    pedidos.push(nuevoPedido)
    guardar(pedidos)

    return nuevoPedido
  } catch (error) {
    console.error('Error creando pedido:', error)
    throw error
  }
}

// Actualiza estado de pedido
export const actualizarEstadoPedidoAPI = async (
  id: string,
  payload: ActualizarEstadoPedidoRequest
): Promise<Pedido> => {
  try {
    // TODO: Cambiar por PATCH real a /api/pedidos/:id
    const { obtener, guardar } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []
    const idx = pedidos.findIndex((p) => p.id === id)

    if (idx === -1) throw new Error('Pedido no encontrado')

    pedidos[idx].estado = payload.estado as any
    guardar(pedidos)

    return pedidos[idx]
  } catch (error) {
    console.error('Error actualizando pedido:', error)
    throw error
  }
}

// Asigna conductor a pedido
export const asignarConductorAPI = async (
  pedidoId: string,
  conductorId: string
): Promise<Pedido> => {
  try {
    const { obtener, guardar } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []
    const idx = pedidos.findIndex((p) => p.id === pedidoId)

    if (idx === -1) throw new Error('Pedido no encontrado')

    pedidos[idx].conductorId = conductorId
    guardar(pedidos)

    return pedidos[idx]
  } catch (error) {
    console.error('Error asignando conductor:', error)
    throw error
  }
}

// Elimina un pedido
export const eliminarPedidoAPI = async (id: string): Promise<void> => {
  try {
    const { obtener, guardar } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []
    const filtrados = pedidos.filter((p) => p.id !== id)
    guardar(filtrados)
  } catch (error) {
    console.error('Error eliminando pedido:', error)
    throw error
  }
}
