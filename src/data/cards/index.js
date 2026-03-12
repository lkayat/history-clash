// Lazy-loaded card data per scenario.
// Engine calls: getCardsForScenario(scenarioId) → { factionId: [...cards] }

import { westernFrontCards } from './westernFront.js';
import { octoberRevolutionCards } from './octoberRevolution.js';
import { versaillesCards } from './versailles.js';
import { fallOfFranceCards } from './fallOfFrance.js';
import { barbarossaCards } from './barbarossa.js';
import { liberationCards } from './liberation.js';

const cardRegistry = {
  'western-front': westernFrontCards,
  'october-revolution': octoberRevolutionCards,
  'versailles-discontents': versaillesCards,
  'fall-of-france': fallOfFranceCards,
  'operation-barbarossa': barbarossaCards,
  liberation: liberationCards,
};

export const getCardsForScenario = (scenarioId) => {
  return cardRegistry[scenarioId] ?? {};
};

export const getCardsForFaction = (scenarioId, factionId) => {
  return cardRegistry[scenarioId]?.[factionId] ?? [];
};

export const getCardById = (scenarioId, factionId, cardId) => {
  return getCardsForFaction(scenarioId, factionId).find((c) => c.id === cardId) ?? null;
};

// Find a card by id across all factions in a scenario (for opponent cards)
export const findCard = (scenarioId, cardId) => {
  const factions = cardRegistry[scenarioId] ?? {};
  for (const faction of Object.values(factions)) {
    const found = faction.find((c) => c.id === cardId);
    if (found) return found;
  }
  return null;
};

export default cardRegistry;
