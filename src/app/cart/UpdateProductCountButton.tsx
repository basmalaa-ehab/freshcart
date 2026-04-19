"use client";

import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi2";
import { updateProductCount } from "./cart.actions";

export default function UpdateProductCountButton({
  id,
  count,
  isIncrement = false,
}: {
  id: string;
  count: number;
  isIncrement?: boolean;
}) {
  async function handleUpdateCount() {
    const res = await updateProductCount(id, count);
  }

  return isIncrement ? (
    <button
      // disabled={loading}
      onClick={handleUpdateCount}
      className="h-8 w-8 rounded-lg bg-green-600 shadow-sm flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-50 transition-all cursor-pointer"
    >
      <GoPlus />
    </button>
  ) : (
    <button
      disabled={count <= 1}
      onClick={handleUpdateCount}
      className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
    >
      <HiMinus />
    </button>
  );
}
