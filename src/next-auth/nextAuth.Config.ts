import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
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

        if (res.ok) {
          //    const {role , ...rest} = finalRes.user
          //      return rest

          const { name, email } = finalRes.user;
          
const data :{id : string } = jwtDecode(finalRes.token)
          return {
            name,
            email,
            id : data.id,
            token:finalRes.token
          };
        }

        return null; //must return => the authentcated user data() or null=> that means the authentication operation faild

        // return {} //that means the authentication operation success
      },
    }),
  ],


// function will be excute after another function ends
  callbacks:{
    // json web token => function will be excute after successfull sign in + user refresh + get session
    // function rescives a parameter and must return your jwt you want to overwrite it 
//     jwt:function(param){
      
// // param.token // is the default token (object) that next-auth generate 
// // , param.user // is the authenticated user provided from authorize function

// if(param.user){
//   param.token.userToken = param.user.token
// param.token.id = param.user.id
// param.token.name = param.user.name
// }
//       console.log('parameter' , param);



// return param.token
//     },

jwt: function({ token, user }) {
  if(user){
    token.id = user.id
    token.name = user.name       
    token.userToken = user.token
  }
  return token
}
,
// when ? usesession - getserversession - api/auth/session
// if the user authenticated or not => have seession or not => 3obara 3n object {provides some properties}
// session:function(param){
// session object is mutible => you can override it update delete property 
// if(param.user){
//   param.session.id= param.user.id
//   // param.session.user.token= param.user.id
// }

// param.session.user.id= param.token.id
// param.session.user?.name = param.user.name
session: function({ session, token }) {
  if (session.user) {
    session.user.id = token.id
    session.user.name = token.name    
    session.user.token = token.userToken 
  }
// console.log('param session', session);

// return param.session
return session
}



  },





  jwt: {
    maxAge: 60 * 60 * 24 * 3,
  },
  pages: {
    signIn: "/Login",
  },
};
secret: process.env.NEXTAUTH_SECRET
/*.env => to secure syntax variabls inside your app (API keys Secret keys Database URL Tokens)

 * .env.local 
 * .env.devalopment
 * .env.test
 * .env.production
 */
