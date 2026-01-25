'use client'

import Link from 'next/link'

export default function Impressum() {
  return (
    <div className="bg-[#F5F5F7] min-h-screen text-[#111111] font-sans">
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F7]/90 backdrop-blur-sm py-6 px-6 md:px-12 flex justify-between items-center border-b border-gray-200/50">
        <Link href="/" className="font-bold text-2xl tracking-tighter">
          ÆSTHETIX
        </Link>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-12">Impressum</h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              Angaben gemäß § 5 TMG
            </h2>
            <p>
              ÆSTHETIX
              <br />
              David Jones
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ] Zaragoza, Spanien
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">Kontakt</h2>
            <p>E-Mail: info@aesthetixagency.com</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              Umsatzsteuer-ID
            </h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
              <br />
              [USt-IdNr. einfügen]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              David Jones
              <br />
              [Adresse wie oben]
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p className="mt-2">
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-black mb-3">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
