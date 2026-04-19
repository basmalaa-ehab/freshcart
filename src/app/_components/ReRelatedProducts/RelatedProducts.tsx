"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { FaArrowLeft, FaArrowRight, FaHeart, FaRegHeart, FaRegStar, FaRegEye, FaStar } from "react-icons/fa";
import { FaArrowsRotate, FaRegStarHalfStroke } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward, IoMdCheckmark } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { ProductType } from "_/api/services/types";
import ProductCard from "../ProductCard/ProductCard";

interface RelatedProductsProps {
  relatedProducts: ProductType[];
}

export default function RelatedProductsSlider({
  relatedProducts,
}: RelatedProductsProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

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

  const getDiscountPercentage = (product: ProductType) => {
    if (!product.priceAfterDiscount) return 0;

    return Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );
  };

  if (!relatedProducts?.length) {
    return null;
  }









  return (
    <div className="mt-10">

      {/* Header + Arrows */}
      <div className="flex justify-between items-center mb-4">
       <div className="flex items-center gap-2 px-4 my-8">
              <div className="bg-linear-to-b from-[#00BC7D] to-[#007A55] w-1.5 h-7.5 rounded-2xl"></div>{" "}
              <h2 className="font-bold text-xl md:text-3xl text-[#1E2939]">
              You May Also Like

           
              </h2>
            </div>

        <div className="flex gap-2">
          <button ref={prevRef} className="custom-prev bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
            <IoIosArrowBack
             />

          </button>

          <button ref={nextRef} className="custom-next bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
           <IoIosArrowForward />

          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={5}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && swiper.params.navigation !== true) {
            const navigation = swiper.params.navigation as any;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
            320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
      >
        {relatedProducts?.map((product) => (
          <SwiperSlide key={product._id}>

         <ProductCard product={product} />
       

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}