// V3 Mopic UI Store (Zustand)

import { create } from 'zustand';
import { SidebarTab, ViewMode } from '@/lib/types/editor';

interface UIState {
  // Sidebar
  activeSidebarTab: SidebarTab | null;
  isSidebarOpen: boolean;

  // Zoom (50-200%)
  zoomLevel: number;

  // View mode
  viewMode: ViewMode;

  // Overlays
  showGrid: boolean;
  showGuides: boolean;
  showBleed: boolean;

  // Context toolbar
  contextToolbarPosition: { x: number; y: number } | null;

  // Actions
  toggleSidebar: (tab: SidebarTab) => void;
  closeSidebar: () => void;
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setViewMode: (mode: ViewMode) => void;
  toggleGrid: () => void;
  toggleGuides: () => void;
  toggleBleed: () => void;
  setContextToolbarPosition: (position: { x: number; y: number } | null) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  activeSidebarTab: null,
  isSidebarOpen: false,
  zoomLevel: 100,
  viewMode: 'spread',
  showGrid: false,
  showGuides: true,
  showBleed: false,
  contextToolbarPosition: null,

  // Actions
  toggleSidebar: (tab) => {
    const { activeSidebarTab, isSidebarOpen } = get();
    if (activeSidebarTab === tab && isSidebarOpen) {
      // Close if same tab clicked
      set({ isSidebarOpen: false, activeSidebarTab: null });
    } else {
      // Open with new tab
      set({ isSidebarOpen: true, activeSidebarTab: tab });
    }
  },

  closeSidebar: () => set({ isSidebarOpen: false, activeSidebarTab: null }),

  setZoomLevel: (level) => {
    const clampedLevel = Math.max(50, Math.min(200, level));
    set({ zoomLevel: clampedLevel });
  },

  zoomIn: () => {
    const { zoomLevel } = get();
    const newLevel = Math.min(200, zoomLevel + 10);
    set({ zoomLevel: newLevel });
  },

  zoomOut: () => {
    const { zoomLevel } = get();
    const newLevel = Math.max(50, zoomLevel - 10);
    set({ zoomLevel: newLevel });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),
  toggleBleed: () => set((state) => ({ showBleed: !state.showBleed })),

  setContextToolbarPosition: (position) => set({ contextToolbarPosition: position }),
}));
