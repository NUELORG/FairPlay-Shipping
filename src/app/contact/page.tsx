"use client";

import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50">
      {/* Hero */}
      <section className="relative h-64 mb-24">
        <Image
          src="/global-shipping-logistics-concept.jpg"
          alt="Contact FairPlay Shipping"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-slate-300">
              We&apos;re here to help with your shipping needs
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us a message</h2>
            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800 font-medium">Thank you for your message!</p>
                <p className="text-emerald-700 mt-2">Our team will respond within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input type="tel" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <option>General Inquiry</option>
                    <option>Business Account</option>
                    <option>Shipment Support</option>
                    <option>Quote Request</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea rows={5} required className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </div>
                <button type="submit" className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Get in touch</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Customer Support</h3>
                <p className="text-slate-600">1-800-FAIRPLAY (1-800-324-7752)</p>
                <p className="text-slate-500 text-sm mt-1">24/7 for tracking and shipment support</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Business Sales</h3>
                <p className="text-slate-600">sales@fairplayshipping.com</p>
                <p className="text-slate-500 text-sm mt-1">Volume discounts and enterprise solutions</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Headquarters</h3>
                <p className="text-slate-600">123 Logistics Way</p>
                <p className="text-slate-600">Suite 500</p>
                <p className="text-slate-600">New York, NY 10001</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Office Hours</h3>
                <p className="text-slate-600">Monday – Friday: 8:00 AM – 8:00 PM EST</p>
                <p className="text-slate-600">Saturday: 9:00 AM – 5:00 PM EST</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200">
              <p className="font-semibold text-slate-800">Need immediate help?</p>
              <p className="text-slate-600 mt-1">Track your package or create a new shipment anytime at fairplayshipping.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
