'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uYjs-epvq1QwkwIwYzGp4w.supabase.co';
const supabaseAnonKey = 'sb_publishable_7v7ZlJhyyQ4JDrZoWC45_w_B9qu8BHQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  useEffect(() => {
    if (!activeCaseId) return;
    fetchMessages(activeCaseId);

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `case_id=eq.${activeCaseId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeCaseId]);

  const fetchCases = async () => {
    const { data, error } = await supabase.from('cases').select('*');
    if (!error && data) {
      setCasesList(data);
      if (data.length > 0 && !activeCaseId) {
        setActiveCaseId(data[0].id);
      }
    }
  };

  const fetchMessages = async (caseId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (authMode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setCurrentView(userRole === 'client' ? 'client-dashboard' : 'lawyer-dashboard');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        alert('Registratie succesvol! Je kunt nu inloggen.');
        setAuthMode('login');
      }
    }
  };

  const submitCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('Log eerst in om een zaak in te dienen.');
      setCurrentView('auth');
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
      alert('Fout: ' + error.message);
    } else {
      alert('Zaak succesvol ingediend in de database!');
      fetchCases();
      setCurrentView('client-dashboard');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeCaseId || !session) return;

    await supabase.from('messages').insert([
      {
        case_id: activeCaseId,
        sender_id: session.user.id,
        content: newMessage
      }
    ]);
    setNewMessage('');
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

      {session && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setCurrentView('home')} style={{ flex: 1, padding: '10px', background: currentView === 'home' ? '#FBBF24' : '#1F2937', color: currentView === 'home' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Nieuwe Zaak</button>
          <button onClick={() => setCurrentView('client-dashboard')} style={{ flex: 1, padding: '10px', background: currentView === 'client-dashboard' ? '#FBBF24' : '#1F2937', color: currentView === 'client-dashboard' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Cliënt Portaal</button>
          <button onClick={() => setCurrentView('lawyer-dashboard')} style={{ flex: 1, padding: '10px', background: currentView === 'lawyer-dashboard' ? '#FBBF24' : '#1F2937', color: currentView === 'lawyer-dashboard' ? '#000' : '#FFF', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Advocaat Portaal</button>
        </div>
      )}

      {currentView === 'home' && (
        <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #374151' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Direct juridische bijstand</h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginBottom: '20px' }}>Selecteer uw situatie voor een directe match met een specialist.</p>

          <form onSubmit={submitCase} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Rechtsgebied:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {legalCategories.map((opt) => (
                  <div key={opt} onClick={() => setCategory(opt)} style={{ padding: '12px', background: category === opt ? '#1E3A8A' : '#1F2937', border: category === opt ? '2px solid #3B82F6' : '1px solid #4B5563', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Omschrijving van uw situatie:</label>
              <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Bijv. Ik ben aangereden op de snelweg / aangehouden..." style={{ width: '100%', padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px', boxSizing: 'border-box' }} required />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Locatie / Plaats:</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bijv. Rotterdam" style={{ width: '100%', padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px', boxSizing: 'border-box' }} required />
            </div>

            <button type="submit" style={{ background: '#FBBF24', color: '#000', padding: '14px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' }}>
              Verstuur naar Database & Start Chat
            </button>
          </form>
        </div>
      )}

      {currentView === 'auth' && (
        <div style={{ maxWidth: '400px', margin: '0 auto', background: '#111827', padding: '25px', borderRadius: '12px', border: '1px solid #374151' }}>
          <h2>{authMode === 'login' ? 'Inloggen' : 'Registreren'}</h2>
          
          {errorMessage && (
            <div style={{ background: '#7F1D1D', color: '#FCA5A5', padding: '10px', borderRadius: '6px', fontSize: '0.85rem', margin: '10px 0' }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
            <button type="button" onClick={() => setUserRole('client')} style={{ flex: 1, padding: '8px', background: userRole === 'client' ? '#3B82F6' : '#1F2937', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '0.85rem' }}>Cliënt</button>
            <button type="button" onClick={() => setUserRole('lawyer')} style={{ flex: 1, padding: '8px', background: userRole === 'lawyer' ? '#3B82F6' : '#1F2937', color: '#FFF', border: 'none', borderRadius: '6px', fontSize: '0.85rem' }}>Advocaat</button>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="E-mailadres" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px' }} required />
            <input type="password" placeholder="Wachtwoord (min. 6 tekens)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: '12px', background: '#1F2937', color: '#FFF', border: '1px solid #4B5563', borderRadius: '8px' }} required />
            
            <button type="submit" style={{ background: '#FBBF24', color: '#000', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              {authMode === 'login' ? `Inloggen als ${userRole === 'client' ? 'Cliënt' : 'Advocaat'}` : 'Account aanmaken'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#9CA3AF', cursor: 'pointer' }} onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMessage(''); }}>
              {authMode === 'login' ? 'Geen account? Klik hier' : 'Al een account? Log in'}
            </p>
          </form>
        </div>
      )}

      {currentView === 'client-dashboard' && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2>Cliëntenportaal</h2>
          {casesList.length === 0 ? (
            <p style={{ color: '#9CA3AF' }}>Geen actieve zaken. Dien er een in via de startpagina.</p>
          ) : (
            casesList.map((c) => (
              <div key={c.id} style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #374151', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#FBBF24' }}>{c.category}</h3>
                <p style={{ fontSize: '0.9rem', color: '#D1D5DB' }}><strong>Situatie:</strong> {c.description}</p>
                <p style={{ fontSize: '0.9rem', color: '#D1D5DB' }}><strong>Locatie:</strong> {c.location}</p>
                <p style={{ fontSize: '0.9rem', color: '#34D399' }}><strong>Status:</strong> {c.status}</p>

                <div style={{ background: '#0F172A', border: '1px solid #334155', borderRadius: '10px', padding: '15px', marginTop: '15px' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#FBBF24' }}>Beveiligde Live Chat</h4>
                  
                  <div style={{ height: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px', paddingRight: '5px' }}>
                    {messages.length === 0 ? (
                      <p style={{ color: '#64748B', fontSize: '0.85rem', textAlign: 'center', marginTop: '60px' }}>Nog geen berichten in deze zaak.</p>
                    ) : (
                      messages.map((m) => {
                        const isMe = session?.user?.id === m.sender_id;
                        return (
                          <div key={m.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', background: isMe ? '#2563EB' : '#334155', padding: '10px 14px', borderRadius: '8px', maxWidth: '80%', fontSize: '0.85rem' }}>
                            {m.content}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <form onSubmit={sendMessage} style={{ display: 'flex', gap: '8px' }}>
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Typ je bericht..." style={{ flex: 1, padding: '10px', background: '#1E293B', color: '#FFF', border: '1px solid #475569', borderRadius: '6px', fontSize: '0.85rem' }} />
                    <button type="submit" style={{ background: '#FBBF24', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>Verstuur</button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {currentView === 'lawyer-dashboard' && (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2>Advocatenportaal (Overzicht Database Zaken)</h2>
          {casesList.length === 0 ? (
            <p style={{ color: '#9CA3AF' }}>Geen openstaande zaken in het systeem.</p>
          ) : (
            casesList.map((c) => (
              <div key={c.id} style={{ background: '#111827', padding: '20px', borderRadius: '12px', border: '1px solid #374151', marginBottom: '20px' }}>
                <span style={{ background: '#3B82F6', color: '#FFF', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>Toegewezen aan u</span>
                <h3 style={{ margin: '10px 0 10px 0', color: '#FBBF24' }}>{c.category}</h3>
                <p style={{ fontSize: '0.9rem', color: '#D1D5DB' }}><strong>Client Situatie:</strong> {c.description}</p>
                <p style={{ fontSize: '0.9rem', color: '#D1D5DB' }}><strong>Locatie:</strong> {c.location}</p>
                <button onClick={() => { setActiveCaseId(c.id); setCurrentView('client-dashboard'); }} style={{ background: '#FBBF24', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                  Open Zaak & Chat met Cliënt
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
