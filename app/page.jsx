import StructuredData from "@/components/StructuredData";
import HomeWrapper from "@/components/wrapper/home";
import { getHome } from "@/libs/apis/data/home";
import { headers } from "next/headers";

async function fetchHomeData(searchParams) {
  const preview = searchParams?.preview === "true";
  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") || "";
  const isMobile = /mobile/i.test(userAgent);

  const homeResponse = await getHome(isMobile ? "mobile" : "desktop", preview);

  return { homeResponse, isMobile, preview };
}

// Generate dynamic metadata using same fetch
export async function generateMetadata({ searchParams }) {
  const { homeResponse } = await fetchHomeData(searchParams);

  if (!homeResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = homeResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || homeResponse?.data?.[0]?.title,
    description: seo?.metaDescription || homeResponse?.data?.[0]?.excerpt,
    keywords: seo?.keywords ? seo?.keywords.split(",").map((k) => k.trim()) : [],
    alternates: {
      canonical: seo?.canonicalURL || `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}`,
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
          alt: seo?.openGraph?.ogImage?.alternativeText || "DWAO Image",
        },
      ],
      type: seo?.openGraph?.ogType || "website",
    },
    other: {
      "google-site-verification": "ZnraCz2u59KXHgwJ0BEfTyYqrukOV3TpDB6uUNlUfvM",
    },
  };
}

export default async function Home({ searchParams }) {
  const { homeResponse, isMobile, preview } = await fetchHomeData(searchParams);

  const { data, error } = homeResponse;

  if (error) {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          {error}
        </h1>
      </div>
    );
  }
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          Data Not Found!
        </h1>
      </div>
    );
  }

  return (
    <>
      <StructuredData data={data[0]?.seo?.structuredData} />
      <HomeWrapper isMobile={isMobile} data={data[0]} preview={preview} />
    </>
  );
}
