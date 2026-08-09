'use client';

import React, { useState } from 'react';

export default function CompleteLegalPlatform() {
  const [currentView, setCurrentView] = useState('home');
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
    <div style={{ backgroundColor: '#0A1128', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'sans-serif' }}>
      
      {/* HEADER & NAVIGATIE */}
      <header style={{ borderBottom: '1px solid #1E293B', backgroundColor: 'rgba(10, 17, 40, 0.95)', position: 'sticky', top: 0, zIndex: 50, padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div 
          onClick={() => { setCurrentView('home'); setCaseSubmitted(false); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <span style={{ backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 900, padding: '0.25rem 0.6rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>24/7</span>
          <span style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.025em', color: '#ffffff' }}>MijnAdvocaat<span style={{ color: '#FBBF24' }}>.online</span></span>
        </div>

        <nav style={{ display: 'none', gap: '1.5rem', fontSize: '0.875rem', fontWeight: 500, color: '#E2E8F0' }} className="md:flex">
          <button onClick={() => setCurrentView('home')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Spoedhulp & Match</button>
          <button onClick={() => setCurrentView('about')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Wie zijn wij</button>
          <button onClick={() => setCurrentView('faq')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>Help & FAQ</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
          <button 
            onClick={() => { setAuthMode('login'); setRegisterSuccess(false); setCurrentView('login'); }}
            style={{ background: 'none', border: 'none', color: '#E2E8F0', cursor: 'pointer', padding: '0.5rem' }}
          >
            Inloggen
          </button>
          <button 
            onClick={() => { setAuthMode('register'); setRegisterSuccess(false); setCurrentView('login'); }}
            style={{ backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}
          >
            Registreren
          </button>
        </div>
      </header>

      {/* DYNAMISCHE PAGINA INHOUD */}
      <main style={{ maxWidth: '56rem', width: '100%', margin: '0 auto', padding: '2.5rem 1rem', flexGrow: 1 }}>

        {/* 1. HOME / SPOED & MATCH SCHERM */}
        {currentView === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
              {!caseSubmitted ? (
                <>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#FCA5A5', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.375rem 0.75rem', borderRadius: '9999px', display: 'inline-block', marginBottom: '0.75rem' }}>
                      Directe Noodlijn (Geen registratie verplicht voor spoed)
                    </span>
                    <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.025em', marginBottom: '0.5rem', lineHeight: 1.2 }}>Direct een advocaat spreken bij nood of zaak</h1>
                    <p style={{ color: '#CBD5E1', fontSize: '1rem' }}>Heb je direct juridische bijstand nodig? Vul je zaak in en ons systeem alarmeert direct de dichtstbijzijnde beschikbare specialist.</p>
                  </div>

                  <form onSubmit={handleCaseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>Selecteer Rechtsgebied</label>
                      <select 
                        value={caseData.category}
                        onChange={(e) => setCaseData({...caseData, category: e.target.value})}
                        style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none' }}
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

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>Locatie / Plaats</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Bijv. Rotterdam of Amsterdam"
                          value={caseData.location}
                          onChange={(e) => setCaseData({...caseData, location: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>Urgentie niveau</label>
                        <select 
                          value={caseData.urgency}
                          onChange={(e) => setCaseData({...caseData, urgency: e.target.value})}
                          style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none' }}
                        >
                          <option value="Direct / Spoed (Binnen 1 uur)">Direct / Spoed (Binnen 1 uur)</option>
                          <option value="Vandaag nog">Vandaag nog</option>
                          <option value="Binnen 24 uur">Binnen 24 uur</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>Korte omschrijving van de situatie</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Wat is er gebeurd en waarbij heb je direct hulp nodig?"
                        value={caseData.description}
                        onChange={(e) => setCaseData({...caseData, description: e.target.value})}
                        style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none', resize: 'none' }}
                      />
                    </div>

                    <button 
                      type="submit"
                      style={{ width: '100%', backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 800, padding: '1rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(251, 191, 36, 0.2)' }}
                    >
                      Activeer Directe Nood-Match met Advocaat
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ width: '5rem', height: '5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34D399', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '2rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    ✓
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff' }}>Noodsignaal succesvol verzonden!</h2>
                    <p style={{ color: '#CBD5E1', fontSize: '0.875rem', maxWidth: '28rem', margin: '0 auto' }}>
                      Advocaten gespecialiseerd in <strong style={{ color: '#ffffff' }}>{caseData.category}</strong> te <strong style={{ color: '#ffffff' }}>{caseData.location}</strong> hebben jouw melding ontvangen. Je wordt zo snel mogelijk gecontacteerd.
                    </p>
                  </div>
                  <div>
                    <button 
                      onClick={() => setCaseSubmitted(false)}
                      style={{ backgroundColor: '#1E3A8A', color: '#ffffff', fontWeight: 600, padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.875rem', border: '1px solid #1D4ED8', cursor: 'pointer' }}
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
          <div style={{ maxWidth: '28rem', margin: '0 auto', backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>
                {authMode === 'login' ? 'Inloggen op je Portaal' : 'Account Aanmaken'}
              </h2>
              <p style={{ color: '#CBD5E1', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {authMode === 'login' ? 'Beheer je lopende en afgehandelde zaken' : 'Direct aan de slag binnen jouw portaal!'}
              </p>
            </div>

            {!registerSuccess ? (
              <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>Ik ben een:</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setAuthRole('client')}
                      style={{ padding: '0.625rem', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', backgroundColor: authRole === 'client' ? '#FBBF24' : '#070D21', color: authRole === 'client' ? '#0A1128' : '#CBD5E1', border: authRole === 'client' ? '1px solid #FBBF24' : '1px solid #1E3A8A' }}
                    >
                      Cliënt / Burger
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthRole('lawyer')}
                      style={{ padding: '0.625rem', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', backgroundColor: authRole === 'lawyer' ? '#FBBF24' : '#070D21', color: authRole === 'lawyer' ? '#0A1128' : '#CBD5E1', border: authRole === 'lawyer' ? '1px solid #FBBF24' : '1px solid #1E3A8A' }}
                    >
                      Advocaat / Specialist
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24', marginBottom: '0.5rem' }}>E-mailadres</label>
                  <input 
                    type="email" 
                    required
                    placeholder="naam@voorbeeld.nl"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none', fontSize: '0.875rem' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FBBF24' }}>Wachtwoord</label>
                    {authMode === 'login' && (
                      <a href="#wachtwoord" onClick={(e) => { e.preventDefault(); alert('Wachtwoord resetinstructie verzonden.'); }} style={{ fontSize: '0.75rem', color: '#FBBF24', textDecoration: 'none' }}>Wachtwoord vergeten?</a>
                    )}
                  </div>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    style={{ width: '100%', backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#F8FAFC', outline: 'none', fontSize: '0.875rem' }}
                  />
                </div>

                <div style={{ display: 'flex', fontSize: '0.75rem', gap: '0.5rem', color: '#CBD5E1', paddingTop: '0.25rem' }}>
                  <span onClick={() => setAuthMode('login')} style={{ cursor: 'pointer', fontWeight: 600, color: authMode === 'login' ? '#FBBF24' : 'inherit', textDecoration: authMode === 'login' ? 'underline' : 'none' }}>Inloggen</span>
                  <span>•</span>
                  <span onClick={() => setAuthMode('register')} style={{ cursor: 'pointer', fontWeight: 600, color: authMode === 'register' ? '#FBBF24' : 'inherit', textDecoration: authMode === 'register' ? 'underline' : 'none' }}>Account aanmaken</span>
                </div>

                <button 
                  type="submit"
                  style={{ width: '100%', backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 'bold', padding: '0.875rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontSize: '0.875rem', marginTop: '0.5rem', boxShadow: '0 10px 15px -3px rgba(251, 191, 36, 0.2)' }}
                >
                  {authMode === 'login' ? 'Inloggen op Portaal' : 'Registreren'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: '#34D399', fontWeight: 'bold', fontSize: '0.875rem' }}>Registratie succesvol!</p>
                <p style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Je account is aangemaakt. Klik hieronder om direct in te loggen.</p>
                <button 
                  onClick={() => { setAuthMode('login'); setRegisterSuccess(false); }}
                  style={{ backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 'bold', padding: '0.625rem 1.5rem', borderRadius: '0.75rem', fontSize: '0.75rem', border: 'none', cursor: 'pointer', margin: '0 auto' }}
                >
                  Naar Inlogscherm
                </button>
              </div>
            )}
          </div>
        )}

        {/* 3. CLIËNT DASHBOARD */}
        {currentView === 'client-dash' && (
          <div style={{ backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(30, 58, 138, 0.6)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliënt Portaal</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Mijn Zaken & Dossiers</h2>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                style={{ backgroundColor: '#0F172A', color: '#CBD5E1', border: '1px solid #1E3A8A', fontSize: '0.75rem', padding: '0.5rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 500 }}
              >
                Uitloggen
              </button>
            </div>

            <div style={{ backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '1rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#FBBF24', border: '1px solid rgba(251, 191, 36, 0.2)', fontSize: '0.625rem', fontWeight: 'bold', padding: '0.25rem 0.6rem', borderRadius: '0.375rem', textTransform: 'uppercase', width: 'fit-content' }}>Lopende Zaak</span>
              <h3 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#ffffff' }}>Arbeidsconflict & Ontslag op staande voet</h3>
              <p style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Toegewezen Advocaat: <strong style={{ color: '#ffffff' }}>Mr. J. de Vries</strong></p>
              <button 
                onClick={() => alert('Gezamenlijk portaal & dossierbestand geopend.')}
                style={{ backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '0.75rem', fontSize: '0.75rem', border: 'none', cursor: 'pointer', width: 'fit-content' }}
              >
                Open Gezamenlijk Portaal & Chat
              </button>
            </div>

            <div style={{ backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '1rem', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ backgroundColor: '#0F172A', color: '#CBD5E1', fontSize: '0.625rem', fontWeight: 500, padding: '0.25rem 0.6rem', borderRadius: '0.375rem', border: '1px solid #1E3A8A', width: 'fit-content' }}>Afgehandeld</span>
              <h3 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#ffffff' }}>Verkeersovertreding</h3>
              <p style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Toegewezen Advocaat: <strong style={{ color: '#ffffff' }}>Mr. A. Bakker</strong></p>
              
              {!reviewSubmitted ? (
                <div style={{ borderTop: '1px solid #1E293B', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>Beoordeel de service van je advocaat:</p>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewScore(star)}
                        style={{ width: '1.75rem', height: '1.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', backgroundColor: reviewScore >= star ? '#FBBF24' : '#0F172A', color: reviewScore >= star ? '#0A1128' : '#94A3B8', border: 'none' }}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setReviewSubmitted(true)}
                    style={{ backgroundColor: '#1E3A8A', color: '#ffffff', fontWeight: 600, padding: '0.375rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', border: 'none', cursor: 'pointer', width: 'fit-content', marginTop: '0.25rem' }}
                  >
                    Plaats Review
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '0.75rem', color: '#34D399', fontWeight: 600, paddingTop: '0.25rem' }}>Je review van {reviewScore} sterren is succesvol geplaatst!</p>
              )}
            </div>
          </div>
        )}

        {/* 4. ADVOCAAT DASHBOARD */}
        {currentView === 'lawyer-dash' && (
          <div style={{ backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(30, 58, 138, 0.6)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Advocaten Portaal</span>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Profiel & Nieuwe Zaken</h2>
              </div>
              <button 
                onClick={() => setCurrentView('home')}
                style={{ backgroundColor: '#0F172A', color: '#CBD5E1', border: '1px solid #1E3A8A', fontSize: '0.75rem', padding: '0.5rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 500 }}
              >
                Uitloggen
              </button>
            </div>

            <div style={{ backgroundColor: '#070D21', border: '1px solid #1E3A8A', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#FBBF24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mijn Online Profiel Beheren</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem', color: '#CBD5E1' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: '#F8FAFC', fontWeight: 600 }}>Profieldossier / Foto uploaden:</label>
                  <input type="file" style={{ display: 'block', color: '#94A3B8', fontSize: '0.75rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: '#F8FAFC', fontWeight: 600 }}>Vakgebied(en):</label>
                  <input type="text" defaultValue="Strafrecht & Letselschade" style={{ width: '100%', backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.625rem 0.875rem', color: '#ffffff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.25rem', color: '#F8FAFC', fontWeight: 600 }}>Ervaring:</label>
                  <input type="text" defaultValue="12 jaar ervaring" style={{ width: '100%', backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '0.75rem', padding: '0.625rem 0.875rem', color: '#ffffff', outline: 'none' }} />
                </div>
                <button 
                  onClick={() => alert('Profiel met succes geupdate en online gezet!')}
                  style={{ width: '100%', backgroundColor: '#FBBF24', color: '#0A1128', fontWeight: 'bold', padding: '0.75rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.75rem' }}
                >
                  Profiel Opslaan & Direct Online Zetten
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. WIE ZIJN WIJ */}
        {currentView === 'about' && (
          <div style={{ backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Wie zijn wij & Waar we voor staan</h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.875rem', lineHeight: 1.6 }}>
              MijnAdvocaat.online brengt burgers en gespecialiseerde advocaten direct samen. Snel, helder en transparant, vooral wanneer elke seconde telt bij een juridisch spoedgeval of letselschade.
            </p>
          </div>
        )}

        {/* 6. HELP & FAQ */}
        {currentView === 'faq' && (
          <div style={{ backgroundColor: '#121F49', border: '1px solid #1E3A8A', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff' }}>Veelgestelde Vragen</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <div style={{ borderBottom: '1px solid rgba(30, 58, 138, 0.6)', paddingBottom: '0.75rem' }}>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>Moet ik inloggen voor een spoedmelding of letselschade?</strong>
                <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Nee, je kunt direct via de startpagina een zaak indienen zonder verplichte registratie.</span>
              </div>
              <div style={{ borderBottom: '1px solid rgba(30, 58, 138, 0.6)', paddingBottom: '0.75rem' }}>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>Hoe werkt de directe advocaat-match?</strong>
                <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Zodra je jouw zaak indient op de startpagina, worden beschikbare specialisten in jouw regio direct op de hoogte gebracht.</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.75rem', color: '#94A3B8', borderTop: '1px solid #1E293B', backgroundColor: '#070D21' }}>
        &copy; 2026 MijnAdvocaat.online. Alle rechten voorbehouden.
      </footer>

    </div>
  );
}
