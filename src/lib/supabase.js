import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found in environment variables. ' +
    'Copy .env.example to .env.local and fill in your Supabase project URL and anon key.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// ─── Session helpers ────────────────────────────────────────────────────────

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function createSession({ scenarioId, hostId, hostFaction }) {
  let attempts = 0;
  while (attempts < 5) {
    const code = generateCode();
    const { data, error } = await supabase
      .from('game_sessions')
      .insert({ code, scenario_id: scenarioId, host_id: hostId, host_faction: hostFaction, status: 'waiting' })
      .select()
      .single();

    if (!error) return { data, code };
    // If unique violation on code, retry with a new code
    if (error.code === '23505') {
      attempts++;
      continue;
    }
    return { data: null, error };
  }
  return { data: null, error: new Error('Could not generate unique session code after 5 attempts') };
}

export async function joinSession({ code, guestId }) {
  const { data: session, error: fetchError } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('status', 'waiting')
    .single();

  if (fetchError || !session) {
    return { data: null, error: fetchError || new Error('Session not found or already started') };
  }

  const guestFaction = session.host_faction
    ? null // Will be set by guest's faction choice in UI
    : null;

  const { data, error } = await supabase
    .from('game_sessions')
    .update({ guest_id: guestId })
    .eq('code', code.toUpperCase())
    .select()
    .single();

  return { data: data ?? session, error };
}

export async function updateSessionGuestFaction({ code, guestFaction }) {
  return supabase
    .from('game_sessions')
    .update({ guest_faction: guestFaction })
    .eq('code', code.toUpperCase());
}

export async function startSession(code) {
  return supabase
    .from('game_sessions')
    .update({ status: 'active' })
    .eq('code', code.toUpperCase());
}

export async function finishSession({ code, winner }) {
  return supabase
    .from('game_sessions')
    .update({ status: 'finished', winner })
    .eq('code', code.toUpperCase());
}

export async function getSession(code) {
  return supabase
    .from('game_sessions')
    .select('*')
    .eq('code', code.toUpperCase())
    .single();
}

// ─── Player ID (anonymous, persistent in localStorage) ─────────────────────

export function getOrCreatePlayerId() {
  const key = 'hc_player_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
