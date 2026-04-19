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
    const jwtRes = await decode({
      secret: process.env.NEXTAUTH_SECRET! || "",
      token: nextAuthToken,
    });
    if (jwtRes) {
      return jwtRes.userToken as string;
    } else {
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
    const jwtRes = await decode({
      secret: process.env.NEXTAUTH_SECRET! || "",
      token: nextAuthToken,
    });
    if (jwtRes) {
      return jwtRes.id as string;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}
