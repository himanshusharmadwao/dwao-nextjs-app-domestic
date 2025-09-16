import Image from 'next/image';
import React from 'react';

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
        <Image src={icon} alt="Icon Image" height={20} width={20} />
      </div>
      <h3 className="text-xl font-bold mb-4 text-center text-gray-900">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default ValueCard;