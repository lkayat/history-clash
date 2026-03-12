import { useGameStore } from '../../hooks/useGameState.js';
import { Button } from '../ui/Button.jsx';
import { FactPopup } from '../game/FactPopup.jsx';

const REASON_LABELS = {
  king_tower: 'King Tower destroyed',
  timer: 'Time ran out',
  disconnect: 'Opponent disconnected',
  game: 'Game ended',
};

export function GameOverScreen() {
  const {
    matchResult,
    playerRole,
    session,
    selectedScenario,
    resetGame,
    setScreen,
  } = useGameStore();

  const { winner, reason, scenario } = matchResult || {};
  const isWinner = (playerRole === 'host' && winner === 'host') || (playerRole === 'guest' && winner === 'guest');
  const isDraw = winner === 'draw';

  const handlePlayAgain = () => {
    resetGame();
    setScreen('scenario-select');
  };

  const handleHome = () => {
    resetGame();
    setScreen('home');
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-y-auto px-4 py-8"
      style={{ background: 'radial-gradient(ellipse at center, #1A0A00 0%, #050505 80%)' }}
    >
      {/* Result heading */}
      <div className="text-center mb-6">
        {isDraw ? (
          <>
            <div className="text-6xl mb-3">🤝</div>
            <h1 className="font-headline font-black text-4xl text-stone-400">DRAW</h1>
          </>
        ) : isWinner ? (
          <>
            <div className="text-6xl mb-3">🏆</div>
            <h1 className="font-headline font-black text-4xl text-amber-300">VICTORY!</h1>
          </>
        ) : (
          <>
            <div className="text-6xl mb-3">💀</div>
            <h1 className="font-headline font-black text-4xl text-red-400">DEFEAT</h1>
          </>
        )}
        <p className="font-typewriter text-stone-500 text-sm mt-2">
          {REASON_LABELS[reason] || reason}
        </p>
      </div>

      {/* Historical outcome */}
      {selectedScenario?.historicalOutcome && (
        <div
          className="max-w-md w-full rounded-lg p-4 mb-6"
          style={{
            background: 'linear-gradient(135deg, #f5e8c0 0%, #e8d394 100%)',
            border: '2px solid #8B6B2A',
          }}
        >
          <div className="font-headline font-bold text-stone-800 text-xs uppercase tracking-widest mb-2">
            📰 Historical Outcome
          </div>
          <p className="font-typewriter text-stone-800 text-sm leading-relaxed">
            {selectedScenario.historicalOutcome}
          </p>
        </div>
      )}

      {/* Scenario recap */}
      {selectedScenario && (
        <div className="max-w-md w-full text-center mb-6">
          <p className="font-typewriter text-stone-500 text-xs uppercase tracking-widest">
            Scenario
          </p>
          <p className="font-headline font-bold text-amber-300 text-lg">
            {selectedScenario.name}
          </p>
          <p className="font-typewriter text-stone-400 text-sm">
            {selectedScenario.subtitle}
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button onClick={handlePlayAgain} variant="primary" size="lg" className="w-full">
          ⚔ Play Again
        </Button>
        <Button onClick={handleHome} variant="ghost" size="md" className="w-full">
          ← Main Menu
        </Button>
      </div>

      {/* Fact popup (shows historical outcome fact) */}
      <FactPopup />
    </div>
  );
}
