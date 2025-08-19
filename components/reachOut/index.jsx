"use client"

import SubmitButton from '@/components/ui/submitButton';
import { useState } from 'react';
import InputField from '../ui/inputField';
import { reachOut } from '@/libs/apis/data/home';
import ToastNotification, { toastStyle } from '../toastNotification';
import { toast } from 'react-toastify';

export const Reachout = () => {

    const [formData, setFormData] = useState({
        phone: "",
        email: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validateForm = () => {
        const phoneRegex = /^\+?\d[\d\s]{9,19}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.phone.trim()) {
            toast.error("Phone number is required", toastStyle);
            return false;
        }

        if (!phoneRegex.test(formData.phone.trim())) {
            toast.error("Enter a valid phone number", toastStyle);
            return false;
        }

        if (!formData.email.trim()) {
            toast.error("Email is required", toastStyle);
            return false;
        }

        if (!emailRegex.test(formData.email.trim())) {
            toast.error("Please enter a valid email address", toastStyle);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const result = await reachOut(formData);
            toast("Form submission succeeded", toastStyle);
            setFormData({
                phone: "",
                email: "",
            });
        } catch (error) {
            toast.error ("Form submission failed", toastStyle);
            console.error(error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <InputField type="text" label="Phone Number" id="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <InputField type="email" label="Email" id="email" value={formData.email} onChange={handleChange} />
                </div>
                <SubmitButton linkText="Submit" linkType="submit" className="" />
            </form>
            <ToastNotification />
        </>
    )
}