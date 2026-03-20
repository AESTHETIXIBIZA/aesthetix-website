'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import { categories } from '@/app/data/categories'

// --- DATA ---
const stats = [
  { value: 300, suffix: '+', label: 'Projects Delivered' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 7, suffix: '', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

const clientLogos = [
  { src: '/logos/1.png', alt: 'Partner Logo 1' },
  { src: '/logos/2.png', alt: 'Partner Logo 2' },
  { src: '/logos/3.png', alt: 'Partner Logo 3' },
  { src: '/logos/4.png', alt: 'Partner Logo 4' },
  { src: '/logos/5.png', alt: 'Partner Logo 5' },
  { src: '/logos/6.png', alt: 'Partner Logo 6' },
]

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

const testimonials = [
  {
    quote: 'The best creative partner in Germany! David always delivers top results. Thank you for the amazing work.',
    name: 'Elena',
    role: 'Founder',
  },
  {
    quote: 'You notice immediately that he has a professional eye and staged the product perfectly. Additionally, he impresses with a natural, polished, and professional presence.',
    name: 'Thomas',
    role: 'Marketing Manager',
  },
  {
    quote: 'David exceeded our expectations yet again! The videos are simply top-tier. The style and the edits are authentic and absolutely visually stunning.',
    name: 'Julia',
    role: 'Brand Partner',
  },
  {
    quote: 'Incredible! The entire team at OAKAGE thanks you for your dedication! We are extremely satisfied with your work – 10/10.',
    name: 'Fabian',
    role: 'Team OAKAGE',
  },
  {
    quote: 'David was super reliable, and the quality of the shots was top-notch. We were especially pleased with the additional assets he delivered on top. Absolutely recommended!',
    name: 'Dominik',
    role: 'E-Commerce Brand',
  },
]

interface HomeViewProps {
  onOpenCalendly: () => void
}

export default function HomeView({ onOpenCalendly }: HomeViewProps) {
  const [heroIndex, setHeroIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
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

  // Parallax effect for hero
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const heroImages = document.querySelectorAll('.hero-parallax')
      heroImages.forEach((img) => {
        const element = img as HTMLElement
        element.style.transform = `translateY(${scrolled * 0.4}px)`
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Magnetic button effect (throttled)
  useEffect(() => {
    const buttons = document.querySelectorAll('.magnetic-btn')
    const cleanups: (() => void)[] = []
    buttons.forEach((btn) => {
      const button = btn as HTMLElement
      let ticking = false
      const handleMouseMove = (e: MouseEvent) => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          const rect = button.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
          ticking = false
        })
      }
      const handleMouseLeave = () => {
        button.style.transform = 'translate(0, 0)'
      }
      button.addEventListener('mousemove', handleMouseMove, { passive: true })
      button.addEventListener('mouseleave', handleMouseLeave)
      cleanups.push(() => {
        button.removeEventListener('mousemove', handleMouseMove)
        button.removeEventListener('mouseleave', handleMouseLeave)
      })
    })
    return () => cleanups.forEach((fn) => fn())
  }, [])

  // Image reveal on scroll
  useEffect(() => {
    const images = document.querySelectorAll('.reveal-image')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.2 }
    )
    images.forEach((img) => observer.observe(img))
    return () => observer.disconnect()
  }, [])

  // Card fan animation with IntersectionObserver (CSS-based, replaces GSAP)
  useEffect(() => {
    const fanSection = fanSectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current.filter(Boolean)

    if (!fanSection || !cards.length) return

    const cardHeight = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 300
    const gap = 8

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate header
            if (header) {
              header.classList.add('fan-visible')
            }
            // Animate cards with staggered delay
            cards.forEach((card, idx) => {
              if (card) {
                const targetY = idx * (cardHeight + gap)
                card.style.setProperty('--card-offset', `${targetY}px`)
                setTimeout(() => {
                  card.classList.add('fan-visible')
                }, idx * 100)
              }
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(fanSection)
    return () => observer.disconnect()
  }, [])

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Fullscreen Hero Slideshow with Parallax */}
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
            {cat.heroImage && (
              <div
                className="absolute inset-0 scale-110 hero-parallax"
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={`/images/${cat.id}/${cat.heroImage}`}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBf/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMRIf/aAAwDAQACEQMRAD8Aw/T9Puru8htY5Ag5q0jMVbikkjBVX+nFR7xSlRVeK2OgJYdTk//Z"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F5F5F7] via-[#F5F5F7]/60 via-40% to-transparent" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-32 px-6 md:px-12">
          <div className="max-w-5xl">
            <h1
              className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
              style={{
                color: 'white',
                textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(0,0,0,0.1), 0 3px 0 rgba(0,0,0,0.08), 0 4px 0 rgba(0,0,0,0.06), 0 5px 10px rgba(0,0,0,0.25)',
              }}
            >
              Visuals With Purpose.
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-medium max-w-xl mb-8">
              Your offer is world-class.<br className="md:hidden" />
              <span className="md:inline"> </span>Your content should be too.
            </p>
            <button
              onClick={onOpenCalendly}
              className="magnetic-btn group inline-flex items-center gap-3 text-white border border-white/50 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              <span className="font-medium tracking-wide text-sm">BOOK A CALL</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
                idx === heroIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
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
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4">THE PROMISE</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-[#111111] to-[#111111]/60 bg-clip-text text-transparent">
            More bookings.
            <br />
            Less guesswork.
          </h2>
          <p className="text-lg md:text-xl text-[#111111]/60 max-w-2xl mx-auto">
            You already deliver unforgettable experiences. We make sure your content does the same — and actually drives demand.
          </p>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y border-gray-200 bg-[#F5F5F7] overflow-hidden">
        <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-6 text-center px-6">TRUSTED BY</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10" />
          <div className="flex items-center animate-marquee md:animate-marquee-slow">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={idx} className="flex-shrink-0 mx-4 md:mx-12 w-[100px] md:w-[140px]">
                <Image src={logo.src} alt={logo.alt} width={140} height={40} className="object-contain w-[100px] md:w-[140px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll-Triggered Vertical Card Fan (CSS-based, no GSAP) */}
      <section ref={fanSectionRef} className="relative bg-[#F5F5F7] py-8">
        <div ref={headerRef} className="fan-header pt-16 md:pt-20 px-6 md:px-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4">OUR EXPERTISE</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter pb-8 bg-gradient-to-b from-[#111111] to-[#111111]/60 bg-clip-text text-transparent">
            Explore Our Work
          </h2>
        </div>

        <div className="px-4 md:px-8 pb-16" style={{ perspective: '1500px' }}>
          <div className="relative w-full max-w-7xl mx-auto" style={{ height: 'calc(6 * 35vh + 5 * 8px)' }}>
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                ref={(el) => { cardsRef.current[idx] = el }}
                className="fan-card absolute left-0 right-0 mx-auto will-change-transform"
                style={{
                  width: '100%',
                  maxWidth: '1200px',
                  height: '35vh',
                  minHeight: '200px',
                  transformStyle: 'preserve-3d',
                  zIndex: idx + 1,
                }}
              >
                <Link href={`/services/${cat.slug}`} className="block w-full h-full">
                  <div className="relative w-full h-full overflow-hidden bg-white rounded-2xl shadow-[0_-4px_15px_rgba(0,0,0,0.1),0_8px_30px_rgba(0,0,0,0.2)] group hover:shadow-[0_-4px_20px_rgba(0,0,0,0.15),0_25px_50px_rgba(0,0,0,0.3)] transition-shadow duration-300 cursor-pointer">
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
                        <span className="text-white/20 text-3xl md:text-5xl font-bold">{String(idx + 1).padStart(2, '0')}</span>
                        <div>
                          <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase">{cat.subtitle}</p>
                          <h3 className="text-white text-xl md:text-3xl font-bold tracking-tight">{cat.title}</h3>
                        </div>
                        <ArrowRight size={20} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In Section */}
      <section className="pt-8 pb-24 md:pt-12 md:pb-32 px-6 md:px-12 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4">AS SEEN IN</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[5, 1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative cursor-pointer">
                <div className={`${num === 5 ? 'w-[60px] md:w-[80px]' : 'w-[140px] md:w-[180px]'} h-[90px] md:h-[120px] relative transition-all duration-300 ease-out group-hover:scale-[2] group-hover:z-50 active:scale-125 active:z-50`}>
                  <Image
                    src={`/images/as-seen-in/${num}.webp`}
                    alt={`Featured in publication ${num}`}
                    fill
                    className="object-cover rounded-lg shadow-lg group-hover:shadow-2xl active:shadow-2xl transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/5 via-transparent to-[#C9A962]/3" />
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative">
          {stats.map((stat, idx) => (
            <div key={idx} className="group text-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-[#C9A962]/10 rounded-full blur-2xl group-hover:bg-[#C9A962]/20 transition-all duration-500" />
              </div>
              <div className="relative">
                <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-3 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent mx-auto mb-3 group-hover:w-16 transition-all duration-500" />
                <p className="text-xs text-white/40 tracking-[0.2em] uppercase font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-24 md:mb-32">
            <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4">HOW WE WORK</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-b from-[#111111] to-[#111111]/60 bg-clip-text text-transparent">
              From Vision
              <br />
              to Reality.
            </h2>
          </div>
          <div className="space-y-0">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your brand DNA, goals, and what makes you unique.' },
              { step: '02', title: 'Concept', desc: 'Strategic creative direction tailored to your audience.' },
              { step: '03', title: 'Production', desc: 'Premium execution with meticulous attention to detail.' },
              { step: '04', title: 'Delivery', desc: 'Polished assets ready to elevate your presence.' },
            ].map((item, idx) => (
              <div key={idx} className="reveal-image group border-t border-[#111111]/10 py-12 md:py-16" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="flex items-start md:items-center gap-8 md:gap-16">
                  <span className="text-sm font-medium text-[#111111]/30 tracking-wider min-w-[40px]">{item.step}</span>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight flex-1 group-hover:text-[#111111]/70 transition-colors duration-300">{item.title}</h3>
                  <p className="hidden md:block text-[#111111]/50 text-lg max-w-xs text-right">{item.desc}</p>
                </div>
                <p className="md:hidden text-[#111111]/50 text-base mt-4 pl-[72px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline Section with Video Background */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 text-center text-white overflow-hidden min-h-[80vh] flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/philosophy.webm" type="video/webm" />
          <source src="/videos/philosophy.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">OUR PHILOSOPHY</p>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-5xl mx-auto leading-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Standard is the enemy of premium.
          </h2>
          <div className="w-16 h-px bg-white/20 mx-auto my-12" />
          <p className="max-w-2xl mx-auto text-white/70 text-lg leading-relaxed">
            We don&apos;t just create content; we build visual legacies. At ÆSTHETIX, we blend high-end aesthetics with strategic precision to turn scrollers into loyal advocates.
          </p>
          <Link
            href="/contact"
            className="magnetic-btn mt-12 group inline-flex items-center gap-3 bg-white text-[#111111] px-8 py-4 rounded-full hover:bg-[#C9A962] hover:text-white transition-all duration-300"
          >
            <span className="font-medium tracking-wide text-sm">START PROJECT</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F5F7]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4 text-center">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center bg-gradient-to-b from-[#111111] to-[#111111]/60 bg-clip-text text-transparent">
            Questions & Answers
          </h2>
          <div className="space-y-0">
            {faqs.map((item, idx) => (
              <div key={idx} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                  className="w-full py-8 flex justify-between items-center text-left hover:opacity-70 transition-opacity"
                >
                  <span className="text-lg md:text-xl font-medium tracking-tight pr-8">{item.q}</span>
                  <ChevronDown className={`transform transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} size={20} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 leading-relaxed pr-8 max-w-2xl">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#111111]/50 mb-4 text-center">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center bg-gradient-to-b from-[#111111] to-[#111111]/60 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`reveal-image group relative bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col transition-all duration-300 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ perspective: '1000px', minHeight: '320px', transitionDelay: `${idx * 100}ms` }}
                onMouseMove={(e) => {
                  if (window.innerWidth < 768) return
                  const card = e.currentTarget
                  if (card.dataset.ticking) return
                  card.dataset.ticking = '1'
                  requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2
                    const rotateX = (y - centerY) / 20
                    const rotateY = (centerX - x) / 20
                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
                    delete card.dataset.ticking
                  })
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateX(0) rotateY(0) scale(1)'
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C9A962]/0 via-transparent to-[#C9A962]/0 md:group-hover:from-[#C9A962]/20 md:group-hover:to-[#C9A962]/10 transition-all duration-500 pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#C9A962] fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#111111]/80 mb-6 leading-relaxed text-lg flex-grow">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#111111] to-[#333333] text-white flex items-center justify-center text-lg font-medium shadow-md flex-shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-[#C9A962]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
