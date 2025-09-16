import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ExtendLink = ({ title = "", href = "", className = "" }) => {
  return (
    <Link prefetch={false} 
      href={href || "/"}
      className={`lg:mt-2 mt-5 inline-flex gap-2 items-center text-con-dark group hover:text-[var(--mainColor)] w-fit uppercase ${className}`}
    >
      {title || "Learn More"}
      <span className="transition-all duration-300 group-hover:translate-x-[10px]">
        <Image src="/icons/theme-right-arrow.svg" height={30} width={30} alt="missing image" />
      </span>
    </Link>
  )
}

export default ExtendLink