export interface EditorState {
  projectId: string | null
  currentPageIndex: number
  selectedElementId: string | null
  zoom: number
  panX: number
  panY: number
  isDirty: boolean
  isSaving: boolean
  lastSaved: string | null
}

export interface HistoryEntry {
  timestamp: number
  description: string
  pages: any[] // serialized pages
}

export interface UIState {
  sidebarOpen: boolean
  activePanel: 'photos' | 'templates' | 'layouts' | 'backgrounds' | 'cliparts'
  showGrid: boolean
  showGuides: boolean
  showBleed: boolean
  contextToolbarPosition: { x: number; y: number } | null
}

export type ToolType = 'select' | 'text' | 'shape' | 'pan'

export interface CanvasConfig {
  width: number
  height: number
  dpi: number
  bleed: number
  safeArea: number
}
