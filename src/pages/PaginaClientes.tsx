import { FC } from 'react'
import { useClientes } from '@/features/clientes'
import { LayoutPrincipal } from '@/components/layout'
import { Tarjeta, Boton } from '@/components/ui'

export const PaginaClientes: FC = () => {
  const { clientes, cargando } = useClientes()

  if (cargando) {
    return (
      <LayoutPrincipal>
        <div className="text-center py-12">Cargando clientes...</div>
      </LayoutPrincipal>
    )
  }

  return (
    <LayoutPrincipal>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Directorio de clientes</h1>
            <p className="text-gray-600">Total: {clientes.length}</p>
          </div>
          <Boton label="+ Agregar cliente" variante="primario" tamaño="lg" />
        </div>

        {clientes.length === 0 ? (
          <Tarjeta>
            <div className="text-center py-12 text-gray-600">
              <p className="text-lg">Sin clientes aún</p>
              <p className="text-sm">Agrega tu primer cliente</p>
            </div>
          </Tarjeta>
        ) : (
          <div className="space-y-3">
            {clientes.map((cliente) => (
              <Tarjeta key={cliente.id}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cliente.nombre}</h3>
                    <p className="text-sm text-gray-600">
                      📱 {cliente.celular} | 📍 {cliente.direccion}
                    </p>
                    {cliente.notasEntrega && (
                      <p className="text-sm text-gray-500 mt-1">Notas: {cliente.notasEntrega}</p>
                    )}
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
