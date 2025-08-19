import Dv360Service from '@/components/service/dv360';
import React from 'react';
import { getServiceData } from '@/libs/apis/data/servicePage/dv360';
import NotFound from "@/app/not-found";
import StructuredData from '@/components/StructuredData';

// Generate dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true";
  // console.log(resolvedParams)
  const serviceResponse = await getServiceData(preview, resolvedParams.slug);
  // console.log("serviceResponse: ", serviceResponse)

  if (!serviceResponse) {
    return {
      title: "Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = serviceResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || serviceResponse?.data?.[0]?.name,
    description: seo?.metaDescription || serviceResponse?.data?.[0]?.excerpt,
    keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
    alternates: {
      canonical: seo?.canonicalURL ||
                `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/service/${resolvedParams.slug}`
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle,
      description: seo?.openGraph?.ogDescription,
      url: seo?.openGraph?.ogUrl,
      images: [
        {
          url: seo?.openGraph?.ogImage?.url,
          width: seo?.openGraph?.ogImage?.width,
          height: seo?.openGraph?.ogImage?.height,
          alt: seo?.openGraph?.ogImage?.alternativeText || 'DWAO Image',
        },
      ],
      type: seo?.openGraph?.ogType || 'website'
    }
  };
}

const DV360 = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true";

  const serviceResponse = await getServiceData(preview, resolvedParams.slug);

  const { data, error } = serviceResponse;
  // console.log(data, error)
  if (error) {
    return (
      <div className='h-screen block'>
        <h1 className='text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full'>{error}</h1>
      </div>
    )
  }
  if (Array.isArray(data) && data?.length <= 0) {
    return (<div className='h-screen block'>
      <h1 className='text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full'>Data Not Found!</h1>
    </div>)
  }

  return (
    <>
      <StructuredData data={serviceResponse?.data?.[0]?.seo?.structuredData} />
      <Dv360Service serviceData={serviceResponse?.data[0]} />
    </>
  );
};

export default DV360;