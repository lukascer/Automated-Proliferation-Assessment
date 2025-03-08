import React, { createContext, useContext, useState } from 'react';

// Create the context
const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);

  return <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>{children}</SidebarContext.Provider>;
};

// Custom hook for easier consumption of the context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export default SidebarProvider;
