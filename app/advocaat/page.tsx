'use client';

import Link from 'next/link';

export default function AdvocaatPortal() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111827] p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <Link href="/" className="text-sm text-gray-500 hover:text-black mb-6 inline-block">
          ← Terug naar home
        </Link>

        <div className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full mb-4">
          VOOR ADVOCATEN
        </div>

        <h1 className="text-3xl font-bold mb-4">Ontvang direct gekwalificeerde spoedzaken</h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Sluit je aan bij het netwerk van AdvocaatDirect en ontvang direct meldingen van cliënten die per direct juridische bijstand nodig hebben. Geen ingewikkelde acquisitie, maar direct contact.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 space-y-3">
          <h3 className="font-semibold text-lg">Voordelen van aansluiten:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Directe koppeling met spoedzaken in jouw regio</li>
            <li>Vooraf geverifieerde cliënten</li>
            <li>Transparant en eenvoudig platform</li>
          </ul>
        </div>

        <button onClick={() => alert('Bedankt voor je interesse! Onze partner-coördinator neemt contact met je op.')} className="w-full bg-[#111827] text-white font-medium py-3.5 rounded-lg hover:bg-black transition">
          Aanmelden als advocaat
        </button>
      </div>
    </main>
  );
}
