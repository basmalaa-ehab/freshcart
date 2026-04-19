import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id: string;
    token: string;
  }
  interface Session {
    user: {
      id: string;
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userToken: string;
  }
}
export const nextAuthConfig: NextAuthOptions = {
  providers: [
    // Google(),
    // Facebook()
    Credentials({
      name: "fresh card",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async function (credentials) {
        try {
          const res = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "post",
              body: JSON.stringify(credentials),
              headers: { "content-type": "application/json" },
            },
          );
          const finalRes = await res.json();
          console.log("final res from authorize function", finalRes);

          if (res.ok && finalRes.token && finalRes.user) {
            const { name, email } = finalRes.user;
            
            try {
              const data: { id: string } = jwtDecode(finalRes.token);
              return {
                name,
                email,
                id: data.id,
                token: finalRes.token
              };
            } catch (jwtError) {
              console.error("JWT decode error:", jwtError);
              return null;
            }
          }

          console.error("Auth failed:", finalRes);
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],


// function will be excute after another function ends
  callbacks:{
    // json web token => function will be excute after successfull sign in + user refresh + get session
    // function rescives a parameter and must return your jwt you want to overwrite it 
    jwt: function({ token, user }) {
      // param.token // is the default token (object) that next-auth generate 
      // param.user // is the authenticated user provided from authorize function
      if(user){
        token.id = user.id
        token.name = user.name       
        token.userToken = user.token
      }
      return token
    },
    // when ? usesession - getserversession - api/auth/session
    // if the user authenticated or not => have seession or not => 3obara 3n object {provides some properties}
    // session object is mutible => you can override it update delete property 
    session: function({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.token = token.userToken as string
      }
      return session
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  pages: {
    signIn: "/Login",
    error: "/Login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/*.env => to secure syntax variabls inside your app (API keys Secret keys Database URL Tokens)

 * .env.local 
 * .env.devalopment
 * .env.test
 * .env.production
 */
