// Estados ordenados por importancia/popularidad (ranking combinado)
export const mexicanStates = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

// Ranking de estados por importancia/popularidad (1 = más importante, 32 = menos importante)
const getStateRanking = (state: string): number => {
  const ranking: { [key: string]: number } = {
    "Ciudad de México": 1,
    "Estado de México": 2,
    "Jalisco": 3,
    "Nuevo León": 4,
    "Veracruz": 5,
    "Guanajuato": 6,
    "Puebla": 7,
    "Baja California": 8,
    "Chihuahua": 9,
    "Coahuila": 10,
    "Michoacán": 11,
    "Tamaulipas": 12,
    "Sonora": 13,
    "Oaxaca": 14,
    "Tabasco": 15,
    "Sinaloa": 16,
    "Chiapas": 17,
    "San Luis Potosí": 18,
    "Querétaro": 19,
    "Hidalgo": 20,
    "Guerrero": 21,
    "Yucatán": 22,
    "Quintana Roo": 23,
    "Campeche": 24,
    "Aguascalientes": 25,
    "Morelos": 26,
    "Durango": 27,
    "Zacatecas": 28,
    "Nayarit": 29,
    "Baja California Sur": 30,
    "Tlaxcala": 31,
    "Colima": 32,
  };
  return ranking[state] || 16; // Default medio
};

// Multiplicador de PRECIO por estado (estados más importantes = precios MÁS ALTOS)
// Estados TOP = precios más altos, estados BOTTOM = precios más bajos
const getStatePriceMultiplier = (state: string): number => {
  const rank = getStateRanking(state);
  
  if (rank <= 4) return 1.0; // Top 4: Precio completo (más caro)
  if (rank <= 10) return 0.90; // Top 10: -10% precio
  if (rank <= 16) return 0.80; // Top 16: -20% precio
  if (rank <= 24) return 0.70; // Top 24: -30% precio
  return 0.60; // Bottom 8: -40% precio (más barato)
};

export interface StatePackage {
  state: string;
  packages: {
    quantity: number;
    price: number;
    popular?: boolean;
  }[];
}

export const generateStatePackages = (platform: string, type: string): StatePackage[] => {
  // Paquetes base según el tipo de servicio
  // JERARQUÍA DE PRECIOS: YouTube (299) < Likes (499) < Seguidores (649) < Comentarios (799)
  let basePackages: { quantity: number; price: number; popular?: boolean }[] = [];

  // YOUTUBE - El más barato (precio mínimo 299 MXN, máximo 3499 MXN)
  if (platform === "YouTube") {
    if (type === "SUSCRIPTORES") {
      basePackages = [
        { quantity: 100, price: 299 },
        { quantity: 250, price: 499 },
        { quantity: 500, price: 799, popular: true },
        { quantity: 1000, price: 1299 },
        { quantity: 2500, price: 2199 },
        { quantity: 5000, price: 3499 },
      ];
    } else if (type === "VISTAS") {
      basePackages = [
        { quantity: 500, price: 299 },
        { quantity: 1000, price: 449 },
        { quantity: 2500, price: 749, popular: true },
        { quantity: 5000, price: 1199 },
        { quantity: 10000, price: 1899 },
        { quantity: 25000, price: 2999 },
      ];
    } else if (type === "LIKES") {
      basePackages = [
        { quantity: 100, price: 299 },
        { quantity: 250, price: 449 },
        { quantity: 500, price: 649, popular: true },
        { quantity: 1000, price: 999 },
        { quantity: 2500, price: 1699 },
        { quantity: 5000, price: 2799 },
      ];
    } else if (type === "COMENTARIOS") {
      basePackages = [
        { quantity: 25, price: 299 },
        { quantity: 50, price: 449 },
        { quantity: 100, price: 749 },
        { quantity: 250, price: 1299, popular: true },
        { quantity: 500, price: 2199 },
        { quantity: 1000, price: 3499 },
      ];
    } else if (type === "WATCH TIME") {
      basePackages = [
        { quantity: 100, price: 299 },
        { quantity: 500, price: 799 },
        { quantity: 1000, price: 1399, popular: true },
        { quantity: 2000, price: 2399 },
        { quantity: 4000, price: 3899 },
      ];
    } else {
      // Default YouTube
      basePackages = [
        { quantity: 100, price: 299 },
        { quantity: 250, price: 499 },
        { quantity: 500, price: 799, popular: true },
        { quantity: 1000, price: 1299 },
        { quantity: 2500, price: 2199 },
      ];
    }
  }
  // LIKES - Baratos (precio BASE para estados TOP, mínimo 399 MXN)
  else if (type === "LIKES") {
    basePackages = [
      { quantity: 100, price: 499 },  // Reducido de 665 a 499 (ciudades principales)
      { quantity: 250, price: 749 },  // Reducido de 999 a 749 (ciudades principales)
      { quantity: 500, price: 1299, popular: true },
      { quantity: 1000, price: 1999 },
      { quantity: 2500, price: 2899 },
      { quantity: 5000, price: 3799 },
    ];
  }
  // SEGUIDORES - Más caros que likes (precio BASE para estados TOP, mínimo 499 MXN)
  else if (type === "SEGUIDORES" || type === "SUSCRIPTORES" || type === "SEGUIDORES PÁGINA") {
    basePackages = [
      { quantity: 100, price: 499 },  // Reducido de 832 a 499 (ciudades principales)
      { quantity: 250, price: 899 },  // Reducido de 1299 a 899 (ciudades principales)
      { quantity: 500, price: 1599, popular: true },
      { quantity: 1000, price: 2499 },
      { quantity: 2500, price: 3299 },
      { quantity: 5000, price: 3999 },
    ];
  }
  // COMENTARIOS - Los más caros (precio mínimo 799 MXN, máximo 3999 MXN)
  else if (type === "COMENTARIOS") {
    basePackages = [
      { quantity: 25, price: 799 },
      { quantity: 50, price: 1199 },
      { quantity: 100, price: 1799 },
      { quantity: 250, price: 2699, popular: true },
      { quantity: 500, price: 3499 },
      { quantity: 1000, price: 3999 },
    ];
  }
  // VISTAS - Alto volumen (precio mínimo 499 MXN, máximo 3899 MXN)
  else if (type === "VISTAS" || type === "VISTAS HISTORIAS") {
    basePackages = [
      { quantity: 500, price: 499 },
      { quantity: 1000, price: 699 },
      { quantity: 2500, price: 1199, popular: true },
      { quantity: 5000, price: 1899 },
      { quantity: 10000, price: 2799 },
      { quantity: 25000, price: 3899 },
    ];
  }
  // REPRODUCCIONES - Alto volumen (precio mínimo 399 MXN, máximo 3499 MXN)
  else if (type === "REPRODUCCIONES") {
    basePackages = [
      { quantity: 2500, price: 399 },
      { quantity: 5000, price: 599 },
      { quantity: 10000, price: 999, popular: true },
      { quantity: 25000, price: 1599 },
      { quantity: 50000, price: 2499 },
      { quantity: 100000, price: 3499 },
    ];
  }
  // RETWEETS / SHARES - Similar a seguidores (precio mínimo 649 MXN, máximo 3999 MXN)
  else if (type === "RETWEETS" || type === "SHARES") {
    basePackages = [
      { quantity: 50, price: 649 },
      { quantity: 100, price: 999 },
      { quantity: 250, price: 1499, popular: true },
      { quantity: 500, price: 2299 },
      { quantity: 1000, price: 3299 },
      { quantity: 2500, price: 3999 },
    ];
  }
  // WATCH TIME - Servicio premium (precio mínimo 649 MXN, máximo 3999 MXN)
  else if (type === "WATCH TIME") {
    basePackages = [
      { quantity: 100, price: 649 },
      { quantity: 500, price: 1499 },
      { quantity: 1000, price: 2299, popular: true },
      { quantity: 2000, price: 3299 },
      { quantity: 4000, price: 3999 },
    ];
  }
  // SEGUIDORES PLAYLIST - Similar a seguidores pero más económico (precio mínimo 399 MXN, máximo 3499 MXN)
  else if (type === "SEGUIDORES PLAYLIST") {
    basePackages = [
      { quantity: 100, price: 399 },
      { quantity: 250, price: 699 },
      { quantity: 500, price: 1099, popular: true },
      { quantity: 1000, price: 1799 },
      { quantity: 2500, price: 2699 },
      { quantity: 5000, price: 3499 },
    ];
  }
  // DEFAULT - Precio medio (precio mínimo 599 MXN, máximo 3899 MXN)
  else {
    basePackages = [
      { quantity: 100, price: 599 },
      { quantity: 250, price: 899 },
      { quantity: 500, price: 1399, popular: true },
      { quantity: 1000, price: 2199 },
      { quantity: 2500, price: 3199 },
      { quantity: 5000, price: 3899 },
    ];
  }

  // Aplicar multiplicador de PRECIO por estado
  // Estados más importantes = precios MÁS ALTOS, Estados menos importantes = precios MÁS BAJOS
  return mexicanStates.map((state) => {
    const priceMultiplier = getStatePriceMultiplier(state);
    const adjustedPackages = basePackages.map(pkg => ({
      ...pkg,
      price: Math.round(pkg.price * priceMultiplier),
    }));

    return {
      state,
      packages: adjustedPackages,
    };
  });
};
