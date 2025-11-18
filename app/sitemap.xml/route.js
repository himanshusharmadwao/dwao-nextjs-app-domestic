import { getAllBlogs } from "@/libs/apis/data/blog";
import { getAllCapabilities } from "@/libs/apis/data/capabilities";
import { getAllInsightBlogs } from "@/libs/apis/data/insights";
import { getAllPartners } from "@/libs/apis/data/partners";
import { getAllServiceData } from "@/libs/apis/data/servicePage/service";

const BASE_URL = process.env.NEXT_PUBLIC_DWAO_DOMESTIC_URL || 'https://dwao.in';

export async function GET() {
  try {
    // ----------------------------
    // Fetch dynamic content
    // ----------------------------
    const [blogsRes, insightsRes, capabilityRes, partnersRes, servicesRes] =
      await Promise.all([
        getAllBlogs(1, 200, null, null, false, "in-en"),
        getAllInsightBlogs(1, 200, null, null, false, "in-en"),
        getAllCapabilities(false),
        getAllPartners(false),
        getAllServiceData(false)
      ]);

    const blogs = blogsRes?.data || [];
    const insights = insightsRes?.data || [];
    const capabilities = capabilityRes?.data || [];
    const partners = partnersRes?.data || [];
    const services = servicesRes?.data || [];

    console.log("partners: >>> ", partners)

    // ----------------------------
    // Static pages
    // ----------------------------
    const staticPages = [
      "/",
      "/about",
      "/partners",
      "/blog",
      "/insights-and-case-studies",
      "/contact-us",
      "/privacy-policy",
      "/culture",
      "/reviews/marketing-automation-team",
    ];

    const urls = [];

    staticPages.forEach((path) => {
      urls.push({
        loc: `${BASE_URL}${path}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.8,
      });
    });

    // ----------------------------
    // Dynamic: Capabilities
    // ----------------------------
    capabilities.forEach((item) => {
      urls.push({
        loc: `${BASE_URL}/${item.slug}`,
        lastmod: item.updatedAt || item.createdAt || new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      });
    });

    // ----------------------------
    // Dynamic: Partners
    // ----------------------------
    partners
      .filter((item) => item.slug !== "partners-india")
      .forEach((item) => {
        urls.push({
          loc: `${BASE_URL}/partners/${item.slug}`,
          lastmod: item.updatedAt || item.createdAt || new Date().toISOString(),
          changefreq: "monthly",
          priority: 0.7,
        });
      });

    // ----------------------------
    // Dynamic: Blogs
    // ----------------------------
    blogs.forEach((blog) => {
      urls.push({
        loc: `${BASE_URL}/blog/${blog.slug}`,
        lastmod: blog.updatedAt || blog.createdAt,
        changefreq: "weekly",
        priority: 0.6,
      });
    });

    // ----------------------------
    // Dynamic: Insight & Case Studies
    // ----------------------------
    insights.forEach((item) => {
      const industry = item.stats?.industry || "general";
      const industrySlug = industry.toLowerCase().replace(/\s+/g, "-");

      urls.push({
        loc: `${BASE_URL}/insights-and-case-studies/${industrySlug}/${item.slug}`,
        lastmod: item.updatedAt || item.createdAt,
        changefreq: "monthly",
        priority: 0.6,
      });
    });

    // ----------------------------
    // Dynamic: Domestic Services
    // ----------------------------
    services.forEach((service) => {
      urls.push({
        loc: `${BASE_URL}/${service.slug}`,
        lastmod: service.updatedAt || service.createdAt || new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.75,
      });
    });

    // ----------------------------
    // Build XML
    // ----------------------------
    const generateUrlEntry = (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(generateUrlEntry).join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);

    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallback, {
      headers: { "Content-Type": "application/xml" },
    });
  }
}
