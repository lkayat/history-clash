// Card hand: shows 4 cards at bottom of screen.
// Player taps a card to select it, then taps a lane to deploy.

import { useState } from 'react';
import { useGameStore } from '../../hooks/useGameState.js';
import { CardThumbnail } from '../ui/Card.jsx';
import { ElixirBar } from './ElixirBar.jsx';
import { FIELD } from '../../game/physics.js';

export function CardHand({ spriteCache, onDeploy }) {
  const { myHand, myManpower } = useGameStore();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    const card = myHand[index];
    if (!card) return;
    if (myManpower < card.cost) return; // Not enough manpower

    if (selectedCardIndex === index) {
      setSelectedCardIndex(null); // deselect
    } else {
      setSelectedCardIndex(index);
      // For spell/building with targetArea: wait for canvas tap
      // For unit cards with 2 lanes: show lane buttons
    }
  };

  const handleLaneDeploy = (laneIndex) => {
    if (selectedCardIndex === null) return;
    const card = myHand[selectedCardIndex];
    if (!card) return;
    onDeploy({ card, laneIndex });
    setSelectedCardIndex(null);
  };

  const selectedCard = selectedCardIndex !== null ? myHand[selectedCardIndex] : null;

  return (
    <div className="flex flex-col items-center gap-2 pb-2">
      {/* Lane selection buttons (appears when card selected) */}
      {selectedCard && (
        <div className="flex gap-4 animate-fade-in">
          <button
            onClick={() => handleLaneDeploy(0)}
            className="bg-amber-700/80 border border-amber-500 text-amber-100 font-typewriter text-xs px-4 py-1.5 rounded-full hover:bg-amber-600 transition-colors"
          >
            ↑ Top Lane
          </button>
          <button
            onClick={() => setSelectedCardIndex(null)}
            className="bg-stone-700/80 border border-stone-500 text-stone-300 font-typewriter text-xs px-3 py-1.5 rounded-full hover:bg-stone-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => handleLaneDeploy(1)}
            className="bg-amber-700/80 border border-amber-500 text-amber-100 font-typewriter text-xs px-4 py-1.5 rounded-full hover:bg-amber-600 transition-colors"
          >
            ↓ Bottom Lane
          </button>
        </div>
      )}

      {/* Card row + manpower bar */}
      <div className="flex items-end gap-3">
        {/* Manpower bar */}
        <ElixirBar />

        {/* Cards */}
        <div className="flex gap-2">
          {myHand.map((card, i) => (
            <CardThumbnail
              key={card?.id ?? i}
              card={card}
              spriteCache={spriteCache}
              selected={selectedCardIndex === i}
              disabled={!card || myManpower < card?.cost}
              onClick={() => handleCardClick(i)}
              size="md"
            />
          ))}
        </div>
      </div>

      {/* Selected card tooltip */}
      {selectedCard && (
        <div className="text-center">
          <p className="text-amber-300 font-typewriter text-xs max-w-xs text-center">
            {selectedCard.description}
          </p>
        </div>
      )}
    </div>
  );
}
