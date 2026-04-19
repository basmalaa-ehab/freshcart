import * as zod from "zod";
export const loginScehma = zod
  .object({
   
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
  
      
      
  })
 




