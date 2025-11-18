import { getRevalidateTime } from "@/libs/utils";

export const getCapability = async (preview = false, slug) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/capabilities?` +
      `populate[0]=thumbnail&populate[1]=featuredImage&populate[2]=category&populate[3]=sub_category` +
      `&populate[4]=section.visual&populate[5]=section.content&populate[6]=seo` +
      `&populate[7]=seo.openGraph&populate[8]=seo.openGraph.ogImage` +
      `&filters[category][slug][$ne]=partners`;

    if (slug !== undefined) {
      url += `&filters[slug][$eq]=${slug}`;
    }

    // Always Indian region
    url += `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();
    let mainCapability = finalResponse?.data?.[0];

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return { data: [], error: finalResponse?.error?.message || "Something went wrong", status: "error" };
    }

    if (!finalResponse?.data || finalResponse.data.length === 0) {
      return { data: [], message: "Not Found", status: "not_found" };
    }

    const categorySlug = mainCapability?.category?.slug;
    let related = [];

    if (categorySlug) {
      let relatedUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/capabilities?` +
        `fields[0]=title&fields[1]=slug` +
        `&populate[thumbnail][fields][0]=url` +
        `&populate[category][fields][0]=slug` +
        `&filters[slug][$ne]=${slug}` +
        `&filters[category][slug][$eq]=${categorySlug}` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) {
        relatedUrl += `&status=draft`;
      }

      const relatedResponse = await fetch(relatedUrl, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        related = relatedData?.data || [];
      }
    }

    return {
      data: [mainCapability],
      related,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllCapabilities = async (preview = false) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/capabilities?` +
      `fields[0]=slug&fields[1]=createdAt&fields[2]=updatedAt&` +
      `filters[category][slug][$ne]=partners&` +
      `filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    const response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    const finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return {
        data: [],
        error: finalResponse?.error?.message || "Something went wrong",
        status: "error",
      };
    }

    if (!finalResponse?.data || finalResponse?.data.length === 0) {
      return { data: [], message: "Not Found", status: "not_found" };
    }

    return {
      data: finalResponse.data,
      status: "success",
    };

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
