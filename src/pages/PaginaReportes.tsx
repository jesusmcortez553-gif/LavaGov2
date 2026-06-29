import { FC, useState } from 'react'
import { useReporte } from '@/features/reportes'
import { LayoutPrincipal } from '@/components/layout'
import { Tarjeta } from '@/components/ui'
import { formatearMonto, formatearFecha } from '@/lib'

export const PaginaReportes: FC = () => {
  const [periodo, setPeriodo] = useState<'dia' | 'semana' | 'mes'>('semana')
  const { reporte } = useReporte(periodo)

  return (
    <LayoutPrincipal>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reportes financieros</h1>
          <p className="text-gray-600">Análisis de ingresos y gastos</p>
        </div>

        {/* Selector de período */}
        <div className="flex gap-3">
          {(['dia', 'semana', 'mes'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                periodo === p
                  ? 'bg-primario-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              {p === 'dia' ? 'Hoy' : p === 'semana' ? 'Esta semana' : 'Este mes'}
            </button>
          ))}
        </div>

        {/* Reporte */}
        {reporte ? (
          <div className="space-y-4">
            {/* Fechas */}
            <Tarjeta>
              <p className="text-sm text-gray-600">
                Período: <strong>{formatearFecha(reporte.fechaInicio)}</strong> al{' '}
                <strong>{formatearFecha(reporte.fechaFin)}</strong>
              </p>
            </Tarjeta>

            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Tarjeta>
                <div>
                  <p className="text-sm text-gray-600">Ingresos totales</p>
                  <p className="text-3xl font-bold text-primario-600">
                    {formatearMonto(reporte.totalMonto)}
                  </p>
                </div>
              </Tarjeta>

              <Tarjeta>
                <div>
                  <p className="text-sm text-gray-600">Ganancia neta</p>
                  <p className="text-3xl font-bold text-exito-600">
                    {formatearMonto(reporte.totalGanancia)}
                  </p>
                </div>
              </Tarjeta>

              <Tarjeta>
                <div>
                  <p className="text-sm text-gray-600">Costo operativo</p>
                  <p className="text-3xl font-bold text-advertencia-600">
                    {formatearMonto(reporte.costoOperativo)}
                  </p>
                </div>
              </Tarjeta>

              <Tarjeta>
                <div>
                  <p className="text-sm text-gray-600">Margen</p>
                  <p className="text-3xl font-bold text-primario-600">
                    {((reporte.totalGanancia / reporte.totalMonto) * 100 || 0).toFixed(1)}%
                  </p>
                </div>
              </Tarjeta>
            </div>

            {/* Detalles de pedidos */}
            <Tarjeta titulo="Resumen de pedidos">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Completados</p>
                  <p className="text-3xl font-bold text-exito-600">
                    {reporte.pedidosCompletados}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pendientes</p>
                  <p className="text-3xl font-bold text-advertencia-600">
                    {reporte.pedidosPendientes}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cancelados</p>
                  <p className="text-3xl font-bold text-peligro-600">
                    {reporte.pedidosCancelados}
                  </p>
                </div>
              </div>
            </Tarjeta>
          </div>
        ) : (
          <Tarjeta>
            <div className="text-center py-12 text-gray-600">
              Cargando reporte...
            </div>
          </Tarjeta>
        )}
      </div>
    </LayoutPrincipal>
  )
}
