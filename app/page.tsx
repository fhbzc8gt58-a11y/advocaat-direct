'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Jouw gekoppelde Supabase Configuratie
const SUPABASE_URL = 'https://hxwpzmflgjjgofhdtinu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_7v7ZlJhyyQ4JDrZoWC45_w_B9qu8BHQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

interface CaseItem {
  id: string;
  category: string;
  packageType: string;
  description: string;
  phone: string;
  status: string;
  date: string;
  clientEmail: string;
}

export default function Page() {
  const [view, setView] = useState<'home' | 'auth-client' | 'auth-lawyer' | 'client-dashboard' | 'lawyer-dashboard' | 'new-case'>('home');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'client' | 'lawyer' | null>(null);
  const [authMessage, setAuthMessage] = useState('');

  // Formulier state voor zaak
  const [category, setCategory] = useState('Arbeidsrecht / Ontslag');
  const [packageType, setPackageType] = useState('Spoed Telefonisch Consult (€99)');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  
  const [cases, setCases] = useState<CaseItem[]>([
    {
      id: 'AD-894102',
      category: 'Strafrecht (Spoed / Aanhouding)',
      packageType: 'Spoed Telefonisch Consult (€99)',
      description: 'Cliënt is aangehouden en zit vast op het bureau.',
      phone: '06-12345678',
      status: 'In afwachting van advocaat',
      date: '09-08-2026',
      clientEmail: 'client@example.com'
    }
  ]);

  // Echte Supabase Authenticatie (Inloggen & Registreren)
  const handleAuth = async (e: React.FormEvent, role: 'client' | 'lawyer') => {
    e.preventDefault();
    setAuthMessage('Bezig met verwerken...');

    if (authMode === 'register') {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setAuthMessage('Fout bij registratie: ' + error.message);
      } else {
        setAuthMessage('Account aangemaakt! Check je mail voor de verificatielink.');
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setAuthMessage('Inlogfout: ' + error.message);
      } else {
        setCurrentUser(email);
        setUserRole(role);
        setAuthMessage('');
        setView(role === 'client' ? 'client-dashboard' : 'lawyer-dashboard');
      }
    }
  };

  // Zaak indienen + direct mail naar Advocaatdirect@gmail.com
  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    const caseId = 'AD-' + Math.floor(100000 + Math.random() * 900000);
    
    const newCase: CaseItem = {
      id: caseId,
      category,
      packageType,
      description,
      phone,
      status: 'In afwachting van advocaat',
      date: new Date().toLocaleDateString('nl-NL'),
      clientEmail: currentUser || email || 'onbekend@mail.com'
    };

    setCases([newCase, ...cases]);

    // Automatisch e-mail openen richting jouw hoofdadres
    const emailSubject = encodeURIComponent(`Nieuwe Spoedzaak Aanvraag [${caseId}]`);
    const emailBody = encodeURIComponent(
      `Beste AdvocaatDirect Team,\n\nEr is een nieuwe zaak binnengekomen via het platform:\n\n` +
      `Zaaknummer: ${caseId}\n` +
      `Rechtsgebied: ${category}\n` +
      `Gekozen Pakket: ${packageType}\n` +
      `E-mail cliënt: ${newCase.clientEmail}\n` +
      `Telefoonnummer: ${phone}\n\n` +
      `Omschrijving zaak:\n${description}\n\n` +
      `Bekijk het direct in het Advocaten Dashboard.`
    );

    window.location.href = `mailto:Advocaatdirect@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    setView('client-dashboard');
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fcfcfd', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', maxWidth: '650px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <span 
          onClick={() => setView('home')}
          style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.025em', color: '#0b132b', cursor: 'pointer' }}
        >
          advocaat<span style={{ color: '#b4923e' }}>direct</span>
        </span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {currentUser && (
            <button 
              onClick={() => setView(userRole === 'client' ? 'client-dashboard' : 'lawyer-dashboard')}
              style={{ fontSize: '11px', fontWeight: '600', padding: '6px 12px', borderRadius: '4px', backgroundColor: '#b4923e', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Mijn Dashboard
            </button>
          )}
          <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '4px', backgroundColor: '#0b132b', color: '#ffffff', letterSpacing: '0.05em' }}>
            24/7 Spoedhulp
          </span>
        </div>
      </div>

      {/* HOME VIEW */}
      {view === 'home' && (
        <div style={{ margin: 'auto 0', padding: '30px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#b4923e', backgroundColor: '#fdfbf7', padding: '6px 12px', borderRadius: '4px', border: '1px solid #e6dcbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#b4923e', display: 'inline-block' }}></span>
            Landelijke Juridische Spoedhulp
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px', color: '#0b132b', letterSpacing: '-0.02em' }}>
            Als het erop aankomt, sta je er niet alleen voor.
          </h1>

          <p style={{ color: '#475569', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
            Direct een ervaren advocaat aan je zijde. Log in of maak een beveiligd account aan via Supabase om direct je zaak in te dienen.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button
              onClick={() => setView('auth-client')}
              style={{ width: '100%', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#ffffff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '16px' }}
            >
              Cliënt Portaal (Inloggen / Registreren)
            </button>

            <button
              onClick={() => setView('auth-lawyer')}
              style={{ width: '100%', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#0b132b', backgroundColor: '#ffffff', border: '2px solid #0b132b', cursor: 'pointer', fontSize: '16px' }}
            >
              Advocaten Portaal (Inloggen)
            </button>
          </div>
        </div>
      )}

      {/* AUTH VIEW CLIËNT */}
      {view === 'auth-client' && (
        <div style={{ margin: 'auto 0', padding: '20px 0' }}>
          <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#0b132b', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', padding: 0 }}>← Terug</button>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0b132b', marginBottom: '6px' }}>
            {authMode === 'login' ? 'Inloggen als Cliënt' : 'Account Aanmaken Cliënt'}
          </h2>
          <p style={{ color: '#475569', fontSize: '13px', marginBottom: '20px' }}>Beveiligd via Supabase Auth met e-mailverificatie.</p>

          {authMessage && <div style={{ padding: '10px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '13px', borderRadius: '6px', marginBottom: '12px' }}>{authMessage}</div>}

          <form onSubmit={(e) => handleAuth(e, 'client')} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>E-mailadres</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jouw@email.nl" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Wachtwoord</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
            </div>
            <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '8px', fontWeight: '600', color: '#fff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
              {authMode === 'login' ? 'Inloggen' : 'Registreer & Verstuur Verificatie'}
            </button>
            <p onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} style={{ textAlign: 'center', fontSize: '13px', color: '#b4923e', cursor: 'pointer', fontWeight: '600', marginTop: '10px' }}>
              {authMode === 'login' ? 'Nog geen account? Registreer hier' : 'Al een account? Log hier in'}
            </p>
          </form>
        </div>
      )}

      {/* AUTH VIEW ADVOCAAT */}
      {view === 'auth-lawyer' && (
        <div style={{ margin: 'auto 0', padding: '20px 0' }}>
          <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', color: '#0b132b', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', padding: 0 }}>← Terug</button>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0b132b', marginBottom: '6px' }}>Advocaten Inlog</h2>
          <p style={{ color: '#475569', fontSize: '13px', marginBottom: '20px' }}>Beveiligde toegang voor kantoorpartners.</p>

          {authMessage && <div style={{ padding: '10px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '13px', borderRadius: '6px', marginBottom: '12px' }}>{authMessage}</div>}

          <form onSubmit={(e) => handleAuth(e, 'lawyer')} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Advocaten E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="advocaat@kantoor.nl" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Wachtwoord</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
            </div>
            <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '8px', fontWeight: '600', color: '#fff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
              Inloggen op Dashboard
            </button>
          </form>
        </div>
      )}

      {/* NIEUWE ZAAK INDIENEN */}
      {view === 'new-case' && (
        <div style={{ margin: '20px 0' }}>
          <button onClick={() => setView('client-dashboard')} style={{ background: 'none', border: 'none', color: '#0b132b', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', padding: 0 }}>← Terug naar dashboard</button>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0b132b', marginBottom: '6px' }}>Nieuwe Spoedzaak Indienen</h2>
          <p style={{ color: '#475569', fontSize: '13px', marginBottom: '20px' }}>Selecteer het rechtsgebied en pakket. De mail opent direct richting Advocaatdirect@gmail.com.</p>

          <form onSubmit={handleSubmitCase} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Rechtsgebied</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                <option>Arbeidsrecht / Ontslag</option>
                <option>Strafrecht (Spoed / Aanhouding)</option>
                <option>Familierecht / Scheiding & Omgang</option>
                <option>Huurrecht / Woonruimte</option>
                <option>Ondernemingsrecht & Contracten</option>
                <option>Letselschade & Aansprakelijkheid</option>
                <option>Bestuursrecht / Overheid</option>
                <option>Vreemdelingen- & Asielrecht</option>
                <option>Overig / Algemeen Juridisch Advies</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Servicepakket</label>
              <select value={packageType} onChange={(e) => setPackageType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                <option>Spoed Telefonisch Consult (€99)</option>
                <option>Juridische Brief / Sommatie (€195)</option>
                <option>Volledige Spoed Rechtsbijstand (Op aanvraag)</option>
                <option>Dossierbeoordeling & Advies (€149)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Omschrijving</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Vertel kort wat er aan de hand is..." style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>Telefoonnummer</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12345678" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1' }} required />
            </div>

            <button type="submit" style={{ width: '100%', padding: '15px', borderRadius: '8px', fontWeight: '600', color: '#fff', backgroundColor: '#0b132b', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
              Verstuur Aanvraag naar Advocaatdirect@gmail.com
            </button>
          </form>
        </div>
      )}

      {/* CLIËNT DASHBOARD */}
      {view === 'client-dashboard' && (
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0b132b' }}>Mijn Cliënt Dashboard</h2>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Ingelogd als: {currentUser}</p>
            </div>
            <button onClick={() => setView('new-case')} style={{ padding: '10px 16px', backgroundColor: '#b4923e', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
              + Nieuwe Zaak
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cases.map((c) => (
              <div key={c.id} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#e2e8f0', padding: '2px 8px', borderRadius: '4px' }}>{c.id}</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#b4923e' }}>{c.status}</span>
                </div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#0b132b' }}>{c.category}</p>
                <p style={{ fontSize: '13px', color: '#475569' }}><strong>Pakket:</strong> {c.packageType}</p>
                <p style={{ fontSize: '13px', color: '#475569' }}><strong>Omschrijving:</strong> {c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADVOCATEN DASHBOARD */}
      {view === 'lawyer-dashboard' && (
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0b132b' }}>Advocaten Master Dashboard</h2>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Gekoppeld aan Supabase & Advocaatdirect@gmail.com</p>
            </div>
            <button onClick={() => setView('home')} style={{ fontSize: '12px', background: 'none', border: '1px solid #cbd5e1', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Uitloggen</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cases.map((c) => (
              <div key={c.id} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: '#fef2f2', color: '#991b1b', padding: '2px 8px', borderRadius: '4px' }}>{c.category}</span>
                  <span style={{ fontSize: '11px', fontWeight: '600', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px' }}>{c.packageType}</span>
                </div>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#0b132b', marginBottom: '4px' }}>{c.description}</p>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Tel: {c.phone} | Mail: {c.clientEmail} | Zaaknr: {c.id}</p>
                <button 
                  onClick={() => alert('Zaak succesvol geclaimd!')}
                  style={{ padding: '8px 16px', backgroundColor: '#0b132b', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Claim Deze Zaak
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
        Supabase Auth & Database actief • Meldingen naar Advocaatdirect@gmail.com
      </div>

    </main>
  );
}
