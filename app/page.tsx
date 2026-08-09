'use client';

import { useState } from 'react';

export default function Page() {
  const [view, setView] = useState<'home' | 'client' | 'lawyer'>('home');
  const [submitted, setSubmitted] = useState(false);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fcfcfd', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <span 
          onClick={() => { setView('home'); setSubmitted(false); }}
          style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.025em', color: '#0b132b', cursor: 'pointer' }}
        >
          advocaat<span style={{ color: '#b4923e' }}>direct</span>
        </span>
        <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '4px', backgroundColor: '#0b132b', color: '#ffffff', letterSpacing: '0.05em' }}>
          Direct juridisch advies
        </span>
      </div>

      {/* HOME VIEW */}
      {view === 'home' && (
        <div style={{ margin: 'auto 0', padding: '40px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#b4923e', backgroundColor: '#fdfbf7', padding: '6px 12px', borderRadius: '4px', border: '1px solid #e6dcbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#b4923e', display: 'inline-block' }}></span>
            Landelijke Juridische Spoedhulp
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', color: '#0b132b', letterSpacing: '-0.02em' }}>
            Als het erop aankomt, sta je er niet alleen voor.
          </h1>

          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Direct een ervaren advocaat aan je zijde. Zonder omslachtig zoekwerk of drempels — direct duidelijkheid over je juridische positie en te ondernemen stappen.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => setView('client')}
              style={{ width: '100%', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#ffffff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '16px' }}
            >
              Ik heb juridische hulp nodig
            </button>

            <button
              onClick={() => setView('lawyer')}
              style={{ width: '100%', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#0b132b', backgroundColor: '#ffffff', border: '2px solid #0b132b', cursor: 'pointer', fontSize: '16px' }}
            >
              Ik ben advocaat
            </button>
          </div>
        </div>
      )}

      {/* CLIENT DASHBOARD / INTAGE FORM */}
      {view === 'client' && (
        <div style={{ margin: 'auto 0', padding: '20px 0' }}>
          <button 
            onClick={() => { setView('home'); setSubmitted(false); }} 
            style={{ background: 'none', border: 'none', color: '#0b132b', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', padding: 0, fontSize: '14px' }}
          >
            ← Terug naar home
          </button>

          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0b132b', marginBottom: '8px' }}>
            Direct Juridische Hulp Aanvragen
          </h2>
          <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px' }}>
            Vul je gegevens in en een beschikbare advocaat neemt direct contact met je op.
          </p>

          {submitted ? (
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px', borderRadius: '8px', color: '#166534', textAlign: 'center' }}>
              <h3 style={{ fontWeight: '700', marginBottom: '8px' }}>Aanvraag succesvol verzonden!</h3>
              <p style={{ fontSize: '14px' }}>Een specialist in onze poule bekijkt je spoedzaak direct.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#0b132b' }}>Rechtsgebied</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}>
                  <option>Arbeidsrecht / Ontslag</option>
                  <option>Strafrecht (Spoed / Aanhouding)</option>
                  <option>Familierecht / Scheiding</option>
                  <option>Ondernemingsrecht</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#0b132b' }}>Korte omschrijving van uw zaak</label>
                <textarea rows={4} placeholder="Vertel kort wat er aan de hand is..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }} required></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#0b132b' }}>Telefoonnummer</label>
                <input type="tel" placeholder="06 12345678" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }} required />
              </div>

              <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '8px', fontWeight: '600', color: '#ffffff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', marginTop: '8px', fontSize: '16px' }}>
                Verstuur Spoedaanvraag
              </button>
            </form>
          )}
        </div>
      )}

      {/* LAWYER DASHBOARD */}
      {view === 'lawyer' && (
        <div style={{ margin: 'auto 0', padding: '20px 0' }}>
          <button 
            onClick={() => setView('home')} 
            style={{ background: 'none', border: 'none', color: '#0b132b', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', padding: 0, fontSize: '14px' }}
          >
            ← Terug naar home
          </button>

          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0b132b', marginBottom: '8px' }}>
            Advocaten Dashboard
          </h2>
          <p style={{ color: '#475569', fontSize: '14px', marginBottom: '24px' }}>
            Overzicht van actieve landelijke spoedaanvragen.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#fef2f2', color: '#991b1b', padding: '2px 8px', borderRadius: '4px' }}>Strafrecht</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Zojuist binnengekomen</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#0b132b', marginBottom: '8px' }}>Cliënt zoekt direct bijstand inzake inverzekeringstelling.</p>
              <button style={{ padding: '8px 16px', backgroundColor: '#0b132b', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Zaak Claimen
              </button>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#fefce8', color: '#854d0e', padding: '2px 8px', borderRadius: '4px' }}>Arbeidsrecht</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>12 min geleden</span>
              </div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#0b132b', marginBottom: '8px' }}>Onterechte op staande voet ontslagen medewerker.</p>
              <button style={{ padding: '8px 16px', backgroundColor: '#0b132b', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                Zaak Claimen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
        Vertrouwd door cliënten en advocaten in heel Nederland.
      </div>

    </main>
  );
}
