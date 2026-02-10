// V3 Mopic History Store (Zustand) - Undo/Redo

import { create } from 'zustand';
import { HistoryEntry } from '@/lib/types/editor';

const MAX_HISTORY = 50;

interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];

  pushHistory: (entry: HistoryEntry) => void;
  undo: () => HistoryEntry | null;
  redo: () => HistoryEntry | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],

  pushHistory: (entry) => {
    set((state) => {
      const newPast = [...state.past, entry];
      // Keep only last MAX_HISTORY entries
      if (newPast.length > MAX_HISTORY) {
        newPast.shift();
      }
      return {
        past: newPast,
        future: [], // Clear future when new action is performed
      };
    });
  },

  undo: () => {
    const { past } = get();
    if (past.length === 0) return null;

    const entry = past[past.length - 1];
    set((state) => ({
      past: state.past.slice(0, -1),
      future: [entry, ...state.future],
    }));

    return entry;
  },

  redo: () => {
    const { future } = get();
    if (future.length === 0) return null;

    const entry = future[0];
    set((state) => ({
      past: [...state.past, entry],
      future: state.future.slice(1),
    }));

    return entry;
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  clearHistory: () => set({ past: [], future: [] }),
}));
