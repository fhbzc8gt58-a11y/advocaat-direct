'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uYjs-epvq1QwkwIwYzGp4w.supabase.co';
const supabaseAnonKey = 'sb_publishable_7v7ZlJhyyQ4JDrZoWC45_w_B9qu8BHQ';

// Voeg extra opties toe om netwerkfouten beter af te vangen
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

export default function CompleteLegalPlatform() {
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState<'client' | 'lawyer'>('client');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [session, setSession] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Formulier state
  const [category, setCategory] = useState('Verkeersovertreding & Rijbewijs');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('Direct');
  const [fundingType, setFundingType] = useState('Pro Deo');
  const [casesList, setCasesList] = useState<any[]>([]);

  // Chat state
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  // Auth inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const legalCategories = [
    'Verkeersovertreding & Rijbewijs',
    'Letselschade & Ongevallen',
    'Arbeidsconflict & Ontslag',
    'Strafrecht & Arresteringsbijstand',
    'Huren, Wonen & Burenrecht',
    'Familie- & Echtscheidingsrecht'
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error("Session error:", error);
      setSession(session);
      if (session) fetchCases();
    }).catch(err => {
      console.error("Fetch session failed:", err);
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
      if (data.length > 0 && !activeCaseId) {
        setActiveCaseId(data[0].id);
      }
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (authMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMessage(error.message);
        } else {
          setCurrentView(userRole === 'client' ? 'client-dashboard' : 'lawyer-dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setErrorMessage(error.message);
        } else {
          alert('Registratie succesvol! Je kunt nu inloggen.');
          setAuthMode('login');
        }
      }
    } catch (err: any) {
      setErrorMessage('Netwerk / Technische fout: ' + (err?.message || 'Onbekend'));
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', color: '#FFFFFF', fontFamily: 'sans-serif', padding: '15px', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #1F2937', paddingBottom: '15px' }}>
        <div>
          <span style={{ background: '#FBBF24', color: '#000', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>24/7</span>
          <h1 style={{ color: '#FBBF24', fontSize: '1.3rem', margin: '5px 0 0 0', cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
            MijnAdvocaat.online
          </h1>
        </div>
        <div>
          {session ? (
            <button onClick={() => supabase.auth.signOut()} style={{ background: '#EF4444', color: '#FFF', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
              Uitloggen
            </button>
          ) : (
            <button onClick={() => setCurrentView('auth')} style={{ background: '#FBBF24', color: '#000', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
              Inloggen
            </button>
          )}
        </div>
      </header>

      {currentView === 'auth' && (
        <div style={{ maxWidth: '400px', margin: '0 auto', background: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #374151' }}>
          <h2>{authMode === 'login' ? 'Inloggen' : 'Registreren'}</h2>
          
          {errorMessage && (
            <div style={{ background: '#7F1D1D', color: '#FCA5A5', padding: '10px', borderRadius: '6px', fontSize: '0.85rem', margin: '10px 0', wordBreak: 'break-word' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
            <input type="email" placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px' }} required />
            <input type="password" placeholder="Wachtwoord (min. 6 tekens)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px' }} required />
            
            <button type="submit" style={{ background: '#FBBF24', color: '#000', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {authMode === 'login' ? 'Inloggen' : 'Account aanmaken'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#9CA3AF', cursor: 'pointer' }} onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMessage(''); }}>
              {authMode === 'login' ? 'Geen account? Klik hier' : 'Al een account? Log in'}
            </p>
          </form>
        </div>
      )}

      {currentView === 'home' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '40px 20px' }}>
          <h2>Welkom bij MijnAdvocaat.online</h2>
          <p style={{ color: '#9CA3AF', margin: '15px 0' }}>Klik hieronder om in te loggen en toegang te krijgen tot je portaal.</p>
          <button onClick={() => setCurrentView('auth')} style={{ background: '#FBBF24', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Naar Inlogscherm
          </button>
        </div>
      )}
    </div>
  );
}
