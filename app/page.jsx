import StructuredData from "@/components/StructuredData";
import HomeWrapper from "@/components/wrapper/home";
import { getHome } from "@/libs/apis/data/home";
import { headers } from "next/headers";

// Generate dynamic metadata
export async function generateMetadata({searchParams }) {
  const paramsValue = await searchParams;
  const preview = paramsValue?.preview === "true";
  const homeResponse = await getHome(preview);

  if (!homeResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = homeResponse?.data[0]?.seo || {};
  // console.log("Seo: ", seo);

  return {
    title: seo?.metaTitle || homeResponse?.data[0]?.title,
    description: seo?.metaDescription || homeResponse?.data[0]?.excerpt,
    keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
    alternates: {
      canonical: seo?.canonicalURL || `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}`
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

export default async function Home({ searchParams }) {
  const paramsValue = await searchParams;
  const preview = paramsValue?.preview === "true";

  const requestHeaders = await headers();

  const userAgent = requestHeaders.get('user-agent'); //User-Agent contains information about the client's browser and device
  const isMobile = /mobile/i.test(userAgent || ""); //checks if the word "mobile" appears in the userAgent string.

  const homeResponse = await getHome(isMobile ? "mobile" : "desktop", preview);

  const { data, error } = homeResponse;

  if (error) {
    return (
      <div className='h-screen block'>
        <h1 className='text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full'>{error}</h1>
      </div>
    )
  }
  if (Array.isArray(data) && (!data || data.length <= 0)) {
    return (<div className='h-screen block'>
      <h1 className='text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full'>Data Not Found!</h1>
    </div>)
  }

  return (
    <>
      <StructuredData data={homeResponse?.data[0]?.seo?.structuredData} />
      <HomeWrapper isMobile={isMobile} data={homeResponse?.data[0]} preview={preview} />
    </>
  );
}
