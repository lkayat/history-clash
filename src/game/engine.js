// Game engine: authoritative tick loop.
// Called 60fps by GameCanvas. Pure functions — returns new state.
// Host runs this authoritatively; guest runs it locally for animation
// and reconciles against host's GAME_STATE broadcast every 2s.

import {
  moveUnit,
  findPriorityTarget,
  distance,
  distanceToTower,
  getSpawnPosition,
  FIELD,
} from './physics.js';
import {
  applyDamage,
  processAttack,
  processHealing,
  applyAuras,
  applyAreaDamage,
  applyGasEffect,
  generateUnitId,
} from './combat.js';

// ─── Game Config ────────────────────────────────────────────────────────────

export const GAME_CONFIG = {
  DECK_SIZE: 8,
  HAND_SIZE: 4,
  MAX_MANPOWER: 10,
  MANPOWER_REGEN_RATE: 1,       // per second, normal
  MANPOWER_REGEN_OT: 2,         // per second, overtime
  MATCH_DURATION: 180,          // seconds
  OVERTIME_DURATION: 120,       // seconds after overtime starts
  STATE_SYNC_INTERVAL: 2000,    // ms
  FACT_AUTODISMISS_DELAY: 8000, // ms
  TOWER_KING_HP: 3000,
  TOWER_CROWN_HP: 2000,
  UNIT_SPRITE_SIZE: 48,         // canvas pixels at 1x scale
};

// ─── Initial State Factory ──────────────────────────────────────────────────

export function createInitialGameState({ scenarioId, hostFaction, guestFaction, hostCards, guestCards }) {
  return {
    scenarioId,
    hostFaction,
    guestFaction,
    phase: 'normal',           // 'normal' | 'overtime' | 'ended'
    timeLeft: GAME_CONFIG.MATCH_DURATION,
    gameTime: 0,               // total elapsed ms

    hostManpower: 5,
    guestManpower: 5,
    hostManpowerAccum: 0,      // fractional accumulator
    guestManpowerAccum: 0,

    // Decks: arrays of card objects from cards/index.js
    hostDeck: [...hostCards],
    guestDeck: [...guestCards],
    // Hands: indices into deck (cards in hand)
    hostHand: [0, 1, 2, 3],
    guestHand: [0, 1, 2, 3],
    hostDeckIndex: 4,
    guestDeckIndex: 4,

    // Live units on the field
    units: [],

    // Active spell/gas effects
    spellEffects: [],

    // Visual effects (temporary, client-side only)
    vfxQueue: [],

    // Towers: 5 per side
    towers: createTowers(),

    // Fact trigger log (prevents duplicate triggers per session)
    triggeredFacts: new Set(),

    winner: null,
    endReason: null,
  };
}

function createTowers() {
  return [
    // Host towers (left side)
    { id: 'host-king',    owner: 'host',  type: 'king',   x: FIELD.HOST_KING_X,        y: FIELD.HEIGHT / 2, hp: GAME_CONFIG.TOWER_KING_HP,   maxHp: GAME_CONFIG.TOWER_KING_HP,   isTower: true, attackRange: 150, attackDamage: 55, attackSpeed: 0.8, lastAttackTime: 0 },
    { id: 'host-crown-1', owner: 'host',  type: 'crown',  x: FIELD.HOST_CROWN_TOP_X,   y: FIELD.LANES[0],   hp: GAME_CONFIG.TOWER_CROWN_HP,  maxHp: GAME_CONFIG.TOWER_CROWN_HP,  isTower: true, attackRange: 130, attackDamage: 40, attackSpeed: 0.7, lastAttackTime: 0 },
    { id: 'host-crown-2', owner: 'host',  type: 'crown',  x: FIELD.HOST_CROWN_BOT_X,   y: FIELD.LANES[1],   hp: GAME_CONFIG.TOWER_CROWN_HP,  maxHp: GAME_CONFIG.TOWER_CROWN_HP,  isTower: true, attackRange: 130, attackDamage: 40, attackSpeed: 0.7, lastAttackTime: 0 },
    // Guest towers (right side)
    { id: 'guest-king',    owner: 'guest', type: 'king',   x: FIELD.GUEST_KING_X,       y: FIELD.HEIGHT / 2, hp: GAME_CONFIG.TOWER_KING_HP,   maxHp: GAME_CONFIG.TOWER_KING_HP,   isTower: true, attackRange: 150, attackDamage: 55, attackSpeed: 0.8, lastAttackTime: 0 },
    { id: 'guest-crown-1', owner: 'guest', type: 'crown',  x: FIELD.GUEST_CROWN_TOP_X,  y: FIELD.LANES[0],   hp: GAME_CONFIG.TOWER_CROWN_HP,  maxHp: GAME_CONFIG.TOWER_CROWN_HP,  isTower: true, attackRange: 130, attackDamage: 40, attackSpeed: 0.7, lastAttackTime: 0 },
    { id: 'guest-crown-2', owner: 'guest', type: 'crown',  x: FIELD.GUEST_CROWN_BOT_X,  y: FIELD.LANES[1],   hp: GAME_CONFIG.TOWER_CROWN_HP,  maxHp: GAME_CONFIG.TOWER_CROWN_HP,  isTower: true, attackRange: 130, attackDamage: 40, attackSpeed: 0.7, lastAttackTime: 0 },
  ];
}

// ─── Main Tick ──────────────────────────────────────────────────────────────

/**
 * Main game tick. Takes current state + delta time (ms).
 * Returns { newState, events[] }
 * events: fact triggers, tower fall, game over
 */
export function tick(state, dt, isHost = true) {
  if (state.phase === 'ended') return { newState: state, events: [] };

  const events = [];
  let s = { ...state };
  s.gameTime += dt;

  // ─── Timer ──────────────────────────────────────────────────────────────
  s.timeLeft = Math.max(0, s.timeLeft - dt / 1000);

  if (s.timeLeft <= 0 && s.phase === 'normal') {
    // Check if anyone is ahead on towers
    const result = checkTimerResult(s);
    if (result !== 'continue') {
      s = endGame(s, result, 'timer');
      events.push({ type: 'MATCH_OVER', winner: result });
      return { newState: s, events };
    }
    // Go to overtime
    s.phase = 'overtime';
    s.timeLeft = GAME_CONFIG.OVERTIME_DURATION;
    events.push({ type: 'OVERTIME_START' });
  }

  if (s.timeLeft <= 0 && s.phase === 'overtime') {
    const result = checkTimerResult(s);
    s = endGame(s, result === 'continue' ? 'draw' : result, 'timer');
    events.push({ type: 'MATCH_OVER', winner: s.winner });
    return { newState: s, events };
  }

  // ─── Manpower Regen ─────────────────────────────────────────────────────
  const regenRate = s.phase === 'overtime' ? GAME_CONFIG.MANPOWER_REGEN_OT : GAME_CONFIG.MANPOWER_REGEN_RATE;
  s.hostManpowerAccum += regenRate * (dt / 1000);
  s.guestManpowerAccum += regenRate * (dt / 1000);

  if (s.hostManpowerAccum >= 1) {
    const gain = Math.floor(s.hostManpowerAccum);
    s.hostManpower = Math.min(GAME_CONFIG.MAX_MANPOWER, s.hostManpower + gain);
    s.hostManpowerAccum -= gain;
  }
  if (s.guestManpowerAccum >= 1) {
    const gain = Math.floor(s.guestManpowerAccum);
    s.guestManpower = Math.min(GAME_CONFIG.MAX_MANPOWER, s.guestManpower + gain);
    s.guestManpowerAccum -= gain;
  }

  // ─── Apply auras ────────────────────────────────────────────────────────
  s.units = applyAuras(s.units);

  // ─── Update spell effects ────────────────────────────────────────────────
  const spellResults = tickSpells(s, dt);
  s = spellResults.state;
  s.units = spellResults.units;
  if (spellResults.events) events.push(...spellResults.events);

  // ─── Update each unit ───────────────────────────────────────────────────
  const unitsResult = tickUnits(s, dt);
  s.units = unitsResult.units;
  s.towers = unitsResult.towers;
  events.push(...unitsResult.events);

  // ─── Tower attacks enemy units ───────────────────────────────────────────
  const towerResult = tickTowers(s, dt);
  s.units = towerResult.units;
  s.towers = towerResult.towers;

  // ─── Healer processing ───────────────────────────────────────────────────
  for (const healer of s.units.filter((u) => u.isHealer && u.state !== 'dead')) {
    const healed = processHealing(healer, s.units, s.gameTime);
    for (const h of healed) {
      s.units = s.units.map((u) => u.id === h.id ? h : u);
    }
    // Update lastHealTime
    s.units = s.units.map((u) => u.id === healer.id ? { ...u, lastHealTime: s.gameTime } : u);
  }

  // ─── Building lifetime ───────────────────────────────────────────────────
  s.units = s.units.map((u) => {
    if (u.type !== 'building' || u.state === 'dead') return u;
    const remaining = u.lifetime - dt / 1000;
    if (remaining <= 0) return { ...u, state: 'dead', hp: 0 };
    return { ...u, lifetime: remaining };
  });

  // ─── Building spawners ───────────────────────────────────────────────────
  const spawnResult = tickSpawners(s, dt);
  s.units = spawnResult.units;

  // ─── Remove dead units (after brief death animation window — just use flag)
  // Keep dead units for 0.5s for death animation, then remove
  s.units = s.units.map((u) => {
    if (u.state !== 'dead') return u;
    const deadFor = (s.gameTime - (u.diedAt || s.gameTime));
    return deadFor > 500 ? null : u;
  }).filter(Boolean);

  // ─── Fact triggers ───────────────────────────────────────────────────────
  for (const event of unitsResult.events) {
    if (event.type === 'FACT_TRIGGER') {
      if (!s.triggeredFacts.has(event.factId)) {
        s.triggeredFacts = new Set([...s.triggeredFacts, event.factId]);
        events.push(event);
      }
    }
  }

  // ─── King tower fell? ────────────────────────────────────────────────────
  const guestKing = s.towers.find((t) => t.id === 'guest-king');
  const hostKing = s.towers.find((t) => t.id === 'host-king');

  if (guestKing?.hp <= 0 && s.phase !== 'ended') {
    s = endGame(s, 'host', 'king_tower');
    events.push({ type: 'MATCH_OVER', winner: 'host' });
  }
  if (hostKing?.hp <= 0 && s.phase !== 'ended') {
    s = endGame(s, 'guest', 'king_tower');
    events.push({ type: 'MATCH_OVER', winner: 'guest' });
  }

  return { newState: s, events };
}

// ─── Unit Tick ───────────────────────────────────────────────────────────────

function tickUnits(state, dt) {
  const events = [];
  let units = [...state.units];
  let towers = [...state.towers];

  for (let i = 0; i < units.length; i++) {
    let unit = units[i];
    if (unit.state === 'dead') continue;
    if (unit.type === 'building') continue; // buildings don't move

    const enemies = units.filter((u) => u.owner !== unit.owner && u.state !== 'dead');
    const target = findPriorityTarget(unit, enemies, towers.filter((t) => t.owner !== unit.owner && t.hp > 0));

    if (target) {
      // Attack
      if (target.isTower) {
        const towerIdx = towers.findIndex((t) => t.id === target.id);
        if (towerIdx >= 0) {
          const { updatedAttacker, updatedTarget, effects } = processAttack(unit, towers[towerIdx], state.gameTime);
          unit = updatedAttacker;
          towers[towerIdx] = updatedTarget;

          if (towers[towerIdx].hp <= 0 && !towers[towerIdx].fell) {
            towers[towerIdx] = { ...towers[towerIdx], fell: true };
            const factId = towers[towerIdx].type === 'king' ? 'king-tower-fall' : 'tower-fall-generic';
            events.push({ type: 'FACT_TRIGGER', factId, triggerType: 'tower' });
            events.push({ type: 'TOWER_FELL', towerId: towers[towerIdx].id });
          }

          // Handle splash
          for (const eff of effects) {
            if (eff.type === 'splash') {
              const splashed = applyAreaDamage({ ...eff, units: units.filter((u) => u.owner !== unit.owner) });
              for (const su of splashed) {
                const idx = units.findIndex((u) => u.id === su.id);
                if (idx >= 0) units[idx] = su;
              }
            }
          }
        }
      } else {
        const targetIdx = units.findIndex((u) => u.id === target.id);
        if (targetIdx >= 0) {
          const { updatedAttacker, updatedTarget, effects } = processAttack(unit, units[targetIdx], state.gameTime);
          unit = updatedAttacker;
          units[targetIdx] = updatedTarget;

          if (units[targetIdx].hp <= 0 && !units[targetIdx].diedAt) {
            units[targetIdx] = { ...units[targetIdx], state: 'dead', diedAt: state.gameTime };
            // Check for leader death fact
            if (units[targetIdx].isLeader) {
              const factId = units[targetIdx].cardId + '-death';
              events.push({ type: 'FACT_TRIGGER', factId, triggerType: 'death', cardId: units[targetIdx].cardId });
            }
          }

          for (const eff of effects) {
            if (eff.type === 'splash') {
              const splashed = applyAreaDamage({ ...eff, units: units.filter((u) => u.owner !== unit.owner) });
              for (const su of splashed) {
                const idx = units.findIndex((u) => u.id === su.id);
                if (idx >= 0) units[idx] = su;
              }
            }
          }
        }
      }
    } else {
      // Move toward enemy
      unit = { ...unit, state: 'walking' };
      const direction = unit.owner === 'host' ? 1 : -1;
      const speed = unit.stats.moveSpeed * (unit.speedMultiplier || 1);
      unit = { ...unit, x: unit.x + direction * speed * (dt / 1000) };
    }

    units[i] = unit;
  }

  // Buildings attack enemies in range
  for (let i = 0; i < units.length; i++) {
    let unit = units[i];
    if (unit.type !== 'building' || unit.state === 'dead') continue;

    const enemies = units.filter((u) => u.owner !== unit.owner && u.state !== 'dead');
    const target = findPriorityTarget(unit, enemies, towers.filter((t) => t.owner !== unit.owner && t.hp > 0));

    if (target) {
      if (target.isTower) {
        const towerIdx = towers.findIndex((t) => t.id === target.id);
        if (towerIdx >= 0) {
          const { updatedAttacker, updatedTarget } = processAttack(unit, towers[towerIdx], state.gameTime);
          units[i] = updatedAttacker;
          towers[towerIdx] = updatedTarget;
        }
      } else {
        const targetIdx = units.findIndex((u) => u.id === target.id);
        if (targetIdx >= 0) {
          const { updatedAttacker, updatedTarget } = processAttack(unit, units[targetIdx], state.gameTime);
          units[i] = updatedAttacker;
          if (units[targetIdx].hp <= 0 && !units[targetIdx].diedAt) {
            units[targetIdx] = { ...updatedTarget, state: 'dead', diedAt: state.gameTime };
          } else {
            units[targetIdx] = updatedTarget;
          }
        }
      }
    }
  }

  return { units, towers, events };
}

// ─── Tower Tick ──────────────────────────────────────────────────────────────

function tickTowers(state, dt) {
  let units = [...state.units];
  let towers = [...state.towers];

  for (let ti = 0; ti < towers.length; ti++) {
    let tower = towers[ti];
    if (tower.hp <= 0) continue;

    // King tower only activates when a crown tower on the same side falls
    if (tower.type === 'king') {
      const crownFell = towers.some(
        (t) => t.owner === tower.owner && t.type === 'crown' && t.hp <= 0
      );
      if (!crownFell) continue;
    }

    // Find closest enemy unit in range
    const enemies = units.filter((u) => u.owner !== tower.owner && u.state !== 'dead' && !u.stats?.isFlying);
    if (enemies.length === 0) continue;

    const inRange = enemies.filter((u) => distanceToTower(u, tower) <= tower.attackRange);
    if (inRange.length === 0) continue;

    const target = inRange.reduce((a, b) =>
      distanceToTower(a, tower) < distanceToTower(b, tower) ? a : b
    );

    // Attack cooldown
    if (state.gameTime - tower.lastAttackTime < 1000 / tower.attackSpeed) continue;

    const targetIdx = units.findIndex((u) => u.id === target.id);
    if (targetIdx < 0) continue;

    const newHp = Math.max(0, units[targetIdx].hp - tower.attackDamage);
    units[targetIdx] = {
      ...units[targetIdx],
      hp: newHp,
      state: newHp <= 0 ? 'dead' : units[targetIdx].state,
      diedAt: newHp <= 0 ? (units[targetIdx].diedAt || state.gameTime) : units[targetIdx].diedAt,
    };
    towers[ti] = { ...tower, lastAttackTime: state.gameTime };
  }

  return { units, towers };
}

// ─── Spell Tick ──────────────────────────────────────────────────────────────

function tickSpells(state, dt) {
  let units = [...state.units];
  let spellEffects = [];
  const events = [];

  for (const spell of state.spellEffects) {
    if (spell.state === 'dead') continue;

    let remaining = spell.lifetime - dt / 1000;
    if (remaining <= 0) continue; // Expired

    // Gas cloud DoT
    if (spell.spellType === 'gas') {
      units = applyGasEffect(spell, units, dt);
    }

    // Slow effect
    if (spell.spellType === 'slow') {
      units = units.map((u) => {
        if (u.owner === spell.owner) return u;
        if (u.state === 'dead') return u;
        if (distance({ x: spell.x, y: spell.y }, u) <= spell.stats.radius) {
          return { ...u, speedMultiplier: 1 - spell.stats.slowAmount };
        }
        return u;
      });
    }

    spellEffects.push({ ...spell, lifetime: remaining });
  }

  return { state: { ...state, spellEffects }, units, events };
}

// ─── Spawner Buildings ────────────────────────────────────────────────────────

function tickSpawners(state, dt) {
  let units = [...state.units];

  for (let i = 0; i < units.length; i++) {
    const unit = units[i];
    if (!unit.stats?.spawnInterval || unit.state === 'dead') continue;

    const nextSpawn = (unit.lastSpawnTime || 0) + unit.stats.spawnInterval * 1000;
    if (state.gameTime < nextSpawn) continue;

    // Spawn a unit
    const spawnCardId = unit.stats.spawnCardId;
    if (spawnCardId && unit.spawnCard) {
      const laneIndex = unit.y === FIELD.LANES[0] ? 0 : 1;
      const pos = getSpawnPosition(unit.owner, laneIndex);
      const newUnit = createUnitFromCard(unit.spawnCard, unit.owner, pos.x, pos.y);
      units.push(newUnit);
      units[i] = { ...unit, lastSpawnTime: state.gameTime };
    }
  }

  return { units };
}

// ─── Card Deployment ─────────────────────────────────────────────────────────

/**
 * Deploy a card onto the field. Returns { newState, events }.
 */
export function deployCard({ state, cardData, owner, laneIndex, x, y }) {
  const events = [];
  let s = { ...state };

  const cost = cardData.cost;
  const manpower = owner === 'host' ? s.hostManpower : s.guestManpower;
  if (manpower < cost) return { newState: s, events }; // Not enough manpower

  // Deduct cost
  if (owner === 'host') s.hostManpower -= cost;
  else s.guestManpower -= cost;

  // Rotate hand
  if (owner === 'host') {
    s = rotateHand(s, 'host', cardData.deckIndex);
  } else {
    s = rotateHand(s, 'guest', cardData.deckIndex);
  }

  const posX = x ?? (owner === 'host' ? FIELD.HOST_CROWN_TOP_X + 60 : FIELD.GUEST_CROWN_TOP_X - 60);
  const posY = y ?? FIELD.LANES[laneIndex ?? 0];

  if (cardData.type === 'unit' || cardData.type === 'building') {
    const unit = createUnitFromCard(cardData, owner, posX, posY);
    s.units = [...s.units, unit];

    // On-deploy effects
    if (cardData.stats?.onDeployEffect) {
      s = applyOnDeployEffect(s, cardData, owner, posX, posY);
    }

    // First-deploy fact trigger
    const factId = cardData.historicalFactIds?.[0];
    if (factId && !s.triggeredFacts.has(factId)) {
      s.triggeredFacts = new Set([...s.triggeredFacts, factId]);
      events.push({ type: 'FACT_TRIGGER', factId, triggerType: 'deploy', cardId: cardData.id });
    }
  } else if (cardData.type === 'spell') {
    const spell = createSpellFromCard(cardData, owner, posX, posY);
    s.spellEffects = [...s.spellEffects, spell];

    const factId = cardData.historicalFactIds?.[0];
    if (factId && !s.triggeredFacts.has(factId)) {
      s.triggeredFacts = new Set([...s.triggeredFacts, factId]);
      events.push({ type: 'FACT_TRIGGER', factId, triggerType: 'deploy', cardId: cardData.id });
    }
  }

  return { newState: s, events };
}

function createUnitFromCard(cardData, owner, x, y) {
  return {
    id: generateUnitId(cardData.id),
    cardId: cardData.id,
    owner,
    x,
    y,
    hp: cardData.stats.hp,
    maxHp: cardData.stats.hp,
    stats: { ...cardData.stats },
    type: cardData.type,
    isLeader: cardData.isLeader || false,
    isHealer: cardData.isHealer || false,
    targetPriority: cardData.targetPriority || 'nearest',
    state: 'walking',
    lastAttackTime: 0,
    lastHealTime: 0,
    diedAt: null,
    svgKey: cardData.svgKey,
    svgWalkKey: cardData.svgWalkKey || cardData.svgKey,
    lifetime: cardData.lifetime || null,
    spawnCard: cardData.stats?.spawnCardId ? cardData : null,
    historicalFactIds: cardData.historicalFactIds || [],
    damageMultiplier: 1,
    speedMultiplier: 1,
  };
}

function createSpellFromCard(cardData, owner, x, y) {
  return {
    id: generateUnitId(cardData.id),
    cardId: cardData.id,
    owner,
    x,
    y,
    stats: { ...cardData.stats },
    type: 'spell',
    spellType: cardData.id.includes('gas') ? 'gas' : cardData.id.includes('slow') ? 'slow' : 'damage',
    lifetime: cardData.stats.duration || 1,
    state: 'active',
    svgKey: cardData.svgKey,
  };
}

function rotateHand(state, owner, usedDeckIndex) {
  const deckKey = owner === 'host' ? 'hostDeck' : 'guestDeck';
  const handKey = owner === 'host' ? 'hostHand' : 'guestHand';
  const idxKey = owner === 'host' ? 'hostDeckIndex' : 'guestDeckIndex';

  const deck = state[deckKey];
  const hand = state[handKey];
  let deckIndex = state[idxKey];

  // Replace used card slot with next card from deck
  const handSlot = hand.indexOf(usedDeckIndex ?? hand[0]);
  const newHand = [...hand];

  if (deckIndex < deck.length) {
    newHand[handSlot >= 0 ? handSlot : 0] = deckIndex;
    deckIndex++;
  } else {
    // Cycle back to beginning (excluding cards currently in hand)
    let next = 0;
    while (newHand.includes(next)) next++;
    newHand[handSlot >= 0 ? handSlot : 0] = next;
  }

  return { ...state, [handKey]: newHand, [idxKey]: deckIndex };
}

function applyOnDeployEffect(state, cardData, owner, x, y) {
  let s = { ...state };
  const effect = cardData.stats.onDeployEffect;

  if (effect === 'grant_manpower') {
    const val = cardData.stats.onDeployValue || 0;
    if (owner === 'host') s.hostManpower = Math.min(GAME_CONFIG.MAX_MANPOWER, s.hostManpower + val);
    else s.guestManpower = Math.min(GAME_CONFIG.MAX_MANPOWER, s.guestManpower + val);
  }

  if (effect === 'double_regen') {
    // Temporary flag — handled in tick
    s[owner === 'host' ? 'hostRegenBoost' : 'guestRegenBoost'] = {
      multiplier: 2,
      until: s.gameTime + (cardData.stats.onDeployDuration || 10) * 1000,
    };
  }

  if (effect === 'triple_regen') {
    s[owner === 'host' ? 'hostRegenBoost' : 'guestRegenBoost'] = {
      multiplier: 3,
      until: s.gameTime + (cardData.stats.onDeployDuration || 8) * 1000,
    };
  }

  return s;
}

// ─── Win condition helpers ────────────────────────────────────────────────────

function checkTimerResult(state) {
  const hostCrowns = state.towers.filter((t) => t.owner === 'host' && t.type === 'crown' && t.hp > 0).length;
  const guestCrowns = state.towers.filter((t) => t.owner === 'guest' && t.type === 'crown' && t.hp > 0).length;

  if (hostCrowns > guestCrowns) return 'guest'; // guest's towers destroyed more
  if (guestCrowns > hostCrowns) return 'host';
  return 'continue'; // tied — overtime or draw
}

function endGame(state, winner, reason) {
  return {
    ...state,
    phase: 'ended',
    winner,
    endReason: reason,
    timeLeft: 0,
  };
}

// ─── Serialisation (for Supabase Realtime sync) ──────────────────────────────

/**
 * Serialize game state for network transmission (strips non-serialisable parts).
 */
export function serializeState(state) {
  return {
    phase: state.phase,
    timeLeft: state.timeLeft,
    gameTime: state.gameTime,
    hostManpower: state.hostManpower,
    guestManpower: state.guestManpower,
    units: state.units.map((u) => ({
      id: u.id,
      cardId: u.cardId,
      owner: u.owner,
      x: u.x,
      y: u.y,
      hp: u.hp,
      maxHp: u.maxHp,
      state: u.state,
      type: u.type,
      isLeader: u.isLeader,
      isHealer: u.isHealer,
      svgKey: u.svgKey,
      svgWalkKey: u.svgWalkKey,
      stats: u.stats,
      targetPriority: u.targetPriority,
      speedMultiplier: u.speedMultiplier,
      damageMultiplier: u.damageMultiplier,
      lifetime: u.lifetime,
      diedAt: u.diedAt,
      lastAttackTime: u.lastAttackTime,
      lastHealTime: u.lastHealTime,
      historicalFactIds: u.historicalFactIds,
    })),
    towers: state.towers.map((t) => ({
      id: t.id,
      hp: t.hp,
      fell: t.fell,
    })),
    spellEffects: state.spellEffects.map((s) => ({
      id: s.id,
      cardId: s.cardId,
      owner: s.owner,
      x: s.x,
      y: s.y,
      lifetime: s.lifetime,
      spellType: s.spellType,
      stats: s.stats,
    })),
    winner: state.winner,
  };
}

/**
 * Reconcile local state with host's authoritative state.
 * Lerps unit positions toward authoritative values.
 */
export function reconcileState(localState, authoritative) {
  // Merge tower HPs
  const towers = localState.towers.map((t) => {
    const auth = authoritative.towers?.find((at) => at.id === t.id);
    if (!auth) return t;
    return { ...t, hp: auth.hp, fell: auth.fell || t.fell };
  });

  // Merge units: lerp positions for existing, add new, remove missing
  const authUnits = authoritative.units || [];
  const mergedUnits = authUnits.map((au) => {
    const local = localState.units.find((u) => u.id === au.id);
    if (!local) {
      // New unit from host — serialized state now includes full stats
      return { ...au };
    }
    // Lerp position: move 30% toward authoritative position
    return {
      ...local,
      hp: au.hp,
      state: au.state,
      x: local.x + (au.x - local.x) * 0.3,
      y: local.y + (au.y - local.y) * 0.3,
    };
  });

  // Merge spell effects from host
  const authSpells = authoritative.spellEffects || [];

  return {
    ...localState,
    phase: authoritative.phase,
    timeLeft: authoritative.timeLeft,
    gameTime: authoritative.gameTime,
    hostManpower: authoritative.hostManpower,
    guestManpower: authoritative.guestManpower,
    towers,
    units: mergedUnits,
    spellEffects: authSpells,
    winner: authoritative.winner,
  };
}
