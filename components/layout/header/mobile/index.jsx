"use client"

import React, { useState } from 'react';
import styles from '../Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

const MobileHeader = ({ MenuStructure, isMenuOpen, toggleMenu, regions }) => {
  const [stackedSubMenu, setStackedSubMenu] = useState([]);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);

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
  };

  const toggleSubSubMenu = (id) => {
    setOpenSubSubMenu((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div
          onClick={toggleMenu}
          className="text-white absolute right-[20px] top-[20px] bg-white rounded-full h-9 w-9 flex items-center justify-center !text-black text-[28px] z-[99999]"
        >
          ×
        </div>
        <ul className={styles.mobileMenuList}>
          {MenuStructure.map((mainItem) => (
            <li key={mainItem.id} className={styles.mobileMenuItem}>
              <div className={styles.mobileMenuItemContent}>
                <Link prefetch={false}  href={mainItem.linkHref || '#'} onClick={toggleMenu}>
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
            <div className={styles.goBack} onClick={() => setStackedSubMenu([])}>
              <Image src="/icons/left-icon.svg" height={20} width={20} alt="go back" />
            </div>
            <ul>
              {stackedSubMenu.map((item) => (
                <li key={item.id}>
                  <div className={styles.mobileMenuItemContent}>
                    <Link prefetch={false}  href={item.linkHref || '#'} onClick={toggleMenu}>
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
                  <div className="overflow-hidden" style={{ backgroundColor: '#e1e1e1' }}>
                    {item.subSubMenu?.length > 0 && (
                      <div
                        className={`${styles.subSubMenuStack} ${openSubSubMenu === item.id ? styles.open : ''}`}
                      >
                        <div className={styles.goBack} onClick={() => setOpenSubSubMenu(null)}>
                          <Image src="/icons/left-icon.svg" height={20} width={20} alt="go back" />
                        </div>
                        <ul className="flex flex-col gap-[14px]">
                          {item.subSubMenu.map((subSubItem) => (
                            <li key={subSubItem.id}>
                              <Link prefetch={false}  href={subSubItem.linkHref || '#'} onClick={toggleMenu}>
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