// Request para crear pedido
export interface CrearPedidoForm {
  clienteId: string
  nombre: string
  monto: number
  descripcion: string
  direccion: string
  telefono: string
  kg: number
}

// Filtro de lista
export interface FiltrosPedidos {
  estado?: string
  clienteId?: string
  conductorId?: string
  fechaInicio?: Date
  fechaFin?: Date
}
