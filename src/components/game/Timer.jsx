import { useGameStore } from '../../hooks/useGameState.js';

export function Timer() {
  const { timeLeft, gamePhase } = useGameStore();

  const mins = Math.floor(timeLeft / 60);
  const secs = Math.floor(timeLeft % 60);
  const display = `${mins}:${String(secs).padStart(2, '0')}`;
  const isOT = gamePhase === 'overtime';
  const isLow = timeLeft <= 30 && !isOT;
  const pulse = (isLow || (isOT && timeLeft <= 30));

  return (
    <div className={`flex flex-col items-center ${pulse ? 'animate-pulse' : ''}`}>
      {isOT && (
        <div className="text-orange-400 font-typewriter text-xs font-bold uppercase tracking-widest mb-0.5">
          Overtime
        </div>
      )}
      <div
        className={`font-headline font-black text-2xl tabular-nums ${
          isOT ? 'text-orange-400' : isLow ? 'text-red-400' : 'text-amber-200'
        }`}
      >
        {display}
      </div>
    </div>
  );
}
