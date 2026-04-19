"use client";

import { OrderType } from "_/api/services/types";
import { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaClock, FaCreditCard, FaMoneyBill, FaReceipt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import {
  MdCalendarMonth,
  MdKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { PiHashThin } from "react-icons/pi";

export default function OrderCard({ order }: { order: OrderType }) {
  const [showDetails, setShowDetails] = useState(false);
  const shippingPrice = order.shippingPrice ?? 0;
  const subtotalWithDelivery = order.totalOrderPrice + shippingPrice;

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-green-200 shadow-lg shadow-green-100/50">
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={order.cartItems?.[0]?.product?.imageCover || ""}
                alt={order.cartItems?.[0]?.product?.title || ""}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-lg mb-2">
                  <span>
                    <FaClock className="text-xs text-green-500" />
                  </span>
                  <span
                    className={`text-xs font-semibold ${order.isDelivered ? "text-green-600" : "text-orange-300"}`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <PiHashThin className="text-xs text-gray-400" />
                  {order.id}
                </h3>
              </div>

              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                {order.paymentMethodType === "cash" ? (
                  <FaMoneyBill className="text-gray-600" />
                ) : (
                  <FaCreditCard className="text-gray-600" />
                )}
              </div>
            </div>
            {/* title */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                <MdCalendarMonth className="text-sm text-gray-400" />
                {order.createdAt &&
                  new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300 font-medium"></span>
              <span className="flex items-center gap-1.5 text-gray-400">
                <CiCirclePlus className="text-sm text-gray-400" />
                {order.cartItems?.length || 0}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300"></span>

              <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                <FaLocationDot className="text-sm text-gray-400" />
                {order.shippingAddress?.city}
              </span>
            </div>
            {/* price */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>

              <button
                onClick={() => setShowDetails(!showDetails)}
                className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  showDetails
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {showDetails ? "Hide" : "Details"}{" "}
                {showDetails ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdOutlineKeyboardArrowDown />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <FaReceipt className="text-xs text-green-500" />
              </div>
              Order Items
            </h4>

            <div className="space-y-3">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.count} x {item.price}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900 shrink-0">
                      {item.count * item.price}
                    </p>
                    <span className="text-xs text-gray-400">EGP</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4 py-5">
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FaLocationDot className="text-xs text-blue-600" />
                  </div>
                  Delivery Address
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>{order.shippingAddress.details}</p>
                  <p>{order.shippingAddress.city}</p>
                  <p className="flex items-center gap-2">
                    <BsFillTelephoneFill className="text-xs" />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-green-100 border border-green-200">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                    <FaClock className=" text-white" />
                  </div>
                  Order Summary
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-800 ">
                    <span className="text-base">Subtotal</span>
                    <span className="font-medium flex flex-row gap-2">
                      {order.totalOrderPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-800 ">
                    <span className="text-base">Shipping</span>
                    <span className="font-medium">{shippingPrice} EGP</span>
                  </div>

                  <div className="border-t border-gray-200/50 mt-4">
                    <div className="flex justify-between mt-3">
                      <span className="text-base font-semibold text-gray-900">
                        Total Order
                      </span>
                      <span className="font-bold text-lg text-gray-900">
                        {subtotalWithDelivery} EGP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
