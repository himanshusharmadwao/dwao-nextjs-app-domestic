import StructuredData from "@/components/StructuredData";
import ContactWrapper from "@/components/wrapper/contact"
import { getContact } from "@/libs/apis/data/contact";

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
    const params = await searchParams;
    const preview = params?.preview === "true";
    const contactResponse = await getContact(preview);

    if (!contactResponse) {
        return {
            title: "Data Not Found",
            description: "The requested source could not be found.",
        };
    }

    const seo = contactResponse?.data[0]?.seo || {};
    // console.log("Seo: ", seo);

    return {
        title: seo?.metaTitle || contactResponse?.data[0]?.title,
        description: seo?.metaDescription || contactResponse?.data[0]?.excerpt,
        keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
        alternates: {
            canonical: seo?.canonicalURL ||
                `${process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL}/contact`
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

const Contact = async ({ searchParams }) => {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";
    // console.log("preview: ", preview)

    const contactResponse = await getContact(preview);

    const { data, error } = contactResponse;
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
            <StructuredData data={contactResponse?.data[0]?.seo?.structuredData} />
            <ContactWrapper data={contactResponse?.data[0]} preview={preview} />
        </>
    )
}

export default Contact