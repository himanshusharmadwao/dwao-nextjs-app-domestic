import { getImageUrl } from '@/libs/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StoryCard = ({ logo, metric, metricLabel, title, description, stats, caseStudyHref, caseStudyLink }) => {

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8 border-b border-gray-100">
        <Image src={logo} alt="Icon Image" height={70} width={90} className='mx-auto mb-6'/>
        <div className="flex justify-center items-center mb-6">
          <span className="text-5xl font-bold text-[#4A69BB]">{metric}</span>
          <span className="text-lg ml-2 text-gray-600">{metricLabel}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
        <p className="text-gray-600 text-center mb-6">{description}</p>
      </div>
      <div className="p-6 bg-gray-50">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mr-4`}>
                <Image src={getImageUrl(stat.icon)} alt="Icon Image" height={20} width={20} />
              </div>
              <div>
                <span className="block font-bold text-gray-900">{stat.title}</span>
                <span className="text-sm text-gray-600">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link prefetch={false}  href={caseStudyHref} className="inline-flex items-center text-[#4A69BB] font-medium hover:text-blue-700 cursor-pointer">
            {caseStudyLink}
            <Image src="/dv360/icons/arrowRight.svg" alt="Icon Image" height={20} width={20} className='ms-2'/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;