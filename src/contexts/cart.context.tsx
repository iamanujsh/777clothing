import { createContext, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

interface Products {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

const addCartItem = (cartItems: [], productToAdd: Products) => {
  const exisitingCartItem = cartItems.find(
    (cartItem: CartItem) => cartItem.id === productToAdd.id
  );

  if (exisitingCartItem) {
    return cartItems.map((cartItem: CartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementItem = (cartItems: [], productToDecrement: Products) => {
  const exisitingCartItem = cartItems.find(
    (cartItem: CartItem) => cartItem.id === productToDecrement.id
  );
  if (exisitingCartItem.quantity === 1) {
    return cartItems.filter(
      (cartItem: CartItem) => cartItem.id !== productToDecrement.id
    );
  }

  return cartItems.map((cartItem: CartItem) =>
    cartItem.id === productToDecrement.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const removeItemFromCart = (cartItems: [], productToRemove: Products) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  cartItem: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItem, setCartItem] = useState([]);

  const addItemToCart = (productToAdd: Products) => {
    setCartItem(addCartItem(cartItem, productToAdd));
  };

  const removeItemToCart = (productToDecrease: Products) => {
    setCartItem(decrementItem(cartItem, productToDecrease));
  };

  const deleteItemFromCart = (productToDelete: Products) => {
    setCartItem(removeItemFromCart(cartItem, productToDelete));
  };

  const value = {
    addItemToCart,
    cartItem,
    removeItemToCart,
    deleteItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
