import { STORAGE_KEYS, useLocalStorage } from '@/lib'
import type { Pedido, Reporte } from '@/types'

// Helper para los cálculos de date-fns (nombrados localmente para evitar conflictos)
function calcStartOfDay(d: Date): Date {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  return date
}

function calcEndOfDay(d: Date): Date {
  const date = new Date(d)
  date.setHours(23, 59, 59, 999)
  return date
}

function calcStartOfWeek(d: Date): Date {
  const date = new Date(d)
  const day = date.getDay()
  const diff = date.getDate() - day
  return new Date(date.setDate(diff))
}

function calcEndOfWeek(d: Date): Date {
  const start = calcStartOfWeek(d)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

function calcStartOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function calcEndOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

// Calcula reporte para un período
export const generarReporteAPI = async (
  periodo: 'dia' | 'semana' | 'mes'
): Promise<Reporte> => {
  try {
    const { obtener } = useLocalStorage<Pedido[]>(STORAGE_KEYS.PEDIDOS)
    const pedidos = obtener() || []

    // Determinar fechas
    const ahora = new Date()
    let fechaInicio: Date
    let fechaFin: Date

    if (periodo === 'dia') {
      fechaInicio = calcStartOfDay(ahora)
      fechaFin = calcEndOfDay(ahora)
    } else if (periodo === 'semana') {
      fechaInicio = calcStartOfWeek(ahora)
      fechaFin = calcEndOfWeek(ahora)
    } else {
      fechaInicio = calcStartOfMonth(ahora)
      fechaFin = calcEndOfMonth(ahora)
    }

    // Filtrar pedidos del período
    const pedidosPeriodo = pedidos.filter((p) => {
      const fecha = new Date(p.fechaCreacion)
      return fecha >= fechaInicio && fecha <= fechaFin
    })

    // Calcular totales
    const totalMonto = pedidosPeriodo.reduce((sum, p) => sum + p.monto, 0)
    const totalGanancia = pedidosPeriodo.reduce((sum, p) => sum + (p.ganancia || 0), 0)
    const pedidosCompletados = pedidosPeriodo.filter(
      (p) => p.estado === 'entregado'
    ).length
    const pedidosCancelados = pedidosPeriodo.filter((p) => p.estado === 'cancelado').length
    const pedidosPendientes = pedidosPeriodo.filter(
      (p) => p.estado !== 'entregado' && p.estado !== 'cancelado'
    ).length

    // Costo operativo aproximado (30% del total)
    const costoOperativo = totalMonto * 0.3

    return {
      periodo,
      fechaInicio,
      fechaFin,
      totalMonto,
      totalGanancia,
      costoOperativo,
      pedidosCompletados,
      pedidosCancelados,
      pedidosPendientes,
    }
  } catch (error) {
    console.error('Error generando reporte:', error)
    throw error
  }
}
