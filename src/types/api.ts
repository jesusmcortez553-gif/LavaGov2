import type { Pedido, Cliente, Reporte } from './domain'

// Tipos para crear/actualizar entidades
export interface CrearPedidoRequest {
  clienteId: string
  monto: number
  descripcion: string
  direccion: string
  telefono: string
  kg: number
}

export interface ActualizarEstadoPedidoRequest {
  estado: string
}

export interface CrearClienteRequest {
  nombre: string
  celular: string
  direccion: string
  notasEntrega?: string
}

// Respuestas genéricas
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// Respuestas específicas
export type ObtenerPedidosResponse = APIResponse<Pedido[]>
export type CrearPedidoResponse = APIResponse<Pedido>
export type ObtenerClientesResponse = APIResponse<Cliente[]>
export type ObtenerReporteResponse = APIResponse<Reporte>
