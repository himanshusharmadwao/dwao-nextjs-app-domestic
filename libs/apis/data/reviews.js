import { getRevalidateTime } from "@/libs/utils";

export const getReviews = async (preview = false) => {

  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews-mats?` +
      `populate[0]=seo&populate[1]=seo.openGraph` +
      `&populate[2]=event&populate[3]=event.event&populate[4]=event.event.image&populate[5]=event.event.thumbnail&populate[6]=event.regions` +
      `&populate[7]=social_responsibility&populate[8]=social_responsibility.entity.image&populate[9]=social_responsibility.regions` +
      `&populate[10]=teams_and_collaboration&populate[11]=teams_and_collaboration.entity.image&populate[12]=teams_and_collaboration.entity.thumbnail&populate[13]=teams_and_collaboration.regions` +
      `&populate[14]=employee_testimonial&populate[15]=employee_testimonial.entity.image&populate[16]=employee_testimonial.regions` +
      `&populate[17]=regions` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) },
    });

    let finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return {
        data: null,
        error: finalResponse?.error?.message || "Unknown error",
      };
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
