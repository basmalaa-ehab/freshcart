import { getSpecificBrand } from "_/api/services/route.services";
import React from "react";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const brandDetail = await getSpecificBrand(id);

  console.log("brandDetail", brandDetail);

  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link href="/brands" className="text-white font-medium">
              Brands
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{brandDetail?.name}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <img
                src={brandDetail?.image}
                alt={brandDetail?.name}
                className="w-10 h-10 object-contain"
              />{" "}
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {brandDetail?.name}
              </h3>
              <p className="text-white/80 mt-1">{brandDetail?.slug}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
