import React from 'react';
import qs from 'qs';
import NotFound from "@/app/not-found.jsx";
import SinglePageWrapper from '@/components/wrapper/single-page';
import { getPartner } from '@/libs/apis/data/partners';
import StructuredData from '@/components/StructuredData';
import { getRegions } from '@/libs/apis/data/menu';

export async function generateMetadata({ params, searchParams }) {
  try {
    const { slug } = await params;
    const resolvedSearchParams = await searchParams;
    const preview = resolvedSearchParams?.preview === "true";
    const capabilityResponse = await getPartner(preview, slug);

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
          `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/partners/${slug}`
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

export const loadPage = async (slug) => {
  const query = qs.stringify({
    filters: {
      slug: {
        $contains: slug
      }
    },
    populate: {
      Header: {
        populate: "*" // Populate all components inside the dynamic zone
      }
    }
  }, { encode: false });

  // console.log(query, "query");

  // try {
  //   const getPageApi = await fetch(`http://localhost:1337/api/pages?${query}`);

  //   if (!getPageApi.ok) {
  //     console.error(`API responded with status: ${getPageApi.status}`);
  //     return null;
  //   }

  //   const page = await getPageApi.json();

  //   if (!page.data || page.data.length === 0) {
  //     return null;
  //   }

  //   return page;
  // } catch (error) {
  //   console.error("Error fetching page data:", error);
  //   return null;
  // }
};

const DynamicPages = async ({ params, searchParams }) => {

  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true"; //exact comparison because of js non-empty string logic
  const capabilityResponse = await getPartner(preview, slug);

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