import StructuredData from "@/components/StructuredData";
import PrivacyPolicyWrapper from "@/components/wrapper/privacy-policy";
import { getPolicy } from "@/libs/apis/data/privacyPolicy";

// Generate dynamic metadata
export async function generateMetadata({ searchParams }) {
  const paramsValue = await searchParams;
  const preview = paramsValue?.preview === "true";
  const policyResponse = await getPolicy(preview);

  if (!policyResponse) {
    return {
      title: "Data Not Found",
      description: "The requested source could not be found.",
    };
  }

  const seo = policyResponse?.data?.seo || {};
  // console.log("Seo: ", seo);

  return {
    title: seo?.metaTitle || policyResponse?.data?.title,
    description: seo?.metaDescription || policyResponse?.data?.excerpt,
    keywords: seo?.keywords ? seo?.keywords.split(',').map(keyword => keyword.trim()) : [],
    alternates: {
      canonical: seo?.canonicalURL ||
                `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/privacy-policy`
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

const PrivacyPolicy = async ({ searchParams }) => {
  const paramsValue = await searchParams;
  const preview = paramsValue?.preview === "true";

  const policyResponse = await getPolicy(preview);
  const { data, error } = policyResponse;
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
      <StructuredData data={policyResponse?.data?.seo?.structuredData} />
      <PrivacyPolicyWrapper policyResponse={policyResponse?.data[0]} preview={preview} />
    </>
  );
};

export default PrivacyPolicy;