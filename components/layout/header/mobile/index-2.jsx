import React, { useState } from 'react';
import styles from '../Header.module.css'; 
import Link from 'next/link';
import { FaMinus, FaPlus } from "react-icons/fa6";

const MobileHeader = ({ MenuStructure, isMenuOpen, toggleMenu }) => {

  console.log("menu", MenuStructure);

  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (id) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div onClick={toggleMenu} className='text-white absolute right-[20px] top-[20px] bg-white rounded-full h-9 w-9 flex items-center justify-center !text-black text-[28px]'>&times;</div>
        <ul className={styles.mobileMenuList}>
          {MenuStructure.map((mainItem) => (
            <li key={mainItem.id} className={styles.mobileMenuItem}>
              <div className={styles.mobileMenuItemContent}>
                <Link prefetch={false}  href={mainItem.href} onClick={toggleMenu}>
                  {mainItem.text}
                </Link>
                {mainItem.subMenu.length > 0 && (
                  <button
                    className={styles.subMenuToggle}
                    onClick={() => toggleSubMenu(mainItem.id)}
                  >
                    {openSubMenus[mainItem.id] ? <FaMinus size={14} /> : <FaPlus size={14} />}
                  </button>
                )}
              </div>
              {mainItem.subMenu.length > 0 && (
                <ul 
                  className={`${styles.mobileSubMenu} ${
                    openSubMenus[mainItem.id] ? styles.subMenuOpen : ''
                  }`}
                >
                  {mainItem.subMenu.map((subItem) => (
                    <li key={subItem.id} className={styles.mobileSubMenuItem}>
                      <div className={styles.mobileMenuItemContent}>
                        <Link prefetch={false}  href={subItem.href} onClick={toggleMenu}>
                          {subItem.text}
                        </Link>
                        {subItem.subSubMenu.length > 0 && (
                          <button
                            className={styles.subMenuToggle}
                            onClick={() => toggleSubMenu(subItem.id)}
                          >
                            {openSubMenus[subItem.id] ? <FaMinus size={14} /> : <FaPlus size={14} />}
                          </button>
                        )}
                      </div>
                      {subItem.subSubMenu.length > 0 && (
                        <ul
                          className={`${styles.mobileSubMenu} ${
                            openSubMenus[subItem.id] ? styles.subMenuOpen : ''
                          }`}
                        >
                          {subItem.subSubMenu.map((subSubItem) => (
                            <li key={subSubItem.id} className={styles.mobileSubMenuItem}>
                              <Link prefetch={false}  href={subSubItem.href} onClick={toggleMenu}>
                                {subSubItem.text}
                              </Link>
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
      </div>
    </>
  );
};

export default MobileHeader;