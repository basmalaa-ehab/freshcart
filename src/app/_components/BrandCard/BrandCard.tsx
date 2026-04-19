import Link from "next/link";
import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { BrandType } from "_/api/services/types";

interface BrandCardProps {
  brand: BrandType;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
      <Link
        href={`/brands/${brand._id}`}
        className="group bg-white rounded-2xl  border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
          <img
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            alt={brand.name}
            src={brand.image}
          />
        </div>

        <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-green-600 transition-colors truncate">
          {brand.name}
        </h3>

        <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-green-600 flex items-center gap-1">
            View Products <MdArrowRightAlt />
          </span>
        </div>
      </Link>
  );
}
