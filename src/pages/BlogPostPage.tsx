import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  content: JSX.Element;
};

const posts: Record<string, BlogPost> = {
  "mejores-horarios-publicar-instagram-tiktok-mexico": {
    slug: "mejores-horarios-publicar-instagram-tiktok-mexico",
    title: "Mejores Horarios para Publicar en Instagram y TikTok en México 2026",
    excerpt:
      "Descubre los mejores horarios para publicar en Instagram y TikTok en México y aumenta tu engagement con datos prácticos.",
    date: "2026-02-05",
    readTime: "5 min",
    category: "Estrategia",
    keywords: [
      "mejores horarios publicar instagram mexico",
      "horarios optimos tiktok mexico",
      "cuando publicar en instagram",
      "engagement instagram mexico",
    ],
    content: (
      <>
        <p>
          ¿Te has preguntado por qué algunas publicaciones despegan y otras pasan desapercibidas?
          Una de las palancas más simples (y subestimadas) es el <strong>horario de publicación</strong>.
        </p>

        <h2>Horarios recomendados (México)</h2>
        <ul>
          <li>
            <strong>Instagram:</strong> 12:00 – 15:00 (ideal para Reels e Historias)
          </li>
          <li>
            <strong>TikTok:</strong> 15:00 – 18:00 (tarde, cuando el consumo sube)
          </li>
        </ul>

        <h2>Días que suelen rendir mejor</h2>
        <ul>
          <li>
            <strong>Instagram:</strong> martes, miércoles y jueves
          </li>
          <li>
            <strong>TikTok:</strong> martes y miércoles
          </li>
        </ul>

        <h2>Tip rápido (zonas horarias en México)</h2>
        <p>
          México tiene varias zonas horarias. Si tu audiencia está mezclada, toma como base la hora
          del centro (CDMX) y revisa tus estadísticas para ajustar.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            ¿Quieres acelerar tu crecimiento? En <strong>AlphaTape</strong> te ayudamos a impulsar tu presencia
            en redes con paquetes prácticos.
          </p>
          <Link to="/" className="mt-2 inline-flex text-sm font-medium text-primary hover:underline">
            Ver servicios
          </Link>
        </div>
      </>
    ),
  },

  "como-crecer-instagram-rapido": {
    slug: "como-crecer-instagram-rapido",
    title: "Cómo Crecer en Instagram Rápido: Estrategias que Funcionan en 2026",
    excerpt:
      "Estrategias claras para crecer en Instagram: perfil, contenido, consistencia y análisis. Adaptado a México.",
    date: "2026-02-05",
    readTime: "7 min",
    category: "Crecimiento",
    keywords: [
      "como crecer en instagram rapido",
      "estrategias instagram 2024",
      "reels mexico",
      "hashtags instagram mexico",
    ],
    content: (
      <>
        <p>
          Crecer en Instagram en 2024 requiere <strong>estrategia + consistencia</strong>. Aquí tienes una guía
          simple para generar tracción.
        </p>

        <h2>1) Optimiza tu perfil</h2>
        <ul>
          <li>Foto clara (logo o rostro profesional)</li>
          <li>Bio: qué haces + para quién + beneficio</li>
          <li>Link en bio con tu oferta principal</li>
          <li>Destacados organizados</li>
        </ul>

        <h2>2) Enfócate en formatos que empujan alcance</h2>
        <ul>
          <li>
            <strong>Reels:</strong> 15–30s, edición rápida, audio en tendencia
          </li>
          <li>
            <strong>Carruseles:</strong> 5–10 slides con tips accionables
          </li>
          <li>
            <strong>Historias:</strong> diario (stickers, encuestas, preguntas)
          </li>
        </ul>

        <h2>3) Consistencia sugerida</h2>
        <ul>
          <li>Reels: 4–7 por semana</li>
          <li>Feed: 3–4 por semana</li>
          <li>Historias: diario</li>
        </ul>

        <h2>4) Mide y ajusta</h2>
        <p>
          Revisa Insights: alcance por formato, retención en Reels, y horarios de audiencia.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Si necesitas empuje inicial (prueba social), en AlphaTape tenemos paquetes para impulsar tu cuenta.
          </p>
          <Link to="/" className="mt-2 inline-flex text-sm font-medium text-primary hover:underline">
            Ver servicios
          </Link>
        </div>
      </>
    ),
  },

  "comprar-seguidores-instagram-mexico": {
    slug: "comprar-seguidores-instagram-mexico",
    title: "Comprar Seguidores Instagram México: Lo que Debes Saber",
    excerpt:
      "Guía para comprar seguidores de forma segura: diferencias entre bots y seguidores reales, y cómo evitar riesgos.",
    date: "2026-02-05",
    readTime: "6 min",
    category: "Guía",
    keywords: [
      "comprar seguidores instagram mexico",
      "seguidores reales vs bots",
      "comprar seguidores seguros",
      "seguidores instagram mexicanos",
    ],
    content: (
      <>
        <p>
          Comprar seguidores es común, pero el riesgo aparece cuando se usan servicios de baja calidad.
          La clave es evitar entregas masivas irreales y perfiles falsos.
        </p>

        <h2>Seguidores reales vs bots</h2>
        <ul>
          <li>
            <strong>Bots (evitar):</strong> perfiles sin foto, sin publicaciones, sin actividad.
          </li>
          <li>
            <strong>Reales (mejor):</strong> perfiles completos y con actividad (mejor para estabilidad).
          </li>
        </ul>

        <h2>Por qué elegir seguidores mexicanos</h2>
        <ul>
          <li>Mejor afinidad cultural y de idioma</li>
          <li>Mayor probabilidad de interacción real</li>
          <li>Horarios alineados (zona horaria)</li>
        </ul>

        <h2>Checklist para elegir un proveedor</h2>
        <ul>
          <li>Entrega progresiva</li>
          <li>Soporte claro</li>
          <li>Política de reposición</li>
          <li>Transparencia en lo que incluye</li>
        </ul>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            En AlphaTape trabajamos con entrega progresiva y soporte en español.
          </p>
          <Link to="/" className="mt-2 inline-flex text-sm font-medium text-primary hover:underline">
            Ver planes
          </Link>
        </div>
      </>
    ),
  },

  // Artículo 4: SEO para TikTok
  "seo-tiktok-mexico-2024": {
    slug: "seo-tiktok-mexico-2024",
    title: "SEO en TikTok México 2026: Cómo Aparecer en los Resultados de Búsqueda",
    excerpt:
      "Aprende técnicas de SEO para TikTok específicas para el mercado mexicano. Optimiza tu perfil, hashtags y contenido para aparecer en búsquedas.",
    date: "2026-02-05",
    readTime: "8 min",
    category: "SEO",
    keywords: [
      "seo tiktok mexico",
      "optimizar perfil tiktok",
      "hashtags tiktok mexico",
      "aparecer en busquedas tiktok",
    ],
    content: (
      <>
        <p>
          El SEO en TikTok ha evolucionado drásticamente. Ya no se trata solo de hashtags, sino de un ecosistema completo de señales que la plataforma evalúa para posicionar tu contenido.
        </p>

        <h2>1. Optimización del Perfil para SEO</h2>
        <p>Tu perfil es tu tarjeta de presentación:</p>
        <ul>
          <li><strong>Nombre de usuario:</strong> Incluye tu nicho o keyword principal si es posible</li>
          <li><strong>Nombre visible:</strong> Usa palabras clave relevantes (@marketingmexico)</li>
          <li><strong>Bio:</strong> Primera línea debe tener tu propuesta de valor + keywords</li>
          <li><strong>Enlace:</strong> Usa Linktree o similar para múltiples CTAs</li>
        </ul>

        <h2>2. SEO en el Contenido (Caption + Audio)</h2>
        <p>El algoritmo de TikTok analiza:</p>
        <ul>
          <li>Texto en pantalla (OCR)</li>
          <li>Audio/habla (transcripción automática)</li>
          <li>Hashtags en descripción</li>
          <li>Sonidos populares vs. sonidos originales</li>
        </ul>

        <h2>3. Keywords de Cola Larga para México</h2>
        <p>En lugar de #marketing, usa:</p>
        <ul>
          <li>#marketingdigitalmexico</li>
          <li>#emprendedoresmexicanos2024</li>
          <li>#crecerentiktokmexico</li>
          <li>#negociosmexico</li>
        </ul>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Tip profesional:</strong> El primer frame de tu video debe mostrar texto grande con tu keyword principal. TikTok hace OCR de las imágenes.
          </p>
        </div>
      </>
    ),
  },

  // Artículo 5: LinkedIn para negocios
  "linkedin-negocios-mexico": {
    slug: "linkedin-negocios-mexico",
    title: "LinkedIn para Negocios en México: Estrategia Completa 2026",
    excerpt:
      "Guía completa para usar LinkedIn como herramienta de ventas B2B en México. Optimización de perfil, prospección y contenido profesional.",
    date: "2026-02-05",
    readTime: "10 min",
    category: "B2B",
    keywords: [
      "linkedin negocios mexico",
      "ventas b2b linkedin",
      "perfil linkedin empresas",
      "prospeccion linkedin mexico",
    ],
    content: (
      <>
        <p>
          LinkedIn es la red social más subestimada en México para ventas B2B. Mientras todos pelean por la atención en Instagram, aquí puedes contactar directamente a CEOs y directores.
        </p>

        <h2>1. Perfil Optimizado para Ventas (No para CV)</h2>
        <p>Transforma tu perfil de currículum a landing page de ventas:</p>
        <ul>
          <li><strong>Headline:</strong> "Ayudo a [target] a [resultado] mediante [método]"</li>
          <li><strong>Banner:</strong> Incluye CTA claro y propuesta de valor</li>
          <li><strong>Featured:</strong> Pon tus mejores posts o lead magnets</li>
          <li><strong>About:</strong> Estructura PAS (Problem-Agitation-Solution)</li>
        </ul>

        <h2>2. Estrategia de Contenido para el Mercado Mexicano</h2>
        <p>Los mexicanos en LinkedIn buscan:</p>
        <ul>
          <li>Casos de éxito locales (no genéricos de USA)</li>
          <li>Tendencias del mercado mexicano</li>
          <li>Historias de emprendedores mexicanos</li>
          <li>Contenido educativo práctico (no teórico)</li>
        </ul>

        <h2>3. Prospección Activa (Sin ser Spam)</h2>
        <p>El método que funciona en México:</p>
        <ol>
          <li>Conecta con nota personalizada (menciona algo específico de su perfil)</li>
          <li>Espera 3-5 días antes de enviar mensaje</li>
          <li>Primer mensaje: valor puro (sin pitch)</li>
          <li>Segundo mensaje: pregunta abierta sobre su negocio</li>
          <li>Tercer mensaje: propuesta suave o invitación a llamada</li>
        </ol>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            Los mejores horarios para publicar en LinkedIn México: <strong>8:00-10:00 AM y 6:00-8:00 PM</strong> (horario de la Ciudad de México).
          </p>
        </div>
      </>
    ),
  },

  // Artículo 6: YouTube Shorts
  "youtube-shorts-mexico-crecimiento": {
    slug: "youtube-shorts-mexico-crecimiento",
    title: "YouTube Shorts México: Cómo Viralizar en 60 Segundos",
    excerpt:
      "Estrategias probadas para crecer en YouTube Shorts en México. Formatos virales, optimización y monetización para creadores mexicanos.",
    date: "2026-02-05",
    readTime: "7 min",
    category: "Video",
    keywords: [
      "youtube shorts mexico",
      "viralizar youtube shorts",
      "monetizacion youtube mexico",
      "crear shorts virales",
    ],
    content: (
      <>
        <p>
          YouTube Shorts es la oportunidad de oro para creadores mexicanos en 2024. La competencia es menor que en TikTok y la monetización es más estable.
        </p>

        <h2>1. Formato Viral de YouTube Shorts</h2>
        <p>El patrón que funciona una y otra vez:</p>
        <ul>
          <li><strong>Hook (0-3s):</strong> "Esto me costó $50,000 aprenderlo" / "Nunca hagas esto..."</li>
          <li><strong>Valor (3-45s):</strong> Entrega el contenido principal rápidamente</li>
          <li><strong>CTA (45-60s):</strong> Suscríbete para más / Comenta si quieres parte 2</li>
        </ul>

        <h2>2. Títulos que Funcionan en México</h2>
        <p>Usa estos patrones:</p>
        <ul>
          <li>"Como [resultado] en [tiempo] sin [obstáculo]"</li>
          <li>"El error #1 que cometen los [target]"</li>
          <li>"Tutorial: [tarea] paso a paso"</li>
          <li>"La verdad sobre [tema controversial]"</li>
        </ul>

        <h2>3. Requisitos de Monetización en México</h2>
        <p>Para unirte al Programa de Socios de YouTube:</p>
        <ul>
          <li>1,000 suscriptores</li>
          <li>4,000 horas de visualización (contenido largo) O 10 millones de vistas Shorts en 90 días</li>
          <li>Cuenta de AdSense vinculada</li>
          <li>Sin strikes de copyright activos</li>
        </ul>

        <h2>4. Cross-posting: Shorts a TikTok e Instagram</h2>
        <p>Maximiza tu contenido:</p>
        <ul>
          <li>Sube primero a YouTube (porque tiene mejor SEO)</li>
          <li>Descarga y republica en TikTok (quita watermark primero)</li>
          <li>Adapta a Reels con música trending</li>
          <li>Usa el mismo audio viral en todas las plataformas</li>
        </ul>

        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Dato clave:</strong> Los Shorts con <em>"Capítulo 1"</em> en el título tienen 3x más probabilidades de generar suscripciones porque crean expectativa de serie.
          </p>
          <Link to="/" className="mt-2 inline-flex text-sm font-medium text-primary hover:underline">
            Impulsa tu canal con nuestros servicios
          </Link>
        </div>
      </>
    ),
  },
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Volver al blog
            </Link>
            <h1 className="mt-6 font-heading text-3xl font-bold">Artículo no encontrado</h1>
            <p className="mt-2 text-muted-foreground">El enlace puede estar mal o el artículo aún no está publicado.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </Link>

          <motion.header
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="mt-3 font-heading text-3xl md:text-4xl font-bold leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-muted-foreground">{post.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.keywords.slice(0, 6).map((k) => (
                <span
                  key={k}
                  className="text-[11px] px-2 py-1 rounded-full bg-muted border border-border text-muted-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </motion.header>

          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="prose prose-invert max-w-none mt-8 prose-headings:font-heading prose-a:text-primary"
          >
            {post.content}
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
