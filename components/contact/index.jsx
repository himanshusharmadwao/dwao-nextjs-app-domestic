"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { submitContactForm } from "@/libs/apis/data/contact";
import { toastStyle } from "@/components/toastNotification";
import InputField from "@/components/ui/inputField";
import SubmitButton from "@/components/ui/submitButton";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required", toastStyle);
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone is required", toastStyle);
      return false;
    } else if (!/^\+?\d[\d\s]{9,19}$/.test(formData.phone.trim())) {
      toast.error("Enter a valid phone number", toastStyle);
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required", toastStyle);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address", toastStyle);
      return false;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required", toastStyle);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { data, error } = await submitContactForm(formData);

      // Backend validation
      if (error) {
        toast.error(error, toastStyle);
        return;
      }
      toast("Form submission succeeded", toastStyle);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message || "Form submission failed. Please try again.";
      toast.error(errorMessage, toastStyle);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <InputField
          type="text"
          label="Name"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          type="text"
          label="Phone Number"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          type="email"
          label="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <InputField
          type="text"
          label="Message"
          id="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <SubmitButton linkText="Submit" linkType="submit" />
      </div>
    </form>
  );
};

export default ContactForm;
