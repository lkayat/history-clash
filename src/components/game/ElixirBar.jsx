// Manpower (Elixir equivalent) bar.
// Animated fill, changes colour at overtime.

import { useGameStore } from '../../hooks/useGameState.js';

export function ElixirBar() {
  const { myManpower, maxManpower, gamePhase } = useGameStore();

  const fraction = Math.min(1, myManpower / maxManpower);
  const segments = Array.from({ length: maxManpower }, (_, i) => i);
  const isOvertime = gamePhase === 'overtime';

  return (
    <div className="flex flex-col items-center gap-1">
      {/* Label */}
      <div className="flex items-center gap-1.5">
        <span className="text-amber-400 font-typewriter text-sm font-bold">MANPOWER</span>
        <span className="text-white font-bold text-base">{Math.floor(myManpower)}</span>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-0.5">
        {segments.map((i) => {
          const filled = myManpower > i;
          const partialFill = !filled && myManpower > i - 1 ? myManpower - Math.floor(myManpower) : null;

          return (
            <div
              key={i}
              className="relative w-5 h-6 rounded-sm overflow-hidden border border-stone-700"
              style={{ background: '#1a1a2a' }}
            >
              {/* Full fill */}
              {filled && (
                <div
                  className="absolute inset-0 transition-all duration-100"
                  style={{
                    background: isOvertime
                      ? 'linear-gradient(to top, #f97316, #fb923c)'
                      : 'linear-gradient(to top, #3b82f6, #60a5fa)',
                  }}
                />
              )}
              {/* Partial fill (last segment animating) */}
              {partialFill !== null && (
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-100"
                  style={{
                    height: `${partialFill * 100}%`,
                    background: isOvertime
                      ? 'linear-gradient(to top, #f97316, #fb923c)'
                      : 'linear-gradient(to top, #3b82f6, #60a5fa)',
                    opacity: 0.7,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
