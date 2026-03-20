'use client'

import { useState, useEffect } from 'react'
import { Calendar, X } from 'lucide-react'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || ''

export default function CalendlyButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasAttention, setHasAttention] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHasAttention(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Floating Button - Centered */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        {/* Pulsing Layers - Premium Gold/Champagne */}
        <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-br from-amber-200/30 via-yellow-100/20 to-amber-300/30 blur-xl animate-pulse-slow" />
        <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-br from-amber-100/40 to-yellow-50/30 blur-md animate-pulse-slower" />

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`relative flex items-center gap-3 bg-[#111111] text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] ${hasAttention ? 'animate-bounce-gentle' : ''}`}
          aria-label="Schedule a call"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-medium whitespace-nowrap tracking-wide">Book a Call</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-3xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b z-10">
              <h3 className="font-medium">Schedule a Call</h3>
              <button
                onClick={() => setIsOpen(false)}
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
    </>
  )
}
