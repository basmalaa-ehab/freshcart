"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";
import { updateProductCount } from "./cart.actions";
import { useRouter } from "next/navigation";

export default function UpdateProductCountButton({
  id,
  count,
  isIncrement = false,
}: {
  id: string;
  count: number;
  isIncrement?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdateCount() {
    console.log("UpdateProductCountButton clicked", { id, count, isIncrement });
    setLoading(true);
    try {
      const res = await updateProductCount(id, count);
      console.log("updateProductCount result:", res);
      if (res !== false) {
        console.log("Refreshing router...");
        router.refresh();
      } else {
        console.error("updateProductCount returned false");
      }
    } catch (error) {
      console.error("Error updating count:", error);
    } finally {
      setLoading(false);
    }
  }

  return isIncrement ? (
    <button
      disabled={loading}
      onClick={handleUpdateCount}
      className="h-8 w-8 rounded-lg bg-green-600 shadow-sm flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-50 transition-all cursor-pointer"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <GoPlus />
      )}
    </button>
  ) : (
    <button
      disabled={count <= 1 || loading}
      onClick={handleUpdateCount}
      className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <HiMinus />
      )}
    </button>
  );
}
