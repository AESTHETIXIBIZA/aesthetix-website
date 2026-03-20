import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact | Start Your Project',
  description: 'Get in touch with ÆSTHETIX for premium photography and videography services in Ibiza. Hotels, villas, restaurants, events, and personal branding.',
  openGraph: {
    title: 'Contact ÆSTHETIX | Start Your Project',
    description: 'Get in touch for premium photography and videography services in Ibiza.',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
