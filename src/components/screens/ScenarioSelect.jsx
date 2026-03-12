import { useState } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { scenarios } from '../../data/scenarios.js';
import { Button } from '../ui/Button.jsx';
import { getScenarioFact } from '../../data/facts.js';

export function ScenarioSelect() {
  const { setScreen, setSelectedScenario } = useGameStore();
  const [hoveredScenario, setHoveredScenario] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (scenario) => {
    setSelectedId(scenario.id);
    setSelectedScenario(scenario);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    setScreen('lobby');
  };

  const previewScenario = hoveredScenario || scenarios.find((s) => s.id === selectedId) || scenarios[0];

  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-stone-800">
        <button
          onClick={() => setScreen('home')}
          className="text-stone-500 hover:text-stone-300 font-typewriter text-sm transition-colors"
        >
          ← Back
        </button>
        <h2 className="font-headline font-bold text-amber-300 text-lg tracking-wide">
          Choose a Scenario
        </h2>
        <div className="w-16" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Scenario list */}
        <div className="flex flex-col gap-2 p-3 overflow-y-auto w-56 flex-shrink-0 border-r border-stone-800">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleSelect(scenario)}
              onMouseEnter={() => setHoveredScenario(scenario)}
              onMouseLeave={() => setHoveredScenario(null)}
              className={[
                'text-left p-3 rounded-lg border transition-all duration-150',
                selectedId === scenario.id
                  ? 'border-amber-500 bg-amber-950/40'
                  : 'border-stone-700 bg-stone-900/50 hover:border-stone-500 hover:bg-stone-800/50',
              ].join(' ')}
            >
              <div className="font-headline font-bold text-sm text-amber-200 leading-tight mb-0.5">
                {scenario.name}
              </div>
              <div className="font-typewriter text-xs text-stone-500">
                {scenario.subtitle}
              </div>
              <div className="flex gap-1 mt-1.5">
                {scenario.factions.map((f) => (
                  <span
                    key={f.id}
                    className="text-[10px] font-typewriter rounded px-1.5 py-0.5"
                    style={{ background: f.color + '40', color: f.accentColor, border: `1px solid ${f.color}60` }}
                  >
                    {f.shortName}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Preview panel */}
        {previewScenario && (
          <div className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto">
            {/* Scenario title */}
            <div>
              <h3 className="font-headline font-black text-2xl text-amber-200 mb-1">
                {previewScenario.name}
              </h3>
              <p className="font-typewriter text-amber-600 text-xs tracking-widest uppercase">
                {previewScenario.subtitle} · {previewScenario.mapLabel}
              </p>
            </div>

            {/* Description */}
            <p className="font-typewriter text-stone-300 text-sm leading-relaxed">
              {previewScenario.description}
            </p>

            {/* Briefing */}
            <div
              className="rounded-lg p-4"
              style={{
                background: 'linear-gradient(135deg, #f5e8c0 0%, #eddba0 100%)',
                border: '2px solid #8B6B2A',
              }}
            >
              <div className="font-headline font-bold text-stone-800 text-xs uppercase tracking-widest mb-2">
                Historical Briefing
              </div>
              <p className="font-typewriter text-stone-800 text-xs leading-relaxed">
                {previewScenario.briefing}
              </p>
            </div>

            {/* Factions */}
            <div>
              <h4 className="font-typewriter text-stone-500 text-xs uppercase tracking-widest mb-2">
                Choose Your Side
              </h4>
              <div className="flex gap-3">
                {previewScenario.factions.map((faction) => (
                  <div
                    key={faction.id}
                    className="flex-1 rounded-lg p-3 border"
                    style={{
                      background: faction.color + '20',
                      borderColor: faction.color + '80',
                    }}
                  >
                    <div className="font-headline font-bold text-sm mb-1" style={{ color: faction.accentColor }}>
                      {faction.name}
                    </div>
                    <p className="font-typewriter text-stone-400 text-xs leading-relaxed">
                      {faction.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue button */}
            <div className="mt-auto pt-2">
              <Button
                onClick={handleContinue}
                variant="primary"
                size="lg"
                disabled={!selectedId}
                className="w-full"
              >
                Continue →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
