"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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

// shadcn ui
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "_/components/ui/alert-dialog";

export default function RemoveFromWishlistButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  async function handleRemoveElement() {
    try {
      setLoading(true);

      if (status !== "authenticated") {
        toast.error("Please login first");
        return;
      }

      const token = (session?.user as any)?.token as string | undefined;
      if (!token) {
        throw new Error("login again");
      }

      await deleteProductFromWishlist(id, token);
      toast.success("Removed from wishlist");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
      >
        <FaTrash />
      </button>

      {/* shadcn confirm dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <FaTrash />
            </AlertDialogMedia>

            <AlertDialogTitle>Remove item?</AlertDialogTitle>

            <AlertDialogDescription>
              This item will be permanently removed from your Wishlist.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              className="cursor-pointer"
              onClick={handleRemoveElement}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
