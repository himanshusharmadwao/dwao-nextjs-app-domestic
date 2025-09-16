import { getCookie } from "cookies-next";
import Head from "next/head";
import Script from "next/script";

export { default as cn } from "clsx";

export const STATUS_CODE_200 = 200;

export const getModelVariant = (modelCodes, variants) => {
  if (!modelCodes || !variants) return [];

  const matchedVariants = [];

  // Create a new variable to hold the modelCodes data
  let modelCodesArray = Array.isArray(modelCodes)
    ? modelCodes
    : [{ modelCode: modelCodes }];

  for (let modelCodeObj of modelCodesArray) {
    if (variants[modelCodeObj.modelCode]) {
      matchedVariants.push(variants[modelCodeObj.modelCode]);
    }
  }

  return matchedVariants;
};

/**
 * This function gets the value of a specified key from an auth cookie.
 *
 * @param {('mobile'|'refreshToken'|'jwtAccessToken')} key - The key to get the value of.
 * @returns {string|boolean} The value of the specified key, or `false` if the key does not exist.
 */

export function getAuthCookie(key) {
  const cookie = getCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE);
  if (!cookie) return null;
  const decodedCookie = decode(cookie).split("#");
  const cookieObj = {
    mobile: decodedCookie[0],
    refreshToken: decodedCookie[1],
    jwtAccessToken: decodedCookie[2],
  };
  return cookieObj[key] !== undefined ? cookieObj[key] : false;
}

export function decode(encodedString) {
  return Buffer.from(encodedString, "base64").toString("ascii");
}

export function encode(cookie) {
  return Buffer.from(cookie).toString("base64");
}

export const downloadFile = ({ fileUrl, fileName }) => {
  const anchor = document.createElement("a");
  anchor.href = fileUrl;
  anchor.download = fileName;
  anchor.target = "_blank";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export const isLessThan10Days = (dateString) => {
  const [datePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);

  const targetDate = new Date(year, month - 1, day);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const differenceInTime = targetDate - currentDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays <= 10;
};

export const formatDateOrDaysLeft = (dateString) => {
  // Parse the date string in "DD/MM/YYYY HH:MM:SS" format
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  // Create a Date object using the parsed values
  const targetDate = new Date(year, month - 1, day, hours, minutes, seconds);
  const currentDate = new Date();

  const differenceInTime = targetDate - currentDate;
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays <= 30) {
    return `Expire in ${differenceInDays} days`;
  }

  // Otherwise, format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(targetDate);

  return `valid thru. ${formattedDate}`;
};

// to get image url
export const getImageUrl = (image) => {
  if (!image?.url) return "";

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337";

  if (image.url.startsWith("http")) {
    return image.url;
  }

  return `${baseURL}${image.url}`;
};

// helper function for breaking the title
export const breakTitle = (title, maxChars = 20) => {
  const words = title?.split(' ');
  let charCount = 0;
  let result = [];
  let line = [];
  let isFirstLine = true;

  if (words) {
    for (let word of words) {
      const wordLength = word.length + (line.length > 0 ? 1 : 0);

      if (isFirstLine && charCount + wordLength > maxChars) {
        result.push(line.join(' '));
        result.push(<br key={result.length} />);
        line = [word];
        charCount = word.length;
        isFirstLine = false;
      } else {
        line.push(word);
        charCount += wordLength;
      }
    }
  }

  if (line.length > 0) {
    result.push(line.join(' '));
  }

  return result;
};

// for smooth scroll on secondaty menu
export function linkScroll(e, sectionId, offset = 150) {
  e.preventDefault();
  const section = document.querySelector(sectionId);

  if (section) {
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}

// for implementing ISR ravildation
const REVALIDATE_TIME = 300;

export function getRevalidateTime(preview) {
  return preview ? 0 : REVALIDATE_TIME;
}

// for removing the regional path from url
export const getNormalizedPath = (pathname, regions) => {
  const parts = pathname.split('/').filter(Boolean);
  const regionSlugs = regions?.data?.map((region) => region.slug) || [];
  if (parts.length && regionSlugs.includes(parts[0])) {
    parts.shift();
  }
  return `/${parts.join('/')}`;
};