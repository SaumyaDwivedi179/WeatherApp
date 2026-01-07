export default function WeatherCard({ data, error }) {
  if (error) {
    return (
      <div style={{
        background: 'rgba(248,113,113,0.2)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(248,113,113,0.4)',
        borderRadius: '24px',
        padding: '48px 32px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 25px 45px rgba(248,113,113,0.2)'
      }}>
        <div style={{fontSize: '1.5rem', opacity: 0.9}}>
          {error}
        </div>
        <div style={{opacity: 0.7, marginTop: '12px'}}>
          Try another city
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div style={{
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '24px',
      padding: '40px 32px',
      maxWidth: '500px',
      margin: '0 auto',
      boxShadow: '0 35px 60px rgba(0,0,0,0.3)',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: 'clamp(2rem, 6vw, 3rem)',
        fontWeight: '900',
        marginBottom: '12px'
      }}>
        {data.city}
      </h2>
      
      <div style={{
        fontSize: 'clamp(3.5rem, 12vw, 6rem)',
        fontWeight: '900',
        marginBottom: '16px',
        lineHeight: 1
      }}>
        {data.temperature}°C
      </div>
      
      <div style={{
        fontSize: '1.25rem',
        opacity: 0.9,
        marginBottom: '32px',
        textTransform: 'capitalize'
      }}>
        {data.condition}
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginTop: '24px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '16px'
        }}>
          <div style={{opacity: 0.8, marginBottom: '8px', fontSize: '0.875rem'}}>
            Feels like
          </div>
          <div style={{fontSize: '1.75rem', fontWeight: '700'}}>
            {data.feelsLike}°
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '16px'
        }}>
          <div style={{opacity: 0.8, marginBottom: '8px', fontSize: '0.875rem'}}>
            Humidity
          </div>
          <div style={{fontSize: '1.75rem', fontWeight: '700'}}>
            {data.humidity}%
          </div>
        </div>
      </div>
    </div>
  )
}
