// Combat: damage resolution, death detection, special effects

import { distance } from './physics.js';

/**
 * Apply damage to a target unit.
 * Returns updated target object. Does NOT mutate.
 */
export function applyDamage(target, damage) {
  const newHp = Math.max(0, target.hp - damage);
  return { ...target, hp: newHp, state: newHp <= 0 ? 'dead' : target.state };
}

/**
 * Process an attack from `attacker` against `target`.
 * Returns { updatedAttacker, updatedTarget, effects[] }
 */
export function processAttack(attacker, target, gameTime) {
  const effects = [];

  // Check attack cooldown
  if (gameTime - (attacker.lastAttackTime || 0) < 1000 / attacker.stats.attackSpeed) {
    return { updatedAttacker: attacker, updatedTarget: target, effects };
  }

  let damage = attacker.stats.damage;

  // Apply aura damage boost if attacker has one (from ally leader nearby)
  if (attacker.damageMultiplier) {
    damage = Math.round(damage * attacker.damageMultiplier);
  }

  let updatedTarget = target;

  // Splash damage
  if (attacker.stats.splashRadius > 0 && target.isTower === undefined) {
    // Splash is handled by the engine tick across all units in radius
    effects.push({
      type: 'splash',
      x: target.x,
      y: target.y,
      radius: attacker.stats.splashRadius,
      damage,
      sourceOwner: attacker.owner,
    });
  } else {
    updatedTarget = applyDamage(target, damage);
  }

  // Attack visual effect
  effects.push({
    type: 'attack_vfx',
    x: target.x,
    y: target.y,
    vfxType: attacker.stats.isFlying ? 'bomb' : 'bullet',
  });

  const updatedAttacker = {
    ...attacker,
    lastAttackTime: gameTime,
    state: 'attacking',
  };

  return { updatedAttacker, updatedTarget, effects };
}

/**
 * Process healing from a healer unit to all nearby friendlies.
 * Returns array of updated units (healed).
 */
export function processHealing(healer, allUnits, gameTime) {
  if (!healer.isHealer) return [];
  if (gameTime - (healer.lastHealTime || 0) < healer.stats.healInterval * 1000) return [];

  const healed = [];
  for (const unit of allUnits) {
    if (unit.owner !== healer.owner) continue;
    if (unit.state === 'dead') continue;
    if (unit.id === healer.id) continue;
    const dist = distance(healer, unit);
    if (dist <= healer.stats.healRadius) {
      const maxHp = unit.stats.hp * (unit.hpMultiplier || 1);
      const newHp = Math.min(maxHp, unit.hp + healer.stats.healAmount);
      healed.push({ ...unit, hp: newHp });
    }
  }

  return healed;
}

/**
 * Apply aura effects from all leader/aura units to all units.
 * Mutates a copy of the units array with applied buffs.
 * Buffs are transient — recalculated each tick.
 */
export function applyAuras(units) {
  // Reset transient multipliers
  const reset = units.map((u) => ({
    ...u,
    damageMultiplier: 1,
    speedMultiplier: 1,
    hpMultiplier: u.hpMultiplier || 1, // HP multiplier is permanent once applied
  }));

  for (const source of reset) {
    if (!source.stats.auraRadius) continue;
    if (source.state === 'dead') continue;

    for (let i = 0; i < reset.length; i++) {
      const target = reset[i];
      if (target.owner !== source.owner) continue;
      if (target.id === source.id) continue;
      if (distance(source, target) > source.stats.auraRadius) continue;

      // Aura: damage boost
      if (source.stats.auraDamageBoost) {
        reset[i] = {
          ...reset[i],
          damageMultiplier: (reset[i].damageMultiplier || 1) * (1 + source.stats.auraDamageBoost),
        };
      }
      // Aura: move boost
      if (source.stats.auraMoveBoost) {
        reset[i] = {
          ...reset[i],
          speedMultiplier: (reset[i].speedMultiplier || 1) * (1 + source.stats.auraMoveBoost),
        };
      }
    }
  }

  return reset;
}

/**
 * Apply area-of-effect damage to all units within radius.
 * Returns array of updated units.
 */
export function applyAreaDamage({ x, y, radius, damage, sourceOwner, units }) {
  return units.map((unit) => {
    if (unit.owner === sourceOwner) return unit; // Don't damage own units
    if (unit.state === 'dead') return unit;
    if (unit.stats?.gasImmune && damage === 'gas') return unit;
    if (distance({ x, y }, unit) <= radius) {
      return applyDamage(unit, damage);
    }
    return unit;
  });
}

/**
 * Apply poison gas DoT (damage over time).
 * Returns updated units.
 */
export function applyGasEffect(gasCloud, units, dt) {
  if (gasCloud.state === 'dead' || (gasCloud.lifetime || 0) <= 0) return units;
  return units.map((unit) => {
    if (unit.owner === gasCloud.owner) return unit;
    if (unit.state === 'dead') return unit;
    if (unit.stats?.gasImmune) return unit;
    const dist = distance(gasCloud, unit);
    if (dist <= gasCloud.stats.radius) {
      const tickDamage = gasCloud.stats.damage * gasCloud.stats.tickRate * (dt / 1000);
      return applyDamage(unit, tickDamage);
    }
    return unit;
  });
}

/**
 * Generate a unique unit ID.
 */
let unitCounter = 0;
export function generateUnitId(cardId) {
  return `${cardId}_${Date.now()}_${unitCounter++}`;
}
