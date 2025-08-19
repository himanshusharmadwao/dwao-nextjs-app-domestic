import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/libs/utils";
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm'; // for features like strikethrough and tables
import rehypeRaw from 'rehype-raw'; // for raw html 

const ProfileCard = ({ data }) => {

  return (
    <div className="w-full lg:w-1/3 text-center lg:text-start">
      <div className="w-[210px] h-[210px] relative mb-6 mx-auto lg:mx-[unset]">
        <Image
          src={getImageUrl(data.image)}
          alt="missing image"
          fill
          className="rounded-[5px] object-cover"
        />
      </div>
      <h2 className="text-3xl mb-4 text-gray-900">{data.name}</h2>
      <div className='text-[14px] leading-[1.2] text-con-light mb-4'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          transform={(html) => DOMPurify.sanitize(html)}
        >
          {data.markdownDescription}
        </ReactMarkdown>
      </div>
      <div className="flex gap-4 justify-center lg:justify-start">
        <Link prefetch={false}  href={data.socialUrl1}>
          <Image src='/icons/fa-twitter.svg' height={24} width={24} className="text-[var(--mainColor)]" alt="twitter" />
        </Link>
        <Link prefetch={false}  href={data.socialUrl2}>
          <Image src='/icons/fa-linkedin.svg' height={24} width={24} className="text-[var(--mainColor)]" alt="linkedin" />
        </Link>
      </div>
    </div>
  );
};

export default memo(ProfileCard);
