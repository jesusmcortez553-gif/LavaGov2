import { FC, ReactNode } from 'react'

interface TarjetaProps {
  titulo?: string
  children: ReactNode
  acciones?: ReactNode
  className?: string
}

export const Tarjeta: FC<TarjetaProps> = ({
  titulo,
  children,
  acciones,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${
        className || ''
      }`}
    >
      {titulo && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
          {acciones && <div className="flex gap-2">{acciones}</div>}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}
