import { getRevalidateTime } from "@/libs/utils";

// Fetch Insight Categories (Indian data only)
export const getInsightCategory = async (preview = false) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-categories?populate=*` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) url += `&status=draft`;

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return { data: null, error: finalResponse?.error?.message || "Unknown error" };
    }

    return { data: finalResponse?.data || null, error: null };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Fetch Single Insight Blog with Related (Indian data only)
export const getInsightBlog = async (preview = false, slug = '') => {
  try {
    let mainUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-blogs?` +
      `populate[0]=brandLogo&populate[1]=category&populate[2]=sub_category&populate[3]=thumbnail` +
      `&populate[4]=featuredImage&populate[5]=stats&populate[6]=background&populate[7]=valueVisual` +
      `&populate[8]=objective&populate[9]=solution&populate[10]=insightVisual` +
      `&populate[11]=result.resultStats&populate[12]=insightTestimonial&populate[13]=insightTestimonial.image` +
      `&populate[14]=seo&populate[15]=seo.openGraph&populate[16]=seo.openGraph.ogImage` +
      `&filters[slug][$eq]=${slug}` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) mainUrl += `&status=draft`;

    let response = await fetch(mainUrl, {
      next: { revalidate: getRevalidateTime(preview) },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) throw new Error(`Failed: ${response.status}`);

    const insight = await response.json();
    let mainInsight = insight?.data?.[0];

    if (!mainInsight) return null;

    const categorySlug = mainInsight?.category?.slug;

    let related = [];
    if (categorySlug) {
      try {
        let relatedUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-blogs?` +
          `populate[0]=thumbnail&populate[1]=stats&populate[2]=category&fields[0]=title&fields[1]=slug` +
          `&fields[2]=createdAt&pagination[pageSize]=4&filters[category][slug][$eq]=${categorySlug}` +
          `&filters[slug][$ne]=${slug}` +
          `&filters[regions][slug][$eq]=in-en`;

        if (preview) relatedUrl += `&status=draft`;

        const relatedResponse = await fetch(relatedUrl, {
          next: { revalidate: getRevalidateTime(preview) },
          signal: AbortSignal.timeout(5000),
        });

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          related = relatedData?.data || [];
        }
      } catch (relatedError) {
        console.warn("Failed to fetch related insights:", relatedError);
      }
    }

    return {
      data: [mainInsight],
      related,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Fetch All Insight Blogs (Indian data only)
export const getAllInsightBlogs = async (
  page = 1,
  pageSize = 6,
  category = null,
  subCategory = null,
  preview = false
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-blogs?` +
      'populate[brandLogo][populate]=*&' +
      'populate[category][populate]=*&' +
      'populate[sub_category][populate]=*&' +
      'populate[thumbnail][populate]=*&' +
      'populate[featuredImage][populate]=*&' +
      'populate[stats][populate]=*&' +
      'populate[background][populate]=*&' +
      'populate[valueVisual][populate]=*&' +
      'populate[objective][populate]=*&' +
      'populate[solution][populate]=*&' +
      'populate[insightVisual][populate]=*&' +
      'populate[result][fields]=title,heading,markdownContent&' +
      'populate[result][populate][resultStats]=*&' +
      'populate[insightTestimonial][populate]=*&' +
      'populate[seo][populate]=*&' +
      `pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
      `&filters[regions][slug][$eq]=in-en`;

    if (category) {
      url += `&filters[category][name][$eq]=${encodeURIComponent(category)}`;
    }

    if (subCategory) {
      url += `&filters[sub_category][name][$eq]=${encodeURIComponent(subCategory)}`;
    }

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return { data: null, error: finalResponse?.error?.message || "Unknown error" };
    }

    return {
      data: finalResponse?.data || [],
      meta: finalResponse?.meta || { pagination: { total: 0 } },
    };
  } catch (error) {
    console.error("Error fetching insight blogs:", error);
    throw error;
  }
};
