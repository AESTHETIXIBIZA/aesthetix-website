'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import CalendlyButton from '@/app/components/CalendlyButton'
import CookieBanner from '@/app/components/CookieBanner'

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || ''

export default function ContactPageClient() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setSent(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
        <Header />
        <div className="pt-40 min-h-screen px-6 md:px-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-8">
            <Check size={32} />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter mb-4">
            Application Received.
          </h2>
          <p className="max-w-md text-gray-600 mb-8">
            Thank you. We will review your vision and get back to you within 48
            hours if it&apos;s a match.
          </p>
          <Link
            href="/"
            className="text-sm border-b border-black pb-1"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
        <CalendlyButton />
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
      <Header />

      <div className="pt-32 min-h-screen px-6 md:px-12 max-w-3xl mx-auto pb-32 animate-in slide-in-from-bottom-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Let&apos;s build your visual legacy.
          </h1>
          <p className="text-gray-500">
            Please take a moment to tell us about your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Identity */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              01 Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="block">
                <span className="sr-only">Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  aria-label="Full Name"
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </label>
              <label className="block">
                <span className="sr-only">Company / Brand</span>
                <input
                  type="text"
                  name="company"
                  placeholder="Company / Brand"
                  aria-label="Company or Brand"
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </label>
              <label className="block">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  aria-label="Email"
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </label>
              <label className="block">
                <span className="sr-only">Website or IG Handle</span>
                <input
                  type="text"
                  name="website"
                  placeholder="Website or IG Handle"
                  aria-label="Website or Instagram Handle"
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
                />
              </label>
            </div>
          </div>

          {/* Segment */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              02 Which area should we elevate?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Brand Identity & Campaign',
                'Hotel & Hospitality',
                'Culinary & Fine Dining',
                'Luxury Villa & Real Estate',
                'Personal Branding',
                'Ibiza Event / Venue Slot',
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="segment"
                    value={opt}
                    className="accent-black"
                  />
                  <span className="text-sm group-hover:text-gray-500 transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              03 Primary Goal
            </h3>
            <div className="space-y-3">
              {[
                'Launching a new brand/product',
                'Rebranding & High-End Positioning',
                'Content for Ads & Conversion',
                'Capturing a specific Event',
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="goal"
                    value={opt}
                    className="accent-black"
                  />
                  <span className="text-sm group-hover:text-gray-500 transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              04 Where will assets live?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Premium Website',
                'Social Media (Organic & Paid)',
                'Print & Billboards',
                'Investor / Sales Decks',
              ].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    name="channels"
                    value={opt}
                    className="accent-black w-4 h-4 rounded-none"
                  />
                  <span className="text-sm group-hover:text-gray-500 transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              05 Strategic Investment
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                '2.500 € – 5.000 €',
                '5.000 € – 10.000 €',
                '10.000 € +',
                'To be discussed',
              ].map((opt) => (
                <label key={opt} className="cursor-pointer">
                  <input
                    type="radio"
                    name="budget"
                    value={opt}
                    className="peer sr-only"
                  />
                  <div className="px-6 py-3 border border-gray-200 rounded-full text-sm peer-checked:bg-black peer-checked:text-white peer-checked:border-black hover:border-gray-400 transition-all">
                    {opt}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
              06 Final Note
            </h3>
            <label className="block">
              <span className="sr-only">Additional notes</span>
              <textarea
                name="message"
                placeholder="Anything else we should know? Briefly describe your vision."
                rows={4}
                aria-label="Additional notes about your vision"
                className="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors resize-none"
              ></textarea>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-center text-sm">{error}</div>
          )}

          {/* Submit */}
          <div className="pt-8 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#111111] text-white px-12 py-4 rounded-full font-bold tracking-wider hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'SENDING...' : 'SEND APPLICATION'}
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <CalendlyButton />
      <CookieBanner />
    </div>
  )
}
