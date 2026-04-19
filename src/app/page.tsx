// import React from "react";

import { default as image1, default as image2, default as image3 } from "@images/HomeImage.png";
import { getAllProducts } from "_/api/services/route.services";
import MySwipper from "./_components/Myswipper/MySwippper";
import ProductCard from "./_components/ProductCard/ProductCard";

import Link from "next/link";
import { lazy, Suspense } from "react";
import {
  FaArrowRightLong
} from "react-icons/fa6";
import LoadingCard from "./_components/LoadingCard/LoadingCard";
import HeroSection from "./HomePageHeroSection/HeroSection";
export const metadata = {
  title: {
    default: "Fresh Cart | All Products",
  },
};
export default async function HomePage() {
  const allProducts = await getAllProducts();

  const CategoriesPreviewAsLazyLoadingComponent = lazy(
    () => import("./_components/CategoriesPreview/CategoriesPreview"),
  );

  return (
    <>
      <div className="pt-0!">
        <div className="relative">
          <MySwipper
            slides={[
              {
                image: image1.src,
                title: "Fresh Products Delivered to your Door",
                subtitle: "Get 20% off your first order",
                btn1: "Shop Now",
                btn2: "View Products",
              },
              {
                image: image2.src,
                title: "Premium Quality Guaranteed",
                subtitle: "Fresh from farm to your table",
                btn1: "Shop Now",
                btn2: "Learn More",
              },
              {
                image: image3.src,
                title: "Fast & Free Delivery",
                subtitle: "Same day delivery available",
                btn1: "Order Now ",
                btn2: "Delivery Info",
              },
            ]}
          />
        </div>

        {/* shipping info  */}
        <div className=" bg-[#F9FAFB] border-t border-gray-100 px-4 py-6">
          <HeroSection />
        </div>

        {/* CategoriesPreview */}

        <div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mt-6 px-4 ">
            <div className="flex items-center gap-2 px-4 my-8">
              <div className="bg-linear-to-b from-[#00BC7D] to-[#007A55] w-1.5 h-7.5 rounded-2xl"></div>{" "}
              <h2 className="font-bold text-2xl md:text-3xl ">
                <span className="text-[#1E2939]">Shop By</span>{" "}
                <span className="text-[#009966]">Category</span>
              </h2>
            </div>

            <Link
              href={"categoriesSection"}
              className="text-green-600 self-end sm:self-auto hover:text-green-700 font-medium flex items-center cursor-pointer"
            >
              View All Categories
              <FaArrowRightLong />
            </Link>
          </div>

          <Suspense fallback={<LoadingCard />}>
            <CategoriesPreviewAsLazyLoadingComponent />
          </Suspense>
        </div>

        {/* offerrs code cards*/}
        <section className="pb-22">
          <div className="mx-auto container px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="slide-left relative overflow-hidden rounded-2xl  bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute  bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  {" "}
                  <span>🔥</span>
                  <span>Deal of the Day </span>{" "}
                </div>

                <h3 className="text-xl md:text-3xl font-bold mb-2">
                  Fresh Organic Fruits
                </h3>
                <p className="text-white/80 mb-4  text-sm/[24px]  font-medium">
                  Get up to 40% off on selected organic fruits
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="md:text-3xl text-xl text-nowrap font-bold">
                    40% OFF
                  </div>
                  <div className="text-xs text-white/70 text-nowrap flex gap-1.5">
                    Use code:
                    <span className="font-bold text-white">ORGANIC40</span>
                  </div>
                </div>

                <Link
                  href={"/allProducts"}
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now <FaArrowRightLong />
                </Link>
              </div>

              {/* card2 */}

              <div className="slide-right relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute  bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  {" "}
                  <span>✨</span>
                  <span>New Arrivals</span>{" "}
                </div>

                <h3 className="text-xl md:text-3xl font-bold mb-2">
                  Exotic Vegetables
                </h3>
                <p className="text-white/80 mb-4 text-sm/[24px]  font-medium">
                  Discover our latest collection of premium vegetables
                </p>

                <div className="flex  items-center gap-4 mb-6">
                  <div className="md:text-3xl text-xl font-bold text-nowrap">
                    25% OFF
                  </div>
                  <div className="text-sm text-white/70  text-nowrap flex gap-1.5">
                    Use code:
                    <span className="font-bold text-white"> FRESH25</span>
                  </div>
                </div>

                <Link
                  href={"/allProducts"}
                  className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Explore Now
                  <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* allproducts */}
        <div className="flex items-center gap-2 px-7">
          <div className="bg-linear-to-b from-[#00BC7D] to-[#007A55] w-1.5 h-7.5 rounded-2xl "></div>{" "}
          <h2 className="font-bold text-2xl md:text-3xl ">
            <span className="text-[#1E2939]">Featured</span>{" "}
            <span className="text-[#009966]">Products</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-4  lg:grid-cols-5   gap-6 py-8 px-4     mx-auto container ">
          {allProducts?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
}
