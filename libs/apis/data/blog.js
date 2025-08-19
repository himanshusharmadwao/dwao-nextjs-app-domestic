import { getRevalidateTime } from "@/libs/utils";

export const getCategory = async (preview = false) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-categories?populate=*`;
    url += `&filters[regions][slug][$eq]=in-en`;

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

    return { data: finalResponse?.data || null, error: null };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getBlog = async (preview = false, slug) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?` +
      `populate[0]=category&populate[1]=sub_category&populate[2]=author&populate[3]=author.image` +
      `&populate[4]=seo&populate[5]=seo.openGraph&populate[6]=seo.openGraph.ogImage` +
      `&populate[7]=thumbnail&populate[8]=featuredImage` +
      `&populate[9]=regions` +
      `&filters[slug][$eq]=${slug}` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();
    let mainBlog = finalResponse?.data?.[0];

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return { data: null, error: finalResponse?.error?.message || "Something went wrong", status: "error" };
    }

    if (!finalResponse?.data || finalResponse.data.length === 0) {
      return { data: null, message: "Not Found", status: "not_found" };
    }

    const categorySlug = mainBlog?.category?.slug;
    let related = [];

    if (categorySlug) {
      let relatedUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?` +
        `populate[0]=category&populate[1]=sub_category&populate[2]=author&populate[3]=author.image` +
        `&populate[4]=seo&populate[5]=seo.openGraph&populate[6]=seo.openGraph.ogImage` +
        `&populate[7]=thumbnail&populate[8]=featuredImage` +
        `&filters[slug][$ne]=${slug}&filters[category][slug][$eq]=${categorySlug}` +
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
      data: [mainBlog],
      related,
    };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllBlogs = async (
  page = 1,
  pageSize = 6,
  category = null,
  subCategory = null,
  preview = false
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?` +
      `populate[category][populate]=*&populate[sub_category][populate]=*` +
      `&populate[author][populate]=*&populate[seo][populate]=*` +
      `&populate[thumbnail][populate]=*&populate[featuredImage][populate]=*` +
      `&pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
      `&sort[0]=createdAt:desc` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }
    if (category) {
      url += `&filters[category][name][$eq]=${encodeURIComponent(category)}`;
    }
    if (subCategory) {
      url += `&filters[sub_category][name][$eq]=${encodeURIComponent(subCategory)}`;
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
    console.error('Error fetching blogs:', error);
    throw error;
  }
};
