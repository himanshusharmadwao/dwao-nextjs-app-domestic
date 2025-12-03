"use client"

import React, { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import 'animate.css/animate.min.css';
import { submitSubscriber } from '@/libs/apis/data/newsletter';
import { toast } from 'react-toastify';
import ToastNotification, { toastStyle } from '@/components/toastNotification';

const Newsletter = () => {

    const [subscriber, setSubscriber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!subscriber.trim()) {
            toast.error("Email is required", toastStyle);
            return;
        }
        if (!emailRegex.test(subscriber.trim())) {
            toast.error("Please enter a valid email address", toastStyle);
            return;
        }

        try {
            const result = await submitSubscriber(subscriber);
            // Backend validation
            if (result.error) {
                toast.error(result.error, toastStyle);
                return;
            }
            // console.log("Form submitted:", result);
            toast("Form submission succeeded", toastStyle);
            setSubscriber('');
        } catch (error) {
            toast.error("Form submission failed", toastStyle);
            console.error(error);
        }
    };



    return (
        <>
            <p className="text-con text-[var(--color-con-gray)] lg:mb-8 mb-4">
                Stay current with our latest insights and resources
            </p>
            <form className="flex items-center justify-between border-b-[1.5px] border-white" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email ID"
                    className="outline-none border-none text-con text-gray-100 font-thin w-[70%]"
                    value={subscriber}
                    onChange={(e) => setSubscriber(e.target.value)}
                />
                <input
                    type="submit"
                    value="Subscribe"
                    className="text-[var(--color-con-gray)] cursor-pointer w-[30%]"
                />
            </form>
            <ToastNotification />
        </>
    )
}

export default Newsletter