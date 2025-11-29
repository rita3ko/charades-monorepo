# Charades.pizza

A multiplayer charades game built on Cloudflare's developer platform. Play with friends over video chat by adding phrases to a shared "hat" and taking turns acting them out.

## Tech Stack

### Frontend

- **Vite + React** - Fast build tooling and UI framework
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### Backend

- **Cloudflare Workers** - Serverless API
- **Hono** - Lightweight web framework for routing
- **Workers KV** - Key-value storage for phrases and game IDs
- **Durable Objects** - Stateful coordination for tracking words remaining per game

## Project Structure

```
charades-monorepo/
├── packages/
│   ├── api/                 # Cloudflare Worker API
│   │   └── src/
│   │       └── index.js     # API routes + GameState Durable Object
│   └── web/                 # React frontend
│       └── src/
│           ├── App.jsx      # Main app with routing
│           ├── Game.jsx     # Game UI with stats display
│           └── components/
│               ├── PhraseGenerator.jsx  # Draw phrases
│               └── PhraseSubmitter.jsx  # Add phrases
├── wrangler.jsonc           # Cloudflare Workers configuration
└── package.json
```

## How It Works

1. **Create/Join a Game** - Each game gets a unique 5-character ID
2. **Add Phrases** - Players submit phrases to the shared pool
3. **Draw & Act** - Draw a random phrase and act it out for others to guess
4. **Track Progress** - Durable Objects track how many words remain in real-time

### Durable Objects

Each game has its own `GameState` Durable Object, addressed by the game ID. This provides:

- Real-time word count tracking (total, used, remaining)
- Game reset functionality
- Consistent state across all players

## Development

### Prerequisites

- Node.js 18+
- npm
- Wrangler CLI (`npm install -g wrangler`)

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
# Build the frontend
npm run build --workspace=packages/web

# Start the dev server
npx wrangler dev
```

### Deploy

```bash
# Build frontend first
npm run build --workspace=packages/web

# Deploy to Cloudflare
npx wrangler deploy
```

## API Endpoints

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| `POST` | `/api/games`                | Create a new game                        |
| `GET`  | `/api/games/:gameId`        | Get game info                            |
| `GET`  | `/api/games/:gameId/stats`  | Get word counts (total, used, remaining) |
| `POST` | `/api/games/:gameId/reset`  | Reset game (mark all phrases unused)     |
| `GET`  | `/api/games/:gameId/phrase` | Draw a random unused phrase              |
| `POST` | `/api/games/:gameId/phrase` | Add a phrase to the game                 |

## License

MIT
