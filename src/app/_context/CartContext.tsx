"use client";

import { cartResponse } from "_/api/services/types";
import { ReactNode, createContext, useContext, useState } from "react";

type CartContextType = {
  numOfCartItems: number;
  cart?: cartResponse;
  updateNumberOfCartItems: (num: number) => void | undefined;
};

export const CartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  cart: undefined,
  updateNumberOfCartItems() {},
});

export default function CartContextProvider({
  children,
  res,
}: {
  children: ReactNode;
  res: cartResponse | undefined;
}) {
  const [numOfCartItems, setnumOfCartItems] = useState(() => {
    return res === undefined ? 0 : (res as cartResponse).products.length;
  });

  function updateNumberOfCartItems(num: number) {
    setnumOfCartItems(num);
  }

  return (
    <CartContext.Provider
      value={{ numOfCartItems, cart: res, updateNumberOfCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hoooks

export function useCart() {
  const res = useContext(CartContext);
  if (!res) {
    throw new Error("Cannot use cart context outside it's context");
  }

  return res;
}
