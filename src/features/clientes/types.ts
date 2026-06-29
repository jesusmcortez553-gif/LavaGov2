export type { Cliente } from '@/types'

export interface CrearClienteForm {
  nombre: string
  celular: string
  direccion: string
  notasEntrega?: string
}
