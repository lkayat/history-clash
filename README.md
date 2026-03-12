# History Clash

An educational real-time strategy game inspired by Clash Royale, themed on European history from the first half of the 20th century (WWI, Russian Revolution, Interwar period, WWII).

Built for two players: share a session code, pick your side, and deploy historical units, leaders, and weapons in a fast-paced lane battle — while learning the real history behind each card.

**Live demo:** _deploy to Vercel (see setup below)_

---

## What It Is

- **2-player real-time multiplayer** via Supabase Realtime WebSockets
- **6 historical scenarios** — era-locked factions with unique card sets
- **96 historical cards** across all scenarios (units, spells, buildings)
- **Named leaders** — Churchill, Lenin, Stalin, Hitler, Roosevelt, Trotsky, Mussolini, and more — with educational framing
- **Historical fact pop-ups** triggered by in-game events (non-blocking)
- **Chibi SVG art** — all units generated as inline SVGs, no external assets
- **Free to deploy** — Vercel frontend + Supabase free tier

---

## Scenarios

| # | Scenario | Era | Factions |
|---|----------|-----|----------|
| 1 | The Western Front | WWI · 1914–1918 | British Entente vs German Reich |
| 2 | The October Revolution | Russia · 1917–1922 | Red Army vs White Guards |
| 3 | Versailles & Its Discontents | Europe · 1919–1938 | Democratic Allies vs Fascist Powers |
| 4 | Fall of France | WWII · May–June 1940 | Franco-British Allies vs Wehrmacht |
| 5 | Operation Barbarossa | WWII · June–Dec 1941 | Red Army vs Wehrmacht |
| 6 | Liberation — D-Day | WWII · June 1944 | Allied Forces vs Wehrmacht |

---

## Game Mechanics

- **Two lanes** — deploy units to top or bottom lane
- **Manpower** (replaces Elixir) — regenerates 1/sec, max 10; 2/sec in overtime
- **8 cards per faction** — 4 shown in hand, cycles as you play
- **Card types:** unit (walks and fights), spell (instant area effect), building (stationary, timed)
- **Win condition:** destroy the enemy King Tower; or most towers destroyed when time runs out
- **3-minute match** + overtime if towers are tied
- **Historical fact pop-ups** appear on card deploys, leader deaths, tower falls — game never pauses

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| State (UI) | Zustand |
| Game rendering | HTML5 Canvas (`useRef` + `requestAnimationFrame`) |
| Multiplayer | Supabase Realtime (broadcast channels) |
| Database | Supabase PostgreSQL |
| Deployment | Vercel (SPA rewrite via `vercel.json`) |

**No paid backend.** Runs entirely within the Supabase and Vercel free tiers.

---

## Architecture

### Game Loop
- Game simulation state lives in `useRef` — never triggers React re-renders
- `requestAnimationFrame` loop: `engine.tick()` → `renderer.draw()` → sync UI to Zustand every ~100ms
- 60fps canvas rendering with no React overhead in the hot path

### Multiplayer (Host-Authoritative)
- **Host** runs the authoritative `tick()` and broadcasts `GAME_STATE` every 2 seconds
- **Guest** runs local animation loop and reconciles against host state (position lerp over 200ms)
- Both clients broadcast `UNIT_DEPLOYED` instantly on card play
- Supabase Realtime channel: `game:<CODE>`

### Realtime Events
| Event | Sender | Purpose |
|-------|--------|---------|
| `MATCH_START` | host | Both clients start game loop |
| `UNIT_DEPLOYED` | either | Instantly spawn unit on both clients |
| `GAME_STATE` | host | Authoritative sync every 2s |
| `FACT_TRIGGER` | either | Show fact popup on both clients |
| `MATCH_OVER` | host | Show game-over screen, update DB |

### Educational Layer
Facts are triggered by:
1. First deployment of each card type in a session
2. Named leader deployed or killed
3. A tower falls
4. Scenario selection (briefing)
5. Match end (historical outcome)

---

## Project Structure

```
src/
├── components/
│   ├── screens/          # HomeScreen, ScenarioSelect, LobbyScreen, GameOverScreen
│   ├── game/             # GameCanvas, CardHand, ElixirBar, Timer, FactPopup
│   └── ui/               # Button, Modal, Card
├── game/
│   ├── engine.js         # tick, deployCard, GAME_CONFIG, win conditions
│   ├── physics.js        # FIELD constants, movement, targeting
│   ├── combat.js         # damage, death, auras
│   └── renderer.js       # all canvas draw calls
├── data/
│   ├── scenarios.js      # 6 scenario definitions
│   ├── facts.js          # 100+ historical facts
│   ├── svgSprites.js     # chibi SVG generation + sprite cache builder
│   └── cards/
│       ├── index.js      # registry + lookup helpers
│       ├── westernFront.js
│       ├── octoberRevolution.js
│       ├── versailles.js
│       ├── fallOfFrance.js
│       ├── barbarossa.js
│       └── liberation.js
├── hooks/
│   ├── useGameState.js   # Zustand store
│   └── useMultiplayer.js # Supabase Realtime + host/guest logic
└── lib/
    └── supabase.js       # client + session helpers
supabase/
└── schema.sql            # run this in Supabase SQL Editor
```

---

## Local Development Setup

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account (free)

### 1. Clone and install

```bash
git clone https://github.com/lkayat/history-clash.git
cd history-clash
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the contents of `supabase/schema.sql`
3. Go to **Project Settings → API** and copy your Project URL and anon key

### 3. Configure environment

```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials:
# VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJ...
```

### 4. Run

```bash
npm run dev
```

Open two browser windows/tabs to test multiplayer locally.

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import this repo
3. Framework preset: **Vite** (auto-detected)
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy — Vercel auto-deploys on every push to `main`

The `vercel.json` SPA rewrite is already configured.

---

## Adding Content

### New Scenario / Era

The data layer is fully data-driven. No engine changes needed.

1. Add `src/data/cards/<newScenario>.js` following the schema in `westernFront.js`
2. Add the scenario to `src/data/scenarios.js`
3. Add sprites to `src/data/svgSprites.js`
4. Add facts to `src/data/facts.js`
5. Register in `src/data/cards/index.js`

**Future era ideas:** Cold War (NATO vs Warsaw Pact), Napoleonic Wars, Colonial Scramble 1880–1914

### New Cards to Existing Scenarios

1. Add a card object to the faction array in the scenario's card file
2. Add an SVG sprite to `svgSprites.js`
3. Add facts to `facts.js`

### Tuning Game Balance

All tunable constants are in `GAME_CONFIG` in `src/game/engine.js`:

```js
export const GAME_CONFIG = {
  DECK_SIZE: 8,
  HAND_SIZE: 4,
  MAX_MANPOWER: 10,
  MANPOWER_REGEN_RATE: 1,       // per second
  MATCH_DURATION: 180,          // seconds
  OVERTIME_DURATION: 120,
  STATE_SYNC_INTERVAL: 2000,    // ms between host GAME_STATE broadcasts
  FACT_AUTODISMISS_DELAY: 8000, // ms
};
```

---

## Card Schema

```js
{
  id: 'tommy-soldier',
  name: 'Tommy',
  cost: 1,                        // manpower cost
  type: 'unit',                   // 'unit' | 'spell' | 'building'
  rarity: 'common',               // 'common' | 'rare' | 'epic' | 'legendary'
  svgKey: 'tommy_soldier',        // key in svgSprites
  description: '...',
  stats: {
    hp: 120,
    damage: 30,
    attackSpeed: 1.2,             // attacks per second
    moveSpeed: 80,                // game units per second
    range: 60,                    // melee range ~60, ranged >200
    splashRadius: 0,              // 0 = single target
    isFlying: false,
    targetsAir: false,
    targetsGround: true,
  },
  targetPriority: 'nearest',      // 'nearest' | 'lowest_hp' | 'highest_damage' | 'buildings'
  placementZone: 'own_half',      // 'own_half' | 'anywhere' | 'enemy_half'
  isLeader: false,
  historicalFactIds: ['fact-tommy-1'],
}
```

---

## Database Schema

```sql
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,        -- 6-char session code
  scenario_id TEXT NOT NULL,
  host_id TEXT NOT NULL,            -- anonymous UUID from localStorage
  guest_id TEXT,
  host_faction TEXT,
  guest_faction TEXT,
  status TEXT DEFAULT 'waiting',    -- waiting | active | finished
  winner TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Branching Strategy

- `main` — always deployable, auto-deploys to Vercel
- `feat/scenario-<name>` — new historical scenario
- `feat/cards-<scenario>` — new cards for existing scenario
- `fix/<issue>` — bug fixes

---

## License

MIT
