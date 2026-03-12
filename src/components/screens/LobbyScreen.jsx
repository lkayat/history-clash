import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import {
  createSession,
  joinSession,
  updateSessionGuestFaction,
  getSession,
} from '../../lib/supabase.js';
import { Button } from '../ui/Button.jsx';

export function LobbyScreen({ onMatchStart }) {
  const {
    selectedScenario,
    playerId,
    playerRole,
    setSession,
    setPlayerRole,
    setSelectedFaction,
    setScreen,
    setError,
    error,
  } = useGameStore();

  const [mode, setMode] = useState(null);            // 'create' | 'join'
  const [code, setCode] = useState('');              // code input (join mode)
  const [generatedCode, setGeneratedCode] = useState(''); // code for host
  const [selectedFactionId, setSelectedFactionId] = useState(null);
  const [joinedSession, setJoinedSession] = useState(null); // session from DB
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const factions = selectedScenario?.factions || [];

  // ─── Host: Create session ────────────────────────────────────────────
  const handleCreate = async () => {
    if (!selectedFactionId || !playerId || !selectedScenario) return;
    setLoading(true);
    setError(null);

    const { data, error: err, code: sessionCode } = await createSession({
      scenarioId: selectedScenario.id,
      hostId: playerId,
      hostFaction: selectedFactionId,
    });

    if (err || !data) {
      setError('Could not create session. Check your internet connection.');
      setLoading(false);
      return;
    }

    setGeneratedCode(sessionCode);
    setSession({
      code: sessionCode,
      scenarioId: selectedScenario.id,
      hostId: playerId,
      hostFaction: selectedFactionId,
    });
    setPlayerRole('host');
    setSelectedFaction(factions.find((f) => f.id === selectedFactionId));
    setWaiting(true);
    setLoading(false);
  };

  // ─── Guest: Join session ─────────────────────────────────────────────
  const handleJoin = async () => {
    if (!code.trim() || !playerId) return;
    setLoading(true);
    setError(null);

    const { data, error: err } = await joinSession({ code: code.trim(), guestId: playerId });

    if (err || !data) {
      setError('Session not found, already started, or invalid code.');
      setLoading(false);
      return;
    }

    // Determine which faction is available (the other one)
    const takenFaction = data.host_faction;
    const availableFaction = factions.find((f) => f.id !== takenFaction);

    setJoinedSession(data);
    setSelectedFactionId(availableFaction?.id || null);
    setLoading(false);
  };

  // ─── Guest: Confirm faction and signal ready ──────────────────────────
  const handleGuestReady = async () => {
    if (!joinedSession || !selectedFactionId) return;
    setLoading(true);

    await updateSessionGuestFaction({ code: joinedSession.code, guestFaction: selectedFactionId });

    setSession({
      code: joinedSession.code,
      scenarioId: joinedSession.scenario_id,
      hostId: joinedSession.host_id,
      guestId: playerId,
      hostFaction: joinedSession.host_faction,
      guestFaction: selectedFactionId,
    });
    setPlayerRole('guest');
    setSelectedFaction(factions.find((f) => f.id === selectedFactionId));
    setWaiting(true);
    setLoading(false);
  };

  // ─── Copy code to clipboard ──────────────────────────────────────────
  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // The host listens for MATCH_START via useMultiplayer (in GameCanvas).
  // We just transition to 'game' when it fires.
  // The guest also waits for MATCH_START broadcast.
  // Both are triggered when host's poll detects guest_faction is set.

  // ─── Faction selector ────────────────────────────────────────────────
  const takenFactionId = joinedSession?.host_faction;

  const FactionPicker = ({ disabled: disableTaken = false }) => (
    <div className="flex gap-3">
      {factions.map((faction) => {
        const taken = disableTaken && faction.id === takenFactionId;
        return (
          <button
            key={faction.id}
            onClick={() => !taken && setSelectedFactionId(faction.id)}
            disabled={taken}
            className={[
              'flex-1 p-3 rounded-lg border-2 text-left transition-all duration-150',
              taken ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              selectedFactionId === faction.id
                ? 'scale-105'
                : 'hover:scale-102',
            ].join(' ')}
            style={{
              background: faction.color + '20',
              borderColor: selectedFactionId === faction.id ? faction.accentColor : faction.color + '60',
            }}
          >
            <div className="font-headline font-bold text-sm mb-1" style={{ color: faction.accentColor }}>
              {faction.flagEmoji} {faction.name}
            </div>
            <p className="font-typewriter text-stone-400 text-xs leading-tight">
              {faction.description.substring(0, 80)}…
            </p>
            {taken && (
              <div className="font-typewriter text-xs text-stone-500 mt-1 italic">
                (taken by host)
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div
      className="w-full h-full flex flex-col overflow-y-auto"
      style={{ background: 'radial-gradient(ellipse at center, #1A0A00 0%, #0A0A0A 100%)' }}
    >
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-stone-800">
        <button
          onClick={() => setScreen('scenario-select')}
          className="text-stone-500 hover:text-stone-300 font-typewriter text-sm transition-colors"
        >
          ← Back
        </button>
        <div className="text-center">
          <h2 className="font-headline font-bold text-amber-300 text-base">{selectedScenario?.name}</h2>
          <p className="font-typewriter text-stone-500 text-xs">{selectedScenario?.subtitle}</p>
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        {/* Waiting state */}
        {waiting && (
          <div className="flex flex-col items-center gap-4 py-8">
            {generatedCode && (
              <div className="text-center">
                <p className="font-typewriter text-stone-400 text-sm mb-2">Share this code with your opponent:</p>
                <div className="flex items-center gap-3 justify-center">
                  <span className="font-headline font-black text-5xl text-amber-300 tracking-widest">
                    {generatedCode}
                  </span>
                  <button
                    onClick={copyCode}
                    className="font-typewriter text-xs bg-stone-800 border border-stone-600 text-stone-300 px-3 py-1.5 rounded hover:bg-stone-700 transition-colors"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <p className="font-typewriter text-stone-400 text-sm">Waiting for opponent…</p>
            </div>
          </div>
        )}

        {/* Mode selection */}
        {!mode && !waiting && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-xl text-center">Join or Create?</h3>
            <div className="flex gap-3">
              <Button onClick={() => setMode('create')} variant="primary" size="lg" className="flex-1">
                🏰 Create Game
              </Button>
              <Button onClick={() => setMode('join')} variant="secondary" size="lg" className="flex-1">
                🔑 Join Game
              </Button>
            </div>
          </>
        )}

        {/* Create flow */}
        {mode === 'create' && !waiting && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-lg">Choose your side</h3>
            <FactionPicker />
            {error && (
              <p className="font-typewriter text-red-400 text-xs bg-red-950/30 border border-red-800 rounded p-2">{error}</p>
            )}
            <div className="flex gap-2">
              <Button onClick={() => setMode(null)} variant="ghost" size="md" className="flex-1">Back</Button>
              <Button onClick={handleCreate} variant="primary" size="md" className="flex-1" disabled={!selectedFactionId || loading}>
                {loading ? 'Creating…' : 'Create Game →'}
              </Button>
            </div>
          </>
        )}

        {/* Join flow — step 1: enter code */}
        {mode === 'join' && !joinedSession && !waiting && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-lg">Enter Game Code</h3>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
              placeholder="e.g. SOMME1"
              maxLength={6}
              className="w-full bg-stone-900 border-2 border-stone-600 rounded-lg px-4 py-3 text-amber-200 font-headline text-3xl text-center tracking-[0.3em] uppercase focus:border-amber-500 outline-none placeholder-stone-700"
            />
            {error && (
              <p className="font-typewriter text-red-400 text-xs bg-red-950/30 border border-red-800 rounded p-2">{error}</p>
            )}
            <div className="flex gap-2">
              <Button onClick={() => setMode(null)} variant="ghost" size="md" className="flex-1">Back</Button>
              <Button onClick={handleJoin} variant="primary" size="md" className="flex-1" disabled={code.length < 4 || loading}>
                {loading ? 'Joining…' : 'Find Game →'}
              </Button>
            </div>
          </>
        )}

        {/* Join flow — step 2: confirm faction */}
        {mode === 'join' && joinedSession && !waiting && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-lg">Your Faction</h3>
            <p className="font-typewriter text-stone-400 text-sm">
              The host has chosen <strong className="text-amber-300">{factions.find((f) => f.id === takenFactionId)?.name}</strong>.
              You will play as:
            </p>
            <FactionPicker disabled={true} />
            {error && (
              <p className="font-typewriter text-red-400 text-xs bg-red-950/30 border border-red-800 rounded p-2">{error}</p>
            )}
            <Button onClick={handleGuestReady} variant="primary" size="lg" className="w-full" disabled={!selectedFactionId || loading}>
              {loading ? 'Joining…' : 'Ready! →'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
