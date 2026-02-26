import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Express Shipping",
      description: "Same-day pickup, overnight, and 2-day delivery for time-sensitive shipments. Ideal for documents, samples, and urgent parcels.",
      features: ["Same-day pickup available", "Overnight & 2-day options", "Real-time tracking", "Signature on delivery"],
      image: "/cargo-plane-sunset.jpg",
    },
    {
      title: "Ground Shipping",
      description: "Cost-effective domestic and cross-border delivery. Our ground network covers North America with reliable 5-7 business day service.",
      features: ["5-7 business days", "Free over $75", "Full tracking", "No hidden fees"],
      image: "/transport-logistics-concept.jpg",
    },
    {
      title: "Ocean Freight",
      description: "FCL and LCL services for international cargo. Port-to-port and door-to-door options. Major trade lanes to Asia, Europe, and the Americas.",
      features: ["FCL & LCL options", "Customs clearance", "Cargo insurance", "Port-to-door"],
      image: "/aerial-view-cargo-ship-cargo-container-harbor.jpg",
    },
    {
      title: "Air Freight",
      description: "International air cargo for larger shipments. Fast transit times and dedicated handling for high-value or time-critical goods.",
      features: ["Global coverage", "Priority handling", "Temperature control", "Dangerous goods"],
      image: "/cargo-plane-sunset.jpg",
    },
    {
      title: "Warehousing & Fulfillment",
      description: "Full-service warehousing with pick, pack, and ship. Inventory management, kitting, and returns processing.",
      features: ["Same-day fulfillment", "Inventory management", "Returns processing", "Multi-zone storage"],
      image: "/global-shipping-logistics-concept.jpg",
    },
    {
      title: "Customs & Compliance",
      description: "Expert customs brokerage and trade compliance. Documentation, duty optimization, and regulatory guidance.",
      features: ["Customs clearance", "Documentation", "Duty optimization", "Compliance consulting"],
      image: "/transport-logistics-concept.jpg",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-slate-50">
      {/* Hero */}
      <section className="relative h-80 mb-24">
        <Image
          src="/logistics-transportation-container-cargo-ship-cargo-plane-with-working-crane-bridge-shipyard-sunrise-logistic-import-export-transport-industry-background-ai-generative.jpg"
          alt="Logistics services"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              End-to-end logistics solutions for every stage of your supply chain
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Intro */}
        <section className="mb-24 text-center">
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Whether you need to ship a single package or manage a complex international supply chain, FairPlay Shipping has the services, technology, and expertise to deliver. Explore our offerings below.
          </p>
        </section>

        {/* Services grid */}
        <section className="space-y-24">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="50vw" />
                </div>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{service.title}</h2>
                <p className="text-slate-600 text-lg mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-24 text-center">
          <p className="text-slate-600 text-lg mb-6">Ready to get started? Create a shipment or contact our team for a custom quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/send" className="px-10 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors">
              Create Shipment
            </Link>
            <Link href="/contact" className="px-10 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:border-amber-500 hover:text-amber-600 transition-colors">
              Contact Sales
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
