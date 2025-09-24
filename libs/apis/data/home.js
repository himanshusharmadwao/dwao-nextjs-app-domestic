import { getRevalidateTime, debugFetch, logCacheHit, logCacheMiss } from "@/libs/utils";
import {
  getCachedApiResult,
  setCachedApiResult,
  hasCachedApiResult,
  hasInFlightRequest,
  getInFlightRequest,
  setInFlightRequest
} from "@/libs/apis/cache";

// getHome (Indian only, cached)
export const getHome = async (device = "desktop", preview = false) => {
  try {
    const region = "in-en";

    // Check cache first
    if (hasCachedApiResult("getHome", device, preview, region)) {
      logCacheHit("getHome", device, preview, region);
      return getCachedApiResult("getHome", device, preview, region);
    }

    // Check if there's already an in-flight request
    if (hasInFlightRequest("getHome", device, preview, region)) {
      console.log("🔀 Reusing in-flight request: getHome", { device, preview, region });
      return await getInFlightRequest("getHome", device, preview, region);
    }

    logCacheMiss("getHome", device, preview, region);

    // Create a promise for the actual API call
    const apiPromise = (async () => {
      const basePopulate = device === "mobile"
        ? `populate[0]=banner.mobileImg&populate[1]=storyOverlay.image&populate[2]=insightMobileImg`
        : `populate[0]=banner.deskImg&populate[1]=storyOverlay.image&populate[2]=insightDeskImg`;

      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/homes?${basePopulate}` +
        `&populate[3]=seo&populate[4]=seo.openGraph&populate[5]=seo.openGraph.ogImage` +
        `&populate[6]=clientsSlides&populate[7]=clientsSlides.entity&populate[8]=clientsSlides.entity.logo` +
        `&populate[9]=regions` +
        `&filters[regions][slug][$eq]=${region}`;

      if (preview) url += `&status=draft`;

      const response = await debugFetch(url, { next: { revalidate: getRevalidateTime(preview) } });
      const finalResponse = await response.json();

      const result = finalResponse?.error && Object.keys(finalResponse?.error).length > 0
        ? { data: null, error: finalResponse?.error?.message || "Unknown error" }
        : { data: finalResponse.data || null, error: null };

      setCachedApiResult("getHome", result, device, preview, region);
      return result;
    })();

    // Store as in-flight request so duplicates reuse it
    setInFlightRequest("getHome", apiPromise, device, preview, region);

    return await apiPromise;
  } catch (error) {
    const region = "in-en";
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getHome", errorResult, device, preview, region);
    return errorResult;
  }
};

// getClients (Indian only, cached)
export const getClients = async (preview = false) => {
  try {
    if (hasCachedApiResult("getClients", preview, "in-en")) {
      logCacheHit("getClients", preview, "in-en");
      return getCachedApiResult("getClients", preview, "in-en");
    }
    logCacheMiss("getClients", preview, "in-en");

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/clients?populate[entity][populate]=logo` +
      `&pagination[page]=1&pagination[pageSize]=100` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) url += `&status=draft`;

    const response = await debugFetch(url, { next: { revalidate: getRevalidateTime(preview) } });
    const finalResponse = await response.json();

    const result = finalResponse?.error && Object.keys(finalResponse?.error).length > 0
      ? { data: null, error: finalResponse?.error?.message || "Unknown error" }
      : { data: finalResponse?.data || null, error: null };

    setCachedApiResult("getClients", result, preview, "in-en");
    return result;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getClients", errorResult, preview, "in-en");
    return errorResult;
  }
};

// getClientTestimonials (Indian only, cached)
export const getClientTestimonials = async (preview = false) => {
  try {
    if (hasCachedApiResult("getClientTestimonials", preview, "in-en")) {
      logCacheHit("getClientTestimonials", preview, "in-en");
      return getCachedApiResult("getClientTestimonials", preview, "in-en");
    }
    logCacheMiss("getClientTestimonials", preview, "in-en");

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/client-testimonials?populate[0]=entity.image` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) url += `&status=draft`;

    const response = await debugFetch(url, { next: { revalidate: getRevalidateTime(preview) } });
    const finalResponse = await response.json();

    const result = finalResponse?.error && Object.keys(finalResponse?.error).length > 0
      ? { data: null, error: finalResponse?.error?.message || "Unknown error" }
      : { data: finalResponse?.data || null, error: null };

    setCachedApiResult("getClientTestimonials", result, preview, "in-en");
    return result;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getClientTestimonials", errorResult, preview, "in-en");
    return errorResult;
  }
};

// getJoinTheTeam (Indian only, cached)
export const getJoinTheTeam = async (preview = false) => {
  try {
    if (hasCachedApiResult("getJoinTheTeam", preview, "in-en")) {
      logCacheHit("getJoinTheTeam", preview, "in-en");
      return getCachedApiResult("getJoinTheTeam", preview, "in-en");
    }
    logCacheMiss("getJoinTheTeam", preview, "in-en");

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/join-the-teams?populate=*` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) url += `&status=draft`;

    const response = await debugFetch(url, { next: { revalidate: getRevalidateTime(preview) } });
    const finalResponse = await response.json();

    const result = finalResponse?.error && Object.keys(finalResponse?.error).length > 0
      ? { data: null, error: finalResponse?.error?.message || "Unknown error" }
      : { data: finalResponse?.data || null, error: null };

    setCachedApiResult("getJoinTheTeam", result, preview, "in-en");
    return result;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getJoinTheTeam", errorResult, preview, "in-en");
    return errorResult;
  }
};

// reachOut (POST request - no caching)
export const reachOut = async (formData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reach-outs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        data: {
          phone: formData.phone,
          email: formData.email,
        },
      }),
    });
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
