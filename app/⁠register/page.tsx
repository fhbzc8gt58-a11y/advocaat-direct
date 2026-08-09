'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [rol, setRol] = useState('client'); // 'client' of 'advocaat'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [naam, setNaam] = useState('');
  const [specialisme, setSpecialisme] = useState('Verkeersovertredingen');
  const [ervaring, setErvaring] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Hier komt de Supabase registratie logica te staan op basis van de rol (client of advocaat)
      // Bij rol === 'advocaat' slaan we ook naam, specialisme en ervaring op in de databaseprofielen.

      setMessage('Account succesvol aangemaakt! Je wordt doorgestuurd...');
      setTimeout(() => {
        if (rol === 'advocaat') {
          router.push('/dashboard-advocaat');
        } else {
          router.push('/');
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij de registratie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 'bold' }}>← Terug naar home</Link>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
        Account Aanmaken
      </h1>
      <p style={{ color: '#475569', marginBottom: '20px', fontSize: '14px' }}>
        Maak een direct account aan als cliënt of registreer je als aangesloten advocaat.
      </p>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#d00', padding: '12px', marginBottom: '15px', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      {message && (
        <div style={{ background: '#e6f4ea', color: '#137333', padding: '12px', marginBottom: '15px', borderRadius: '6px', fontWeight: '500' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Ik wil me registreren als:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setRol('client')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '6px',
                border: rol === 'client' ? '2px solid #0f172a' : '1px solid #ccc',
                background: rol === 'client' ? '#0f172a' : '#fff',
                color: rol === 'client' ? '#fff' : '#0f172a',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Cliënt
            </button>
            <button
              type="button"
              onClick={() => setRol('advocaat')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '6px',
                border: rol === 'advocaat' ? '2px solid #0f172a' : '1px solid #ccc',
                background: rol === 'advocaat' ? '#0f172a' : '#fff',
                color: rol === 'advocaat' ? '#fff' : '#0f172a',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Advocaat
            </button>
          </div>
        </div>

        {rol === 'advocaat' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Volledige Naam (inclusief titel)</label>
              <input
                type="text"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                required
                placeholder="Mr. J. de Vries"
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Specialisme</label>
              <select
                value={specialisme}
                onChange={(e) => setSpecialisme(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
              >
                <option value="Verkeersovertredingen">Verkeersovertredingen & Delicten</option>
                <option value="Letselschade">Letselschade</option>
                <option value="Arbeidsrecht">Arbeidsrecht / Ontslag</option>
                <option value="Strafrecht">Strafrecht</option>
                <option value="Huurrecht">Huurrecht</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Ervaring & Info voor cliënt</label>
              <textarea
                rows={3}
                value={ervaring}
                onChange={(e) => setErvaring(e.target.value)}
                required
                placeholder="Bijv. 10+ jaar ervaring in strafrecht en verkeersdelicten..."
                style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jouw@email.nl"
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Wachtwoord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          {loading ? 'Bezig...' : (rol === 'advocaat' ? 'Registreer als Advocaat' : 'Registreer als Cliënt')}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link href="/login" style={{ color: '#b89753', textDecoration: 'none', fontWeight: '600' }}>
          Al een account? Log hier in
        </Link>
      </div>
    </div>
  );
}
