// app/[...slug]/page.jsx
import React from "react";
import SinglePageWrapper from "@/components/wrapper/single-page";
import StructuredData from "@/components/StructuredData";
import NotFound from "@/app/not-found";

import ServicePage from "@/components/service";
import { getCapability } from "@/libs/apis/data/capabilities";
import { getServiceData } from "@/libs/apis/data/servicePage/service";
import { getRegions } from "@/libs/apis/data/menu";

// 🔹 Centralized data fetcher
async function fetchPageData(slug, preview) {
  const serviceResponse = await getServiceData(preview, slug);
  if (serviceResponse?.data?.length > 0) {
    return { type: "service", response: serviceResponse };
  }

  const capabilityResponse = await getCapability(preview, slug);
  if (capabilityResponse?.data?.length > 0) {
    return { type: "capability", response: capabilityResponse };
  }

  return { type: "not_found", response: null };
}

// 🔹 Metadata generator
export async function generateMetadata({ params, searchParams }) {
  try {
    const { slug } = params;
    const preview = (await searchParams)?.preview === "true";

    const { type, response } = await fetchPageData(slug, preview);

    if (type === "service") {
      const item = response?.data?.[0];
      const seo = item?.seo || {};

      return {
        title: seo?.metaTitle || item?.name,
        description: seo?.metaDescription || item?.excerpt || "",
        ...(seo?.keywords && { keywords: seo.keywords.split(",").map(k => k.trim()) }),
        alternates: {
          canonical: seo?.canonicalURL ||
            `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/service/${slug}/`,
        },
        openGraph: {
          title: seo?.openGraph?.ogTitle,
          description: seo?.openGraph?.ogDescription,
          url: seo?.openGraph?.ogUrl,
          images: seo?.openGraph?.ogImage ? [{
            url: seo.openGraph.ogImage.url,
            width: seo.openGraph.ogImage.width,
            height: seo.openGraph.ogImage.height,
            alt: seo.openGraph.ogImage.alternativeText || "DWAO Image",
          }] : [],
          type: seo?.openGraph?.ogType || "website",
        },
      };
    }

    if (type === "capability") {
      const item = response?.data?.[0];
      const seo = item?.seo || {};

      return {
        title: seo?.metaTitle || item?.title,
        description: seo?.metaDescription || "Explore our capabilities and expertise.",
        ...(seo?.keywords && { keywords: seo.keywords.split(",").map(k => k.trim()) }),
        alternates: {
          canonical: seo?.canonicalURL ||
            `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/${slug}/`,
        },
        openGraph: {
          title: seo?.openGraph?.ogTitle,
          description: seo?.openGraph?.ogDescription,
          url: seo?.openGraph?.ogUrl,
          images: seo?.openGraph?.ogImage ? [{
            url: seo.openGraph.ogImage.url,
            width: seo.openGraph.ogImage.width,
            height: seo.openGraph.ogImage.height,
            alt: seo.openGraph.ogImage.alternativeText || "DWAO Image",
          }] : [],
          type: seo?.openGraph?.ogType || "website",
        },
      };
    }

    return { title: "Page Not Found", description: "The requested source could not be found." };
  } catch (e) {
    console.error("Error generating metadata:", e);
    return { title: "Error", description: "An error occurred while loading the page." };
  }
}

// 🔹 Page renderer
const DynamicPages = async ({ params, searchParams }) => {
  const { slug } = params;
  const preview = (await searchParams)?.preview === "true";

  const { type, response } = await fetchPageData(slug, preview);

  if (type === "service") {
    const { data, error } = response;
    if (error) {
      return (
        <div className="h-screen block">
          <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
            {error}
          </h1>
        </div>
      );
    }

    const item = data?.[0];
    return (
      <>
        <StructuredData data={item?.seo?.structuredData} />
        <ServicePage serviceData={item} />
      </>
    );
  }

  if (type === "capability") {
    if (response?.status === "error") {
      return (
        <div className="h-screen block">
          <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
            Something went wrong
          </h1>
        </div>
      );
    }

    const regions = await getRegions(preview);
    const pageData = response?.data?.[0];
    if (!pageData) return <NotFound />;

    return (
      <>
        <StructuredData data={pageData?.seo?.structuredData} />
        <SinglePageWrapper
          pageData={pageData}
          relatedCapabilities={response?.related}
          regions={regions}
        />
      </>
    );
  }

  return <NotFound />;
};

export default DynamicPages;
