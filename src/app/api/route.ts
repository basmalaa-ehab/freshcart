// route handler => you could generate API from it

import { NextResponse } from "next/server";

// any route handler must return 
export function GET(){
    // any js code =? DB query 
    //data => return it
const users =[
{name:'ahmed' , age : "30"},
{name:'menna' , age : "60"}
]


    return NextResponse.json({message : 'success' , data : users })

}



// server actions => secure our APi mot mandatory return 
// route handler => you could generate API from it must return
