import BlogWrapper from "@/components/wrapper/blog";

export async function generateMetadata() {

    return {
        title: "Blogs",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/blog/`
        }
    };
}

const Blog = async ({ searchParams }) => {
    const paramsValue = await searchParams;
    const preview = paramsValue?.preview === "true";

    // console.log("preview level 1: ", preview)

    return (
        <>
            <BlogWrapper preview={preview} />
        </>
    );
};

export default Blog;