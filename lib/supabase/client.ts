import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, PresetName } from '../types/game';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const GUEST_STORAGE_KEY = 'wordchain_guest_profile';

export function getLocalGuestProfile(): UserProfile {
  if (typeof window === 'undefined') {
    return {
      id: 'guest_default',
      displayName: 'WordHunter',
      avatarId: 'monty',
      gamesPlayed: 0,
      wins: 0,
      longestChain: 0,
      totalWords: 0,
      preferredPreset: 'classic',
      createdAt: '2026-01-01T00:00:00.000Z',
    };
  }

  const raw = localStorage.getItem(GUEST_STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // ignore
    }
  }

  const newProfile: UserProfile = {
    id: `guest_${Math.random().toString(36).substring(2, 9)}`,
    displayName: `Player_${Math.floor(100 + Math.random() * 900)}`,
    avatarId: 'monty',
    gamesPlayed: 0,
    wins: 0,
    longestChain: 0,
    totalWords: 0,
    preferredPreset: 'classic',
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(newProfile));
  return newProfile;
}

export function saveLocalGuestProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getLocalGuestProfile();
  const updated = { ...current, ...profile };
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function recordMatchResult(isWin: boolean, wordsPlayed: number, chainLength: number, preset: PresetName): void {
  const current = getLocalGuestProfile();
  current.gamesPlayed += 1;
  if (isWin) current.wins += 1;
  current.totalWords += wordsPlayed;
  if (chainLength > current.longestChain) {
    current.longestChain = chainLength;
  }
  current.preferredPreset = preset;
  saveLocalGuestProfile(current);
}
