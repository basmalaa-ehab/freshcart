import { nextAuthConfig } from "_/next-auth/nextAuth.Config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// NextAuth({
//     providers:[
//         Google(),
//         Credentials(),
//     ]
// })

const routeHandler = NextAuth(nextAuthConfig)
export {routeHandler as GET , routeHandler as POST}