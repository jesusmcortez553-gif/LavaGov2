import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Input, Tarjeta } from '@/components/ui'

export const PaginaLogin: FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setCargando(true)
      await login(email)
      navigate('/dashboard')
    } catch (err) {
      setError('Error al iniciar sesión')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primario-600 to-primario-800 flex items-center justify-center p-4">
      <Tarjeta className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primario-600 mb-2">🧺 LAVA GO</h1>
          <p className="text-gray-600">Gestión operativa sin fricción</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-peligro-50 border border-peligro-200 text-peligro-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            etiqueta="Correo"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            etiqueta="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={cargando}
            className="w-full px-4 py-2 bg-primario-600 text-white font-medium rounded-md hover:bg-primario-700 disabled:opacity-50"
          >
            {cargando ? '⏳ Procesando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>Usuario demo: cualquiera@email.com</p>
          <p>Contraseña: cualquiera</p>
        </div>
      </Tarjeta>
    </div>
  )
}
