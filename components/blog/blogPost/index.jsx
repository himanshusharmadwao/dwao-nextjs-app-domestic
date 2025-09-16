"use client";

import React, { useEffect, useState } from 'react';
import FilterContent from '@/components/common/filter/filterContent';
import Card from '@/components/ui/card';
import Pagination from '@/components/ui/pagination';
import OverlayCard from '@/components/common/overlayCard';
import { getAllBlogs } from '@/libs/apis/data/blog';
import { getAllInsightBlogs } from '@/libs/apis/data/insights';

const BlogPost = ({ filterItems, variant, preview }) => {
    // console.log(filterItems)
    const [selectedFilter, setSelectedFilter] = useState({ category: null, sub_category: null });
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 6;

    const handleFilterSelect = (category, sub_category) => {
        // console.log(category, sub_category)
        if (sub_category === "reset") {
            setSelectedFilter({ category: null, sub_category: null });
            setCurrentPage(1);
        } else {
            setSelectedFilter({ category, sub_category });
            setCurrentPage(1);
        }
    };

    // Fetch posts based on page and filters
    const fetchPosts = async (page) => {
        setLoading(true);
        try {
            // console.log('Fetching posts with filters:', {
            //     page,
            //     itemsPerPage,
            //     category: selectedFilter.category,
            //     sub_category: selectedFilter.sub_category,
            //     variant
            // });

            let response;

            if (variant === 'blogPosts') {
                response = await getAllBlogs(
                    page,
                    itemsPerPage,
                    selectedFilter.category,
                    selectedFilter.sub_category,
                    preview,
                );
            } else if (variant === 'caseStudies') {
                response = await getAllInsightBlogs(
                    page,
                    itemsPerPage,
                    selectedFilter.category,
                    selectedFilter.sub_category,
                    preview,
                );
            } else {
                throw new Error(`Unknown variant: ${variant}`);
            }

            setPosts(response.data);
            setTotalItems(response.meta.pagination.total);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            setPosts([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage, selectedFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // console.log("posts: ", posts)

    return (
        <div className="container">
            {/* Filter blog */}
            <FilterContent data={filterItems} onFilterSelect={handleFilterSelect} />

            {loading ? (
                <div className="flex gap-[30px] flex-wrap mb-14 border-b border-gray-300 pb-8">
                    {[...Array(itemsPerPage)].map((_, index) => (
                        <div
                            key={index}
                            className="basis-full md:basis-[calc((100%-60px)/3)] animate-pulse h-40 bg-gray-100 rounded"
                        ></div>
                    ))}
                </div>
            ) : (
                <div className="flex gap-[30px] flex-wrap mb-14 border-b border-gray-300 pb-8">
                    {variant === "blogPosts" && posts?.map((item, index) => (
                        <Card key={index} data={item} className="basis-full md:basis-[calc((100%-60px)/3)]" />
                    ))}
                    {variant === "caseStudies" && posts?.map((item, index) => (
                        <OverlayCard key={index} data={item} className="basis-full md:basis-[calc((100%-60px)/3)]" />
                    ))}
                </div>
            )}

            <div className="mb-14">
                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default BlogPost;