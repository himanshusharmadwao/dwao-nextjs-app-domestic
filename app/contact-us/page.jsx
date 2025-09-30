import StructuredData from "@/components/StructuredData";
import ContactWrapper from "@/components/wrapper/contact";
import { getContact } from "@/libs/apis/data/contact";

// 🔹 Shared fetcher
async function fetchContactData(searchParams) {
  const preview = (await searchParams)?.preview === "true";
  const contactResponse = await getContact(preview);
  return { contactResponse, preview };
}

// 🔹 Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  const { contactResponse } = await fetchContactData(searchParams);

  if (!contactResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = contactResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || contactResponse?.data?.[0]?.title,
    description: seo?.metaDescription || contactResponse?.data?.[0]?.excerpt,
    ...(seo?.keywords && {
      keywords: seo.keywords.split(",").map((k) => k.trim()),
    }),
    alternates: {
      canonical:
        seo?.canonicalURL ||
        `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/contact`,
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
const Contact = async ({ searchParams }) => {
  const { contactResponse, preview } = await fetchContactData(searchParams);
  const { data, error } = contactResponse || {};

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
      <ContactWrapper data={pageData} preview={preview} />
    </>
  );
};

export default Contact;
