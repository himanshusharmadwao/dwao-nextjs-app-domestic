"use client"

import React, { useState } from 'react'
import ImgCarousel from '../ImgCarousel';

const CompanyEvents = ({data}) => {

    const events = data?.event?.event

    const [activeTab, setActiveTab] = useState("all");

    // Group the flat data array by category
    const groupedData = events?.reduce((acc, item) => {
        const cat = item.category || "uncategorized";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {});

    // Slides to show
    const eventSlide = activeTab === "all"
        ? events
        : groupedData[activeTab] || [];

    return (
        <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center mb-12">
                <h2 className='text-head font-[500] text-center mb-4 lg:mb-0'>{data?.eventsHeading}</h2>
                <ul className='text-con-light text-small-con space-x-4 space-y-4 md:space-y-0 md:text-start text-center'>
                    {["all", "annual_meet", "awards", "sports_day"].map((tab) => (
                        <li
                            key={tab}
                            className={`inline-flex rounded-[30px] py-[6px] px-[15px] transition-all duration-300 cursor-pointer 
                                            ${activeTab === tab ? "bg-[var(--mainColor)] text-white" : "bg-[#F0F0F0] hover:bg-[var(--mainColor)] hover:text-white"}
                                        `}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "all" ? "All" : tab.replace("_", " ")}
                        </li>
                    ))}
                </ul>
            </div>
            <ImgCarousel slides={eventSlide} resConf={{ mobile: "1", tab: "2", desktop: "4" }} slider={"company_events"} />
        </>
    )
}

export default CompanyEvents