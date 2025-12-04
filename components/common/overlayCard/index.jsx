import { getImageUrl } from '@/libs/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OverlayCard = ({ data={}, className = "" }) => {
    // console.log("industry: ",data?.stats?.industry?.toLowerCase())
    
    if (!data) return <div>Loading...</div>;
    // const slug = data.title.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
    return (
        <div className={`relative lg:order-2 order-1 ${className}`}>
            <Link prefetch={false}
            href={`/insights-and-case-studies/${data?.slug}` || '#'}
            className="relative group w-full aspect-[350/245] inline-block">
                <Image
                    src={getImageUrl(data?.thumbnail) || "/featured-thumb-airtel.webp"}
                    alt="Card Image"
                    fill
                    priority
                    className="w-full h-auto object-cover rounded-[10px]"
                />
                <div className="absolute top-0 left-0 text-white bg-black/40 pt-4 w-full h-full rounded-[10px] group-hover:bg-transparent group-hover:bg-black transition-bg duration-300">
                    {/* <div className="text-[32px] px-[1rem]">{data?.title}</div> */}
                    <div className="absolute bottom-8 lg:mt-4 px-[1rem] lg:pt-[30px] pt-[22px]">
                        <p className="text-small-con">{data?.category?.name} | {data?.sub_category?.name}</p>
                        <p className="lg:text-[20px] text-[18px] mt-3 leading-[1.2]">
                            {data?.title}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default OverlayCard