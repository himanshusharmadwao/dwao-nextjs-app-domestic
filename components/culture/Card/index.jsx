import { getImageUrl } from '@/libs/utils';
import Image from 'next/image';
import React from 'react';

const Card = ({ data }) => {

    const { icon, title, content } = data;

    return (
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <Image src={getImageUrl(icon)} alt="missing-image" height={74} width={74} />
            </div>

            <h3 className="text-[20px] mb-2">{title}</h3>

            <p className="text-gray-600 text-sm leading-relaxed">
                {content}
            </p>
        </div>
    );
};

export default Card;