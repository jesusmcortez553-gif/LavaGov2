// Constantes de validación
export const MONTO_MINIMO = 50
export const MONTO_MAXIMO = 10000

// Valida monto (>=50, <=10000)
export const validarMonto = (monto: number): { valido: boolean; error?: string } => {
  if (monto < MONTO_MINIMO) {
    return { valido: false, error: `Monto mínimo S/ ${MONTO_MINIMO}` }
  }
  if (monto > MONTO_MAXIMO) {
    return { valido: false, error: `Monto máximo S/ ${MONTO_MAXIMO}` }
  }
  return { valido: true }
}

// Valida teléfono peruano (9XXXXXXXX o +51XXXXXXXXX)
export const validarTelefono = (telefono: string): { valido: boolean; error?: string } => {
  const soloNumeros = telefono.replace(/\D/g, '')
  if (!/^(51)?9\d{8}$/.test(soloNumeros)) {
    return { valido: false, error: 'Teléfono inválido. Ej: 987654321' }
  }
  return { valido: true }
}

// Valida que no esté vacío
export const validarTexto = (
  texto: string,
  minimo: number = 3,
  maximo: number = 100
): { valido: boolean; error?: string } => {
  if (!texto || texto.trim().length === 0) {
    return { valido: false, error: 'Campo requerido' }
  }
  if (texto.length < minimo) {
    return { valido: false, error: `Mínimo ${minimo} caracteres` }
  }
  if (texto.length > maximo) {
    return { valido: false, error: `Máximo ${maximo} caracteres` }
  }
  return { valido: true }
}

// Valida dirección
export const validarDireccion = (direccion: string): { valido: boolean; error?: string } => {
  return validarTexto(direccion, 5, 200)
}

// Valida kilogramos
export const validarKilogramos = (kg: number): { valido: boolean; error?: string } => {
  if (kg <= 0) {
    return { valido: false, error: 'Kilogramos debe ser mayor a 0' }
  }
  if (kg > 100) {
    return { valido: false, error: 'Máximo 100 kg' }
  }
  return { valido: true }
}
