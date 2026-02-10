// V3 Mopic Editor Types

import { DesignComponent, DesignData, Workspace } from './project';

// ============================================================================
// EDITOR STATE
// ============================================================================

export interface EditorState {
  // Navigation (spread-based, not page-based)
  currentSpreadIndex: number; // 0 = cover, 1+ = inner spreads
  selectedComponentId: string | null;
  
  // History
  canUndo: boolean;
  canRedo: boolean;
  
  // Flags
  isInitialized: boolean;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved?: Date;
}

export interface HistoryEntry {
  timestamp: number;
  action: string;
  spreadIndex: number;
  previousData: DesignData;
  newData: DesignData;
}

// ============================================================================
// UI STATE
// ============================================================================

export type SidebarTab = 'images' | 'templates' | 'layouts' | 'backgrounds' | 'cliparts';
export type ViewMode = 'spread' | 'allPages';

export interface UIState {
  // Sidebar
  activeSidebarTab: SidebarTab | null;
  isSidebarOpen: boolean;
  
  // Zoom
  zoomLevel: number; // 50-200%
  
  // View mode
  viewMode: ViewMode;
  
  // Overlays
  showGrid: boolean;
  showGuides: boolean;
  showBleed: boolean;
  
  // Context toolbar
  contextToolbarPosition?: { x: number; y: number };
}

// ============================================================================
// TOOL & CANVAS CONFIG
// ============================================================================

export type ToolType = 
  | 'select'
  | 'pan'
  | 'text'
  | 'shape'
  | 'image'
  | 'clipart';

export interface CanvasConfig {
  dpi: number;           // 96 CSS pixels per inch at 100% zoom
  renderDpi: number;     // 300 for final PDF
  backgroundColor: string;
  workspaceBackgroundColor: string;
  safeZoneColor: string;
  bleedColor: string;
  spineColor: string;
}

// ============================================================================
// CANVAS ELEMENTS (Fabric.js layer)
// ============================================================================

export interface CanvasObject {
  id: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  angle: number;
  opacity: number;
  scaleX: number;
  scaleY: number;
  flipX: boolean;
  flipY: boolean;
  visible: boolean;
  selectable: boolean;
  evented: boolean;
  hasControls: boolean;
  hasBorders: boolean;
  lockMovementX: boolean;
  lockMovementY: boolean;
  lockRotation: boolean;
  lockScalingX: boolean;
  lockScalingY: boolean;
}

// ============================================================================
// SPREAD RENDERING INFO
// ============================================================================

export interface SpreadInfo {
  index: number;
  label: string;           // "Cover" | "Pages 1-2" | "Pages 3-4" etc
  pageType: 'cover_spread' | 'inner';
  workspace: Workspace;
  leftPageNumber?: number;
  rightPageNumber?: number;
  totalWidth: number;      // inches (includes spine for cover)
  totalHeight: number;     // inches
}
