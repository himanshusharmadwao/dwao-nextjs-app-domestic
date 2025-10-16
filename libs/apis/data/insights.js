import { getRevalidateTime, debugFetch, logCacheHit, logCacheMiss } from "@/libs/utils";
import {
  getCachedApiResult,
  setCachedApiResult,
  hasCachedApiResult,
  getInFlightRequest,
  setInFlightRequest,
  hasInFlightRequest
} from "@/libs/apis/cache";

// Fetch Insight Categories (Indian data only, cached)
export const getInsightCategory = async (preview = false) => {
  try {
    if (hasCachedApiResult("getInsightCategory", preview, "default")) {
      logCacheHit("getInsightCategory", preview, "default");
      return getCachedApiResult("getInsightCategory", preview, "default");
    }

    if (hasInFlightRequest("getInsightCategory", preview, "default")) {
      console.log("🔀 Reusing in-flight request: getInsightCategory", { preview });
      return await getInFlightRequest("getInsightCategory", preview, "default");
    }

    logCacheMiss("getInsightCategory", preview, "default");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-categories?populate=*` +
        `&filters[regions][slug][$eq]=default`;

      if (preview) url += `&status=draft`;

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

      setCachedApiResult("getInsightCategory", result, preview, "default");
      return result;
    })();

    setInFlightRequest("getInsightCategory", apiPromise, preview, "default");
    return await apiPromise;
  } catch (error) {
    console.error("Error:", error);
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getInsightCategory", errorResult, preview, "default");
    return errorResult;
  }
};

// Fetch Single Insight Blog with Related (Indian data only, cached)
export const getInsightBlog = async (preview = false, slug = '') => {
  try {
    const cacheKey = `getInsightBlog_${slug}`;

    if (hasCachedApiResult(cacheKey, preview, "in-en")) {
      logCacheHit("getInsightBlog", preview, "in-en");
      return getCachedApiResult(cacheKey, preview, "in-en");
    }

    if (hasInFlightRequest(cacheKey, preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getInsightBlog", { slug, preview });
      return await getInFlightRequest(cacheKey, preview, "in-en");
    }

    logCacheMiss("getInsightBlog", preview, "in-en");

    const apiPromise = (async () => {
      let mainUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-blogs?` +
        `populate[0]=brandLogo&populate[1]=category&populate[2]=sub_category&populate[3]=thumbnail` +
        `&populate[4]=featuredImage&populate[5]=stats&populate[6]=background&populate[7]=valueVisual` +
        `&populate[8]=objective&populate[9]=solution&populate[10]=insightVisual` +
        `&populate[11]=result.resultStats&populate[12]=insightTestimonial&populate[13]=insightTestimonial.image` +
        `&populate[14]=seo&populate[15]=seo.openGraph&populate[16]=seo.openGraph.ogImage` +
        `&filters[slug][$eq]=${slug}` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) mainUrl += `&status=draft`;

      let response = await debugFetch(mainUrl, {
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

          const relatedResponse = await debugFetch(relatedUrl, {
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

      const result = { data: [mainInsight], related };
      setCachedApiResult(cacheKey, result, preview, "in-en");
      return result;
    })();

    setInFlightRequest(cacheKey, apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    console.error("Error:", error);
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    const cacheKey = `getInsightBlog_${slug}`;
    setCachedApiResult(cacheKey, errorResult, preview, "in-en");
    return errorResult;
  }
};

// Fetch All Insight Blogs (Indian data only, cached)
export const getAllInsightBlogs = async (
  page = 1,
  pageSize = 6,
  category = null,
  subCategory = null,
  preview = false
) => {
  try {
    const cacheKey = { page, pageSize, category, subCategory, preview, region: "in-en" };

    if (hasCachedApiResult("getAllInsightBlogs", cacheKey)) {
      logCacheHit("getAllInsightBlogs", preview, "in-en");
      return getCachedApiResult("getAllInsightBlogs", cacheKey);
    }

    if (hasInFlightRequest("getAllInsightBlogs", cacheKey)) {
      console.log("🔀 Reusing in-flight request: getAllInsightBlogs", cacheKey);
      return await getInFlightRequest("getAllInsightBlogs", cacheKey);
    }

    logCacheMiss("getAllInsightBlogs", preview, "in-en");

    const apiPromise = (async () => {
      let url =
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/insight-blogs?` +
        `fields[0]=title&fields[1]=slug&fields[2]=insightStatus&` +
        `populate[thumbnail][fields][0]=url&` +
        `populate[category][fields][0]=name&` +
        `populate[sub_category][fields][0]=name&` +
        `populate[regions][fields][0]=slug&` +
        `filters[regions][slug][$eq]=in-en&` +
        `pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
        `&sort[0]=createdAt:desc`;

      if (category) {
        url += `&filters[category][name][$eq]=${encodeURIComponent(category)}`;
      }

      if (subCategory) {
        url += `&filters[sub_category][name][$eq]=${encodeURIComponent(subCategory)}`;
      }

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
        result = {
          data: finalResponse?.data || [],
          meta: finalResponse?.meta || { pagination: { total: 0 } },
        };
      }

      setCachedApiResult("getAllInsightBlogs", result, cacheKey);
      return result;
    })();

    setInFlightRequest("getAllInsightBlogs", apiPromise, cacheKey);
    return await apiPromise;
  } catch (error) {
    console.error("Error fetching insight blogs:", error);
    const errorResult = {
      data: [],
      meta: { pagination: { total: 0 } },
      error: error.message || "Something went wrong"
    };
    setCachedApiResult("getAllInsightBlogs", errorResult, cacheKey);
    return errorResult;
  }
};
