import InsightCaseWrapper from "@/components/wrapper/insights-and-case-studies";

export async function generateMetadata() {

    return {
        title: "Blogs",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/insights-and-case-studies/`
        }
    };
}

const InsightCaseStudies = async ({ searchParams }) => {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";
    // console.log("preview level 1: ", preview)

    return (
        <>
            <InsightCaseWrapper preview={preview} />
        </>
    );
};

export default InsightCaseStudies;