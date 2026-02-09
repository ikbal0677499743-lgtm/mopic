export interface WorkspaceSize {
  id: string
  name: string
  displayName: string
  pageWidth: number
  pageHeight: number
  bleed: number
  safeArea: number
  spineWidth: number
  paperThickness: number
}

export interface PageElement {
  id: string
  type: 'image' | 'text' | 'clipart' | 'shape'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  zIndex: number
  scaleX: number
  scaleY: number
  locked: boolean
  // Image-specific
  photoId?: string
  src?: string
  crop?: { x: number; y: number; width: number; height: number }
  filters?: { brightness: number; contrast: number; saturation: number }
  // Text-specific
  content?: string
  fontFamily?: string
  fontSize?: number
  fill?: string
  fontWeight?: string
  fontStyle?: string
  textAlign?: string
  textDecoration?: string
  // Clipart-specific
  assetId?: string
  // Shape-specific
  shapeType?: 'rectangle' | 'ellipse'
  shapeFill?: string
  stroke?: string
  strokeWidth?: number
  cornerRadius?: number
}

export interface ProjectPage {
  id: string
  pageType: 'cover_front' | 'cover_back' | 'guard' | 'inner'
  pageNumber: number
  spreadIndex: number
  background: {
    type: 'color' | 'pattern' | 'image'
    value: string
  }
  elements: PageElement[]
  layoutTemplateId?: string
  position: number
}

export interface Project {
  id: string
  sessionId: string
  themeId?: string
  workspaceSizeId: string
  pageConfigId: string
  selectedAttributes: {
    size: string
    type: string
    paper: string
  }
  name: string
  status: 'draft' | 'completed' | 'ordered' | 'rendering' | 'rendered'
  totalPages: number
  calculatedPrice: number
  pages: ProjectPage[]
  photos: ProjectPhoto[]
  createdAt: string
  updatedAt: string
}

export interface ProjectPhoto {
  id: string
  projectId: string
  originalUrl: string
  thumbnailUrl: string
  mediumUrl?: string
  originalWidth: number
  originalHeight: number
  fileSizeBytes: number
  mimeType: string
  originalFilename: string
  isUsed: boolean
}
