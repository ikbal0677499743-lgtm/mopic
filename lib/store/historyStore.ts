import { create } from 'zustand'
import { HistoryEntry } from '../types/editor'

interface HistoryStore {
  undoStack: HistoryEntry[]
  redoStack: HistoryEntry[]
  pushState: (entry: HistoryEntry) => void
  undo: () => HistoryEntry | null
  redo: () => HistoryEntry | null
  canUndo: () => boolean
  canRedo: () => boolean
  clear: () => void
}

const MAX_HISTORY = 50

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  undoStack: [],
  redoStack: [],
  
  pushState: (entry) =>
    set((state) => {
      const newUndoStack = [...state.undoStack, entry]
      if (newUndoStack.length > MAX_HISTORY) {
        newUndoStack.shift()
      }
      return {
        undoStack: newUndoStack,
        redoStack: [], // Clear redo stack on new action
      }
    }),
  
  undo: () => {
    const state = get()
    if (state.undoStack.length === 0) return null
    
    const entry = state.undoStack[state.undoStack.length - 1]
    set({
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, entry],
    })
    return entry
  },
  
  redo: () => {
    const state = get()
    if (state.redoStack.length === 0) return null
    
    const entry = state.redoStack[state.redoStack.length - 1]
    set({
      redoStack: state.redoStack.slice(0, -1),
      undoStack: [...state.undoStack, entry],
    })
    return entry
  },
  
  canUndo: () => get().undoStack.length > 0,
  canRedo: () => get().redoStack.length > 0,
  clear: () => set({ undoStack: [], redoStack: [] }),
}))
