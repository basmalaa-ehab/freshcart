"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { FaLocationDot } from "react-icons/fa6";
import { FiMapPin, FiPhone } from "react-icons/fi";

import { shippingDetailsTypes } from "_/api/services/types";
import { Field, FieldError, FieldLabel } from "_/components/ui/field";
import { Input } from "_/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCity } from "react-icons/fa";
import { toast } from "sonner";
import * as zod from "zod";
import { useCart } from "../_context/CartContext";
import { AddressSchema } from "./AddressInfo/AddressInfoSchema";
import { createCashOrder, createOnlineOrder } from "./checkout.actions";

interface CheckoutFormProps {
  paymentMethod: "cash" | "online";
  onResponse?: (response: {
    success: boolean;
    data?: unknown;
    error?: string;
  }) => void;
}

export default function CheckoutForm({
  paymentMethod,
  onResponse,
}: CheckoutFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState<string | null>(null);
  const { updateNumberOfCartItems } = useCart();
  const cartId = searchParams.get("cartId");
  type FormData = zod.infer<typeof AddressSchema>;

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
      postalCode: "",
    },
  });

  // cash order handler
  async function handleSubmitOrder(value: FormData) {
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!cartId) {
      setSubmitError(
        "Cart id is missing. Please go back to cart and try again.",
      );
      return;
    }

    if (paymentMethod === "online") {
      const userData: shippingDetailsTypes = {
        shippingAddress: {
          details: value.addressDetails,
          phone: value.phone,
          city: value.city,
          postalCode: value.postalCode,
        },
      };
      const response = await createOnlineOrder(cartId, userData);

      if (!response.success) {
        toast.error(response.error);
        return;
      }

      const url = response.data as string;
      if (!url) {
        toast.error("Payment URL not available. Please try again.");
        return;
      }

      window.open(url, "_self");

      // router.push(`/checkout/payment?cartId=${cartId}`);
      return;
    }

    try {
      const userData: shippingDetailsTypes = {
        shippingAddress: {
          details: value.addressDetails,
          phone: value.phone,
          city: value.city,
          postalCode: value.postalCode,
        },
      };

      const response = await createCashOrder(cartId, userData);

      if (!response.success) {
        toast.error(response.error);
        setSubmitError(response.error);
        return;
      }

      setSubmitSuccess("Order created successfully.");
      toast.success("Order created successfully.", { position: "top-right" });
      router.push("/AllOrders");
      updateNumberOfCartItems(0);

      console.log("createCashOrder response:", response.data);
    } catch (err) {
      console.error(err);
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <form id="checkout-form" onSubmit={handleSubmit(handleSubmitOrder)}>
        {/* CITY */}
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel
                htmlFor="city"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                City <span className="text-red-500"> *</span>
              </FieldLabel>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <FaCity className="text-gray-500 text-sm" />
                </div>
                <Input
                  id="city"
                  autoComplete="on"
                  type="text"
                  {...field}
                  placeholder="
e.g. Cairo, Alexandria, Giza
"
                  className={`w-full px-4 py-6.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!
                    ${errors.city ? "border-red-500 font-medium" : "border-gray-200"}
                  `}
                />
              </div>
              {errors.city && (
                <div className="flex items-center font-medium gap-1 mt-2 text-red-600 text-sm">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>

                  <FieldError errors={[errors.city]} />
                </div>
              )}{" "}
            </Field>
          )}
        />

        {/* ADDRESS */}
        <Controller
          name="addressDetails"
          control={control}
          render={({ field }) => (
            <Field className="pt-5">
              <FieldLabel className="block text-sm font-semibold text-gray-700 ">
                Street Address <span className="text-red-500"> *</span>
              </FieldLabel>

              <div className="relative">
                <div className="absolute left-3 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <FaLocationDot className="text-sm text-gray-400" />
                </div>
                <textarea
                  {...field}
                  placeholder="Street name, building number,floor, apartment..."
                  className={`w-full pl-14 py-4  h-28 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!
                    ${errors.addressDetails ? "border-red-500" : "border-gray-200"}
                  `}
                />
              </div>

              {errors.addressDetails && (
                <div className="flex items-center gap-1 font-medium mt-2 text-red-600 text-sm">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>

                  <FieldError errors={[errors.addressDetails]} />
                </div>
              )}
            </Field>
          )}
        />

        {/* PHONE */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Field className="py-4">
              <FieldLabel className="block text-sm font-semibold text-gray-700 ">
                Phone Number <span className="text-red-500"> *</span>
              </FieldLabel>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  {...field}
                  autoComplete="on"
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={`pl-10 py-6 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!
                    ${errors.phone ? "border-red-500" : "border-gray-200"}
                  `}
                />
              </div>
              {errors.phone && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>

                  <FieldError errors={[errors.phone]} />
                </div>
              )}{" "}
            </Field>
          )}
        />

        {/* postal code */}
        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => (
            <Field className="py-4">
              <FieldLabel className="block text-sm font-semibold text-gray-700 ">
                Postal Code
              </FieldLabel>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <Input
                  {...field}
                  placeholder="Enter Your Postal Code"
                  className={`pl-10 py-6 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500! focus:ring-2! focus:ring-green-100!
                    ${errors.postalCode ? "border-red-500" : "border-gray-200"}
                  `}
                />
              </div>
              {errors.postalCode && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>

                  <FieldError errors={[errors.postalCode]} />
                </div>
              )}
            </Field>
          )}
        />

      </form>
    </div>
  );
}
