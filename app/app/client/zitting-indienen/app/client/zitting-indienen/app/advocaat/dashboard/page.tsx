'use client'

import { useState } from 'react'
import Link from 'next/link'

// Voorbeelddata voor binnenkomende spoedzaken
const INITIAL_CASES = [
  {
    id: 'ZAK-1001',
    naam: 'K. de Jong',
    telefoon: '06 12345678',
    typeZaak: 'Aanhouding / Strafrecht',
    locatie: 'Politiebureau Amsterdam Zuid',
    tijdstip: '10 min geleden',
    status: 'SPOED',
    toelichting: 'Cliënt is zojuist aangehouden. Verzoekt direct bijstand voor het eerste verhoor.'
  },
  {
    id: 'ZAK-1002',
    naam: 'M. Visser',
    telefoon: '06 98765432',
    typeZaak: 'Verkeer / Rijbewijs',
    locatie: 'Rechtbank Den Haag',
    tijdstip: '25 min geleden',
    status: 'IN BEHANDELING',
    toelichting: 'Rijbewijs ingevorderd na snelheidsovertreding. Klaarschrift indienen.'
  }
]

export default function AdvocatenDashboard() {
  const [cases, setCases] = useState(INITIAL_CASES)

  const handleAccept = (id: string) => {
    setCases(cases.map(c => c.id === id ? { ...c, status: 'GEACCEPTEERD' } : c))
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 sm:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <Link href="/" className="text-xs text-amber-400 hover:underline mb-1 inline-block">
            ← Terug naar Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">Advocaten Portaal</h1>
          <p className="text-xs text-slate-400">Overzicht van binnengekomen spoedaanvragen</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Verbinding
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-slate-200">Binnenkomende Zaken ({cases.length})</h2>

        <div className="grid grid-cols-1 gap-4">
          {cases.map((zaak) => (
            <div 
              key={zaak.id} 
              className={`p-5 rounded-2xl border transition shadow-lg ${
                zaak.status === 'SPOED' 
                  ? 'bg-slate-800/90 border-red-500/50 hover:border-red-500' 
                  : zaak.status === 'GEACCEPTEERD'
                  ? 'bg-slate-800/40 border-emerald-500/30'
                  : 'bg-slate-800/60 border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">
                    {zaak.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    zaak.status === 'SPOED' ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse' :
                    zaak.status === 'GEACCEPTEERD' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {zaak.status}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{zaak.tijdstip}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Cliënt</p>
                  <p className="font-semibold text-slate-100">{zaak.naam}</p>
                  <p className="text-xs text-amber-400">{zaak.telefoon}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Type Zaak</p>
                  <p className="text-sm text-slate-200">{zaak.typeZaak}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Locatie</p>
                  <p className="text-sm text-slate-200">{zaak.locatie}</p>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 mb-4">
                <p className="text-xs text-slate-300 italic">"{zaak.toelichting}"</p>
              </div>

              <div className="flex justify-end gap-3">
                {zaak.status !== 'GEACCEPTEERD' ? (
                  <button 
                    onClick={() => handleAccept(zaak.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition"
                  >
                    Zaak Accepteren & Bellen
                  </button>
                ) : (
                  <span className="text-xs text-emerald-400 font-medium py-2">
                    ✓ Zaak door u geaccepteerd
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
