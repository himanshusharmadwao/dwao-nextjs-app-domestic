import Accordion from '@/components/ui/accordion'
import { getImageUrl } from '@/libs/utils'
import Image from 'next/image'
import React from 'react'

const DualLayout = ({ data }) => {
    const { heading = "", visual = "", content = "", variant = "primary" } = data

    return (
        <>
            <h2 className='text-head text-color-con mb-6'>{heading}</h2>
            <div className={`flex ${variant === "secondary" ? "flex-row-reverse" : "flex-row"} items-center`}>
                <div className="lg:basis-[40%] basis-full hidden lg:block">
                    {/* <div className={`h-[500px] w-[370px] relative ${variant === "secondary" ? "ms-auto" : ""}`}>
                        <Image src={imageSrc} fill alt="missing image" />
                    </div> */}

                    <div className={`relative w-[90%] aspect-[75/100] ${variant === "secondary" ? "ms-auto" : ""}`}>
                        <Image
                            src={getImageUrl(visual)}
                            alt="missing image"
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                    </div>

                </div>
                <div className="lg:basis-[60%] basis-full">
                    {content.map((item, index) => {
                        return (
                            <div key={index}>
                                <Accordion data={item} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default DualLayout