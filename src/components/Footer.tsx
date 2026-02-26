import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 bg-slate-950 text-slate-400">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="font-bold text-white mb-4">Ship</h4>
            <Link href="/send" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Create Shipment</Link>
            <Link href="/send" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Get a Quote</Link>
            <Link href="/send" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Schedule Pickup</Link>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Track</h4>
            <Link href="/#track" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Track Package</Link>
            <Link href="/#track" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Track by Reference</Link>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <Link href="/about" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">About Us</Link>
            <Link href="/contact" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Contact</Link>
            <Link href="/services" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Services</Link>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <Link href="/contact" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Contact Us</Link>
            <Link href="/contact" className="block text-slate-400 hover:text-amber-400 mb-2 transition-colors">Help Center</Link>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} FairPlay Shipping. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-amber-400 transition-colors">Terms</Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-400 text-xs">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
