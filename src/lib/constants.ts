// Estados y colores
export const ESTADOS_PEDIDO = [
  'nuevo',
  'recogido',
  'lavando',
  'entregado',
  'cancelado',
] as const

export const COLOR_ESTADO: Record<string, string> = {
  nuevo: '#f59e0b', // ámbar
  recogido: '#e879f9', // púrpura
  lavando: '#3b82f6', // azul
  entregado: '#10b981', // verde
  cancelado: '#6b7280', // gris
}

export const DESCRIPCION_ESTADO: Record<string, string> = {
  nuevo: 'Pedido recibido',
  recogido: 'Ropa en mano',
  lavando: 'En lavandería',
  entregado: 'Completado',
  cancelado: 'Cancelado',
}

// Lavanderías predeterminadas
export const LAVANDERIAS_DEFAULT = [
  'Lavandería Centro',
  'Lavandería Norte',
  'Lavandería Express',
  'Otra',
]

// Mensajes del sistema
export const MENSAJES = {
  exito: {
    pedidoCreado: 'Pedido creado correctamente',
    pedidoActualizado: 'Pedido actualizado',
    clienteCreado: 'Cliente agregado al directorio',
  },
  error: {
    campoRequerido: 'Este campo es requerido',
    coneccionFallida: 'Error de conexión. Intenta de nuevo.',
    operacionFallida: 'No pudimos completar la operación',
  },
}

// Tiempos
export const TIEMPOS = {
  REFRESCO_ALERTAS: 30000, // 30 segundos
  TIMEOUT_UBICACION: 10000, // 10 segundos
  REINTENTO_API: 3000, // 3 segundos
}
