"use client";
// for  Sidebar, theme, modals
import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState(null);

  return (
    <UIContext.Provider value={{ sidebarOpen, setSidebarOpen, modal, setModal }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
