'use client'

import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface LightboxProps {
  images: { src: string; isWide: boolean }[]
  currentIndex: number
  categoryId: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  categoryId,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const currentImage = images[currentIndex]
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const minSwipeDistance = 50

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  useEffect(() => {
    setImageLoaded(false)
  }, [currentIndex])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) onNext()
    else if (distance < -minSwipeDistance) onPrev()
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    },
    [handleClose, onNext, onPrev]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [handleKeyDown])

  const imageSrc = `/images/${categoryId}/${currentImage.src}`

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-white flex items-center justify-center transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-30 p-2 text-black/40 hover:text-black transition-colors duration-300"
        aria-label="Close"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      {/* Loading indicator */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-black/10 border-t-black/60 rounded-full animate-spin" />
        </div>
      )}

      {/* Image - FULL SCREEN CENTERED */}
      <div
        className={`w-screen h-screen transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={imageSrc}
          src={imageSrc}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-contain p-0"
          onLoad={() => setImageLoaded(true)}
          priority
          quality={95}
          sizes="100vw"
        />
      </div>

      {/* Navigation - Left */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-black/30 hover:text-black active:text-black transition-colors"
        aria-label="Previous"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18L9 12L15 6" />
        </svg>
      </button>

      {/* Navigation - Right */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-black/30 hover:text-black active:text-black transition-colors"
        aria-label="Next"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18L15 12L9 6" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-black/40 text-sm tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
