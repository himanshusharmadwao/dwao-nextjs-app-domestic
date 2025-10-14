// Smart caching system for API responses within a single request lifecycle
// Prevents redundant API calls and implements smart region validation

class RequestCache {
  constructor() {
    this.cache = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      totalSaved: 0
    };
  }

  // Generate a cache key from URL and options
  generateKey(url, options = {}) {
    // Create a stable key by sorting options
    const sortedOptions = JSON.stringify(options, Object.keys(options).sort());
    return `${url}_${sortedOptions}`;
  }

  // Get cached response
  get(url, options) {
    const key = this.generateKey(url, options);
    const cached = this.cache.get(key);
    if (cached) {
      this.stats.hits++;
      return cached;
    }
    this.stats.misses++;
    return null;
  }

  // Set cached response
  set(url, options, data) {
    const key = this.generateKey(url, options);
    this.cache.set(key, data);
  }

  // Check if cache has the key
  has(url, options) {
    const key = this.generateKey(url, options);
    return this.cache.has(key);
  }

  // Get cache statistics
  getStats() {
    return { ...this.stats };
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.stats = { hits: 0, misses: 0, totalSaved: 0 };
  }
}

// Create a singleton instance for each request
let requestCache;

export function getRequestCache() {
  if (!requestCache) {
    requestCache = new RequestCache();
  }
  return requestCache;
}

// Special caches for frequently accessed data
let regionsCache = null;
let validRegionsCache = null;

// Regions cache functions
export function getCachedRegions() {
  return regionsCache;
}

export function setCachedRegions(data) {
  regionsCache = data;
  // Also cache the list of valid region slugs for quick validation
  if (data?.data && Array.isArray(data.data)) {
    validRegionsCache = data.data.map(region => region.slug).filter(Boolean);
  }
}

export function getValidRegions() {
  return validRegionsCache;
}

// Smart region validation to prevent failed API calls
export function isValidRegion(regionSlug) {
  if (!validRegionsCache) {
    return null; // Unknown - regions not loaded yet
  }
  return validRegionsCache.includes(regionSlug);
}

// Generic function cache for API responses
const functionCache = new Map();

// In-flight request tracking to prevent duplicate concurrent requests
const inFlightRequests = new Map();

export function getCachedApiResult(functionName, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  return functionCache.get(key);
}

export function setCachedApiResult(functionName, result, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  functionCache.set(key, result);
}

export function hasCachedApiResult(functionName, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  return functionCache.has(key);
}

// Request deduplication functions
export function getInFlightRequest(functionName, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  return inFlightRequests.get(key);
}

export function setInFlightRequest(functionName, promise, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  inFlightRequests.set(key, promise);

  // Clean up after promise resolves
  promise.finally(() => {
    inFlightRequests.delete(key);
  }).catch(() => { }); // Ignore errors in cleanup
}

export function hasInFlightRequest(functionName, ...args) {
  const key = `${functionName}_${JSON.stringify(args)}`;
  return inFlightRequests.has(key);
}