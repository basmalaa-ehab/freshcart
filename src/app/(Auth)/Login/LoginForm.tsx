"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "_/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "_/components/ui/field";
import { Input } from "_/components/ui/input";
import { Label } from "_/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEnvelope } from "react-icons/fa";
import { ImLock } from "react-icons/im";
import { toast } from "sonner";
import { registerSchema } from "../register/register.scehma";
import { getCurrentLoggedInUserCart, LoginActions } from "./login.actions";
import { loginObjectType } from "./login.types";
import { loginScehma } from "./login.scehma";
import { signIn, useSession } from "next-auth/react";
import { useCart } from "_/app/_context/CartContext";
import { cartResponse } from "_/api/services/types";

export default function LoginForm() {
  const [isShow, setIsShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handelPassword() {
    setIsShow(!isShow);
  }

  function toggleConfirmPassword() {
    setShowConfirm(!showConfirm);
  }

  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { updateNumberOfCartItems } = useCart();

  const { handleSubmit, control } = useForm<loginObjectType>({
    resolver: zodResolver(loginScehma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function mySubmit(data: loginObjectType) {
    setIsLoading(true);
    // console.log("register data :", data);

    try {
      // call authorize
      const res = await signIn("credentials", { redirect: false, ...data });

      if (res?.ok) {
      toast.success("Login successfull", {
        duration: 5000,
        position: `top-right`,
        richColors: true,
        className:
          "py-5! px-4! bg-white! border-none! text-green-600! text-lg! font-semibold! ",
      });



      const cartRes = await getCurrentLoggedInUserCart();
      updateNumberOfCartItems(cartRes?.products.length || 0);






      router.push("/");
      // router.refresh();

      // setTimeout(() => {
      // }, 1000);
      } else {
        toast.error("incorrect Password or email", {
          position: `top-right`,
          richColors: true,
          className: "py-5! px-4! bg-white! border-none! ",
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }

    // const isLoginSuccess = await LoginActions(data);

    // if (isLoginSuccess) {
    //   toast.success("Login successfull", {
    //     duration: 3000,
    //     position: `top-right`,
    //     richColors: true,
    //     className:
    //       "py-5! px-4! bg-white! border-none! text-green-600! text-lg! font-semibold! ",
    //   });

    //   setTimeout(() => {
    //     router.push("/");
    //   }, 3000);
    // } else {
    //   toast.error("incorrect Password or email", {
    //     position: `top-right`,
    //     richColors: true,
    //     className: "py-5! px-4! bg-white! border-none! ",
    //     duration: 3000,
    //   });
    // }
  }

  return (
    <form className="py-7" onSubmit={handleSubmit(mySubmit)}>
      {/* name */}

      {/* email */}

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            className="py-2"
          >
            <FieldLabel htmlFor="email" className="text-base font-medium!">
              Email*
            </FieldLabel>

            <div className="relative">
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="ali@example.com"
                autoComplete="on"
                className="pl-9 py-6 font-medium placeholder:text-gray-400 border-gray-200! border-2 focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-lg"
              />
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <FieldDescription></FieldDescription>
            {fieldState.invalid && (
              <FieldError
                className="text-red-500 -mt-0.5 text-sm font-medium"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      {/* password */}

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="">
            <div className="flex items-center justify-between mb-2">
              <FieldLabel htmlFor="password" className="text-base font-medium!">
                Password*
              </FieldLabel>
              <Link
                href={"/forget-password"}
                className="text-sm text-green-600 hover:text-green-700 cursor-pointer font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                {...field}
                type={isShow ? "text" : "password"}
                id="password"
                placeholder="Create a Strong Paswword
"
                autoComplete="off"
                className="pl-8  py-6 font-medium placeholder:text-gray-400 placeholder:text-sm border-gray-200! border-2 focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-lg"
              />

              <ImLock
                className="
      cursor-pointer
      absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <button
                type="button"
                onClick={handelPassword}
                className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-white text-xl"
              >
                {isShow ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

         

            <FieldDescription></FieldDescription>
            {fieldState.invalid && (
              <FieldError
                className="text-red-500 -mt-0.5 text-sm font-medium"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      {/* aplay terms  */}
      <div className="flex items-center gap-2 mt-5">
        <Field orientation="horizontal" className=" ">
          <Checkbox
            id="terms-checkbox"
            name="terms-checkbox"
            className="
  border-gray-300
  data-[state=checked]:bg-green-600
  data-[state=checked]:border-green-600
  hover:border-green-500
"
          />
          <Label htmlFor="terms-checkbox">
           
            Keep me signed in
          </Label>
        </Field>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="py-3  px-4 mt-6 text-lg font-semibold  rounded-lg btn bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer w-full transition-colors flex flex-row items-center  justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Signing in
          </>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
}
