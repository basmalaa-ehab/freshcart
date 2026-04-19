import { decodeAuthenticatedUserToken, getAuthenticatedUserId } from "_/app/utils";
import { BrandType, cartResponse, category, ProductType, WishlistResponse } from "./types";

export async function getAllProducts(): Promise<ProductType[] | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
    const finalResult = await res.json();
    //  console.log('finalResult' , finalResult.data);
    return finalResult.data;
  } catch (error) {
    console.log("error", error);
  }
}

// getproductDetailsss function

export async function getSpecificProduct(
  id: string,
): Promise<ProductType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    const finalResult = await res.json();
    // console.log("finalResult", finalResult.data);
    return finalResult.data;
  } catch (error) {
    console.log("error", error);
  }
}



// getReviewsForProduct
export async function getReviewsForProduct(id: string): Promise<any | undefined> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`);
    const finalResult = await res.json();
    //  console.log('finalResult' , finalResult.data);
    return finalResult.data;
  } catch (error) {
    console.log("error", error);
  }
}






// get all catigories

export async function getAllCategories(): Promise<category[] | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories`,
    );
    const finalResult = await res.json();
    // console.log("finalResult", finalResult.data);
    return finalResult.data;
  } catch (error) {
    console.log("error", error);
  }
}




// get user cart
export async function getUserCart(): Promise<cartResponse | undefined> {
  const userToken = await decodeAuthenticatedUserToken();
  if (userToken) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        headers: { token: userToken },
      });
      const finalResult = await res.json();
      // console.log("finalResult of cart", finalResult.data);
      return finalResult.data;
    } catch (error) {
      console.log("error", error);
    }
  } else {
    return undefined;
    //  new Error("session ended please login again")
  }
}

// get user wishlist
// export async function getUserWishlist(): Promise<WishlistResponse | undefined> {
//   const userToken = await decodeAuthenticatedUserToken();
//   if (userToken) {
//     try {
//       const res = await fetch(
//         `https://ecommerce.routemisr.com/api/v1/wishlist
// `,
//         {
//           method: "GET",
//           headers: { token: userToken },
//         },
//       );

//       if (res.ok) {
//         const finalRes = await res.json();
//         console.log("finalRes from wishList", finalRes);
//         // revalidatePath("/cart");
//         return finalRes;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   } else {
//     return new Error("session ended please login again");
//   }
// }
export async function getUserWishlist(): Promise<WishlistResponse | undefined> {
  const userToken = await decodeAuthenticatedUserToken();

  if (!userToken) {
    return undefined;
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "GET",
        headers: { token: userToken },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    const finalRes: WishlistResponse = await res.json();
    return finalRes;
  } catch (error) {
    // console.log("error", error);
    return undefined;
  }
}


// get all brands

export async function getAllBrands() {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
    const finalResult = await res.json();
    //  console.log('finalResult from brands' , finalResult.data);
    return finalResult.data;
  } catch (error) {
    // console.log("error", error);
  }
}


// get specific brand details
export async function getSpecificBrand(
  id: string,
): Promise<BrandType | undefined> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    );
    const finalResult = await res.json();
    // console.log("finalResult from specific brand", finalResult.data);
    return finalResult.data;
  } catch (error) {
    // console.log("error", error);
  }
}


// get user orders

export async function GetUserOrders() {
  const userId = await getAuthenticatedUserId();
  const userToken = await decodeAuthenticatedUserToken();

  if (!userId || !userToken) {
    return new Error("session ended please login again");
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      method: "GET",
      headers: { token: userToken },
    });

    if (res.ok) {
      const finalRes = await res.json();
      // console.log("finalRes from user orders", finalRes);
      return finalRes;
    } else {
      return new Error("Failed to fetch user orders");
    }
  } catch (error) {
    // console.log("error", error);
    return new Error("Something went wrong while fetching orders");
  }
}

