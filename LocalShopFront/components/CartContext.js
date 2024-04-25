import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartReset, setIsCartReset] = useState(false);

  useEffect(() => {
    if (cartProducts?.length > 0 && !isCartReset) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts, isCartReset]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
    setIsCartReset(false);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        const updatedCart = prev.filter((value, index) => index !== pos);
        ls?.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prev;
    });
    setIsCartReset(false);
  }

  function clearCart() {
    setCartProducts([]);
    setIsCartReset(true);
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
