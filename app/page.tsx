import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight text-[#0F172A]">advocaat<span className="text-emerald-700">direct</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium hidden sm:inline-block">
            NU BESCHIKBAAR VOOR SPOEDZAKEN
          </span>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3 py-1.5 rounded-full mb-6 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>NU BESCHIKBAAR VOOR SPOEDZAKEN</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif text-[#0F172A] leading-tight mb-6">
            Als het erop aankomt, sta je er niet alleen voor.
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Snel een advocaat aan je zijde. Zonder zoekwerk, zonder drempels — gewoon duidelijk weten wat je nu kunt doen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/intake" 
              className="bg-[#1E4033] hover:bg-[#163026] text-white px-6 py-4 rounded-xl font-medium flex items-center justify-between shadow-sm transition-all"
            >
              <span>Ik heb juridische hulp nodig</span>
              <span className="ml-4">&rarr;</span>
            </Link>
            
            <Link 
              href="/dashboard" 
              className="bg-white hover:bg-gray-50 text-[#1E4033] border border-gray-300 px-6 py-4 rounded-xl font-medium flex items-center justify-between transition-all"
            >
              <span>Ik ben advocaat</span>
              <span className="ml-4">&rarr;</span>
            </Link>
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>✓</span> Vertrouwd door mensen in heel Nederland &bull; 
            <span className="text-amber-500">★★★★★</span>
          </div>
        </div>

        <div className="bg-[#163026] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div>
            <div className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full mb-4">MATCH GEVONDEN</div>
            <h3 className="text-xl font-serif mb-2">JOUW ROUTE</h3>
            <p className="text-emerald-200 text-sm">Wat brengt je hier vandaag?</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mt-6 border border-white/10">
            <div className="text-xs text-emerald-300">Direct gekoppeld aan een specialist</div>
            <div className="font-semibold text-sm mt-1">Mr. M. van Dijk</div>
            <div className="text-xs text-gray-300">Strafrecht &bull; Amsterdam</div>
          </div>
        </div>
      </section>
    </main>
  );
}
