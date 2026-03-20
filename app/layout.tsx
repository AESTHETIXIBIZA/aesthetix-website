import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import ScrollToTop from './components/ScrollToTop'
import SmoothScroll from './components/SmoothScroll'
import CookieBanner from './components/CookieBanner'
import CalendlyButton from './components/CalendlyButton'
import ErrorBoundary from './components/ErrorBoundary'
import './globals.css'

const GTM_ID = 'GTM-T2HGQ36Z'
const GA_ID = 'G-MEYRGR9BQ4'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Text sofort sichtbar
  preload: true,
})

const siteUrl = 'https://www.aesthetixagency.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ÆSTHETIX | Premium Content Agency for Hotels, Brands & Restaurants | Ibiza',
    template: '%s | ÆSTHETIX',
  },
  description:
    'High-end photography & videography for luxury hotels, restaurants, villas, personal brands, and events in Ibiza. We create visual content that elevates your brand and converts. Based in Ibiza & Germany.',
  keywords: [
    'hotel photographer Ibiza',
    'villa photography Ibiza',
    'content agency Ibiza',
    'luxury real estate photographer Ibiza',
    'beach club videographer Ibiza',
    'restaurant photographer Ibiza',
    'event photographer Ibiza',
    'drone photography Ibiza',
    'hospitality content creation',
    'luxury hotel photography Spain',
    'Balearic Islands photographer',
    'culinary photography Ibiza',
    'personal branding photography',
    'social media content Ibiza',
    'boutique hotel content creation',
  ],
  authors: [{ name: 'ÆSTHETIX' }],
  creator: 'ÆSTHETIX',
  publisher: 'ÆSTHETIX',
  formatDetection: {
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'ÆSTHETIX | Premium Content Agency | Hotels, Brands & Restaurants | Ibiza',
    description:
      'High-end photography & videography for luxury hotels, restaurants, personal brands, and events in Ibiza. Visual content that converts.',
    url: siteUrl,
    siteName: 'ÆSTHETIX',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ÆSTHETIX - Premium Content Agency for Hotels, Brands & Restaurants in Ibiza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ÆSTHETIX | Premium Content Agency | Ibiza',
    description:
      'High-end photography & videography for luxury hotels, restaurants, personal brands, and events. Visual content that converts.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ÆSTHETIX',
  alternateName: 'Aesthetix Agency',
  description:
    'Premium photography and videography agency specializing in luxury hotels, villas, beach clubs, and fine dining in Ibiza and the Balearic Islands. We create high-end visual content that converts browsers into bookers.',
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.png`,
  email: 'info@aesthetixagency.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gröbenzeller Straße 41',
    addressLocality: 'Puchheim',
    postalCode: '82178',
    addressCountry: 'DE',
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'Ibiza',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ibiza',
        addressRegion: 'Balearic Islands',
        addressCountry: 'ES',
      },
    },
    {
      '@type': 'Place',
      name: 'Mallorca',
    },
    {
      '@type': 'Place',
      name: 'Germany',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.9067,
    longitude: 1.4206,
  },
  sameAs: [
    'https://www.instagram.com/agencyaesthetix/',
  ],
  priceRange: '€€€',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Visual Content Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hotel Photography Ibiza',
          description: 'Premium photography for luxury hotels and resorts in Ibiza',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Villa Photography',
          description: 'High-end real estate photography for luxury villas and properties',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Beach Club Content',
          description: 'Event coverage and social media content for beach clubs',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Culinary Photography',
          description: 'Food photography and videography for restaurants and fine dining',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Personal Branding',
          description: 'Professional photography for personal brands and executives',
        },
      },
    ],
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What sets ÆSTHETIX apart from traditional content agencies in Ibiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We blend minimalist high-end aesthetics with sales psychology. Our content is optimized to enhance brand equity and measurably increase engagement. We create strategic assets, not filler material.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does ÆSTHETIX offer hotel and villa photography in Ibiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we specialize in luxury hotel photography, villa content, and real estate visuals across Ibiza and the Balearic Islands. We offer exclusive monthly shooting slots for hospitality clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best content agency for beach clubs in Ibiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ÆSTHETIX is a premium content agency specializing in beach club photography and videography in Ibiza. We capture event energy, atmosphere shots, and create social media content optimized for engagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does professional hotel photography cost in Ibiza?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our hotel and hospitality packages start from €2,500 for boutique properties. Luxury resort productions range from €5,000-15,000 depending on scope, including photography, videography, and drone content.',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111111" />
        <meta name="msapplication-TileColor" content="#111111" />
        {/* Preload Hero Image for LCP */}
        <link rel="preload" as="image" href="/images/brand/header.webp" type="image/webp" />
        {/* DNS Prefetch für externe Ressourcen */}
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ErrorBoundary>
          <SmoothScroll>
            {children}
            <ScrollToTop />
            <CalendlyButton />
            <CookieBanner />
          </SmoothScroll>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
