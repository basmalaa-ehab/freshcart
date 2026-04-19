"use client";
import { useCart } from "_/app/_context/CartContext";
import { AddProductToCart } from "_/app/cart/cart.actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  id: string;
  children: React.ReactNode;
  afterAddContent?: React.ReactNode;
  resetTime?: number;
  className: string;
}

export default function AddToCartButton({
  className,
  id,
  children,
  afterAddContent,
  resetTime = 3000,
}: AddToCartButtonProps) {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const { updateNumberOfCartItems } = useCart();

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (session.status === "loading") {
      // Wait for session to load
      return;
    }

    if (session.status !== "authenticated") {
      router.push("/Login");
      return;
    }

    setLoading(true);

    try {
      const newItemsCont = await AddProductToCart(id);

      if (newItemsCont !== false && newItemsCont !== null) {
        toast.success("Added to cart 🛒", {
          duration: 2500,
          position: "top-right",
          className:
            "bg-white border border-green-200 text-green-700 shadow-lg px-4 py-3 rounded-xl font-medium",
        });
        updateNumberOfCartItems(newItemsCont);
        setClicked(true);

        if (resetTime > 0) {
          setTimeout(() => {
            setClicked(false);
          }, resetTime);
        }
      } else {
        toast.error("Failed to add item to cart", {
          duration: 3000,
          position: "top-right",
          className:
            "bg-white border border-red-200 text-red-600 shadow-lg px-4 py-3 rounded-xl font-medium",
        });
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
      toast.error("Failed to add item to cart", {
        duration: 3000,
        position: "top-right",
        className:
          "bg-white border border-red-200 text-red-600 shadow-lg px-4 py-3 rounded-xl font-medium",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || session.status === "loading"}
      className={className}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
      ) : clicked ? (
        afterAddContent || children
      ) : (
        children
      )}
    </button>
  );
}
