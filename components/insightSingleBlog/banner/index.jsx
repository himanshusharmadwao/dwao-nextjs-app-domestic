"use client"

import Image from 'next/image'
import React from 'react'
import ToastNotification, { toastStyle } from '@/components/toastNotification';
import { toast } from 'react-toastify';
import styles from './Banner.module.css'
import { getImageUrl } from '@/libs/utils';

const Banner = ({ data }) => {

    // console.log("Insight data: ", data)

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
            <div className="bg-cover bg-no-repeat bg-center w-full h-[50vh] lg:h-[90vh] relative" style={data?.featuredImage?.url && { backgroundImage: `url(${getImageUrl(data?.featuredImage)})` }}>
                <div className="absolute top-0 left-0 bg-black/55  w-full h-full "></div>
                <div className='flex items-center absolute top-1/2 left-[5%] w-[90%] transform -translate-y-1/2'>
                    <div className="basis-1/2 hidden lg:block">
                        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Header Section */}
                            <div className="bg-[var(--mainColor)] text-white p-6 flex items-center justify-center">
                                {data?.brandLogo && (
                                    <div className="h-[50px] w-[140px] relative">
                                        <Image
                                            src={getImageUrl(data?.brandLogo)}
                                            alt="missing image"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                {/* Industry */}
                                <div className="mb-6 flex">
                                    <h2 className="text-gray-700 font-semibold basis-[40%]">Industry</h2>
                                    <p className="text-gray-900 font-medium basis-[60%]">{data?.stats?.industry}</p>
                                </div>

                                {/* Location */}
                                <div className="mb-6 flex">
                                    <h2 className="text-gray-700 font-semibold basis-[40%]">Location</h2>
                                    <p className="text-gray-900 font-medium basis-[60%]">{data?.stats?.location}</p>
                                </div>

                                {/* Solutions */}
                                <div className="mb-6 flex">
                                    <h2 className="text-gray-700 font-semibold basis-[40%]">Solutions</h2>
                                    <div className={`pe-2 h-[100px] overflow-y-auto basis-[60%] ${styles.scrollBar}`}>
                                        {data?.stats?.solution?.split(',').map((item, index) => (
                                            <div key={index} className="flex items-center justify-between gap-4 mb-2">
                                                <p className="text-gray-900 font-medium">{item}</p>
                                                <Image
                                                    src='/icons/theme-right-arrow.svg'
                                                    alt="missing image"
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Results */}
                                <div className='flex justify-between'>
                                    <h2 className="text-gray-700 font-semibold basis-[40%]">Results</h2>
                                    <div className={`pe-2 h-[100px] overflow-y-auto basis-[60%] ${styles.scrollBar}`}>
                                        {data?.stats?.result?.split(',').map((item, index) => (
                                            <p key={index} className="text-gray-900 font-medium mb-2">{item}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:basis-1/2 pe-5">
                        <p className='uppercase text-[#ddd] text-[14px] lg:text-[20px] mb-2 mt-8'>{data?.category?.name} | {data?.sub_category?.name}</p>
                        <h1 className='text-[24px] leading-[1.15] text-white mb-6'>
                            {data?.title}
                        </h1>
                        <p className='text-[18px] text-white'><Image src="/icons/share.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={copyUrl} /> {'\u00A0'.repeat(4)} <Image src="/icons/print.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={() => window.print()} /> {'\u00A0'.repeat(4)} <Image src="/icons/save.svg" height={24} width={24} alt="missing image" className='inline-block cursor-pointer' onClick={() => window.print()} /></p>
                    </div>
                </div>
                <ToastNotification />
            </div>
        </>
    )
}

export default Banner