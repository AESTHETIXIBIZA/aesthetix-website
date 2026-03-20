import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategoryBySlug } from '@/app/data/categories'
import ServicePageClient from './ServicePageClient'

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

// Generate metadata for each service page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    keywords: category.keywords,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      type: 'website',
      images: [
        {
          url: `/images/${category.id}/${category.headerImage}`,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: category.metaTitle,
      description: category.metaDescription,
      images: [`/images/${category.id}/${category.headerImage}`],
    },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Schema.org structured data for this service
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: category.title,
    description: category.metaDescription,
    provider: {
      '@type': 'ProfessionalService',
      name: 'ÆSTHETIX',
      url: 'https://www.aesthetixagency.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Ibiza, Balearic Islands',
    },
    image: `https://www.aesthetixagency.com/images/${category.id}/${category.headerImage}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <ServicePageClient category={category} />
    </>
  )
}
