import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodeAuthenticatedUserToken(): Promise<string | null> {
  try {
    const cookie = await cookies();

    // Try different possible cookie names for next-auth session token
    const possibleCookieNames = [
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "next-auth.session-token.0",
      "next-auth.session-token.1",
      "next-auth.session-token.2"
    ];

    let nextAuthToken: string | undefined;

    for (const cookieName of possibleCookieNames) {
      nextAuthToken = cookie.get(cookieName)?.value;
      if (nextAuthToken) {
        console.log(`Found token in cookie: ${cookieName}`);
        break;
      }
    }

    if (!nextAuthToken) {
      console.log("No next-auth session token found in cookies");
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
      console.log("No userToken found in decoded JWT");
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

    // Try different possible cookie names for next-auth session token
    const possibleCookieNames = [
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "next-auth.session-token.0",
      "next-auth.session-token.1",
      "next-auth.session-token.2"
    ];

    let nextAuthToken: string | undefined;

    for (const cookieName of possibleCookieNames) {
      nextAuthToken = cookie.get(cookieName)?.value;
      if (nextAuthToken) {
        console.log(`Found token in cookie for user ID: ${cookieName}`);
        break;
      }
    }

    if (!nextAuthToken) {
      console.log("No next-auth session token found in cookies for user ID");
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
      console.log("No id found in decoded JWT");
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
