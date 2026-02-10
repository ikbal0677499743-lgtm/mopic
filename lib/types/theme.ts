// V3 Mopic Theme & Asset Types

import { DesignData } from './project';

// ============================================================================
// ASSET TYPES (with tagging system)
// ============================================================================

export type AssetType = 'clipart' | 'background' | 'mask' | 'frame' | 'font' | 'layout' | 'theme_photo';
export type AssetTagType = 'clipart' | 'background' | 'mask' | 'frame' | 'font_family' | 'layout' | 'theme_photo';

export interface AssetTag {
  id: string;
  name: string;
  assetType: AssetTagType;
  position: number;
}

export interface Asset {
  id: string;
  type: AssetType;
  name: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fontFamily?: string;
  isActive: boolean;
  position: number;
  tags: AssetTag[]; // Resolved from asset_tag_assignments
}

// ============================================================================
// LAYOUT TEMPLATES
// ============================================================================

export interface LayoutTemplate {
  id: string;
  name: string;
  photoCount: number;
  thumbnailUrl?: string;
  layoutData: DesignData;
  position: number;
  isActive: boolean;
  tags: AssetTag[]; // Resolved from layout_tag_assignments
}

// ============================================================================
// THEMES (managed as attribute values + designs)
// ============================================================================

export interface Theme {
  id: string;
  attributeValueId?: string;
  name: string;
  slug: string;
  displayName: string;
  displayNameDe?: string;
  description?: string;
  thumbnailUrl?: string;
  previewUrls: string[];
  isActive: boolean;
  position: number;
  // Tag arrays (resolved from theme_asset_tags)
  clipartTags: string[];    // tag names
  backgroundTags: string[];
  maskTags: string[];
  frameTags: string[];
  fontFamilyTags: string[];
  layoutTags: string[];
  themePhotoTags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ThemeDesign {
  id: string;
  themeId: string;
  workspaceId: string;
  designType: 'cover' | 'block';
  designData: DesignData;
  version: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// PRODUCTS (theme + storefront metadata)
// ============================================================================

export type ProductVisibility = 'web_only' | 'web_and_mobile';

export interface Product {
  id: string;
  name: string;
  displayName: string;
  displayNameDe?: string;
  slug: string;
  themeId?: string;
  theme?: Theme;
  shortDescription?: string;
  longDescription?: string;
  visibility: ProductVisibility;
  isActive: boolean;
  position: number;
  categories: string[]; // category slugs
  tags: string[];       // tag names
  variantImages: ProductVariantImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariantImage {
  id: string;
  productId: string;
  sizeValueKey?: string;
  language: string;
  imageUrls: string[];
  position: number;
}

// ============================================================================
// CATEGORIES
// ============================================================================

export interface Category {
  id: string;
  name: string;
  displayName: string;
  displayNameDe?: string;
  slug: string;
  description?: string;
  seoMetaTitle?: string;
  seoMetaDescription?: string;
  imageUrls: string[];
  parentId?: string;
  position: number;
  isActive: boolean;
}
