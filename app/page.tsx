'use client';

import React, { useState } from 'react';

export default function CompleteLegalPlatform() {
  const [tab, setTab] = useState('home'); // 'home', 'login', 'client-dash', 'lawyer-dash', 'about', 'faq'
  const [authRole, setAuthRole] = useState('client');
  const [authMode, setAuthMode] = useState('login');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Form states voor spoed
  const [category, setCategory] = useState('Strafrecht & Arresteringszaken');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [caseSubmitted, setCaseSubmitted] = useState(false);

  // Review state
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  return (
    <div style={{ backgroundColor: '#070F2B', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#0A174E', borderBottom: '1px solid #1B2A6C', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div onClick={() => { setTab('home'); setCaseSubmitted(false); }} style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
          MijnAdvocaat<span style={{ color: '#F4D160' }}>.online</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={() => setTab('home')} style={{ background: 'transparent', border: 'none', color: tab === 'home' ? '#F4D160' : '#FFF', cursor: 'pointer', fontSize: '14px' }}>Spoed & Match</button>
          <button onClick={() => setTab('about')} style={{ background: 'transparent', border: 'none', color: tab === 'about' ? '#F4D160' : '#FFF', cursor: 'pointer', fontSize: '14px' }}>Wie zijn wij</button>
          <button onClick={() => setTab('faq')} style={{ background: 'transparent', border: 'none', color: tab === 'faq' ? '#F4D160' : '#FFF', cursor: 'pointer', fontSize: '14px' }}>Help</button>
          <button onClick={() => { setAuthMode('login'); setRegisterSuccess(false); setTab('login'); }} style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Inloggen</button>
        </div>
      </header>

      {/* BODY */}
      <main style={{ maxWidth: '650px', width: '100%', margin: '0 auto', padding: '32px 16px', flexGrow: 1 }}>

        {/* 1. HOME & SPOED (Geen inlog verplicht) */}
        {tab === 'home' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
            {!caseSubmitted ? (
              <div>
                <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block', marginBottom: '12px' }}>
                  🚨 24/7 Noodlijn (Direct bereikbaar zonder inlog)
                </span>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>Direct een advocaat spreken bij nood</h1>
                <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '20px' }}>Selecteer hieronder je rechtsgebied. Onze specialisten worden direct gealarmeerd.</p>

                <form onSubmit={(e) => { e.preventDefault(); setCaseSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#F4D160', marginBottom: '6px' }}>UITGEBREID RECHTSGEBIED</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#070F2B', color: '#FFF', border: '1px solid #1B2A6C', boxSizing: 'border-box' }}>
                      <optgroup label="Strafrecht & Nood">
                        <option value="Strafrecht & Arresteringszaken">Strafrecht & Arresteringszaken</option>
                        <option value="Verkeersovertredingen & DUI">Verkeersovertredingen & Rijbewijs kwijt</option>
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

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#F4D160', marginBottom: '6px' }}>LOCATIE / PLAATS</label>
                    <input type="text" required placeholder="Bijv. Rotterdam of Amsterdam" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#070F2B', color: '#FFF', border: '1px solid #1B2A6C', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#F4D160', marginBottom: '6px' }}>KORTE OMSCHRIJVING</label>
                    <textarea rows={3} required placeholder="Wat is er gebeurd?" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', backgroundColor: '#070F2B', color: '#FFF', border: '1px solid #1B2A6C', boxSizing: 'border-box' }} />
                  </div>

                  <button type="submit" style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '6px' }}>
                    🚨 Activeer Directe Nood-Match met Advocaat
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>Noodsignaal Verzonden!</h2>
                <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '24px' }}>Advocaten voor {category} in {location} zijn direct ingeschakeld om contact met je op te nemen.</p>
                <button onClick={() => setCaseSubmitted(false)} style={{ backgroundColor: '#1B2A6C', color: '#FFF', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Nieuwe melding</button>
              </div>
            )}
          </div>
        )}

        {/* 2. INLOGGEN & REGISTREREN */}
        {tab === 'login' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Inloggen / Registreren</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button onClick={() => setAuthRole('client')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: authRole === 'client' ? '#F4D160' : '#070F2B', color: authRole === 'client' ? '#070F2B' : '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>Cliënt</button>
              <button onClick={() => setAuthRole('lawyer')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: authRole === 'lawyer' ? '#F4D160' : '#070F2B', color: authRole === 'lawyer' ? '#070F2B' : '#FFF', fontWeight: 'bold', cursor: 'pointer' }}>Advocaat</button>
            </div>

            {!registerSuccess ? (
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                if (authMode === 'register') {
                  setRegisterSuccess(true);
                } else {
                  if (authRole === 'client') setTab('client-dash');
                  else setTab('lawyer-dash');
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                <div style={{ display: 'flex', gap: '10px', marginBottom: '6px', fontSize: '13px' }}>
                  <span onClick={() => setAuthMode('login')} style={{ cursor: 'pointer', fontWeight: authMode === 'login' ? 'bold' : 'normal', color: authMode === 'login' ? '#F4D160' : '#94A3B8' }}>Inloggen</span>
                  <span>|</span>
                  <span onClick={() => setAuthMode('register')} style={{ cursor: 'pointer', fontWeight: authMode === 'register' ? 'bold' : 'normal', color: authMode === 'register' ? '#F4D160' : '#94A3B8' }}>Registreren</span>
                </div>

                <input type="email" required placeholder="E-mailadres" style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#070F2B', color: '#FFF', border: '1px solid #1B2A6C' }} />
                <input type="password" required placeholder="Wachtwoord" style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#070F2B', color: '#FFF', border: '1px solid #1B2A6C' }} />
                
                {authMode === 'login' && (
                  <div style={{ textAlign: 'right' }}>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Wachtwoord resetinstructie verzonden.'); }} style={{ fontSize: '11px', color: '#F4D160', textDecoration: 'none' }}>Wachtwoord vergeten?</a>
                  </div>
                )}

                <button type="submit" style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                  {authMode === 'login' ? 'Inloggen op Portaal' : 'Account Aanmaken'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ color: '#4ADE80', fontWeight: 'bold', margin: 0 }}>✓ Registratie succesvol!</p>
                <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>Klik hieronder om direct in te loggen op je dashboard.</p>
                <button onClick={() => { setAuthMode('login'); setRegisterSuccess(false); }} style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Naar Inlogscherm</button>
              </div>
            )}
          </div>
        )}

        {/* 3. CLIËNT DASHBOARD */}
        {tab === 'client-dash' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#F4D160', fontWeight: 'bold' }}>CLIËNT PORTAAL</span>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Mijn Zaken</h2>
              </div>
              <button onClick={() => setTab('home')} style={{ backgroundColor: '#1B2A6C', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Uitloggen</button>
            </div>

            {/* Lopende zaak */}
            <div style={{ backgroundColor: '#070F2B', border: '1px solid #1B2A6C', borderRadius: '14px', padding: '16px' }}>
              <span style={{ backgroundColor: 'rgba(244, 209, 96, 0.15)', color: '#F4D160', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>Lopende Zaak</span>
              <h4 style={{ margin: '8px 0 4px 0', fontSize: '15px' }}>Arbeidsconflict & Ontslag op staande voet</h4>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0' }}>Advocaat: Mr. J. de Vries</p>
              <button onClick={() => alert('Gezamenlijk dossier & chat geopend.')} style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Open Gezamenlijk Portaal</button>
            </div>

            {/* Afgehandelde zaak & Review */}
            <div style={{ backgroundColor: '#070F2B', border: '1px solid #1B2A6C', borderRadius: '14px', padding: '16px' }}>
              <span style={{ backgroundColor: '#1B2A6C', color: '#FFF', padding: '2px 8px', borderRadius: '6px', fontSize: '11px' }}>Afgehandeld</span>
              <h4 style={{ margin: '8px 0 4px 0', fontSize: '15px' }}>Verkeersovertreding</h4>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '0 0 10px 0' }}>Advocaat: Mr. A. Bakker</p>
              
              {!reviewSubmitted ? (
                <div style={{ borderTop: '1px solid #1B2A6C', paddingTop: '10px' }}>
                  <p style={{ fontSize: '12px', marginBottom: '6px' }}>Geef deze advocaat een cijfer:</p>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button key={n} onClick={() => setReviewScore(n)} style={{ background: reviewScore >= n ? '#F4D160' : '#1B2A6C', color: reviewScore >= n ? '#070F2B' : '#FFF', border: 'none', width: '28px', height: '28px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>{n}★</button>
                    ))}
                  </div>
                  <button onClick={() => setReviewSubmitted(true)} style={{ backgroundColor: '#1B2A6C', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>Plaats Review</button>
                </div>
              ) : (
                <p style={{ fontSize: '12px', color: '#4ADE80', margin: 0 }}>✓ Review ({reviewScore} sterren) geplaatst op profiel!</p>
              )}
            </div>
          </div>
        )}

        {/* 4. ADVOCAAT DASHBOARD */}
        {tab === 'lawyer-dash' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#F4D160', fontWeight: 'bold' }}>ADVOCATEN PORTAAL</span>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Profiel & Zaken</h2>
              </div>
              <button onClick={() => setTab('home')} style={{ backgroundColor: '#1B2A6C', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>Uitloggen</button>
            </div>

            <div style={{ backgroundColor: '#070F2B', border: '1px solid #1B2A6C', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#F4D160', margin: 0 }}>👤 Mijn Online Profiel Beheren</h3>
              <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label>Profieldossier / Foto uploaden: <input type="file" style={{ display: 'block', marginTop: '4px' }} /></label>
                <label>Vakgebied(en): <input type="text" defaultValue="Strafrecht & Arbeidsrecht" style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0A174E', border: '1px solid #1B2A6C', color: '#FFF', marginTop: '4px' }} /></label>
                <label>Ervaring (Hoe lang actief): <input type="text" defaultValue="10 jaar ervaring" style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0A174E', border: '1px solid #1B2A6C', color: '#FFF', marginTop: '4px' }} /></label>
                <label>E-mail & Contactgegevens: <input type="email" defaultValue="mr.advocaat@mijnadvocaat.online" style={{ width: '100%', padding: '8px', borderRadius: '6px', backgroundColor: '#0A174E', border: '1px solid #1B2A6C', color: '#FFF', marginTop: '4px' }} /></label>
                <button onClick={() => alert('Profiel succesvol online gezet!')} style={{ backgroundColor: '#F4D160', color: '#070F2B', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '4px' }}>Profiel Opslaan & Online zetten</button>
              </div>
            </div>
          </div>
        )}

        {/* 5. WIE ZIJN WIJ */}
        {tab === 'about' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>Wie zijn wij & Waar we voor staan</h2>
            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6' }}>MijnAdvocaat.online brengt burgers en gespecialiseerde advocaten direct samen. Snel, helder en transparant, vooral wanneer elke seconde telt bij een juridisch spoedgeval.</p>
          </div>
        )}

        {/* 6. HELP & FAQ */}
        {tab === 'faq' && (
          <div style={{ backgroundColor: '#0A174E', border: '1px solid #1B2A6C', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px' }}>Veelgestelde Vragen</h2>
            <div style={{ fontSize: '13px', borderBottom: '1px solid #1B2A6C', paddingBottom: '8px' }}>
              <strong>Moet ik inloggen voor een spoedmelding?</strong><br /><span style={{ color: '#94A3B8' }}>Nee, je kunt direct via de startpagina een zaak indienen zonder account.</span>
            </div>
            <div style={{ fontSize: '13px', borderBottom: '1px solid #1B2A6C', paddingBottom: '8px' }}>
              <strong>Hoe werkt het gezamenlijke portaal?</strong><br /><span style={{ color: '#94A3B8' }}>Zodra een advocaat je zaak aanneemt, kun je via je cliëntenportaal direct dossierinformatie inzien.</span>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '20px', fontSize: '12px', color: '#94A3B8', borderTop: '1px solid #1B2A6C' }}>
        &copy; 2026 MijnAdvocaat.online. Alle rechten voorbehouden.
      </footer>

    </div>
  );
}
