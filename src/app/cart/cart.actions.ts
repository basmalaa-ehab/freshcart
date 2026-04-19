"use server";

import { decodeAuthenticatedUserToken } from "../utils";
import { revalidatePath } from "next/cache";

export async function AddProductToCart(id: string) {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "post",
        headers: { token: userToken, "content-type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from add to cart", finalRes);
        return finalRes.numOfCartItems;
      } else {
        console.error("Failed to add to cart:", res.status, res.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  } else {
    console.error("No user token found for add to cart");
    return false;
  }
}


// delete product from cart
export async function deleteElementFromCart(productId: string) {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          method: "DELETE",
          headers: { token: userToken },
        },
      );

      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from delete item", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended please login again");
  }
}

// clear items from cart
export async function clearAllItems() {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart`,
        {
          method: "DELETE",
          headers: { token: userToken },
        },
      );

      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from delete item", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return new Error("session ended please login again");
  }
}



// update product from count
export async function updateProductCount(productId: string , count : number ) {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
          method: "PATCH",
          headers: { token: userToken ,  "content-type": "application/json"  },
         body: JSON.stringify({ count: count }),

        },
      );

      if (res.ok) {
        const finalRes = await res.json();
        console.log("finalRes from update count", finalRes);
        revalidatePath("/cart");
        return finalRes.numOfCartItems;
      } else {
        console.error("Failed to update count:", res.status, res.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error updating count:", error);
      return false;
    }
  } else {
    console.error("No user token found for update count");
    return false;
  }
}
