"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

type SlideType = {
  image: string;
  title: string;
  subtitle: string;
    btn1: string;
  btn2: string;
};

export default function MySwipper({ slides }: { slides: SlideType[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      loop
      navigation={{
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      }}
      pagination={{
        clickable: true,
        renderBullet(index, className) {
          return `<span class='${className} bg-white! mb-1!'></span>`;
        },
        bulletActiveClass: "w-6! bg-white! opacity-100! rounded-full!",
      }}
    >
      <div className="custom-prev text-xl! absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <IoIosArrowBack />
      </div>

      <div className="custom-next text-xl! absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-10 h-10 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <IoIosArrowForward />
      </div>

      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <img src={slide.image} className="w-full lg:h-100 object-cover" alt={slide.title} />

          {/* overlay + text */}
          <div className="absolute inset-0 overlay py-0 md:py-21 text-white px-6 md:px-12 lg:px-20 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
            <div className="container h-full content-center p-0 lg:px-21.5 lg:pt-8.5 lg:pb-31">
              <h2 className="text-white text-2xl md:text-3xl font-bold  max-w-96">{slide.title}</h2>
              <p className="opacity-100 transform-none">{slide.subtitle}</p>

<div className="flex   mt-4">
      <Link href={'/allProduts'} className="btn cursor-pointer  bg-white hover:scale-105 transition-transform text-[#00C950] text-sm md:text-base text-nowrap px-3 py-3 md:px-6 md:py-2 rounded-[8px] font-semibold" >
        {slide.btn1}
      </Link>

      <button  className="btn cursor-pointer bg-transparent border-2 border-white/50 text-white  inline-block text-sm md:text-base ml-2 text-nowrap px-3 py-1 md:px-6 md:py-2 rounded-[8px] font-semibold hover:scale-105 transition-transform">
        {slide.btn2}
      </button>
    </div>


            </div>

    

            </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
