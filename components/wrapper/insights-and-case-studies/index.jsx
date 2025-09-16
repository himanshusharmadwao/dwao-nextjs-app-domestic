import React, { Suspense } from 'react'
import { getInsightCategory } from '@/libs/apis/data/insights';
import dynamic from "next/dynamic";

const BlogPost = dynamic(() => import('@/components/blog/blogPost'), {
    loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded"></div>
});

const ReachOut = dynamic(() => import('@/components/common/reachOut'), {
    loading: () => <div className="animate-pulse h-20 bg-gray-100 rounded"></div>
});

// Loader component for suspense fallback
const LoadingPlaceholder = () => (
    <div className="w-full h-40 bg-gray-100 animate-pulse rounded"></div>
);


const InsightCaseWrapper = async ({ preview }) => {

    const insightCategoryResponse = await getInsightCategory(preview);

    return (
        <>
            {/* filter and blog listing */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <BlogPost filterItems={insightCategoryResponse?.data} variant="caseStudies" preview={preview} />
            </Suspense>

            {/* Contact */}
            <Suspense fallback={<LoadingPlaceholder />}>
                <ReachOut preview={preview}/>
            </Suspense>
        </>
    )
}

export default InsightCaseWrapper