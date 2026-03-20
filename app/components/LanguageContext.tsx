'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'de' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  de: {
    // Header & Navigation
    'nav.startProject': 'PROJEKT STARTEN',
    'nav.home': 'Home',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.services': 'LEISTUNGEN',
    'nav.email': 'EMAIL',
    'nav.social': 'SOCIAL',

    // Hero
    'hero.tagline': 'DEIN STRATEGISCHER CONTENT-PARTNER',
    'hero.headline': 'Visuals With Purpose.',
    'hero.subline': 'Dein Angebot ist erstklassig. Dein Content sollte es auch sein.',
    'hero.cta': 'PROJEKT STARTEN',
    'hero.explore': 'ENTDECKEN',

    // Sections
    'sections.expertise': 'UNSERE EXPERTISE',
    'sections.exploreWork': 'Entdecke unsere Arbeit',
    'sections.trustedBy': 'VERTRAUT VON',
    'sections.testimonials': 'REFERENZEN',
    'sections.whatClientsSay': 'Was unsere Kunden sagen',
    'sections.philosophy': 'UNSERE PHILOSOPHIE',
    'sections.philosophyHeadline': 'Standard ist der Feind von Premium.',
    'sections.philosophyText': 'Wir erstellen nicht nur Content; wir bauen visuelle Vermächtnisse. Bei ÆSTHETIX verbinden wir High-End-Ästhetik mit strategischer Präzision, um Scroller in loyale Fans zu verwandeln.',
    'sections.faq': 'FAQ',
    'sections.faqTitle': 'Fragen & Antworten',

    // Stats
    'stats.projects': 'Projekte geliefert',
    'stats.clients': 'Zufriedene Kunden',
    'stats.experience': 'Jahre Erfahrung',
    'stats.satisfaction': 'Kundenzufriedenheit',

    // Category View
    'category.back': '← Zurück zur Übersicht',
    'category.approach': 'Der Ansatz',
    'category.readyToStart': 'BEREIT ZU STARTEN?',
    'category.startProject': 'PROJEKT STARTEN',

    // About
    'about.title': 'ÜBER UNS',
    'about.headline1': 'Wir bauen visuelle',
    'about.headline2': 'Vermächtnisse',
    'about.intro': 'ÆSTHETIX ist eine Premium-Agentur für visuellen Content, spezialisiert auf High-End-Fotografie, Videografie und Markenidentität für Luxusmarken, Hotels und ambitionierte Personal Brands.',
    'about.mission': 'UNSERE MISSION',
    'about.missionHeadline': 'Standard ist der Feind von Premium.',
    'about.missionText1': 'Wir erstellen nicht nur Content; wir schaffen visuelle Erlebnisse, die Marken über das Rauschen erheben. In einer Welt voller mittelmäßiger Bilder liefern wir Arbeit, die Aufmerksamkeit einfordert und bleibende Eindrücke schafft.',
    'about.missionText2': 'Jedes Bild, das wir einfangen, jeder Schnitt, den wir machen, folgt einem Prinzip: Deine Marke verdient es, so außergewöhnlich auszusehen, wie sie wirklich ist.',
    'about.values': 'UNSERE WERTE',
    'about.valuesTitle': 'Was uns antreibt',
    'about.value1Title': 'Exzellenz',
    'about.value1Desc': 'Wir geben uns nie mit "gut genug" zufrieden. Jedes Projekt erhält unsere volle kreative Hingabe und technische Präzision.',
    'about.value2Title': 'Authentizität',
    'about.value2Desc': 'Wir fangen die wahre Essenz deiner Marke ein und schaffen Visuals, die resonieren, weil sie echt sind.',
    'about.value3Title': 'Partnerschaft',
    'about.value3Desc': 'Dein Erfolg ist unser Erfolg. Wir arbeiten an deiner Seite als kreative Partner, nicht nur als Dienstleister.',
    'about.ctaHeadline': 'Bereit, deine Marke zu elevieren?',
    'about.ctaText': 'Lass uns gemeinsam etwas Außergewöhnliches erschaffen.',

    // Contact
    'contact.headline': 'Lass uns dein visuelles Vermächtnis bauen.',
    'contact.subline': 'Nimm dir einen Moment, um uns von deinem Projekt zu erzählen.',
    'contact.identity': '01 Identität',
    'contact.name': 'Vollständiger Name',
    'contact.company': 'Firma / Marke',
    'contact.email': 'E-Mail',
    'contact.website': 'Website oder IG Handle',
    'contact.segment': '02 Welchen Bereich sollen wir elevieren?',
    'contact.goal': '03 Primäres Ziel',
    'contact.channels': '04 Wo werden die Assets leben?',
    'contact.budget': '05 Strategische Investition',
    'contact.note': '06 Abschließende Notiz',
    'contact.notePlaceholder': 'Gibt es noch etwas, das wir wissen sollten? Beschreibe kurz deine Vision.',
    'contact.submit': 'ANFRAGE SENDEN',
    'contact.sending': 'WIRD GESENDET...',
    'contact.success': 'Anfrage erhalten.',
    'contact.successText': 'Danke. Wir werden deine Vision prüfen und uns innerhalb von 48 Stunden melden, wenn es passt.',
    'contact.backHome': 'Zurück zur Startseite',
    'contact.error': 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    'contact.connectionError': 'Verbindungsfehler. Bitte versuche es erneut.',

    // Footer
    'footer.rights': '© 2026 ÆSTHETIX. Alle Rechte vorbehalten.',

    // Cookie Banner
    'cookie.title': 'Cookie-Einstellungen',
    'cookie.text': 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Website zu analysieren.',
    'cookie.learnMore': 'Mehr erfahren',
    'cookie.essential': 'Nur Essenzielle',
    'cookie.acceptAll': 'Alle akzeptieren',

    // Calendly
    'calendly.bookCall': 'Termin buchen',
    'calendly.scheduleCall': 'Termin vereinbaren',
  },
  en: {
    // Header & Navigation
    'nav.startProject': 'START PROJECT',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.services': 'SERVICES',
    'nav.email': 'EMAIL',
    'nav.social': 'SOCIAL',

    // Hero
    'hero.tagline': 'YOUR STRATEGIC CONTENT PARTNER',
    'hero.headline': 'Visuals With Purpose.',
    'hero.subline': 'Your offering is first-class. Your content should be too.',
    'hero.cta': 'START PROJECT',
    'hero.explore': 'EXPLORE',

    // Sections
    'sections.expertise': 'OUR EXPERTISE',
    'sections.exploreWork': 'Explore Our Work',
    'sections.trustedBy': 'TRUSTED BY',
    'sections.testimonials': 'TESTIMONIALS',
    'sections.whatClientsSay': 'What Our Clients Say',
    'sections.philosophy': 'OUR PHILOSOPHY',
    'sections.philosophyHeadline': 'Standard is the enemy of premium.',
    'sections.philosophyText': "We don't just create content; we build visual legacies. At ÆSTHETIX, we blend high-end aesthetics with strategic precision to turn scrollers into loyal advocates.",
    'sections.faq': 'FAQ',
    'sections.faqTitle': 'Questions & Answers',

    // Stats
    'stats.projects': 'Projects Delivered',
    'stats.clients': 'Happy Clients',
    'stats.experience': 'Years Experience',
    'stats.satisfaction': 'Client Satisfaction',

    // Category View
    'category.back': '← Back to Overview',
    'category.approach': 'The Approach',
    'category.readyToStart': 'READY TO START?',
    'category.startProject': 'START PROJECT',

    // About
    'about.title': 'ABOUT US',
    'about.headline1': 'We Build Visual',
    'about.headline2': 'Legacies',
    'about.intro': 'ÆSTHETIX is a premium visual content agency specializing in high-end photography, videography, and brand identity for luxury brands, hotels, and ambitious personal brands.',
    'about.mission': 'OUR MISSION',
    'about.missionHeadline': 'Standard is the enemy of premium.',
    'about.missionText1': "We don't just create content; we craft visual experiences that elevate brands above the noise. In a world saturated with mediocre imagery, we deliver work that commands attention and builds lasting impressions.",
    'about.missionText2': 'Every frame we capture, every edit we make, is guided by one principle: your brand deserves to look as exceptional as it truly is.',
    'about.values': 'OUR VALUES',
    'about.valuesTitle': 'What Drives Us',
    'about.value1Title': 'Excellence',
    'about.value1Desc': 'We never settle for good enough. Every project receives our full creative dedication and technical precision.',
    'about.value2Title': 'Authenticity',
    'about.value2Desc': 'We capture the true essence of your brand, creating visuals that resonate because they are real.',
    'about.value3Title': 'Partnership',
    'about.value3Desc': 'Your success is our success. We work alongside you as creative partners, not just service providers.',
    'about.ctaHeadline': 'Ready to elevate your brand?',
    'about.ctaText': "Let's create something exceptional together.",

    // Contact
    'contact.headline': "Let's build your visual legacy.",
    'contact.subline': 'Please take a moment to tell us about your project.',
    'contact.identity': '01 Identity',
    'contact.name': 'Full Name',
    'contact.company': 'Company / Brand',
    'contact.email': 'Email',
    'contact.website': 'Website or IG Handle',
    'contact.segment': '02 Which area should we elevate?',
    'contact.goal': '03 Primary Goal',
    'contact.channels': '04 Where will assets live?',
    'contact.budget': '05 Strategic Investment',
    'contact.note': '06 Final Note',
    'contact.notePlaceholder': 'Anything else we should know? Briefly describe your vision.',
    'contact.submit': 'SEND APPLICATION',
    'contact.sending': 'SENDING...',
    'contact.success': 'Application Received.',
    'contact.successText': "Thank you. We will review your vision and get back to you within 48 hours if it's a match.",
    'contact.backHome': 'Back to Home',
    'contact.error': 'Something went wrong. Please try again.',
    'contact.connectionError': 'Connection error. Please try again.',

    // Footer
    'footer.rights': '© 2026 ÆSTHETIX. All Rights Reserved.',

    // Cookie Banner
    'cookie.title': 'Cookie Settings',
    'cookie.text': 'We use cookies to improve your experience and analyze our website.',
    'cookie.learnMore': 'Learn more',
    'cookie.essential': 'Essential Only',
    'cookie.acceptAll': 'Accept All',

    // Calendly
    'calendly.bookCall': 'Book a Call',
    'calendly.scheduleCall': 'Schedule a Call',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('language') as Language
      if (saved && (saved === 'de' || saved === 'en')) {
        setLangState(saved)
      }
    } catch {
      // localStorage unavailable (SSR, private browsing)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    try { localStorage.setItem('language', newLang) } catch { /* noop */ }
  }

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
