import React from 'react';
import qs from 'qs';
import NotFound from "@/app/not-found.jsx";
import SinglePageWrapper from '@/components/wrapper/single-page';
import { getPartner } from '@/libs/apis/data/partners';
import StructuredData from '@/components/StructuredData';
import { getRegions } from '@/libs/apis/data/menu';

export async function generateMetadata({ searchParams }) {
  try {
    const resolvedSearchParams = await searchParams;
    const preview = resolvedSearchParams?.preview === "true";
    const capabilityResponse = await getPartner(preview);

    if (!capabilityResponse) {
      return {
        title: "Blog Not Found",
        description: "The requested capability blog post could not be found.",
      };
    }

    const seo = capabilityResponse?.data?.[0]?.seo || {};
    // console.log("seo: ", seo)

    return {
      title: seo?.metaTitle || capabilityResponse?.data?.[0]?.title,
      description: seo?.metaDescription || "Explore our capabilities and expertise.",
      ...(seo?.keywords && {
        keywords: seo?.keywords.split(',').map(keyword => keyword.trim()),
      }),
      alternates: {
        canonical: seo?.canonicalURL ||
          `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/partners`
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
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the blog post.",
    };
  }
}

const DynamicPages = async ({ searchParams }) => {

  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true"; //exact comparison because of js non-empty string logic
  const capabilityResponse = await getPartner(preview);

  if (capabilityResponse.data == null) {
    return <NotFound />;
  }

  const regions = await getRegions()

  return (
    <>
      <StructuredData data={capabilityResponse?.data?.[0]?.seo?.structuredData} />
      <SinglePageWrapper pageData={capabilityResponse?.data[0]} relatedCapabilities={capabilityResponse?.related} regions={regions} type="partners" />
    </>
  );
};

export default DynamicPages;