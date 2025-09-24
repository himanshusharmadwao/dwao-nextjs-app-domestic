import NotFound from "@/app/not-found";
import StructuredData from "@/components/StructuredData";
import SingleBlogWrapper from "@/components/wrapper/single-blog";
import { getBlog } from "@/libs/apis/data/blog";

// 🔹 Generate dynamic metadata
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const preview = (await searchParams)?.preview === "true";

  const blogsResponse = await getBlog(preview, resolvedParams.slug);

  if (!blogsResponse) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const seo = blogsResponse?.data?.[0]?.seo || {};

  return {
    title: seo?.metaTitle || blogsResponse?.data?.[0]?.title,
    description: seo?.metaDescription || blogsResponse?.data?.[0]?.excerpt,
    ...(seo?.keywords && {
      keywords: seo.keywords.split(",").map(keyword => keyword.trim()),
    }),
    alternates: {
      canonical:
        seo?.canonicalURL ||
        `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: seo?.openGraph?.ogTitle,
      description: seo?.openGraph?.ogDescription,
      url: seo?.openGraph?.ogUrl,
      images: seo?.openGraph?.ogImage
        ? [
            {
              url: seo.openGraph.ogImage.url,
              width: seo.openGraph.ogImage.width,
              height: seo.openGraph.ogImage.height,
              alt: seo.openGraph.ogImage.alternativeText || "DWAO Image",
            },
          ]
        : [],
      type: seo?.openGraph?.ogType || "website",
    },
  };
}

// 🔹 Page renderer
const SingleBlog = async ({ params, searchParams }) => {
  const resolvedParams = await params;
  const preview = (await searchParams)?.preview === "true";

  const blogsResponse = await getBlog(preview, resolvedParams.slug);

  if (blogsResponse?.status === "error") {
    return (
      <div className="h-screen block">
        <h1 className="text-black lg:text-[54px] text-[32px] font-bold text-center flex justify-center items-center h-full">
          Something went wrong!! Please try again later.
        </h1>
      </div>
    );
  } else if (blogsResponse?.status === "not_found") {
    return <NotFound />;
  }

  const pageData = blogsResponse?.data?.[0];
  if (!pageData) {
    return <NotFound />;
  }

  return (
    <>
      <StructuredData data={pageData?.seo?.structuredData} />
      <SingleBlogWrapper
        pageData={pageData}
        relatedBlogs={blogsResponse?.related}
        preview={preview}
      />
    </>
  );
};

export default SingleBlog;
