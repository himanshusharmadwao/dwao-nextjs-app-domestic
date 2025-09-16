import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './serviceCard.module.css'

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
      <div className="flex items-start">
        <div className="bg-blue-600 p-3 rounded-lg mr-5">
          <Image src={icon} alt="Icon Image" height={40} width={40} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
          <div className={`prose prose-blue max-w-none text-gray-600 mb-4 ${styles.content}`}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;