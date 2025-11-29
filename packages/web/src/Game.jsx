import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhraseGenerator from './components/PhraseGenerator'
import PhraseSubmitter from './components/PhraseSubmitter'

// API base URL - empty for same-origin requests (works with proxy in dev and production)
const API_BASE = ''

function Game() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [gameId, setGameId] = useState(id || null)
  const [joinValue, setJoinValue] = useState('')
  const [stats, setStats] = useState({ total: 0, used: 0, remaining: 0 })

  const fetchStats = useCallback(async () => {
    if (!gameId) return
    try {
      const response = await fetch(`${API_BASE}/api/games/${gameId}/stats`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }, [gameId])

  useEffect(() => {
    setGameId(id || null)
  }, [id])

  useEffect(() => {
    if (gameId) {
      fetchStats()
    }
  }, [gameId, fetchStats])

  const handleNewGame = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/games`, { method: 'POST' })
      const data = await response.json()
      navigate(`/${data.id}`)
      setGameId(data.id)
    } catch (error) {
      console.error('Failed to create game:', error)
    }
  }

  const handleJoin = () => {
    if (joinValue.trim()) {
      navigate(`/${joinValue.trim()}`)
      setGameId(joinValue.trim())
    }
  }

  const handleReset = async () => {
    if (!gameId) return
    try {
      const response = await fetch(`${API_BASE}/api/games/${gameId}/reset`, { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to reset game:', error)
    }
  }

  if (!gameId) {
    return (
      <div className="flex flex-col pt-3 mx-auto m-2 max-w-md">
        <div className="flex-1 bg-pink border-seafoam border-2 m-2">
          <div className="flex flex-col items-center m-2 p-4">
            <div className="flex-1 m-2">
              <p className="text-red font-black text-2xl">Start a new game</p>
            </div>
            <div className="flex-1 p-2">
              <button onClick={handleNewGame} className="hover:bg-red hover:text-pink text-center">
                New game!
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-pink border-seafoam border-2 m-2">
          <div className="flex flex-col items-center m-2 p-2">
            <div className="flex-1 m-2 text-center">
              <h2 className="text-red font-black font-sans text-2xl">Join game</h2>
            </div>
            <div className="flex-1 text-red items-center text-center px-4 py-2 m-2">
              <label className="block text-red text-sm font-bold">
                Game ID:
              </label>
              <input
                type="text"
                value={joinValue}
                onChange={(e) => setJoinValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                className="shadow bg-seafoam appearance-none border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button className="hover:bg-red hover:text-pink m-2" onClick={handleJoin}>
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl sm:max-w-md px-4 m-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col bg-pink col-span-2 border-seafoam border-2 text-md text-red p-2">
          <div>
            <p><b>Game ID:</b> {gameId}</p>
            <p><b>Share:</b> <a href={`/${gameId}`} className="text-indigo font-bold">charades.pizza/{gameId}</a></p>
          </div>
        </div>
        
        {/* Words Remaining Stats */}
        <div className="flex flex-col bg-pink col-span-2 border-seafoam border-2 text-md text-red p-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-2xl font-black">
                {stats.remaining} <span className="text-lg font-normal">words left</span>
              </p>
              <p className="text-sm">
                {stats.used} used / {stats.total} total
              </p>
            </div>
            <button 
              onClick={handleReset}
              className="hover:bg-red hover:text-pink text-red border-2 border-red font-bold py-1 px-3 rounded text-sm"
            >
              Reset Game
            </button>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2">
          <PhraseSubmitter gameId={gameId} onPhraseAdded={fetchStats} />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <PhraseGenerator gameId={gameId} onPhraseDrawn={fetchStats} />
        </div>
      </div>
    </div>
  )
}

export default Game
