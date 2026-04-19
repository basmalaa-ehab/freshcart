import { LiaCcAmex } from "react-icons/lia";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "_/components/ui/field";
import { RadioGroup, RadioGroupItem } from "_/components/ui/radio-group";
import {
  FaCcMastercard,
  FaCcVisa,
  FaMoneyBill,
  FaRegCreditCard,
  FaWallet,
} from "react-icons/fa";
import { IoShieldHalfSharp } from "react-icons/io5";

interface PaymentMethodsProps {
  paymentMethod: "cash" | "online";
  onPaymentMethodChange: (value: "cash" | "online") => void;
}

export default function PaymentMethods({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodsProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm     

"
    >
      {/* HEADER */}
      <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaWallet />
          Payment Method
        </h2>
        <p className="text-gray-100 text-sm mt-1 font-normal">
          Choose how you'd like to pay
        </p>
      </div>

      {/* form address */}
      <div className="p-6 space-y-5">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) =>
            onPaymentMethodChange(value as "cash" | "online")
          }
          className="w-full p-4"
        >
          <FieldLabel
            htmlFor="plus-cash"
            className="items-center p-1 text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-green-500 has-data-checked:bg-green-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border-2       *:data-[slot=field]:p-5 dark:has-data-checked:border-gray-50                    dark:has-data-checked:bg-green-10 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
          >
            <Field orientation="horizontal" className="">
              <FieldContent className="flex flex-row gap-3">
                <div className="w-14 h-10 md:h-14 md:w-14 rounded-[6px] md:rounded-xl  flex items-center justify-center transition-all bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30">
                  <FaMoneyBill className="text-xl" />
                </div>

                <div>
                  <FieldTitle className="flex w-fit items-center gap-2  leading-snug  text-base   font-bold   text-green-700">
                    Cash on Delivery
                  </FieldTitle>
                  <FieldDescription className="text-sm text-gray-500 mt-1 font-medium">
                    Pay when your order arrives at your doorstep{" "}
                  </FieldDescription>
                </div>
              </FieldContent>

              <RadioGroupItem
                id="plus-cash"
                value="cash"
                className="
    w-7 h-7 flex items-center justify-center rounded-full border-2
    border-gray-300
    data-[state=checked]:bg-green-600
    data-[state=checked]:border-green-600
    data-[state=checked]:text-white
  "
              >
                <span className="hidden data-[state=checked]:block text-white text-sm">
                  ✓
                </span>
              </RadioGroupItem>
            </Field>
          </FieldLabel>
          {/* payment online */}
          <FieldLabel
            htmlFor="plus-online"
            className="items-center mt-3 text-sm font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-green-500 has-data-checked:bg-green-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border-2       *:data-[slot=field]:p-5 dark:has-data-checked:border-gray-50                    dark:has-data-checked:bg-green-10 has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col"
          >
            <Field orientation="horizontal" className="">
              <FieldContent className="flex flex-row gap-3">
                <div className="w-14 h-10 md:h-14 md:w-14 rounded-[6px] md:rounded-xl flex items-center justify-center transition-all bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30">
                  <FaRegCreditCard className="text-xl" />
                </div>

                <div>
                  <FieldTitle className="flex w-fit items-center gap-2  leading-snug text-base   font-bold   text-green-700">
                    Pay Online
                  </FieldTitle>
                  <FieldDescription className="text-sm text-gray-500 pt-2 font-medium">
                    Secure payment with Credit/Debit Card via Stripe
                  </FieldDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <FaCcVisa />

                    <FaCcMastercard />

                    <LiaCcAmex />
                  </div>
                </div>
              </FieldContent>

              <RadioGroupItem
                id="plus-online"
                value="online"
                className="
    w-7 h-7 flex items-center justify-center rounded-full border-2
    border-gray-300
    data-[state=checked]:bg-green-600
    data-[state=checked]:border-green-600
    data-[state=checked]:text-white
  "
              >
                <span className="hidden data-[state=checked]:block text-white text-sm">
                  ✓
                </span>
              </RadioGroupItem>
            </Field>
          </FieldLabel>

          <div className="flex items-center gap-3 p-4  bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4 ">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <IoShieldHalfSharp className="text-green-600!" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-green-800">
                Secure & Encrypted
              </p>
              <p className="text-xs text-green-600 mt-0.5 font-medium">
                Your payment info is protected with 256-bit SSL encryption
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
