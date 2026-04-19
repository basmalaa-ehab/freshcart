"use client";
import Link from "next/link";
import { useState } from "react";
import { BiSolidShoppingBag } from "react-icons/bi";
import { FaReceipt, FaTruck } from "react-icons/fa";
import { FaArrowLeftLong, FaShieldHalved } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useCart } from "../_context/CartContext";
import AddressInfo from "./AddressInfo/AddressInfo";
import PaymentMethods from "./PaymentMethods";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const { cart } = useCart();

  const orderItems = cart?.products ?? [];
  const totalPrice =
    cart?.totalCartPrice ??
    orderItems.reduce(
      (sum, item: any) =>
        sum +
        (item.price ?? item.product?.price ?? 0) *
          (item.count ?? item.quantity ?? 1),
      0,
    );
  const isFreeShipping = totalPrice > 500 || cart?.freeShipping;
  const shippingCost = isFreeShipping ? 0 : 100;
  const displayShipping = isFreeShipping ? "Free" : `${shippingCost} EGP`;
  const displayTotal = totalPrice + shippingCost;

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-green-600 transition">
              home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="hover:text-green-600 transition">
              home
            </Link>
            <span className="text-gray-900 font-medium">checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                  <FaReceipt />
                </span>{" "}
                Complete Your Order{" "}
              </h1>
              <p className="text-gray-400 mt-4 px-2"></p>
              Review your items and complete your purchase
            </div>
            <Link
              href="/cart "
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
            >
              <FaArrowLeftLong />
              Back to Cart
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Address Info */}

            <AddressInfo paymentMethod={paymentMethod} />

            <PaymentMethods
              paymentMethod={paymentMethod}
              onPaymentMethodChange={(value) =>
                setPaymentMethod(value as "cash" | "online")
              }
            />
          </div>

          {/* order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
              <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BiSolidShoppingBag />
                  Order Summary
                </h2>
                <p className="text-green-100 text-sm mt-1">
                  {orderItems.length} item{orderItems.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="p-5">
                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                  {orderItems.map((item: any, index: number) => {
                    const product = item.product ?? item;
                    const image =
                      product?.imageCover ?? product?.images?.[0] ?? "";
                    const title = product?.title ?? item.title ?? "Product";
                    const quantity = item.count ?? item.quantity ?? 1;
                    const price = item.price ?? product?.price ?? 0;

                    return (
                      <div
                        key={item._id ?? product?._id ?? index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <img
                            src={image}
                            className="w-full h-full object-cover"
                            alt={title}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {quantity} x {price} EGP
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {price * quantity} EGP
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-100 py-3">
                  <div className=" pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{totalPrice} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FaTruck className="text-gray-600" />
                        Shipping
                      </span>
                      <span className="font-semibold text-green-600">
                        {displayShipping}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">
                        {displayTotal}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">EGP</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="cursor-pointer w-full py-3 bg-linear-to-r from-green-600 to-green-700 text-white  rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                >
                  {paymentMethod === "online"
                    ? "Proceed to Payment"
                    : "Place Order"}
                </button>

                <div className="border-t border-gray-200 mt-4"></div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 ">
                    <FaShieldHalved className="text-green-500" />
                    <span>Secure Payment</span>
                  </div>

                  <div className="w-px h-4 bg-gray-300"></div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck className="text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <IoMdCheckmarkCircle className="text-orange-500" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
