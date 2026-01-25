'use client'

import Link from 'next/link'

export default function Datenschutz() {
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F7]/90 backdrop-blur-sm py-6 px-6 md:px-12 flex justify-between items-center border-b border-gray-200/50">
        <Link href="/" className="font-bold text-2xl tracking-tighter">
          ÆSTHETIX
        </Link>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-12">
          Datenschutzerklärung
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-medium text-black mt-4 mb-2">
              Allgemeine Hinweise
            </h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber,
              was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
              Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              2. Verantwortliche Stelle
            </h2>
            <p>
              ÆSTHETIX
              <br />
              David Jones
              <br />
              [Adresse]
              <br />
              E-Mail: info@aesthetixagency.com
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              3. Datenerfassung auf dieser Website
            </h2>

            <h3 className="font-medium text-black mt-4 mb-2">
              Kontaktformular
            </h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines
              Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
              Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
              Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f
              DSGVO).
            </p>

            <h3 className="font-medium text-black mt-4 mb-2">Formspree</h3>
            <p>
              Für die Verarbeitung von Kontaktformularen nutzen wir den Dienst
              Formspree (Formspree, Inc.). Wenn Sie das Kontaktformular
              ausfüllen, werden Ihre Daten an Formspree übermittelt und dort
              gespeichert. Weitere Informationen finden Sie in der
              Datenschutzerklärung von Formspree:{' '}
              <a
                href="https://formspree.io/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70"
              >
                https://formspree.io/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">4. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. gehostet. Vercel kann beim
              Aufruf dieser Website automatisch Informationen in sogenannten
              Server-Log-Dateien speichern, die Ihr Browser automatisch
              übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="mt-2">
              Weitere Informationen:{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70"
              >
                https://vercel.com/legal/privacy-policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              5. Ihre Rechte
            </h2>
            <p>Sie haben jederzeit das Recht:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
              <li>Berichtigung unrichtiger Daten zu verlangen</li>
              <li>Löschung Ihrer Daten zu verlangen</li>
              <li>Einschränkung der Verarbeitung zu verlangen</li>
              <li>Der Verarbeitung zu widersprechen</li>
              <li>Datenübertragbarkeit zu verlangen</li>
            </ul>
            <p className="mt-2">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
              sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              6. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
              über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-sm hover:opacity-50 transition-opacity"
          >
            ← Zurück zur Startseite
          </Link>
        </div>
      </main>
    </div>
  )
}
