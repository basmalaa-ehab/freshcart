import { getAllBrands } from "_/api/services/route.services";
import Link from "next/link";
import React from "react";
import { FaTags } from "react-icons/fa";
import BrandCard from "../_components/BrandCard/BrandCard";
import { BrandType } from "_/api/services/types";
interface BrandCardProps {
  brand: BrandType;
}
export const metadata = {
  title: {
    default: "Fresh Cart | All Brands",
  },
};
export default async function brands() {
  const allBrands = await getAllBrands();

  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <FaTags className="text-3xl" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h3>
              <p className="text-white/80 mt-1">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4  lg:grid-cols-6   gap-6 py-8 px-4     mx-auto container ">
          {allBrands?.map((brand) => (
            <BrandCard brand={brand} key={brand._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
