import { getRevalidateTime } from "@/libs/utils";

export const getServiceData = async (preview = false, slug) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/domestic-service-pages?` +
      `populate[0]=banner.trustedBrands&populate[1]=section.card.icon&populate[2]=InfoPanel.InfoPanel.logo` +
      `&populate[3]=InfoPanel.InfoPanel.keyStats.icon&populate[4]=clientTestimonial.testimonial.image` +
      `&populate[5]=faq&populate[6]=faq.faq&populate[7]=seo&populate[8]=seo.openGraph` +
      `&populate[9]=seo.openGraph.ogImage&populate[10]=clientsSlide&populate[11]=clientsSlide.entity` +
      `&populate[12]=clientsSlide.entity.logo` +
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
      return { data: [], error: finalResponse?.error?.message || "Something went wrong", status: "error" };
    }

    if (!finalResponse?.data || finalResponse.data.length === 0) {
      return { data: [], message: "Not Found", status: "not_found" };
    }

    return { data: finalResponse?.data || null, error: null };
  } catch (error) {
    console.error("Error:", error);
    return {
      data: null,
      error: error.message || "Something went wrong",
    };
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
