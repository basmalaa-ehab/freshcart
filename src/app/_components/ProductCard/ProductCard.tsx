import Link from "next/link";
import {
  FaHeart,
  FaRegEye,
  FaRegHeart,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { FaArrowsRotate, FaRegStarHalfStroke } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import AddToCartButton from "./../AddToCartButton/AddToCartButton";
import AddToWishlistButton from "./../AddToWishlistButton/AddToWishlistButton";
import { ProductCrtProps } from "./Productcart.types";
import { Children } from "react";
import { ProductType } from "_/api/services/types";

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} />);
  }

  if (hasHalfStar) {
    stars.push(<FaRegStarHalfStroke key="half" />);
  }

  const emptyStars = 5 - stars.length;

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} />);
  }

  return stars;
};

function getDiscountPercentage(product: ProductType) {
  if (!product.priceAfterDiscount) return 0;

  return Math.round(
    ((product.price - product.priceAfterDiscount) / product.price) * 100,
  );
}

export default function ProductCard({ product }: ProductCrtProps) {
  return (
    <div>
      <div
        className="productCard   border border-[#E5E7EB]  rounded-[8px] overflow-hidden pb-6 shadow-sm 
hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]
hover:-translate-y-2 
transition duration-300"
      >
        <div className="relative image-wrapper ">
          <img
            className="w-full h-60 object-contain bg-white"
            src={product.imageCover}
            alt={product.title}
          />
          {/* image actions */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2   ">
            <AddToWishlistButton
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm"
              id={product._id!}
              afterAddContent={
                <span className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-red-500 hover:text-primary-600 shadow-sm">
                  <FaHeart />
                </span>
              }
            >
              <FaRegHeart className="" />
            </AddToWishlistButton>

            <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm">
              <FaArrowsRotate />
            </button>

            <Link
              className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm"
              href={`/products/${product._id}`}
            >
              <FaRegEye />
            </Link>
          </div>

          {/* imge descount */}
          <div className="absolute top-3 left-3">
            {product.priceAfterDiscount && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                {getDiscountPercentage(product)}% OFF
              </span>
            )}
          </div>
        </div>
        {/* content title, price ... */}
        <div className="card-content px-4">
          <h3 className="font-medium text-sm-[16px] text-[#6A7282] pt-4 ">
            {product.category.name}
          </h3>

          <h3 className="pb-4 text-[#364153] font-medium text-base-[16px] ">
            {product.title.split(" ", 2).join(" ")}
          </h3>

          {/* rating */}

          <div className="flex flex-row items-center pb-3.5">
            <div className="text-[#FCC800] flex pr-2 gap-[0.75px] text-xl">
              {renderStars(product.ratingsAverage)}
            </div>

            <div className="font-medium text-sm/[16px] text-[#6A7282] pr-0.5">
              {product.ratingsAverage}
            </div>

            <div className="font-medium text-sm/[16px] text-[#6A7282]">
              ({product.ratingsQuantity})
            </div>
          </div>

          {/* price */}

          <div className="flex justify-between   items-center pb-5">
            <div className="  ">
              {product.priceAfterDiscount ? (
                <div className="gap-[5.5px]">
                  <div className="flex flex-row gap-[7.69px] items-center  ">
                    <span className="   font-bold text-lg/[28px] text-[#16A34A] gap-1 flex">
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
            <AddToCartButton
              id={product._id!}
              className="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
              afterAddContent={
                <span className="flex items-center justify-center">
                  <IoMdCheckmark />
                </span>
              }
            >
              <FiPlus />
            </AddToCartButton>
            {/* <AddToCartButton id={product?._id!} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
