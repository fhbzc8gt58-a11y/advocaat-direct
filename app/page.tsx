'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SpoedIndienenPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Formulier state
  const [rechtsgebied, setRechtsgebied] = useState('Verkeersovertredingen');
  const [probleem, setProbleem] = useState('');
  const [locatie, setLocatie] = useState('');
  const [tijd, setTijd] = useState('');
  const [urgentie, setUrgentie] = useState('Hoog');
  const [telefoon, setTelefoon] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitSpoed = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // Hier sla je de spoedzaak op in je Supabase database tabel 'spoed_zaken'
      // Voorbeeld logica:
      // const { error } = await supabase.from('spoed_zaken').insert([
      //   { rechtsgebied, probleem, locatie, tijd, urgentie, telefoon, email, status: 'open' }
      // ]);
      // if (error) throw error;

      // Simulatie van succesvolle verzending naar aangesloten advocaten
      setSuccessMessage(
        'Spoedoproep succesvol verzonden! Beschikbare advocaten in jouw regio worden direct geïnformeerd en nemen contact met je op.'
      );
      
      // Velden resetten
      setProbleem('');
      setLocatie('');
      setTijd('');
      setTelefoon('');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Er is iets misgegaan bij het versturen van de spoedzaak.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', color: '#0f172a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 'bold' }}>← Terug naar home</Link>
        <div>
          <Link href="/login" style={{ marginRight: '15px', color: '#b89753', textDecoration: 'none', fontWeight: '600' }}>Inloggen</Link>
          <Link href="/register" style={{ color: '#0f172a', textDecoration: 'none', fontWeight: '600' }}>Registreren</Link>
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>
          🚨 Directe Spoedhulp & Advocaten Match
        </h1>
        <p style={{ color: '#475569', fontSize: '14px', lineHeight: '1.5' }}>
          Omschrijf je juridische probleem of spoedzaak. Onze aangesloten advocaten ontvangen direct je melding en kunnen de zaak direct oppikken en contact met je opnemen.
        </p>
      </div>

      {error && (
        <div style={{ background: '#ffe6e6', color: '#d00', padding: '12px', marginBottom: '15px', borderRadius: '6px' }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{ background: '#e6f4ea', color: '#137333', padding: '15px', marginBottom: '20px', borderRadius: '6px', fontWeight: '500' }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmitSpoed}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Type Rechtsgebied / Categorie</label>
          <select
            value={rechtsgebied}
            onChange={(e) => setRechtsgebied(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
          >
            <option value="Verkeersovertredingen">Verkeersovertredingen & Delicten</option>
            <option value="Letselschade">Letselschade</option>
            <option value="Arbeidsrecht">Arbeidsrecht / Ontslag</option>
            <option value="Strafrecht">Strafrecht (Algemeen)</option>
            <option value="Huurrecht">Huurrecht & Woning</option>
            <option value="Overig">Overig Juridisch Probleem</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Omschrijf je probleem / zaak</label>
          <textarea
            rows={4}
            value={probleem}
            onChange={(e) => setProbleem(e.target.value)}
            required
            placeholder="Geef een korte toelichting van wat er is gebeurd..."
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Locatie / Plaats</label>
            <input
              type="text"
              value={locatie}
              onChange={(e) => setLocatie(e.target.value)}
              required
              placeholder="Bijv. Amsterdam"
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Tijdstip / Wanneer</label>
            <input
              type="text"
              value={tijd}
              onChange={(e) => setTijd(e.target.value)}
              required
              placeholder="Bijv. Vandaag om 14:00"
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Urgentie</label>
          <select
            value={urgentie}
            onChange={(e) => setUrgentie(e.target.value)}
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px', background: '#fff' }}
          >
            <option value="Hoog">Direct / Spoed (Binnen 1 uur)</option>
            <option value="Middel">Vandaag nog</option>
            <option value="Laag">Binnen 24-48 uur</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Jouw E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="jouw@email.nl"
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Jouw Telefoonnummer (voor direct contact)</label>
          <input
            type="tel"
            value={telefoon}
            onChange={(e) => setTelefoon(e.target.value)}
            required
            placeholder="06 12345678"
            style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Bezig met uitzenden...' : 'Verstuur Spoedoproep naar Advocaten'}
        </button>
      </form>
    </div>
  );
}
