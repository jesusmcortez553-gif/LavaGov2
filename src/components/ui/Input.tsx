import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string
  error?: string
  ayuda?: string
}

export const Input: FC<InputProps> = ({
  etiqueta,
  error,
  ayuda,
  className,
  ...props
}) => {
  const estiloBase =
    'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primario-500 focus:border-transparent'
  const estiloError = error ? 'border-peligro-500 focus:ring-peligro-500' : ''

  return (
    <div className="flex flex-col gap-1">
      {etiqueta && <label className="text-sm font-medium text-gray-700">{etiqueta}</label>}
      <input
        {...props}
        className={`${estiloBase} ${estiloError} ${className || ''}`}
      />
      {error && <p className="text-sm text-peligro-600">{error}</p>}
      {ayuda && !error && <p className="text-sm text-gray-500">{ayuda}</p>}
    </div>
  )
}
