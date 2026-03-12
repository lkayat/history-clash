// Canvas renderer: draws the entire game state each frame.
// All game coordinates are in the 0-1000 x 0-600 field space.
// We scale to canvas pixels using scaleX/scaleY.

import { FIELD } from './physics.js';
import { GAME_CONFIG } from './engine.js';

const UNIT_W = 48;
const UNIT_H = 60;
const TOWER_W = 60;
const TOWER_H = 80;

export function render(canvas, ctx, state, spriteCache, walkSpriteCache, scenarioStyle, playerOwner) {
  if (!canvas || !ctx || !state) return;

  const cw = canvas.width / (window.devicePixelRatio || 1);
  const ch = canvas.height / (window.devicePixelRatio || 1);
  const scaleX = cw / FIELD.WIDTH;
  const scaleY = ch / FIELD.HEIGHT;

  function gx(x) { return x * scaleX; }
  function gy(y) { return y * scaleY; }
  function gs(w) { return w * Math.min(scaleX, scaleY); }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ─── Background ───────────────────────────────────────────────────────────
  drawBackground(ctx, cw, ch, scenarioStyle);

  // ─── Lanes ────────────────────────────────────────────────────────────────
  drawLanes(ctx, gx, gy, cw, ch, scenarioStyle);

  // ─── Midfield line ────────────────────────────────────────────────────────
  ctx.save();
  ctx.setLineDash([8, 8]);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gx(FIELD.MIDFIELD_X), 0);
  ctx.lineTo(gx(FIELD.MIDFIELD_X), ch);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();

  // ─── Spell effects ────────────────────────────────────────────────────────
  drawSpellEffects(ctx, state.spellEffects, gx, gy, gs, state.gameTime);

  // ─── Towers ───────────────────────────────────────────────────────────────
  drawTowers(ctx, state.towers, gx, gy, gs, cw, ch, spriteCache, scaleX);

  // ─── Units ────────────────────────────────────────────────────────────────
  drawUnits(ctx, state.units, gx, gy, gs, spriteCache, walkSpriteCache, state.gameTime, playerOwner);

  // ─── Player side indicator ────────────────────────────────────────────────
  drawSideIndicator(ctx, cw, ch, playerOwner);
}

// ─── Background ──────────────────────────────────────────────────────────────

function drawBackground(ctx, cw, ch, style) {
  // Sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, ch * 0.4);
  skyGrad.addColorStop(0, style.sky || '#6B7A5C');
  skyGrad.addColorStop(1, style.midground || '#5C4A2A');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, cw, ch * 0.4);

  // Ground
  ctx.fillStyle = style.ground || '#4A3A28';
  ctx.fillRect(0, ch * 0.4, cw, ch * 0.6);

  // Ground texture: subtle horizontal lines
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 1;
  for (let y = ch * 0.4; y < ch; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(cw, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLanes(ctx, gx, gy, cw, ch, style) {
  for (const laneY of FIELD.LANES) {
    const cy = gy(laneY);
    // Lane road
    ctx.fillStyle = style.accent || '#8B6B3A';
    ctx.globalAlpha = 0.25;
    ctx.fillRect(0, cy - gs(28, 1), cw, gs(56, 1));
    ctx.globalAlpha = 1;

    // Lane edge lines
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy - gs(28, 1));
    ctx.lineTo(cw, cy - gs(28, 1));
    ctx.moveTo(0, cy + gs(28, 1));
    ctx.lineTo(cw, cy + gs(28, 1));
    ctx.stroke();
    ctx.restore();
  }
}

function gs(w, _scale) { return w; } // placeholder, actual scale applied in render

// ─── Towers ──────────────────────────────────────────────────────────────────

function drawTowers(ctx, towers, gx, gy, gsFunc, cw, ch, spriteCache, scaleX) {
  for (const tower of towers) {
    if (tower.hp <= 0) {
      drawDestroyedTower(ctx, tower, gx, gy, gsFunc);
      continue;
    }

    const cx = gx(tower.x);
    const cy = gy(tower.y);
    const w = gsFunc(tower.type === 'king' ? TOWER_W * 1.3 : TOWER_W);
    const h = gsFunc(tower.type === 'king' ? TOWER_H * 1.3 : TOWER_H);

    const isHostTower = tower.owner === 'host';
    const towerColor = isHostTower ? '#8B7355' : '#5C6B4A';
    const towerAccent = isHostTower ? '#C8A96E' : '#A3B899';
    const battlementColor = isHostTower ? '#A08060' : '#6B7A5A';

    // Tower body
    ctx.fillStyle = towerColor;
    ctx.fillRect(cx - w / 2, cy - h, w, h);

    // Battlements
    ctx.fillStyle = battlementColor;
    const bCount = 5;
    const bW = w / (bCount * 2 - 1);
    for (let i = 0; i < bCount; i++) {
      ctx.fillRect(cx - w / 2 + i * bW * 2, cy - h - bW, bW, bW);
    }

    // Window/embrasure
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(cx - w * 0.15, cy - h * 0.55, w * 0.3, h * 0.25);

    // Crown ornament for king tower
    if (tower.type === 'king') {
      ctx.fillStyle = '#FFD700';
      ctx.font = `${gsFunc(22)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('♛', cx, cy - h - gsFunc(8));
    }

    // Faction flag
    ctx.fillStyle = towerAccent;
    ctx.beginPath();
    ctx.moveTo(cx, cy - h - gsFunc(4));
    ctx.lineTo(cx + gsFunc(14), cy - h - gsFunc(14));
    ctx.lineTo(cx, cy - h - gsFunc(24));
    ctx.closePath();
    ctx.fill();

    // HP bar
    drawHpBar(ctx, cx, cy - h - gsFunc(30), w, gsFunc(8), tower.hp / tower.maxHp, isHostTower ? '#4A7AC8' : '#CC2936');
  }
}

function drawDestroyedTower(ctx, tower, gx, gy, gsFunc) {
  const cx = gx(tower.x);
  const cy = gy(tower.y);
  const w = gsFunc(tower.type === 'king' ? TOWER_W * 1.3 : TOWER_W);
  const h = gsFunc(tower.type === 'king' ? TOWER_H * 0.5 : TOWER_H * 0.4);

  // Rubble
  ctx.fillStyle = '#5A5A5A';
  ctx.fillRect(cx - w / 2, cy - h, w, h);
  ctx.fillStyle = '#3A3A3A';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(
      cx - w / 2 + (i * w * 0.2),
      cy - h * 0.6 + (i % 2 === 0 ? 0 : gsFunc(4)),
      w * 0.18,
      gsFunc(8 + i * 3)
    );
  }

  // Smoke effect
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#888888';
  ctx.beginPath();
  ctx.arc(cx, cy - h - gsFunc(10), gsFunc(15), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ─── Units ────────────────────────────────────────────────────────────────────

function drawUnits(ctx, units, gx, gy, gsFunc, spriteCache, walkSpriteCache, gameTime, playerOwner) {
  // Sort: flying units on top
  const sorted = [...units].sort((a, b) => {
    if (a.stats?.isFlying && !b.stats?.isFlying) return 1;
    if (!a.stats?.isFlying && b.stats?.isFlying) return -1;
    return a.y - b.y;
  });

  for (const unit of sorted) {
    if (unit.state === 'dead') {
      drawDeathEffect(ctx, unit, gx, gy, gsFunc, gameTime);
      continue;
    }

    const cx = gx(unit.x);
    const cy = gy(unit.y);

    // Choose walk vs stand frame
    const isWalking = unit.state === 'walking';
    const walkFrame = Math.floor(gameTime / 300) % 2;
    const cache = (isWalking && walkFrame === 1) ? walkSpriteCache : spriteCache;
    const spriteKey = unit.svgKey;

    // Draw shadow
    if (!unit.stats?.isFlying) {
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(cx, cy + gsFunc(22), gsFunc(18), gsFunc(6), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Flying units hover higher
    const yOffset = unit.stats?.isFlying ? gsFunc(-30) : 0;

    // Draw sprite
    const sprite = cache?.get(spriteKey);
    const w = gsFunc(UNIT_W);
    const h = gsFunc(UNIT_H);

    if (sprite) {
      // Flip guest units horizontally
      ctx.save();
      if (unit.owner === 'guest') {
        ctx.translate(cx, cy + yOffset - h / 2);
        ctx.scale(-1, 1);
        ctx.drawImage(sprite, -w / 2, 0, w, h);
      } else {
        ctx.drawImage(sprite, cx - w / 2, cy + yOffset - h / 2, w, h);
      }
      ctx.restore();
    } else {
      // Fallback: colored rectangle with first letter
      const color = unit.owner === 'host' ? '#8B7355' : '#5C6B4A';
      ctx.fillStyle = color;
      ctx.fillRect(cx - w / 2, cy + yOffset - h / 2, w, h);
      ctx.fillStyle = '#FFF';
      ctx.font = `bold ${gsFunc(16)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText(unit.cardId?.[0]?.toUpperCase() || '?', cx, cy + yOffset);
    }

    // HP bar (only show if damaged)
    if (unit.hp < unit.maxHp) {
      drawHpBar(ctx, cx, cy + yOffset - h / 2 - gsFunc(8), w, gsFunc(5), unit.hp / unit.maxHp,
        unit.owner === 'host' ? '#4A7AC8' : '#CC2936');
    }

    // Leader indicator (star)
    if (unit.isLeader) {
      ctx.fillStyle = '#FFD700';
      ctx.font = `${gsFunc(12)}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText('★', cx, cy + yOffset - h / 2 - gsFunc(14));
    }
  }
}

function drawDeathEffect(ctx, unit, gx, gy, gsFunc, gameTime) {
  if (!unit.diedAt) return;
  const elapsed = gameTime - unit.diedAt;
  if (elapsed > 500) return;

  const cx = gx(unit.x);
  const cy = gy(unit.y);
  const progress = elapsed / 500;

  ctx.save();
  ctx.globalAlpha = 1 - progress;
  ctx.fillStyle = '#FF4444';

  // Explosion particles
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const r = gsFunc(20) * progress;
    const px = cx + Math.cos(angle) * r;
    const py = cy + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(px, py, gsFunc(4) * (1 - progress), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ─── Spell Effects ────────────────────────────────────────────────────────────

function drawSpellEffects(ctx, spellEffects, gx, gy, gsFunc, gameTime) {
  for (const spell of spellEffects) {
    if (spell.state === 'dead') continue;
    const cx = gx(spell.x);
    const cy = gy(spell.y);

    if (spell.spellType === 'gas') {
      ctx.save();
      ctx.globalAlpha = 0.5;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, gsFunc(spell.stats.radius || 80));
      grad.addColorStop(0, 'rgba(180, 220, 80, 0.8)');
      grad.addColorStop(1, 'rgba(100, 180, 40, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, gsFunc(spell.stats.radius || 80), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Swirling effect
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#8BC34A';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        const angle = (gameTime / 1000 + i * 2) % (Math.PI * 2);
        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * gsFunc(20), cy + Math.sin(angle) * gsFunc(15), gsFunc(12), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    } else if (spell.spellType === 'slow') {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = '#4A7AC8';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, gsFunc(spell.stats.radius || 80), 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function drawHpBar(ctx, cx, y, width, height, fraction, color) {
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(cx - width / 2, y, width, height);
  ctx.fillStyle = fraction > 0.5 ? '#4CAF50' : fraction > 0.25 ? '#FF9800' : '#F44336';
  ctx.fillRect(cx - width / 2, y, width * fraction, height);
  ctx.strokeStyle = 'rgba(0,0,0,0.8)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(cx - width / 2, y, width, height);
}

function drawSideIndicator(ctx, cw, ch, playerOwner) {
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = playerOwner === 'host' ? '#4A7AC8' : '#CC2936';
  ctx.fillRect(
    playerOwner === 'host' ? 0 : cw * 0.5,
    0,
    cw * 0.5,
    ch
  );
  ctx.restore();

  // Label
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.fillStyle = '#FFF';
  ctx.font = `bold ${Math.min(cw * 0.018, 14)}px Inter, sans-serif`;
  ctx.textAlign = playerOwner === 'host' ? 'left' : 'right';
  ctx.fillText('YOUR SIDE', playerOwner === 'host' ? 8 : cw - 8, ch - 8);
  ctx.restore();
}

// ─── Minimap / Timer overlay (optional) ──────────────────────────────────────

export function renderHUD(ctx, state, cw, ch) {
  // Timer bar at top
  const timerFraction = state.phase === 'normal'
    ? state.timeLeft / 180
    : state.timeLeft / 120;

  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(cw * 0.3, 6, cw * 0.4, 12);
  ctx.fillStyle = state.phase === 'overtime' ? '#FF6B35' : '#C8A96E';
  ctx.fillRect(cw * 0.3, 6, cw * 0.4 * timerFraction, 12);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 1;
  ctx.strokeRect(cw * 0.3, 6, cw * 0.4, 12);
}
