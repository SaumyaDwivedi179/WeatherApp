import { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!city.trim()) return
    
    setLoading(true)
    try {
      await onSearch(city.trim())
    } finally {
      setLoading(false)
    }
    setCity('')
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      borderRadius: '24px',
      padding: '32px 24px',
      marginBottom: '32px',
      boxShadow: '0 25px 45px rgba(0,0,0,0.2)',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <div style={{position: 'relative'}}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (Delhi, London...)"
          disabled={loading}
          style={{
            width: '100%',
            padding: '20px 24px 20px 60px',
            background: 'rgba(255,255,255,0.1)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '20px',
            color: 'white',
            fontSize: '18px',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
        />
        <div style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: loading ? 0.5 : 0.8
        }}>
          🌤️
        </div>
      </div>
      <button
        type="submit"
        disabled={!city.trim() || loading}
        style={{
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #60a5fa, #06b6d4)',
          border: 'none',
          borderRadius: '16px',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          marginTop: '20px',
          cursor: city.trim() && !loading ? 'pointer' : 'not-allowed',
          opacity: city.trim() && !loading ? 1 : 0.6
        }}
      >
        {loading ? '🔍 Searching...' : 'Get Weather'}
      </button>
    </form>
  )
}
