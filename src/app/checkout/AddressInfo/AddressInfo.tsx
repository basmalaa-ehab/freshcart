"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FaHouse } from "react-icons/fa6";

import { AddressSchema } from "./AddressInfoSchema";

import { IoIosInformationCircle } from "react-icons/io";
import CheckoutForm from "../CheckoutForm";

interface AddressInfoProps {
  paymentMethod: "cash" | "online";
}

export default function AddressInfo({ paymentMethod }: AddressInfoProps) {
  const [checkoutResponse, setCheckoutResponse] = useState<any>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      phone: "",
      city: "",
      addressDetails: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaHouse />
          Shipping Address
        </h2>
        <p className="text-gray-100 font-normal text-sm mt-1">
          Where should we deliver your order?
        </p>
      </div>

      {/* form address */}
      <div className="p-6 space-y-5">
        {/* INFO */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <IoIosInformationCircle className="text-blue-600 text-xl" />
          </div>

          <div>
            <p className="text-sm text-blue-800 font-medium">
              Delivery Information
            </p>
            <p className="text-xs text-blue-600 ">
              Please ensure your address is accurate
            </p>
          </div>
        </div>
        <CheckoutForm
          onResponse={setCheckoutResponse}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  );
}
