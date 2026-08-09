export default function Page() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fcfcfd', color: '#0f172a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.025em', color: '#0b132b' }}>
          advocaat<span style={{ color: '#b4923e' }}>direct</span>
        </span>
        <span style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '4px', backgroundColor: '#0b132b', color: '#ffffff', letterSpacing: '0.05em' }}>
          Direct juridisch advies
        </span>
      </div>

      {/* Main Content */}
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

        {/* Knoppen */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a
            href="#juridische-hulp"
            style={{ width: '100%', display: 'block', textAlign: 'center', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#ffffff', backgroundColor: '#0b132b', textDecoration: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', boxSizing: 'border-box' }}
          >
            Ik heb juridische hulp nodig
          </a>

          <a
            href="#advocaat"
            style={{ width: '100%', display: 'block', textAlign: 'center', padding: '16px 24px', borderRadius: '8px', fontWeight: '600', color: '#0b132b', backgroundColor: '#ffffff', border: '2px solid #0b132b', textDecoration: 'none', boxSizing: 'border-box' }}
          >
            Ik ben advocaat
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
        Vertrouwd door cliënten en advocaten in heel Nederland.
      </div>

    </main>
  );
}
