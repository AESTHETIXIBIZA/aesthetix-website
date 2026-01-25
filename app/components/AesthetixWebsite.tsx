'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Check } from 'lucide-react'

// --- DATA: CATEGORIES (English) ---
const categories = [
  {
    id: 'brand',
    title: 'BRAND',
    subtitle: 'THE IDENTITY ARCHITECT',
    body: "Most brands look like everyone else. We make sure you don't. We translate your DNA into a visual language that feels expensive, intentional, and irreplaceable.",
    hook: 'Stop competing on price. Start competing on prestige.',
    cta: 'Secure your visual edge',
  },
  {
    id: 'culinary',
    title: 'CULINARY',
    subtitle: 'THE ART OF TASTE',
    body: "If they can't smell it through the screen, the content failed. We capture the texture, the steam, and the soul of your kitchen. We make your audience hungry before they even see the menu.",
    hook: 'Visuals so immersive, they can almost taste the craft.',
    cta: 'Make them crave your brand',
  },
  {
    id: 'hotel',
    title: 'HOTEL',
    subtitle: 'THE VIRTUAL CHECK-IN',
    body: "A booking isn't made in the lobby; it's made in the imagination. We sell the feeling of the sheets, the glow of the sunset on the balcony, and the silence of luxury. We don't photograph rooms; we sell escapes.",
    hook: "Turn 'browsing' into 'fully booked'.",
    cta: 'Elevate your guest experience',
  },
  {
    id: 'personal',
    title: 'PERSONAL BRAND',
    subtitle: 'THE AUTHORITY LENS',
    body: "In a world of filters, authenticity is the highest currency. We frame your expertise in a way that commands respect. Whether you're a founder, artist, or visionary – we provide the high-end look that matches your inner ambition.",
    hook: 'Your reputation is visual. Make it undeniable.',
    cta: 'Own your narrative',
  },
  {
    id: 'villa',
    title: 'VILLA & RETREATS',
    subtitle: 'THE SANCTUARY',
    body: "High-end properties require a high-end perspective. We showcase the architectural rhythm and the exclusive lifestyle of your estate. Perfect for luxury rentals and off-market sales where 'good' isn't good enough.",
    hook: 'Selling a lifestyle, not just square footage.',
    cta: 'Capture the exclusivity',
  },
  {
    id: 'event',
    title: 'EVENT',
    subtitle: 'THE ENERGY CAPSULE',
    body: "Ibiza doesn't sleep, and neither does the demand for top-tier coverage. From the roar of the booth to the intimacy of a sunset dinner – we capture the lightning in a bottle. Limited monthly slots for Ibiza-based venues.",
    hook: 'You create the moment. We make it immortal.',
    cta: 'Check availability for our next island circuit',
  },
]

// --- DATA: FAQ (German) ---
const faqs = [
  {
    q: 'Was unterscheidet ÆSTHETIX von einer klassischen Content-Agentur?',
    a: 'Die meisten Agenturen liefern Bilder; wir erschaffen visuelle Identitäten. Bei ÆSTHETIX verbinden wir minimalistische Ästhetik mit verkaufspsychologischer Präzision. Unser Content ist darauf optimiert, die Markenwahrnehmung (Brand Equity) zu steigern und die Verweildauer auf digitalen Plattformen messbar zu erhöhen. Wir produzieren keine Füllmaterialien, sondern strategische Assets.',
  },
  {
    q: 'Warum ist professionelles Visual Storytelling für Hotels und Luxusvillen entscheidend?',
    a: 'Im Premium-Sektor wird die Entscheidung für eine Buchung oder Anfrage innerhalb von Millisekunden getroffen – rein visuell. Hochwertige Fotografie und Kinematografie für Hotels und Immobilien vermitteln Exklusivität und Vertrauen. Wir nutzen Lichtsetzung und Komposition, um nicht nur Räume zu zeigen, sondern das Gefühl des Aufenthalts erlebbar zu machen. Das steigert direkt die Conversion-Rate Ihrer Buchungsanfragen.',
  },
  {
    q: 'Bietet ÆSTHETIX Full-Service Produktionen auf Ibiza an?',
    a: 'Ja, ÆSTHETIX ist auf Ibiza spezialisiert. Wir bieten exklusive Shooting-Slots für Beachclubs, Fine-Dining-Restaurants und Event-Veranstalter. Durch unsere lokale Expertise vor Ort entfallen komplexe Reiseplanungen für unsere Kunden, während wir Content auf internationalem High-End-Niveau garantieren.',
  },
  {
    q: 'Wie transformiert ÆSTHETIX eine Personal Brand?',
    a: 'Eine Personal Brand ist das visuelle Versprechen einer Expertise. Wir rahmen Ihre Persönlichkeit in einem Kontext von Autorität und Stil. Von der ersten Keynote bis zum High-End-Reel: Wir sorgen dafür, dass Ihr digitaler Auftritt Ihrem realen Marktwert entspricht. Wir machen aus Experten Marken.',
  },
  {
    q: 'Sind die erstellten Inhalte für Paid Ads (Google & Meta) optimiert?',
    a: 'Definitiv. Jedes Piece of Content wird unter Berücksichtigung moderner Marketing-Metriken erstellt. Wir achten auf visuelle Hooks und Formate, die in SEA-Kampagnen und Social Ads eine höhere Performance erzielen. So minimieren wir den Streuverlust und maximieren die visuelle Wirkung Ihrer Werbebudgets.',
  },
  {
    q: 'Wie läuft die Zusammenarbeit bei einer Brand-Kampagne ab?',
    a: 'Wir starten mit einer tiefgreifenden Analyse Ihrer Markenidentität. Darauf aufbauend entwickeln wir ein visuelles Konzept, das Ihre Zielgruppe emotional bindet. Von der ersten Skizze bis zum finalen High-End-Export begleiten wir den Prozess mit einem kompromisslosen Auge für Perfektion und Minimalismus.',
  },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqeaqaj'

interface Category {
  id: string
  title: string
  subtitle: string
  body: string
  hook: string
  cta: string
}

export default function AesthetixWebsite() {
  const [currentView, setCurrentView] = useState<
    'home' | 'contact' | 'category'
  >('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const navigateTo = (
    view: 'home' | 'contact' | 'category',
    category: Category | null = null
  ) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (category) {
      setSelectedCategory(category)
      setCurrentView('category')
    } else {
      setCurrentView(view)
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // --- COMPONENT: HEADER ---
  const Header = () => (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F7]/90 backdrop-blur-sm py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-200/50">
      <div className="flex items-center gap-8">
        <button
          onClick={() => navigateTo('home')}
          className="text-sm font-medium tracking-widest hover:opacity-50 transition-opacity"
        >
          MENU
        </button>
      </div>

      <button
        onClick={() => navigateTo('home')}
        className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-70 transition-opacity"
      >
        <Image
          src="/logo.png"
          alt="ÆSTHETIX"
          width={200}
          height={50}
          className="h-10 md:h-12 w-auto"
          priority
        />
      </button>

      <button
        onClick={() => navigateTo('contact')}
        className="text-sm border border-[#111111] px-6 py-2 rounded-full hover:bg-[#111111] hover:text-white transition-all duration-300"
      >
        START PROJECT
      </button>
    </nav>
  )

  // --- COMPONENT: FOOTER ---
  const Footer = () => (
    <footer className="bg-[#F5F5F7] text-[#111111] py-20 px-6 md:px-12 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <h3 className="text-xl font-bold tracking-tighter mb-4">
            info@aesthetixagency.com
          </h3>
          <p className="opacity-60 text-sm">
            Zaragoza, Spain
            <br />
            Ibiza, Spain
          </p>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          <a
            href="https://instagram.com/aesthetixagency"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50"
          >
            INSTAGRAM
          </a>
          <a
            href="https://linkedin.com/company/aesthetixagency"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50"
          >
            LINKEDIN
          </a>
        </div>
        <div className="md:text-right space-y-2">
          <p className="text-xs opacity-40 uppercase tracking-widest">
            © 2026 ÆSTHETIX. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-xs opacity-40 md:justify-end">
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

  // --- VIEW: HOME ---
  const HomeView = () => {
    const [heroIndex, setHeroIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [fanProgress, setFanProgress] = useState(0)
    const fanSectionRef = useRef<HTMLDivElement>(null)

    // Auto-advance hero slideshow
    useEffect(() => {
      if (!isAutoPlaying) return
      const timer = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % categories.length)
      }, 4000)
      return () => clearInterval(timer)
    }, [isAutoPlaying])

    // Scroll-based fan animation
    useEffect(() => {
      const handleScroll = () => {
        if (!fanSectionRef.current) return
        const rect = fanSectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calculate progress: 0 when section enters, 1 when fully scrolled through
        const sectionTop = rect.top
        const sectionHeight = rect.height

        // Start animation when section is 80% visible from bottom
        const startPoint = windowHeight * 0.8
        const endPoint = -sectionHeight * 0.3

        if (sectionTop <= startPoint && sectionTop >= endPoint) {
          const progress = (startPoint - sectionTop) / (startPoint - endPoint)
          setFanProgress(Math.min(Math.max(progress, 0), 1))
        } else if (sectionTop > startPoint) {
          setFanProgress(0)
        } else {
          setFanProgress(1)
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <div className="min-h-screen">
        {/* Fullscreen Hero Slideshow */}
        <section
          className="relative h-screen w-full overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === heroIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={`/images/${cat.id}/hero.jpg`}
                alt={cat.title}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>
          ))}

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-6 md:px-12">
            <div className="max-w-4xl">
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">
                {categories[heroIndex].subtitle}
              </p>
              <h1 className="text-white text-5xl md:text-8xl font-bold tracking-tighter mb-6">
                {categories[heroIndex].title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8">
                {categories[heroIndex].hook}
              </p>
              <button
                onClick={() => navigateTo('category', categories[heroIndex])}
                className="group inline-flex items-center gap-3 text-white border border-white/50 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="tracking-widest text-sm">EXPLORE</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-2">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`w-12 h-1 transition-all duration-300 ${
                  idx === heroIndex
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <ChevronDown className="text-white/60" size={24} />
          </div>
        </section>

        {/* Scroll-Triggered Horizontal Card Fan */}
        <section
          ref={fanSectionRef}
          className="min-h-[200vh] relative bg-[#F5F5F7]"
        >
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
            {/* Section Header */}
            <div className="pt-24 md:pt-32 px-6 md:px-12 text-center z-30">
              <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-3">
                OUR EXPERTISE
              </p>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
                Explore Our Work
              </h2>
            </div>

            {/* Card Fan Container */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
                {categories.map((cat, idx) => {
                  const totalCards = categories.length
                  const centerIdx = (totalCards - 1) / 2
                  const offsetFromCenter = idx - centerIdx

                  // Fan spread: starts stacked, fans out horizontally
                  const maxRotation = 12 // degrees
                  const maxTranslateX = 220 // pixels

                  // Calculate transforms based on scroll progress
                  const rotation = offsetFromCenter * maxRotation * fanProgress
                  const translateX =
                    offsetFromCenter * maxTranslateX * fanProgress

                  // Slight vertical offset for depth
                  const translateY =
                    Math.abs(offsetFromCenter) * 15 * fanProgress

                  // Z-index: center cards on top
                  const zIndex =
                    totalCards - Math.abs(Math.round(offsetFromCenter))

                  // Scale: slightly smaller as they fan out
                  const scale =
                    1 - Math.abs(offsetFromCenter) * 0.03 * fanProgress

                  return (
                    <div
                      key={cat.id}
                      onClick={() => navigateTo('category', cat)}
                      className="absolute cursor-pointer will-change-transform"
                      style={{
                        width: 'clamp(280px, 45vw, 400px)',
                        height: 'clamp(380px, 55vh, 520px)',
                        transform: `
                          translateX(${translateX}px)
                          translateY(${translateY}px)
                          rotate(${rotation}deg)
                          scale(${scale})
                        `,
                        transformOrigin: 'bottom center',
                        zIndex,
                        transition: 'transform 0.15s ease-out',
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden bg-white rounded-2xl shadow-[0_10px_60px_rgba(0,0,0,0.15)] group hover:shadow-[0_20px_80px_rgba(0,0,0,0.25)] transition-shadow duration-500">
                        <Image
                          src={`/images/${cat.id}/hero.jpg`}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Card Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                          <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-2">
                            {cat.subtitle}
                          </p>
                          <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3">
                            {cat.title}
                          </h3>
                          <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                            <span className="text-xs tracking-widest">
                              VIEW PROJECT
                            </span>
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                        </div>

                        {/* Card Number */}
                        <div className="absolute top-5 right-5 text-white/20 text-4xl md:text-5xl font-bold">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
              <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">
                {fanProgress < 0.9 ? 'SCROLL TO EXPLORE' : 'CLICK TO VIEW'}
              </p>
              <div className="w-8 h-1 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black/40 rounded-full"
                  style={{
                    width: `${fanProgress * 100}%`,
                    transition: 'width 0.15s ease-out',
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tagline Section */}
        <section className="py-32 px-6 md:px-12 text-center bg-[#111111] text-white">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-8">
            OUR PHILOSOPHY
          </p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-tight">
            Standard is the enemy of premium.
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto my-12" />
          <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
            We don&apos;t just create content; we build visual legacies. At
            ÆSTHETIX, we blend high-end aesthetics with strategic precision to
            turn scrollers into loyal advocates.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="mt-12 inline-flex items-center gap-3 border border-white/30 px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            <span className="tracking-widest text-sm">START YOUR PROJECT</span>
            <ArrowRight size={16} />
          </button>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 py-32 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-2 text-center">
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center">
            Questions & Answers
          </h2>
          <div className="space-y-0">
            {faqs.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-8 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
                >
                  <span className="text-lg md:text-xl font-medium tracking-tight pr-8">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`transform transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 leading-relaxed pr-8 max-w-2xl">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  // --- VIEW: CATEGORY DETAIL ---
  const CategoryView = () => {
    if (!selectedCategory) return null
    return (
      <div className="pt-32 min-h-screen animate-in fade-in">
        {/* Detail Header */}
        <div className="px-6 md:px-12 mb-12">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-bold tracking-widest opacity-40 hover:opacity-100 mb-8 uppercase"
          >
            ← Back to Overview
          </button>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
            {selectedCategory.title}
          </h1>
          <p className="text-xl tracking-widest uppercase opacity-50">
            {selectedCategory.subtitle}
          </p>
        </div>

        {/* Hero Image for Category */}
        <div className="w-full h-[60vh] bg-stone-300 mb-20 relative overflow-hidden">
          <Image
            src={`/images/${selectedCategory.id}/hero.jpg`}
            alt={selectedCategory.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Split */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto mb-32">
          <div>
            <h3 className="text-xs font-bold tracking-widest mb-6 opacity-40 uppercase">
              The Approach
            </h3>
            <p className="text-xl md:text-2xl leading-relaxed font-light">
              {selectedCategory.body}
            </p>
          </div>
          <div className="flex flex-col justify-center border-l border-gray-200 pl-8 md:pl-16">
            <p className="text-3xl md:text-4xl font-serif italic mb-8">
              &ldquo;{selectedCategory.hook}&rdquo;
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="self-start text-sm border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              {selectedCategory.cta} →
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={`/images/${selectedCategory.id}/project-01.jpg`}
                alt="Project 01"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/5] w-full mt-12 overflow-hidden">
              <Image
                src={`/images/${selectedCategory.id}/project-02.jpg`}
                alt="Project 02"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-video w-full -mt-12 overflow-hidden">
              <Image
                src={`/images/${selectedCategory.id}/project-03.jpg`}
                alt="Project 03"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={`/images/${selectedCategory.id}/project-04.jpg`}
                alt="Project 04"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Footer Nav */}
        <div className="text-center py-20 bg-white border-t border-gray-100">
          <p className="text-xs tracking-widest opacity-40 mb-4">
            READY TO START?
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="text-4xl md:text-6xl font-bold tracking-tighter hover:text-stone-500 transition-colors"
          >
            START PROJECT
          </button>
        </div>
      </div>
    )
  }

  // --- VIEW: INQUIRY FORM (with Formspree) ---
  const ContactView = () => {
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
          setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
        }
      } catch {
        setError('Verbindungsfehler. Bitte versuche es erneut.')
      } finally {
        setLoading(false)
      }
    }

    if (sent) {
      return (
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
          <button
            onClick={() => navigateTo('home')}
            className="text-sm border-b border-black pb-1"
          >
            Back to Home
          </button>
        </div>
      )
    }

    return (
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
              01 Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                name="company"
                placeholder="Company / Brand"
                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
              />
              <input
                type="text"
                name="website"
                placeholder="Website or IG Handle"
                className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Segment */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-40 border-b border-gray-200 pb-2">
              06 Final Note
            </h3>
            <textarea
              name="message"
              placeholder="Anything else we should know? Briefly describe your vision."
              rows={4}
              className="w-full bg-transparent border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors resize-none"
            ></textarea>
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
    )
  }

  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
      <Header />

      <main>
        {currentView === 'home' && <HomeView />}
        {currentView === 'category' && <CategoryView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      <Footer />
    </div>
  )
}
