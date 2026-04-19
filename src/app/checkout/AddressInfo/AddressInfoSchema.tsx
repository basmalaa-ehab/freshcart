import * as zod from "zod";

export const AddressSchema = zod.object({
  phone: zod
    .string()
    .nonempty("Please enter your phone number")
    .regex(/^01[1250][0-9]{8}$/, "Please enter a valid Egyptian phone number"),

  addressDetails: zod
    .string()
    .min(1, "Address is required")
    .min(10, "Address details must be at least 10 characters"),

  city: zod
    .string()
    .min(1, "City name must be at least 2 characters")
    .min(2, "City name must be at least 2 characters"),
  postalCode: zod
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^\d{5}$/.test(value),
      "Postal code must be exactly 5 digits",
    ),
});
