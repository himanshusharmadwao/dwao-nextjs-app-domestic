"use client"

import styles from './TestimonialCarousel.module.css'
import { SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";
// import { Pagination } from 'swiper/modules';
import { Navigation, Pagination } from "swiper/modules";
import { memo } from 'react';
import dynamic from 'next/dynamic';

const TestimonialCarouselFallback = () => (
  <div className="w-full h-[150px] bg-gray-200 animate-pulse"></div>
);

// Dynamically import Swiper with no SSR
const SwiperNoSSR = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  // ssr: false,
  loading: () => <TestimonialCarouselFallback />,
});

const TestimonialCarousel = ({ slides, slider }) => {

  if (!slides?.length) return <TestimonialCarouselFallback />;

  return (
    <>
      <SwiperNoSSR
        slidesPerView={1}
        spaceBetween={30}
        pagination={slider === "review" ? { clickable: true } : false}
        navigation={true}
        modules={[Navigation, Pagination]}
        className={styles.mySwiper}
        breakpoints={{
          500: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>{slide}</SwiperSlide>
          )
        })}
      </SwiperNoSSR>
    </>
  );
}

export default memo(TestimonialCarousel)