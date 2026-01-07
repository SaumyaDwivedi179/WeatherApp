const Header = () => (
  <header style={{
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderBottom: 'none',
    borderRadius: '24px 24px 0 0',
    padding: '32px 24px',
    marginBottom: '0',
    boxShadow: '0 25px 45px rgba(0,0,0,0.2)'
  }}>
    <div style={{maxWidth: '500px', margin: '0 auto'}}>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #60a5fa 0%, #06b6d4 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '12px',
        textAlign: 'center'
      }}>
        Weatherly
      </h1>
      <p style={{
        opacity: 0.8,
        fontSize: 'clamp(1rem, 3vw, 1.125rem)',
        textAlign: 'center',
        lineHeight: '1.5'
      }}>
        Get instant weather updates for any city worldwide
      </p>
    </div>
  </header>
)

export default Header
