import { useGameStore } from '../../hooks/useGameState.js';
import { getOrCreatePlayerId } from '../../lib/supabase.js';
import { Button } from '../ui/Button.jsx';

export function HomeScreen() {
  const { setScreen, setPlayerId, setGameMode } = useGameStore();

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
    </div>
  );
}
