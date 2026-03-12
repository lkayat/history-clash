import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { getScenarioById } from '../../data/scenarios.js';
import { createSession, joinSession, updateSessionGuestFaction, startSession, getSession } from '../../lib/supabase.js';
import { Button } from '../ui/Button.jsx';

export function LobbyScreen() {
  const { gameMode, selectedScenario, playerId, setSession, setPlayerRole, setSelectedScenario, setSelectedFaction, setScreen } = useGameStore();

  const [phase, setPhase] = useState(() => gameMode === 'join' ? 'code-input' : 'faction-pick');
  const [codeInput, setCodeInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [sessionData, setSessionData] = useState(null);
  const [scenario, setScenario] = useState(selectedScenario);
  const [selectedFactionId, setSelectedFactionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef(null);

  const stopPolling = () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } };
  useEffect(() => () => stopPolling(), []);

  // HOST: poll DB for guest_faction being set — this is the core bug fix.
  // Previously this lived in useMultiplayer inside GameCanvas, which was not
  // mounted yet (screen was still 'lobby', not 'game').
  useEffect(() => {
    if (phase !== 'host-waiting') return;
    const poll = async () => {
      const { data } = await getSession(generatedCode);
      if (data?.guest_id && data?.guest_faction) {
        stopPolling();
        await startSession(generatedCode);
        const current = useGameStore.getState().session;
        setSession({ ...current, guestId: data.guest_id, guestFaction: data.guest_faction });
        setScreen('game');
      }
    };
    pollRef.current = setInterval(poll, 2000);
    poll();
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // GUEST: poll DB for status=active (set by host after detecting guest_faction)
  useEffect(() => {
    if (phase !== 'guest-waiting' || !sessionData) return;
    const poll = async () => {
      const { data } = await getSession(sessionData.code);
      if (data?.status === 'active') { stopPolling(); setScreen('game'); }
    };
    pollRef.current = setInterval(poll, 2000);
    poll();
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sessionData]);

  const handleCreate = async () => {
    if (!selectedFactionId || !playerId || !scenario) return;
    setLoading(true); setError(null);
    const { data, error: err, code } = await createSession({ scenarioId: scenario.id, hostId: playerId, hostFaction: selectedFactionId });
    if (err || !data) { setError('Could not create session. Check your connection.'); setLoading(false); return; }
    setGeneratedCode(code);
    setSession({ code, scenarioId: scenario.id, hostId: playerId, hostFaction: selectedFactionId });
    setPlayerRole('host');
    setSelectedFaction(scenario.factions.find((f) => f.id === selectedFactionId));
    setLoading(false); setPhase('host-waiting');
  };

  const handleJoin = async () => {
    const trimmed = codeInput.trim().toUpperCase();
    if (trimmed.length < 4 || !playerId) return;
    setLoading(true); setError(null);
    const { data, error: err } = await joinSession({ code: trimmed, guestId: playerId });
    if (err || !data) { setError('Game not found. Check the code and try again.'); setLoading(false); return; }
    const resolved = getScenarioById(data.scenario_id);
    setScenario(resolved); setSelectedScenario(resolved); setSessionData(data);
    const available = resolved?.factions.find((f) => f.id !== data.host_faction);
    setSelectedFactionId(available?.id ?? null);
    setLoading(false); setPhase('faction-confirm');
  };

  const handleGuestReady = async () => {
    if (!sessionData || !selectedFactionId) return;
    setLoading(true); setError(null);
    const { error: err } = await updateSessionGuestFaction({ code: sessionData.code, guestFaction: selectedFactionId });
    if (err) { setError('Failed to join. Try again.'); setLoading(false); return; }
    setSession({ code: sessionData.code, scenarioId: sessionData.scenario_id, hostId: sessionData.host_id, guestId: playerId, hostFaction: sessionData.host_faction, guestFaction: selectedFactionId });
    setPlayerRole('guest');
    setSelectedFaction(scenario?.factions.find((f) => f.id === selectedFactionId));
    setLoading(false); setPhase('guest-waiting');
  };

  const copyCode = () => navigator.clipboard.writeText(generatedCode).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  const factions = scenario?.factions ?? [];

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto" style={{ background: 'radial-gradient(ellipse at center, #1A0A00 0%, #0A0A0A 100%)' }}>
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-stone-800">
        <button
          onClick={() => { stopPolling(); setScreen(gameMode === 'join' ? 'home' : 'scenario-select'); }}
          disabled={phase === 'host-waiting' || phase === 'guest-waiting'}
          className="text-stone-500 hover:text-stone-300 font-typewriter text-sm transition-colors disabled:opacity-0"
        >← Back</button>
        <div className="text-center">
          {scenario ? (
            <>
              <h2 className="font-headline font-bold text-amber-300 text-base">{scenario.name}</h2>
              <p className="font-typewriter text-stone-500 text-xs">{scenario.subtitle}</p>
            </>
          ) : <h2 className="font-headline font-bold text-amber-300 text-base">Join a Game</h2>}
        </div>
        <div className="w-16" />
      </div>

      <div className="flex-1 p-4 flex flex-col gap-4 max-w-lg mx-auto w-full">

        {phase === 'faction-pick' && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-lg">Choose your side</h3>
            <div className="flex gap-3">
              {factions.map((faction) => (
                <button
                  key={faction.id}
                  onClick={() => setSelectedFactionId(faction.id)}
                  className={['flex-1 p-3 rounded-lg border-2 text-left transition-all duration-150 cursor-pointer', selectedFactionId === faction.id ? 'scale-105' : 'hover:scale-102'].join(' ')}
                  style={{ background: faction.color + '20', borderColor: selectedFactionId === faction.id ? faction.accentColor : faction.color + '60' }}
                >
                  <div className="font-headline font-bold text-sm mb-1" style={{ color: faction.accentColor }}>{faction.flagEmoji} {faction.name}</div>
                  <p className="font-typewriter text-stone-400 text-xs leading-tight">{faction.description.substring(0, 80)}…</p>
                </button>
              ))}
            </div>
            {error && <ErrorBox msg={error} />}
            <Button onClick={handleCreate} variant="primary" size="lg" className="w-full" disabled={!selectedFactionId || loading}>
              {loading ? 'Creating…' : 'Create Game →'}
            </Button>
          </>
        )}

        {phase === 'host-waiting' && (
          <div className="flex flex-col items-center gap-6 py-8">
            <p className="font-typewriter text-stone-400 text-sm">Share this code with your opponent:</p>
            <div className="flex items-center gap-3">
              <span className="font-headline font-black text-5xl text-amber-300 tracking-widest">{generatedCode}</span>
              <button onClick={copyCode} className="font-typewriter text-xs bg-stone-800 border border-stone-600 text-stone-300 px-3 py-2 rounded hover:bg-stone-700 transition-colors">
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <Spinner />
              <p className="font-typewriter text-stone-400 text-sm">Waiting for opponent to join…</p>
            </div>
            <p className="font-typewriter text-stone-600 text-xs text-center max-w-xs">Your opponent taps "Join with Code" on the home screen and types this code.</p>
          </div>
        )}

        {phase === 'code-input' && (
          <>
            <h3 className="font-headline font-bold text-amber-200 text-xl text-center">Enter Game Code</h3>
            <p className="font-typewriter text-stone-500 text-sm text-center">Ask your opponent for the code shown on their screen.</p>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
              onKeyDown={(e) => e.key === 'Enter' && codeInput.length >= 4 && handleJoin()}
              placeholder="XXXXXX"
              maxLength={6}
              autoFocus
              className="w-full bg-stone-900 border-2 border-stone-600 rounded-lg px-4 py-3 text-amber-200 font-headline text-3xl text-center tracking-[0.3em] uppercase focus:border-amber-500 outline-none placeholder-stone-700"
            />
            {error && <ErrorBox msg={error} />}
            <Button onClick={handleJoin} variant="primary" size="lg" className="w-full" disabled={codeInput.length < 4 || loading}>
              {loading ? 'Finding game…' : 'Join Game →'}
            </Button>
          </>
        )}

        {phase === 'faction-confirm' && scenario && (
          <>
            <div className="rounded-lg p-3" style={{ background: 'linear-gradient(135deg, #f5e8c0 0%, #eddba0 100%)', border: '2px solid #8B6B2A' }}>
              <p className="font-headline font-bold text-stone-800 text-xs uppercase tracking-widest mb-1">{scenario.name} · {scenario.subtitle}</p>
              <p className="font-typewriter text-stone-700 text-xs leading-relaxed">{scenario.briefing}</p>
            </div>
            <h3 className="font-headline font-bold text-amber-200 text-lg">Your Faction</h3>
            <p className="font-typewriter text-stone-400 text-sm">
              The host chose <strong className="text-amber-300">{factions.find((f) => f.id === sessionData?.host_faction)?.name}</strong>. You will play as:
            </p>
            {factions.filter((f) => f.id === selectedFactionId).map((faction) => (
              <div key={faction.id} className="p-4 rounded-lg border-2" style={{ background: faction.color + '25', borderColor: faction.accentColor }}>
                <div className="font-headline font-bold text-base mb-1" style={{ color: faction.accentColor }}>{faction.flagEmoji} {faction.name}</div>
                <p className="font-typewriter text-stone-400 text-sm leading-relaxed">{faction.description}</p>
              </div>
            ))}
            {error && <ErrorBox msg={error} />}
            <Button onClick={handleGuestReady} variant="primary" size="lg" className="w-full" disabled={!selectedFactionId || loading}>
              {loading ? 'Joining…' : "I'm Ready →"}
            </Button>
          </>
        )}

        {phase === 'guest-waiting' && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex items-center gap-3"><Spinner /><p className="font-typewriter text-stone-400 text-sm">Waiting for host to start…</p></div>
            {scenario && <p className="font-typewriter text-stone-600 text-xs text-center">{scenario.name} · {scenario.subtitle}</p>}
          </div>
        )}

      </div>
    </div>
  );
}

function Spinner() {
  return <div className="w-4 h-4 rounded-full border-2 border-amber-500 border-t-transparent animate-spin flex-shrink-0" />;
}

function ErrorBox({ msg }) {
  return <p className="font-typewriter text-red-400 text-xs bg-red-950/30 border border-red-800 rounded p-2">{msg}</p>;
}
