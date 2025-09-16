"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import MobileHeader from "./mobile";
import Image from "next/image";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { usePathname, useRouter } from "next/navigation";
import { getNormalizedPath } from "@/libs/utils";
import { GoGlobe } from "react-icons/go";
import { RxCaretDown } from "react-icons/rx";

const HeaderWrapper = ({ headerData, secMenu, regions }) => {

  // console.log("headerData: ", headerData)
  // console.log("secMenu: ", secMenu)
  // console.log("regions: ", regions)

  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const regionRef = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef(null);
  const progressRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const normalizedPath = getNormalizedPath(pathname, regions);

  const isHome = normalizedPath === "/";
  const isContactPage = normalizedPath === "/contact";
  const isAboutPage = normalizedPath === "/about";
  const isPolicyPage = normalizedPath === "/privacy-policy";
  const isCulturePage = normalizedPath === "/culture";
  const isBlogPage = normalizedPath === "/blog";
  const isInsightsCaseStudies = normalizedPath === "/insights-and-case-studies";
  const isReview = normalizedPath.includes("/reviews");
  const isPartner = normalizedPath === "/partners";

  // to get capabilities hrefs - memoized for performance
  const getCapabilitiesHrefs = useCallback((headerData) => {
    const primaryMenu = headerData.data.find((item) => item.name === "PrimaryMenu");

    if (!primaryMenu) return [];

    const capabilitiesMenu = primaryMenu.menu.find((item) => item.linkTitle === "Capabilities");

    if (!capabilitiesMenu) return [];

    const hrefs = capabilitiesMenu.subMenu.reduce((acc, subMenuItem) => {
      acc.push(subMenuItem.linkHref);

      if (subMenuItem.subSubMenu && subMenuItem.subSubMenu.length > 0) {
        const subSubMenuHrefs = subMenuItem.subSubMenu.map((subSubMenuItem) => subSubMenuItem.linkHref);
        acc.push(...subSubMenuHrefs);
      }

      return acc;
    }, []);

    return hrefs;
  }, []);

  // Memoize capability URLs to avoid recalculation on every render
  const capabilityUrl = useMemo(() => getCapabilitiesHrefs(headerData), [headerData, getCapabilitiesHrefs]);

  const isCapability = useMemo(() => capabilityUrl.some((key) => normalizedPath.includes(key)), [capabilityUrl, pathname]);

  // to toggle menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSelectRegion = (region) => {

    if (region.slug != "in-en") {
      if (isHome || isAboutPage || isContactPage || isPolicyPage || isReview) {
        router.push(`${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/${region.slug == "default" ? "" : region.slug}${pathname}`)
      } else {
        router.push(`${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}`);
      }
      // if ((isCulturePage || isBlogForRegion || isInsightsCaseStudiesForRegion || isCapability || isPartner) & !isReview) {
      //   router.push(`${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}`);
      // } else {
      //   router.push(`${process.env.NEXT_PUBLIC_DWAO_GLOBAL_URL}/${region.slug == "default" ? "" : region.slug}${pathname}`)
      // }
      return;
    }

    setSelectedRegion(region);
    setIsRegionOpen(false);

  };

  // Memoize handleScroll to prevent recreating on every render
  const handleScroll = useCallback(() => {
    const header = headerRef.current;
    const progress = progressRef.current;
    if (!header || !progress) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

    if (scrollPosition > 10) {
      header.classList.add(styles.active);
      progress.style.width = `${scrollPercentage}%`;
      progress.style.opacity = "1";
    } else {
      header.classList.remove(styles.active);
      progress.style.width = "1%";
      progress.style.opacity = "0";
    }

    progress.setAttribute("aria-valuenow", scrollPercentage.toFixed(0));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const primaryMenu = headerData.data.find((item) => item.name === "PrimaryMenu")?.menu || [];

  // map current URL to secMenu page

  const getPageFromUrl = () => {
    if (normalizedPath === '/') return 'home';
    if (normalizedPath === '/about') return 'about';
    if (normalizedPath.includes('/case-studies')) return 'insights';
    if (normalizedPath.includes('/reviews')) return '';
    if (normalizedPath === '/partners') return '';
    if (isCapability) return 'capability';

    return '';
  };

  const currentPage = getPageFromUrl();
  const currentMenu = secMenu?.data?.find((item) => item.page === currentPage)?.menu || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (regionRef.current && !regionRef.current.contains(event.target)) {
        setIsRegionOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isCulturePage || isBlogPage || isInsightsCaseStudies || isReview ? styles.secondaryPage : ""}`}
      >
        <div className={styles.topMenu}>
          <nav id="cssmenu" className={styles.cssmenu}>
            <div className={`lg:hidden flex items-center h-14 ${styles.mobileBar}`} onClick={toggleMenu}>
              <Image
                src="/icons/bar.svg"
                height={24}
                width={24}
                alt="menu icon"
                className={`${isCulturePage || isBlogPage || isInsightsCaseStudies || isReview ? "!filter-none" : ""}`}
              />
            </div>
            <div className={styles.logo}>
              <Link prefetch={false} href="/">DWAO</Link>
            </div>
            <ul>
              {primaryMenu.map((mainItem) => (
                <li key={mainItem.id}>
                  <Link prefetch={false}
                    href={mainItem.linkHref}
                    className={`text-[var(--color-con-gray)] hover:text-white transition-all duration-300`}
                  >
                    {mainItem.linkTitle}
                  </Link>
                  {mainItem.subMenu.length > 0 && (
                    <ul>
                      {mainItem.subMenu.map((subItem) => (
                        <li key={subItem.id} className={subItem.subSubMenu.length > 0 ? "" : ""}>
                          <Link prefetch={false}
                            href={subItem.linkHref}
                            className={subItem.subSubMenu.length > 0 ? styles.submenu : ""}
                          >
                            {subItem.linkTitle}
                          </Link>
                          {subItem.subSubMenu.length > 0 && (
                            <ul>
                              {subItem.subSubMenu.map((subSubItem) => (
                                <li key={subSubItem.id}>
                                  <Link prefetch={false} href={subSubItem.linkHref}>{subSubItem.linkTitle}</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div ref={regionRef} className={`region relative inline-block text-left text-[15px] z-[99999] ${isRegionOpen ? styles.dropdownOpen : ''}`}
              onMouseEnter={() => setIsRegionOpen(true)}
              onMouseLeave={() => setIsRegionOpen(false)}
            >
              {/* Trigger */}
              <div
                className={`flex gap-2 items-center justify-center text-white cursor-pointer ${styles.regionTrigger}`}
                onClick={() => setIsRegionOpen((prev) => !prev)}
              >
                <GoGlobe />
                <span className="lg:inline-block hidden">India</span>
                <span className="inline-block lg:hidden">in-en</span>
                <RxCaretDown size={22} />
              </div>
              {/* Dropdown */}
              <div className={`absolute right-[0px] z-50 bg-white w-60 overflow-y-auto border border-gray-200 space-y-4 p-6 ${styles.regionList}`}>
                {[...regions.data]
                  .sort((a, b) => (a.slug === "default" ? -1 : b.slug === "default" ? 1 : 0))
                  .map((region) => (
                    <span
                      key={region.id}
                      className="block w-fit text-gray-700 hover:text-[var(--mainColor)] cursor-pointer"
                      onClick={() => handleSelectRegion(region)}
                    >
                      {region.name}
                    </span>
                  ))}
              </div>
            </div>

          </nav>
        </div>

        {secMenu ? (
          currentMenu.length > 0 ? (
            <div className={`hidden lg:block ${styles.homeNavParent}`}>
              <div className={`container ${styles.homeNav}`}>
                <ul>
                  {currentMenu.map((item) => (
                    <li key={item.id}>
                      <AnchorLink href={item.linkHref} offset={145}>
                        {item.linkTitle}
                      </AnchorLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null
        ) : (
          <div>Loading menu...</div>
        )}

        <div
          ref={progressRef}
          className={styles.progress}
          role="progressbar"
          aria-label="Page Scroll Progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow="0"
        ></div>
      </header>
      <MobileHeader MenuStructure={primaryMenu} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} regions={regions} />
    </>
  );
};

export default HeaderWrapper;