import * as zod from "zod";
export const registerSchema = zod
  .object({
    name: zod
      .string("")
      .nonempty("*Please enter your name")
      .min(2, "*Name is too short")
      .max(40, "*Name is too long"),
    email:zod
 .string()
  .min(1, "*Please enter your email")
  .email("*Invalid email address"),
    password: zod
      .string("*Password must be at least 8 characters long")
      .nonempty(`*Please enter your password`)
      .min(
        8,
        `*Password must be at least 8 characters long

`,
      )
      .regex(
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `At least 8 characters long.
At least one uppercase letter.
At least one lowercase letter.
At least one digit (number).
At least one special character.
`,
      ),
    rePassword: zod
      .string("*Password must be at least 8 characters long")
      .nonempty(`*Please confirm your password
`)
      .min(
        8,
        `*Password must be at least 8 characters long

`,
      )
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        `At least 8 characters long.
At least one uppercase letter.
At least one lowercase letter.
At least one digit (number).
At least one special character.
`,
      ),
    phone: zod
      .string()
      .nonempty("*Please enter your phone number")
      .regex(/^01[1250][0-9]{8}$/, "*Only Egyptian phone numbers are allowed"),
      
      
      //  terms: zod.boolean().refine(val => val === true, {
      //   message: "*You must accept the terms and conditions",
      // })
      
      
  })
  .refine((value) => value.password === value.rePassword, {
    message: "Password confirmation does not match",
    path: ["rePassword"],
  });





