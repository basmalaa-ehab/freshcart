"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";

type Props = {
  images: string[];
};

export default function MySliders({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div>
      {/* Main Slider */}
      <Swiper
        modules={[Thumbs, Navigation]}
        
          spaceBetween={10}

        thumbs={{ swiper: thumbsSwiper }}
        className="mb-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              className="w-full object-cover rounded-lg"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
    <Swiper
  onSwiper={setThumbsSwiper}
  modules={[Thumbs, FreeMode]}
  spaceBetween={8}
  slidesPerView={3}
  freeMode
  grabCursor
  slideToClickedSlide
  watchSlidesProgress
  className="w-full" 
>
  {images.map((img, index) => (
    <SwiperSlide key={index} className="!w-[90px]">
      <img
        src={img}
        className="cursor-pointer rounded-md  border-4 border-transparent p-1  hover:border-blue-900 hover:border-4 transition-all"
        alt=""
      />
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}