import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import styles from "@/styles/markdown.module.css";
import dynamic from 'next/dynamic';
import { getImageUrl } from '@/libs/utils';

const ReachOut = dynamic(() => import('@/components/common/reachOut'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
});

const Banner = dynamic(() => import('@/components/singleBlog/banner'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const SafeMarkdownComp = dynamic(() => import('@/components/common/SafeMarkdownComp'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
});

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);

const SingleBlogWrapper = async ({ pageData, relatedBlogs, preview }) => {
    // console.log(pageData)

    // console.log(pageData.markdownContent)

    return (
        <>
            <div className="mb-20">
                <Banner data={pageData} />
            </div>
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-[50px] mb-14">
                    <div className={`${styles.markdownStyle} basis-[70%]`}>
                        {pageData?.markdownContent ? (
                            <SafeMarkdownComp>
                                {pageData?.markdownContent}
                            </SafeMarkdownComp>
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>
                    <div className="basis-[30%] lg:sticky lg:top-[200px] lg:h-fit lg:min-h-screen">
                        <aside>
                            <h2 className='font-semibold text-[25px] mb-7'>Related capabilities</h2>
                            <ul className='flex flex-col items-start gap-[20px]'>
                                {relatedBlogs?.length > 0 ? (
                                    relatedBlogs?.map((item, index) => (
                                        <li key={index} className='w-full'>
                                            <Link prefetch={false}
                                            href={`/blog/${item.slug}`} className="flex justify-between items-start group">
                                                <span className="group-hover:underline">{item.title}</span>
                                                <div className="relative w-12 h-8">
                                                    <Image
                                                        src="/icons/circleArrowRight.svg"
                                                        alt="arrow icon"
                                                        fill
                                                        className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                                    />
                                                    <Image
                                                        src="/icons/circleArrowRightFill.svg"
                                                        alt="arrow icon hover"
                                                        fill
                                                        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li>No related capabilities found.</li>
                                )}
                            </ul>
                        </aside>
                    </div>
                </div>
            </div>

            <div className="light-bg py-16 text-center lg:text-start">
                <div className="container">
                    <h2 className='font-bold text-[28px] mb-12'>Authors</h2>
                    {pageData?.author?.image?.url && (
                        <Image src={getImageUrl(pageData?.author?.image)} height={130} width={190} alt="missing image" className='mb-5 mx-auto lg:mx-[unset]' />
                    )}
                    <h3 className='font-semibold text-[22px]'>{pageData?.author?.name}</h3>
                    {pageData?.author?.designition && (
                        <p className='text-[18px] leading[1.4] my-2'>{pageData?.author?.designition}</p>
                    )}
                    {pageData?.author?.linkedin && (
                        <Link prefetch={false} href={pageData?.author?.linkedin}>
                            <Image src='/icons/theme-linkedIn.svg' height={24} width={24} alt="linkedin" />
                        </Link>
                    )}
                </div>
            </div>
            <Suspense fallback={<LoadingPlaceholder />}>
                <ReachOut preview={preview}/>
            </Suspense>
        </>
    )
}

export default SingleBlogWrapper 