import { FC, ReactNode } from 'react'

interface BotonProps {
  label?: string
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  variante?: 'primario' | 'secundario' | 'peligro'
  tamaño?: 'sm' | 'md' | 'lg'
  cargando?: boolean
  className?: string
}

const estilosVariante = {
  primario:
    'bg-primario-600 text-white hover:bg-primario-700 active:bg-primario-800 disabled:opacity-50',
  secundario:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50',
  peligro:
    'bg-peligro-600 text-white hover:bg-peligro-700 active:bg-peligro-800 disabled:opacity-50',
}

const estilosTamaño = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export const Boton: FC<BotonProps> = ({
  label,
  children,
  onClick,
  disabled = false,
  variante = 'primario',
  tamaño = 'md',
  cargando = false,
  className,
}) => {
  const estiloBase =
    'font-medium rounded-md transition-colors duration-200 cursor-pointer'
  const estiloCompleto = `${estiloBase} ${estilosVariante[variante]} ${estilosTamaño[tamaño]} ${
    className || ''
  }`

  return (
    <button
      onClick={onClick}
      disabled={disabled || cargando}
      className={estiloCompleto}
    >
      {cargando ? '⏳ Procesando...' : label || children}
    </button>
  )
}
