import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {

      const existing = prev.find(
        (item) => item.productId._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.productId._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { productId: product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productId._id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};