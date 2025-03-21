"use client";

import { createContext, useContext, useState } from "react";

interface NavigationContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  openGroups: string[];
  setOpenGroups: (groups: string[]) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  return (
    <NavigationContext.Provider value={{ 
      isMenuOpen, 
      setIsMenuOpen,
      openGroups,
      setOpenGroups
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
