// secure our API 

'use server'

import { toast } from "sonner";
import { registerObjectType } from "./register.types";
export async function RegisterActions(data : registerObjectType){
    

try{
  
const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup" , {
  method : "post",
  body: JSON.stringify(data),

headers:{'content-type' : 'application/json'}

})
const finalRes =await res.json()
// console.log('res' , res);

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


return res.ok



}catch(error){
    // console.log('errorr network' , error);
}


}