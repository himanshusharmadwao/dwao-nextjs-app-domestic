import StructuredData from "@/components/StructuredData";
import CultureWrapper from "@/components/wrapper/culture";
import { getCulture } from "@/libs/apis/data/culture";
import { getRegions } from "@/libs/apis/data/menu";

// 🔹 Centralized fetcher
async function fetchCulturePageData(searchParams) {
  const preview = searchParams?.preview === "true";

  const [cultureResponse, regions] = await Promise.all([
    getCulture(preview),
    getRegions(preview),
  ]);

  return { preview, cultureResponse, regions };
}

// 🔹 Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  const { cultureResponse } = await fetchCulturePageData(searchParams);

  if (!cultureResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = cultureResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || cultureResponse?.data?.[0]?.title,
    description: seo?.metaDescription || cultureResponse?.data?.[0]?.excerpt,
    ...(seo?.keywords && {
      keywords: seo.keywords.split(",").map((k) => k.trim()),
    }),
    alternates: {
      canonical:
        seo?.canonicalURL ||
        `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/culture`,
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
}

// 🔹 Page renderer
const Culture = async ({ searchParams }) => {
  const { preview, cultureResponse, regions } =
    await fetchCulturePageData(searchParams);

  const { data, error } = cultureResponse;

  if (error) {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          {error}
        </h1>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length <= 0) {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          Data Not Found!
        </h1>
      </div>
    );
  }

  const pageData = data[0];

  return (
    <>
      <StructuredData data={pageData?.seo?.structuredData} />
      <CultureWrapper data={pageData} regions={regions} preview={preview} />
    </>
  );
};

export default Culture;
