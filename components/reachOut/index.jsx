"use client";

import SubmitButton from "@/components/ui/submitButton";
import { useState } from "react";
import InputField from "../ui/inputField";
import ToastNotification, { toastStyle } from "../toastNotification";
import { toast } from "react-toastify";

export const Reachout = () => {
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Only phone + email validation
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

    setLoading(true);

    try {
      const payload = {
        fname: "",                     // No name field
        email: formData.email,
        number: formData.phone,
        message: "",                   // No message field
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

      // Handle non-200 HTTP errors
      if (!response.ok) {
        const err = await response.json().catch(() => null);
        const msg = err?.message || err?.error || "Something went wrong.";
        toast.error(msg, toastStyle);
        return;
      }

      // Parse successful JSON
      const result = await response.json().catch(() => ({}));

      // Backend error inside JSON
      if (result.error || result.message === "error") {
        toast.error(result.error || result.message, toastStyle);
        return;
      }

      // Fire Google conversion pixel
      const img = document.createElement("img");
      img.src =
        "https://www.googleadservices.com/pagead/conversion/643192894/?value=1.0&currency_code=INR&label=B3WkCKTb0_IaEL6w2bIC&guid=ON&script=0";
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      document.body.appendChild(img);

      toast("Form submission succeeded", toastStyle);

      // reset form
      setFormData({
        phone: "",
        email: "",
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
    <>
      <form onSubmit={handleSubmit}>
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

        <SubmitButton
          linkText={loading ? "Submitting..." : "Submit"}
          linkType="submit"
          disabled={loading}
        />
      </form>

      <ToastNotification />
    </>
  );
};
