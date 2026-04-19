import { getUserCart } from "_/api/services/route.services";
import { cartResponse } from "_/api/services/types";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import ClearAllItemsFromCart from "./ClearAllItemsFromCart";
import EmptyCart from "./EmptyCart";
import OrderSummaryCart from "./OrderSummaryCart";
import RemoveProductButton from "./RemoveProductButton";
import UpdateProductCountButton from "./UpdateProductCountButton";
export const metadata = {
  title: {
    default: "Cart",
  },
};
export default async function Cart() {
  const userCart = await getUserCart();

  console.log(userCart);

  if (!userCart) {
    return <EmptyCart />;
  }
  const { totalCartPrice, products, _id } = userCart as cartResponse;

  if (!products || products.length === 0) {
    return <EmptyCart />;
  }

  // total items
  const totalItems = products.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  {" "}
                  <FaShoppingCart />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 font-medium mt-2 mb-8">
                You have
                <span className="font-semibold text-green-600 px-1    ">
                  {" "}
                  {totalItems}
                  <span> items</span>{" "}
                </span>
                in your cart
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl py-3  shadow-sm border border-gray-100 p-4 sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      <Link
                        className="relative shrink-0 group"
                        href={`/products/${item.product._id}`}
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden">
                          <img
                            src={item.product.imageCover}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            alt={item.product.title}
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-2">
                          <Link href={`/products/${item.product._id}`}>
                            <h3 className="font-semibold overflow-hidden text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg">
                              {item.product.title}
                            </h3>
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 ">
                          <span className="inline-block px-2.5 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                            {item.product.category.name}
                          </span>
                        </div>
                        {/* price */}
                        <div className="py-3">
                          <span className="text-green-600 font-bold text-lg">
                            {item.price} EGP
                          </span>
                        </div>
                        {/* quantity */}

                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          <div className="cursor-pointer flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                            {/* <button
                              disabled
                              className="cursor-pointer h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
                            >
                              <HiMinus />
                            </button> */}

                            <UpdateProductCountButton
                              id={item.product.id}
                              count={item.count - 1}
                            />
                            <span className="w-12 text-center font-bold text-gray-900">
                              {item.count}
                            </span>
                            {/* <button className="h-8 w-8 rounded-lg bg-green-600 shadow-sm flex items-center justify-center text-white hover:bg-green-700 transition-all cursor-pointer">
                              <GoPlus />
                            </button> */}

                            <UpdateProductCountButton
                              id={item.product.id}
                              count={item.count + 1}
                              isIncrement
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right  ">
                              <p className="text-xs text-gray-400 mb-0.5">
                                Total
                              </p>
                              <p className="text-xl font-bold text-gray-900 ">
                                <span className="mr-1">
                                  {" "}
                                  {item.price * item.count}
                                </span>
                                <span className="text-sm font-medium text-gray-400">
                                  EGP
                                </span>
                              </p>
                            </div>
                            <RemoveProductButton id={item.product.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2"
                >
                  <span>←</span>
                  Continue Shopping
                </Link>
                <ClearAllItemsFromCart />
              </div>
            </div>
            {/* order smmary */}
            {/* <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
                <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>
                      <FaShoppingBag />
                    </span>
                    Order Summary
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    {totalItems} items in your cart
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FaTruck className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-700">
                        Free Shipping!
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        You qualify for free delivery
                      </p>
                    </div>
                  </div>





<div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">

<div className="flex items-center gap-2 mb-2">
  <div className="flex items-center gap-2 mb-2">
  <FaTruck className="text-orange-500" />
<span className="text-sm font-medium text-gray-700">Add 202 EGP for free shipping
</span>
  </div>





  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
    <div className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500" style={{ width: '59.6%' }}></div>
  </div>





</div>
</div>







                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-semibold"> {totalCartPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="font-medium">Shipping</span>
                    <span className="font-medium text-green-600">
                      Calculated at checkout
                    </span>
                  </div>
                  <hr className="border-gray-200 " />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Estimated Total</span>
                    <span className="text-green-600"> {totalCartPrice}</span>
                  </div>
                  <div className="pt-4 space-y-3">
                    <Link
                      href={"/Login"}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-all"
                    >
                      <FaUser />
                      Login to Checkout
                    </Link>
                    <p className="text-xs text-gray-400 text-center">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="text-green-600 hover:underline"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>

                  <ul className="pt-4 border-t border-gray-100 space-y-2">
                    <li className="text-xs text-gray-500">
                      ✓ Your cart items will be saved
                    </li>
                    <li className="text-xs text-gray-500">
                      ✓ Track your orders easily
                    </li>
                    <li className="text-xs text-gray-500">
                      ✓ Access exclusive member deals
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

            <OrderSummaryCart
              totalItems={totalItems}
              totalCartPrice={totalCartPrice}
              _id={_id}
              // cartId={item.cartId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
