import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ServiceModalContextType {
  openServiceModal: (platform: string, type: string) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  currentService: { platform: string; type: string } | null;
}

const ServiceModalContext = createContext<ServiceModalContextType | undefined>(undefined);

export const ServiceModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<{ platform: string; type: string } | null>(null);

  const openServiceModal = (platform: string, type: string) => {
    setCurrentService({ platform, type });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentService(null);
  };

  return (
    <ServiceModalContext.Provider value={{ openServiceModal, isModalOpen, closeModal, currentService }}>
      {children}
    </ServiceModalContext.Provider>
  );
};

export const useServiceModal = () => {
  const context = useContext(ServiceModalContext);
  if (!context) {
    throw new Error('useServiceModal must be used within a ServiceModalProvider');
  }
  return context;
};

