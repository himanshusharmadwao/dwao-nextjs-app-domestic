"use client"

import styles from './StudyCarousel.module.css'
import { SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { memo } from 'react';
import dynamic from 'next/dynamic';
// import { Pagination } from 'swiper/modules';

const StudyCarouselFallback = () => (
  <div className="w-full h-[150px] flex items-center justify-center">
    No Post Found!
  </div>
);

// Dynamically import Swiper with no SSR
const SwiperNoSSR = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  // ssr: false,
  loading: () => <StudyCarouselFallback />,
});

const StudyCarousel = ({ slides, slider="" }) => {

  if (!slides?.length) return <StudyCarouselFallback />;

  return (
    <>
      <SwiperNoSSR
        slidesPerView={1.25}
        spaceBetween={30}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        className={styles.mySwiper}
        breakpoints={{
          500: {
            slidesPerView: slider === "related-card" || slider === "related-case-studies" ? 2 : 2.5,
          },
          992: {
            slidesPerView: slider === "related-card" || slider === "related-case-studies" ? 3 : 3.5,
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

export default memo(StudyCarousel)