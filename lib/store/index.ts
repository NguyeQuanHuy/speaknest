// ============================================================
// lib/store/index.ts – Zustand global state
// ============================================================
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserStats, FlashcardSession, VocabWord } from "@/types";

// ---------- Auth Store ----------
interface AuthState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null }),
}));

// ---------- Progress Store ----------
interface ProgressState {
  stats: UserStats | null;
  todayXP: number;
  todayGoal: number;
  addXP: (amount: number) => void;
  setStats: (stats: UserStats) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      stats: null,
      todayXP: 0,
      todayGoal: 50,
      addXP: (amount) => set({ todayXP: get().todayXP + amount }),
      setStats: (stats) => set({ stats }),
    }),
    { name: "speaknest-progress" }
  )
);

// ---------- Flashcard Store ----------
interface FlashcardState {
  session: FlashcardSession | null;
  startSession: (words: VocabWord[]) => void;
  markKnown: (wordId: string) => void;
  markAgain: (wordId: string) => void;
  nextCard: () => void;
  resetSession: () => void;
}

export const useFlashcardStore = create<FlashcardState>()((set, get) => ({
  session: null,

  startSession: (words) =>
    set({ session: { words, current_index: 0, known: [], again: [] } }),

  markKnown: (wordId) => {
    const s = get().session;
    if (!s) return;
    set({ session: { ...s, known: [...s.known, wordId] } });
  },

  markAgain: (wordId) => {
    const s = get().session;
    if (!s) return;
    set({ session: { ...s, again: [...s.again, wordId] } });
  },

  nextCard: () => {
    const s = get().session;
    if (!s) return;
    set({ session: { ...s, current_index: s.current_index + 1 } });
  },

  resetSession: () => set({ session: null }),
}));

// ---------- UI Store ----------
interface UIState {
  sidebarOpen: boolean;
  activeTab: string;
  setSidebar: (v: boolean) => void;
  setActiveTab: (tab: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: false,
  activeTab: "overview",
  setSidebar: (sidebarOpen) => set({ sidebarOpen }),
  setActiveTab: (activeTab) => set({ activeTab }),
}));
