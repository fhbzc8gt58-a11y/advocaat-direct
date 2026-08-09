'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#111827]">
      <header className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight">advocaatdirect</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-amber-100 text-amber-800 font-medium px-3 py-1 rounded-full">
            NU BESCHIKBAAR VOOR SPOEDZAKEN
          </span>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>NU BESCHIKBAAR VOOR SPOEDZAKEN</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Als het erop aankomt, sta je er niet alleen voor.
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Snel een advocaat aan je zijde. Zonder zoekwerk, zonder drempels — gewoon duidelijk weten wat je nu kunt doen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/client/zitting-indienen" className="bg-[#111827] text-white font-medium px-6 py-3.5 rounded-lg text-center hover:bg-black transition">
                Ik heb juridische hulp nodig
              </Link>
              <Link href="/advocaat" className="border border-gray-300 text-[#111827] font-medium px-6 py-3.5 rounded-lg text-center hover:bg-gray-50 transition">
                Ik ben advocaat
              </Link>
            </div>
            
            <p className="text-xs text-gray-500 pt-2">
              Vertrouwd door mensen in heel Nederland •
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
