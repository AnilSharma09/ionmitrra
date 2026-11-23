import { createContext, useContext, useMemo } from "react";
import useCart from "../hooks/useCart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  
  const itemCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const value = {
    cart,
    itemCount,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used inside <CartProvider>");
  }
  return context;
}