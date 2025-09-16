import CustomLink from '@/components/culture/customLink'
import ImgCarousel from '@/components/culture/ImgCarousel'
import TestimonialCard from '@/components/home/testimonialCard'
import TestimonialCarousel from '@/components/home/testimonialCarousel'
import React from 'react'
import CompanyEvents from '@/components/culture/companyEvents'
import { getImageUrl } from '@/libs/utils'

const ReviewWrapper = async ({ reviewResponse }) => {

    const half = Math.ceil(reviewResponse?.employee_testimonial?.entity?.length / 2);

    const firstHalfSlides = reviewResponse?.employee_testimonial?.entity?.slice(7, half).map((testimonial, index) => (
        <TestimonialCard
            key={`first-${index}`}
            rating={testimonial?.rating}
            quote={testimonial?.content}
            name={testimonial?.name}
            title={testimonial?.title}
            imageSrc={getImageUrl(testimonial?.image)}
        />
    ));

    const secondHalfSlides = reviewResponse?.employee_testimonial?.entity?.slice(half).map((testimonial, index) => (
        <TestimonialCard
            key={`second-${index}`}
            rating={testimonial?.rating}
            quote={testimonial?.content}
            name={testimonial?.name}
            title={testimonial?.title}
            imageSrc={getImageUrl(testimonial?.image)}
        />
    ));

    return (
        <>
            {/* about culture */}
            <div className="mb-14 pt-36">
                <div className="container">
                    <div className="text-center mb-10">
                        <h1 className='font-[500] text-head mb-4'>{reviewResponse?.introHeading}</h1>
                        <p className='text-small-con text-con-light md:w-[75%] inline-block'>{reviewResponse?.introDescription}</p>
                    </div>
                </div>
            </div>

            {/* employee testimonials */}
            <div className="relative bg-[#f9faff] mb-14">
                <div className="absolute h-full w-full bg-[url(/culture/testimonials_bg.webp)] bg-cover bg-left-top bg-no-repeat opacity-20"></div>
                <div className="py-14">
                    <div className="relative container">
                        <h2 className="text-center text-head text-con-dark mb-12">{reviewResponse?.empReviewHeading}</h2>
                        <div className="mb-14">
                            <TestimonialCarousel slides={firstHalfSlides} slider="review" />
                        </div>
                        <TestimonialCarousel slides={secondHalfSlides} slider="review" />
                    </div>
                </div>
            </div>

            {/* teams and collaboration */}
            <div className="mb-14">
                <div className="container">
                    <h2 className="text-head text-con-dark mb-12">{reviewResponse?.teamCollabHeading}</h2>
                </div>
                <div className='container'>
                    <ImgCarousel slides={reviewResponse?.teams_and_collaboration?.entity} resConf={{ mobile: "1", tab: "2", desktop: "3.1" }} slider={"team_collaboration"} />
                </div>
            </div>

            {/* work/life balance */}
            <div className="light-bg py-12 mb-14">
                <div className="container">
                    <p className='text-small-con text-con-light mb-0'>{reviewResponse?.appreciationNote}</p>
                </div>
            </div>

            {/* company events and celebrations */}
            <div className="container">
                <div className="mb-14">
                    <CompanyEvents data={reviewResponse} />
                </div>
            </div>

            {/* social responsibility/impact */}
            <div className="mb-14">
                <div className="container">
                    <div className="mb-12 text-center w-full">
                        <h2 className='mb-4 text-head font-[500]'>{reviewResponse?.socialResponsibilityHeading}</h2>
                    </div>
                </div>
                <div className='container'>
                    <ImgCarousel slides={reviewResponse?.social_responsibility?.entity} resConf={{ mobile: "1", tab: "2", desktop: "4.1" }} slider={"social_impact"} />
                </div>
            </div>

            {/* contact us */}
            <div className='bg-[var(--mainColor)] md:py-14 py-12'>
                <div className="container">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center">
                        <h2 className='text-white leading-[1.4] text-[21px] md:w-[60%] md:text-start text-center md:mb-0 mb-5'>{reviewResponse?.ctaDescription}</h2>
                        <CustomLink linkTitle={reviewResponse?.ctaLinkTitle} linkHref={reviewResponse?.ctaLinkHref} linkClass="text-small-con bg-white hover:bg-transparent text-[var(--mainColor)] hover:text-white border border-white" />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ReviewWrapper