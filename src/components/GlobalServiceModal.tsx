import { ProductModal } from "./ProductModal";
import { useServiceModal } from "@/contexts/ServiceModalContext";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  Music
} from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const getIconForPlatform = (platform: string) => {
  const iconMap: { [key: string]: JSX.Element } = {
    Instagram: <Instagram className="w-full h-full" />,
    YouTube: <Youtube className="w-full h-full" />,
    TikTok: <TikTokIcon />,
    Facebook: <Facebook className="w-full h-full" />,
    Twitter: <Twitter className="w-full h-full" />,
    Spotify: <SpotifyIcon />,
  };
  return iconMap[platform] || <Instagram className="w-full h-full" />;
};

export const GlobalServiceModal = () => {
  const { isModalOpen, closeModal, currentService } = useServiceModal();

  if (!currentService) return null;

  return (
    <ProductModal
      isOpen={isModalOpen}
      onClose={closeModal}
      platform={currentService.platform}
      type={currentService.type}
      icon={getIconForPlatform(currentService.platform)}
    />
  );
};

