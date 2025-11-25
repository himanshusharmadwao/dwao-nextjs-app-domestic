import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/libs/utils'
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 
import styles from "./Insight.module.css";
import dynamic from "next/dynamic";

// Dynamic imports with loading placeholders
const ReachOut = dynamic(() => import('@/components/common/reachOut'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
});

const StudyCard = dynamic(() => import('@/components/home/studyCard'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const StudyCarousel = dynamic(() => import('@/components/home/studyCarousel'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const Banner = dynamic(() => import('@/components/insightSingleBlog/banner'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const DualLayout = dynamic(() => import('@/components/insightSingleBlog/dualLayout'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);

const SingleBlogWrapper = async ({ pageData, relatedInsightBlogs, preview }) => {

    // console.log("Pagedata: ", pageData)

    const studySlides = relatedInsightBlogs?.map((card, index) => {
        return (
            <StudyCard
                key={index}
                imageSrc={getImageUrl(card.thumbnail)}
                title={card.title}
                description={card.title}
                href={`/insights-and-case-studies/${card?.slug}`}
            />
        )
    });

    return (
        <>
            <div className="mb-14">
                <Banner data={pageData} />
            </div>
            <div className="container" id='summary'>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-14">
                    <div className="flex lg:inline-block gap-[50px]">
                        <div className="text-[20px] mb-4 min-w-[90px]">Industry</div>
                        <div className="text-gray-600 text-con">{pageData?.stats?.industry}</div>
                    </div>
                    <div className="flex lg:inline-block gap-[50px]">
                        <div className="text-[20px] mb-4 min-w-[90px]">Location</div>
                        <div className="text-gray-600 text-con">{pageData?.stats?.location}</div>
                    </div>
                    <div className="flex lg:inline-block gap-[50px]">
                        <div className="text-[20px] mb-4 min-w-[90px]">Solutions</div>
                        <div className="text-gray-600 text-con">
                            <ul className="list-none flex flex-col gap-4">
                                {pageData?.stats?.solution.split(',').map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex lg:inline-block gap-[50px]">
                        <div className="text-[20px] mb-4 min-w-[90px]">Results</div>
                        <div className="text-gray-600 text-con flex flex-col gap-4">
                            {pageData?.stats?.result.split(',').map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingPlaceholder />}>
                <div className="light-bg mb-14 py-20">
                    <div className="container">
                        <DualLayout data={pageData?.background} />
                    </div>
                </div>
            </Suspense>

            {pageData?.valueVisual?.url &&
                (
                    <div className="relative w-full aspect-[1400/690]">
                        <Image
                            src={getImageUrl(pageData?.valueVisual)}
                            fill
                            sizes="100vw"
                            alt="Axis MaxLife Insurance Case Study"
                            className="object-contain"
                        />
                    </div>
                )
            }

            <div className="light-bg py-20">
                <div className="container">
                    <Suspense fallback={<LoadingPlaceholder />}>
                        <div className="mb-14" id='objective'>
                            <DualLayout data={pageData?.objective} />
                        </div>
                    </Suspense>

                    <Suspense fallback={<LoadingPlaceholder />}>
                        <div className='mb-14' id='solution'>
                            <DualLayout data={pageData?.solution} />
                        </div>
                    </Suspense>

                    <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-[100px] gap-[40px] mb-14">
                        <div className="lg:col-span-2 col-span-1">
                            <div className="relative lg:h-[700px] lg:w-[450px] h-[500px] w-full">
                                {pageData?.insightVisual?.url && (
                                    <Image src={getImageUrl(pageData?.insightVisual) || ''} fill alt="missing image" objectFit='cover' />
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-3 col-span-1 flex items-center">
                            <h2 className='text-con-dark text-[2.1rem] lg:text-[3.2rem] leading-[1.1]'>{pageData?.insightStatus}</h2>
                        </div>
                    </div>

                    <Suspense fallback={<LoadingPlaceholder />}>
                        <div className='mb-14' id='result'>
                            <DualLayout data={pageData?.result} />
                        </div>
                    </Suspense>

                    {pageData?.insightTestimonial && (
                        <div className="mb-14 flex items-center gap-8">
                            <div className='lg:w-[55%] w-full'>
                                <div className={styles.testimonialStyle}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        transform={(html) => DOMPurify.sanitize(html)}
                                    >
                                        {pageData?.insightTestimonial?.markdownTestimonial}
                                    </ReactMarkdown>
                                </div>
                                <br />
                                <span className='w-full italic lg:text-[1.8rem] text-[1.2rem]  inline-block'>{pageData?.insightTestimonial?.name && (<strong>{pageData?.insightTestimonial?.name},</strong>)} {pageData?.insightTestimonial?.designition}</span>
                            </div>
                            {pageData?.insightTestimonial?.image && (
                                <div className='w-[45%] hidden lg:block'>
                                    <Image
                                        src={getImageUrl(pageData?.insightTestimonial?.image)}
                                        alt='Testimonial Image'
                                        height={455}
                                        width={696}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-14 text-center mx-auto flex justify-center gap-20 flex-wrap">
                        {pageData?.insightTestimonial?.testimonialStats?.map((stat, index) => {
                            return (
                                <div key={index}>
                                    <h4 className="text-con-dark text-[3.2rem] leading-[1.1] mb-3">
                                        {stat.percentageStats}
                                    </h4>
                                    <p className="text-gray-600 text-con">
                                        {stat.percentageDescription}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="light-bg py-20" id='relatedCaseStudies'>
                <div className="container">
                    <h2 className="text-head text-con-dark mb-12">Related case studies</h2>
                    <Suspense fallback={<LoadingPlaceholder />}>
                        <div className="lg:px-5">
                            <StudyCarousel slides={studySlides} slider="related-case-studies" />
                        </div>
                    </Suspense>
                    <div className="text-center">
                        <Link prefetch={false} href="/insigths-and-case-studies" className="border-[1px] border-[#333] rounded-[10px] inline-block text-[#333] text-center py-[0.5rem] px-[3rem] transition-all duration-300 text-[1.2rem] hover:text-[var(--mainColor)] hover:border-[var(--mainColor)]">View all case studies</Link>
                    </div>
                </div>
            </div>

            <Suspense fallback={<LoadingPlaceholder />}>
                <ReachOut preview={preview} />
            </Suspense>
        </>
    )
}

export default SingleBlogWrapper