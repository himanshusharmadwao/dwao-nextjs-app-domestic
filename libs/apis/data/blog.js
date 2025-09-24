import { getRevalidateTime, debugFetch, logCacheHit, logCacheMiss } from "@/libs/utils";
import {
  getCachedApiResult,
  setCachedApiResult,
  hasCachedApiResult,
  getInFlightRequest,
  setInFlightRequest,
  hasInFlightRequest
} from "@/libs/apis/cache";

export const getCategory = async (preview = false) => {
  try {
    if (hasCachedApiResult("getCategory", preview, "in-en")) {
      logCacheHit("getCategory", preview, "in-en");
      return getCachedApiResult("getCategory", preview, "in-en");
    }

    if (hasInFlightRequest("getCategory", preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getCategory", { preview });
      return await getInFlightRequest("getCategory", preview, "in-en");
    }

    logCacheMiss("getCategory", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog-categories?populate=*`;
      url += `&filters[regions][slug][$eq]=in-en`;

      if (preview) {
        url += `&status=draft`;
      }

      let response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      let finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data || null, error: null };
      }

      setCachedApiResult("getCategory", result, preview, "in-en");
      return result;
    })();

    setInFlightRequest("getCategory", apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    console.error("Error:", error);
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getCategory", errorResult, preview, "in-en");
    return errorResult;
  }
};

export const getBlog = async (preview = false, slug) => {
  try {
    const cacheKey = `getBlog_${slug}`;

    if (hasCachedApiResult(cacheKey, preview, "in-en")) {
      logCacheHit("getBlog", preview, "in-en");
      return getCachedApiResult(cacheKey, preview, "in-en");
    }

    if (hasInFlightRequest(cacheKey, preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getBlog", { slug, preview });
      return await getInFlightRequest(cacheKey, preview, "in-en");
    }

    logCacheMiss("getBlog", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?` +
        `populate[0]=category&populate[1]=sub_category&populate[2]=author&populate[3]=author.image` +
        `&populate[4]=seo&populate[5]=seo.openGraph&populate[6]=seo.openGraph.ogImage` +
        `&populate[7]=thumbnail&populate[8]=featuredImage` +
        `&populate[9]=regions` +
        `&filters[slug][$eq]=${slug}&filters[regions][slug][$eq]=in-en`;

      if (preview) {
        url += `&status=draft`;
      }

      let response = await debugFetch(url, {
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

        const relatedResponse = await debugFetch(relatedUrl, {
          next: { revalidate: getRevalidateTime(preview) },
        });

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          related = relatedData?.data || [];
        }
      }

      const result = { data: [mainBlog], related };
      setCachedApiResult(cacheKey, result, preview, "in-en");
      return result;
    })();

    setInFlightRequest(cacheKey, apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    console.error("Error:", error);
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    const cacheKey = `getBlog_${slug}`;
    setCachedApiResult(cacheKey, errorResult, preview, "in-en");
    return errorResult;
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
    const cacheKey = { page, pageSize, category, subCategory, preview, region: "in-en" };

    if (hasCachedApiResult("getAllBlogs", cacheKey)) {
      logCacheHit("getAllBlogs", preview, "in-en");
      return getCachedApiResult("getAllBlogs", cacheKey);
    }

    if (hasInFlightRequest("getAllBlogs", cacheKey)) {
      console.log("🔀 Reusing in-flight request: getAllBlogs", cacheKey);
      return await getInFlightRequest("getAllBlogs", cacheKey);
    }

    logCacheMiss("getAllBlogs", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?` +
        // ✅ Only fetch needed fields
        `fields[0]=title&fields[1]=slug&fields[2]=excerpt` +
        `&populate[category][fields][0]=name` +
        `&populate[sub_category][fields][0]=name` +
        `&populate[thumbnail][fields][0]=url` +
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

      let response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      let finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = {
          data: finalResponse?.data || [],
          meta: finalResponse?.meta || { pagination: { total: 0 } },
        };
      }

      setCachedApiResult("getAllBlogs", result, cacheKey);
      return result;
    })();

    setInFlightRequest("getAllBlogs", apiPromise, cacheKey);
    return await apiPromise;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    const errorResult = {
      data: [],
      meta: { pagination: { total: 0 } },
      error: error.message || "Something went wrong"
    };
    setCachedApiResult("getAllBlogs", errorResult, cacheKey);
    return errorResult;
  }
};
