import { getUserWishlist } from "_/api/services/route.services";
import Link from "next/link";
import { IoIosHeart } from "react-icons/io";
import AddProductFromWishListToCar from "../_components/AddProductFromWishListToCar";
import EmptyWishlist from "./EmptyWishlist";
import RemoveFromWishlistButton from "./RemoveFromWishlistButton";

export default async function WishlistPage() {
  

  const userWishlist = await getUserWishlist();
  const products = userWishlist?.data ?? [];
  if (!products.length) {
    return <EmptyWishlist />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link href={"/"} className="hover:text-green-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Wishlist</span>
        </nav>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <IoIosHeart className="text-xl text-red-500" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 text-sm">
                {products.length} items saved
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
              >
                {/* product */}
                <div className="md:col-span-6 flex items-center gap-4">
                  <Link
                    href={`/products/${product._id}`}
                    className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </Link>

                  <div className="min-w-0">
                    <Link
                      href={`/products/${product._id}`}
                      className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                    >
                      {product.title}
                    </Link>

                    <p className="text-sm text-gray-400 mt-1">
                      {product.category?.name}
                    </p>
                  </div>
                </div>

                {/* price */}
                {/* <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                  <span className="md:hidden text-sm text-gray-500">
                    Price:
                  </span>
                  <div className="font-semibold text-gray-900">
                    {product.price} EGP
                  </div>
                </div> */}

                <div className=" md:col-span-2 flex md:justify-center items-center gap-2 ">
                  {product.priceAfterDiscount ? (
                    <div className="gap-[5.5px] ">
                      <div className=" text-right md:text-center ">
                        <span className="   font-bold text-lg/[28px] items-center justify-center gap-1 flex">
                          {" "}
                          {`${product.priceAfterDiscount}`} EGP
                        </span>
                        <span className="line-through text-[#6A7282] font-medium text-sm/[20px] gap-1">
                          {`${product.price}`} <span>EGP</span>{" "}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[#1E2939] font-bold text-lg/[28px] ">
                      {product.price} EGP{" "}
                    </span>
                  )}
                </div>

                {/* status */}
                <div className="md:col-span-2 flex md:justify-center">
                  <span className="text-xs text-green-600">In Wishlist</span>
                </div>

                {/* actions */}
                <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                  <AddProductFromWishListToCar
                    id={product._id!}
                    className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    Add to Cart
                  </AddProductFromWishListToCar>

                  {/* delete from wishlist button */}
                  <RemoveFromWishlistButton id={product.id} />

                  {/* <button className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50">
                    <FaTrash />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" mt-0 md:mt-6 px-4 mx-axuto flex items-center justify-between">
        <Link
          href="/products"
          className="text-gray-500 hover:text-green-600 text-sm font-medium transition-colors"
        >
          {" "}
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
