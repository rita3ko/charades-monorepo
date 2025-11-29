import { useState } from 'react'

const API_BASE = ''

function PhraseSubmitter({ gameId, onPhraseAdded }) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!value.trim()) return

    try {
      const response = await fetch(`${API_BASE}/api/games/${gameId}/phrase`, {
        method: 'POST',
        body: value
      })
      
      if (response.ok) {
        setValue('')
        setStatus('Phrase added!')
        setTimeout(() => setStatus(null), 2000)
        // Notify parent to refresh stats
        if (onPhraseAdded) {
          onPhraseAdded()
        }
      }
    } catch (error) {
      console.error('Failed to submit phrase:', error)
      setStatus('Error submitting phrase')
    }
  }

  return (
    <div className="flex max-w-md min-w-full justify-between flex-col border-2 p-2 border-seafoam bg-pink">
      <div className="flex-1 m-2 text-red text-md text-light whitespace-normal">
        Add some phrases to the bucket for your friends to draw from and act out.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-1 m-2">
          <label className="block text-red text-md font-bold">
            Enter phrase:
          </label>
        </div>
        <div className="flex-1 m-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="shadow bg-seafoam appearance-none border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline border-red text-red"
          />
        </div>
        <div className="flex-1 m-2">
          <input
            type="submit"
            value="Submit phrase!"
            className="hover:bg-red hover:text-pink bg-pink text-red border-2 border-red font-bold py-2 px-4 rounded cursor-pointer"
          />
          {status && <span className="ml-2 text-red font-bold">{status}</span>}
        </div>
      </form>
      <div className="flex-1 m-2 text-red text-md text-light whitespace-normal">
        <b>Some ideas to get you started:</b> think of your favorite books, movies, characters, writers, podcasts, places you visited!
      </div>
    </div>
  )
}

export default PhraseSubmitter
