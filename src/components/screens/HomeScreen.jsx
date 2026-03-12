import { useState } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { getOrCreatePlayerId } from '../../lib/supabase.js';
import { Button } from '../ui/Button.jsx';

export function HomeScreen() {
  const { setScreen, setPlayerId, setGameMode } = useGameStore();
  const [showHelp, setShowHelp] = useState(false);

  const init = () => {
    const id = getOrCreatePlayerId();
    setPlayerId(id);
  };

  const handleCreate = () => {
    init();
    setGameMode('create');
    setScreen('scenario-select');
  };

  const handleJoin = () => {
    init();
    setGameMode('join');
    setScreen('lobby');
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center top, #2C1A0A 0%, #0A0A0A 70%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Barbed wire silhouette top */}
        <div className="absolute top-0 left-0 right-0 h-8 opacity-20"
          style={{ background: 'repeating-linear-gradient(90deg, #8B6B3A 0, #8B6B3A 2px, transparent 2px, transparent 20px)' }}
        />
        {/* Fog effect bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
          style={{ background: 'linear-gradient(to top, #1A1A1A, transparent)' }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Title */}
        <div>
          <p className="font-typewriter text-amber-600 text-sm tracking-[0.3em] uppercase mb-2">
            Educational Strategy Game
          </p>
          <h1
            className="font-headline font-black text-amber-100 leading-none"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', textShadow: '0 2px 20px rgba(139,107,58,0.5)' }}
          >
            HISTORY
          </h1>
          <h1
            className="font-headline font-black leading-none"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              color: '#CC2936',
              textShadow: '0 2px 20px rgba(204,41,54,0.5)',
            }}
          >
            CLASH
          </h1>
          <div className="flex items-center gap-3 justify-center mt-2">
            <div className="h-px bg-amber-700 flex-1 max-w-16" />
            <p className="font-typewriter text-amber-600 text-xs tracking-widest uppercase">
              Europe · 1914–1945
            </p>
            <div className="h-px bg-amber-700 flex-1 max-w-16" />
          </div>
        </div>

        {/* Description */}
        <p className="font-typewriter text-stone-400 text-sm max-w-xs leading-relaxed">
          Deploy historical units, leaders &amp; weapons across six scenarios
          — and learn the history that shaped our world.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button onClick={handleCreate} variant="primary" size="xl" className="w-full">
            ⚔ Create Game
          </Button>
          <Button onClick={handleJoin} variant="secondary" size="lg" className="w-full">
            🔑 Join with Code
          </Button>
          <button
            onClick={() => setShowHelp(true)}
            className="font-typewriter text-stone-500 hover:text-stone-300 text-sm transition-colors underline underline-offset-2"
          >
            ? How to Play
          </button>
        </div>

        {/* Era labels */}
        <div className="flex flex-wrap gap-2 justify-center mt-2">
          {['WWI 1914–18', 'Russian Revolution', 'Interwar 1919–38', 'WWII 1939–45'].map((era) => (
            <span
              key={era}
              className="font-typewriter text-xs text-stone-500 border border-stone-700 rounded-full px-3 py-1"
            >
              {era}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="font-typewriter text-stone-600 text-xs">
          Two-player · Real-time · Historical facts
        </p>
      </div>

      {/* How to Play modal */}
      {showHelp && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-xl border-2 border-amber-800"
            style={{ background: 'linear-gradient(160deg, #f5e8c0 0%, #e8d394 100%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Newspaper header */}
            <div className="sticky top-0 flex items-center justify-between px-5 pt-4 pb-2 border-b-2 border-amber-800" style={{ background: '#f5e8c0' }}>
              <h2 className="font-headline font-black text-stone-800 text-xl tracking-wide">How to Play</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="font-headline font-bold text-stone-600 hover:text-stone-900 text-xl leading-none transition-colors"
              >✕</button>
            </div>

            <div className="px-5 py-4 flex flex-col gap-4 font-typewriter text-stone-800 text-sm leading-relaxed">

              <Section title="Objective">
                Destroy your opponent&apos;s <strong>King Tower</strong>. If time runs out, the player with more Crown Towers standing wins. Tied towers leads to Overtime.
              </Section>

              <Section title="Manpower">
                You have up to <strong>10 Manpower</strong> (the bar at the bottom left). It regenerates 1 per second — 2 per second in Overtime. Each card costs Manpower to deploy. Grey cards mean you can&apos;t afford them yet.
              </Section>

              <Section title="Deploying Cards">
                <ol className="list-decimal list-inside space-y-1">
                  <li>Tap a card in your hand to select it.</li>
                  <li>Choose <strong>Top Lane</strong> or <strong>Bottom Lane</strong>.</li>
                  <li>Your unit marches toward the enemy and attacks automatically.</li>
                </ol>
              </Section>

              <Section title="Card Types">
                <ul className="space-y-1">
                  <li><strong>⚔ Unit</strong> — soldiers, tanks, cavalry that walk and fight.</li>
                  <li><strong>💥 Spell</strong> — instant area effect (gas, artillery, bombers).</li>
                  <li><strong>🏰 Building</strong> — stationary structures that attack or spawn troops.</li>
                </ul>
              </Section>

              <Section title="Towers">
                <ul className="space-y-1">
                  <li><strong>Crown Towers</strong> — your two forward defences. They attack enemies in range.</li>
                  <li><strong>King Tower</strong> — your base. Only activates to shoot when a Crown Tower falls. Destroying it ends the game instantly.</li>
                </ul>
              </Section>

              <Section title="Cards Cycle">
                You have a deck of 8 cards. Four are shown at a time. When you play a card, the next card from your deck slides into your hand automatically — you never run out.
              </Section>

              <Section title="Historical Facts">
                Every time you deploy a new unit type, a <strong>historical fact popup</strong> appears in the corner. The game keeps running — read it or ignore it. Named leaders (Churchill, Stalin, Lenin…) trigger special facts when deployed or killed.
              </Section>

              <Section title="Multiplayer">
                <ol className="list-decimal list-inside space-y-1">
                  <li><strong>Host</strong>: tap Create Game, pick a scenario and your faction, share the code.</li>
                  <li><strong>Guest</strong>: tap Join with Code, enter the code, confirm your faction.</li>
                  <li>Both players see the same battlefield in real time.</li>
                </ol>
              </Section>

              <div className="text-center pt-2 pb-1">
                <button
                  onClick={() => setShowHelp(false)}
                  className="font-headline font-bold text-amber-800 hover:text-amber-600 text-sm uppercase tracking-widest transition-colors"
                >
                  — Close —
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-headline font-bold text-stone-800 text-xs uppercase tracking-widest mb-1 border-b border-amber-700 pb-0.5">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
