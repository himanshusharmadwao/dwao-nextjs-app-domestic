import React from 'react';
import Image from 'next/image';
import ExtendLink from '@/components/ui/extendLink';
import { breakTitle } from '@/libs/utils';

const CommonBanner = ({ data }) => {

  const {
    title = "",
    content = "",
    deskImage = "",
    mobileImage = "",
    linkTitle = "",
    linkSrc = ""
  } = data

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative w-full h-[410px]">

        <div className="aspect-[7/10] hidden lg:block">
          <Image
            src={deskImage}
            alt={title || "Desktop Banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={75}
          />
        </div>
        <div className="aspect-[15/7] lg:hidden">
          <Image
            src={mobileImage}
            alt={title || "Mobile Banner"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={75}
          />
        </div>
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="container">
            <div className="text-left py-5 ">
              <h1 className="lg:text-[3.5vw] text-[28px] leading-[1.2] text-white">
                {breakTitle(title)}
              </h1>
              <p className="text-[17px] text-white mt-[2rem]">{content[0]}</p>
              {linkTitle !== "" && linkSrc !== "" && (
                <ExtendLink title={linkTitle} href={linkSrc} className="text-white text-[20px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CommonBanner;