import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "mejores-horarios-publicar-instagram-tiktok-mexico",
    title: "Mejores Horarios para Publicar en Instagram y TikTok en México 2026",
    excerpt: "Descubre los mejores horarios para publicar en Instagram y TikTok en México. Aumenta tu engagement con estos datos basados en estudios de 2024.",
    date: "2026-02-05",
    readTime: "5 min",
    category: "Estrategia",
  },
  {
    id: 2,
    slug: "como-crecer-instagram-rapido",
    title: "Cómo Crecer en Instagram Rápido: Estrategias que Funcionan en 2026",
    excerpt: "Aprende estrategias probadas para crecer en Instagram rápido en 2024. Tips de contenido, hashtags y engagement para mexicanos.",
    date: "2026-02-05",
    readTime: "7 min",
    category: "Crecimiento",
  },
  {
    id: 3,
    slug: "comprar-seguidores-instagram-mexico",
    title: "Comprar Seguidores Instagram México: Lo que Debes Saber",
    excerpt: "Todo lo que necesitas saber antes de comprar seguidores en Instagram en México. Diferencias entre seguidores reales vs bots.",
    date: "2026-02-05",
    readTime: "6 min",
    category: "Guía",
  },
  {
    id: 4,
    slug: "seo-tiktok-mexico-2024",
    title: "SEO en TikTok México 2026: Cómo Aparecer en los Resultados de Búsqueda",
    excerpt: "Aprende técnicas de SEO para TikTok específicas para el mercado mexicano. Optimiza tu perfil, hashtags y contenido para aparecer en búsquedas.",
    date: "2026-02-05",
    readTime: "8 min",
    category: "SEO",
  },
  {
    id: 5,
    slug: "linkedin-negocios-mexico",
    title: "LinkedIn para Negocios en México: Estrategia Completa 2026",
    excerpt: "Guía completa para usar LinkedIn como herramienta de ventas B2B en México. Optimización de perfil, prospección y contenido profesional.",
    date: "2026-02-05",
    readTime: "10 min",
    category: "B2B",
  },
  {
    id: 6,
    slug: "youtube-shorts-mexico-crecimiento",
    title: "YouTube Shorts México: Cómo Viralizar en 60 Segundos",
    excerpt: "Estrategias probadas para crecer en YouTube Shorts en México. Formatos virales, optimización y monetización para creadores mexicanos.",
    date: "2026-02-05",
    readTime: "7 min",
    category: "Video",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Blog de <span className="gradient-text">AlphaTape</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estrategias, tips y guías para crecer en redes sociales en México
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors group"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    
                    <h2 className="font-heading text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Leer más <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <h3 className="font-heading text-2xl font-bold mb-4">
              ¿Listo para crecer en redes sociales?
            </h3>
            <p className="text-muted-foreground mb-6">
              Descubre nuestros servicios diseñados para impulsar tu presencia online
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Ver Servicios <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
