/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage"

const ProductsContext = createContext();

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useLocalStorage("products", []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}