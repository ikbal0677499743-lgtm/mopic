import { PageElement } from './project'

export interface Theme {
  id: string
  name: string
  slug: string
  description?: string
  thumbnailUrl: string
  previewUrls: string[]
  categoryId: string
  tags: string[]
}

export interface ThemeCategory {
  id: string
  name: string
  displayName: string
  position: number
}

export interface ThemeDesign {
  id: string
  themeId: string
  workspaceSizeId: string
  designType: 'cover' | 'block'
  designData: {
    pages: Array<{
      background: { type: string; value: string }
      elements: PageElement[]
    }>
  }
}
