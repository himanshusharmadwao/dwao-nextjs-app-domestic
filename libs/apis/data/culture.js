import { getRevalidateTime } from "@/libs/utils";

export const getCulture = async (preview = false) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cultures?` +
      `populate[0]=introVisuals&populate[1]=missionImage&populate[2]=growthImage` +
      `&populate[3]=seo&populate[4]=seo.openGraph` +
      `&populate[5]=event&populate[6]=event.event.image&populate[7]=event.event.thumbnail&populate[8]=event.regions` +
      `&populate[9]=social_responsibility&populate[10]=social_responsibility.entity.image&populate[11]=social_responsibility.regions` +
      `&populate[12]=teams_and_collaboration&populate[13]=teams_and_collaboration.entity.image&populate[14]=teams_and_collaboration.entity.thumbnail&populate[15]=teams_and_collaboration.regions` +
      `&populate[16]=benefits_and_perk&populate[17]=benefits_and_perk.entity.icon&populate[18]=benefits_and_perk.regions` +
      `&populate[19]=employee_testimonial&populate[20]=employee_testimonial.entity.image&populate[21]=employee_testimonial.regions` +
      `&populate[22]=regions` +
      `&filters[regions][slug][$eq]=in-en`;

    if (preview) {
      url += `&status=draft`;
    }

    let response = await fetch(url, {
      next: { revalidate: getRevalidateTime(preview) }
    });

    let finalResponse = await response.json();

    if (finalResponse?.error && Object.keys(finalResponse?.error).length > 0) {
      return { data: null, error: finalResponse?.error?.message || "Unknown error" };
    }

    return { data: finalResponse.data || null, error: null };
  } catch (error) {
    console.error("Error:", error);
    return { data: null, error: error.message || "Something went wrong" };
  }
};
