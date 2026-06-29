import { FC } from 'react'
import { usePedidos } from '@/features/pedidos'
import { LayoutPrincipal } from '@/components/layout'
import { Tarjeta, Boton } from '@/components/ui'
import { formatearMonto, tiempoTranscurrido, COLOR_ESTADO } from '@/lib'

export const PaginaPedidos: FC = () => {
  const { pedidos, cargando } = usePedidos()

  if (cargando) {
    return (
      <LayoutPrincipal>
        <div className="text-center py-12">Cargando pedidos...</div>
      </LayoutPrincipal>
    )
  }

  return (
    <LayoutPrincipal>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
            <p className="text-gray-600">Total: {pedidos.length}</p>
          </div>
          <Boton label="+ Crear pedido" variante="primario" tamaño="lg" />
        </div>

        {pedidos.length === 0 ? (
          <Tarjeta>
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg">Sin pedidos aún</p>
              <p className="text-sm">Crea tu primer pedido para comenzar</p>
            </div>
          </Tarjeta>
        ) : (
          <div className="space-y-3">
            {pedidos.map((pedido) => (
              <Tarjeta key={pedido.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {pedido.descripcion}
                      </h3>
                      <span
                        style={{
                          backgroundColor: `${COLOR_ESTADO[pedido.estado]}20`,
                          color: COLOR_ESTADO[pedido.estado],
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {pedido.estado.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Cliente: <strong>{pedido.clienteId}</strong>
                    </p>
                    <div className="flex gap-6 text-sm text-gray-600">
                      <div>
                        Monto: <strong className="text-primario-600">{formatearMonto(pedido.monto)}</strong>
                      </div>
                      <div>
                        Kg: <strong>{pedido.kg}</strong>
                      </div>
                      <div>
                        Creado: <strong>{tiempoTranscurrido(pedido.fechaCreacion)}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Boton label="Editar" variante="secundario" tamaño="sm" />
                    <Boton label="Eliminar" variante="peligro" tamaño="sm" />
                  </div>
                </div>
              </Tarjeta>
            ))}
          </div>
        )}
      </div>
    </LayoutPrincipal>
  )
}
