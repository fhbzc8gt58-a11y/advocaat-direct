'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [rol, setRol] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [naam, setNaam] = useState('');
  const [specialisme, setSpecialisme] = useState('Verkeersovertredingen');
  const [ervaring, setErvaring] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Registratie gelukt! Je kunt nu inloggen.');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 'bold' }}>← Terug naar home</Link>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>Account Aanmaken</h1>
      <p style={{ color: '#475569', marginBottom: '20px', fontSize: '14px' }}>Kies of je een account aanmaakt als cliënt of advocaat.</p>

      {message && (
        <div style={{ background: '#e6f4ea', color: '#137333', padding: '12px', marginBottom: '15px', borderRadius: '6px', fontWeight: '500' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setRol('client')}
            style={{
              flex: 1, padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer',
              background: rol === 'client' ? '#0f172a' : '#fff',
              color: rol === 'client' ? '#fff' : '#0f172a',
              border: '1px solid #0f172a'
            }}
          >
            Cliënt
          </button>
          <button
            type="button"
            onClick={() => setRol('advocaat')}
            style={{
              flex: 1, padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer',
              background: rol === 'advocaat' ? '#0f172a' : '#fff',
              color: rol === 'advocaat' ? '#fff' : '#0f172a',
              border: '1px solid #0f172a'
            }}
          >
            Advocaat
          </button>
        </div>

        {rol === 'advocaat' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Volledige Naam</label>
              <input type="text" value={naam} onChange={(e) => setNaam(e.target.value)} required placeholder="Mr. J. de Vries" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Specialisme</label>
              <select value={specialisme} onChange={(e) => setSpecialisme(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff' }}>
                <option value="Verkeersovertredingen">Verkeersovertredingen & Delicten</option>
                <option value="Letselschade">Letselschade</option>
                <option value="Arbeidsrecht">Arbeidsrecht</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Ervaring & Info</label>
              <textarea rows={3} value={ervaring} onChange={(e) => setErvaring(e.target.value)} required placeholder="Jaren ervaring..." style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }} />
            </div>
          </>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>E-mailadres</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jouw@email.nl" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Wachtwoord</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Registreren
        </button>
      </form>
    </div>
  );
}
