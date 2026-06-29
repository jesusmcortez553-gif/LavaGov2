import { create } from 'zustand'
import type { Reporte } from '@/types'

interface ReporteStore {
  reporteActual: Reporte | null
  periodo: 'dia' | 'semana' | 'mes'
  cargando: boolean

  setReporte: (reporte: Reporte | null) => void
  setPeriodo: (periodo: 'dia' | 'semana' | 'mes') => void
  setCargando: (cargando: boolean) => void
}

export const useReporteStore = create<ReporteStore>((set) => ({
  reporteActual: null,
  periodo: 'semana',
  cargando: false,

  setReporte: (reporte: Reporte | null) => set({ reporteActual: reporte }),
  setPeriodo: (periodo: 'dia' | 'semana' | 'mes') => set({ periodo }),
  setCargando: (cargando: boolean) => set({ cargando }),
}))
