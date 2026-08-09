'use client';

import React, { useState } from 'react';

export default function CompleteLegalPlatform() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'client-dash', 'lawyer-dash', 'about', 'faq'
  const [authRole, setAuthRole] = useState('client');
  const [authMode, setAuthMode] = useState('login');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const [caseData, setCaseData] = useState({
    category: 'Strafrecht & Arresteringszaken',
    description: '',
    location: '',
    urgency: 'Direct / Spoed (Binnen 1 uur)',
  });
  const [caseSubmitted, setCaseSubmitted] = useState(false);

  const [reviewScore, setReviewScore] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      setRegisterSuccess(true);
    } else {
      if (authRole === 'client') {
        setCurrentView('client-dash');
      } else {
        setCurrentView('lawyer-dash');
      }
    }
  };

  const handleCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* HEADER & NAVIGATIE */}
      <header className="border-b border-blue-950 bg-[#0A1128]/95 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-xl">
        <div 
          onClick={() => { setCurrentView('home'); setCaseSubmitted(false); }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg text-sm tracking-wider shadow-md group-hover:bg-amber-300 transition">24/7</span>
          <span className="font-extrabold text-lg tracking-tight text-white">MijnAdvocaat<span className="text-amber-400">.online</span></span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-200">
          <button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition">Spoedhulp & Match</button>
          <button onClick={() => setCurrentView('about')} className="hover:text-amber-400 transition">Wie zijn wij</button>
          <button onClick={() => setCurrentView('faq')} className="hover:text-amber-400 transition">Help & FAQ</button>
        </nav>

        <div className="flex items-center space-x-3 text-sm">
          <button 
            onClick={() => { setAuthMode('login'); setRegisterSuccess(false); setCurrentView('login'); }}
            className="text-slate-200 hover:text-white px-3 py-2 transition"
          >
            Inloggen
          </button>
          <button 
            onClick={() => { setAuthMode('register'); setRegisterSuccess(false); setCurrentView('login'); }}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-amber-400/20"
          >
            Registreren
          </button>
        </div>
      </header>

      {/* DYNAMISCHE PAGINA INHOUD */}
      <main className="max-w-4xl w-full mx-auto px-4 py-10 flex-grow">

        {/* 1. HOME / SPOED & MATCH SCHERM */}
        {currentView === 'home' && (
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-[#121F49] to-[#0F193C] border border-blue-900/70 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
              
              {!caseSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-3">
                      🚨 Directe Noodlijn (Geen registratie verplicht voor spoed)
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Direct een advocaat spreken bij nood of zaak</h1>
                    <p className="text-slate-300 text-sm md:text-base">Heb je direct juridische bijstand nodig? Vul je zaak in en ons systeem alarmeert direct de dichtstbijzijnde beschikbare specialist.</p>
                  </div>

                  <form onSubmit={handleCaseSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">Selecteer Rechtsgebied</label>
                      <select 
                        value={caseData.category}
                        onChange={(e) => setCaseData({...caseData, category: e.target.value})}
                        className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition"
                      >
                        <optgroup label="Strafrecht & Nood">
                          <option value="Strafrecht & Arresteringszaken">Strafrecht & Arresteringszaken</option>
                          <option value="Verkeersovertredingen & DUI">Verkeersovertredingen & DUI / Rijbewijs kwijt</option>
                          <option value="Jeugdstrafrecht">Jeugdstrafrecht</option>
                        </optgroup>
                        <optgroup label="Letselschade & Ongevallen">
                          <option value="Letselschade & Ongevallen">Letselschade na verkeers- of bedrijfsongeval</option>
                        </optgroup>
                        <optgroup label="Werk & Inkomen">
                          <option value="Arbeidsconflict & Ontslag op staande voet">Arbeidsconflict & Ontslag op staande voet</option>
                          <option value="UWV & Uitkeringen">UWV, Sociale Zekerheid & Bijstand</option>
                        </optgroup>
                        <optgroup label="Wonen & Familie">
                          <option value="Huurrecht & Uithuiszetting">Huurrecht & Dreigende Uithuiszetting</option>
                          <option value="Echtscheiding & Spoed Omgang">Echtscheiding & Spoed Omgang / Gezag</option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">Locatie / Plaats</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Bijv. Rotterdam of Amsterdam"
                          value={caseData.location}
                          onChange={(e) => setCaseData({...caseData, location: e.target.value})}
                          className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">Urgentie niveau</label>
                        <select 
                          value={caseData.urgency}
                          onChange={(e) => setCaseData({...caseData, urgency: e.target.value})}
                          className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition"
                        >
                          <option value="Direct / Spoed (Binnen 1 uur)">Direct / Spoed (Binnen 1 uur)</option>
                          <option value="Vandaag nog">Vandaag nog</option>
                          <option value="Binnen 24 uur">Binnen 24 uur</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">Korte omschrijving van de situatie</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Wat is er gebeurd en waarbij heb je direct hulp nodig?"
                        value={caseData.description}
                        onChange={(e) => setCaseData({...caseData, description: e.target.value})}
                        className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-4 rounded-xl shadow-xl shadow-amber-400/20 transition cursor-pointer text-base"
                    >
                      🚨 Activeer Directe Nood-Match met Advocaat
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-4xl border border-emerald-500/20 shadow-lg">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Noodsignaal succesvol verzonden!</h2>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Advocaten gespecialiseerd in <strong className="text-white">{caseData.category}</strong> te <strong className="text-white">{caseData.location}</strong> hebben jouw melding ontvangen. Je wordt zo snel mogelijk gecontacteerd.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => setCaseSubmitted(false)}
                      className="bg-blue-900/50 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl text-sm transition border border-blue-800"
                    >
                      Nog een melding maken
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. INLOGGEN & REGISTREREN SCHERM */}
        {currentView === 'login' && (
          <div className="max-w-md mx-auto bg-[#121F49] border border-blue-900/70 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Inloggen op je Portaal' : 'Account Aanmaken'}
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                {authMode === 'login' ? 'Beheer je lopende en afgehandelde zaken' : 'Direct aan de slag binnen jouw portaal!'}
              </p>
            </div>

            {!registerSuccess ? (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">Ik ben een:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAuthRole('client')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${authRole === 'client' ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#070D21] text-slate-300 border-blue-900/50'}`}
                    >
                      Cliënt / Burger
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole('lawyer')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${authRole === 'lawyer' ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#070D21] text-slate-300 border-blue-900/50'}`}
                    >
                      Advocaat / Specialist
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400/90 mb-2">E-mailadres</label>
                  <input 
                    type="email" 
                    required
                    placeholder="naam@voorbeeld.nl"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition text-sm"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-400/90">Wachtwoord</label>
                    {authMode === 'login' && (
                      <a href="#wachtwoord" onClick={(e) => { e.preventDefault(); alert('Wachtwoord resetinstructie verzonden.'); }} className="text-xs text-amber-400 hover:underline">Wachtwoord vergeten?</a>
                    )}
                  </div>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-[#070D21] border border-blue-900 rounded-xl px-4 py-3 text-slate-100 focus:border-amber-400 focus:outline-none transition text-sm"
                  />
                </div>

                <div className="flex text-xs space-x-2 text-slate-300 pt-1">
                  <span onClick={() => setAuthMode('login')} className={`cursor-pointer font-semibold ${authMode === 'login' ? 'text-amber-400 underline' : ''}`}>Inloggen</span>
                  <span>•</span>
                  <span onClick={() => setAuthMode('register')} className={`cursor-pointer font-semibold ${authMode === 'register' ? 'text-amber-400 underline' : ''}`}>Account aanmaken</span>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-400/20 text-sm mt-2"
                >
                  {authMode === 'login' ? 'Inloggen op Portaal' : 'Registreren'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <p className="text-emerald-400 font-bold text-sm">✓ Registratie succesvol!</p>
                <p className="text-xs text-slate-300">Je account is aangemaakt. Klik hieronder om direct in te loggen.</p>
                <button 
                  onClick={() => { setAuthMode('login'); setRegisterSuccess(false); }}
                  className="bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Naar Inlogscherm
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CLIËNT DASHBOARD */}
        {currentView === 'client-dash' && (
          <div className="bg-[#121F49] border border-blue-900/70 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-blue-900/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Cliënt Portaal</span>
                <h2 className="text-2xl font-black text-white">Mijn Zaken & Dossiers</h2>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-blue-950 hover:bg-blue-900 text-slate-200 border border-blue-800 text-xs px-4 py-2 rounded-xl transition font-medium"
              >
                Uitloggen
              </button>
            </div>

            <div className="bg-[#070D21] border border-blue-900/60 rounded-2xl p-5 space-y-3">
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">Lopende Zaak</span>
              <h3 className="font-bold text-base text-white">Arbeidsconflict & Ontslag op staande voet</h3>
              <p className="text-xs text-slate-300">Toegewezen Advocaat: <strong className="text-white">Mr. J. de Vries</strong></p>
              <button 
                onClick={() => alert('Gezamenlijk portaal & dossierbestand geopend.')}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-md"
              >
                Open Gezamenlijk Portaal & Chat
              </button>
            </div>

            <div className="bg-[#070D21] border border-blue-900/60 rounded-2xl p-5 space-y-3">
              <span className="bg-blue-950 text-slate-200 text-[10px] font-medium px-2.5 py-1 rounded-md border border-blue-800">Afgehandeld</span>
              <h3 className="font-bold text-base text-white">Verkeersovertreding</h3>
              <p className="text-xs text-slate-300">Toegewezen Advocaat: <strong className="text-white">Mr. A. Bakker</strong></p>
              
              {!reviewSubmitted ? (
                <div className="border-t border-blue-950 pt-3 mt-2 space-y-2">
                  <p className="text-xs text-slate-300">Beoordeel de service van je advocaat:</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewScore(star)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition ${reviewScore >= star ? 'bg-amber-400 text-slate-950' : 'bg-blue-950 text-slate-400'}`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setReviewSubmitted(true)}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition mt-1"
                  >
                    Plaats Review
                  </button>
                </div>
              ) : (
                <p className="text-xs text-emerald-400 font-semibold pt-1">✓ Je review van {reviewScore} sterren is succesvol geplaatst!</p>
              )}
            </div>
          </div>
        )}

        {/* 4. ADVOCAAT DASHBOARD */}
        {currentView === 'lawyer-dash' && (
          <div className="bg-[#121F49] border border-blue-900/70 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-blue-900/60 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Advocaten Portaal</span>
                <h2 className="text-2xl font-black text-white">Profiel & Nieuwe Zaken</h2>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-blue-950 hover:bg-blue-900 text-slate-200 border border-blue-800 text-xs px-4 py-2 rounded-xl transition font-medium"
              >
                Uitloggen
              </button>
            </div>

            <div className="bg-[#070D21] border border-blue-900/60 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-sm text-amber-400 uppercase tracking-wider">👤 Mijn Online Profiel Beheren</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <label className="block mb-1 text-slate-200 font-semibold">Profieldossier / Foto uploaden:</label>
                  <input type="file" className="block text-slate-400 text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-950 file:text-amber-400 hover:file:bg-blue-900 cursor-pointer" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-200 font-semibold">Vakgebied(en):</label>
                  <input type="text" defaultValue="Strafrecht & Letselschade" className="w-full bg-[#121F49] border border-blue-900 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="block mb-1 text-slate-200 font-semibold">Ervaring:</label>
                  <input type="text" defaultValue="12 jaar ervaring" className="w-full bg-[#121F49] border border-blue-900 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400" />
                </div>
                <button 
                  onClick={() => alert('Profiel met succes geupdate en online gezet!')}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl transition shadow-md mt-2 text-xs"
                >
                  Profiel Opslaan & Direct Online Zetten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. WIE ZIJN WIJ */}
        {currentView === 'about' && (
          <div className="bg-[#121F49] border border-blue-900/70 rounded-3xl p-8 shadow-2xl space-y-4">
            <h2 className="text-2xl font-black text-white">Wie zijn wij & Waar we voor staan</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              MijnAdvocaat.online brengt burgers en gespecialiseerde advocaten direct samen. Snel, helder en transparant, vooral wanneer elke seconde telt bij een juridisch spoedgeval of letselschade.
            </p>
          </div>
        )}

        {/* 6. HELP & FAQ */}
        {currentView === 'faq' && (
          <div className="bg-[#121F49] border border-blue-900/70 rounded-3xl p-8 shadow-2xl space-y-6">
            <h2 className="text-2xl font-black text-white">Veelgestelde Vragen</h2>
            <div className="space-y-4 text-sm">
              <div className="border-b border-blue-900/60 pb-3">
                <strong className="text-white block mb-1">Moet ik inloggen voor een spoedmelding of letselschade?</strong>
                <span className="text-slate-300 text-xs">Nee, je kunt direct via de startpagina een zaak indienen zonder verplichte registratie.</span>
              </div>
              <div className="border-b border-blue-900/60 pb-3">
                <strong className="text-white block mb-1">Hoe werkt de directe advocaat-match?</strong>
                <span className="text-slate-300 text-xs">Zodra je jouw zaak indient op de startpagina, worden beschikbare specialisten in jouw regio direct op de hoogte gebracht.</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-xs text-slate-400 border-t border-blue-950 bg-[#070D21]">
        &copy; 2026 MijnAdvocaat.online. Alle rechten voorbehouden.
      </footer>

    </div>
  );
}
