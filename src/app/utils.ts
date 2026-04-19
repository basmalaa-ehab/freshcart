import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodeAuthenticatedUserToken(): Promise<string | null> {
  try {
    const cookie = await cookies();
    const nextAuthToken = cookie.get("next-auth.session-token")?.value;
    
    if (!nextAuthToken) {
      return null;
    }
    
    // decode
    try {
      const jwtRes = await decode({
        secret: process.env.NEXTAUTH_SECRET! || "",
        token: nextAuthToken,
      });
      if (jwtRes?.userToken) {
        return jwtRes.userToken as string;
      }
      return null;
    } catch (decodeError) {
      console.error("JWT decode error in decodeAuthenticatedUserToken:", decodeError);
      return null;
    }
  } catch (error) {
    console.error("Error decoding user token:", error);
    return null;
  }
}

export async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const cookie = await cookies();
    const nextAuthToken = cookie.get("next-auth.session-token")?.value;
    
    if (!nextAuthToken) {
      return null;
    }
    
    // decode
    try {
      const jwtRes = await decode({
        secret: process.env.NEXTAUTH_SECRET! || "",
        token: nextAuthToken,
      });
      if (jwtRes?.id) {
        return jwtRes.id as string;
      }
      return null;
    } catch (decodeError) {
      console.error("JWT decode error in getAuthenticatedUserId:", decodeError);
      return null;
    }
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}
