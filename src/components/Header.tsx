import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-8 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-md">
      <nav className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/40">
            <svg className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <span className="font-bold text-2xl text-white">FairPlay Shipping</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/send" className="text-white/90 hover:text-amber-400 font-semibold transition-colors">Ship</Link>
          <Link href="/#track" className="text-white/90 hover:text-amber-400 font-semibold transition-colors">Track</Link>
          <Link href="/services" className="text-white/90 hover:text-amber-400 font-semibold transition-colors">Services</Link>
          <Link href="/about" className="text-white/90 hover:text-amber-400 font-semibold transition-colors">About</Link>
          <Link href="/contact" className="text-white/90 hover:text-amber-400 font-semibold transition-colors">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
