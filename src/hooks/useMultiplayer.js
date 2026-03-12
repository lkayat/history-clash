// Supabase Realtime multiplayer hook.
// Manages channel subscription, message dispatch, host/guest logic,
// session join polling, and disconnect detection.

import { useEffect, useRef, useCallback } from 'react';
import { supabase, getSession, finishSession } from '../lib/supabase.js';
import { useGameStore } from './useGameState.js';

export const EVENTS = {
  MATCH_START: 'MATCH_START',
  UNIT_DEPLOYED: 'UNIT_DEPLOYED',
  GAME_STATE: 'GAME_STATE',
  FACT_TRIGGER: 'FACT_TRIGGER',
  MATCH_OVER: 'MATCH_OVER',
  PING: 'PING',
};

export function useMultiplayer({ onMatchStart, onUnitDeployed, onGameState, onMatchOver }) {
  const channelRef = useRef(null);
  const pollRef = useRef(null);
  const { session, playerRole, playerId, setScreen, setMatchResult, enqueueFact } = useGameStore();

  // ─── Subscribe to channel ──────────────────────────────────────────────
  useEffect(() => {
    if (!session?.code) return;

    const channelName = `game:${session.code}`;

    const channel = supabase.channel(channelName, {
      config: { presence: { key: playerId } },
    });

    channel
      .on('broadcast', { event: '*' }, ({ event, payload }) => {
        handleIncoming(event, payload);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        handlePresenceLeave(leftPresences);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          channel.track({ playerId, role: playerRole, joinedAt: Date.now() });
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
      channelRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.code, playerId]);

  // ─── Host: poll for guest joining ─────────────────────────────────────
  useEffect(() => {
    if (playerRole !== 'host' || !session?.code) return;

    let guestDetected = false;

    const poll = async () => {
      if (guestDetected) return;
      const { data } = await getSession(session.code);
      if (data?.guest_id && data?.guest_faction) {
        guestDetected = true;
        clearInterval(pollRef.current);
        // Broadcast match start
        broadcast(EVENTS.MATCH_START, {
          scenarioId: session.scenarioId,
          hostFaction: session.hostFaction,
          guestFaction: data.guest_faction,
          hostId: session.hostId,
          guestId: data.guest_id,
          code: session.code,
        });
        if (onMatchStart) {
          onMatchStart({
            scenarioId: session.scenarioId,
            hostFaction: session.hostFaction,
            guestFaction: data.guest_faction,
            hostId: session.hostId,
            guestId: data.guest_id,
          });
        }
      }
    };

    pollRef.current = setInterval(poll, 2000);
    poll(); // immediate first check

    return () => clearInterval(pollRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerRole, session?.code]);

  // ─── Incoming message handler ─────────────────────────────────────────
  const handleIncoming = useCallback((event, payload) => {
    if (!payload) return;

    switch (event) {
      case EVENTS.MATCH_START:
        if (playerRole === 'guest' && onMatchStart) {
          onMatchStart(payload);
        }
        break;
      case EVENTS.UNIT_DEPLOYED:
        if (payload.senderId !== playerId && onUnitDeployed) {
          onUnitDeployed(payload);
        }
        break;
      case EVENTS.GAME_STATE:
        if (playerRole === 'guest' && onGameState) {
          onGameState(payload.state);
        }
        break;
      case EVENTS.FACT_TRIGGER:
        // Both players show the same fact
        if (payload.fact) {
          enqueueFact(payload.fact);
        }
        break;
      case EVENTS.MATCH_OVER:
        if (onMatchOver) onMatchOver(payload);
        break;
      default:
        break;
    }
  }, [playerRole, playerId, onMatchStart, onUnitDeployed, onGameState, onMatchOver, enqueueFact]);

  // ─── Disconnect detection ─────────────────────────────────────────────
  const disconnectTimer = useRef(null);

  const handlePresenceLeave = useCallback((leftPresences) => {
    const opponentLeft = leftPresences.some((p) => p.playerId !== playerId);
    if (!opponentLeft) return;

    // Give 10 seconds before declaring win
    disconnectTimer.current = setTimeout(async () => {
      if (session?.code) {
        const winner = playerRole === 'host' ? 'host' : 'guest';
        await finishSession({ code: session.code, winner });
        setMatchResult({ winner, reason: 'disconnect' });
        setScreen('game-over');
      }
    }, 10000);
  }, [playerId, playerRole, session?.code, setMatchResult, setScreen]);

  // ─── Broadcast helpers ────────────────────────────────────────────────
  const broadcast = useCallback((event, payload) => {
    if (!channelRef.current) return;
    channelRef.current.send({
      type: 'broadcast',
      event,
      payload: { ...payload, senderId: playerId },
    });
  }, [playerId]);

  const broadcastUnitDeployed = useCallback((unitData) => {
    broadcast(EVENTS.UNIT_DEPLOYED, { ...unitData, senderId: playerId });
  }, [broadcast, playerId]);

  const broadcastGameState = useCallback((state) => {
    if (playerRole !== 'host') return;
    broadcast(EVENTS.GAME_STATE, { state, senderId: playerId });
  }, [broadcast, playerRole, playerId]);

  const broadcastFactTrigger = useCallback((fact) => {
    broadcast(EVENTS.FACT_TRIGGER, { fact, senderId: playerId });
  }, [broadcast, playerId]);

  const broadcastMatchOver = useCallback(async (winner, reason) => {
    broadcast(EVENTS.MATCH_OVER, { winner, reason });
    if (session?.code) {
      await finishSession({ code: session.code, winner });
    }
    setMatchResult({ winner, reason });
  }, [broadcast, session?.code, setMatchResult]);

  return {
    broadcastUnitDeployed,
    broadcastGameState,
    broadcastFactTrigger,
    broadcastMatchOver,
  };
}
