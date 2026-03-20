'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/app/data/categories'

// Shared components
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import CalendlyButton from '@/app/components/CalendlyButton'
import CookieBanner from '@/app/components/CookieBanner'
import Lightbox from '@/app/components/Lightbox'

export default function ServicePageClient({ category }: { category: Category }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === category.galleryImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? category.galleryImages.length - 1 : prev - 1
    )
  }
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans selection:bg-black selection:text-white">
      {!lightboxOpen && <Header />}

      <main className="pt-32 min-h-screen animate-in fade-in">
        {/* Hero Image with Title Overlay */}
        <div className="w-full mb-20 relative">
          {category.headerImage && (
            <Image
              src={`/images/${category.id}/${category.headerImage}`}
              alt={category.title}
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority
            />
          )}
          {/* Title Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-8 md:pb-16 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <Link
              href="/"
              className="text-xs font-bold tracking-widest opacity-80 hover:opacity-100 mb-8 uppercase inline-block text-white"
            >
              ← Back to Overview
            </Link>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
              {category.title}
            </h1>
            <p className="text-xl tracking-widest uppercase opacity-70 text-white">
              {category.subtitle}
            </p>
          </div>
        </div>

        {/* Content Split */}
        <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-7xl mx-auto mb-32">
          <div>
            <h2 className="text-xs font-bold tracking-widest mb-6 opacity-60 uppercase">
              The Approach
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light">
              {category.body}
            </p>
          </div>
          <div className="flex flex-col justify-center border-l border-gray-200 pl-8 md:pl-16">
            <p className="text-3xl md:text-4xl font-serif italic mb-8">
              &ldquo;{category.hook}&rdquo;
            </p>
            <Link
              href="/contact"
              className="self-start text-sm border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              {category.cta} →
            </Link>
          </div>
        </div>

        {/* Gallery Grid with Lightbox */}
        {category.galleryImages.length > 0 && (
          <div className="px-4 md:px-12 max-w-7xl mx-auto mb-32">
            {/* Mobile: 2 columns simple grid */}
            <div className="grid grid-cols-2 gap-2 md:hidden">
              {category.galleryImages.map((img, idx) => (
                <div
                  key={`${category.id}-${img.src}-${idx}-mobile`}
                  className={`${img.isWide ? 'col-span-2' : 'col-span-1'} cursor-pointer`}
                  onClick={() => openLightbox(idx)}
                >
                  <div className={`relative overflow-hidden rounded-lg ${img.isWide ? 'aspect-video' : 'aspect-[4/5]'}`}>
                    <Image
                      src={`/images/${category.id}/${img.src}`}
                      alt={`${category.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes={img.isWide ? '100vw' : '50vw'}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: CSS Grid - 16:9 full width, 4:5 in 4-column grid */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px'
              }}
            >
              {category.galleryImages.map((img, idx) => (
                <div
                  key={`${category.id}-${img.src}-${idx}-desktop`}
                  style={{
                    gridColumn: img.isWide ? 'span 4' : 'span 1'
                  }}
                  className="cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <div
                    className="overflow-hidden rounded-lg w-full group relative"
                    style={{ height: img.isWide ? '450px' : '320px' }}
                  >
                    <Image
                      src={`/images/${category.id}/${img.src}`}
                      alt={`${category.title} ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={img.isWide ? '100vw' : '25vw'}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            images={category.galleryImages}
            currentIndex={currentImageIndex}
            categoryId={category.id}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}

        {/* Footer Nav */}
        <div className="text-center py-20 bg-white border-t border-gray-100">
          <p className="text-xs tracking-widest opacity-60 mb-4">
            READY TO START?
          </p>
          <Link
            href="/contact"
            className="text-4xl md:text-6xl font-bold tracking-tighter hover:text-stone-500 transition-colors"
          >
            START PROJECT
          </Link>
        </div>
      </main>

      <Footer />
      <CalendlyButton />
      <CookieBanner />
    </div>
  )
}
