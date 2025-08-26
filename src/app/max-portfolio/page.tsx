import Link from "next/link";

export default function MaxPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-blue-900">
      <div className="container mx-auto px-6 py-8">
        {/* Zurück Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Hauptseite
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">M</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Max Portfolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Willkommen in Max' innovativem Arbeitsbereich. Hier entstehen technische Lösungen und kreative Projekte.
          </p>
        </div>

        {/* Content Bereich */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6 text-center">
              Inhalte kommen bald...
            </h2>
            <div className="text-center text-slate-600 dark:text-slate-300">
              <p className="mb-4">
                Dieser Bereich wird von Max mit spannenden Projekten und Inhalten gefüllt.
              </p>
              <p>
                Schau bald wieder vorbei für Updates!
              </p>
            </div>
            
            {/* Platzhalter für zukünftige Inhalte */}
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 border-2 border-dashed border-slate-300 dark:border-slate-600">
                  <div className="text-center text-slate-500 dark:text-slate-400">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-600 rounded-lg mx-auto mb-3"></div>
                    <p className="text-sm">Projekt Platzhalter</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
