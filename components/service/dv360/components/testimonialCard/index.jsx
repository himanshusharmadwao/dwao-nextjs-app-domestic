import React from 'react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

const TestimonialCard = ({ rating, quote, name, title, imageSrc }) => {
    return (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 min-h-[370px]">
            <div className="flex items-center mb-6">
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={`${name}'s Profile`}
                        width={64}
                        height={64}
                        className="rounded-full mr-4 object-cover"
                        loading="lazy"
                    />
                )}
                <div>
                    <h4 className="font-bold text-gray-900">{name}</h4>
                    <p className="text-gray-600">{title}</p>
                </div>
            </div>
            <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                ))}
            </div>
            <p className="text-gray-700">"{quote}"</p>
        </div>
    );
};

export default TestimonialCard;