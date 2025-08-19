import { getImageUrl } from '@/libs/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RelatedCard = ({ imageSrc = "", linkTitle = "", linkHref = "" }) => {
    return (
        <Link prefetch={false}  href={linkHref} className='group'>
            <div className='h-[280px] relative rounded-[10px] overflow-hidden transition-all duration-300 group-hover:shadow-[0_10px_20px_0_rgba(0,0,0,0.15)]'>
                <Image src={getImageUrl(imageSrc)} fill alt="missing image" objectFit='cover' />
            </div>
            <span
                className="mt-4 flex gap-2 items-center group-hover:text-[var(--mainColor)]"
            >
                {linkTitle}
                <span className="transition-all duration-300 group-hover:translate-x-[10px] ">
                    <Image src="/icons/theme-right-arrow.svg" height={30} width={30} alt="missing image" />
                </span>
            </span>
        </Link>
    )
}

export default RelatedCard