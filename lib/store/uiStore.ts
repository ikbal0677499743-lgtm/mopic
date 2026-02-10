// V3 Mopic UI Store (Zustand)

import { create } from 'zustand';
import { SidebarTab, ViewMode } from '@/lib/types/editor';

interface UIState {
  // Sidebar
  activeSidebarTab: SidebarTab | null;
  isSidebarOpen: boolean;

  // Zoom (50-200%)
  zoom: number;

  // View mode
  viewMode: ViewMode;

  // Overlays
  showGrid: boolean;
  showGuides: boolean;
  showBleed: boolean;
  showThumbnails: boolean;

  // Context toolbar
  contextToolbarPosition: { x: number; y: number } | null;

  // Actions
  setActiveSidebarTab: (tab: SidebarTab | null) => void;
  toggleSidebar: (tab: SidebarTab) => void;
  closeSidebar: () => void;
  setZoom: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setViewMode: (mode: ViewMode) => void;
  toggleGrid: () => void;
  toggleGuides: () => void;
  toggleBleed: () => void;
  toggleThumbnails: () => void;
  setContextToolbarPosition: (position: { x: number; y: number } | null) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  activeSidebarTab: null,
  isSidebarOpen: false,
  zoom: 100,
  viewMode: 'spread',
  showGrid: false,
  showGuides: true,
  showBleed: false,
  showThumbnails: true,
  contextToolbarPosition: null,

  // Actions
  setActiveSidebarTab: (tab) => {
    const { activeSidebarTab } = get();
    if (activeSidebarTab === tab) {
      // Close if same tab clicked
      set({ isSidebarOpen: false, activeSidebarTab: null });
    } else {
      // Open with new tab
      set({ isSidebarOpen: true, activeSidebarTab: tab });
    }
  },

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

  setZoom: (level) => {
    const clampedLevel = Math.max(50, Math.min(200, level));
    set({ zoom: clampedLevel });
  },

  zoomIn: () => {
    const { zoom } = get();
    const newLevel = Math.min(200, zoom + 10);
    set({ zoom: newLevel });
  },

  zoomOut: () => {
    const { zoom } = get();
    const newLevel = Math.max(50, zoom - 10);
    set({ zoom: newLevel });
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),
  toggleBleed: () => set((state) => ({ showBleed: !state.showBleed })),
  toggleThumbnails: () => set((state) => ({ showThumbnails: !state.showThumbnails })),

  setContextToolbarPosition: (position) => set({ contextToolbarPosition: position }),
}));
