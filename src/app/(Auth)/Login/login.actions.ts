// secure our API

"use server";

import { toast } from "sonner";
import { loginObjectType } from "./login.types";
import { cookies } from "next/headers";
import { getUserCart } from "_/api/services/route.services";
// import { loginObjectType } from "./LOGIN.types";
export async function LoginActions(data: loginObjectType) {
  try {
    /*
     * cookies => are used on the server + client
     *
     *
     *
     *
     */

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signin",
      {
        method: "post",
        body: JSON.stringify(data),

        headers: { "content-type": "application/json" },
      },
    );
    const finalRes = await res.json();
    // console.log("login res", finalRes);
if(res.ok){
  
    const cookie = await cookies(); //cookie  are used to protect against CSRF attacks.
    cookie.set("token", finalRes.token, {
      httpOnly: true, //boolean access this token via js code or not //true=> server request only
      secure: true, //boolean => website that accessing this token must be https protocol
      maxAge: 60 * 60 * 24, //time in seconds
      // expires : new Date()
      sameSite :"lax"
    });
    return true
}
return false
    // if(res.ok){

    //       toast.success("Account created successfully"
    //         , {
    //             duration: 3000,
    //    position:`top-right`,
    //     richColors:true,
    // className:"py-5! px-4! bg-white! border-none! text-green-600! text-lg! font-semibold! ",
    //         }
    //       );

    // setTimeout(()=>{
    //  router.push('/login')

    //     },3000
    // )

    // }else{
    //   toast.error(finalRes.message,{
    //     position:`top-right`,
    //     richColors:true,
    // className:"py-5! px-4! bg-white! border-none! ",
    //   duration: 3000,

    //   })

    // }

    return res.ok;
  } catch (error) {
    // console.log("errorr network", error);
  }
}


export async function getCurrentLoggedInUserCart(){
   return  getUserCart();
  
}





//next.js => full-stack framework
// we could run some code on the server => DB query

// we could generate API using Next.Js => app folder => folder api => route.ts => route handler  




/*
NextAuth => remove hustle of authentication operation in app 
Login => 
--secure the API call 
--the token will be stored in the ciikie => without making that ourselves 
--(optionally but recommended ) by default generate random secret key => to decode the token 

-- advanced => service provider => login with facebook w goofle

*/