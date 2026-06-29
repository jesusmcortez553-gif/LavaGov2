import { useEffect } from 'react'
import { usePedidoStore } from '@/features/pedidos/stores'
import { obtenerPedidosAPI } from '@/features/pedidos/api'
import { useAppStore } from '@/stores/appStore'

// Hook que carga y mantiene sincronizado el estado de pedidos
export const usePedidos = () => {
  const { pedidos, cargando, setPedidos, setCargando } = usePedidoStore()
  const { mostrarError } = useAppStore()

  // Cargar pedidos al montar el componente
  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const pedidosObtenidos = await obtenerPedidosAPI()
        setPedidos(pedidosObtenidos)
      } catch (error) {
        mostrarError('Error al cargar pedidos')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [])

  return { pedidos, cargando, setPedidos }
}
