import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { TiHome } from "react-icons/ti";

export default function notfound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center  pt-6">
      <div className="max-w-md text-center">
        <div className=" mb-8 text-center">
          {/* <div className="bg-linear-to-r rounded-full mb-3  from-green-50  flex items-center justify-center to-green-100">
  <div className="flex items-center justify-center">
    <FaShoppingCart className="text-green-600 text-4xl" />
  </div>
</div> */}
          <h2 className="text-4xl sm:text-5xl font-bold   text-gray-900 mb-4 tracking-tight">
            Oops! Nothing Here
          </h2>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md mx-auto text-wrap px-6 md:px-0">
            Looks like this page went out of stock! Don't worry, there's plenty
            more fresh content to explore.
          </p>
          <div className=" flex flex-col sm:flex-row items-center justify-center gap-4 py-5">
            <Link
              href="/"
              className="text-nowrap   group  inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1"
            >
                <TiHome className="group-hover:scale-110 transition-transform duration-300"/>

         Go to Homepage

            </Link>

<Link href="/" className=" group   inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:-translate-y-1" >
<FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />

Go Back

</Link>



          </div>
        </div>


        <div className="      pb-3">

<p className=" text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
    Popular Destinations


</p>

<div className="grid grid-cols-2 md:flex items-center justify-center gap-2 py-4 px-3">
  
  <Link
    href="/AllProducts"
    className="px-5 py-2.5 text-nowrap rounded-xl bg-green-50 text-green-700 font-semibold text-sm hover:bg-green-100 transition-colors"
  >
    All Products
  </Link>

  <Link
    href="/AllProducts"
    className="px-5 py-2.5 rounded-xl bg-gray-100 text-nowrap text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
  >
    Categories
  </Link>

  <Link
    href="/AllProducts"
    className="px-5 py-2.5 rounded-xl bg-gray-100 text-nowrap text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
  >
    Today's Deals
  </Link>

  <Link
    href="/AllProducts"
    className="px-5 py-2.5 rounded-xl bg-gray-100 text-nowrap text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
  >
    Contact Us
  </Link>

</div>

        </div>
      </div>
    </div>
  );
}
