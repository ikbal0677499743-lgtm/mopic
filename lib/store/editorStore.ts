import { create } from 'zustand'
import { EditorState } from '../types/editor'

interface EditorStore extends EditorState {
  setProjectId: (id: string | null) => void
  setCurrentPage: (index: number) => void
  selectElement: (id: string | null) => void
  setZoom: (zoom: number) => void
  setPan: (x: number, y: number) => void
  markDirty: () => void
  markSaved: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  projectId: null,
  currentPageIndex: 0,
  selectedElementId: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  isDirty: false,
  isSaving: false,
  lastSaved: null,
  
  setProjectId: (id) => set({ projectId: id }),
  setCurrentPage: (index) => set({ currentPageIndex: index }),
  selectElement: (id) => set({ selectedElementId: id }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (x, y) => set({ panX: x, panY: y }),
  markDirty: () => set({ isDirty: true }),
  markSaved: () => set({ isDirty: false, isSaving: false, lastSaved: new Date().toISOString() }),
}))
