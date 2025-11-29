import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Enable CORS for cross-origin requests
app.use('*', cors())

/**
 * Generate a SHA-256 hash of a message
 */
async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Generate a random 5-character game ID
 */
function generateGameId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 5 }, () => 
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('')
}

// API Routes

// Health check
app.get('/api', (c) => c.json({ status: 'ok', message: 'Charades API is running!' }))

// Create a new game
app.post('/api/games', async (c) => {
  const gameId = generateGameId()
  await c.env.GAMES.put(gameId, '')
  return c.json({ id: gameId })
})

// Get game info
app.get('/api/games/:gameId', async (c) => {
  const gameId = c.req.param('gameId')
  const game = await c.env.GAMES.get(gameId)
  
  if (game === null) {
    return c.json({ error: 'No such game exists' }, 404)
  }
  
  return c.json({ id: gameId, data: game })
})

// Get a random phrase from a game
app.get('/api/games/:gameId/phrase', async (c) => {
  const gameId = c.req.param('gameId')
  const phrases = await c.env.PHRASES.list({ prefix: `${gameId}-` })
  const keys = phrases.keys

  if (keys.length === 0) {
    return c.text('Brainstorm and add some phrases to the game to get started!')
  }

  let phrase = { used: true, phrase: '' }
  let phraseKey
  const availableKeys = [...keys]

  while (phrase.used && availableKeys.length >= 1) {
    const random = Math.floor(Math.random() * availableKeys.length)
    phraseKey = availableKeys[random].name
    phrase = JSON.parse(await c.env.PHRASES.get(phraseKey))
    availableKeys.splice(random, 1)
  }

  if (availableKeys.length === 0 && phrase.used) {
    return c.text("You've run out of phrases! Please add more")
  }

  // Mark phrase as used
  phrase.used = true
  await c.env.PHRASES.put(phraseKey, JSON.stringify(phrase))

  return c.text(phrase.phrase)
})

// Add a phrase to a game
app.post('/api/games/:gameId/phrase', async (c) => {
  const gameId = c.req.param('gameId')
  let phrase = await c.req.text()

  // Strip 'phrase=' prefix if it exists (form data compatibility)
  phrase = phrase.startsWith('phrase=') ? phrase.slice(7) : phrase
  phrase = decodeURIComponent(phrase)

  const phraseHash = await digestMessage(phrase)
  const phraseKey = `${gameId}-${phraseHash}`
  const phraseValue = JSON.stringify({
    used: false,
    phrase: phrase
  })

  await c.env.PHRASES.put(phraseKey, phraseValue)
  return c.text('Phrase added!')
})

// Legacy routes (without /api prefix) for backward compatibility
app.post('/games', async (c) => {
  const gameId = generateGameId()
  await c.env.GAMES.put(gameId, '')
  return c.json({ id: gameId })
})

app.get('/games/:gameId', async (c) => {
  const gameId = c.req.param('gameId')
  const game = await c.env.GAMES.get(gameId)
  
  if (game === null) {
    return c.json({ error: 'No such game exists' }, 404)
  }
  
  return c.json({ id: gameId, data: game })
})

app.get('/games/:gameId/phrase', async (c) => {
  const gameId = c.req.param('gameId')
  const phrases = await c.env.PHRASES.list({ prefix: `${gameId}-` })
  const keys = phrases.keys

  if (keys.length === 0) {
    return c.text('Brainstorm and add some phrases to the game to get started!')
  }

  let phrase = { used: true, phrase: '' }
  let phraseKey
  const availableKeys = [...keys]

  while (phrase.used && availableKeys.length >= 1) {
    const random = Math.floor(Math.random() * availableKeys.length)
    phraseKey = availableKeys[random].name
    phrase = JSON.parse(await c.env.PHRASES.get(phraseKey))
    availableKeys.splice(random, 1)
  }

  if (availableKeys.length === 0 && phrase.used) {
    return c.text("You've run out of phrases! Please add more")
  }

  phrase.used = true
  await c.env.PHRASES.put(phraseKey, JSON.stringify(phrase))

  return c.text(phrase.phrase)
})

app.post('/games/:gameId/phrase', async (c) => {
  const gameId = c.req.param('gameId')
  let phrase = await c.req.text()

  phrase = phrase.startsWith('phrase=') ? phrase.slice(7) : phrase
  phrase = decodeURIComponent(phrase)

  const phraseHash = await digestMessage(phrase)
  const phraseKey = `${gameId}-${phraseHash}`
  const phraseValue = JSON.stringify({
    used: false,
    phrase: phrase
  })

  await c.env.PHRASES.put(phraseKey, phraseValue)
  return c.text('Phrase added!')
})

// Root route
app.get('/', (c) => c.text('Charades API - Use /api for API endpoints'))

// Catch-all for unknown routes
app.all('*', (c) => {
  return c.json({ error: 'Route not found' }, 404)
})

export default app
