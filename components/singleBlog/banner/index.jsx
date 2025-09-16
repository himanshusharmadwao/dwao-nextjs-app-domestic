"use client"

import Image from 'next/image'
import React from 'react'
import { getImageUrl } from '@/libs/utils';
import ToastNotification, { toastStyle } from '@/components/toastNotification';
import { toast } from 'react-toastify';


const Banner = ({ data }) => {

    const date = new Date(data?.publishedAt);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    }).format(date);

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast("Link copied to clipboard", toastStyle);
        } catch (err) {
            console.error("Failed to copy URL:", err);
            toast.error("Failed to copy link", toastStyle);
        }
    };


    return (
        <>
            <div className={`bg-cover bg-no-repeat bg-center w-full lg:h-[90vh] h-[60vh] relative`} style={{ backgroundImage: `url(${getImageUrl(data?.featuredImage)})` }}>
                <div className="absolute top-0 left-0 bg-black/55 w-full h-full "></div>
                <div className="container h-full">
                    {/* absolute top-1/2 left-[5%] transform -translate-y-1/2 */}
                    <div className="w-[90%] lg:w-1/2 h-full z-10 relative flex items-center">
                        <div>
                            <p className='uppercase text-[#ddd] text-[14px] lg:text-[20px] lg:mb-6 mb-2'>{data?.category?.name} | {data?.sub_category?.name}</p>
                            <h1 className='text-[24px] lg:text-[42px] leading-[1.5] text-white lg:mb-6 mb-2'>
                                {data?.title}
                            </h1>
                            <p className='text-[16px] lg:text-[18px] font-bold text-white lg:mb-4 mb-2'>Streamline lead management by integrating your CRM</p>
                            <p className='text-[18px] font-bold text-white lg:mb-4 mb-2'>By {data?.author?.name}</p>
                            <p className='text-[18px] text-white'>{formattedDate} | 5 Minutes | <Image src="/icons/share.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={copyUrl} /> | <Image src="/icons/print.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={() => window.print()} /></p>
                        </div>
                    </div>
                </div>
                <ToastNotification />
            </div>
        </>
    )
}

export default Banner