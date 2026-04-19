"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

async function addProductToWishlist(id: string, token: string) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      token,
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  if (!res.ok) {
    throw new Error("Failed to add to wishlist");
  }

  const finalRes = await res.json();
  return finalRes.data;
}

async function deleteProductFromWishlist(id: string, token: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: { token },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to delete from wishlist");
  }

  const finalRes = await res.json();
  return finalRes;
}

import { useWishlist } from "_/app/_context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
  id: string;
  className?: string;
  activeClassName?: string;
  children?: ReactNode;
  afterAddContent?: ReactNode;
}

export default function AddToWishlistButton({
  id,
  className,
  activeClassName,
  children,
  afterAddContent,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { wishlistItems, setWishlistItems, setNumOfWishlistItems } = useWishlist();

  const [loading, setLoading] = useState(false);

  const isInWishlist = wishlistItems?.some(
    (item: any) => item._id === id
  );

  async function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (status !== "authenticated") {
      router.push("/Login");
      return;
    }

    try {
      setLoading(true);

      let res;

      const token = (session?.user as any)?.token as string | undefined;
      if (!token) {
        throw new Error("No auth token available");
      }

      if (isInWishlist) {
        res = await deleteProductFromWishlist(id, token);

        const updatedWishlist = wishlistItems.filter(
          (item: any) => item._id !== id,
        );

        setWishlistItems(updatedWishlist);
        setNumOfWishlistItems(updatedWishlist.length);

        toast.success("Removed from wishlist");
      } else {
        res = await addProductToWishlist(id, token);

        const updatedWishlist = [...wishlistItems, { _id: id } as any];

        setWishlistItems(updatedWishlist);
        setNumOfWishlistItems(updatedWishlist.length);

        toast.success("Added to wishlist ");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const buttonContent = isInWishlist ? (
    afterAddContent ?? <FaHeart className="text-red-500" />
  ) : (
    children ?? <FaRegHeart />
  );

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={isInWishlist ? activeClassName ?? className : className}
    >
      {buttonContent}
    </button>
  );
}