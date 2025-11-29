import { useState } from 'react'

const API_BASE = ''

function PhraseGenerator({ gameId }) {
  const [phrase, setPhrase] = useState(null)

  const handleClick = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`${API_BASE}/api/games/${gameId}/phrase`, { method: 'GET' })
      const data = await response.text()
      setPhrase(data)
    } catch (error) {
      console.error('Failed to fetch phrase:', error)
      setPhrase('Error fetching phrase. Please try again.')
    }
  }

  return (
    <div className="flex max-w-md border-seafoam items-center flex-col bg-pink align-middle p-2 border-2">
      <button onClick={handleClick} className="hover:bg-red hover:text-pink m-2">
        Draw phrase!
      </button>
      <div className="bg-seafoam m-4 border-2 border-red">
        {phrase === null && (
          <h3 className="py-2 px-4 m-2 text-red">Your phrase will appear here!</h3>
        )}
        <h2 className="py-2 px-4 m-2 text-red">{phrase}</h2>
      </div>
    </div>
  )
}

export default PhraseGenerator
