export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

export interface CreateProjectRequest {
  themeId?: string
  workspaceSizeId: string
  pageConfigId: string
  selectedAttributes: {
    size: string
    type: string
    paper: string
  }
  name?: string
}

export interface UpdateProjectRequest {
  name?: string
  status?: string
  totalPages?: number
  pages?: any[]
}

export interface UploadPhotoResponse {
  id: string
  originalUrl: string
  thumbnailUrl: string
  mediumUrl: string
  originalWidth: number
  originalHeight: number
}

export interface AddToCartRequest {
  projectId: string
  variantId: string
  quantity: number
  properties: Record<string, string>
}

export interface RenderRequest {
  projectId: string
  format: 'pdf'
  dpi: number
}
