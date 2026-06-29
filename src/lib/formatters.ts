// Formatea monto a soles peruanos
export const formatearMonto = (monto: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(monto)
}

// Formatea fecha a formato legible en Perú
export const formatearFecha = (fecha: Date | string): string => {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// Formatea hora HH:mm
export const formatearHora = (fecha: Date | string): string => {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha
  return d.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Calcula tiempo transcurrido (ej: "hace 5m")
export const tiempoTranscurrido = (fecha: Date | string): string => {
  const d = typeof fecha === 'string' ? new Date(fecha) : fecha
  const ahora = new Date()
  const ms = ahora.getTime() - d.getTime()
  const minutos = Math.floor(ms / 60000)
  const horas = Math.floor(minutos / 60)
  const dias = Math.floor(horas / 24)

  if (minutos < 1) return 'hace un momento'
  if (minutos < 60) return `hace ${minutos}m`
  if (horas < 24) return `hace ${horas}h`
  if (dias < 7) return `hace ${dias}d`
  return formatearFecha(d)
}

// Calcula duración entre dos fechas (ej: "2h 15m")
export const calcularDuracion = (inicio: Date | string, fin: Date | string): string => {
  const d1 = typeof inicio === 'string' ? new Date(inicio) : inicio
  const d2 = typeof fin === 'string' ? new Date(fin) : fin
  const ms = Math.abs(d2.getTime() - d1.getTime())
  const minutos = Math.floor(ms / 60000)
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60

  if (minutos < 1) return '1m'
  if (horas === 0) return `${mins}m`
  return `${horas}h ${mins}m`
}
