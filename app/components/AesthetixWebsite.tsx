'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Header from './Header'
import FooterWithCTA from './FooterWithCTA'
import HomeView from './HomeView'
import CookieBanner from './CookieBanner'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export default function AesthetixWebsite() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
      <Header />

      <main>
        <HomeView onOpenCalendly={() => setIsCalendlyOpen(true)} />
      </main>

      <FooterWithCTA />

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCalendlyOpen(false)}
          />
          <div className="relative w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b z-10">
              <h3 className="font-medium">Schedule a Call</h3>
              <button
                onClick={() => setIsCalendlyOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <iframe
              src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=111111&primary_color=111111`}
              className="w-full h-full pt-16"
              frameBorder="0"
              title="Schedule a call with ÆSTHETIX"
            />
          </div>
        </div>
      )}

      <CookieBanner />
    </div>
  )
}
