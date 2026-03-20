'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/app/data/categories'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b transition-all duration-300 ${isMenuOpen ? 'bg-[#111111] border-white/10' : 'bg-white/10 backdrop-blur-xl border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.08)]'}`}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col justify-center items-center w-10 h-10 gap-1.5 transition-colors ${isMenuOpen ? 'text-white' : 'text-[#111111]'}`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        <Link
          href="/"
          className={`absolute left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-70 transition-all duration-300 max-w-[140px] sm:max-w-none ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
        >
          <Image
            src="/logo.png"
            alt="ÆSTHETIX"
            width={200}
            height={50}
            className="h-8 sm:h-10 md:h-12 w-auto"
            priority
          />
        </Link>

        <Link
          href="/contact"
          className={`text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${isMenuOpen ? 'border border-white text-white hover:bg-white hover:text-[#111111]' : 'border border-[#111111] hover:bg-[#111111] hover:text-white'}`}
        >
          <span className="hidden sm:inline">START PROJECT</span>
          <span className="sm:hidden">START</span>
        </Link>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-all duration-700 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 via-transparent to-[#C9A962]/3" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        {/* Decorative line */}
        <div className={`absolute left-8 md:left-16 lg:left-24 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-1000 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} />

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
          {/* Main Navigation */}
          <div className="space-y-1 mb-16">
            <p className={`text-[#C9A962]/60 text-[10px] tracking-[0.4em] uppercase mb-8 transition-all duration-500 delay-100 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              NAVIGATION
            </p>
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`group relative flex items-center gap-6 py-2 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: isMenuOpen ? `${200 + idx * 100}ms` : '0ms' }}
              >
                {/* Number */}
                <span className="text-white/20 text-sm font-mono tracking-wider group-hover:text-[#C9A962]/50 transition-colors duration-300">
                  0{idx + 1}
                </span>
                {/* Label */}
                <span className="relative text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight group-hover:text-[#C9A962] transition-all duration-300">
                  {item.label}
                  {/* Glow effect on hover */}
                  <span className="absolute inset-0 blur-2xl bg-[#C9A962]/0 group-hover:bg-[#C9A962]/20 transition-all duration-500 -z-10" />
                </span>
                {/* Arrow */}
                <ArrowRight className="w-6 h-6 text-white/0 group-hover:text-[#C9A962] group-hover:translate-x-2 transition-all duration-300 ml-4" />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className={`w-24 h-px bg-gradient-to-r from-white/20 to-transparent mb-10 transition-all duration-700 ${isMenuOpen ? 'opacity-100 w-24' : 'opacity-0 w-0'}`} style={{ transitionDelay: isMenuOpen ? '450ms' : '0ms' }} />

          {/* Services / Categories */}
          <div>
            <p className={`text-[#C9A962]/60 text-[10px] tracking-[0.4em] uppercase mb-6 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}>
              SERVICES
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
              {categories.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/services/${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group text-left flex items-center gap-3 transition-all duration-400 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: isMenuOpen ? `${500 + idx * 60}ms` : '0ms' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#C9A962] group-hover:shadow-[0_0_10px_rgba(201,169,98,0.5)] transition-all duration-300" />
                  <span className="text-lg md:text-xl text-white/40 group-hover:text-white transition-all duration-300">
                    {cat.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className={`mt-auto pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isMenuOpen ? '650ms' : '0ms' }}>
            <div className="group">
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">EMAIL</p>
              <a href="mailto:info@aesthetixagency.com" className="text-white/70 hover:text-[#C9A962] transition-colors duration-300 text-sm md:text-base">
                info@aesthetixagency.com
              </a>
            </div>
            <div className="group">
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">SOCIAL</p>
              <a href="https://www.instagram.com/agencyaesthetix/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#C9A962] transition-colors duration-300 text-sm md:text-base flex items-center gap-2">
                <span>Instagram</span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </div>
            {/* Decorative element */}
            <div className="hidden md:block text-white/10 text-[10px] tracking-[0.5em] uppercase">
              ÆSTHETIX © 2026
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
