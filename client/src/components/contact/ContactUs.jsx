import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  fadeInUp,
  fadeInScale,
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
  defaultViewport,
} from "../../utils/motionVariants.js";
import { enquiryApi } from "../../services/enquiryApi.js";
import "./ContactUs.css";

const LOOKING_FOR_OPTIONS = [
  "Residential Property",
  "Commercial Property",
  "Industrial Property",
  "Land / Plots",
  "Hotels / Hospitality",
  "Leasing",
  "Exchange Property",
  "Sick Property",
  "Other",
];

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
    lookingFor: "",
    requirement: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState("");

  // Thank-you popup closes itself after 5 seconds (or on Esc / backdrop / ×)
  useEffect(() => {
    if (submitStatus !== "success") return;
    const timer = setTimeout(() => setSubmitStatus(null), 5000);
    const onKey = (e) => e.key === "Escape" && setSubmitStatus(null);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [submitStatus]);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Full Name is required.";
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = "Phone Number is required.";
    } else if (!/^\d{7,15}$/.test(formData.phoneNumber.trim())) {
      errs.phoneNumber = "Please enter a valid phone number (digits only).";
    }

    if (!formData.email.trim()) {
      errs.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.city.trim()) errs.city = "City or location is required.";
    if (!formData.lookingFor)
      errs.lookingFor = "Please select a property category.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name } = e.target;
    // Phone: keep digits only, whatever is typed or pasted
    const value = name === "phoneNumber" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setStatusMessage("");

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await enquiryApi.submit(formData);
      setSubmitStatus("success");
      setStatusMessage(
        response.message ||
          "Thank you for reaching out to Sushita Ventures. We've received your enquiry and our team will connect with you shortly.",
      );
      // Reset form on success
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        city: "",
        lookingFor: "",
        requirement: "",
      });
      setErrors({});
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage(
        err.message ||
          "Unable to submit your enquiry at this time. Please try again or reach out directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-main-wrapper">
      <div className="contact-container">
        {/* 1. Page Introduction Section */}
        <motion.section
          className="contact-intro-section"
          aria-label="Introduction"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
        >
          <h1 className="contact-heading">Let's Connect</h1>
          <p className="contact-description">
            Every great property decision begins with the right conversation.
            Whether you're exploring commercial spaces, industrial properties,
            land opportunities, hospitality assets, or a strategic property
            transaction, Sushita Ventures is here to understand your
            requirements and help you take the next step with clarity and
            confidence.
          </p>
        </motion.section>

        {/* 2. Main Two-Column Section: Visual Experience & Form */}
        <section
          className="contact-grid-section"
          aria-label="Contact Form and Experience"
        >
          {/* Left Column — Visual Experience */}
          <motion.div
            className="contact-visual-card"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={slideInLeft}
          >
            <img
              src="/images/services/contact-experience.jpg"
              alt="Sushita Ventures Architectural Environment"
              className="contact-visual-img"
              loading="eager"
            />
            <div className="contact-visual-scrim" />
            <div className="contact-visual-overlay-content">
              <h2 className="contact-visual-quote-title">
                A Better Perspective on Property.
              </h2>
              <p className="contact-visual-quote-sub">
                Thoughtful conversations. Meaningful opportunities.
              </p>
            </div>
          </motion.div>

          {/* Right Column — Contact Form */}
          <motion.div
            className="contact-form-card"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={slideInRight}
          >
            <h2 className="form-header-title">
              Tell Us What You're Looking For.
            </h2>

            {/* Success: popup that closes itself after 5 seconds. Portalled to <body> so the
                animated (transformed) form containers can't trap its fixed positioning. */}
            {createPortal(
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  className="thanks-popup-backdrop"
                  onClick={() => setSubmitStatus(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="thanks-popup"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="thanks-popup-title"
                    aria-describedby="thanks-popup-msg"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      type="button"
                      className="thanks-popup-close"
                      onClick={() => setSubmitStatus(null)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <div className="thanks-popup-icon" aria-hidden="true">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 id="thanks-popup-title" className="thanks-popup-title">Thank You</h3>
                    <p id="thanks-popup-msg" className="thanks-popup-msg">{statusMessage}</p>
                    <span className="thanks-popup-timer" aria-hidden="true" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
            )}

            {submitStatus === "error" && (
              <div className="form-alert-box form-alert-error" role="alert">
                {statusMessage}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="enquiry-form-grid"
            >
              {/* Full Name */}
              <div className="form-field-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Amandeep Singh"
                  className={`form-input ${errors.fullName ? "has-error" : ""}`}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <span className="field-error-msg">{errors.fullName}</span>
                )}
              </div>

              {/* Two-Column: Phone & Email */}
              <div className="form-row-two-col">
                <div className="form-field-group">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number <span className="required-star">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={15}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`form-input ${errors.phoneNumber ? "has-error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.phoneNumber && (
                    <span className="field-error-msg">
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required-star">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Amandeep@domain.com"
                    className={`form-input ${errors.email ? "has-error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="field-error-msg">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Two-Column: City & Looking For */}
              <div className="form-row-two-col">
                <div className="form-field-group">
                  <label htmlFor="city" className="form-label">
                    City / Location <span className="required-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Zirakpur / Chandigarh"
                    className={`form-input ${errors.city ? "has-error" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.city && (
                    <span className="field-error-msg">{errors.city}</span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="lookingFor" className="form-label">
                    Looking For <span className="required-star">*</span>
                  </label>
                  <select
                    id="lookingFor"
                    name="lookingFor"
                    value={formData.lookingFor}
                    onChange={handleChange}
                    className={`form-select ${errors.lookingFor ? "has-error" : ""}`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Select property interest
                    </option>
                    {LOOKING_FOR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.lookingFor && (
                    <span className="field-error-msg">{errors.lookingFor}</span>
                  )}
                </div>
              </div>

              {/* Requirement Textarea */}
              <div className="form-field-group">
                <label htmlFor="requirement" className="form-label">
                  Your Requirement (Optional)
                </label>
                <textarea
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Tell us a little about the property or opportunity you're exploring..."
                  className="form-textarea"
                  rows="3"
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Sending enquiry...</span>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* 3. Contact Information Strip */}
        <motion.section
          className="contact-info-strip"
          aria-label="Direct Contact Channels"
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.div className="info-item-card" variants={staggerItem}>
            <h3 className="info-item-title">Consultation & Strategy</h3>
            <p className="info-item-detail">
              For property enquiries, business discussions, and general
              assistance.
            </p>
          </motion.div>

          <motion.div className="info-item-card" variants={staggerItem}>
            <h3 className="info-item-title">Telephone Advisory</h3>
            <p className="info-item-detail">
              <span style={{ color: "var(--color-text-secondary)" }}>
                Contact Number:
              </span>
              <br />
              <span className="info-item-link">
                +91 [Contact Number Configured by Admin]
              </span>
            </p>
          </motion.div>

          <motion.div className="info-item-card" variants={staggerItem}>
            <h3 className="info-item-title">Official Correspondence</h3>
            <p className="info-item-detail">
              <span style={{ color: "var(--color-text-secondary)" }}>
                Corporate Desk:
              </span>
              <br />
              <span className="info-item-link">
                contact@sushitaventures.com
              </span>
            </p>
          </motion.div>
        </motion.section>

        {/* 4. Location and Map Section */}
        <section
          className="location-map-section"
          aria-label="Office Location and Directions"
        >
          <motion.header
            className="location-header"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInUp}
          >
            <h2 className="contact-heading">Find Us</h2>
            <p className="contact-subheading">
              Let's Meet and Explore Possibilities.
            </p>
          </motion.header>

          <motion.div
            className="map-frame-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={fadeInScale}
          >
            {/* Interactive Responsive Google Map (Subtle Dark Architectural Filter) */}
            <iframe
              className="map-iframe"
              title="Sushita Ventures Corporate Office Location"
              src="https://maps.google.com/maps?q=Sushma%20Infinium%2C%20Zirakpur%2C%20Punjab%20140603&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Location Marker Card */}
            <div className="map-floating-card">
              <h3 className="map-card-company">Sushita Ventures</h3>
              <p className="map-card-address">
                55, 56, 3rd Floor, Sushma Infinium, Zirakpur, SAS Nagar, Punjab
                140603
              </p>
              <a
                href="https://maps.google.com/?q=Sushma+Infinium+Zirakpur+Punjab+140603"
                target="_blank"
                rel="noopener noreferrer"
                className="map-directions-link"
              >
                <span>Get Directions</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
