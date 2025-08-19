import React from "react";
// import { FaStar } from "react-icons/fa";
import Image from "next/image";

const TestimonialCard = ({ rating, quote, name, title, imageSrc }) => {
    // console.log(imageSrc)
    return (
        <div className="p-6 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] max-w-sm mx-auto relative min-h-[255px] bg-white mb-10">
            <div className="absolute top-[10px] right-[10px]">
                <Image
                    src={"/icons/quote.png"}
                    alt={"Card Image"}
                    width={40}
                    height={40}
                    className="opacity-[0.1]"
                />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-start mb-4">
                {Array.from({ length: 5 }, (_, index) => {
                    const starValue = index + 1;
                    if (rating >= starValue) {
                        return (
                            <Image
                                key={index}
                                src="/icons/stars.svg"
                                height={20}
                                width={20}
                                alt="Full Star"
                            />
                        );
                    } else if (rating >= starValue - 0.5) {
                        return (
                            <Image
                                key={index}
                                src="/icons/halfStar.svg"
                                height={20}
                                width={20}
                                alt="Half Star"
                            />
                        );
                    } else {
                        return (
                            <Image
                                key={index}
                                src="/icons/emptyStar.svg"
                                height={20}
                                width={20}
                                alt="Empty Star"
                            />
                        );
                    }
                })}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-[14px] mb-4">
                "{quote}"
            </blockquote>

            {/* User Info Section */}
            <div className="flex items-center mt-4">
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={`${name}'s Profile`}
                        width={50}
                        height={50}
                        className="rounded-full mr-4 object-cover"
                    />
                )}
                <div>
                    <p className="font-semibold text-gray-900">{name}</p>
                    <p className="text-[var(--mainColor)] italic text-sm">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;