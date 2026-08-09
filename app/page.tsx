'use client';

import { useState } from 'react';

export default function Home() {
  const [view, setView] = useState('home');
  const [submitted, setSubmitted] = useState(false); 

  if (view === 'client') {
    return (
      <main className="min-h-screen bg-[#070b19] text-white p-6">
        <button onClick={() => setView('home')} className="text-gray-400 mb-6 hover:text-white">← Terug naar home</button>
        <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-4">Direct Juridische Hulp</h1>
          {submitted ? (
            <div className="bg-emerald-950 border border-emerald-800 text-emerald-200 p-4 rounded-xl">
              Je aanvraag is succesvol ingediend! Een beschikbare advocaat pakt dit direct op.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Jouw naam</label>
                <input required type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" placeholder="Volledige naam" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Omschrijf je zaak</label>
                <textarea required rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white" placeholder="Waar heb je direct hulp bij nodig?" />
              </div>
              <button type="submit" className="w-full bg-amber-500 text-slate-950 font-bold py-3 rounded-lg hover:bg-amber-400">Verstuur Aanvraag</button>
            </form>
          )}
        </div>
      </main>
    );
  }

  if (view === 'advocaat') {
    return (
      <main className="min-h-screen bg-[#070b19] text-white p-6">
        <button onClick={() => setView('home')} className="text-gray-400 mb-6 hover:text-white">← Terug naar home</button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Advocaten Dashboard - Spoedzaken</h1>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-2">Actieve cliënt aanvragen</h2>
            <div className="space-y-4">
              <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="font-bold">Spoedzitting Zeden / Strafrecht</p>
                  <p className="text-sm text-gray-400">Client: Anoniem — Ingediend net geleden</p>
                </div>
                <button onClick={() => alert('Zaak geaccepteerd!')} className="bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm font-bold">Accepteren</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b19] text-white flex flex-col justify-between p-6">
      <div className="max-w-xl mx-auto w-full pt-12 text-center">
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          Nu beschikbaar voor spoedzaken
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mt-6 mb-4">
          Als het erop aankomt, sta je er niet alleen voor.
        </h1>
        <p className="text-gray-400 mb-8">
          Snel een advocaat aan je zijde. Zonder zoekwerk, zonder drempels — gewoon duidelijk weten wat je nu kunt doen.
        </p>
        <div className="space-y-4">
          <button onClick={() => setView('client')} className="w-full bg-amber-500 text-slate-950 font-bold py-4 rounded-xl hover:bg-amber-400 transition">
            Ik heb juridische hulp nodig
          </button>
          <button onClick={() => setView('advocaat')} className="w-full bg-slate-900 border border-slate-800 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition">
            Ik ben advocaat
          </button>
        </div>
      </div>
      <footer className="text-center text-xs text-gray-500 pb-4">
        Vertrouwd door mensen in heel Nederland.
      </footer>
    </main>
  );
}
