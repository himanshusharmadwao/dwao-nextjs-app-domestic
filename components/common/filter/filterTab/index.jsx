"use client";

import Image from "next/image";
import { useState } from "react";

const FilterTab = ({ data, onFilterSelect }) => {
    // console.log(data)
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative inline-block z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Button */}
            <button className="outline-none border-none rounded-[30px] bg-[#e0e6f7] flex gap-2 items-center justify-center py-[7px] px-[20px] text-[18px] text-nowrap cursor-pointer">
                <span>{data.name}</span>
                <span>
                    <Image src="/icons/caret-down.svg" height={25} width={25} alt="missing image" />
                </span>
            </button>

            {/* Dropdown */}
            <div
                className={`absolute left-0 min-w-32 bg-white shadow-[0_3px_15px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden transition-all duration-300 ease-in-out ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
            >
                <ul className="min-w-[250px]">
                    {data.sub_category.map((item, index) => (
                        <li key={index} className="transition-all duration-300 hover:bg-[var(--mainColor)] hover:text-white"
                            onClick={() => {
                                // console.log("Category:", data.name);
                                // console.log("Subcategory:", item.name);
                                onFilterSelect(data.name, item.name);
                            }}
                        >
                            <p className="px-4 py-3 block whitespace-nowrap h-full w-full cursor-pointer">
                                {item.name}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterTab;
