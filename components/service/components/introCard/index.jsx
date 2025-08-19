import Image from 'next/image';
import React from 'react';

const IntroCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <Image src={icon} alt="Icon Image" height={20} width={20} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default IntroCard;