// Estados permitidos para un pedido
export enum EstadoPedido {
  NUEVO = 'nuevo',
  RECOGIDO = 'recogido',
  LAVANDO = 'lavando',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}

// Pedido - entidad principal
export interface Pedido {
  id: string
  clienteId: string
  monto: number
  estado: EstadoPedido
  fechaCreacion: Date
  fechaRecogida?: Date
  fechaEntrega?: Date
  descripcion: string
  direccion: string
  telefono: string
  conductorId?: string
  ganancia: number
  kg: number
  lavanderia?: string
  inicioLavanderia?: Date
  tiempoLavanderia?: number // en minutos
  notasEntrega?: string
}

// Cliente en el directorio
export interface Cliente {
  id: string
  nombre: string
  celular: string
  direccion: string
  coordenadas?: {
    lat: number
    lng: number
  }
  mapsLink?: string
  notasEntrega?: string
  createdAt: Date
  totalPedidos: number
}

// Conductor para reparto
export interface Conductor {
  id: string
  nombre: string
  celular: string
  vehiculo: string
  estado: 'disponible' | 'en_ruta' | 'descansando'
  createdAt: Date
}

// Reporte financiero
export interface Reporte {
  periodo: 'dia' | 'semana' | 'mes'
  fechaInicio: Date
  fechaFin: Date
  totalMonto: number
  totalGanancia: number
  costoOperativo: number
  pedidosCompletados: number
  pedidosCancelados: number
  pedidosPendientes: number
}

// Lavandería disponible
export interface Lavanderia {
  id: string
  nombre: string
  tiempoPromedio: number // minutos
}

// Alerta del sistema
export interface Alerta {
  id: string
  pedidoId: string
  tipo: 'temporizador_vencido' | 'pedido_retrasado' | 'error_entrega'
  mensaje: string
  createdAt: Date
}
