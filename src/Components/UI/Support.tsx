import React, { useState } from "react";
import { FeedbackService } from "../Feedback/FeedbackService";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order from your Profile > Orders section. We’ll also send you updates via email.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit/debit cards, UPI, and net banking.",
  },
  {
    question: "How do I contact support?",
    answer: "Use the contact form on this page or email us at support@niyasolar.com.",
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes, please see our Returns & Exchanges policy or contact support for help.",
  },
  {
    question: "Where can I find installation guides?",
    answer: "Check the product details page or the Support section for downloadable guides.",
  },
];

const Support: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email format.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleAccordion = (idx: number) => {
    setOpenIndex(idx === openIndex ? null : idx);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    FeedbackService.add(form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-white py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-8 text-white text-center rounded-t-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 font-['Roboto_Condensed'] tracking-wider">We’re Here to Help</h1>
          <p className="text-lg md:text-xl font-['Poppins']">Find answers or contact our support team below.</p>
        </div>
        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* FAQ Accordion */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-6 font-['Roboto_Condensed'] text-yellow-700">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-yellow-200 rounded-lg bg-yellow-50 overflow-hidden">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-yellow-800 hover:bg-yellow-100 focus:outline-none transition"
                    onClick={() => handleAccordion(idx)}
                  >
                    {faq.question}
                    <span className="ml-2 text-yellow-500">{openIndex === idx ? '-' : '+'}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="p-4 pt-0 text-yellow-900 border-t border-yellow-100 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Contact Support Form */}
          <div className="md:w-1/2 w-full">
            <h2 className="text-2xl font-bold mb-6 font-['Roboto_Condensed'] text-yellow-700">Contact Support</h2>
            <form
              className="bg-yellow-50 rounded-lg p-6 shadow-md space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.name ? 'border-red-400' : 'border-yellow-200'} focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/60 text-gray-700`}
              />
              {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-400' : 'border-yellow-200'} focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/60 text-gray-700`}
              />
              {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded border ${errors.subject ? 'border-red-400' : 'border-yellow-200'} focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/60 text-gray-700`}
              />
              {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded border ${errors.message ? 'border-red-400' : 'border-yellow-200'} focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white/60 text-gray-700`}
              />
              {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                Submit
              </button>
              {submitted && (
                <div className="text-green-600 font-semibold text-center mt-2">Thank you! Your message has been sent.</div>
              )}
            </form>
          </div>
        </div>
        {/* Contact Email/Phone */}
        <div className="border-t border-yellow-100 bg-yellow-50 p-6 text-center">
          <p className="text-yellow-800 font-semibold">Or email us at <a href="mailto:support@niyasolar.com" className="underline hover:text-yellow-600">support@niyasolar.com</a> or call <a href="tel:+18001234567" className="underline hover:text-yellow-600">1-800-123-4567</a></p>
        </div>
      </div>
    </div>
  );
};

export default Support;
