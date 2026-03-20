'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#F5F5F7] text-[#111111] py-20 px-6 md:px-12 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <h3 className="text-xl font-bold tracking-tighter mb-4">
            info@aesthetixagency.com
          </h3>
          <p className="opacity-60 text-sm">
            Gröbenzeller Straße 41
            <br />
            82178 Puchheim, Germany
          </p>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          <a
            href="https://www.instagram.com/agencyaesthetix/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50"
          >
            INSTAGRAM
          </a>
        </div>
        <div className="md:text-right space-y-2">
          <p className="text-xs opacity-60 uppercase tracking-widest">
            © 2026 ÆSTHETIX. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs opacity-60 md:justify-end">
            <Link href="/impressum" className="hover:opacity-100">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:opacity-100">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
