import StructuredData from "@/components/StructuredData";
import ReviewWrapper from "@/components/wrapper/marketing-automation-team"
import { getReviews } from "@/libs/apis/data/reviews";

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";
    const reviewResponse = await getReviews(preview);

    if (!reviewResponse) {
        return {
            title: "Data Not Found",
            description: "The requested source could not be found.",
        };
    }

    // console.log(reviewResponse)

    const seo = reviewResponse?.data?.seo || {};
    // console.log("Seo: ", seo);

    return {
        title: seo?.metaTitle || reviewResponse?.data?.title,
        description: seo?.metaDescription || reviewResponse?.data?.excerpt,
        keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
        alternates: {
            canonical: seo?.canonicalURL ||
                `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/reviews/marketing-automation-team`
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

const reviewMat = async ({ searchParams }) => {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";
    // console.log("preview: ", preview)

    const reviewResponse = await getReviews(preview);

    const { data, error } = reviewResponse;
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
            <StructuredData data={reviewResponse?.data?.seo?.structuredData} />
            <ReviewWrapper reviewResponse={reviewResponse?.data[0]} preview={preview} />
        </>
    )
}

export default reviewMat