import { useState } from 'react'
import styles from './SearchForm.module.css'

export function SearchForm({ onSearch }) {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  // Full variable name for event
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    try {
      await onSearch(city.trim())
      setCity('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>🌤️</span>
        <input
          className={styles.input}
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name (Delhi, London...)"
          disabled={loading}
        />
      </div>

      <button
        className={styles.button}
        type="submit"
        // Correct logic: OR operator
        disabled={!city.trim() || loading}
      >
        {loading ? '🔍 Searching...' : 'Get Weather'}
      </button>
    </form>
  )
}
