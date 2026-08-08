'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ZittingIndienenPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    naam: '',
    telefoon: '',
    email: '',
    typeZaak: 'Aanhouding / Strafrecht',
    locatie: '',
    datumZitting: '',
    toelichting: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-slate-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <div className="mb-6">
          <Link href="/" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-2">
            ← Terug naar Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-400">Zitting Indienen</h1>
          <p className="text-slate-400 text-sm mt-1">
            Meld uw zaak of aanstaande zitting direct aan. Een beschikbare advocaat neemt zo snel mogelijk contact op.
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-6 rounded-xl text-center">
            <div className="text-4xl mb-2">✅</div>
            <h2 className="text-xl font-semibold mb-2">Aanvraag succesvol ontvangen!</h2>
            <p className="text-sm text-slate-300 mb-6">
              Bedankt {formData.naam}. We hebben je gegevens ontvangen. Een advocaat bekijkt direct jouw zaak.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Nog een melding indienen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Naam *</label>
              <input 
                type="text" 
                required
                value={formData.naam}
                onChange={(e) => setFormData({...formData, naam: e.target.value})}
                placeholder="Jan Jansen"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Telefoonnummer *</label>
                <input 
                  type="tel" 
                  required
                  value={formData.telefoon}
                  onChange={(e) => setFormData({...formData, telefoon: e.target.value})}
                  placeholder="06 12345678"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">E-mailadres *</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jan@voorbeeld.nl"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Type Zaak</label>
                <select 
                  value={formData.typeZaak}
                  onChange={(e) => setFormData({...formData, typeZaak: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400 text-white"
                >
                  <option value="Aanhouding / Strafrecht">Aanhouding / Strafrecht</option>
                  <option value="Verkeer / Rijbewijs ingevorderd">Verkeer / Rijbewijs ingevorderd</option>
                  <option value="Letselschade / Ongeval">Letselschade / Ongeval</option>
                  <option value="Overig Spoed">Overig Spoed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Locatie / Rechtbank</label>
                <input 
                  type="text" 
                  value={formData.locatie}
                  onChange={(e) => setFormData({...formData, locatie: e.target.value})}
                  placeholder="bv. Politiebureau Amsterdam Zuid"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Korte toelichting / Omschrijving</label>
              <textarea 
                rows={3}
                value={formData.toelichting}
                onChange={(e) => setFormData({...formData, toelichting: e.target.value})}
                placeholder="Geef hier kort aan wat er aan de hand is..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-amber-400 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg mt-2"
            >
              Direct Aanvraag Verzenden
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
