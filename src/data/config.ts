// CONFIGURACIÓN DEL PROYECTO
// Edita este archivo para personalizar tu proyecto

export const CONFIG = {
  // ==========================================
  // IDENTIDAD DEL PROYECTO
  // ==========================================
  PROJECT_NAME: "AlphaTape",           // Nombre del proyecto
  PROJECT_SLUG: "alphatape",           // Slug para URLs (lowercase, sin espacios)
  DOMAIN: "alphatape.com.mx",          // Dominio principal
  
  // ==========================================
  // SEO Y METADATOS
  // ==========================================
  META: {
    TITLE: "AlphaTape - #1 Marketplace de Redes Sociales en México",
    DESCRIPTION: "Compra seguidores reales de Instagram, likes de TikTok, suscriptores de YouTube y más. Entrega rápida, calidad premium, precios bajos. Confiado por más de 1.4M de clientes desde 2017.",
    KEYWORDS: "comprar seguidores instagram, comprar likes tiktok, comprar suscriptores youtube, marketing redes sociales, crecimiento redes sociales mexico",
    AUTHOR: "AlphaTape",
    OG_IMAGE: "/logo.png",               // Imagen para redes sociales
  },
  
  // ==========================================
  // BRANDING
  // ==========================================
  BRAND: {
    PRIMARY_COLOR: "#F97316",            // Color principal (naranja)
    SECONDARY_COLOR: "#18181B",          // Color secundario (zinc-900)
    LOGO_URL: "/logo.png",
    FAVICON: "/favicon.ico",
  },
  
  // ==========================================
  // CONTACTO Y REDES
  // ==========================================
  CONTACT: {
    EMAIL: "soporte@alphatape.com.mx",
    WHATSAPP: "",                         // Número de WhatsApp (opcional)
    INSTAGRAM: "",                        // @usuario (opcional)
    TWITTER: "",                          // @usuario (opcional)
  },
  
  // ==========================================
  // CRIPTO (SI APLICA)
  // ==========================================
  CRYPTO: {
    ENABLED: true,
    WALLET_ADDRESSES: {
      EVM: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",     // ETH, MATIC, BNB, USDT, USDC
      TRON: "TKJWNpZiH1zskhZ9QWagc1Y7AKewWb11C4",            // TRX, USDT TRC20
      SOLANA: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp", // SOL, USDC SPL
      BTC: "bc1qmgux4hu40ltckrdxe40ffhrep2q3mrq6p056gc",      // Bitcoin
    },
    // Criptomonedas disponibles
    COINS: [
      { id: "usdt", name: "Tether", symbol: "USDT", icon: "₮", isStable: true },
      { id: "usdc", name: "USD Coin", symbol: "USDC", icon: "$", isStable: true },
      { id: "eth", name: "Ethereum", symbol: "ETH", icon: "♦" },
      { id: "btc", name: "Bitcoin", symbol: "BTC", icon: "₿" },
      { id: "sol", name: "Solana", symbol: "SOL", icon: "◎" },
      { id: "bnb", name: "BNB", symbol: "BNB", icon: "B" },
      { id: "trx", name: "TRON", symbol: "TRX", icon: "TRX" },
      { id: "matic", name: "Polygon", symbol: "MATIC", icon: "M" },
    ],
  },
  
  // ==========================================
  // PRODUCTOS/SERVICIOS
  // ==========================================
  PRODUCTS: {
    // Ejemplo de configuración de productos
    // Personaliza según tu nicho
    CATEGORIES: [
      {
        id: "instagram",
        name: "Instagram",
        icon: "Instagram",
        services: [
          { id: "seguidores", name: "Seguidores", type: "SEGUIDORES" },
          { id: "likes", name: "Likes", type: "LIKES" },
          { id: "comentarios", name: "Comentarios", type: "COMENTARIOS" },
          { id: "vistas", name: "Vistas", type: "VISTAS" },
        ],
      },
      {
        id: "tiktok",
        name: "TikTok",
        icon: "TikTok",
        services: [
          { id: "seguidores", name: "Seguidores", type: "SEGUIDORES" },
          { id: "likes", name: "Likes", type: "LIKES" },
          { id: "vistas", name: "Vistas", type: "VISTAS" },
        ],
      },
      {
        id: "youtube",
        name: "YouTube",
        icon: "YouTube",
        services: [
          { id: "suscriptores", name: "Suscriptores", type: "SUSCRIPTORES" },
          { id: "likes", name: "Likes", type: "LIKES" },
          { id: "vistas", name: "Vistas", type: "VISTAS" },
        ],
      },
    ],
    
    // Estados disponibles (para servicios geolocalizados)
    STATES: [
      "Ciudad de México", "Jalisco", "Nuevo León", "Estado de México", 
      "Puebla", "Guanajuato", "Veracruz", "Chihuahua", "Sonora", 
      "Coahuila", "Sinaloa", "Michoacán", "Oaxaca", "Yucatán",
      // ... agregar más estados
    ],
    
    // Paquetes disponibles (cantidades)
    PACKAGES: [100, 250, 500, 1000, 2500, 5000, 10000],
    
    // Precio base por unidad (se calcula: cantidad × precioBase)
    BASE_PRICE: 0.5, // $0.50 MXN por unidad base
  },
  
  // ==========================================
  // BLOG (OPCIONAL)
  // ==========================================
  BLOG: {
    ENABLED: true,
    TITLE: "Blog - AlphaTape",
    DESCRIPTION: "Estrategias, tips y guías para crecer en redes sociales en México",
    POSTS_PER_PAGE: 6,
  },
  
  // ==========================================
  // FEATURES
  // ==========================================
  FEATURES: {
    AUTH: true,              // Sistema de login/registro
    CART: true,              // Carrito de compras
    ORDERS: true,            // Historial de órdenes
    CHECKOUT_CRYPTO: true,   // Pago con cripto
    CHECKOUT_CARD: false,    // Pago con tarjeta (requiere integración)
    BLOG: true,              // Sección de blog
    PROFILE: true,           // Perfil de usuario
  },
  
  // ==========================================
  // TEXTO PERSONALIZABLE
  // ==========================================
  TEXTS: {
    HERO_TITLE: "Impulsa tu Presencia en Redes Sociales",
    HERO_SUBTITLE: "Servicios de crecimiento orgánico para Instagram, TikTok y YouTube. Resultados reales, entrega garantizada.",
    CTA_PRIMARY: "Ver Servicios",
    CTA_SECONDARY: "Ver Precios",
    TRUST_BADGE: "✓ Confiado por +1.4M de clientes",
    URGENCY_TEXT: "15% OFF en tu primera compra - Solo hoy",
  },
};

// Helper para acceder a config fácilmente
export default CONFIG;
