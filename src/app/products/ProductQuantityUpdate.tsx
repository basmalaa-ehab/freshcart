"use client";

import { useMemo, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { updateProductCount } from "../cart/cart.actions";
import { useRouter } from "next/navigation";

interface ProductQuantityUpdateProps {
  id: string;
  unitPrice: number;
  discountedPrice?: number;
}

export default function ProductQuantityUpdate({
  id,
  unitPrice,
  discountedPrice,
}: ProductQuantityUpdateProps) {
  const [count, setCount] = useState(1);
  const router = useRouter();

  const effectivePrice = discountedPrice ?? unitPrice;
  const totalPrice = useMemo(() => count * effectivePrice, [count, effectivePrice]);

  async function handleDecrement() {
    if (count === 1) return;

    const newCount = count - 1;
    setCount(newCount);

    try {
      await updateProductCount(id, newCount);
    } catch {
      setCount((prev) => prev + 1);
    }
  }

  async function handleIncrement() {
    const newCount = count + 1;
    setCount(newCount);

    try {
      await updateProductCount(id, newCount);
      router.refresh();
    } catch {
      setCount((prev) => prev - 1);
    }
  }

  return (
    <div className="">
      <div className="flex flex-row w-fit items-center border-2 border-gray-300 rounded-lg overflow-hidden ">
        <button
          onClick={handleDecrement}
          className="flex-none px-3 py-4 min-w-11 flex items-center justify-center"
        >
          <AiOutlineMinus />
        </button>

        <input value={count} readOnly className="w-16 text-center flex-none" />

        <button
          onClick={handleIncrement}
          className="flex-none px-3 py-3 min-w-11 flex items-center justify-center"
        >
          <GoPlus />
        </button>
      </div>

      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between p-2 gap-2 ">
          <span className="text-[#4A5565] font-medium text-base whitespace-nowrap">
            Total Price:
          </span>
          <span className="font-bold text-2xl/[28px] text-[#16A34A]">
            {totalPrice.toFixed(2)}
            <span className="ml-1">EGP</span>
          </span>
        </div>
      </div>
    </div>
  );
}
