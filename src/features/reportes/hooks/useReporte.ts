import { useEffect } from 'react'
import { useReporteStore } from '@/features/reportes/stores'
import { generarReporteAPI } from '@/features/reportes/api'
import { useAppStore } from '@/stores/appStore'

export const useReporte = (periodo: 'dia' | 'semana' | 'mes' = 'semana') => {
  const { reporteActual, setReporte, setCargando } = useReporteStore()
  const { mostrarError } = useAppStore()

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true)
        const reporte = await generarReporteAPI(periodo)
        setReporte(reporte)
      } catch (error) {
        mostrarError('Error al cargar reporte')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    cargar()
  }, [periodo])

  return { reporte: reporteActual }
}
