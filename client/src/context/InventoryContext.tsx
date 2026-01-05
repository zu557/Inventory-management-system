"use client";

import { createContext, useContext, useState, useEffect } from "react";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

  // load inventory on first load
//   useEffect(() => {
//     async function loadData() {
//       const res = await fetch("/api/inventory");
//       const data = await res.json();
//       setProducts(data.products);
//       setCategories(data.categories);
//     }
//     loadData();
//   }, []);

  return (
    <InventoryContext.Provider value={{}}
    //   value={{ products, setProducts, categories, setCategories }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}
