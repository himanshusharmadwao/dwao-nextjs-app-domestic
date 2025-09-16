import React from 'react';
import ReachOut from '@/components/common/reachOut';
import { getPolicy } from '@/libs/apis/data/privacyPolicy';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 
import styles from "@/styles/markdown.module.css";
import Image from 'next/image';
import { breakTitle, getImageUrl } from '@/libs/utils';

const PrivacyPolicyWrapper = async ({ policyResponse, preview }) => {

    const content = policyResponse?.markdownContent;
    // console.log(content)

    return (
        <>
            {/* Banner */}
            <div className="mb-14">
                <div className="mb-14">
                    <div className="relative w-full overflow-hidden">
                        <div className="relative w-full h-[410px]">
                            <div className="aspect-[7/10] hidden lg:block">
                                <Image
                                    src={getImageUrl(policyResponse?.bannerDeskImage)}
                                    alt="Desktop Banner"
                                    fill
                                    priority
                                    objectFit="cover"
                                />
                            </div>
                            <div className="aspect-[15/7] lg:hidden">
                                <Image
                                    src={getImageUrl(policyResponse?.bannerMobileImage)}
                                    alt="Mobile Banner"
                                    fill
                                    priority
                                    objectFit="cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/30 flex items-center">
                                <div className="container">
                                    <div className="text-left py-5 ">
                                        <h1 className="lg:text-[3.5vw] text-[28px] leading-[1.2] text-white">{breakTitle(policyResponse?.title)}</h1>
                                        <div className="text-[17px] text-white mt-[2rem]">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                transform={(html) => DOMPurify.sanitize(html)}
                                            >
                                                {policyResponse?.bannerContent}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container">
                <h2 className="text-4xl mb-12 text-gray-800">Privacy Policy</h2>
                <div className={`${styles.markdownStyle} mb-20`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        transform={(html) => DOMPurify.sanitize(html)}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>

            {/* Contact */}
            <ReachOut preview={preview} />
        </>
    );
};

export default PrivacyPolicyWrapper;