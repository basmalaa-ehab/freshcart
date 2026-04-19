"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

import { ProductType, WishlistResponse } from "_/api/services/types";


type WishlistContextType = {
  wishlistItems: ProductType[];
  setWishlistItems: React.Dispatch<React.SetStateAction<ProductType[]>>;
  numOfWishlistItems: number;
  setNumOfWishlistItems: React.Dispatch<React.SetStateAction<number>>;
  isInWishlist: (id: string) => boolean;
  refreshWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistProvider({
  children,
  res,
}: {
  children: ReactNode;
  res?: WishlistResponse;
}) {
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>(
    res?.data || [],
  );

  const { data: session, status } = useSession();

  const [numOfWishlistItems, setNumOfWishlistItems] = useState<number>(
    res?.data?.length || 0,
  );

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item._id === id);
  };

  const refreshWishlist = async () => {
    if (status !== "authenticated") {
      return;
    }

    const token = (session?.user as any)?.token as string | undefined;
    if (!token) {
      return;
    }

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "GET",
          headers: { token },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const finalRes = await res.json();
      const data = finalRes?.data || [];

      if (Array.isArray(data)) {
        setWishlistItems(data);
        setNumOfWishlistItems(data.length);
      }
    } catch (err) {
      console.log("Wishlist refresh error:", err);
    }
  };

  useEffect(() => {
    if (!res) {
      refreshWishlist();
    }
  }, [res, status, session?.user]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        setWishlistItems,

        numOfWishlistItems,
        setNumOfWishlistItems,

        isInWishlist,

        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("Wishlist error. Please refresh the page or contact support.");
  }

  return context;
}
