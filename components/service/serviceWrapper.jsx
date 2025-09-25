"use client"

import React, { useRef, useState } from 'react';
import Image from 'next/image';

// import data from './data/dv360Data.json'
import IntroCard from './components/introCard';
import ServiceCard from './components/serviceCard';
import ValueCard from './components/valueCard';
import StoryCard from './components/storyCard';
import TestimonialCard from './components/testimonialCard';
import TestimonialCarousel from '@/components/home/testimonialCarousel';
import LeadForm from './components/leadForm';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getImageUrl } from '@/libs/utils';

const ServiceWrapper = ({ serviceData }) => {

    // console.log(serviceData)

    const heroFormRef = useRef(null);

    const handleRequestQuoteClick = () => {
        if (heroFormRef.current) {
            heroFormRef.current.focus();
        }
    };

    // for faq
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    // function to fetch the testimonial slide
    const testimonialSlides = serviceData?.clientTestimonial?.testimonial?.map((testimonial, index) => (
        <TestimonialCard
            key={index}
            rating={testimonial.rating}
            quote={testimonial.content}
            name={testimonial.name}
            title={testimonial.designition}
            imageSrc={getImageUrl(testimonial.image)}
        />
    ));

    return (
        <div>
            {/* Hero Section */}
            {serviceData?.banner && (
                <section
                    id="hero"
                    className="pt-32 pb-20 bg-gradient-to-r from-[#4A69BB] to-[#6283E5] text-white"
                >
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col-reverse lg:flex-row items-center">
                            <div className="lg:w-1/2 lg:pr-12">
                                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                    {serviceData?.banner?.title}
                                </h1>
                                <p className="text-xl mb-8 text-blue-100">
                                    {serviceData?.banner?.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link prefetch={false} href={serviceData?.banner?.primaryBtnHref || '/'}
                                        className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition text-center font-medium cursor-pointer getStarted"
                                        onClick={handleRequestQuoteClick}
                                    >
                                        {serviceData?.banner?.primaryBtnTitle}
                                    </Link>
                                    <Link prefetch={false} href={serviceData?.banner?.secondaryBtnHref || '/'} className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition text-center font-medium cursor-pointer">
                                        {serviceData?.banner?.secondaryBtnTitle}
                                    </Link>
                                </div>
                                <div className="mt-12">
                                    <p className="text-sm text-blue-200 mb-4">{serviceData?.banner?.trustedBrandsText}</p>
                                    <div className="flex flex-wrap items-center gap-8">
                                        {serviceData?.banner?.trustedBrands.map((item, index) => (
                                            <div key={index} className="bg-white/10 p-3 rounded-lg">
                                                <Image src={getImageUrl(item)} alt="Brand Image" height={30} width={30} loading="lazy" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2 mb-12 lg:mb-0">
                                <LeadForm />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* What is DV360 Section */}
            {serviceData?.section?.[0]?.card?.length > 0 && (
                <section id="what-is-dv360" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.section?.[0]?.title}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.section?.[0]?.description}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceData?.section?.[0]?.card.map((item, index) => (
                                <IntroCard
                                    key={index}
                                    icon={getImageUrl(item.icon)}
                                    title={item.title}
                                    description={item.content}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Our Services Section */}
            {serviceData?.section?.[1]?.card?.length > 0 && (
                <section id="services" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.section?.[1]?.title}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.section?.[1]?.description}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {serviceData?.section?.[1]?.card.map((item, index) => (
                                <ServiceCard
                                    key={index}
                                    icon={getImageUrl(item.icon)}
                                    title={item.title}
                                    description={item.content}
                                />
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Link prefetch={false} href={serviceData?.section[1]?.ctaHref || '/'}
                                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer getStarted"
                            // onClick={pageMove}
                            >
                                {serviceData?.section?.[1]?.ctaTitle}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Our Value Section */}
            {serviceData?.section?.[2]?.card?.length > 0 && (
                <section id="our-value" className="py-20 bg-[#4A69BB] text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">{serviceData?.section?.[2]?.title}</h2>
                            <p className="text-xl text-white/80 max-w-3xl mx-auto">
                                {serviceData?.section?.[2]?.description}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {serviceData?.section?.[2]?.card.map((item, index) => (
                                <ValueCard
                                    key={index}
                                    icon={getImageUrl(item.icon)}
                                    title={item.title}
                                    description={item.content}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Us Section */}
            {serviceData?.InfoPanel?.InfoPanel?.length > 0 && (
                <section id="why-us" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.InfoPanel?.title}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.InfoPanel?.description}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {serviceData?.InfoPanel?.InfoPanel?.map((story, index) => (
                                <StoryCard
                                    key={index}
                                    logo={getImageUrl(story.logo)}
                                    metric={story.statFigure}
                                    metricLabel={story.statStatus}
                                    title={story.statTitle}
                                    description={story.statDescription}
                                    stats={story.keyStats}
                                    caseStudyHref={story.ctaHref}
                                    caseStudyLink={story.ctaTitle}
                                />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link prefetch={false} href={serviceData?.InfoPanel?.ctaHref || '/'} className="inline-block bg-[#4A69BB] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer">
                                {serviceData?.InfoPanel?.ctaTitle}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            {serviceData?.clientTestimonial && testimonialSlides?.length > 0 && (
                <section id="testimonials" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.clientTestimonial?.title}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.clientTestimonial?.description}
                            </p>
                        </div>
                        <div className="">
                            <TestimonialCarousel slides={testimonialSlides} />
                        </div>
                        <div className="mt-12 text-center">
                            <Link prefetch={false} href={serviceData?.clientTestimonial?.ctaHref || '/'} className="inline-block bg-[#4A69BB] text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium cursor-pointer">
                                {serviceData?.clientTestimonial?.ctaTitle}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Our Clients Section */}
            {serviceData?.clientsSlide?.entity?.length > 0 && (
                <section id="clients" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.trustedClientsTitle}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.trustedClientsDescription}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                            {serviceData?.clientsSlide?.entity?.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-center h-32">
                                    <Image src={getImageUrl(item.logo)} alt="Icon Image" height={50} width={50} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            {serviceData?.faq?.faq?.length > 0 && (
                <section id="faq" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{serviceData?.faq?.title}</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                {serviceData?.faq?.description}
                            </p>
                        </div>
                        <div className="max-w-4xl mx-auto space-y-6">
                            {serviceData?.faq?.faq?.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        className="w-full bg-gray-50 p-6 flex justify-between items-center"
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <h3 className="text-xl font-bold text-gray-900">{item.heading}</h3>
                                        <Image src="/icons/caret-down.svg" alt="Icon image" height={30} width={30} className="text-gray-600 transition-transform"
                                            style={{ transform: openFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                                    </button>
                                    <div className={`p-6 bg-white ${openFAQ === index ? '' : 'hidden'}`}>
                                        <div className="text-gray-700">
                                            <ReactMarkdown>{item.markdownContent}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section id="cta" className="py-20 bg-gradient-to-r from-[#4A69BB] to-[#6283E5] text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Advertising?</h2>
                        <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                            Get started with our premium DV360 account services today and take your programmatic advertising to the next level.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <div className="mb-8">
                                <div className="flex items-center justify-center md:justify-start gap-8 mb-8">
                                    <div className="flex items-center">
                                        <Image src="/dv360/icons/circularTickMark.svg" alt="Icon" height={30} width={30} className='mr-3' />
                                        <span className="text-lg">Certified Experts</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Image src="/dv360/icons/clock.svg" alt="Icon" height={25} width={25} className='mr-3' />
                                        <span className="text-lg">24/7 Support</span>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                    <span className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-medium cursor-pointer">
                                        Request a Quote
                                    </span>
                                    <span className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-900 transition font-medium cursor-pointer">
                                        Schedule a Consultation
                                    </span>
                                </div>
                            </div>
                        </div>
                        <LeadForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceWrapper;