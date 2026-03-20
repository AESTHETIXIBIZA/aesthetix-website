'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie-consent')
      if (!consent) {
        setTimeout(() => setIsVisible(true), 1000)
      }
    } catch {
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    try { localStorage.setItem('cookie-consent', 'all') } catch { /* noop */ }
    setIsVisible(false)
  }

  const acceptEssential = () => {
    try { localStorage.setItem('cookie-consent', 'essential') } catch { /* noop */ }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="max-w-4xl mx-auto bg-[#111111] text-white rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Cookie Settings</h3>
            <p className="text-sm text-white/60">
              We use cookies to improve your experience and analyze our website.{' '}
              <Link href="/datenschutz" className="underline hover:text-white">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={acceptEssential}
              className="flex-1 md:flex-none px-6 py-3 text-sm border border-white/30 rounded-full hover:bg-white/10 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 md:flex-none px-6 py-3 text-sm bg-white text-[#111111] rounded-full hover:bg-white/90 transition-colors font-medium"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
