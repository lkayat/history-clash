// Card thumbnail shown in the player's hand.

const rarityColors = {
  common:    'border-stone-500',
  rare:      'border-blue-500',
  epic:      'border-purple-500',
  legendary: 'border-amber-400',
};

const rarityGlow = {
  common:    '',
  rare:      'shadow-blue-900/50',
  epic:      'shadow-purple-900/50',
  legendary: 'shadow-amber-700/70 shadow-lg',
};

const typeIcon = {
  unit:     '⚔',
  spell:    '✦',
  building: '🏰',
};

export function CardThumbnail({ card, spriteCache, selected, disabled, onClick, size = 'md' }) {
  if (!card) return null;

  const sprite = spriteCache?.get(card.svgKey);
  const rarity = card.rarity || 'common';

  const sizes = {
    sm: { outer: 'w-14 h-18', inner: 'w-10 h-12', cost: 'text-xs', name: 'text-[9px]' },
    md: { outer: 'w-16 h-22', inner: 'w-12 h-14', cost: 'text-sm', name: 'text-[10px]' },
    lg: { outer: 'w-20 h-28', inner: 'w-14 h-18', cost: 'text-base', name: 'text-xs' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div
      onClick={!disabled ? onClick : undefined}
      className={[
        'relative flex flex-col items-center rounded-lg border-2 cursor-pointer transition-all duration-100 overflow-hidden select-none',
        rarityColors[rarity] || rarityColors.common,
        rarityGlow[rarity] || '',
        selected ? 'scale-110 brightness-125 ring-2 ring-amber-400' : '',
        disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:scale-105 hover:brightness-110 active:scale-95',
        s.outer,
        'bg-gradient-to-b from-stone-800 to-stone-900',
      ].join(' ')}
    >
      {/* Cost badge */}
      <div className={`absolute top-1 left-1 bg-blue-800 text-blue-100 ${s.cost} font-bold rounded-full w-5 h-5 flex items-center justify-center z-10 leading-none`}>
        {card.cost}
      </div>

      {/* Type icon */}
      <div className="absolute top-1 right-1 text-[9px] opacity-60 z-10">
        {typeIcon[card.type] || '⚔'}
      </div>

      {/* Sprite or fallback */}
      <div className={`${s.inner} flex items-center justify-center mt-1`}>
        {sprite ? (
          <img
            src={spriteToDataUrl(sprite)}
            alt={card.name}
            className="w-full h-full object-contain"
            draggable={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-stone-700 rounded text-amber-400 text-lg font-bold">
            {typeIcon[card.type] || '?'}
          </div>
        )}
      </div>

      {/* Card name */}
      <div className={`w-full text-center ${s.name} text-stone-300 font-typewriter leading-tight px-0.5 pb-0.5 truncate`}>
        {card.name}
      </div>

      {/* Legendary shimmer overlay */}
      {rarity === 'legendary' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

// Convert HTMLImageElement to data URL for display in <img> src
function spriteToDataUrl(img) {
  if (!img || !img.src) return '';
  return img.src;
}
