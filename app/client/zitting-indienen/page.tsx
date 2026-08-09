'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ZittingIndienen() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111827] p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <Link href="/" className="text-sm text-gray-500 hover:text-black mb-6 inline-block">
          ← Terug naar home
        </Link>

        <h1 className="text-2xl font-bold mb-2">Juridische hulp aanvragen</h1>
        <p className="text-gray-600 mb-6">Vul hieronder je gegevens en de situatie in, dan koppelen we je direct aan een beschikbare advocaat.</p>

        {submitted ? (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg">
            Bedankt! Je aanvraag is succesvol ingediend. Een advocaat neemt spoedig contact met je op.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Volledige naam</label>
              <input type="text" required className="w-full border rounded-lg p-2.5" placeholder="Jouw naam" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mailadres of Telefoonnummer</label>
              <input type="text" required className="w-full border rounded-lg p-2.5" placeholder="Jouw contactgegevens" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Korte omschrijving van je zaak</label>
              <textarea required rows={4} className="w-full border rounded-lg p-2.5" placeholder="Waar gaat het om?"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#111827] text-white font-medium py-3 rounded-lg hover:bg-black transition">
              Verstuur aanvraag
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
