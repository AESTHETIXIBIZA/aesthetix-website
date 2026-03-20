import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About | Our Story & Mission',
  description: 'ÆSTHETIX is a premium visual content agency specializing in high-end photography and videography for luxury brands, hotels, and personal brands in Ibiza.',
  openGraph: {
    title: 'About ÆSTHETIX | Our Story & Mission',
    description: 'Premium visual content agency for luxury brands in Ibiza.',
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
