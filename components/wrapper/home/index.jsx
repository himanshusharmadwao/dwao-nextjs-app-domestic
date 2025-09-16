import React, { Suspense } from 'react'
import Banner from "@/components/home/banner";
import { getClientTestimonials } from '@/libs/apis/data/home';
import { getImageUrl } from '@/libs/utils';
import { getAllInsightBlogs } from '@/libs/apis/data/insights';
import dynamic from 'next/dynamic'
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import { getRegions } from '@/libs/apis/data/menu';

// Dynamically import components with correct settings for Server Components
const ClientCarousel = dynamic(() => import("@/components/common/clientCarousel"), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
});

const JoinTheTeam = dynamic(() => import("@/components/common/joinTheTeam"), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const StudyCard = dynamic(() => import("@/components/home/studyCard"));

const StudyCarousel = dynamic(() => import("@/components/home/studyCarousel"), {
    loading: () => <div className="animate-pulse h-60 bg-gray-100 rounded"></div>
});

const TestimonialCard = dynamic(() => import("@/components/home/testimonialCard"));

const TestimonialCarousel = dynamic(() => import("@/components/home/testimonialCarousel"), {
    loading: () => <div className="animate-pulse h-60 bg-gray-100 rounded"></div>
});

const ExtendLink = dynamic(() => import("@/components/ui/extendLink"));
const LinkBtn = dynamic(() => import("@/components/ui/link"));

// For ReachOut component, we'll create a client component wrapper
const ReachOut = dynamic(() => import('@/components/reachOut').then(mod => mod.Reachout));

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);

const HomeWrapper = async ({ isMobile, data, preview }) => {

    // Fetch remaining data in parallel
    const [
        clientTestimonialResponse,
        insightBlogsResponse,
        regions
    ] = await Promise.all([
        getClientTestimonials(preview),
        getAllInsightBlogs(1, 6, null, null, preview),
        getRegions()
    ]);

    // console.log(clientTestimonialResponse)

    // Prepare data for components that will be rendered later
    const studySlides = insightBlogsResponse?.data?.map((card, index) => (
        <StudyCard
            key={index}
            imageSrc={getImageUrl(card.thumbnail)}
            title={card.title}
            description={card.insightStatus}
            href={`/case-studies/${card?.stats?.industry?.toLowerCase().replace(/\s+/g, '-')}/${card?.slug}`}
        />
    ));

    // console.log("insightBlogsResponse: ",insightBlogsResponse)

    const testimonialSlides = clientTestimonialResponse?.data[0]?.entity?.map((testimonial, index) => (
        <TestimonialCard
            key={index}
            rating={testimonial.rating}
            quote={testimonial.content}
            name={testimonial.name}
            title={testimonial.title}
            imageSrc={getImageUrl(testimonial.image)}
        />
    ));

    return (
        <>
            {/* Critical first render component */}
            <div className="mb-14">
                <Banner data={data?.banner} isMobile={isMobile} />
            </div>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* success story */}
                <div className="container" id="clientStory">
                    <div className="mb-14">
                        <h2 className="text-start lg:text-center text-head text-con-dark mb-12">{data?.storyHeading}</h2>
                        <div className="flex flex-col lg:flex-row items-center lg:gap-[10px]">
                            <div className="basis-full lg:basis-[65%]">
                                <h3 className="text-con-dark text-[20px] lg:text-[25px] leading-[40px] mb-6">this is test data</h3>
                                <div className="text-[25px] text-con-dark"><span className="font-bold">{data?.storyName},</span>{data?.storyDesignition}</div>
                            </div>
                            <div className="relative basis-full lg:basis-[35%] mt-10 lg:mt-0">
                                <div className="relative lg:order-2 order-1 basis-full md:basis-[calc((100%-60px)/3)]">
                                    <Link prefetch={false} href={data?.storyOverlay?.href || '#'} className="relative group w-full lg:inline inline-block">
                                        {data?.storyOverlay?.image?.url && (
                                            <Image
                                                src={getImageUrl(data?.storyOverlay?.image)}
                                                alt="Card Image"
                                                width={394}
                                                height={293}
                                                priority={false}
                                                className="w-full h-auto object-cover rounded-[10px]"
                                            />
                                        )}

                                        <div className="absolute top-0 left-0 text-white bg-black/40 pt-4 w-full h-full rounded-[10px] group-hover:bg-transparent group-hover:bg-black transition-bg duration-300">
                                            <div className="text-[32px] px-[1rem]">{data?.storyOverlay?.heading}</div>
                                            <div className="absolute bottom-8 lg:mt-4 px-[1rem] lg:pt-[30px] pt-[22px]">
                                                <p className="text-small-con">{data?.storyOverlay?.category} | {data?.storyOverlay?.subCategory}</p>
                                                <p className="lg:text-[20px] text-[18px] mt-3 leading-[1.2]">
                                                    {data?.storyOverlay?.title}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>

            {/* Lower priority components wrapped in separate Suspense blocks */}
            <Suspense fallback={<LoadingPlaceholder />}>
                {/* case studies carousel */}
                <div className="mb-14">
                    <div className="container">
                        <h2 className="text-start lg:text-center text-head text-con-dark mb-12">{data?.caseStudyHeading}</h2>
                    </div>
                    <div className="px-5">
                        <StudyCarousel slides={studySlides} />
                    </div>
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* our clients */}
                <div className="light-bg lg:py-14 py-10">
                    <div className="container">
                        <h2 className="text-start lg:text-center text-head text-con-dark mb-12">{data?.clientsHeading}</h2>
                    </div>
                    <ClientCarousel slides={data?.clientsSlides?.entity} />
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* path to success */}
                <div className="relative w-full h-[600px] mb-14" id="pathToSuccess">
                    {isMobile ? (
                        <div className="lg:hidden absolute inset-0">
                            {data?.insightMobileImg?.url && (
                                <Image
                                    src={getImageUrl(data?.insightMobileImg)}
                                    alt="Mobile Banner"
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="hidden lg:block absolute inset-0">
                            {data?.insightDeskImg?.url && (
                                <Image
                                    src={getImageUrl(data?.insightDeskImg)}
                                    alt="Desktop Banner"
                                    fill
                                    className="object-cover"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    )}
                    {/* Overlay Content */}
                    <div className="relative z-10 h-full text-white bg-black/40">
                        <div className="lg:px-0 px-[5%] absolute lg:left-[40%] left-0 top-[50%] -translate-y-1/2 lg:w-1/2 w-full">
                            <h2 className="text-2xl lg:text-[3.2rem] mb-[1rem] leading-[1]">
                                {data?.insightHeading}
                            </h2>
                            <ExtendLink title={data?.insightLinkTitle} href={data?.insightLinkHref} className="text-white" />
                        </div>
                    </div>
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* join our team */}
                <div className="mb-14" id="joinTheTeam">
                    <div className="container">
                        <JoinTheTeam preview={preview} regions={regions} />
                    </div>
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* testimonial */}
                <div className="light-bg py-14">
                    <div className="container">
                        <h2 className="text-center text-head text-con-dark mb-12">{data?.clientTestimonialHeading}</h2>
                        <TestimonialCarousel slides={testimonialSlides} />
                    </div>
                </div>
            </Suspense>

            <Suspense fallback={<LoadingPlaceholder />}>
                {/* contact */}
                <div className="flex flex-col lg:flex-row" id="howCanWeHelp">
                    <div className="lg:basis-[50%] basis-full bg-[var(--mainColor)] lg:p-[13%] p-[5rem]">
                        <h2 className="text-center lg:text-start lg:text-[3.2rem] text-[19px] text-white leading-[1] lg:my-[1rem] my-[2rem]">{data?.learningTitle}</h2>
                        <LinkBtn linkTitle={data?.learningLinkTitle} linkHref={data?.learningLinkHref} className="border-white text-white hover:bg-white hover:text-[var(--mainColor)]" />
                    </div>
                    <div className="lg:basis-[50%] basis-full lg:p-[13%] p-[5rem]">
                        <h2 className="text-center lg:text-start lg:text-[3.2rem] text-[19px] leading-[1] lg:my-[1rem] my-[2rem]">{data?.ReachOutFormTitle}</h2>
                        <ReachOut />
                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default HomeWrapper