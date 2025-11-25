import React from "react";
import qs from "qs";
import NotFound from "@/app/not-found.jsx";
import SinglePageWrapper from "@/components/wrapper/single-page";
import { getPartner } from "@/libs/apis/data/partners";
import StructuredData from "@/components/StructuredData";
import { getRegions } from "@/libs/apis/data/menu";

// 🔹 Centralized fetcher
async function fetchPartnerPageData(params, searchParams) {
  const { slug } = await params;
  if(slug === "partners-india") return <NotFound />;
  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true";

  const [capabilityResponse, regions] = await Promise.all([
    getPartner(preview, slug),
    getRegions(),
  ]);

  return { slug, preview, capabilityResponse, regions };
}

// 🔹 Generate dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  try {
    const { slug, capabilityResponse } = await fetchPartnerPageData(
      params,
      searchParams
    );

    if (!capabilityResponse) {
      return {
        title: "Blog Not Found",
        description: "The requested capability blog post could not be found.",
      };
    }

    const seo = capabilityResponse?.data?.[0]?.seo || {};

    return {
      title: seo?.metaTitle || capabilityResponse?.data?.[0]?.title,
      description:
        seo?.metaDescription || "Explore our capabilities and expertise.",
      ...(seo?.keywords && {
        keywords: seo.keywords.split(",").map((k) => k.trim()),
      }),
      alternates: {
        canonical:
          seo?.canonicalURL ||
          `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/partners/${slug}`,
      },
      openGraph: {
        title: seo?.openGraph?.ogTitle,
        description: seo?.openGraph?.ogDescription,
        url: seo?.openGraph?.ogUrl,
        images: seo?.openGraph?.ogImage
          ? [
              {
                url: seo.openGraph.ogImage.url,
                width: seo.openGraph.ogImage.width,
                height: seo.openGraph.ogImage.height,
                alt: seo.openGraph.ogImage.alternativeText || "DWAO Image",
              },
            ]
          : [],
        type: seo?.openGraph?.ogType || "website",
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while loading the blog post.",
    };
  }
}

// 🔹 Page renderer
const DynamicPages = async ({ params, searchParams }) => {
  const { capabilityResponse, regions } = await fetchPartnerPageData(
    params,
    searchParams
  );

  if (!capabilityResponse?.data) {
    return <NotFound />;
  }

  return (
    <>
      <StructuredData
        data={capabilityResponse?.data?.[0]?.seo?.structuredData}
      />
      <SinglePageWrapper
        pageData={capabilityResponse.data[0]}
        relatedCapabilities={capabilityResponse.related}
        regions={regions}
        type="partners"
      />
    </>
  );
};

export default DynamicPages;
