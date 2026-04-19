"use client";

import { FaTrash } from "react-icons/fa";
import { clearAllItems } from "./cart.actions";
import { useCart } from "../_context/CartContext";
import { useState } from "react";
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

export default function ClearAllItemsFromCart() {
  const { updateNumberOfCartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClearItems() {
    try {
      const res = await clearAllItems();
      if (res === false || res === undefined) {
        throw new Error("Failed to clear cart");
      }
      updateNumberOfCartItems(res);
      setOpen(false);
    } catch (error) {
      throw new Error("error try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
      >
        <FaTrash />
        <span>Clear all items</span>
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <FaTrash />
            </AlertDialogMedia>

            <AlertDialogTitle>Clear Your Cart?</AlertDialogTitle>

            <AlertDialogDescription>
              All items will be removed from your cart. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel variant="outline" className="cursor-pointer">
              Keep Shopping
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              className="cursor-pointer"
              onClick={handleClearItems}
            >
              Yes, Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
