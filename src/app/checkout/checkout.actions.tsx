"use server";

import { shippingDetailsTypes } from "_/api/services/types";
import { decodeAuthenticatedUserToken } from "../utils";

type CreateCashOrderResult =
  | { success: true; data: unknown }
  | { success: false; error: string; status?: number };

export async function createCashOrder(
  cartId: string,
  shippingAddress: shippingDetailsTypes,
): Promise<CreateCashOrderResult> {
  const userToken = await decodeAuthenticatedUserToken();

  if (!cartId) {
    return { success: false, error: "Cart id is missing" };
  }

  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
        {
          method: "POST",
          headers: { token: userToken, "content-type": "application/json" },
          body: JSON.stringify(shippingAddress),
        },
      );
      let finalRes;
      if (res.ok) {
        const finalRes = await res.json();

        // console.log("finalRes from creating cash order", finalRes);
        return { success: true, data: finalRes };
      } else {
        return {
          success: false,
          error: (finalRes as any)?.message || "Failed to create cash order",
          status: res.status,
        };
      }
    } catch (error) {
      // console.log("error", error);
      return {
        success: false,
        error: "Something went wrong while creating the order",
      };
    }
  } else {
    return {
      success: false,
      error: "Session ended, please login again",
    };
  }
}

// online order
export async function createOnlineOrder(
  cartId: string,
  shippingAddress: shippingDetailsTypes,
): Promise<CreateCashOrderResult> {
  const userToken = await decodeAuthenticatedUserToken();

  if (!cartId) {
    return { success: false, error: "Cart id is missing" };
  }

  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method: "POST",
          headers: { token: userToken, "content-type": "application/json" },
          body: JSON.stringify(shippingAddress),
        },
      );
      let finalRes;
      if (res.ok) {
        const finalRes = await res.json();

        return { success: true, data: finalRes.session.url };
      } else {
        return {
          success: false,
          error: (finalRes as any)?.message || "Failed to create online order",
          status: res.status,
        };
      }
    } catch (error) {
      // console.log("error", error);
      return {
        success: false,
        error: "Something went wrong while creating the order",
      };
    }
  } else {
    return {
      success: false,
      error: "Session ended, please login again",
    };
  }
}
