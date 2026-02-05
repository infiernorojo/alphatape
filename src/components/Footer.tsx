import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  Linkedin,
  Music2
} from "lucide-react";
import { useServiceModal } from "@/contexts/ServiceModalContext";
import logoImage from "@/assets/logo.png";

// Mapeo de textos del footer a tipos de servicio
const linkToServiceType: { [key: string]: { platform: string; type: string } } = {
  // Instagram
  "Paquetes Instagram Empresas": { platform: "Instagram", type: "SEGUIDORES" },
  "Seguidores Instagram": { platform: "Instagram", type: "SEGUIDORES" },
  "Likes Instagram": { platform: "Instagram", type: "LIKES" },
  "Vistas Instagram": { platform: "Instagram", type: "VISTAS" },
  "Comentarios Instagram": { platform: "Instagram", type: "COMENTARIOS" },
  "Vistas de Historias": { platform: "Instagram", type: "VISTAS HISTORIAS" },
  "Likes Instagram Gratis": { platform: "Instagram", type: "LIKES" },
  
  // YouTube
  "Suscriptores YouTube": { platform: "YouTube", type: "SUSCRIPTORES" },
  "Vistas YouTube": { platform: "YouTube", type: "VISTAS" },
  "Likes YouTube": { platform: "YouTube", type: "LIKES" },
  "Dislikes YouTube": { platform: "YouTube", type: "LIKES" },
  "Comentarios YouTube": { platform: "YouTube", type: "COMENTARIOS" },
  "Watch Time YouTube": { platform: "YouTube", type: "WATCH TIME" },
  "Vistas en Vivo YouTube": { platform: "YouTube", type: "VISTAS EN VIVO" },
  
  // TikTok
  "Seguidores TikTok": { platform: "TikTok", type: "SEGUIDORES" },
  "Likes TikTok": { platform: "TikTok", type: "LIKES" },
  "Vistas TikTok": { platform: "TikTok", type: "VISTAS" },
  
  // Facebook
  "Likes de Página Facebook": { platform: "Facebook", type: "LIKES PÁGINA" },
  "Likes Facebook": { platform: "Facebook", type: "LIKES" },
  "Shares Facebook": { platform: "Facebook", type: "SHARES" },
  "Seguidores Facebook": { platform: "Facebook", type: "SEGUIDORES PÁGINA" },
  "Vistas Facebook": { platform: "Facebook", type: "VISTAS" },
  
  // Twitter
  "Seguidores Twitter": { platform: "Twitter", type: "SEGUIDORES" },
  "Likes Twitter": { platform: "Twitter", type: "LIKES" },
  "Retweets Twitter": { platform: "Twitter", type: "RETWEETS" },
  "Votos Twitter": { platform: "Twitter", type: "VOTOS" },
  "Vistas Twitter": { platform: "Twitter", type: "VISTAS" },
  
  // Spotify
  "Seguidores Spotify": { platform: "Spotify", type: "SEGUIDORES" },
  "Seguidores Playlist": { platform: "Spotify", type: "SEGUIDORES PLAYLIST" },
  "Reproducciones Spotify": { platform: "Spotify", type: "REPRODUCCIONES" },
};

const footerLinks = {
  Instagram: [
    "Paquetes Instagram Empresas",
    "Seguidores Instagram", 
    "Likes Instagram",
    "Vistas Instagram",
    "Comentarios Instagram",
    "Vistas de Historias",
    "Likes Instagram Gratis"
  ],
  YouTube: [
    "Suscriptores YouTube",
    "Vistas YouTube",
    "Likes YouTube",
    "Dislikes YouTube",
    "Comentarios YouTube",
    "Watch Time YouTube",
    "Vistas en Vivo YouTube"
  ],
  TikTok: [
    "Seguidores TikTok",
    "Likes TikTok",
    "Vistas TikTok"
  ],
  Facebook: [
    "Likes de Página Facebook",
    "Likes Facebook",
    "Shares Facebook",
    "Seguidores Facebook",
    "Vistas Facebook"
  ],
  Twitter: [
    "Seguidores Twitter",
    "Likes Twitter",
    "Retweets Twitter",
    "Votos Twitter",
    "Vistas Twitter"
  ],
  Spotify: [
    "Seguidores Spotify",
    "Seguidores Playlist",
    "Reproducciones Spotify"
  ]
};

export const Footer = () => {
  const { openServiceModal } = useServiceModal();

  const handleLinkClick = (linkText: string) => {
    const service = linkToServiceType[linkText];
    if (service) {
      openServiceModal(service.platform, service.type);
      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {Object.entries(footerLinks).map(([platform, links]) => (
            <div key={platform}>
              <h4 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                {platform === "Instagram" && <Instagram className="w-4 h-4 text-primary" />}
                {platform === "YouTube" && <Youtube className="w-4 h-4 text-primary" />}
                {platform === "Twitter" && <Twitter className="w-4 h-4 text-primary" />}
                {platform === "Facebook" && <Facebook className="w-4 h-4 text-primary" />}
                {platform === "TikTok" && <span className="text-primary">♪</span>}
                {platform === "Spotify" && <Music2 className="w-4 h-4 text-primary" />}
                {platform}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative overflow-hidden rounded-full">
              <img 
                src={logoImage} 
                alt="Social Mexico Logo" 
                className="absolute w-full h-full object-cover scale-[1.6]"
                style={{ objectPosition: 'center' }}
              />
            </div>
            <span className="font-heading font-bold text-lg">
              Social<span className="text-primary">Mexico</span>
            </span>
          </div>

          <p className="text-muted-foreground text-sm">
            © 2017 - 2026 AlphaTape. Todos los Derechos Reservados.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
