'use client';

import React, { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSpoedOproep = async (categorie: string) => {
    setLoading(true);
    alert(`Spoedmelding gestart voor: ${categorie}. We zoeken direct een beschikbare advocaat!`);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      {/* Header */}
      <header className="w-full max-w-md text-center py-4 border-b border-slate-800">
        <h1 className="text-2xl font-black tracking-wider text-amber-500 uppercase">MijnAdvocaatDirect</h1>
        <p className="text-xs text-slate-400 mt-1">Binnen 1 minuut rechtstreeks gekoppeld bij spoed</p>
      </header>

      {/* Grote Spoedknop */}
      <div className="w-full max-w-md flex-1 flex flex-col justify-center items-center my-6 space-y-6">
        <div className="text-center">
          <span className="inline-block bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 uppercase tracking-widest mb-2">
            🚨 Directe Spoedlijn
          </span>
          <h2 className="text-xl font-bold">In het verkeer, aangehouden of letsel?</h2>
          <p className="text-sm text-slate-400 mt-1">Klik op de spoedknop om direct doorverbonden te worden.</p>
        </div>

        <button
          onClick={() => handleSpoedOproep('Algemene Aanhouding')}
          disabled={loading}
          className="w-48 h-48 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-red-500 shadow-2xl shadow-red-600/50 border-4 border-red-400/30 flex flex-col items-center justify-center active:scale-95 transition-transform duration-150 relative overflow-hidden"
        >
          <span className="text-4xl mb-1">📞</span>
          <span className="text-xl font-black uppercase tracking-wider text-white">SPOED</span>
          <span className="text-[10px] font-semibold text-red-100 uppercase tracking-widest mt-1">BEL ADVOCAAT</span>
        </button>

        {/* Categorie Snelselectie */}
        <div className="w-full grid grid-cols-3 gap-2 pt-4">
          <button
            onClick={() => handleSpoedOproep('Aanhouding')}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center active:bg-slate-700"
          >
            <div className="text-xl mb-1">🚔</div>
            <div className="text-xs font-bold">Aanhouding</div>
          </button>
          
          <button
            onClick={() => handleSpoedOproep('Verkeersboete')}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center active:bg-slate-700"
          >
            <div className="text-xl mb-1">🚗</div>
            <div className="text-xs font-bold">Verkeer</div>
          </button>

          <button
            onClick={() => handleSpoedOproep('Letselschade')}
            className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center active:bg-slate-700"
          >
            <div className="text-xl mb-1">🏥</div>
            <div className="text-xs font-bold">Letsel</div>
          </button>
        </div>
      </div>

      {/* Portalen Navigatie */}
      <footer className="w-full max-w-md space-y-3 pt-4 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/client/zitting-indienen"
            className="bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-3 text-center text-xs font-semibold text-slate-300 block"
          >
            📋 Zitting Indienen (Cliënt)
          </a>
          <a
            href="/advocaat/dashboard"
            className="bg-amber-500/10 border border-amber-500/30 rounded-lg py-2.5 px-3 text-center text-xs font-semibold text-amber-400 block"
          >
            ⚖️ Advocaten Portaal
          </a>
        </div>
      </footer>
    </main>
  );
}
