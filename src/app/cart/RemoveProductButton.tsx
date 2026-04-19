"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import { useCart } from "../_context/CartContext";
import { deleteElementFromCart } from "./cart.actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle
} from "_/components/ui/alert-dialog";

export default function RemoveProductButton({ id }: { id: string }) {

  const { updateNumberOfCartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemoveElement() {
    try {
      setLoading(true);

      const res = await deleteElementFromCart(id);
      
      if (res === false || res === undefined) {
        toast.error("Failed to remove product", {
          duration: 3000,
          position: "top-right",
          className:
            "bg-white border border-red-200 text-red-600 shadow-lg px-4 py-3 rounded-xl font-medium",
        });
        return;
      }

      

      updateNumberOfCartItems(res);

      toast.success("Product deleted successfully", {
        duration: 2500,
          position: "top-right",

        className:
          "bg-white border border-green-200 text-green-700 shadow-lg px-4 py-3 rounded-xl font-medium",
      });

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
        className="cursor-pointer h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
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
              This item will be permanently removed from your cart.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={handleRemoveElement}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
