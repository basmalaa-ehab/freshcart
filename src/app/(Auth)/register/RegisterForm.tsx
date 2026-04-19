"use client";
import * as zod from "zod";
import { toast } from "sonner";
import { Checkbox } from "_/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "_/components/ui/field";
import { Input } from "_/components/ui/input";
import { Label } from "_/components/ui/label";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerObjectType } from "./register.types";
import { registerSchema } from "./register.scehma";
import { RegisterActions } from "./register.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, watch } = useForm<registerObjectType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  const passwordValue = watch("password");

  function getPasswordStrength(password: string) {
    let score = 0;

    if (!password) return { text: "Weak", width: "0%" };

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { text: "Weak", width: "25%", color: "bg-red-500" };
    if (score === 2)
      return { text: "Medium", width: "50%", color: "bg-yellow-500" };
    if (score === 3)
      return { text: "Good", width: "75%", color: "bg-blue-500" };

    return { text: "Strong", width: "100%", color: "bg-green-600" };
  }

  const strength = getPasswordStrength(passwordValue);

  async function mySubmit(data: registerObjectType) {
    setIsLoading(true);
    // console.log("register data :", data);

    try {
      const isRegisterSuccess = await RegisterActions(data);

      if (isRegisterSuccess) {
      toast.success("Account created successfully", {
        duration: 3000,
        position: `top-right`,
        richColors: true,
        className:
          "py-5! px-4! bg-white! border-none! text-green-600! text-lg! font-semibold! ",
      });

      setTimeout(() => {
        router.push("/Login");
      }, 3000);
      } else {
        toast.error("Account already exists", {
          position: `top-right`,
          richColors: true,
          className: "py-5! px-4! bg-white! border-none! ",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="py-7" onSubmit={handleSubmit(mySubmit)}>
      {/* name */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="py-2">
            <FieldLabel htmlFor="name" className="text-base font-medium!">
              Name*
            </FieldLabel>

            <Input
              {...field}
              id="name"
              // aria-invalid={fieldState.invalid}
              placeholder="Ali"
              autoComplete="on"
              className="py-5 font-medium  placeholder:text-gray-400  border-[#99A1AF66]! focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-[6px] "
            />
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

      {/* email */}

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field
            className="py-2"
            // data-invalid={fieldState.invalid}
          >
            <FieldLabel htmlFor="email" className="text-base font-medium!">
              Email*
            </FieldLabel>

            <Input
              {...field}
              id="email"
              type="email"
              // aria-invalid={fieldState.invalid}
              placeholder="ali@example.com"
              autoComplete="on"
              className="py-5 font-medium  placeholder:text-gray-400  border-[#99A1AF66]! focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-[6px] "
            />
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
            <FieldLabel htmlFor="password" className="text-base font-medium!">
              Password*
            </FieldLabel>

            <Input
              {...field}
              type="password"
              id="password"
              // aria-invalid={fieldState.invalid}
              placeholder="Create a Strong Paswword"
              autoComplete="off"
              className="py-5 font-medium placeholder:text-gray-400 border-[#99A1AF66]! focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-[6px] "
            />
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
      <div className="password-requirements">
        <div className="flex items-center gap-2">
          {/* bar container */}
          <div className="grow h-1 bg-gray-200 rounded-md overflow-hidden">
            {/* progress */}
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: strength.width }}
            ></div>
          </div>

          {/* text */}
          <span className="text-sm font-medium min-w-12.5">
            {strength.text}
          </span>
        </div>
      </div>

      <p className="text-gray-500 text-xs pb-7 font-medium">
        Must be at least 8 characters with numbers and symbols
      </p>

      {/* repassword */}
      <Controller
        name="rePassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="py-2">
            <FieldLabel htmlFor="repassword" className="text-base font-medium!">
              Confirm Password*
            </FieldLabel>

            <Input
              {...field}
              id="repassword"
              type="password"
              placeholder="Confirm Your Password"
              autoComplete="off"
              className="py-5 font-medium placeholder:text-gray-400  border-[#99A1AF66]! focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-[6px] "
            />
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

      {/* phone */}

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field className="py-2">
            <FieldLabel htmlFor="phone" className="text-base font-medium!">
              Phone Number*
            </FieldLabel>

            <Input
              {...field}
              id="phone"
              // aria-invalid={fieldState.invalid}
              placeholder="+1 234 567 8900"
              autoComplete="on"
              className="py-5 font-medium  placeholder:text-gray-400  border-[#99A1AF66]! focus:border-green-600! focus:outline-none!  focus:ring-0! rounded-[6px] "
            />
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
      <div className="flex items-center gap-2">
        <Field orientation="horizontal" className=" ">
          <Checkbox
            id="terms-checkbox"
            name="terms-checkbox"
            required
            className="
  border-gray-300
  data-[state=checked]:bg-green-600
  data-[state=checked]:border-green-600
  hover:border-green-500
"
          />
          <Label htmlFor="terms-checkbox">
            <div className="flex flex-col gap-0 md:gap-2 md:flex-row md:items-center items-start justify-center">
              <div className="flex items-center gap-2">
                <span>I agree to the</span>
                <Link
                  href={"/TermsofService"}
                  className="text-green-600 hover:underline font-medium text-sm ms:text-base flex items-center"
                >
                  Terms of Service
                </Link>
                <div className=""> and</div>
              </div>

              <div
                className=" flex items-center md:gap-2 gap-0
justify-center"
              >
                <Link
                  href={"PrivacyPolicy"}
                  className="
             ms-2 md:m-0
            text-green-600 hover:underline font-medium text-sm md:text-base"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </Label>
        </Field>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="py-2 mt-4   rounded-lg btn bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 cursor-pointer w-full transition-colors flex flex-row items-center  justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Creating Account
          </>
        ) : (
          <>
            <span>
              <FaUserPlus />
            </span>
            Create My Account
          </>
        )}
      </button>
    </form>
  );
}
