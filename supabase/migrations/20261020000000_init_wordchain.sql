-- WordChain Database Schema: PostgreSQL & Supabase RLS

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_id TEXT NOT NULL DEFAULT 'monty',
  preferred_preset TEXT NOT NULL DEFAULT 'classic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Player Statistics Table
CREATE TABLE IF NOT EXISTS public.player_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  games_played INT NOT NULL DEFAULT 0,
  wins INT NOT NULL DEFAULT 0,
  longest_chain INT NOT NULL DEFAULT 0,
  total_words INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Matches History Table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code VARCHAR(10) NOT NULL,
  preset TEXT NOT NULL DEFAULT 'classic',
  word_length_setting TEXT NOT NULL DEFAULT 'any',
  turn_timer_setting INT NOT NULL DEFAULT 10,
  lives_setting INT NOT NULL DEFAULT 3,
  winner_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  duration_seconds INT NOT NULL DEFAULT 0,
  total_words_played INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Match Players Pivot Table
CREATE TABLE IF NOT EXISTS public.match_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  avatar_id TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  words_submitted INT NOT NULL DEFAULT 0,
  is_winner BOOLEAN NOT NULL DEFAULT false
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_matches_created_at ON public.matches (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_match_players_match_id ON public.match_players (match_id);
CREATE INDEX IF NOT EXISTS idx_match_players_profile_id ON public.match_players (profile_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_players ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Anyone can view profiles, users can update their own
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Statistics: Publicly viewable
CREATE POLICY "Statistics are viewable by everyone."
  ON public.player_statistics FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update stats for valid games."
  ON public.player_statistics FOR ALL
  USING (true);

-- Matches: Anyone can read completed matches
CREATE POLICY "Matches viewable by everyone"
  ON public.matches FOR SELECT
  USING (true);

CREATE POLICY "Matches insertable by authenticated and guest players"
  ON public.matches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Match players viewable by everyone"
  ON public.match_players FOR SELECT
  USING (true);

CREATE POLICY "Match players insertable"
  ON public.match_players FOR INSERT
  WITH CHECK (true);
