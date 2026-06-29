import { FC, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

// Pages
import { PaginaLogin } from '@/pages/PaginaLogin'
import { PaginaDashboard } from '@/pages/PaginaDashboard'
import { PaginaPedidos } from '@/pages/PaginaPedidos'
import { PaginaClientes } from '@/pages/PaginaClientes'
import { PaginaReportes } from '@/pages/PaginaReportes'

// Componente protegido
interface RutaProtegidaProps {
  children: React.ReactNode
}

const RutaProtegida: FC<RutaProtegidaProps> = ({ children }) => {
  const { estaLogueado } = useAuthStore()

  if (!estaLogueado) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export const Router: FC = () => {
  const { cargarDelStorage } = useAuthStore()

  // Cargar auth del storage al montar
  useEffect(() => {
    cargarDelStorage()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Login pública */}
        <Route path="/login" element={<PaginaLogin />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <PaginaDashboard />
            </RutaProtegida>
          }
        />
        <Route
          path="/pedidos"
          element={
            <RutaProtegida>
              <PaginaPedidos />
            </RutaProtegida>
          }
        />
        <Route
          path="/clientes"
          element={
            <RutaProtegida>
              <PaginaClientes />
            </RutaProtegida>
          }
        />
        <Route
          path="/reportes"
          element={
            <RutaProtegida>
              <PaginaReportes />
            </RutaProtegida>
          }
        />

        {/* Ruta por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
