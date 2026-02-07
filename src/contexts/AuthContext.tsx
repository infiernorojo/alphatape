import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    platform: string;
    type: string;
    state: string;
    quantity: number;
    price: number;
    targetUrl?: string;
  }[];
  totalPrice: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  paymentMethod: "card" | "crypto";
  paymentDetails?: {
    cryptoSymbol?: string;
    networkName?: string;
  };
  createdAt: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "userId" | "createdAt">) => string;
  getOrderById: (orderId: string) => Order | undefined;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Cargar usuario y órdenes del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("alphatape_user");
    const storedOrders = localStorage.getItem("alphatape_orders");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem("alphatape_users") || "[]");
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("alphatape_user", JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const users = JSON.parse(localStorage.getItem("alphatape_users") || "[]");
    
    // Verificar si el email ya existe
    if (users.some((u: User) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: "user_" + Date.now(),
      email,
      name,
      password, // En producción esto estaría hasheado
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem("alphatape_users", JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("alphatape_user", JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("alphatape_user");
  };

  const addOrder = (orderData: Omit<Order, "id" | "userId" | "createdAt">): string => {
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Date.now().toString(36).toUpperCase(),
      userId: user?.id || "guest",
      createdAt: new Date().toISOString(),
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("alphatape_orders", JSON.stringify(updatedOrders));
    
    return newOrder.id;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((order) => order.id === orderId);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("alphatape_user", JSON.stringify(updatedUser));
      
      // Actualizar también en la lista de usuarios
      const users = JSON.parse(localStorage.getItem("alphatape_users") || "[]");
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? { ...u, ...updates } : u
      );
      localStorage.setItem("alphatape_users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        orders,
        addOrder,
        getOrderById,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
