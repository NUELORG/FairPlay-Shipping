"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const IMAGES = {
  hero: "/logistics-transportation-container-cargo-ship-cargo-plane-with-working-crane-bridge-shipyard-sunrise-logistic-import-export-transport-industry-background-ai-generative.jpg",
  cargoPlane: "/cargo-plane-sunset.jpg",
  globalShipping: "/global-shipping-logistics-concept.jpg",
  transport: "/transport-logistics-concept.jpg",
  aerialHarbor: "/aerial-view-cargo-ship-cargo-container-harbor.jpg",
};

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const [liveCount, setLiveCount] = useState(1247);
  const router = useRouter();

  useEffect(() => {
    const t = setInterval(() => setLiveCount((c) => c + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(t);
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Live ticker */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-900 text-amber-400 py-1.5 px-3 sm:px-4 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 animate-pulse-soft">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
        <span className="truncate">Live: {liveCount.toLocaleString()} packages in transit</span>
      </div>

      {/* Hero - Your logistics image */}
      <section className="relative pt-24 sm:pt-28 min-h-[85vh] sm:min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="Logistics - cargo ship, plane, shipyard"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/90 to-transparent" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up">
              Ship with confidence.
              <br />
              <span className="text-amber-400">Track every step.</span>
            </h1>
            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-slate-300 max-w-xl animate-fade-in-up animate-delay-1 opacity-0 [animation-fill-mode:forwards]">
              Full-service logistics and supply chain solutions. Air freight, ocean freight, and express delivery to 220+ countries.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up animate-delay-2 opacity-0 [animation-fill-mode:forwards]">
              <Link href="/send" className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-base sm:text-lg rounded-lg transition-all shadow-xl shadow-amber-500/30 active:scale-95 sm:hover:scale-105">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Package
              </Link>
              <a href="#track" className="inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-white/10 hover:bg-white/20 text-white font-semibold text-base sm:text-lg rounded-lg border-2 border-white/40 transition-all backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Track Package
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Promo banners */}
      <section className="bg-amber-500 py-3 sm:py-4 border-y-2 border-amber-600">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-center text-slate-900 font-bold text-sm sm:text-lg">
            🚚 Save 15% on Express Shipping — Use code <span className="bg-slate-900 text-amber-400 px-3 py-1 rounded font-mono font-bold">EXPRESS15</span> at checkout
          </p>
        </div>
      </section>

      <section className="bg-slate-800 py-2 sm:py-3">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap justify-center gap-3 sm:gap-6 text-amber-400/90 text-xs sm:text-sm font-medium">
          <span>✓ 2-Day Express Available</span>
          <span>✓ Free Packaging</span>
          <span>✓ $100 Insurance Included</span>
          <span>✓ 24/7 Customer Support</span>
        </div>
      </section>

      {/* Track Section */}
      <section id="track" className="py-16 sm:py-24 bg-white border-b-4 border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 text-center mb-3">Track Your Shipment</h2>
            <p className="text-slate-600 text-center mb-8 sm:mb-10 text-base sm:text-lg">Enter your tracking number for real-time status updates</p>
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking ID (e.g. FP123456789012)"
                className="flex-1 px-5 py-4 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-slate-800 placeholder-slate-400 text-lg"
              />
              <button type="submit" className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors text-lg">
                Track
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Worldwide Delivery - Your images */}
      <section id="global" className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-4">Worldwide Delivery</h2>
          <p className="text-slate-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            From air freight to ocean freight — we connect you to 220+ countries and territories with integrated logistics solutions
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <Image src={IMAGES.cargoPlane} alt="Cargo aircraft" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="font-bold text-2xl">Air Freight & Express</p>
                <p className="text-slate-200 mt-2">Overnight and 2-day delivery to major destinations worldwide. Our cargo fleet ensures your packages reach any corner of the globe.</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <Image src={IMAGES.globalShipping} alt="Global shipping network" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="font-bold text-2xl">Global Network</p>
                <p className="text-slate-200 mt-2">50+ distribution centers. 220+ countries. Customs clearance support. Your international shipments handled with expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transport & Ocean Freight - Your images */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-4">Multi-Modal Logistics</h2>
          <p className="text-slate-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            Road, rail, air, and sea — we choose the optimal route for your cargo
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96">
              <Image src={IMAGES.transport} alt="Transport logistics" fill className="object-cover" sizes="50vw" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-lg">Ground Transportation</p>
                <p className="text-sm text-slate-200">Fleet of trucks and rail connections for domestic and cross-border delivery</p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96">
              <Image src={IMAGES.aerialHarbor} alt="Ocean freight cargo" fill className="object-cover" sizes="50vw" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-bold text-lg">Ocean Freight</p>
                <p className="text-sm text-slate-200">FCL and LCL services. Port-to-port and door-to-door. Major trade lanes worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-slate-800 text-center mb-4">Our Services</h2>
          <p className="text-slate-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            End-to-end logistics solutions for businesses of all sizes
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-10 border-2 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Express Shipping</h3>
              <p className="text-slate-600 text-lg">Same-day pickup, overnight, and 2-day delivery. Get your tracking ID instantly.</p>
            </div>
            <div className="bg-white rounded-2xl p-10 border-2 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Real-Time Tracking</h3>
              <p className="text-slate-600 text-lg">Live updates from pickup to delivery. Proactive notifications and exception management.</p>
            </div>
            <div className="bg-white rounded-2xl p-10 border-2 border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">Supply Chain Solutions</h3>
              <p className="text-slate-600 text-lg">Warehousing, fulfillment, customs brokerage, and last-mile delivery.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors">
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* International Shipping - Aerial harbor image */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
            <Image src={IMAGES.aerialHarbor} alt="International shipping" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-12">
                <h2 className="text-4xl font-bold text-white mb-4">International Shipping Made Simple</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Customs documentation, duty calculators, and dedicated international support. We handle the complexity so you can focus on your business.
                </p>
                <Link href="/send" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-bold text-amber-400">220+</p>
              <p className="text-slate-400 mt-2">Countries Served</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400">50+</p>
              <p className="text-slate-400 mt-2">Distribution Centers</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400">99.2%</p>
              <p className="text-slate-400 mt-2">On-Time Delivery</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400">24/7</p>
              <p className="text-slate-400 mt-2">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rates */}
      <section id="rates" className="py-24 bg-slate-800 text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-center mb-4">Shipping Rates</h2>
          <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">Competitive pricing for domestic and international shipments</p>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 rounded-xl bg-white/5 border border-amber-500/20 hover:border-amber-500/50 transition-colors">
              <p className="text-4xl font-bold text-amber-400">$8.99</p>
              <p className="font-semibold mt-2">Ground Shipping</p>
              <p className="text-slate-400 text-sm mt-1">5-7 business days</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-white/5 border border-amber-500/20 hover:border-amber-500/50 transition-colors">
              <p className="text-4xl font-bold text-amber-400">$12.99</p>
              <p className="font-semibold mt-2">2-Day Express</p>
              <p className="text-slate-400 text-sm mt-1">Guaranteed delivery</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-white/5 border border-amber-500/20 hover:border-amber-500/50 transition-colors">
              <p className="text-4xl font-bold text-amber-400">$24.99</p>
              <p className="font-semibold mt-2">Overnight</p>
              <p className="text-slate-400 text-sm mt-1">Next business day</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-white/5 border border-amber-500/20 hover:border-amber-500/50 transition-colors">
              <p className="text-4xl font-bold text-amber-400">Free</p>
              <p className="font-semibold mt-2">Over $75</p>
              <p className="text-slate-400 text-sm mt-1">Ground shipping</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business promo */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-slate-900 text-3xl font-bold">Business accounts get 20% off all shipments</p>
          <p className="text-slate-800 mt-2 text-lg">Volume discounts • Dedicated support • API access</p>
          <Link href="/contact" className="inline-block mt-8 px-10 py-4 bg-slate-900 text-amber-400 font-bold rounded-lg hover:bg-slate-800 transition-colors">
            Contact Sales
          </Link>
        </div>
      </section>
    </div>
  );
}
