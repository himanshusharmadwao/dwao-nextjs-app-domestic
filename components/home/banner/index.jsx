"use client"

import Image from "next/image";
import styles from "./Banner.module.css";
import ExtendLink from "../../ui/extendLink";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { breakTitle, getImageUrl} from "@/libs/utils";

// Dynamically import Swiper with no SSR
const SwiperNoSSR = dynamic(() => import("swiper/react").then(mod => mod.Swiper), {
    // ssr: false,
    loading: () => <BannerFallback />,
});

// Fallback component while Swiper is loading
const BannerFallback = () => (
    <div className="w-full h-[700px] bg-gray-200"></div>
);

const Banner = ({ data, isMobile }) => {

    // console.log(data);
    // console.log(isMobile);

    return (
        <section aria-label="Feature Banner" className="w-full mx-auto relative">
            <SwiperNoSSR
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                effect="fade"
                loop={true}
                className="relative w-full"
                pagination={{
                    el: ".custom-pagination",
                    clickable: true,
                    renderBullet: (index, className) => {
                        return `<div class="${className} custom-bullet">
                            <span>${data[index].navLabel}</span>
                        </div>`;
                    },
                }}
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index} className="relative w-full">
                        {isMobile && item.mobileImg?.url ? (
                            <div className="relative aspect-[7/10] lg:hidden">
                                <Image
                                    src={getImageUrl(item.mobileImg)}
                                    alt={item.title || "Banner Image"}
                                    fill
                                    priority={index === 0}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    quality={75}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        ) : item.deskImg?.url ? (
                            <div className="relative aspect-[15/7] hidden lg:block">
                                <Image
                                    src={getImageUrl(item.deskImg)}
                                    alt={item.title || "Banner Image"}
                                    fill
                                    priority={index === 0}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    quality={75}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-[500px] bg-gray-200"></div>
                        )}



                        <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
                        <div className="absolute lg:top-[25%] top-[15%] left-1/2 transform -translate-x-1/2 max-w-[1200px] w-[90%] z-10">
                            <h2 className="lg:text-[3.5vw] text-[26px] leading-[1.2] text-white">{breakTitle(item.title)}</h2>
                            {/* <h2 className="lg:text-[3.5vw] text-[26px] leading-[1.2] text-white">{item.subtitle}</h2> */}
                            <ExtendLink title={item.linkTitle} href={item.linkHref} className="text-white text-[20px]" aria-label="Learn more about our work" />
                        </div>
                    </SwiperSlide>
                ))}
                {/* Custom Pagination */}
                <div className={`custom-pagination ${styles.customPagi}`}></div>
            </SwiperNoSSR>

        </section>
    );
};

export default Banner;