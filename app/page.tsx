'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialiseer Supabase client
const supabaseUrl = 'https://uYjs-epvq1QwkwIwYzGp4w.supabase.co'; // Afgeleid van je project of vul hier je exacte Project URL in
const supabaseAnonKey = 'sb_publishable_7v7ZlJhyyQ4JDrZoWC45_w_B9qu8BHQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CompleteLegalPlatform() {
  const [currentView, setCurrentView] = useState('home');
  const [authRole, setAuthRole] = useState('client');
  const [authMode, setAuthMode] = useState('login');
  const [session, setSession] = useState<any>(null);

  // Formulier state voor zaak indienen
  const [category, setCategory] = useState('Verkeersovertreding');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Direct');
  const [fundingType, setFundingType] = useState('Pro Deo');
  const [casesList, setCasesList] = useState<any[]>([]);

  // Chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Auth inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchCases();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchCases();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCases = async () => {
    const { data, error } = await supabase.from('cases').select('*');
    if (!error && data) {
      setCasesList(data);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) alert(error.message);
      else {
        setCurrentView(authRole === 'client' ? 'client-dashboard' : 'lawyer-dashboard');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert('Registratie succesvol! Controleer eventueel je mail of log direct in.');
    }
  };

  const submitCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('Je moet ingelogd zijn om een zaak in te dienen.');
      return;
    }

    const { error } = await supabase.from('cases').insert([
      {
        client_id: session.user.id,
        category,
        description,
        location,
        urgency,
        funding_type: fundingType,
        status: 'In behandeling'
      }
    ]);

    if (error) {
      alert('Fout bij indienen: ' + error.message);
    } else {
      alert('Je zaak is succesvol ingediend en gekoppeld aan de database!');
      fetchCases();
      setCurrentView('client-dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1F2937', paddingBottom: '15px' }}>
        <h1 style={{ color: '#FBBF24', fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
          MijnAdvocaat.online <span style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>(Supabase Live)</span>
        </h1>
        <div>
          {session ? (
            <button onClick={() => supabase.auth.signOut()} style={{ background: '#EF4444', color: '#FFF', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
              Uitloggen
            </button>
          ) : (
            <button onClick={() => setCurrentView('auth')} style={{ background: '#FBBF24', color: '#000', border: 'none', padding: '8px 15px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              Inloggen / Registreren
            </button>
          )}
        </div>
      </header>

      {currentView === 'home' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111827', padding: '30px', borderRadius: '10px', border: '1px solid #374151' }}>
          <h2>Dien direct je juridische zaak in</h2>
          <p style={{ color: '#9CA3AF', marginBottom: '20px' }}>Word direct gekoppeld aan een specialist in de database.</p>
          
          <form onSubmit={submitCase} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Rechtsgebied:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '5px' }}>
                <option value="Verkeersovertreding">Verkeersovertreding & Rijbewijs</option>
                <option value="Arbeidsconflict">Arbeidsconflict & Ontslag</option>
                <option value="Strafrecht">Strafrecht & Arresteringsbijstand</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Omschrijving van je situatie (bijv. aangehouden):</label>
              <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Wat is er precies gebeurd?" style={{ width: '100%', padding: '10px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '5px' }} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Locatie / Plaats:</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bijv. Amsterdam" style={{ width: '100%', padding: '10px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '5px' }} required />
            </div>

            <button type="submit" style={{ background: '#FBBF24', color: '#000', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Naar Database Verzenden & Zoek Advocaat
            </button>
          </form>
        </div>
      )}

      {currentView === 'auth' && (
        <div style={{ maxWidth: '400px', margin: '0 auto', background: '#111827', padding: '30px', borderRadius: '10px', border: '1px solid #374151' }}>
          <h2>{authMode === 'login' ? 'Inloggen' : 'Account aanmaken'}</h2>
          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            <input type="email" placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '5px' }} required />
            <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '10px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '5px' }} required />
            
            <button type="submit" style={{ background: '#FBBF24', color: '#000', padding: '10px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
              {authMode === 'login' ? 'Inloggen' : 'Registreren'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#9CA3AF', cursor: 'pointer' }} onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
              {authMode === 'login' ? 'Geen account? Klik hier om te registreren' : 'Al een account? Log hier in'}
            </p>
          </form>
        </div>
      )}

      {currentView === 'client-dashboard' && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2>Jouw Cliëntenportaal (Live Database Zaken)</h2>
          {casesList.length === 0 ? (
            <p style={{ color: '#9CA3AF' }}>Nog geen actieve zaken gevonden in de database.</p>
          ) : (
            casesList.map((c) => (
              <div key={c.id} style={{ background: '#111827', padding: '20px', borderRadius: '10px', border: '1px solid #374151', marginTop: '15px' }}>
                <h3>{c.category}</h3>
                <p><strong>Status:</strong> {c.status}</p>
                <p><strong>Situatie:</strong> {c.description}</p>
                <p><strong>Locatie:</strong> {c.location}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
