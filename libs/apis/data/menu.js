import { getRevalidateTime, debugFetch, logCacheHit, logCacheMiss } from "@/libs/utils";
import {
  getCachedRegions,
  setCachedRegions,
  getCachedApiResult,
  setCachedApiResult,
  hasCachedApiResult,
  getInFlightRequest,
  setInFlightRequest,
  hasInFlightRequest
} from "@/libs/apis/cache";

// Get Main Menu (Indian data only, cached)
export const getMenu = async (preview = false) => {
  try {
    if (hasCachedApiResult("getMenu", preview, "in-en")) {
      logCacheHit("getMenu", preview, "in-en");
      return getCachedApiResult("getMenu", preview, "in-en");
    }

    if (hasInFlightRequest("getMenu", preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getMenu", { preview });
      return await getInFlightRequest("getMenu", preview, "in-en");
    }

    logCacheMiss("getMenu", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/menus?` +
        `populate[menu][populate][subMenu][populate]=subSubMenu&populate=regions` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) url += `&status=draft`;

      const response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      const finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data || null, error: null };
      }

      setCachedApiResult("getMenu", result, preview, "in-en");
      return result;
    })();

    setInFlightRequest("getMenu", apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getMenu", errorResult, preview, "in-en");
    return errorResult;
  }
};

// Get Legal Menu (Indian data only, cached)
export const getLegalMenu = async (preview = false) => {
  try {
    if (hasCachedApiResult("getLegalMenu", preview, "in-en")) {
      logCacheHit("getLegalMenu", preview, "in-en");
      return getCachedApiResult("getLegalMenu", preview, "in-en");
    }

    if (hasInFlightRequest("getLegalMenu", preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getLegalMenu", { preview });
      return await getInFlightRequest("getLegalMenu", preview, "in-en");
    }

    logCacheMiss("getLegalMenu", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/legal-menus?` +
        `populate[menu][populate][subMenu][populate]=subSubMenu&populate=regions` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) url += `&status=draft`;

      const response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      const finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data || null, error: null };
      }

      setCachedApiResult("getLegalMenu", result, preview, "in-en");
      return result;
    })();

    setInFlightRequest("getLegalMenu", apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getLegalMenu", errorResult, preview, "in-en");
    return errorResult;
  }
};

// Get Quick Links (Indian data only, cached)
export const getQuickLinks = async (preview = false) => {
  try {
    if (hasCachedApiResult("getQuickLinks", preview, "in-en")) {
      logCacheHit("getQuickLinks", preview, "in-en");
      return getCachedApiResult("getQuickLinks", preview, "in-en");
    }

    if (hasInFlightRequest("getQuickLinks", preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getQuickLinks", { preview });
      return await getInFlightRequest("getQuickLinks", preview, "in-en");
    }

    logCacheMiss("getQuickLinks", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/quick-links?` +
        `populate[menu][populate][subMenu][populate]=subSubMenu&populate=regions` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) url += `&status=draft`;

      const response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      const finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data || null, error: null };
      }

      setCachedApiResult("getQuickLinks", result, preview, "in-en");
      return result;
    })();

    setInFlightRequest("getQuickLinks", apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getQuickLinks", errorResult, preview, "in-en");
    return errorResult;
  }
};

// Get Secondary Menu (Indian data only, cached)
export const getSecondaryMenu = async (preview = false) => {
  try {
    if (hasCachedApiResult("getSecondaryMenu", preview, "in-en")) {
      logCacheHit("getSecondaryMenu", preview, "in-en");
      return getCachedApiResult("getSecondaryMenu", preview, "in-en");
    }

    if (hasInFlightRequest("getSecondaryMenu", preview, "in-en")) {
      console.log("🔀 Reusing in-flight request: getSecondaryMenu", { preview });
      return await getInFlightRequest("getSecondaryMenu", preview, "in-en");
    }

    logCacheMiss("getSecondaryMenu", preview, "in-en");

    const apiPromise = (async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/secondary-menus?` +
        `populate[menu][populate][subMenu][populate]=subSubMenu&populate=regions` +
        `&filters[regions][slug][$eq]=in-en`;

      if (preview) url += `&status=draft`;

      const response = await debugFetch(url, {
        next: { revalidate: getRevalidateTime(preview) },
      });

      const finalResponse = await response.json();

      let result;
      if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data || null, error: null };
      }

      setCachedApiResult("getSecondaryMenu", result, preview, "in-en");
      return result;
    })();

    setInFlightRequest("getSecondaryMenu", apiPromise, preview, "in-en");
    return await apiPromise;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedApiResult("getSecondaryMenu", errorResult, preview, "in-en");
    return errorResult;
  }
};

// Get Regions (cached)
export const getRegions = async (preview = false) => {
  try {
    const cached = getCachedRegions();
    if (cached) {
      logCacheHit("getRegions", preview);
      return cached;
    }

    if (hasInFlightRequest("getRegions", preview)) {
      console.log("🔀 Reusing in-flight request: getRegions", { preview });
      return await getInFlightRequest("getRegions", preview);
    }

    logCacheMiss("getRegions", preview);

    const apiPromise = (async () => {
      const response = await debugFetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/regions`,
        { next: { revalidate: getRevalidateTime(preview) } }
      );

      const finalResponse = await response.json();

      let result;
      if (
        finalResponse?.data === null &&
        finalResponse?.error &&
        Object.keys(finalResponse?.error).length > 0
      ) {
        result = { data: null, error: finalResponse?.error?.message || "Unknown error" };
      } else {
        result = { data: finalResponse?.data, error: null };
      }

      setCachedRegions(result);
      return result;
    })();

    setInFlightRequest("getRegions", apiPromise, preview);
    return await apiPromise;
  } catch (error) {
    const errorResult = { data: null, error: error.message || "Something went wrong" };
    setCachedRegions(errorResult);
    return errorResult;
  }
};
