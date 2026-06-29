import { FC } from 'react'
import { Router } from '@/Router'
import { useAppStore } from '@/stores/appStore'

export const App: FC = () => {
  const { mensajeExito, mensajeError } = useAppStore()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Router principal */}
      <Router />

      {/* Toast de éxito */}
      {mensajeExito && (
        <div className="fixed bottom-4 right-4 bg-exito-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          ✓ {mensajeExito}
        </div>
      )}

      {/* Toast de error */}
      {mensajeError && (
        <div className="fixed bottom-4 right-4 bg-peligro-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          ⚠️ {mensajeError}
        </div>
      )}
    </div>
  )
}

export default App
