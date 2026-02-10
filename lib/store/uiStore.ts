import { create } from 'zustand'
import { UIState } from '../types/editor'

interface UIStore extends UIState {
  toggleSidebar: () => void
  setActivePanel: (panel: UIState['activePanel']) => void
  toggleGrid: () => void
  toggleGuides: () => void
  toggleBleed: () => void
  setContextToolbarPosition: (position: { x: number; y: number } | null) => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  activePanel: 'photos',
  showGrid: false,
  showGuides: true,
  showBleed: false,
  contextToolbarPosition: null,
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePanel: (panel) => set({ activePanel: panel }),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),
  toggleBleed: () => set((state) => ({ showBleed: !state.showBleed })),
  setContextToolbarPosition: (position) => set({ contextToolbarPosition: position }),
}))
