// Historical fact popup. Non-blocking — game continues behind it.
// Vintage newspaper aesthetic.

import { useEffect } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { getFactById } from '../../data/facts.js';

export function FactPopup() {
  const { activeFact, dismissFact } = useGameStore();

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!activeFact) return;
    const timer = setTimeout(dismissFact, 8000);
    return () => clearTimeout(timer);
  }, [activeFact, dismissFact]);

  if (!activeFact) return null;

  const factData = typeof activeFact === 'string' ? getFactById(activeFact) : activeFact;
  if (!factData) return null;

  const typeEmoji = {
    deploy: '📜',
    death: '💀',
    tower: '🏰',
    scenario: '🗺️',
    outcome: '📰',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      style={{ paddingBottom: '120px' }} // avoid card hand
    >
      <div
        className="pointer-events-auto mx-4 max-w-sm w-full animate-slideDown"
        style={{
          animation: 'slideDown 0.3s ease-out',
        }}
      >
        {/* Newspaper-style card */}
        <div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #f5e8c0 0%, #eddba0 50%, #e8d394 100%)',
            border: '3px solid #8B6B2A',
            boxShadow: '0 0 0 1px #C8A050, 0 8px 32px rgba(0,0,0,0.8)',
          }}
        >
          {/* Top rule */}
          <div style={{ height: '3px', background: '#8B6B2A' }} />
          <div style={{ height: '1px', background: '#C8A050', marginBottom: '1px' }} />

          {/* Header */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-start gap-2">
              <span className="text-lg mt-0.5">{typeEmoji[factData.type] || '📜'}</span>
              <h3
                className="font-headline font-black text-stone-900 leading-tight uppercase tracking-wider text-sm flex-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {factData.headline}
              </h3>
            </div>
          </div>

          {/* Separator rule */}
          <div style={{ margin: '0 16px', height: '2px', background: '#8B6B2A', opacity: 0.4 }} />

          {/* Body */}
          <div className="px-4 py-3">
            <p
              className="text-stone-800 text-sm leading-relaxed"
              style={{ fontFamily: "'Special Elite', cursive" }}
            >
              {factData.body}
            </p>

            {factData.source && (
              <p
                className="text-stone-600 text-xs mt-2 italic"
                style={{ fontFamily: "'Special Elite', cursive" }}
              >
                — {factData.source}
              </p>
            )}
          </div>

          {/* Bottom rule */}
          <div style={{ height: '1px', background: '#C8A050', margin: '0 16px' }} />
          <div style={{ height: '2px', background: '#8B6B2A' }} />

          {/* Footer: dismiss hint */}
          <div className="flex items-center justify-between px-4 py-2">
            <span
              className="text-stone-600 text-xs"
              style={{ fontFamily: "'Special Elite', cursive" }}
            >
              Historical Record
            </span>
            <button
              onClick={dismissFact}
              className="text-stone-700 text-xs font-bold uppercase tracking-widest hover:text-stone-900 transition-colors"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dismiss ×
            </button>
          </div>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="mt-1 mx-2 h-1 bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full"
            style={{
              animation: 'shrink 8s linear forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  );
}
