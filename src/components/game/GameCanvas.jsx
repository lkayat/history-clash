// GameCanvas: integrates canvas rendering with the React lifecycle.
// Game state lives in a useRef (never re-renders canvas via React state).
// Bridges to Zustand every ~100ms for UI overlay updates.

import { useEffect, useRef, useCallback, useState } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { useMultiplayer } from '../../hooks/useMultiplayer.js';
import { buildSpriteCache, svgSprites, svgWalkSprites } from '../../data/svgSprites.js';
import { render } from '../../game/renderer.js';
import {
  createInitialGameState,
  tick,
  deployCard,
  serializeState,
  reconcileState,
  GAME_CONFIG,
} from '../../game/engine.js';
import { getCardsForFaction } from '../../data/cards/index.js';
import { getFactById, getScenarioFact } from '../../data/facts.js';
import { getScenarioById } from '../../data/scenarios.js';
import { Timer } from './Timer.jsx';
import { CardHand } from './CardHand.jsx';
import { FactPopup } from './FactPopup.jsx';

export function GameCanvas({ matchConfig }) {
  const canvasRef = useRef(null);
  const gameStateRef = useRef(null);
  const spriteCacheRef = useRef(null);
  const walkCacheRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const uiSyncRef = useRef(0);
  const syncIntervalRef = useRef(null);
  const loadedRef = useRef(false);
  // Triggers re-render so CardHand receives the real sprite cache after async load
  const [spritesReady, setSpritesReady] = useState(false);

  const {
    playerRole,
    session,
    setScreen,
    setMatchResult,
    setInGameUI,
    enqueueFact,
    clearFacts,
    timeLeft,
    gamePhase,
    myHand,
  } = useGameStore();

  const isHost = playerRole === 'host';

  // ─── Multiplayer ───────────────────────────────────────────────────────
  const {
    broadcastUnitDeployed,
    broadcastGameState,
    broadcastFactTrigger,
    broadcastMatchOver,
  } = useMultiplayer({
    onMatchStart: () => {}, // already in game
    onUnitDeployed: (payload) => {
      if (!gameStateRef.current) return;
      // Guest deploys on host's state; host deploys from guest broadcast
      const { cardData, owner, laneIndex, x, y } = payload;
      if (!cardData) return;
      const { newState } = deployCard({
        state: gameStateRef.current,
        cardData,
        owner,
        laneIndex,
        x,
        y,
      });
      gameStateRef.current = newState;
    },
    onGameState: (authoritativeState) => {
      if (!gameStateRef.current || isHost) return;
      gameStateRef.current = reconcileState(gameStateRef.current, authoritativeState);
    },
    onMatchOver: (payload) => {
      endMatch(payload.winner, payload.reason);
    },
  });

  // ─── Initialise game state + sprites ──────────────────────────────────
  useEffect(() => {
    if (!matchConfig || loadedRef.current) return;
    loadedRef.current = true;

    const { scenarioId, hostFaction, guestFaction } = matchConfig;
    const myFaction = isHost ? hostFaction : guestFaction;
    const opponentFaction = isHost ? guestFaction : hostFaction;

    const myCards = getCardsForFaction(scenarioId, myFaction);
    const oppCards = getCardsForFaction(scenarioId, opponentFaction);
    const hostCards = isHost ? myCards : oppCards;
    const guestCards = isHost ? oppCards : myCards;

    gameStateRef.current = createInitialGameState({
      scenarioId,
      hostFaction,
      guestFaction,
      hostCards: hostCards.slice(0, GAME_CONFIG.DECK_SIZE),
      guestCards: guestCards.slice(0, GAME_CONFIG.DECK_SIZE),
    });

    // Show scenario briefing fact
    const briefing = getScenarioFact(scenarioId, 'scenario');
    if (briefing) {
      setTimeout(() => enqueueFact(briefing), 500);
    }

    // Build sprite caches, then start loop.
    // .finally() ensures the loop starts even if some sprites fail to load.
    Promise.all([
      buildSpriteCache(svgSprites),
      buildSpriteCache(svgWalkSprites),
    ]).then(([stand, walk]) => {
      spriteCacheRef.current = stand;
      walkCacheRef.current = walk;
    }).catch((err) => {
      console.warn('Sprite cache build failed, continuing without art:', err);
    }).finally(() => {
      setSpritesReady(true);
      startGameLoop();
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);
      clearFacts();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Canvas DPI setup ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ─── Game loop ────────────────────────────────────────────────────────
  const startGameLoop = useCallback(() => {
    // Host syncs authoritative state every 2s
    if (isHost) {
      syncIntervalRef.current = setInterval(() => {
        if (gameStateRef.current) {
          broadcastGameState(serializeState(gameStateRef.current));
        }
      }, GAME_CONFIG.STATE_SYNC_INTERVAL);
    }

    const loop = (timestamp) => {
      if (!gameStateRef.current) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      const dt = lastTimeRef.current ? Math.min(timestamp - lastTimeRef.current, 100) : 16;
      lastTimeRef.current = timestamp;

      // Tick (host only runs authoritative tick; guest also ticks for animation)
      const { newState, events } = tick(gameStateRef.current, dt, isHost);
      gameStateRef.current = newState;

      // Handle events
      for (const event of events) {
        if (event.type === 'FACT_TRIGGER') {
          const fact = getFactById(event.factId);
          if (fact) {
            enqueueFact(fact);
            broadcastFactTrigger(fact);
          }
        }
        if (event.type === 'MATCH_OVER' && isHost) {
          broadcastMatchOver(event.winner, 'game');
          endMatch(event.winner, 'game');
        }
      }

      // Draw
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const scenario = getScenarioById(newState.scenarioId);
        render(
          canvas,
          ctx,
          newState,
          spriteCacheRef.current,
          walkCacheRef.current,
          scenario?.backgroundStyle || {},
          isHost ? 'host' : 'guest',
        );
      }

      // Sync UI state every ~100ms
      const now = Date.now();
      if (now - uiSyncRef.current > 100) {
        uiSyncRef.current = now;
        syncUI(newState);
      }

      if (newState.phase !== 'ended') {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [isHost, broadcastGameState, broadcastFactTrigger, broadcastMatchOver, enqueueFact]);

  const syncUI = (state) => {
    const myManpower = isHost ? state.hostManpower : state.guestManpower;
    const myDeck = isHost ? state.hostDeck : state.guestDeck;
    const myHandIndices = isHost ? state.hostHand : state.guestHand;
    const myHand = myHandIndices.map((i) => myDeck[i]).filter(Boolean);

    setInGameUI({
      myManpower: Math.floor(myManpower),
      maxManpower: GAME_CONFIG.MAX_MANPOWER,
      timeLeft: Math.ceil(state.timeLeft),
      gamePhase: state.phase,
      myHand,
      hostTowers: state.towers.filter((t) => t.owner === 'host').map((t) => ({ id: t.id, hp: t.hp, maxHp: t.maxHp, type: t.type })),
      guestTowers: state.towers.filter((t) => t.owner === 'guest').map((t) => ({ id: t.id, hp: t.hp, maxHp: t.maxHp, type: t.type })),
    });
  };

  const endMatch = (winner, reason) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (syncIntervalRef.current) clearInterval(syncIntervalRef.current);

    const scenario = getScenarioById(matchConfig?.scenarioId);
    const outcomeFact = getScenarioFact(matchConfig?.scenarioId, 'outcome');
    if (outcomeFact) enqueueFact(outcomeFact);

    setMatchResult({ winner, reason, scenario });
    setTimeout(() => setScreen('game-over'), 3000);
  };

  // ─── Card deployment ─────────────────────────────────────────────────
  const handleDeploy = useCallback(({ card, laneIndex }) => {
    if (!gameStateRef.current) return;
    const owner = isHost ? 'host' : 'guest';
    const { newState, events } = deployCard({
      state: gameStateRef.current,
      cardData: { ...card, deckIndex: myHand.indexOf(card) },
      owner,
      laneIndex,
    });
    gameStateRef.current = newState;

    // Broadcast to opponent
    broadcastUnitDeployed({ cardData: card, owner, laneIndex });

    // Local fact events
    for (const evt of events) {
      if (evt.type === 'FACT_TRIGGER') {
        const fact = getFactById(evt.factId);
        if (fact) {
          enqueueFact(fact);
          broadcastFactTrigger(fact);
        }
      }
    }
  }, [isHost, myHand, broadcastUnitDeployed, broadcastFactTrigger, enqueueFact]);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-stone-950">
      {/* Game canvas — fills available space */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full"
        style={{ touchAction: 'none', display: 'block' }}
      />

      {/* HUD overlay: timer centered at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pt-2 pointer-events-none z-10">
        <div className="bg-black/60 backdrop-blur-sm rounded-b-xl px-6 py-1 pointer-events-auto">
          <Timer />
        </div>
      </div>

      {/* Card hand at bottom */}
      <div className="bg-stone-950/90 backdrop-blur-sm border-t border-stone-800 py-2 px-3">
        <CardHand
          spriteCache={spritesReady ? spriteCacheRef.current : null}
          onDeploy={handleDeploy}
        />
      </div>

      {/* Historical fact popup */}
      <FactPopup />
    </div>
  );
}
