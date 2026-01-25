import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ÆSTHETIX | High-End Visual Content Agency',
  description:
    "We don't just create content; we build visual legacies. Premium photography, videography & brand identity for luxury brands, hotels, and personal brands.",
  keywords: [
    'content agency',
    'visual content',
    'luxury photography',
    'brand identity',
    'Ibiza',
    'hotel photography',
    'culinary content',
  ],
  authors: [{ name: 'ÆSTHETIX' }],
  openGraph: {
    title: 'ÆSTHETIX | High-End Visual Content Agency',
    description:
      'Standard is the enemy of premium. We blend high-end aesthetics with strategic precision.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
