-- History Clash — Supabase Database Schema
-- Run this in your Supabase project's SQL Editor.

-- game_sessions: one row per active match
CREATE TABLE IF NOT EXISTS game_sessions (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  code        TEXT    UNIQUE NOT NULL,        -- 6-char join code, e.g. "SOMME1"
  scenario_id TEXT    NOT NULL,               -- references scenarios.js id
  host_id     TEXT    NOT NULL,               -- anonymous UUID (localStorage)
  guest_id    TEXT,                           -- set when guest joins
  host_faction    TEXT,
  guest_faction   TEXT,
  status      TEXT    DEFAULT 'waiting'       -- waiting | active | finished
              CHECK (status IN ('waiting','active','finished')),
  winner      TEXT,                           -- 'host' | 'guest' | 'draw'
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast code lookup (join flow)
CREATE INDEX IF NOT EXISTS game_sessions_code_idx ON game_sessions(code);
-- Index for cleanup of old sessions
CREATE INDEX IF NOT EXISTS game_sessions_created_idx ON game_sessions(created_at);

-- Row Level Security
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Anyone can read any session (needed to join by code)
CREATE POLICY "sessions_select_all"
  ON game_sessions FOR SELECT
  USING (true);

-- Anyone can create a session
CREATE POLICY "sessions_insert_all"
  ON game_sessions FOR INSERT
  WITH CHECK (true);

-- Anyone can update any session (MVP — no auth required)
-- Post-MVP: lock down with token-based auth
CREATE POLICY "sessions_update_all"
  ON game_sessions FOR UPDATE
  USING (true);

-- Enable Realtime for this table (host-join detection)
-- In Supabase dashboard: Database > Replication > game_sessions (toggle ON)
-- Alternatively run:
ALTER PUBLICATION supabase_realtime ADD TABLE game_sessions;

-- Optional: auto-delete sessions older than 2 hours (prevents table bloat on free tier)
-- Requires pg_cron extension — enable it in Supabase dashboard > Extensions
-- SELECT cron.schedule(
--   'cleanup-old-sessions',
--   '0 * * * *',   -- every hour
--   $$DELETE FROM game_sessions WHERE created_at < NOW() - INTERVAL '2 hours'$$
-- );
