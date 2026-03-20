// --- DATA: Image Data ---
// Jede Kategorie hat 3 separate Bilder für verschiedene Stellen:
//   hero   = Homepage Hero-Slideshow (Vollbild, rotiert)
//   fan    = Homepage Fächer-Karte (16:9 Querformat)
//   header = Service-Unterseite Header (Vollbild oben)
// Galerie-Bilder: 16zu9 (querformat) + 4zu5 (hochformat)
export const imageData: { [key: string]: { hero: string, fan: string, header: string, '16zu9': string[], '4zu5': string[] } } = {
  brand: {
    hero: 'hero.webp',
    fan: 'fan.webp',
    header: 'header.webp',
    '16zu9': ['1.webp', '4.webp', '5.webp', '6.webp', '9.webp', '11(2).webp', '12.webp', '17.webp', '22.webp'],
    '4zu5': ['2.webp', '3.webp', '5(2).webp', '5(3).webp', '5(4).webp', '5(6).webp', '5(7).webp', '5(8).webp', '5(9).webp', '7.webp', '8.webp', '10.webp', '11.webp', '13.webp', '14.webp', '15.webp', '16.webp', '18.webp', '19.webp', '20.webp', '21.webp', '23.webp', '24.webp', '25.webp'],
  },
  culinary: {
    hero: 'hero.webp',
    fan: 'fan.webp',
    header: 'header.webp',
    '16zu9': ['1.webp', '6.webp', '14.webp', '23.webp', '24.webp', '27.webp', '28.webp', '29.webp', '30.webp', '31.webp', '32.webp', '39.webp', '44.webp'],
    '4zu5': ['2.webp', '3.webp', '4.webp', '5.webp', '7.webp', '8.webp', '9.webp', '10.webp', '11.webp', '13.webp', '15.webp', '16.webp', '17.webp', '18.webp', '19.webp', '20.webp', '21.webp', '22.webp', '25.webp', '26.webp', '33.webp', '34.webp', '35.webp', '36.webp', '37.webp', '38.webp', '40.webp', '41.webp', '42.webp', '43.webp', '45.webp', '46.webp', '47.webp', '48.webp', '49.webp', '50.webp'],
  },
  hotel: {
    hero: 'hero.webp',
    fan: 'fan.webp',
    header: 'header.webp',
    '16zu9': [],
    '4zu5': [],
  },
  personal: {
    hero: '1.webp',
    fan: '1.webp',
    header: '1.webp',
    '16zu9': ['1.webp', '2.webp', '3.webp', '8.webp', '9.webp', '10.webp', '15.webp', '16.webp'],
    '4zu5': ['4.webp', '5.webp', '6.webp', '7.webp', '11.webp', '12.webp', '13.webp', '14.webp', '17.webp', '18.webp', '19.webp', '20.webp'],
  },
  villa: {
    hero: '1.webp',
    fan: '1.webp',
    header: '1.webp',
    '16zu9': ['1.webp', '6.webp', '9.webp', '10.webp', '11.webp', '16.webp', '17.webp', '22.webp', '23.webp', '26.webp', '31.webp', '32.webp', '33.webp', '34.webp', '35.webp', '39.webp'],
    '4zu5': ['2.webp', '3.webp', '4.webp', '5.webp', '7.webp', '8.webp', '12.webp', '13.webp', '14.webp', '15.webp', '18.webp', '19.webp', '20.webp', '21.webp', '24.webp', '25.webp', '27.webp', '28.webp', '29.webp', '30.webp', '36.webp', '37.webp', '38.webp'],
  },
  event: {
    hero: 'hero.webp',
    fan: 'fan.webp',
    header: 'header.webp',
    '16zu9': ['1.webp', '6.webp', '11.webp', '12.webp', '17.webp', '18.webp', '19.webp', '30.webp', '31.webp', '32.webp', '33.webp', '34.webp', '35.webp', '38.webp', '41.webp', '44.webp', '45.webp', '48.webp', '49.webp', '50.webp'],
    '4zu5': ['2.webp', '3.webp', '4.webp', '5.webp', '7.webp', '8.webp', '9.webp', '10.webp', '13.webp', '14.webp', '15.webp', '16.webp', '20.webp', '21.webp', '22.webp', '23.webp', '24.webp', '25.webp', '26.webp', '27.webp', '28.webp', '29.webp', '36.webp', '37.webp', '39.webp', '40.webp', '42.webp', '43.webp', '46.webp', '47.webp', '51.webp', '52.webp', '53.webp', '54.webp', '55.webp', '56.webp', '57.webp', '58.webp', '59.webp', '60.webp', '61.webp'],
  },
}

// --- DATA: CATEGORIES (Enriched with Images & SEO) ---
const categoriesBase = [
  {
    id: 'brand',
    slug: 'brand-identity',
    title: 'BRAND',
    subtitle: 'THE IDENTITY ARCHITECT',
    body: "Most brands look like everyone else. We make sure you don't. We translate your DNA into a visual language that feels expensive, intentional, and irreplaceable.",
    hook: 'Stop competing on price. Start competing on prestige.',
    cta: 'Secure your visual edge',
    // SEO
    metaTitle: 'Brand Photography & Visual Identity | ÆSTHETIX',
    metaDescription: 'Premium brand photography and visual identity creation. We translate your brand DNA into a visual language that feels expensive, intentional, and irreplaceable.',
    keywords: ['brand photography', 'visual identity', 'brand content', 'campaign photography', 'commercial photography'],
  },
  {
    id: 'culinary',
    slug: 'culinary-content-ibiza',
    title: 'CULINARY',
    subtitle: 'THE ART OF TASTE',
    body: "If they can't smell it through the screen, the content failed. We capture the texture, the steam, and the soul of your kitchen. We make your audience hungry before they even see the menu.",
    hook: 'Visuals so immersive, they can almost taste the craft.',
    cta: 'Make them crave your brand',
    // SEO
    metaTitle: 'Restaurant & Food Photography Ibiza | ÆSTHETIX',
    metaDescription: 'Professional culinary photography and food content for restaurants and fine dining in Ibiza. We capture the texture, steam, and soul of your kitchen.',
    keywords: ['food photography Ibiza', 'restaurant photographer Ibiza', 'culinary content', 'fine dining photography', 'menu photography'],
  },
  // HOTEL - temporarily disabled (no images yet)
  // {
  //   id: 'hotel',
  //   slug: 'hotel-photography-ibiza',
  //   title: 'HOTEL',
  //   subtitle: 'THE VIRTUAL CHECK-IN',
  //   body: "A booking isn't made in the lobby; it's made in the imagination. We sell the feeling of the sheets, the glow of the sunset on the balcony, and the silence of luxury. We don't photograph rooms; we sell escapes.",
  //   hook: "Turn 'browsing' into 'fully booked'.",
  //   cta: 'Elevate your guest experience',
  //   // SEO
  //   metaTitle: 'Luxury Hotel Photography Ibiza | ÆSTHETIX',
  //   metaDescription: 'Premium hotel photography and hospitality content for luxury hotels and resorts in Ibiza. We create visuals that turn browsers into bookers.',
  //   keywords: ['hotel photography Ibiza', 'hospitality content', 'resort photography', 'luxury hotel photographer', 'hotel marketing Ibiza'],
  // },
  {
    id: 'personal',
    slug: 'personal-branding',
    title: 'PERSONAL BRAND',
    subtitle: 'THE AUTHORITY LENS',
    body: "In a world of filters, authenticity is the highest currency. We frame your expertise in a way that commands respect. Whether you're a founder, artist, or visionary – we provide the high-end look that matches your inner ambition.",
    hook: 'Your reputation is visual. Make it undeniable.',
    cta: 'Own your narrative',
    // SEO
    metaTitle: 'Personal Branding Photography | ÆSTHETIX',
    metaDescription: 'Professional personal branding photography for founders, executives, and visionaries. We frame your expertise in a way that commands respect and authority.',
    keywords: ['personal branding photography', 'executive portraits', 'founder photography', 'professional headshots', 'authority positioning'],
  },
  {
    id: 'villa',
    slug: 'villa-photography-ibiza',
    title: 'VILLA & RETREATS',
    subtitle: 'THE SANCTUARY',
    body: "High-end properties require a high-end perspective. We showcase the architectural rhythm and the exclusive lifestyle of your estate. Perfect for luxury rentals and off-market sales where 'good' isn't good enough.",
    hook: 'Selling a lifestyle, not just square footage.',
    cta: 'Capture the exclusivity',
    // SEO
    metaTitle: 'Luxury Villa Photography Ibiza | ÆSTHETIX',
    metaDescription: 'Premium villa and real estate photography in Ibiza. We showcase the architectural rhythm and exclusive lifestyle of your property for luxury rentals and sales.',
    keywords: ['villa photography Ibiza', 'real estate photographer Ibiza', 'luxury property photography', 'architectural photography', 'drone photography Ibiza'],
  },
  {
    id: 'event',
    slug: 'event-videography-ibiza',
    title: 'EVENT',
    subtitle: 'THE ENERGY CAPSULE',
    body: "Ibiza doesn't sleep, and neither does the demand for top-tier coverage. From the roar of the booth to the intimacy of a sunset dinner – we capture the lightning in a bottle. Limited monthly slots for Ibiza-based venues.",
    hook: 'You create the moment. We make it immortal.',
    cta: 'Check availability for our next island circuit',
    // SEO
    metaTitle: 'Event Photography & Videography Ibiza | ÆSTHETIX',
    metaDescription: 'Professional event coverage and beach club content in Ibiza. From club nights to private parties – we capture the energy and make moments immortal.',
    keywords: ['event photographer Ibiza', 'beach club videographer', 'club photography Ibiza', 'party photographer', 'event coverage Ibiza'],
  },
]

// Enrich categories with image data
export const categories = categoriesBase.map(cat => {
  const imageSet = imageData[cat.id] || { hero: '', fan: '', header: '', '16zu9': [], '4zu5': [] }
  const heroImage = imageSet.hero || imageSet.header || ''
  const headerImage = imageSet.header || imageSet.hero || ''
  const fanImage = imageSet.fan || imageSet['16zu9'][0] || headerImage
  const gallery16 = imageSet['16zu9']
  const gallery45 = imageSet['4zu5']

  // Combine all images with their type
  const all16 = gallery16.map(img => ({ src: img, isWide: true }))
  const all45 = gallery45.map(img => ({ src: img, isWide: false }))

  // Sort chronologically by filename number (handles "11(2).jpg" as 11.2)
  const getNum = (src: string) => {
    const match = src.match(/(\d+)(?:\((\d+)\))?/)
    if (match) {
      const main = parseInt(match[1])
      const sub = match[2] ? parseInt(match[2]) / 10 : 0
      return main + sub
    }
    return 0
  }
  const galleryImages = [...all16, ...all45].sort((a, b) => getNum(a.src) - getNum(b.src))

  return {
    ...cat,
    heroImage,
    headerImage,
    fanImage,
    galleryImages
  }
})

// Helper to get category by slug
export function getCategoryBySlug(slug: string) {
  return categories.find(cat => cat.slug === slug)
}

// Helper to get category by id
export function getCategoryById(id: string) {
  return categories.find(cat => cat.id === id)
}

// Type export
export type Category = typeof categories[number]
