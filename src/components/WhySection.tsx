import { motion } from "framer-motion";
import { Zap, Shield, Headphones, Users, Star, MapPin, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "🇲🇽 Perfiles 100% Mexicanos Auténticos",
    description: "Olvídate de cuentas falsas, bots o perfiles de dudosa procedencia. Todos nuestros seguidores, likes y comentarios provienen de personas reales mexicanas, seleccionadas por estado según aspecto físico y vestimenta. ¡Crecimiento genuino garantizado!",
    featured: true
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Entrega Rápida",
    description: "Resultados inmediatos que te sorprenderán. En minutos desde tu compra, comenzamos a entregar tus seguidores, likes y engagement. No esperes días, ¡crece hoy mismo!"
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Más de 1 Millón de Clientes Satisfechos",
    description: "Únete a la comunidad de influencers, empresas y creadores que ya confían en nosotros. Precios accesibles, calidad premium y resultados comprobados desde 2017."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "100% Seguro y Confiable",
    description: "Métodos probados y seguros que no ponen en riesgo tus cuentas. Protegemos tu privacidad y garantizamos la entrega completa. Si hay algún problema, lo resolvemos inmediatamente."
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Soporte Experto 24/7",
    description: "Equipo profesional mexicano disponible todos los días, todo el tiempo. Chat en vivo, WhatsApp y email. Resolvemos tus dudas en minutos, no en horas."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Impulsa tu Crecimiento Orgánico",
    description: "Cuando tienes más seguidores y engagement, el algoritmo te favorece. Atrae audiencia real, aumenta tu visibilidad y conviértete en referente de tu nicho. ¡El éxito llama al éxito!"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Resultados Medibles y Reales",
    description: "Seguimiento en tiempo real de tu orden. Ve crecer tus números minuto a minuto con reportes detallados. Sin trucos, sin engaños: lo que compras es exactamente lo que recibes."
  },
];

export const WhySection = () => {
  return (
    <section id="why-section" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            AlphaTape es <span className="gradient-text">Líder del Mercado</span> desde 2017
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Confiado por millones de clientes en todo México para servicios de crecimiento en redes sociales confiables, rápidos y de alta calidad.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-card border rounded-xl p-6 transition-all duration-300 group ${
                feature.featured 
                  ? "md:col-span-2 lg:col-span-3 border-primary border-2 shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-primary/10" 
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                feature.featured
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              }`}>
                {feature.icon}
              </div>
              <h3 className={`font-heading font-bold mb-3 ${
                feature.featured ? "text-2xl md:text-3xl" : "text-xl"
              }`}>{feature.title}</h3>
              <p className={`text-muted-foreground leading-relaxed ${
                feature.featured ? "text-base md:text-lg max-w-4xl" : "text-sm"
              }`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
