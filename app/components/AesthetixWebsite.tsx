'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Check } from 'lucide-react'
import CalendlyButton from './CalendlyButton'
import CookieBanner from './CookieBanner'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories, type Category } from '@/app/data/categories'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// --- COMPONENT: ANIMATED COUNTER ---
function AnimatedCounter({
  end,
  suffix = '',
  duration = 2000,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

// --- DATA: STATS ---
const stats = [
  { value: 300, suffix: '+', label: 'Projects Delivered' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 7, suffix: '', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

// --- DATA: CLIENT LOGOS ---
const clientLogos = [
  { src: '/logos/1.png', alt: 'Partner Logo 1' },
  { src: '/logos/2.png', alt: 'Partner Logo 2' },
  { src: '/logos/3.png', alt: 'Partner Logo 3' },
  { src: '/logos/4.png', alt: 'Partner Logo 4' },
  { src: '/logos/5.png', alt: 'Partner Logo 5' },
  { src: '/logos/6.png', alt: 'Partner Logo 6' },
]

// Categories imported from @/app/data/categories

// --- DATA: FAQ ---
const faqs = [
  {
    q: 'What sets ÆSTHETIX apart from a traditional content agency?',
    a: "Most agencies deliver images; we create visual identities. At ÆSTHETIX, we blend minimalist aesthetics with sales psychology precision. Our content is optimized to enhance brand equity and measurably increase engagement on digital platforms. We don't produce filler material – we create strategic assets.",
  },
  {
    q: 'Why is professional visual storytelling crucial for hotels and luxury villas?',
    a: 'In the premium sector, booking decisions are made within milliseconds – purely visually. High-quality photography and cinematography for hotels and properties convey exclusivity and trust. We use lighting and composition not just to show spaces, but to make the feeling of staying there tangible. This directly increases your booking inquiry conversion rate.',
  },
  {
    q: 'Does ÆSTHETIX offer full-service productions in Ibiza?',
    a: 'Yes, ÆSTHETIX specializes in Ibiza. We offer exclusive shooting slots for beach clubs, fine-dining restaurants, and event organizers. Our local expertise eliminates complex travel planning for our clients while guaranteeing content at an international high-end level.',
  },
  {
    q: 'How does ÆSTHETIX transform a personal brand?',
    a: 'A personal brand is the visual promise of expertise. We frame your personality in a context of authority and style. From your first keynote to high-end reels: we ensure your digital presence matches your real market value. We turn experts into brands.',
  },
  {
    q: 'Is the content optimized for paid ads (Google & Meta)?',
    a: 'Absolutely. Every piece of content is created with modern marketing metrics in mind. We focus on visual hooks and formats that achieve higher performance in SEA campaigns and social ads. This minimizes wasted reach and maximizes the visual impact of your advertising budget.',
  },
  {
    q: 'How does collaboration on a brand campaign work?',
    a: 'We start with an in-depth analysis of your brand identity. Building on that, we develop a visual concept that emotionally connects with your target audience. From the first sketch to the final high-end export, we guide the process with an uncompromising eye for perfection and minimalism.',
  },
]

// --- DATA: TESTIMONIALS ---
const testimonials = [
  {
    quote:
      'The best creative partner in Germany! David always delivers top results. Thank you for the amazing work.',
    name: 'Elena',
    role: 'Founder',
  },
  {
    quote:
      'You notice immediately that he has a professional eye and staged the product perfectly. Additionally, he impresses with a natural, polished, and professional presence.',
    name: 'Thomas',
    role: 'Marketing Manager',
  },
  {
    quote:
      'David exceeded our expectations yet again! The videos are simply top-tier. The style and the edits are authentic and absolutely visually stunning.',
    name: 'Julia',
    role: 'Brand Partner',
  },
  {
    quote:
      'Incredible! The entire team at OAKAGE thanks you for your dedication! We are extremely satisfied with your work – 10/10.',
    name: 'Fabian',
    role: 'Team OAKAGE',
  },
  {
    quote:
      'David was super reliable, and the quality of the shots was top-notch. We were especially pleased with the additional assets he delivered on top. Absolutely recommended!',
    name: 'Dominik',
    role: 'E-Commerce Brand',
  },
]

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqeaqaj'

export default function AesthetixWebsite() {
  const [currentView, setCurrentView] = useState<
    'home' | 'contact' | 'category' | 'about'
  >('home')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigateTo = (
    view: 'home' | 'contact' | 'category' | 'about',
    category: Category | null = null
  ) => {
    setIsMenuOpen(false)
    setIsTransitioning(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (category) {
        setSelectedCategory(category)
        setCurrentView('category')
      } else {
        setCurrentView(view)
      }
      setTransitionKey((prev) => prev + 1)
      setIsTransitioning(false)
    }, 150)
  }

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // --- COMPONENT: HEADER ---
  const Header = () => (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center border-b transition-all duration-300 ${isMenuOpen ? 'bg-[#111111] border-white/10' : 'bg-[#F5F5F7]/90 backdrop-blur-sm border-gray-200/50'}`}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col justify-center items-center w-10 h-10 gap-1.5 transition-colors ${isMenuOpen ? 'text-white' : 'text-[#111111]'}`}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>

        <button
          onClick={() => navigateTo('home')}
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
        </button>

        <button
          onClick={() => navigateTo('contact')}
          className={`text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-full transition-all duration-300 whitespace-nowrap ${isMenuOpen ? 'border border-white text-white hover:bg-white hover:text-[#111111]' : 'border border-[#111111] hover:bg-[#111111] hover:text-white'}`}
        >
          <span className="hidden sm:inline">START PROJECT</span>
          <span className="sm:hidden">START</span>
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-all duration-700 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 via-transparent to-[#C9A962]/3" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Decorative line */}
        <div
          className={`absolute left-8 md:left-16 lg:left-24 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-1000 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        />

        <div className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20">
          {/* Main Navigation */}
          <div className="space-y-1 mb-16">
            <p
              className={`text-[#C9A962]/60 text-[10px] tracking-[0.4em] uppercase mb-8 transition-all duration-500 delay-100 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              NAVIGATION
            </p>
            {[
              { label: 'Home', action: () => navigateTo('home') },
              { label: 'About', action: () => navigateTo('about') },
              { label: 'Contact', action: () => navigateTo('contact') },
            ].map((item, idx) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`group relative flex items-center gap-6 py-2 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{
                  transitionDelay: isMenuOpen ? `${200 + idx * 100}ms` : '0ms',
                }}
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
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            className={`w-24 h-px bg-gradient-to-r from-white/20 to-transparent mb-10 transition-all duration-700 ${isMenuOpen ? 'opacity-100 w-24' : 'opacity-0 w-0'}`}
            style={{ transitionDelay: isMenuOpen ? '450ms' : '0ms' }}
          />

          {/* Services / Categories */}
          <div>
            <p
              className={`text-[#C9A962]/60 text-[10px] tracking-[0.4em] uppercase mb-6 transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: isMenuOpen ? '400ms' : '0ms' }}
            >
              SERVICES
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
              {categories.map((cat, idx) => (
                <Link
                  key={cat.id}
                  href={`/services/${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group text-left flex items-center gap-3 transition-all duration-400 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{
                    transitionDelay: isMenuOpen ? `${500 + idx * 60}ms` : '0ms',
                  }}
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
          <div
            className={`mt-auto pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: isMenuOpen ? '650ms' : '0ms' }}
          >
            <div className="group">
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">
                EMAIL
              </p>
              <a
                href="mailto:info@aesthetixagency.com"
                className="text-white/70 hover:text-[#C9A962] transition-colors duration-300 text-sm md:text-base"
              >
                info@aesthetixagency.com
              </a>
            </div>
            <div className="group">
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-2">
                SOCIAL
              </p>
              <a
                href="https://www.instagram.com/agencyaesthetix/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#C9A962] transition-colors duration-300 text-sm md:text-base flex items-center gap-2"
              >
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

  // --- COMPONENT: FOOTER ---
  const Footer = () => (
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

  // --- VIEW: HOME ---
  const HomeView = () => {
    const [heroIndex, setHeroIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const fanSectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const headerRef = useRef<HTMLDivElement>(null)

    // Auto-advance hero slideshow
    useEffect(() => {
      if (!isAutoPlaying) return
      const timer = setInterval(() => {
        setHeroIndex((prev) => (prev + 1) % categories.length)
      }, 4000)
      return () => clearInterval(timer)
    }, [isAutoPlaying])

    // GSAP ScrollTrigger for smooth card fan animation
    useLayoutEffect(() => {
      if (typeof window === 'undefined') return

      const ctx = gsap.context(() => {
        const cards = cardsRef.current.filter(Boolean)
        if (!cards.length || !fanSectionRef.current) return

        const cardHeight = window.innerHeight * 0.33
        const gap = 12

        // Initial state: Karten gestapelt mit leichter 3D-Rotation
        cards.forEach((card, idx) => {
          gsap.set(card, {
            y: 0,
            rotationX: -8,
            scale: 0.95,
            opacity: 0.6,
            transformPerspective: 1200,
            transformOrigin: 'center top',
          })
        })

        // Timeline für Scroll-Animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fanSectionRef.current,
            start: 'top 75%',
            end: 'top 10%',
            scrub: 0.6,
          },
        })

        // Alle Karten gleichzeitig animieren
        cards.forEach((card, idx) => {
          const targetY = idx * (cardHeight + gap)

          tl.to(
            card,
            {
              y: targetY,
              rotationX: 0,
              scale: 1,
              opacity: 1,
              ease: 'none',
            },
            0
          )
        })

        // Header Animation
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: fanSectionRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      }, fanSectionRef)

      return () => ctx.revert()
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
              {cat.headerImage && (
                <Image
                  src={`/images/${cat.id}/${cat.headerImage}`}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Aw/T9Puru8htY5Ag5q0jMVbikkjBVX+nFR7xSlRVeK2OgJYdTk//Z"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              {/* Top fade to background - smooth */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F5F5F7] via-[#F5F5F7]/60 via-40% to-transparent" />
            </div>
          ))}

          {/* Hero Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-6 md:px-12">
            <div className="max-w-5xl">
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">
                YOUR STRATEGIC CONTENT PARTNER
              </p>
              <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6">
                Visuals With Purpose.
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8">
                Your offer is world-class. Your content should be too.
              </p>
              <button
                onClick={() => navigateTo('contact')}
                className="group inline-flex items-center gap-3 text-white border border-white/50 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="tracking-widest text-sm">START PROJECT</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${cat.title}`}
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

        {/* Value Proposition Intro */}
        <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F5F7]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-6">
              THE PROMISE
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              More bookings.
              <br />
              <span className="text-[#111111]/40">Less guesswork.</span>
            </h2>
            <p className="text-lg md:text-xl text-[#111111]/60 max-w-2xl mx-auto">
              You already deliver unforgettable experiences. We make sure your
              content does the same — and actually drives demand.
            </p>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 border-y border-gray-200 bg-[#F5F5F7] overflow-hidden">
          <p className="text-xs tracking-[0.3em] uppercase opacity-40 mb-8 text-center px-6">
            TRUSTED BY
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10" />
            <div className="flex items-center animate-marquee">
              {[...clientLogos, ...clientLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 mx-12"
                  style={{ width: '140px' }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll-Triggered Vertical Card Fan */}
        <section ref={fanSectionRef} className="relative bg-[#F5F5F7] py-8">
          {/* Header */}
          <div
            ref={headerRef}
            className="pt-16 md:pt-20 px-6 md:px-12 text-center"
          >
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-3">
              OUR EXPERTISE
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter pb-8">
              Explore Our Work
            </h2>
          </div>

          {/* Card Fan Container */}
          <div className="px-4 md:px-8 pb-16" style={{ perspective: '1500px' }}>
            <div
              className="relative w-full max-w-7xl mx-auto"
              style={{ height: 'calc(6 * 33vh + 5 * 12px)' }}
            >
              {categories.map((cat, idx) => {
                const zIndex = idx + 1
                return (
                  <div
                    key={cat.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el
                    }}
                    className="absolute left-0 right-0 mx-auto will-change-transform"
                    style={{
                      width: '100%',
                      maxWidth: '1200px',
                      height: '33vh',
                      transformOrigin: 'center top',
                      transformStyle: 'preserve-3d',
                      zIndex,
                    }}
                  >
                    <Link
                      href={`/services/${cat.slug}`}
                      className="block w-full h-full"
                    >
                      <div className="relative w-full h-full overflow-hidden bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] group hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-shadow duration-300 cursor-pointer">
                        {cat.fanImage && (
                          <Image
                            src={`/images/${cat.id}/${cat.fanImage}`}
                            alt={cat.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Aw/T9Puru8htY5Ag5q0jMVbikkjBVX+nFR7xSlRVeK2OgJYdTk//Z"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                        <div className="absolute inset-0 flex items-center p-4 md:p-8">
                          <div className="flex items-center gap-4 md:gap-8">
                            <span className="text-white/20 text-3xl md:text-5xl font-bold">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">
                                {cat.subtitle}
                              </p>
                              <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight">
                                {cat.title}
                              </h3>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 px-6 md:px-12 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-2 text-center">
              TESTIMONIALS
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#111111]/80 mb-6 leading-relaxed flex-grow">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-[#111111]/10 flex items-center justify-center text-lg font-medium">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm opacity-60">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section - Modern Design */}
        <section className="py-24 px-6 md:px-12 bg-[#111111] relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 via-transparent to-[#C9A962]/3" />

          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative">
            {stats.map((stat, idx) => (
              <div key={idx} className="group text-center relative">
                {/* Glow effect behind number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#C9A962]/10 rounded-full blur-2xl group-hover:bg-[#C9A962]/20 transition-all duration-500" />
                </div>

                {/* Number with gradient */}
                <div className="relative">
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-3 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </p>
                  {/* Accent line */}
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent mx-auto mb-3 group-hover:w-16 transition-all duration-500" />
                  <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tagline Section with Video Background */}
        <section className="relative py-32 px-6 md:px-12 text-center text-white overflow-hidden min-h-[80vh] flex items-center justify-center">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/philosophy.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-8">
              OUR PHILOSOPHY
            </p>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-tight">
              Standard is the enemy of premium.
            </h2>
            <div className="w-16 h-px bg-white/20 mx-auto my-12" />
            <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
              We don&apos;t just create content; we build visual legacies. At
              ÆSTHETIX, we blend high-end aesthetics with strategic precision to
              turn scrollers into loyal advocates.
            </p>
            <button
              onClick={() => navigateTo('contact')}
              className="mt-12 inline-flex items-center gap-3 border border-white/30 px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="tracking-widest text-sm">
                START YOUR PROJECT
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 md:px-12 py-32 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-2 text-center">
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
            className="text-xs font-bold tracking-widest opacity-60 hover:opacity-100 mb-8 uppercase"
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
          {selectedCategory.headerImage && (
            <Image
              src={`/images/${selectedCategory.id}/${selectedCategory.headerImage}`}
              alt={selectedCategory.title}
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Aw/T9Puru8htY5Ag5q0jMVbikkjBVX+nFR7xSlRVeK2OgJYdTk//Z"
            />
          )}
          {/* Top fade to background */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#F5F5F7] to-transparent" />
        </div>

        {/* Content Split */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto mb-32">
          <div>
            <h3 className="text-xs font-bold tracking-widest mb-6 opacity-60 uppercase">
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

        {/* Gallery Grid with Zoom */}
        <div className="px-4 md:px-12 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {selectedCategory.galleryImages.map((img, idx) => (
              <div
                key={`${selectedCategory.id}-${img.src}-${idx}`}
                className={`${img.isWide ? 'col-span-2' : 'col-span-1'}`}
              >
                <Zoom>
                  <div
                    className={`relative overflow-hidden rounded-lg ${img.isWide ? 'aspect-video' : 'aspect-[4/5]'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/${selectedCategory.id}/${img.src}`}
                      alt={`${selectedCategory.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Zoom>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Nav */}
        <div className="text-center py-20 bg-white border-t border-gray-100">
          <p className="text-xs tracking-widest opacity-60 mb-4">
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

  // --- VIEW: ABOUT US ---
  const AboutView = () => {
    return (
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
            ÆSTHETIX is a premium visual content agency specializing in high-end
            photography, videography, and brand identity for luxury brands,
            hotels, and ambitious personal brands.
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
                We don&apos;t just create content; we craft visual experiences
                that elevate brands above the noise. In a world saturated with
                mediocre imagery, we deliver work that commands attention and
                builds lasting impressions.
              </p>
              <p>
                Every frame we capture, every edit we make, is guided by one
                principle: your brand deserves to look as exceptional as it
                truly is.
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
            <button
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-3 bg-[#111111] text-white px-10 py-4 rounded-full hover:bg-[#333333] transition-all duration-300"
            >
              <span className="tracking-widest text-sm">
                START YOUR PROJECT
              </span>
              <ArrowRight size={16} />
            </button>
          </div>
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
            <h3 className="text-xs font-bold tracking-widest uppercase opacity-60 border-b border-gray-200 pb-2">
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

      <main
        key={transitionKey}
        className={`page-transition ${isTransitioning ? 'opacity-0' : ''}`}
      >
        {currentView === 'home' && <HomeView />}
        {currentView === 'category' && <CategoryView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      <Footer />
      <CalendlyButton />
      <CookieBanner />
    </div>
  )
}
