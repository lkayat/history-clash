// Physics: unit movement, targeting, collision detection
// All positions are in "game units" (0-1000 width, 0-600 height).
// The renderer maps these to canvas pixels.

export const FIELD = {
  WIDTH: 1000,
  HEIGHT: 600,
  LANE_COUNT: 2,
  // Y centers for the two lanes (as fraction of height)
  LANES: [200, 400],
  // X positions for towers
  HOST_KING_X: 80,
  HOST_CROWN_TOP_X: 140,
  HOST_CROWN_BOT_X: 140,
  GUEST_KING_X: 920,
  GUEST_CROWN_TOP_X: 860,
  GUEST_CROWN_BOT_X: 860,
  MIDFIELD_X: 500,
};

/**
 * Move a unit toward its target by dt seconds.
 * Returns new x position (unit stays on its lane y).
 */
export function moveUnit(unit, dt) {
  if (unit.state === 'attacking' || unit.state === 'dead') return unit;
  const direction = unit.owner === 'host' ? 1 : -1;
  const newX = unit.x + direction * unit.stats.moveSpeed * (dt / 1000);
  return { ...unit, x: newX };
}

/**
 * Find the nearest enemy within range of `unit` from `enemies` array.
 * Returns the enemy unit, or null.
 */
export function findTarget(unit, enemies, towers) {
  // Skip dead units
  const liveEnemies = enemies.filter((e) => e.state !== 'dead' && e.hp > 0);

  let closest = null;
  let closestDist = Infinity;

  for (const enemy of liveEnemies) {
    // Flying units only target other air units if targetsAir, else skip flying
    if (enemy.stats?.isFlying && !unit.stats?.targetsAir) continue;
    if (!enemy.stats?.isFlying && !unit.stats?.targetsGround) continue;

    const dist = distance(unit, enemy);
    if (dist < closestDist) {
      closestDist = dist;
      closest = enemy;
    }
  }

  // Check towers in range too
  for (const tower of towers) {
    if (tower.owner === unit.owner || tower.hp <= 0) continue;
    if (!unit.stats?.targetsGround) continue;
    const dist = distanceToTower(unit, tower);
    if (dist < closestDist) {
      closestDist = dist;
      closest = tower;
    }
  }

  if (closestDist <= unit.stats.range) return closest;
  return null;
}

/**
 * Find target using priority: nearest | tower | lowestHp | air
 */
export function findPriorityTarget(unit, enemies, towers) {
  const liveEnemies = enemies.filter((e) => e.state !== 'dead' && e.hp > 0);
  const liveTowers = towers.filter((t) => t.owner !== unit.owner && t.hp > 0);

  const inRange = [...liveEnemies, ...liveTowers].filter((e) => {
    if (e.isTower) return unit.stats.targetsGround && distanceToTower(unit, e) <= unit.stats.range;
    if (e.stats?.isFlying) return unit.stats.targetsAir && distance(unit, e) <= unit.stats.range;
    return unit.stats.targetsGround && distance(unit, e) <= unit.stats.range;
  });

  if (inRange.length === 0) return null;

  const priority = unit.targetPriority || 'nearest';

  switch (priority) {
    case 'tower': {
      const tower = inRange.find((e) => e.isTower);
      return tower || inRange.reduce((a, b) => dist(unit, a) < dist(unit, b) ? a : b);
    }
    case 'lowestHp':
      return inRange.reduce((a, b) => a.hp < b.hp ? a : b);
    case 'air': {
      const air = inRange.find((e) => e.stats?.isFlying);
      return air || inRange.reduce((a, b) => dist(unit, a) < dist(unit, b) ? a : b);
    }
    case 'nearest':
    default:
      return inRange.reduce((a, b) => dist(unit, a) < dist(unit, b) ? a : b);
  }
}

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function distanceToTower(unit, tower) {
  return Math.hypot(unit.x - tower.x, unit.y - tower.y);
}

function dist(unit, target) {
  if (target.isTower) return distanceToTower(unit, target);
  return distance(unit, target);
}

/**
 * Returns the spawn position for a unit dropped at laneIndex by owner.
 * Owner 'host' spawns on the left, 'guest' on the right.
 */
export function getSpawnPosition(owner, laneIndex) {
  const laneY = FIELD.LANES[laneIndex] ?? FIELD.LANES[0];
  const x = owner === 'host' ? FIELD.HOST_CROWN_TOP_X + 60 : FIELD.GUEST_CROWN_TOP_X - 60;
  return { x, y: laneY };
}

/**
 * Returns the spawn position for a spell/building at a tap coordinate.
 * tapX, tapY are in game coordinates.
 */
export function getDeployPosition(owner, tapX, tapY, cardData) {
  if (cardData.placementZone === 'own-half') {
    const validX = owner === 'host'
      ? Math.min(tapX, FIELD.MIDFIELD_X - 20)
      : Math.max(tapX, FIELD.MIDFIELD_X + 20);
    return { x: validX, y: tapY };
  }
  if (cardData.placementZone === 'enemy-half') {
    const validX = owner === 'host'
      ? Math.max(tapX, FIELD.MIDFIELD_X + 20)
      : Math.min(tapX, FIELD.MIDFIELD_X - 20);
    return { x: validX, y: tapY };
  }
  return { x: tapX, y: tapY };
}

/**
 * Check if a unit has reached an enemy tower (walking past it).
 */
export function hasReachedEnemyBase(unit) {
  if (unit.owner === 'host') return unit.x >= FIELD.GUEST_KING_X;
  return unit.x <= FIELD.HOST_KING_X;
}
