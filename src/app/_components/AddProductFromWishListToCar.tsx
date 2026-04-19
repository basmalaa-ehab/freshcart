"use client";

import { useCart } from "_/app/_context/CartContext";
import { AddProductToCart } from "_/app/cart/cart.actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "sonner";

interface Props {
  id: string;
  className?: string;
  children?: React.ReactNode;
  afterAddContent?: React.ReactNode;
}

export default function AddFromWishlistToCartButton({
  id,
  className,
  children,
  afterAddContent,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { updateNumberOfCartItems } = useCart();
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      if (status !== "authenticated") return;

      const token = (session?.user as any)?.token as string | undefined;
      if (!token) return;

      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
          headers: { token },
          cache: "no-store",
        });

        if (!res.ok) return;

        const payload = await res.json();
        const items = payload?.data?.products || payload?.products || [];

        if (
          Array.isArray(items) &&
          items.some(
            (item: any) =>
              item?.product?._id === id ||
              item?.productId === id ||
              item?._id === id,
          )
        ) {
          setAdded(true);
        }
      } catch (error) {
        console.log("Cart check error", error);
      }
    };

    checkCart();
  }, [status, session?.user, id]);

  const handleAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (status !== "authenticated") {
      router.push("/Login");
      return;
    }

    try {
      setLoading(true);

      const res = await AddProductToCart(id);

      if (res) {
        toast.success("Added to cart 🛒", {
          duration: 2000,
        });

        updateNumberOfCartItems(res);
        setAdded(true);
      } else {
        toast.error("Failed to add item");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (added) {
    return (
      afterAddContent || (
        <Link
          href="/cart"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
        >
          <IoMdCheckmark />
          View Cart
        </Link>
      )
    );
  }

  return (
    <button onClick={handleAdd} disabled={loading} className={className}>
      {loading ? (
        <span className="inline-flex items-center gap-2">Adding...</span>
      ) : (
        children || "Add to Cart"
      )}
    </button>
  );
}
