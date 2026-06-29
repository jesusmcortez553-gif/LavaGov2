import { useEffect } from 'react'
import { useClienteStore } from '@/features/clientes/stores'
import { obtenerClientesAPI } from '@/features/clientes/api'
import { useAppStore } from '@/stores/appStore'

export const useClientes = () => {
  const { clientes, cargando, setClientes, setCargando } = useClienteStore()
  const { mostrarError } = useAppStore()

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const clientesObtenidos = await obtenerClientesAPI()
        setClientes(clientesObtenidos)
      } catch (error) {
        mostrarError('Error al cargar clientes')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [])

  return { clientes, cargando, setClientes }
}
