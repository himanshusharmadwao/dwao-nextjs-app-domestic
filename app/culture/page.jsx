import StructuredData from "@/components/StructuredData";
import CultureWrapper from "@/components/wrapper/culture"
import { getCulture } from "@/libs/apis/data/culture";
import { getRegions } from "@/libs/apis/data/menu";

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";
    const cultureResponse = await getCulture(preview);

    if (!cultureResponse) {
        return {
            title: "Data Not Found",
            description: "The requested source could not be found.",
        };
    }

    const seo = cultureResponse?.data[0]?.seo || {};
    // console.log("Seo: ", seo);

    return {
        title: seo?.metaTitle || cultureResponse?.data[0]?.title,
        description: seo?.metaDescription || cultureResponse?.data[0]?.excerpt,
        keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
        alternates: {
            canonical: seo?.canonicalURL ||
                `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/culture`
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

const Culture = async ({ searchParams }) => {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";

    const [
        cultureResponse,
        regions
    ] = await Promise.all([
        getCulture(preview),
        getRegions(preview)
    ]);

    const { data, error } = cultureResponse;

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
            <StructuredData data={cultureResponse?.data[0]?.seo?.structuredData} />
            <CultureWrapper data={cultureResponse?.data[0]} />
        </>
    )
}

export default Culture