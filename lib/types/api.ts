// V3 Mopic API Types

import { Project, ProjectPage, ProjectPhoto, RenderedFile, PriceCalculation } from './project';
import { Theme, Asset, LayoutTemplate } from './theme';

// ============================================================================
// PROJECT API
// ============================================================================

export interface CreateProjectRequest {
  name?: string;
  selectedType: string;
  selectedSize: string;
  selectedPaper: string;
  selectedTheme?: string;
  storeId?: string;
  sessionId?: string;
}

export interface CreateProjectResponse {
  project: Project;
  pages: ProjectPage[];
  price: PriceCalculation;
}

export interface UpdateProjectRequest {
  name?: string;
  selectedType?: string;
  selectedSize?: string;
  selectedPaper?: string;
  selectedTheme?: string;
  totalPages?: number;
  status?: string;
}

export interface UpdateProjectResponse {
  project: Project;
  price?: PriceCalculation;
}

export interface GetProjectResponse {
  project: Project;
  pages: ProjectPage[];
  photos: ProjectPhoto[];
  price: PriceCalculation;
}

// ============================================================================
// PHOTO UPLOAD API
// ============================================================================

export interface UploadPhotoRequest {
  projectId: string;
  file: File;
}

export interface UploadPhotoResponse {
  photo: ProjectPhoto;
  dpiWarning?: string;
}

export interface BulkUploadPhotosRequest {
  projectId: string;
  files: File[];
}

export interface BulkUploadPhotosResponse {
  photos: ProjectPhoto[];
  warnings: string[];
}

// ============================================================================
// THEME API
// ============================================================================

export interface GetThemesRequest {
  storeId?: string;
  categorySlug?: string;
  isActive?: boolean;
}

export interface GetThemesResponse {
  themes: Theme[];
  total: number;
}

export interface GetThemeResponse {
  theme: Theme;
  designs: {
    cover?: any;
    block?: any;
  };
}

// ============================================================================
// ASSET API
// ============================================================================

export interface GetAssetsRequest {
  type?: string;
  tagNames?: string[];
  isActive?: boolean;
}

export interface GetAssetsResponse {
  assets: Asset[];
  total: number;
}

export interface GetLayoutsRequest {
  photoCount?: number;
  tagNames?: string[];
  isActive?: boolean;
}

export interface GetLayoutsResponse {
  layouts: LayoutTemplate[];
  total: number;
}

// ============================================================================
// RENDER API
// ============================================================================

export interface RenderProjectRequest {
  projectId: string;
  renderType: 'cover' | 'block' | 'full';
  format?: 'pdf' | 'jpg';
  dpi?: number;
}

export interface RenderProjectResponse {
  renderedFile: RenderedFile;
  estimatedTime?: number; // seconds
}

export interface GetRenderStatusResponse {
  renderedFile: RenderedFile;
}

// ============================================================================
// SHOPIFY API
// ============================================================================

export interface AddToCartRequest {
  projectId: string;
  quantity?: number;
  variantId?: string;
}

export interface AddToCartResponse {
  cartId: string;
  cartUrl: string;
  lineItems: any[];
}

export interface ShopifyWebhookEvent {
  type: 'order.created' | 'order.updated' | 'order.cancelled';
  orderId: string;
  projectId?: string;
  status: string;
  payload: any;
}

// ============================================================================
// ERROR RESPONSE
// ============================================================================

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}

// ============================================================================
// PAGINATION
// ============================================================================

export interface PaginationParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
