// V3 Mopic Editor Store (Zustand)

import { create } from 'zustand';

interface EditorState {
  isInitialized: boolean;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  canUndo: boolean;
  canRedo: boolean;

  setInitialized: (value: boolean) => void;
  setDirty: (value: boolean) => void;
  setSaving: (value: boolean) => void;
  setLastSaved: (date: Date) => void;
  setCanUndo: (value: boolean) => void;
  setCanRedo: (value: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isInitialized: false,
  isDirty: false,
  isSaving: false,
  lastSaved: null,
  canUndo: false,
  canRedo: false,

  setInitialized: (value) => set({ isInitialized: value }),
  setDirty: (value) => set({ isDirty: value }),
  setSaving: (value) => set({ isSaving: value }),
  setLastSaved: (date) => set({ lastSaved: date }),
  setCanUndo: (value) => set({ canUndo: value }),
  setCanRedo: (value) => set({ canRedo: value }),
}));
