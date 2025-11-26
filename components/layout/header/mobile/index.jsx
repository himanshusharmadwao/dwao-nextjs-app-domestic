"use client"

import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
import styles from '../Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { RxCaretDown } from "react-icons/rx";
import { GoGlobe } from "react-icons/go";
import { getNormalizedPath } from "@/libs/utils";

const MobileHeader = ({ MenuStructure, isMenuOpen, toggleMenu, regions }) => {
  const [stackedSubMenu, setStackedSubMenu] = useState([]);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);
  const [activeMainItem, setActiveMainItem] = useState(null);

  const toggleSubMenu = (id) => {
    let clickedItem = null;
    for (const mainItem of MenuStructure) {
      if (mainItem.id === id) {
        clickedItem = mainItem;
        break;
      }
      for (const subItem of mainItem.subMenu) {
        if (subItem.id === id) {
          clickedItem = subItem;
          break;
        }
      }
    }

    const subMenu = clickedItem?.subMenu || [];
    setStackedSubMenu(subMenu);

     setActiveMainItem(clickedItem?.linkTitle || null);
  };

  const toggleSubSubMenu = (id) => {
    setOpenSubSubMenu((prev) => (prev === id ? null : id));
  };

  // =================================

  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const regionRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const normalizedPath = getNormalizedPath(pathname, regions);

  const isHome = normalizedPath === "/";
  const isAboutPage = normalizedPath === "/about";
  const isPolicyPage = normalizedPath === "/privacy-policy";
  const isCulturePage = normalizedPath === "/culture";
  const isBlogPage = normalizedPath === "/blog";
  const isInsightsCaseStudies = normalizedPath === "/insights-and-case-studies";
  const isReview = normalizedPath.includes("/reviews");
  const isPartner = normalizedPath === "/partners";

  const handleSelectRegion = (region) => {

    if (region.slug != "in-en") {
      if (isHome || isAboutPage || isPolicyPage || isReview) {
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

  return (
    <>
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className='mt-[20px]'>
          <div
            onClick={toggleMenu}
            className="text-white absolute left-[30px] top-[20px] bg-white rounded-full flex items-center justify-center !text-black text-[24px]"
          >
            ×
          </div>
          <div ref={regionRef} className={`region absolute right-[20px] top-[30px] inline-block text-left ${isRegionOpen ? styles.dropdownOpen : ''}`}
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            {/* Trigger */}
            <div
              className={`flex gap-2 items-center justify-center cursor-pointer ${styles.regionTrigger}`}
              onClick={() => setIsRegionOpen((prev) => !prev)}
            >
              <GoGlobe />
              <span className="">India</span>
              {/* <span className="inline-block lg:hidden">in-en</span> */}
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
        </div>
        <ul className={styles.mobileMenuList}>
          {MenuStructure.map((mainItem) => (
            <li key={mainItem.id} className={styles.mobileMenuItem}>
              <div className={styles.mobileMenuItemContent}>
                <Link prefetch={false} href={mainItem.linkHref || '#'} onClick={toggleMenu}>
                  {mainItem.linkTitle}
                </Link>
                {mainItem.subMenu.length > 0 && (
                  <button
                    className={styles.subMenuToggle}
                    onClick={() => toggleSubMenu(mainItem.id)}
                    aria-label="Expand submenu"
                  >
                    <Image
                      src="/icons/left-icon.svg"
                      height={20}
                      width={20}
                      alt="expand submenu"
                      className="rotate-180"
                    />
                  </button>
                )}
              </div>
            </li>
          ))}
          <li className={`${styles.subMenuStack} ${stackedSubMenu.length > 0 ? styles.open : ''}`}>
            <div className={`${styles.goBack} mt-[20px]`} onClick={() => setStackedSubMenu([])}>
              <Image src="/icons/left-icon.svg" height={8} width={8} alt="go back" /><span className='ms-1'>Back</span>
            </div>
            <div className={`${styles.activeItem} mt-[16px]`}>
              {activeMainItem}
            </div>
            <ul>
              {stackedSubMenu.map((item) => (
                <li key={item.id}>
                  <div className={`${styles.mobileMenuItemContent} !mx-[40px]`}>
                    <Link prefetch={false} href={item.linkHref || '#'} onClick={toggleMenu} className='!px-[20px]'>
                      {item.linkTitle}
                    </Link>
                    {item.subSubMenu?.length > 0 && openSubSubMenu !== item.id && (
                      <button
                        className={styles.subMenuToggle}
                        onClick={() => toggleSubSubMenu(item.id)}
                        aria-label="Expand subsubmenu"
                      >
                        <Image
                          src="/icons/left-icon.svg"
                          height={20}
                          width={20}
                          alt="expand subsubmenu"
                          className="rotate-180"
                        />
                      </button>
                    )}
                  </div>
                  <div className="overflow-hidden" style={{ backgroundColor: '#fff' }}>
                    {item.subSubMenu?.length > 0 && (
                      <div
                        className={`${styles.subSubMenuStack} ${openSubSubMenu === item.id ? styles.open : ''}`}
                      >
                        <div className={styles.goBack} onClick={() => setOpenSubSubMenu(null)}>
                          <Image src="/icons/left-icon.svg" height={8} width={8} alt="go back" /><span className='ms-4'>Back</span>
                        </div>
                        <ul className="flex flex-col gap-[14px] ms-6">
                          {item.subSubMenu.map((subSubItem) => (
                            <li key={subSubItem.id}>
                              <Link prefetch={false} href={subSubItem.linkHref || '#'} onClick={toggleMenu}>
                                {subSubItem.linkTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileHeader;