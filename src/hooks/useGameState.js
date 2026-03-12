// Zustand store: UI-visible state + screen routing
// Game simulation state lives in GameCanvas useRef (not here).

import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // ─── Navigation ────────────────────────────────────────────────────────
  screen: 'home', // 'home' | 'scenario-select' | 'lobby' | 'game' | 'game-over'
  setScreen: (screen) => set({ screen }),

  // ─── Session ────────────────────────────────────────────────────────────
  session: null,       // { code, scenarioId, hostId, guestId, hostFaction, guestFaction }
  playerRole: null,    // 'host' | 'guest'
  playerId: null,
  setSession: (session) => set({ session }),
  setPlayerRole: (role) => set({ playerRole: role }),
  setPlayerId: (id) => set({ playerId: id }),

  // ─── Scenario / Faction selection ────────────────────────────────────────
  selectedScenario: null,
  selectedFaction: null,
  setSelectedScenario: (scenario) => set({ selectedScenario: scenario }),
  setSelectedFaction: (faction) => set({ selectedFaction: faction }),

  // ─── In-game UI state (bridged from canvas ref every ~100ms) ────────────
  myManpower: 5,
  maxManpower: 10,
  manpowerAccum: 0,
  timeLeft: 180,
  gamePhase: 'normal',   // 'normal' | 'overtime' | 'ended'
  myHand: [],            // array of card objects currently in hand
  hostTowers: [],        // { id, hp, maxHp, type }[]
  guestTowers: [],

  setInGameUI: (uiState) => set((s) => ({ ...s, ...uiState })),

  // ─── Fact popup queue ────────────────────────────────────────────────────
  factQueue: [],
  activeFact: null,

  enqueueFact: (fact) =>
    set((s) => {
      if (!fact) return s;
      if (s.activeFact === null) {
        return { activeFact: fact };
      }
      return { factQueue: [...s.factQueue, fact] };
    }),

  dismissFact: () =>
    set((s) => {
      const next = s.factQueue[0] ?? null;
      return {
        activeFact: next,
        factQueue: s.factQueue.slice(1),
      };
    }),

  clearFacts: () => set({ factQueue: [], activeFact: null }),

  // ─── Game result ─────────────────────────────────────────────────────────
  matchResult: null, // { winner: 'host'|'guest'|'draw', reason: string }
  setMatchResult: (result) => set({ matchResult: result }),

  // ─── Error ───────────────────────────────────────────────────────────────
  error: null,
  setError: (msg) => set({ error: msg }),
  clearError: () => set({ error: null }),

  // ─── Reset for new game ──────────────────────────────────────────────────
  resetGame: () =>
    set({
      session: null,
      playerRole: null,
      selectedScenario: null,
      selectedFaction: null,
      myManpower: 5,
      timeLeft: 180,
      gamePhase: 'normal',
      myHand: [],
      hostTowers: [],
      guestTowers: [],
      factQueue: [],
      activeFact: null,
      matchResult: null,
      error: null,
    }),
}));
