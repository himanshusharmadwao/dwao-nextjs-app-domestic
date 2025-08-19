"use client";

import styles from "./ImgCarousel.module.css";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import { memo, useRef, useState } from "react";
import VideoModal from "../VideoModal";
import { getImageUrl } from "@/libs/utils";

const ImgCarouselFallback = () => (
  <div className="w-full h-[150px] bg-gray-200 animate-pulse"></div>
);

// Dynamically import Swiper with no SSR
const SwiperNoSSR = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <ImgCarouselFallback />,
});

const ImgCarousel = ({ slides, resConf, slider }) => {
  const { mobile, tab, desktop } = resConf;

  const [videoUrl, setVideoUrl] = useState(null);
  const swiperRef = useRef(null);

  if (!slides?.length) return <ImgCarouselFallback />;

  return (
    <div className="relative">
      <SwiperNoSSR
        slidesPerView={mobile}
        spaceBetween={5}
        loop={true}
        navigation={slider === "company_events" || slider === "social_impact"}
        pagination={slider === "company_events" || slider === "social_impact" ? { clickable: true } : false}
        freeMode={true}
        modules={[FreeMode, Navigation, ...(slider === "company_events" || slider === "social_impact" ? [Pagination] : [])]}
        className={slider === "company_events" || slider === "social_impact" ? styles.mySwiper : ""}
        breakpoints={{
          500: { slidesPerView: tab },
          992: { slidesPerView: desktop },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((item, index) => (
          <SwiperSlide key={index}>
            {item.type === "video" ? (
              <div
                className="relative cursor-pointer"
                onClick={() => setVideoUrl(item.videoLink)}
              >
                <Image
                  src={getImageUrl(item.thumbnail)}
                  alt="Video Thumbnail"
                  width={100}
                  height={100}
                  priority={index === 0}
                  className="p-4 w-full h-auto object-cover"
                />
                {/* Play Button */}
                <div className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 bg-black/40 hover:scale-[1.1]">
                  <svg
                    className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <Image
                src={getImageUrl(item.image)}
                alt="Team's Image"
                width={100}
                height={100}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="p-4 w-full h-auto object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </SwiperNoSSR>

      {/* Custom Navigation Buttons */}
      {slider === "team_collaboration" && (
        <>
          <button
            className="absolute top-[-70px] right-[90px] z-10 p-2 outline-none cursor-pointer"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image src="/icons/left-icon.svg" height={20} width={20} alt="missing image" />
          </button>

          <button
            className="absolute top-[-70px] right-[40px] z-10 p-2 outline-none cursor-pointer"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image src="/icons/left-icon.svg" height={20} width={20} alt="missing image" className="rotate-180" />
          </button>
        </>
      )}

      {/* Video Modal */}
      {videoUrl && <VideoModal videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />}
    </div>
  );
};

export default memo(ImgCarousel);
