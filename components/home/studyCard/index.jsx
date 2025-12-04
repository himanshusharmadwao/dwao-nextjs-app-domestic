import React from "react";
import Image from "next/image";
import Link from "next/link";

const StudyCard = ({ imageSrc, title, description, href }) => {
    return (
        <div className="w-full group">
            {/* Image Section */}
            <div className="relative rounded-lg w-full aspect-[350/245] overflow-hidden">
                <Image
                    src={imageSrc || "/featured-thumb-lenskart.webp"}
                    alt={title || "Card Image"}
                    fill
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="py-6 relative z-10">
                <div className="flex justify-between ">
                    <Link prefetch={false} href={href} className="transition-all duration-300 leading-[27px] text-[25px] hover:text-[var(--mainColor)]">{title}</Link>
                    <Link prefetch={false} href={href} aria-label="Bookmark this item" title="Bookmark">
                        <span className="relative  mt-2">
                            {/* Default: Outlined icon (Visible by default) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-opacity duration-300 hover:opacity-0 absolute"
                            >
                                <path d="M6 3h12a2 2 0 0 1 2 2v16l-8-5-8 5V5a2 2 0 0 1 2-2z" />
                            </svg>

                            {/* Hover: Filled icon (Appears on hover) */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="var(--mainColor)"
                                stroke="var(--mainColor)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-opacity duration-300 opacity-0 hover:opacity-100"
                            >
                                <path d="M6 3h12a2 2 0 0 1 2 2v16l-8-5-8 5V5a2 2 0 0 1 2-2z" />
                            </svg>
                        </span>
                    </Link>
                </div>
                {description != null && (
                    <p className="mt-2 text-con text-con-light"> {description?.length > 80 ? `${description?.slice(0, 80)}...` : `${description}...`} </p>
                )}
            </div>
            <Link prefetch={false} href={href} className="group flex items-center gap-2" aria-label="Learn More">
                <span className="transition-transform transition-opacity duration-300 ease-in-out opacity-0 translate-x-0 group-hover:translate-x-2 group-hover:opacity-100">
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <circle fill="#4A69BB" cx="16" cy="16" r="16" />
                            <g stroke="#FFF" strokeWidth="2">
                                <path d="m17.037 22.468 6.971-6.488-6.971-6.48M24.008 15.98H8" />
                            </g>
                        </g>
                    </svg>
                </span>
            </Link>
        </div>
    );
};

export default StudyCard;