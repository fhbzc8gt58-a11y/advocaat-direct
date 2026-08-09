'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simuleer of voer hier je Supabase registratie uit
      // Omdat verificatie uitstaat, kan de gebruiker direct door of inloggen
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij registratie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Link href="/">← Terug</Link>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
        Account Aanmaken Cliënt
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Direct een account aanmaken en inloggen.
      </p>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#d00', padding: '10px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="jouw@email.nl"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Wachtwoord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Bezig...' : 'Account Aanmaken'}
        </button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link href="/login">Al een account? Log hier in</Link>
      </div>

      {/* Dropdown voorbeeld met verwijderde prijzen voor je spoedzaak formulier */}
      <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <h3>Servicepakketten (Zonder prijzen):</h3>
        <select style={{ width: '100%', padding: '10px', marginTop: '10px' }}>
          <option>Spoed Telefonisch Consult</option>
          <option>Juridische Brief / Sommatie</option>
          <option>Volledige Spoed Rechtsbijstand (Op aanvraag)</option>
          <option>Dossierbeoordeling & Advies</option>
        </select>
      </div>
    </div>
  );
}
