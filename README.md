# 🏭 TEMPLATE BASE - Sistema de Creación Rápida

Template reutilizable para crear proyectos frontend con React + TypeScript + Vite + Tailwind CSS en ~2 horas.

## ✨ Características

- ⚡ **Vite** - Build ultrarrápido
- 🔒 **Auth completo** - Login/Register/Profile con localStorage
- 🛒 **Carrito de compras** - Persistencia local
- 💳 **Checkout multi-step** - Con 8 criptomonedas integradas
- 📱 **Mobile-first** - Responsive design
- 🔍 **SEO optimizado** - Meta tags, sitemap, schema
- 🎨 **Tailwind + shadcn/ui** - Componentes modernos
- ⏱️ **Timer de urgencia** - Countdown para conversiones
- 🛡️ **Trust badges** - Elementos de confianza

## 🚀 Uso Rápido

### Opción 1: Script Automático (Recomendado)

```bash
# Crear nuevo proyecto
./new-project.sh nombre-proyecto "Nombre Proyecto" "Descripción"

# Ejemplo
./new-project.sh growthmx "GrowthMX" "Servicios de crecimiento digital"
```

Esto crea automáticamente:
- ✅ Copia del template
- ✅ Personalización de nombres
- ✅ Instalación de dependencias
- ✅ Setup de git

### Opción 2: Manual

```bash
# 1. Copiar template
cp -r alphatape-template mi-proyecto
cd mi-proyecto

# 2. Instalar
npm install

# 3. Configurar
# Editar src/data/config.ts

# 4. Desarrollar
npm run dev

# 5. Deploy
npm run build
vercel --prod
```

## ⚙️ Configuración

Edita `src/data/config.ts`:

```typescript
export const CONFIG = {
  PROJECT_NAME: "Tu Proyecto",
  DOMAIN: "tuproyecto.com",
  
  META: {
    TITLE: "Título para SEO",
    DESCRIPTION: "Descripción para SEO",
  },
  
  BRAND: {
    PRIMARY_COLOR: "#F97316",
  },
  
  // ... ver archivo completo
};
```

## 📁 Estructura

```
mi-proyecto/
├── src/
│   ├── components/    # UI components (Header, Footer, Checkout, etc)
│   ├── contexts/      # AuthContext, CartContext
│   ├── pages/         # Index, Login, Profile, Orders, Blog
│   ├── data/          # config.ts ← EDITAR ESTO
│   └── hooks/         # useExchangeRates
├── public/            # Logo, favicon
└── index.html         # SEO meta tags
```

## 🎯 Checklist por Proyecto

### Siempre incluir:
- [ ] Editar `src/data/config.ts`
- [ ] Reemplazar `public/logo.png`
- [ ] Personalizar homepage (`src/pages/Index.tsx`)
- [ ] Configurar productos/servicios
- [ ] Revisar SEO meta tags en `index.html`

### Si aplica:
- [ ] Configurar wallet addresses para crypto
- [ ] Agregar artículos de blog
- [ ] Configurar WhatsApp
- [ ] Personalizar colores en Tailwind

## 🔄 Flujo de Trabajo Estándar

| Fase | Tiempo | Descripción |
|------|--------|-------------|
| 1. Investigación | 30 min | Nicho, competencia, keywords |
| 2. Setup | 15 min | Copiar template, instalar |
| 3. Configuración | 30 min | Editar config.ts, branding |
| 4. Contenido | 45 min | Homepage, copy, imágenes |
| 5. SEO | 15 min | Meta tags, blog opcional |
| 6. Deploy | 15 min | Build, Vercel, dominio |
| **TOTAL** | **~2.5 horas** | 1 proyecto completo |

## 🛠️ Scripts Disponibles

```bash
npm run dev       # Desarrollo local
npm run build     # Build producción
npm run preview   # Preview build local
./new-project.sh  # Crear proyecto desde template
```

## 📦 Stack Tecnológico

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State:** React Context + localStorage
- **Deploy:** Vercel (recomendado)

## 🔐 Crypto Payments (Opcional)

El template incluye soporte para 8 criptomonedas:
- USDT, USDC (stablecoins)
- ETH, BTC, SOL, BNB, TRX, MATIC

Para activar, configura en `config.ts`:
```typescript
CRYPTO: {
  ENABLED: true,
  WALLET_ADDRESSES: {
    EVM: "0x...",
    TRON: "T...",
    SOLANA: "...",
    BTC: "bc1...",
  }
}
```

## 📝 Ejemplo de Uso

### Crear un proyecto de venta de diseños:

```bash
./new-project.sh designmx "DesignMX" "Diseño gráfico profesional"
```

Luego editar `src/data/config.ts`:
```typescript
PRODUCTS: {
  CATEGORIES: [
    {
      id: "logos",
      name: "Logos",
      services: [
        { id: "basico", name: "Logo Básico", type: "LOGO" },
        { id: "premium", name: "Logo Premium", type: "LOGO" },
      ]
    }
  ]
}
```

## 🆘 Troubleshooting

### Error: "vercel: command not found"
```bash
npm i -g vercel
vercel login
```

### Error: Puerto ocupado
```bash
# Cambiar puerto
npm run dev -- --port 3001
```

### Build falla
```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Recursos

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite Guide](https://vitejs.dev)

---

**Template creado desde AlphaTape**

*Última actualización: 2026-02-05*
