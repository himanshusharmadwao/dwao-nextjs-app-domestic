"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
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

  const [loading, setLoading] = useState(false);

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

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        fname: formData.name,
        email: formData.email,
        number: formData.phone,
        message: formData.message,
        page_url: window.location.href,
      };

      const response = await fetch(
        "https://8kb7ux2337.execute-api.ap-south-1.amazonaws.com/createlead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // handle http error
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        const msg = err?.message || err?.error || "Something went wrong.";
        toast.error(msg, toastStyle);
        return;
      }

      // parse json
      const result = await response.json().catch(() => ({}));

      // backend error in json
      if (result.error || result.message === "error") {
        toast.error(result.error || result.message, toastStyle);
        return;
      }

      // Fire Google conversion pixel
      var img = document.createElement("img");
      img.src =
        "https://www.googleadservices.com/pagead/conversion/643192894/?value=1.0&currency_code=INR&label=B3WkCKTb0_IaEL6w2bIC&guid=ON&script=0";
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      document.body.appendChild(img);

      toast("Form submission succeeded", toastStyle);

      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error.message || "Form submission failed. Please try again.",
        toastStyle
      );
    } finally {
      setLoading(false);
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
        <SubmitButton
          linkText={loading ? "Submitting..." : "Submit"}
          linkType="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default ContactForm;
