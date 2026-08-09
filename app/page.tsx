'use client';

import { useState } from 'react';

type Submission = {
  id: string;
  type: 'client' | 'lawyer';
  name: string;
  email: string;
  phone?: string;
  legalArea: string;
  description: string;
  lawFirm?: string;
  novaNumber?: string;
  date: string;
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'client' | 'lawyer'>('client');
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [successMessage, setSuccessMessage] = useState('');

  // Centrale state om inzendingen tijdelijk op te slaan voor het dashboard
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      type: 'client',
      name: 'Jan de Vries',
      email: 'jan@voorbeeld.nl',
      phone: '0612345678',
      legalArea: 'Arbeidsrecht',
      description: 'Onterecht ontslag op staande voet na 5 jaar dienstverband.',
      date: '2026-06-06',
    },
    {
      id: '2',
      type: 'lawyer',
      name: 'Mr. A. Bakker',
      email: 'a.bakker@advocatenkantoor.nl',
      legalArea: 'Familierecht',
      description: 'Kantoor gespecialiseerd in complexe echtscheidingen.',
      lawFirm: 'Bakker & Partners',
      novaNumber: 'NL123456',
      date: '2026-06-06',
    },
  ]);

  // Formulier state cliënt
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    legalArea: 'Arbeidsrecht',
    description: '',
  });

  // Formulier state advocaat
  const [lawyerForm, setLawyerForm] = useState({
    name: '',
    email: '',
    lawFirm: '',
    novaNumber: '',
    legalArea: 'Arbeidsrecht',
    description: '',
  });

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: Submission = {
      id: Date.now().toString(),
      type: 'client',
      ...clientForm,
      date: new Date().toISOString().split('T')[0],
    };
    setSubmissions([newSub, ...submissions]);
    setSuccessMessage('Uw aanvraag is succesvol ingediend! Een advocaat neemt spoedig contact op.');
    setClientForm({ name: '', email: '', phone: '', legalArea: 'Arbeidsrecht', description: '' });
  };

  const handleLawyerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: Submission = {
      id: Date.now().toString(),
      type: 'lawyer',
      ...lawyerForm,
      date: new Date().toISOString().split('T')[0],
    };
    setSubmissions([newSub, ...submissions]);
    setSuccessMessage('Uw registratie is succesvol ontvangen en wordt geverifieerd.');
    setLawyerForm({ name: '', email: '', lawFirm: '', novaNumber: '', legalArea: 'Arbeidsrecht', description: '' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-[#FBBF24] selection:text-[#0F172A]">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-wider cursor-pointer" onClick={() => setCurrentView('home')}>
          Mijn<span className="text-[#FBBF24]">Advocaat</span>Direct
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#FBBF24] transition">Home</button>
          <button onClick={() => setCurrentView('dashboard')} className="hover:text-[#FBBF24] transition font-semibold text-[#FBBF24]">Dashboard Overzicht</button>
          <a href="#intake" className="bg-[#FBBF24] text-[#0F172A] px-4 py-2 rounded-lg font-semibold hover:bg-amber-400 transition">
            Start Aanvraag
          </a>
        </nav>
      </header>

      {/* Main Content / Routing */}
      {currentView === 'home' ? (
        <main>
          {/* Hero Section */}
          <section className="text-center py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Direct juridische bijstand, <span className="text-[#FBBF24]">zonder lange wachttijden.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Het betrouwbare platform dat cliënten direct koppelt aan gespecialiseerde advocaten. Snel, helder en resultaatgericht.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#intake" onClick={() => setActiveTab('client')} className="bg-[#FBBF24] text-[#0F172A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition shadow-lg">
                Ik heb juridische hulp nodig
              </a>
              <a href="#intake" onClick={() => setActiveTab('lawyer')} className="border-2 border-[#FBBF24] text-[#FBBF24] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#FBBF24]/10 transition">
                Ik ben advocaat
              </a>
            </div>
          </section>

          {/* Specialismen */}
          <section className="py-16 px-6 max-w-6xl mx-auto border-t border-slate-800">
            <h2 className="text-2xl font-bold text-center mb-12">Onze Belangrijkste Rechtsgebieden</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-[#FBBF24] transition">
                <h3 className="text-xl font-bold text-[#FBBF24] mb-3">Arbeidsrecht</h3>
                <p className="text-slate-400 text-sm">Ontslag, arbeidsconflict, loonvorderingen en concurrentiebedingen.</p>
              </div>
              <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-[#FBBF24] transition">
                <h3 className="text-xl font-bold text-[#FBBF24] mb-3">Familierecht</h3>
                <p className="text-slate-400 text-sm">Echtscheiding, omgangsregelingen, alimentatie en erfrecht.</p>
              </div>
              <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-800 hover:border-[#FBBF24] transition">
                <h3 className="text-xl font-bold text-[#FBBF24] mb-3">Contractenrecht</h3>
                <p className="text-slate-400 text-sm">Opstellen en beoordelen van overeenkomsten en geschillen.</p>
              </div>
            </div>
          </section>

          {/* Intake Sectie & Formulieren */}
          <section id="intake" className="py-20 px-6 max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-center mb-8">Direct Inschrijven of Aanvragen</h2>
              
              {/* Tab wissel knoppen */}
              <div className="flex border-b border-slate-800 mb-8">
                <button
                  onClick={() => { setActiveTab('client'); setSuccessMessage(''); }}
                  className={`flex-1 py-3 text-center font-semibold border-b-2 transition ${activeTab === 'client' ? 'border-[#FBBF24] text-[#FBBF24]' : 'border-transparent text-slate-400'}`}
                >
                  Cliënt (Juridische Hulp)
                </button>
                <button
                  onClick={() => { setActiveTab('lawyer'); setSuccessMessage(''); }}
                  className={`flex-1 py-3 text-center font-semibold border-b-2 transition ${activeTab === 'lawyer' ? 'border-[#FBBF24] text-[#FBBF24]' : 'border-transparent text-slate-400'}`}
                >
                  Advocaat (Aansluiten)
                </button>
              </div>

              {successMessage && (
                <div className="mb-6 bg-emerald-900/40 border border-emerald-500 text-emerald-200 p-4 rounded-xl text-center text-sm">
                  {successMessage}
                </div>
              )}

              {/* Formulier Cliënt */}
              {activeTab === 'client' ? (
                <form onSubmit={handleClientSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Volledige Naam</label>
                    <input
                      type="text"
                      required
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                      placeholder="Bijv. Jan de Vries"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">E-mailadres</label>
                      <input
                        type="email"
                        required
                        value={clientForm.email}
                        onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                        placeholder="naam@voorbeeld.nl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Telefoonnummer</label>
                      <input
                        type="tel"
                        required
                        value={clientForm.phone}
                        onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                        placeholder="0612345678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Rechtsgebied</label>
                    <select
                      value={clientForm.legalArea}
                      onChange={(e) => setClientForm({ ...clientForm, legalArea: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                    >
                      <option value="Arbeidsrecht">Arbeidsrecht</option>
                      <option value="Familierecht">Familierecht</option>
                      <option value="Contractenrecht">Contractenrecht</option>
                      <option value="Overig">Overig</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Korte Zaakomschrijving</label>
                    <textarea
                      rows={4}
                      required
                      value={clientForm.description}
                      onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                      placeholder="Beschrijf kort uw juridische situatie..."
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#FBBF24] text-[#0F172A] py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition">
                    Verstuur Aanvraag
                  </button>
                </form>
              ) : (
                /* Formulier Advocaat */
                <form onSubmit={handleLawyerSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Naam Advocaat</label>
                    <input
                      type="text"
                      required
                      value={lawyerForm.name}
                      onChange={(e) => setLawyerForm({ ...lawyerForm, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                      placeholder="Mr. J. Jansen"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Zakelijk E-mailadres</label>
                      <input
                        type="email"
                        required
                        value={lawyerForm.email}
                        onChange={(e) => setLawyerForm({ ...lawyerForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                        placeholder="kantoor@advocaat.nl"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Kantoornaam</label>
                      <input
                        type="text"
                        required
                        value={lawyerForm.lawFirm}
                        onChange={(e) => setLawyerForm({ ...lawyerForm, lawFirm: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                        placeholder="Jansen Advocatuur"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">NOvA Inschrijvingsnummer</label>
                      <input
                        type="text"
                        required
                        value={lawyerForm.novaNumber}
                        onChange={(e) => setLawyerForm({ ...lawyerForm, novaNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                        placeholder="C-123456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Specialisatie</label>
                      <select
                        value={lawyerForm.legalArea}
                        onChange={(e) => setLawyerForm({ ...lawyerForm, legalArea: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24]"
                      >
                        <option value="Arbeidsrecht">Arbeidsrecht</option>
                        <option value="Familierecht">Familierecht</option>
                        <option value="Contractenrecht">Contractenrecht</option>
                        <option value="Overig">Overig</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#FBBF24] text-[#0F172A] py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition">
                    Aansluiten als Advocaat
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      ) : (
        /* Dashboard / Admin Overzicht */
        <main className="py-12 px-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold">Centraal Dashboard Overzicht</h1>
            <button onClick={() => setCurrentView('home')} className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm transition">
              Terug naar Website
            </button>
          </div>
          <p className="text-slate-400 mb-8">Hieronder zie je de live binnengekomen aanvragen van cliënten en geregistreerde advocaten.</p>

          <div className="space-y-4">
            {submissions.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${item.type === 'client' ? 'bg-amber-500/20 text-[#FBBF24]' : 'bg-blue-500/20 text-blue-400'}`}>
                      {item.type === 'client' ? 'Cliënt Aanvraag' : 'Advocaat Registratie'}
                    </span>
                    <span className="text-slate-400 text-sm">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm text-slate-300 mt-1">
                    <strong>Rechtsgebied:</strong> {item.legalArea} {item.lawFirm ? `| <strong>Kantoor:</strong> ${item.lawFirm} (NOvA: ${item.novaNumber})` : ''}
                  </p>
                  <p className="text-slate-400 text-sm mt-2 bg-slate-950 p-3 rounded-lg border border-slate-800/60">
                    {item.description}
                  </p>
                </div>
                <div className="text-right">
                  <a href={`mailto:${item.email}`} className="inline-block bg-[#FBBF24] text-[#0F172A] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-amber-400 transition">
                    Contact E-mail
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} MijnAdvocaatDirect. Alle rechten voorbehouden.
      </footer>
    </div>
  );
}
