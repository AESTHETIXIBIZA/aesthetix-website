'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FooterWithCTA() {
  return (
    <footer className="bg-[#111111] text-white mt-20 relative overflow-hidden">
      {/* Large Editorial Year */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[25vw] md:text-[20vw] font-bold tracking-tighter text-white/[0.03]">
          2026
        </span>
      </div>

      {/* CTA Banner */}
      <div className="relative z-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
              Ready to elevate your brand?
            </h3>
            <p className="text-white/60 text-lg">Let&apos;s create something extraordinary together.</p>
          </div>
          <Link
            href="/contact"
            className="magnetic-btn group flex items-center gap-3 bg-white text-[#111111] px-8 py-4 rounded-full hover:bg-[#C9A962] hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            <span className="font-medium">START PROJECT</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <h4 className="text-lg font-bold tracking-tighter mb-3">
              info@aesthetixagency.com
            </h4>
            <p className="text-white/40 text-sm">
              Gröbenzeller Straße 41
              <br />
              82178 Puchheim, Germany
            </p>
          </div>
          <div className="flex gap-8">
            <a
              href="https://www.instagram.com/agencyaesthetix/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#C9A962] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
          <div className="md:text-right space-y-2">
            <p className="text-xs text-white/40 uppercase tracking-widest">
              © 2026 ÆSTHETIX. All Rights Reserved.
            </p>
            <div className="flex gap-4 text-xs text-white/40 md:justify-end">
              <Link href="/impressum" className="hover:text-[#C9A962] transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-[#C9A962] transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
