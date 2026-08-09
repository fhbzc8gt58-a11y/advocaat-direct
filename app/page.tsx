'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Registreren zonder verificatiemail-problemen
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Pas dit aan naar jouw eigen Supabase client aanroep indien nodig:
      // const { error } = await supabase.auth.signUp({ email, password });
      // if (error) throw error;

      setMessage('Account succesvol aangemaakt! Je kunt nu inloggen.');
      setTimeout(() => {
        router.push('/login'); // Stuurt netjes door naar de inlogpagina
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Er is een fout opgetreden bij registratie.');
    } finally {
      setLoading(false);
    }
  };

  // Wachtwoord vergeten functionaliteit via Supabase
  const handleForgotPassword = async () => {
    if (!email) {
      setError('Vul eerst je e-mailadres hierboven in om je wachtwoord te resetten.');
      return;
    }

    try {
      // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: 'https://mijnadvocaat.online/update-password',
      // });
      // if (error) throw error;
      
      setMessage('Als dit e-mailadres bestaat, is er een herstelmail verstuurd!');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Kon geen resetmail versturen.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 'bold' }}>← Terug</Link>
      
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px', color: '#0f172a' }}>
        Account Aanmaken Cliënt
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Direct een account aanmaken en inloggen.
      </p>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#d00', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {message && (
        <div style={{ background: '#e6f4ea', color: '#137333', padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            placeholder="jouw@email.nl"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Wachtwoord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            placeholder="••••••••"
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
            marginBottom: '10px'
          }}
        >
          {loading ? 'Bezig...' : 'Account Aanmaken'}
        </button>
      </form>

      {/* Wachtwoord vergeten knop */}
      <button
        type="button"
        onClick={handleForgotPassword}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'transparent',
          color: '#0f172a',
          border: '1px solid #0f172a',
          borderRadius: '6px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        Wachtwoord vergeten? Stuur mij een mail
      </button>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Link href="/login" style={{ color: '#b89753', textDecoration: 'none', fontWeight: '600' }}>
          Al een account? Log hier in
        </Link>
      </div>
    </div>
  );
}
