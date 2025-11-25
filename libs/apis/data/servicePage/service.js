import { getRevalidateTime, logCacheHit, logCacheMiss } from "@/libs/utils";
import {
  getCachedApiResult,
  setCachedApiResult,
  hasCachedApiResult,
  getInFlightRequest,
  setInFlightRequest,
  hasInFlightRequest,
} from "@/libs/apis/cache";

export const getServiceData = async (preview = false, slug) => {
  try {
    const cacheKey = `getServiceData_domestic_${slug}_${preview}`;

    // 1. Check cache first
    if (hasCachedApiResult(cacheKey)) {
      logCacheHit("getServiceData_domestic", preview, "in-en");
      return getCachedApiResult(cacheKey);
    }

    // 2. Reuse in-flight request if exists
    if (hasInFlightRequest(cacheKey)) {
      console.log("🔀 Reusing in-flight request: getServiceData_domestic", { slug, preview, region: "in-en" });
      return await getInFlightRequest(cacheKey);
    }

    logCacheMiss("getServiceData_domestic", preview, "in-en");

    // 3. Create promise for actual API call
    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/domestic-service-pages?` +
        `populate[0]=banner.trustedBrands&populate[1]=section.card.icon&populate[2]=InfoPanel.InfoPanel.logo` +
        `&populate[3]=InfoPanel.InfoPanel.keyStats.icon&populate[4]=clientTestimonial.testimonial.image` +
        `&populate[5]=faq&populate[6]=faq.faq&populate[7]=seo&populate[8]=seo.openGraph` +
        `&populate[9]=seo.openGraph.ogImage&populate[10]=clientsSlide&populate[11]=clientsSlide.entity` +
        `&populate[12]=clientsSlide.entity.logo&populate[13]=textBlockOne&populate[14]=textBlockOne.image` +
        `&populate[15]=textBlockTwo&populate[16]=textBlockTwo.image&` +
        `&filters[slug][$eq]=${slug}` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) {
        url += `&status=draft`;
      }

      let response = await fetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      let finalResponse = await response.json();

      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        const errorResult = {
          data: [],
          error: finalResponse?.error?.message || "Something went wrong",
          status: "error",
        };
        setCachedApiResult(cacheKey, errorResult);
        return errorResult;
      }

      if (!finalResponse?.data || finalResponse.data.length === 0) {
        const notFoundResult = { data: [], message: "Not Found", status: "not_found" };
        setCachedApiResult(cacheKey, notFoundResult);
        return notFoundResult;
      }

      const result = { data: finalResponse?.data || null, error: null };
      setCachedApiResult(cacheKey, result);
      return result;
    })();

    // 4. Store as in-flight
    setInFlightRequest(cacheKey, apiPromise);

    return await apiPromise;
  } catch (error) {
    console.error("Error:", error);
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    const cacheKey = `getServiceData_domestic_${slug}_${preview}`;
    setCachedApiResult(cacheKey, errorResult);
    return errorResult;
  }
};


export const submitLeadForm = async (formData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lead-forms`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: formData }),
        cache: 'no-store',
      }
    );

    const finalResponse = await response.json();

    if (
      finalResponse?.data === null &&
      finalResponse?.error &&
      Object.keys(finalResponse?.error).length > 0
    ) {
      return { data: null, error: finalResponse?.error?.message || "Unknown error" };
    }

    return { data: finalResponse?.data, error: null };
  } catch (error) {
    return { data: null, error: error.message || "Something went wrong" };
  }
};
