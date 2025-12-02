import NotFound from "@/app/not-found";
import StructuredData from "@/components/StructuredData";
import AboutWrapper from "@/components/wrapper/about";
import { getAboutData } from "@/libs/apis/data/about";

// 🔹 Shared fetcher
async function fetchAboutData(searchParams) {
  const preview = (await searchParams)?.preview === "true";
  const aboutResponse = await getAboutData(preview);
  return { aboutResponse, preview };
}

// 🔹 Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  const { aboutResponse } = await fetchAboutData(searchParams);

  if (!aboutResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = aboutResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || aboutResponse?.data?.[0]?.title,
    description: seo?.metaDescription || aboutResponse?.data?.[0]?.excerpt,
    ...(seo?.keywords && {
      keywords: seo.keywords.split(",").map((k) => k.trim()),
    }),
    alternates: {
      canonical:
        seo?.canonicalURL ||
        `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/about/`,
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
const About = async ({ searchParams }) => {
  const { aboutResponse, preview } = await fetchAboutData(searchParams);

  const { data, error } = aboutResponse || {};

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
      <StructuredData data={data?.[0]?.seo?.structuredData} />
      <AboutWrapper data={data[0]} preview={preview} />
    </>
  );
};

export default About;
