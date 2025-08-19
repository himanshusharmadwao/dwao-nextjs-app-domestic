"use client"

import React, { Suspense } from 'react'
import { getImageUrl } from '@/libs/utils'
import Image from 'next/image'
import dynamic from 'next/dynamic';

const CommonBanner = dynamic(() => import('@/components/common/banner'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>,
});

const DualLayout = dynamic(() => import('@/components/common/dualLayout'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>,
});

const RelatedCard = dynamic(() => import('@/components/common/relatedCard'), {
    loading: () => <div className="animate-pulse h-48 bg-gray-100 rounded"></div>,
});

const StudyCarousel = dynamic(() => import('@/components/home/studyCarousel'), {
    loading: () => <div className="animate-pulse h-64 bg-gray-100 rounded"></div>,
});

const ExtendLink = dynamic(() => import('@/components/ui/extendLink'), {
    loading: () => <div className="animate-pulse h-10 w-32 bg-gray-100 rounded"></div>,
});

const StudyCard = dynamic(() => import('@/components/home/studyCard'), {
    loading: () => <div className="animate-pulse h-48 bg-gray-100 rounded"></div>,
});

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);

const SinglePageWrapper = ({ pageData, relatedCapabilities }) => {

    // console.log(pageData)

    // console.log(relatedCapabilities)

    const relatedCard = relatedCapabilities?.map((item, index) => {
        return (
            <div className='' key={index}>
                <RelatedCard imageSrc={item?.thumbnail} linkTitle={item?.title}
                    linkHref={item.slug} />
            </div>
        )
    })

    const dualLayout = pageData?.section;
    // console.log("pageData: ", pageData)

    return (
        <>
            {/* banner */}
            <div className="mb-14">
                {/* <CommonBanner data={bannerData} /> */}
                <div className="relative w-full overflow-hidden">
                    <div className="relative w-full h-[410px]">
                        <div className="aspect-[7/10] hidden lg:block">
                            {pageData?.featuredImage && (
                                <Image
                                    src={getImageUrl(pageData?.featuredImage)}
                                    alt="Desktop Banner"
                                    fill
                                    priority
                                    objectFit="cover"
                                />
                            )}
                        </div>
                        <div className="aspect-[15/7] lg:hidden">
                            {pageData?.thumbnail && (
                                <Image
                                    src={getImageUrl(pageData?.thumbnail)}
                                    alt="Mobile Banner"
                                    fill
                                    priority
                                    objectFit="cover"
                                />
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/30 flex items-center">
                            <div className="container">
                                <div className="text-left py-5">
                                    <h1 className="lg:text-[3.5vw] text-[28px] leading-[1.2] text-white">{pageData?.title}</h1>
                                    <p className="text-[17px] text-white mt-[2rem]">{pageData?.description}</p>
                                    <Suspense fallback={<LoadingPlaceholder />}>
                                        {pageData?.linkTitle && pageData?.linkHref && (
                                            <ExtendLink title={pageData?.linkTitle} href={pageData?.linkHref} className="text-white text-[20px]" />
                                        )}
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="container" id='howWeHelp'>
                    {dualLayout?.map((item, index) => {
                        return (
                            <div key={index} className="mb-20" id={`layout${index + 1}`}>
                                <DualLayout data={item}/>
                            </div>
                        )
                    })}
                </div>
            </Suspense>

            {relatedCard.length !== 0 && (
                <Suspense fallback={<LoadingPlaceholder />}>
                    <div className="light-bg py-16" id='relatedCapabilities'>
                        <div className="container">
                            <h2 className='text-head mb-6'>Related Capabilities</h2>
                            <StudyCarousel slides={relatedCard} slider="related-card" />
                        </div>
                    </div>
                </Suspense>
            )}
        </>
    )
}

export default SinglePageWrapper