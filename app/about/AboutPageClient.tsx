'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import CalendlyButton from '@/app/components/CalendlyButton'
import CookieBanner from '@/app/components/CookieBanner'

export default function AboutPageClient() {
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
      <Header />

      <div className="pt-24 md:pt-32 pb-20 min-h-screen">
        {/* Hero Section */}
        <div className="px-6 md:px-12 lg:px-24 mb-20">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">
            ABOUT US
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8">
            We Build Visual
            <br />
            <span className="text-[#111111]/30">Legacies</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-[#111111]/70 leading-relaxed">
            ÆSTHETIX is a premium visual content agency specializing in high-end photography,
            videography, and brand identity for luxury brands, hotels, and ambitious personal brands.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-[#111111] text-white py-24 px-6 md:px-12 lg:px-24 mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4">
                OUR MISSION
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Standard is the enemy of premium.
              </h2>
            </div>
            <div className="space-y-6 text-white/70">
              <p>
                We don&apos;t just create content; we craft visual experiences that elevate brands
                above the noise. In a world saturated with mediocre imagery, we deliver work
                that commands attention and builds lasting impressions.
              </p>
              <p>
                Every frame we capture, every edit we make, is guided by one principle:
                your brand deserves to look as exceptional as it truly is.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="px-6 md:px-12 lg:px-24 mb-20">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-4 text-center">
            OUR VALUES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-16 text-center">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Excellence',
                desc: 'We never settle for good enough. Every project receives our full creative dedication and technical precision.',
              },
              {
                title: 'Authenticity',
                desc: 'We capture the true essence of your brand, creating visuals that resonate because they are real.',
              },
              {
                title: 'Partnership',
                desc: 'Your success is our success. We work alongside you as creative partners, not just service providers.',
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center p-8">
                <div className="w-12 h-12 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto mb-6 text-xl font-light">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-[#111111]/60">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 md:px-12 lg:px-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Ready to elevate your brand?
            </h2>
            <p className="text-[#111111]/60 mb-8">
              Let&apos;s create something exceptional together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-4 rounded-full hover:bg-[#333333] transition-all duration-300"
            >
              <span className="tracking-widest text-sm">START YOUR PROJECT</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <CalendlyButton />
      <CookieBanner />
    </div>
  )
}
