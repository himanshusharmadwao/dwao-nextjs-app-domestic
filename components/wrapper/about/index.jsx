import React, { Suspense } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { breakTitle, getImageUrl } from '@/libs/utils'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 

const ClientCarousel = dynamic(() => import('@/components/common/clientCarousel'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
})

const ProfileCard = dynamic(() => import('@/components/about/profileCard'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
})

const JoinTheTeam = dynamic(() => import('@/components/common/joinTheTeam'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
})

const ReachOut = dynamic(() => import('@/components/common/reachOut'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
})

const ExtendLink = dynamic(() => import("@/components/ui/extendLink"));

const OverlayCard = dynamic(() => import('@/components/common/overlayCard'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
})

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);

const AboutWrapper = async ({ data, preview }) => {

    return (
        <>
            {/* banner */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="mb-14">
                    <div className="relative w-full overflow-hidden">
                        <div className="relative w-full h-[410px]">
                            <div className="aspect-[7/10] hidden lg:block">
                                {data?.bannerDeskImage?.url && (
                                    <Image
                                        src={getImageUrl(data?.bannerDeskImage)}
                                        alt="Desktop Banner"
                                        fill
                                        priority
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <div className="aspect-[15/7] lg:hidden">
                                {data?.bannerMobileImage?.url && (
                                    <Image
                                        src={getImageUrl(data?.bannerMobileImage)}
                                        alt="Mobile Banner"
                                        fill
                                        priority
                                        objectFit="cover"
                                    />
                                )}
                            </div>
                            <div className="absolute inset-0 bg-black/30 flex items-center">
                                <div className="container">
                                    <div className="text-left py-5 ">
                                        <h1 className="lg:text-[3.5vw] text-[28px] leading-[1.2] text-white">{breakTitle(data?.title)}</h1>
                                        <div className="text-[17px] text-white mt-[2rem]">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                transform={(html) => DOMPurify.sanitize(html)}
                                            >
                                                {data?.bannerContent}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>

            {/* intro */}
            <div className="container" id='whoWeAre'>
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-14">
                    <h2 className='text-head-large text-con-dark leading-[1] mb-5 lg:mb-0'>{data?.intro?.title}</h2>
                    <div>
                        <div className='text-small-con text-con-light'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                transform={(html) => DOMPurify.sanitize(html)}
                            >
                                {data?.intro?.markdownContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* work place */}
            <div className="light-bg py-14" id='greatPlace'>
                <div className="container">
                    <h2 className='text-[1.2rem] lg:text-head-large text-con-dark lg:mb-12 mb-5'>{data?.workPlace.title}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {data?.workPlace?.image?.url && (
                            <Image
                                src={getImageUrl(data?.workPlace?.image)}
                                alt="missing image"
                                width={476}
                                height={268}
                                priority
                                className='mb-5 lg:mb-0'
                            />
                        )}
                        <div className='flex items-center'>
                            <div className='text-small-con text-con-light'>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    transform={(html) => DOMPurify.sanitize(html)}
                                >
                                    {data?.workPlace?.markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* what we beleive */}
            <div id='believe'>
                {data?.valueVisual?.url && (
                    <Image
                        src={getImageUrl(data?.valueVisual)}
                        alt='missing image'
                        width={500}
                        height={620}
                        className='object-cover'
                        layout="responsive"
                    />
                )}
            </div>

            {/* our clients */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="light-bg lg:py-14 py-10" id='clients'>
                    <div className="container">
                        <h2 className="text-start lg:text-center text-head text-con-dark mb-12">{data?.clientsSlidesHeading}</h2>
                    </div>
                    <ClientCarousel slides={data?.clientsSlide?.entity} />
                </div>
            </Suspense>

            {/* success partners */}
            <div className="light-bg py-14 mb-14">
                <div className="container">
                    <h2 className='text-head-large text-con-dark mb-12'>{data?.partner?.title}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {data?.partner?.image?.url && (
                            <Image
                                src={getImageUrl(data?.partner?.image)}
                                alt="missing image"
                                width={476}
                                height={268}
                                priority
                                className='mb-5 lg:mb-0'
                            />
                        )}
                        <div className='flex items-center'>
                            <div className='text-small-con text-con-light'>
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    transform={(html) => DOMPurify.sanitize(html)}
                                >
                                    {data?.partner?.markdownContent}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* services */}
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-24">
                    <h2 className='text-head-large text-con-dark leading-[1] mb-5 lg:mb-0'>{data?.service?.title}</h2>
                    <div>
                        <div className='text-small-con text-con-light'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                transform={(html) => DOMPurify.sanitize(html)}
                            >
                                {data?.service?.markdownContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* industries */}
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-24">
                    <h2 className='text-head-large text-con-dark leading-[1] mb-5 lg:mb-0'>{data?.industry?.title}</h2>
                    <div>
                        <div className='text-small-con text-con-light'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                transform={(html) => DOMPurify.sanitize(html)}
                            >
                                {data?.industry?.markdownContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* impact */}
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-24">
                    <h2 className='text-head-large text-con-dark leading-[1] mb-5 lg:mb-0'>{data?.impact?.title}</h2>
                    <div>
                        <div className='text-small-con text-con-light'>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                transform={(html) => DOMPurify.sanitize(html)}
                            >
                                {data?.impact?.markdownContent}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>

            {/* our work */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="container">
                    <div className="mb-14">
                        <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-dense gap-4">
                            <div className='flex flex-col justify-center lg:gap-4 mt-10 lg:mt-0 lg:order-1 order-2'>
                                <h2 className='text-head-large text-con-dark leading-[1] mb-5 lg:mb-0'>{data?.demoHeading}</h2>
                                <p className='text-small-con text-con-light'>{data?.demoContent}</p>
                                {data?.demoLinkHref && (
                                    <ExtendLink title={data?.demoLinkTitle} href={data?.demoLinkHref} />
                                )}
                            </div>

                            <div className="relative lg:order-2 order-1 basis-full md:basis-[calc((100%-60px)/3)]">
                                <Link prefetch={false}
                                    href={data?.demoOverlay?.href || "#"} className="relative group w-full lg:inline inline-block">
                                    {data?.demoOverlay?.image?.url && (
                                        <Image
                                            src={getImageUrl(data?.demoOverlay?.image)}
                                            alt="Card Image"
                                            width={394}
                                            height={293}
                                            priority
                                            className="w-full h-auto object-cover rounded-[10px]"
                                        />
                                    )}
                                    <div className="absolute top-0 left-0 text-white bg-black/40 pt-4 w-full h-full rounded-[10px] group-hover:bg-transparent group-hover:bg-black transition-bg duration-300">
                                        <div className="text-[32px] px-[1rem]">{data?.demoOverlay?.heading}</div>
                                        <div className="absolute bottom-8 lg:mt-4 px-[1rem] lg:pt-[30px] pt-[22px]">
                                            <p className="text-small-con">{data?.demoOverlay?.category} | {data?.demoOverlay?.subCategory}</p>
                                            <p className="lg:text-[20px] text-[18px] mt-3 leading-[1.2]">
                                                {data?.demoOverlay?.title}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>

            {/* experts */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="light-bg py-14">
                    <div className="container">
                        <h2 className="text-start lg:text-center text-head text-con-dark mb-12">{data?.expertHeading}</h2>
                        <div className="flex gap-8 flex-col lg:flex-row">
                            {data?.expert?.map((item, index) => (
                                <ProfileCard key={index} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </Suspense>

            {/* join our team */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="container" id='joinTheTeam'>
                    <div className="mb-14">
                        <JoinTheTeam preview={preview} />
                    </div>
                </div>
            </Suspense>

            {/* contact */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <ReachOut preview={preview} />
            </Suspense>

        </>
    )
}

export default AboutWrapper