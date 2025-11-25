"use client"

import FilterTab from '@/components/common/filter/filterTab';
import Image from 'next/image';
import React, { useState } from 'react'

const FilterContent = ({ data, onFilterSelect }) => {
    // console.log(data)
    const [mobileFilter, setMobileFilter] = useState(false);
    const [openCategories, setOpenCategories] = useState({});

    const toggleCategory = (category) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <>
            <div className='flex lg:block justify-between items-center lg:pt-36 pt-28'>
                <div className="flex gap-2 mb-8">
                    <Image src="/icons/filter.svg" height={20} width={20} alt="missing image" />
                    <h1 className='text-black font-bold text-[22px]'>Filter By:</h1>
                </div>
                <div className='flex flex-wrap gap-4 mb-8'>
                    <div className="lg:flex hidden gap-4">
                        {data.map((filter, index) => (
                            <FilterTab
                                key={index}
                                data={filter}
                                onFilterSelect={onFilterSelect}
                            />
                        ))}
                    </div>
                    <div className='flex gap-2'>
                        <button className="outline-none border-none rounded-[30px] bg-[#ddd] flex gap-2 items-center justify-center lg:py-[7px] lg:px-[20px] py-[5px] px-[15px] lg:text-[18px] text-[15px] cursor-pointer transition-all duration-300 hover:bg-[#f3c0c0]"
                            onClick={() => onFilterSelect(null, null)}
                        >
                            <span>
                                <Image src="/icons/recycle.svg" height={15} width={15} alt="missing image" />
                            </span>
                            <span>Reset</span>
                        </button>
                        <Image src={mobileFilter ? "/icons/times.svg" : "/icons/bar.svg"} height={32} width={32} alt="missing image" className="filter-none lg:hidden" onClick={() => setMobileFilter(!mobileFilter)} />
                    </div>
                </div>
            </div>

            {/* mobile filter */}
            <div>
                <ul
                    className={`flex flex-col gap-5 absolute top-[170px] left-1/2 transform -translate-x-1/2 bg-white w-[95%] border border-[#ddd] p-4 rounded-[15px] z-10 transition-all duration-300 ${mobileFilter ? "opacity-100 visible translate-y-[-20px]" : "opacity-0 invisible translate-y-[20px]"
                        }`}
                >
                    {data.map((filter, index) => (
                        <li
                            key={index}
                            className="flex flex-col cursor-pointer"
                            onClick={() => toggleCategory(filter.name)}
                        >
                            <div className="flex justify-between items-center bg-[#e0e6f7] rounded-[10px] py-[6px] px-[15px]">
                                <span>{filter.name}</span>
                                {filter.sub_category.length > 0 && (
                                    <Image
                                        src="/icons/caret-down.svg"
                                        height={25}
                                        width={25}
                                        alt="Expand"
                                        className={`transition-transform duration-300 ${openCategories[filter.name] ? "rotate-180" : "rotate-0"
                                            }`}
                                    />
                                )}
                            </div>

                            {filter.sub_category.length > 0 && (
                                <ul
                                    className={`bg-[#eee] rounded-[10px] transition-all duration-300 overflow-hidden ${openCategories[filter.name] ? "py-[10px] px-[20px] mt-2 space-y-2 max-h-40 opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    {filter.sub_category.map((item, subIndex) => (
                                        <li key={subIndex} className="text-sm py-2"
                                            onClick={() => {
                                                onFilterSelect(filter.name, item.name);
                                                setMobileFilter(!mobileFilter);
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default FilterContent