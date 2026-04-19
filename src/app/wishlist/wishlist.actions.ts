"use server";

import { revalidatePath } from "next/cache";
import { decodeAuthenticatedUserToken } from "../utils";

export async function AddProductToWishlist(id: string) {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          method: "post",
          headers: { token: userToken, "content-type": "application/json" },
          body: JSON.stringify({ productId: id }),
        },
      );
      const finalRes = await res.json();
      // console.log("finalRes from add to wishlist", finalRes);
      return finalRes.data;
    } catch (error) {
      // console.log("error", error);
    }
  } else {
    return new Error("session ended please login again");
  }
}

// delete product from wishlist
export async function deleteElementFromwishlist(productId: string) {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          method: "DELETE",
          headers: { token: userToken },
        },
      );

      if (res.ok) {
        const finalRes = await res.json();
        // console.log("finalRes from delete item", finalRes);
        revalidatePath("/wishlist");
        return finalRes.numOfCartItems;
      } else {
        return false;
      }
    } catch (error) {
      // console.log("error", error);
    }
  } else {
    return new Error("session ended please login again");
  }
}
