"use client";

import Link from "next/link";
import { FaLock, FaShoppingBag, FaTag, FaTruck, FaUser } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";

export default function OrderSummary({
  totalItems,
  totalCartPrice,
  _id,
}: {
  totalItems: number;
  totalCartPrice: number;
  _id: string;
}) {
  const FREE_SHIPPING_LIMIT = 500;

  const remaining = Math.max(FREE_SHIPPING_LIMIT - totalCartPrice, 0);

  const progress = Math.min((totalCartPrice / FREE_SHIPPING_LIMIT) * 100, 100);

  const isFreeShipping = totalCartPrice >= FREE_SHIPPING_LIMIT;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
        {/* Header */}
        <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaShoppingBag />
            Order Summary
          </h2>
          <p className="text-green-100 text-sm mt-1">
            {totalItems} items in your cart
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* FREE SHIPPING SUCCESS */}
          {isFreeShipping ? (
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaTruck className="text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-green-700">Free Shipping!</p>
                <p className="text-sm font-medium text-green-600">
                  You qualify for free delivery
                </p>
              </div>
            </div>
          ) : (
            /* PROGRESS BAR */
            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaTruck className="text-orange-500" />

                <span className="text-sm font-medium text-gray-700">
                  Add {remaining} EGP for free shipping
                </span>
              </div>

              <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* SUBTOTAL */}
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Subtotal ({totalItems} items)</span>
            <span className="font-semibold">{totalCartPrice} EGP</span>
          </div>

          {/* SHIPPING */}
          <div className="flex justify-between text-gray-600">
            <span className="font-medium">Shipping</span>
            <span className="font-medium ">
              {isFreeShipping ? "Free" : "Calculated at checkout"}
            </span>
          </div>

          {/* TOTAL */}
          <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-900 font-semibold"> Total</span>
              <span className="">
                <span className="text-2xl font-bold text-gray-900">
                  {" "}
                  {totalCartPrice}
                </span>{" "}
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </span>
            </div>
          </div>

          {/* promo code */}

          <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
            <span className="text-sm">
              <FaTag />
            </span>
            Apply Promo Code
          </button>

          {/* checkout */}
          <div className="">
            <Link
              href={`/checkout?cartId=${_id}`}
              className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
            >
              <FaLock />
              Secure Checkout
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaShieldHalved className="text-green-500" />
              <span>Secure Payment</span>
            </div>

            <div className="w-px h-4 bg-gray-300"></div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaTruck className="text-blue-500" />
              <span>Fast Delivery</span>
            </div>
          </div>

          <Link
            className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2"
            href="/"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
