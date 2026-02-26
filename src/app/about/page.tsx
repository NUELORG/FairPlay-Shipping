import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50">
      {/* Hero */}
      <section className="relative h-80 mb-24">
        <Image
          src="/transport-logistics-concept.jpg"
          alt="FairPlay Shipping logistics"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About FairPlay Shipping</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your trusted partner in global logistics since 2010
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Mission */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg mb-4">
                FairPlay Shipping exists to simplify global commerce. We believe that moving goods across borders should be transparent, reliable, and accessible to businesses of every size.
              </p>
              <p className="text-slate-600 text-lg">
                From small businesses shipping their first international order to enterprises managing complex supply chains, we provide the technology, infrastructure, and expertise to deliver with confidence.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/global-shipping-logistics-concept.jpg" alt="Global logistics" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        </section>

        {/* History */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-slate-600 text-lg">
            <p>
              Founded in 2010, FairPlay Shipping started as a regional courier service with a simple promise: fair pricing and reliable delivery. What began with a handful of trucks and a single warehouse has grown into a global logistics network serving 220+ countries.
            </p>
            <p>
              Our expansion was driven by customer demand. Businesses needed a single partner who could handle everything from express parcels to full container loads. We invested in technology, built strategic partnerships, and developed expertise in customs, compliance, and last-mile delivery.
            </p>
            <p>
              Today, we operate 50+ distribution centers worldwide, employ over 15,000 logistics professionals, and move millions of packages every year. Our commitment remains unchanged: fair play, transparent pricing, and delivery you can count on.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-slate-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-amber-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Integrity</h3>
              <p className="text-slate-600">We do what we say. Transparent pricing, honest communication, and ethical practices in every transaction.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Reliability</h3>
              <p className="text-slate-600">Your cargo is our responsibility. We invest in infrastructure and processes to deliver on time, every time.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Innovation</h3>
              <p className="text-slate-600">We continuously improve our technology and processes to make shipping simpler and more efficient for our customers.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors">
            Get in Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}
