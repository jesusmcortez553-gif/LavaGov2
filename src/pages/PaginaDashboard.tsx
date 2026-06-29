import { FC } from 'react'
import { usePedidos } from '@/features/pedidos'
import { useClientes } from '@/features/clientes'
import { useReporte } from '@/features/reportes'
import { LayoutPrincipal } from '@/components/layout'
import { Tarjeta } from '@/components/ui'
import { formatearMonto } from '@/lib'

export const PaginaDashboard: FC = () => {
  const { pedidos } = usePedidos()
  const { clientes } = useClientes()
  const { reporte } = useReporte('semana')

  const pedidosPendientes = pedidos.filter(
    (p) => p.estado !== 'entregado' && p.estado !== 'cancelado'
  ).length
  const pedidosEntregados = pedidos.filter((p) => p.estado === 'entregado').length

  return (
    <LayoutPrincipal>
      <div className="space-y-8">
        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Resumen de esta semana</p>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Tarjeta className="bg-gradient-to-br from-primario-50 to-primario-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total pedidos</p>
              <p className="text-3xl font-bold text-primario-600">{pedidos.length}</p>
            </div>
          </Tarjeta>

          <Tarjeta className="bg-gradient-to-br from-exito-50 to-exito-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Entregados</p>
              <p className="text-3xl font-bold text-exito-600">{pedidosEntregados}</p>
            </div>
          </Tarjeta>

          <Tarjeta className="bg-gradient-to-br from-advertencia-50 to-advertencia-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Pendientes</p>
              <p className="text-3xl font-bold text-advertencia-600">{pedidosPendientes}</p>
            </div>
          </Tarjeta>

          <Tarjeta className="bg-gradient-to-br from-peligro-50 to-peligro-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Clientes</p>
              <p className="text-3xl font-bold text-peligro-600">{clientes.length}</p>
            </div>
          </Tarjeta>
        </div>

        {/* Reporte financiero */}
        {reporte && (
          <Tarjeta titulo="Reporte financiero (Esta semana)">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Ingresos totales</p>
                <p className="text-2xl font-bold text-primario-600">
                  {formatearMonto(reporte.totalMonto)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ganancia</p>
                <p className="text-2xl font-bold text-exito-600">
                  {formatearMonto(reporte.totalGanancia)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Costo operativo</p>
                <p className="text-2xl font-bold text-advertencia-600">
                  {formatearMonto(reporte.costoOperativo)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Margen</p>
                <p className="text-2xl font-bold text-primario-600">
                  {((reporte.totalGanancia / reporte.totalMonto) * 100 || 0).toFixed(0)}%
                </p>
              </div>
            </div>
          </Tarjeta>
        )}
      </div>
    </LayoutPrincipal>
  )
}
