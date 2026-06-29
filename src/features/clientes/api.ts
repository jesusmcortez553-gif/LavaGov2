import { STORAGE_KEYS, useLocalStorage } from '@/lib'
import type { Cliente } from '@/types'
import type { CrearClienteForm } from './types'

export const obtenerClientesAPI = async (): Promise<Cliente[]> => {
  try {
    const { obtener } = useLocalStorage<Cliente[]>(STORAGE_KEYS.CLIENTES)
    return obtener() || []
  } catch (error) {
    console.error('Error obteniendo clientes:', error)
    throw error
  }
}

export const crearClienteAPI = async (payload: CrearClienteForm): Promise<Cliente> => {
  try {
    const nuevoCliente: Cliente = {
      id: Date.now().toString(),
      ...payload,
      createdAt: new Date(),
      totalPedidos: 0,
    }

    const { obtener, guardar } = useLocalStorage<Cliente[]>(STORAGE_KEYS.CLIENTES)
    const clientes = obtener() || []
    clientes.push(nuevoCliente)
    guardar(clientes)

    return nuevoCliente
  } catch (error) {
    console.error('Error creando cliente:', error)
    throw error
  }
}

export const actualizarClienteAPI = async (
  id: string,
  payload: Partial<CrearClienteForm>
): Promise<Cliente> => {
  try {
    const { obtener, guardar } = useLocalStorage<Cliente[]>(STORAGE_KEYS.CLIENTES)
    const clientes = obtener() || []
    const idx = clientes.findIndex((c) => c.id === id)

    if (idx === -1) throw new Error('Cliente no encontrado')

    clientes[idx] = { ...clientes[idx], ...payload }
    guardar(clientes)

    return clientes[idx]
  } catch (error) {
    console.error('Error actualizando cliente:', error)
    throw error
  }
}

export const eliminarClienteAPI = async (id: string): Promise<void> => {
  try {
    const { obtener, guardar } = useLocalStorage<Cliente[]>(STORAGE_KEYS.CLIENTES)
    const clientes = obtener() || []
    guardar(clientes.filter((c) => c.id !== id))
  } catch (error) {
    console.error('Error eliminando cliente:', error)
    throw error
  }
}
