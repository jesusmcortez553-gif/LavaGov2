# 🧺 LAVA GO v2.0

**SaaS B2B para operadores de lavandería** | Gestión operativa sin fricción

## 📋 Descripción

LAVA GO es una plataforma web diseñada para que operadores de lavandería gestionen eficientemente:

- 📦 **Pedidos** - crear, seguir, actualizar estado
- 👥 **Clientes** - directorio con contactos y direcciones
- 🏍️ **Conductores** - asignar reparto
- 📊 **Reportes** - análisis financiero diario/semanal/mensual

## 🛠️ Tech Stack

```
Frontend:
  ✅ React 18 + TypeScript (strict mode)
  ✅ Vite (bundler)
  ✅ Tailwind CSS v4
  ✅ Zustand (estado global)
  ✅ React Router v6 (navegación)
  ✅ Axios (HTTP client)
```

## 🚀 Inicio rápido

### Instalación

```bash
# Clonar repo
git clone <repo-url> lava-go
cd lava-go

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar en desarrollo
npm run dev
```

La app abrirá en `http://localhost:5173`

### Login demo

- Email: `cualquiera@email.com`
- Contraseña: `cualquiera`

## 📁 Estructura de carpetas

```
src/
├── features/              # Features por dominio
│   ├── pedidos/
│   ├── clientes/
│   ├── reportes/
│   └── autenticacion/
├── components/            # Componentes reutilizables
│   ├── ui/               # Botones, inputs, tarjetas
│   ├── layout/           # Header, sidebar
│   └── common/           # Spinners, alerts
├── stores/               # Zustand global state
├── lib/                  # Utilidades
├── types/                # TypeScript types
├── pages/                # Page components
├── Router.tsx            # Configuración de routing
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Tailwind + estilos globales
```

## 📦 Features

### Dashboard
- Resumen de pedidos activos
- Estadísticas de la semana
- Reporte financiero rápido

### Pedidos
- ✅ Crear pedido (cliente, monto, descripción, dirección)
- ✅ Listar pedidos con filtros
- ✅ Cambiar estado (nuevo → recogido → lavando → entregado)
- ✅ Asignar conductor
- ⏳ Temporizador de lavandería (próximamente)
- ⏳ Notificaciones (próximamente)

### Clientes
- ✅ Agregar cliente al directorio
- ✅ Listar con búsqueda
- ✅ Guardar coordenadas GPS
- ⏳ Historial de pedidos

### Reportes
- ✅ Reporte por período (día/semana/mes)
- ✅ Ingresos totales
- ✅ Ganancia neta
- ✅ Costo operativo
- ✅ Margen de ganancia

## 🔐 Autenticación

Actualmente usa **localStorage** para persistencia. En producción:

```typescript
// Conectar con backend real en src/stores/authStore.ts
// Cambiar login() para llamar a API_URL/auth/login
```

## 📝 Convenciones

### Nomenclatura (SIEMPRE ESPAÑOL)
```typescript
// ✅ BIEN
const [pedidosActivos, setPedidosActivos] = useState([])
const obtenerPedidoPorId = (id: string) => { ... }

// ❌ MAL
const [activeOrders, setActiveOrders] = useState([])
const fetchOrderById = (id: string) => { ... }
```

### Componentes (Funcionales + TypeScript)
```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const Boton: FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>{label}</button>
)
```

### Estado
```typescript
// Global (múltiples componentes) → Zustand
const { pedidos, agregarPedido } = usePedidoStore()

// Local (un componente) → useState
const [formularioAbierto, setFormularioAbierto] = useState(false)
```

## 🎨 Estilos

- **Framework**: Tailwind CSS v4
- **Colores**: primario (azul), exito (verde), advertencia (ámbar), peligro (rojo)
- **Componentes**: Boton, Input, Tarjeta (en `/src/components/ui`)

```typescript
// Usar siempre Tailwind, nunca CSS modules
<div className="bg-primario-600 text-white px-4 py-2 rounded-md">
  Botón customizado
</div>
```

## 📚 Próximas funcionalidades

- [ ] Temporizador visual en lavandería
- [ ] Notificaciones en tiempo real
- [ ] Chat con conductores
- [ ] Integración con WhatsApp
- [ ] Mapas en tiempo real (conductores)
- [ ] Historial de transacciones
- [ ] Backup automático a cloud

## 🐛 Desarrollo

```bash
# Type checking
npm run type-check

# Lint
npm run lint

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📞 Contacto

**Creador**: Jesús Cortez (Guía de Agencia BCP)  
**Email**: jesusmcortez553@gmail.com  
**Filosofía**: "Resolver un dolor real, todos los días, sin rendirme"

---

**LAVA GO v2.0** | Junio 2024 | Hecho con ❤️ para operadores de lavandería
