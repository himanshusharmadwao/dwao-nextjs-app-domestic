import { getRevalidateTime } from "@/libs/utils";

export const getPolicy = async (preview = false) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/privacy-policies?` +
      `populate[0]=bannerDeskImage&populate[1]=bannerMobileImage&populate[2]=seo` +
      `&populate[3]=seo.openGraph&populate[4]=seo.openGraph.ogImage` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return {
        data: null,
        error: finalResponse?.error?.message || "Unknown error",
      };
    }

    return { data: finalResponse?.data || null, error: null };
  } catch (error) {
    console.error("Error:", error);
    return {
      data: null,
      error: error.message || "Something went wrong",
    };
  }
};
