"use client"

import Image from 'next/image'
import React from 'react'
import { getImageUrl } from '@/libs/utils';
import ToastNotification, { toastStyle } from '@/components/toastNotification';
import { toast } from 'react-toastify';

const Banner = ({ data }) => {
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
            <div className="bg-cover bg-no-repeat bg-center w-full h-[80vh] lg:h-[90vh] relative" style={{ backgroundImage: `url(${getImageUrl(data.featuredImage)})` }}>
                <div className="absolute top-0 left-0 bg-black/55  w-full h-full "></div>
                <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 w-[90%] lg:w-[55%]">
                    <p className='uppercase text-[#ddd] text-[14px] lg:text-[20px] mb-2 mt-8'>{data.category.name} | {data.sub_category.name}</p>
                    <h1 className='text-head-large leading-[1.15] text-white mb-6'>
                        {data.title}
                    </h1>
                    <p className='text-[18px] text-white'><Image src="/icons/share.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={copyUrl} /> {'\u00A0'.repeat(4)} <Image src="/icons/print.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={() => window.print()} /> {'\u00A0'.repeat(4)} <Image src="/icons/save.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={() => window.print()} /></p>
                </div>
                <ToastNotification />
            </div>
        </>
    )
}

export default Banner