import StructuredData from "@/components/StructuredData";
import ReviewWrapper from "@/components/wrapper/marketing-automation-team";
import { getReviews } from "@/libs/apis/data/reviews";

// 🔹 Centralized fetcher
async function fetchReviewData(slug, searchParams) {
  const resolvedSearchParams = await searchParams;
  const preview = resolvedSearchParams?.preview === "true";

  const reviewResponse = await getReviews(preview, slug);
  return { preview, reviewResponse };
}

// 🔹 Generate dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const { reviewResponse } = await fetchReviewData(slug, searchParams);

  if (!reviewResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = reviewResponse?.data?.seo || {};

  return {
    title: seo?.metaTitle || reviewResponse?.data?.title,
    description: seo?.metaDescription || reviewResponse?.data?.excerpt,
    keywords: seo?.keywords
      ? seo.keywords.split(",").map((keyword) => keyword.trim())
      : [],
    alternates: {
      canonical:
        seo?.canonicalURL ||
        `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/reviews/${slug}/`,
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

// 🔹 Page component
const ReviewMat = async ({params, searchParams }) => {
  const { slug } = params;
  const { preview, reviewResponse } = await fetchReviewData(slug, searchParams);
  const { data, error } = reviewResponse || {};
  if (error) {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          {error}
        </h1>
      </div>
    );
  }
  if (Array.isArray(data) && data.length <= 0) {
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
      <StructuredData data={reviewResponse?.data?.seo?.structuredData} />
      <ReviewWrapper reviewResponse={reviewResponse?.data[0]} preview={preview} />
    </>
  );
};

export default ReviewMat;
