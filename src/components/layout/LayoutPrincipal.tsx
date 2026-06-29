import { FC, ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

interface LayoutPrincipalProps {
  children: ReactNode
}

export const LayoutPrincipal: FC<LayoutPrincipalProps> = ({ children }) => {
  const location = useLocation()
  const { usuario, logout } = useAuthStore()

  const esActivo = (ruta: string) =>
    location.pathname === ruta ? 'text-primario-600 border-b-2 border-primario-600' : ''

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primario-600">
            🧺 LAVA GO
          </Link>
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-600">{usuario?.nombre}</p>
            <button
              onClick={logout}
              className="text-sm text-gray-600 hover:text-peligro-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Navegación */}
        <nav className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 flex gap-8">
            <Link
              to="/dashboard"
              className={`py-3 text-sm font-medium transition-colors ${esActivo(
                '/dashboard'
              )}`}
            >
              Dashboard
            </Link>
            <Link
              to="/pedidos"
              className={`py-3 text-sm font-medium transition-colors ${esActivo(
                '/pedidos'
              )}`}
            >
              Pedidos
            </Link>
            <Link
              to="/clientes"
              className={`py-3 text-sm font-medium transition-colors ${esActivo(
                '/clientes'
              )}`}
            >
              Clientes
            </Link>
            <Link
              to="/reportes"
              className={`py-3 text-sm font-medium transition-colors ${esActivo(
                '/reportes'
              )}`}
            >
              Reportes
            </Link>
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-16">
        <p className="text-sm">
          LAVA GO v2.0 | Gestión operativa sin fricción |{' '}
          <span className="text-gray-500">© 2024</span>
        </p>
      </footer>
    </div>
  )
}
