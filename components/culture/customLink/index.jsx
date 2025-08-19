import Link from 'next/link'
import React from 'react'

const CustomLink = ({linkTitle="", linkHref="", linkClass=""}) => {
    return (
        <Link prefetch={false}  href={linkHref} className={`text-[var(--mainColor)] px-[25px] py-[12px] inline-block tracking-[2px] uppercase duration-300 transition-all ${linkClass}`}>
            {linkTitle}
        </Link>
    )
}

export default CustomLink