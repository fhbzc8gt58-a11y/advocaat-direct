'use client';

import React, { useState } from 'react';

export default function CompletePlatform() {
  const [currentView, setCurrentView] = useState('home');
  const [authRole, setAuthRole] = useState('client');
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [caseData, setCaseData] = useState({
    category: 'Strafrecht & Arresteringszaken',
    description: '',
    location: '',
    urgency: 'Direct / Spoed (Binnen 1 uur)',
  });
  const [caseSubmitted, setCaseSubmitted] = useState(false);

  const [reviewScore, setReviewScore] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      setRegisterSuccess(true);
    } else {
      if (authRole === 'client') {
        setCurrentView('client-dashboard');
      } else {
        setCurrentView('lawyer-dashboard');
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
      <header className="border-b border-blue-900/50 bg-[#0A1128]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <div 
          onClick={() => { setCurrentView('home'); setCaseSubmitted(false); }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <span className="bg-amber-400 text-slate-950 font-black px-2.5 py-1 rounded-lg text-sm tracking-wider shadow-md">24/7</span>
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
            <div className="bg-gradient-to-br from-[#101C44] to-[#0D1636] border border-blue-900/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
              
              {!caseSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-3">
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
                          placeholder="Bijv. Rotterdam"
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
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-3xl border border-amber-400/30">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Noodsignaal succesvol verzonden!</h2>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Advocaten gespecialiseerd in <strong className="text-white">{caseData.category}</strong> te <strong className="text-white">{caseData.location}</strong> hebben jouw melding ontvangen. Je wordt zo snel mogelijk gebeld of gecontacteerd.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={() => setCaseSubmitted(false)}
                      className="bg-blue-900/60 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-xl text-sm transition border border-blue-700/50"
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
          <div className="max-w-md mx-auto bg-[#101C44] border border-blue-900/60 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-white">
                {authMode === 'login' ? 'Inloggen op je Portaal' : 'Account Aanmaken'}
              </h2>
              <p className="text-slate-300 text-xs mt-1">
                {authMode === 'login' ? 'Beheer je lopende en afgehandelde zaken' : 'Geen e-mailverificatie vereist. Direct aan de slag!'}
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
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${authRole === 'client' ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#070D21] text-slate-300 border-blue-900'}`}
                    >
                      Cliënt / Burger
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole('lawyer')}
                      className={`py-2.5 rounded-xl text-xs font-bold transition border ${authRole === 'lawyer' ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-[#070D21] text-slate-300 border-blue-900'}`}
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
                      <a href="#wachtwoord" onClick={(e) => { e.preventDefault(); alert('Instructies om je wachtwoord te resetten zijn naar je verzonden (simulatie).'); }} className="text-xs text-amber-300 hover:underline">Wachtwoord vergeten?</a>
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

                <button 
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 rounded-xl transition shadow-lg shadow-amber-400/10 text-sm mt-2"
                >
                  {authMode === 'login' ? 'Inloggen' : 'Registreren & Direct Doorgaan'}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl border border-amber-400/30">
                  ✓
                </div>
                <p className="text-sm text-slate-200">Je account is succesvol aangemaakt! Klik hieronder om in te loggen op je dashboard.</p>
                <button 
                  onClick={() => { setAuthMode('login'); setRegisterSuccess(false); }}
                  className="w-full bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-sm"
                >
                  Nu Inloggen
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CLIËNT DASHBOARD */}
        {currentView === 'client-dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#101C44] border border-blue-900/65 rounded-3xl p-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Cliënt Portaal</span>
                <h2 className="text-2xl font-black text-white">Welkom terug</h2>
              </div>
              <button onClick={() => setCurrentView('home')} className="text-xs bg-blue-900/60 hover:bg-blue-900 px-4 py-2 rounded-xl text-white border border-blue-800">Uitloggen</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <span>📂 Lopende Zaken</span>
                </h3>
                <div className="bg-[#070D21] border border-amber-400/30 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-amber-400/10 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold">Gekoppeld & Actief</span>
                    <span className="text-slate-400">Vandaag</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Arbeidsconflict & Ontslag op staande voet</h4>
                  <p className="text-xs text-slate-300">Behandeld door: <strong className="text-white">Mr. J. de Vries (Advocaat)</strong></p>
                  <div className="pt-2 border-t border-blue-900/60 flex justify-between items-center">
                    <span className="text-xs text-amber-400">status: Dossier in behandeling</span>
                    <button onClick={() => alert('Open gezamenlijk portaal chat / informatie.')} className="text-xs bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg shadow">Open Portaal</button>
                  </div>
                </div>
              </div>

              <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-6 space-y-4">
                <h3 className="text-lg font-bold text-white">✅ Afgehandelde Zaken & Reviews</h3>
                <div className="bg-[#070D21] border border-blue-900/60 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-blue-950 text-slate-300 px-2.5 py-0.5 rounded-full border border-blue-900">Afgesloten</span>
                    <span className="text-slate-400">Vorige maand</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Verkeersovertreding / Snelheid</h4>
                  <p className="text-xs text-slate-300">Advocaat: Mr. A. Bakker</p>

                  {!reviewSubmitted ? (
                    <div className="pt-3 border-t border-blue-900/60 space-y-2">
                      <p className="text-xs font-semibold text-slate-300">Geef deze advocaat een cijfer:</p>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button 
                            key={num} 
                            onClick={() => setReviewScore(num)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold ${reviewScore >= num ? 'bg-amber-400 text-slate-950' : 'bg-blue-950 text-slate-300 border border-blue-900'}`}
                          >
                            {num}★
                          </button>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        placeholder="Korte review opmerking..." 
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full bg-[#101C44] border border-blue-900 rounded-lg px-3 py-2 text-xs text-slate-100"
                      />
                      <button 
                        onClick={() => setReviewSubmitted(true)}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold py-2 rounded-lg transition border border-blue-700/50"
                      >
                        Plaats Review & Cijfer
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-300 font-semibold pt-2">
                      ✓ Bedankt! Je review ({reviewScore} sterren) is succesvol geplaatst op het profiel van de advocaat.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ADVOCAAT DASHBOARD & PROFIEL BEHEER */}
        {currentView === 'lawyer-dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-6 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Advocaten Portaal</span>
                <h2 className="text-2xl font-black text-white">Mr. de Specialist</h2>
              </div>
              <button onClick={() => setCurrentView('home')} className="text-xs bg-blue-900/60 hover:bg-blue-900 px-4 py-2 rounded-xl text-white border border-blue-800">Uitloggen</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-6 space-y-4 md:col-span-1">
                <h3 className="text-base font-bold text-white">👤 Openbaar Profiel Beheer</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">Upload Profieldo / Foto</label>
                    <input type="file" className="w-full text-slate-300 bg-[#070D21] border border-blue-900 rounded-xl p-2 text-xs" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Vakgebied(en)</label>
                    <input type="text" defaultValue="Strafrecht, Arbeidsrecht" className="w-full bg-[#070D21] border border-blue-900 rounded-xl p-2.5 text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Ervaring (Hoe lang actief)</label>
                    <input type="text" defaultValue="12 jaar ervaring" className="w-full bg-[#070D21] border border-blue-900 rounded-xl p-2.5 text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Contactgegevens & E-mail</label>
                    <input type="email" defaultValue="advocaat@mijnadvocaat.online" className="w-full bg-[#070D21] border border-blue-900 rounded-xl p-2.5 text-slate-100" />
                  </div>
                  <button onClick={() => alert('Profiel succesvol opgeslagen en online gezet!')} className="w-full bg-amber-400 text-slate-950 font-bold py-2.5 rounded-xl shadow">Profiel Online Zetten</button>
                </div>
              </div>

              <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-6 space-y-4 md:col-span-2">
                <h3 className="text-base font-bold text-white">⚖️ Actieve Cliëntendossiers & Matches</h3>
                <div className="bg-[#070D21] border border-blue-900/60 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-amber-400/10 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold border border-amber-400/20">Spoedmelding</span>
                    <span className="text-slate-400">Rotterdam</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">Arbeidsconflict & Ontslag op staande voet</h4>
                  <p className="text-xs text-slate-300">Cliënt vraagt om directe juridische bemiddeling en telefonisch contact.</p>
                  <div className="flex space-x-2 pt-2">
                    <button onClick={() => alert('Verbinding gestart met cliënt.')} className="bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl shadow">Neem Zaak Aan & Open Portaal</button>
                    <button onClick={() => alert('Zaak overgeslagen.')} className="bg-blue-950 text-slate-200 text-xs px-4 py-2 rounded-xl border border-blue-900">Doorsturen</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. WIE ZIJN WIJ MENU */}
        {currentView === 'about' && (
          <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-black text-white">Wie zijn wij & Waar we voor staan</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              MijnAdvocaat.online is opgericht met een helder doel: juridische hulp direct, transparant en toegankelijk maken wanneer elke seconde telt. Geen langdurige wachttijden of onduidelijke tarieven, maar een directe match tussen cliënt en gespecialiseerde advocaat.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#070D21] p-5 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-amber-400 text-sm mb-1">⚡ 24/7 Bereikbaarheid</h4>
                <p className="text-xs text-slate-300">Spoedgevallen kennen geen kantoortijden. Onze advocaten staan paraat.</p>
              </div>
              <div className="bg-[#070D21] p-5 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-amber-400 text-sm mb-1">🤝 Eerlijke Matches</h4>
                <p className="text-xs text-slate-300">Altijd gekoppeld aan een specialist die past bij jouw specifieke rechtsgebied.</p>
              </div>
              <div className="bg-[#070D21] p-5 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-amber-400 text-sm mb-1">🔒 Veilig & Vertrouwd</h4>
                <p className="text-xs text-slate-300">Gezamenlijke beveiligde portalen waarin alle dossierinformatie centraal staat.</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. HELP & FAQ MENU */}
        {currentView === 'faq' && (
          <div className="bg-[#101C44] border border-blue-900/60 rounded-3xl p-8 space-y-6">
            <h2 className="text-3xl font-black text-white">Veelgestelde Vragen (FAQ)</h2>
            <div className="space-y-4 text-sm">
              <div className="bg-[#070D21] p-4 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-white mb-1">Moet ik ingelogd zijn om een spoedmelding te doen?</h4>
                <p className="text-xs text-slate-300">Nee, voor acute spoedgevallen kun je direct via de hoofdpagina een melding indienen zonder dat je vooraf een account hoeft aan te maken.</p>
              </div>
              <div className="bg-[#070D21] p-4 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-white mb-1">Hoe werkt het gezamenlijke portaal?</h4>
                <p className="text-xs text-slate-300">Zodra een advocaat je zaak aanneemt, ontstaat er een beveiligd gezamenlijk portaal waar jullie documenten, statussen en contactgegevens kunnen inzien.</p>
              </div>
              <div className="bg-[#070D21] p-4 rounded-2xl border border-blue-900/60">
                <h4 className="font-bold text-white mb-1">Kan ik een review achterlaten voor een advocaat?</h4>
                <p className="text-xs text-slate-300">Ja, zodra een zaak is afgehandeld kun je in je cliëntenportaal een cijfer en een beoordeling achterlaten die direct op het profiel van de advocaat wordt getoond.</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-blue-900/50 bg-[#070D21] px-6 py-6 text-center text-xs text-slate-400">
        &copy; 2026 MijnAdvocaat.online. Alle rechten voorbehouden. Direct verbonden met de juiste specialist.
      </footer>
    </div>
  );
}
