import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { getToken } from "next-auth/jwt";

export async function proxy(req :  NextRequest){
     // run between any "request" to any  '"page"' and the response of the server to the client 

// req.cookies.get('next-auth.session-token') => ليه cookieStore.get('token')?.value مش كفاية
// ده بس بياخد قيمة الـ cookie من الطلب.
// ما بيعملش أي تحقق من صحتها أو صلاحيتها.
// أي حد ممكن يرسل أي قيمة في الـ cookie → لو بس أخدنا القيمة، مفيش حماية.


const token = await getToken({req , secret : process.env.NEXTAUTH_SECRET}) // mch btsht8l 8er f mkanen 1-proxy=>req 2-route handlers 3shan bygeli feha req
if(!!token){
     
    return NextResponse.next()
}
    // function must return 
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/Login`)
}

export const config ={
    matcher:[
       "/profile"  , "/AllOrders"
    
    ]}