// V3 Mopic Project Types based on Printbox data model audit

// ============================================================================
// WORKSPACE & PAGE CONFIG TYPES
// ============================================================================

export type WorkspaceType = 'cover' | 'block';
export type Orientation = 'horizontal' | 'vertical' | 'square';
export type BindingType = 'hardcover' | 'softcover';

export interface Workspace {
  id: string;
  name: string;
  displayName: string;
  workspaceType: WorkspaceType;
  orientation: Orientation;
  bindingType?: BindingType;
  pageWidth: number;    // inches
  pageHeight: number;   // inches
  bleed: number;        // inches
  safeZone: number;     // inches
  spineWidth: number;   // inches (base, without pages)
  snapArea: number;     // inches
  paperThickness: number; // inches per page
  hasCropMarks: boolean;
  hasEndPaper: boolean;
  pdfMode: string;
  isActive: boolean;
  position: number;
}

export interface PageConfig {
  id: string;
  name: string;
  pagesMin: number;      // V3: 24 (was 20 in V2)
  pagesInitial: number;  // V3: 24
  pagesMax: number;      // 100
  pagesMultiplier: number; // 4 (increment by 4 pages)
}

export interface PageConfigPrice {
  id: string;
  pageConfigId: string;
  storeId: string;
  pricePerPageNet: number;
  pricePerPageGross: number;
}

// ============================================================================
// ATTRIBUTE SYSTEM (4-attribute cascade: type → size → paper → theme)
// ============================================================================

export type AttributeName = 'type' | 'size' | 'paper' | 'theme';
export type PriceMode = 'additive' | 'combinatorial' | 'page_additive' | 'none';

export interface Attribute {
  id: string;
  name: AttributeName;
  displayName: string;
  displayNameDe?: string;
  position: number;
  priceMode: PriceMode;
  priority: number;
  altersCoverWorkspace: boolean;
  altersBlockWorkspace: boolean;
  altersPagesSettings: boolean;
  altersCoverTheme: boolean;
  altersBlockTheme: boolean;
  altersProductImages: boolean;
}

export interface AttributeValue {
  id: string;
  attributeId: string;
  key: string;
  displayName: string;
  displayNameDe?: string;
  position: number;
  isActive: boolean;
  isDefault: boolean;
  // For SIZE values
  coverWorkspaceId?: string;
  blockWorkspaceId?: string;
  pageConfigId?: string;
  // For PAPER values
  pageSurchargeNet?: number;
  pageSurchargeGross?: number;
  // Upselling/marketing fields
  descriptionUpselling?: string;
  headerUpselling?: string;
  imageUrl?: string;
  imageUpsellingUrl?: string;
  priceUpselling?: string;
  valueToUpsell?: string;
  thumbUrl?: string;
  slideImageUrl?: string;
  sliderDescription?: string;
  sliderIconUrl?: string;
  availableSize?: string;
  sidebarDisplayName?: string;
  sidebarIconActiveUrl?: string;
  sidebarIconInactiveUrl?: string;
}

export interface AttributeRule {
  id: string;
  name: string;
  storeId?: string;
  conditionAttributeId: string;
  conditionValueKey: string;
  affectedAttributeId: string;
  allowedValueKeys: string[];
  behavior: string;
  isActive: boolean;
}

// ============================================================================
// DESIGN JSON TYPES (Printbox normalized 0-1 coordinates)
// ============================================================================

export type CoordinateType = 'relative' | 'absolute';
export type ComponentType = 'clipart' | 'contentImage' | 'spiritLabel' | 'text' | 'shape';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';

export interface DesignRect {
  x: number;      // 0-1 normalized
  y: number;      // 0-1 normalized
  width: number;  // 0-1 normalized
  height: number; // 0-1 normalized
}

export interface BaseComponent {
  type: ComponentType;
  id: string;
  name?: string;
  rect: DesignRect;
  rotation?: number;
  opacity?: number;
  blendMode?: BlendMode;
  locked?: boolean;
  visible?: boolean;
  zIndex?: number;
}

export interface ClipartComponent extends BaseComponent {
  type: 'clipart';
  assetUrl: string;
  assetId?: string;
}

export interface ContentImageComponent extends BaseComponent {
  type: 'contentImage';
  imageUrl?: string;
  placeholder?: boolean;
  cropRect?: DesignRect;
  filters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
    blur?: number;
  };
}

export interface SpiritLabelComponent extends BaseComponent {
  type: 'spiritLabel';
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  fontStyle?: string;
  color: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
}

export type DesignComponent = ClipartComponent | ContentImageComponent | SpiritLabelComponent;

export interface BackgroundHalf {
  type: 'color' | 'image' | 'gradient';
  value: string; // hex color, image URL, or gradient CSS
}

export interface SlideBackground {
  primary: BackgroundHalf;   // left page or back cover
  secondary: BackgroundHalf; // right page or front cover
}

export interface Slide {
  id: string;
  background: SlideBackground;
  components: DesignComponent[];
}

export interface DesignData {
  version?: number; // 104
  slides: Slide[];
}

// ============================================================================
// PROJECT TYPES
// ============================================================================

export type ProjectStatus = 'draft' | 'completed' | 'ordered' | 'rendering' | 'rendered' | 'failed';
export type PageType = 'cover_spread' | 'inner';

export interface Project {
  id: string;
  sessionId?: string;
  storeId?: string;
  // 4-attribute selections
  selectedType: string;    // 'HC' | 'SC'
  selectedSize: string;    // 'HC_Square' | 'SC_Horizontal' etc
  selectedPaper: string;   // 'standardPaper' | 'deepMatte' | 'silk'
  selectedTheme?: string;  // theme slug
  // Resolved workspaces (from selectedSize)
  coverWorkspaceId?: string;
  blockWorkspaceId?: string;
  pageConfigId?: string;
  themeId?: string;
  // Project metadata
  name: string;
  status: ProjectStatus;
  totalPages: number;      // 24-100, multiples of 4
  calculatedPrice?: number;
  shopifyOrderId?: string;
  shopifyCartId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPage {
  id: string;
  projectId: string;
  pageType: PageType;
  pageNumber: number;      // 1-based
  spreadIndex: number;     // 0-based (0 = cover, 1+ = inner spreads)
  designData: DesignData;
  layoutTemplateId?: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectPhoto {
  id: string;
  projectId: string;
  originalUrl: string;
  thumbnailUrl: string;
  mediumUrl?: string;
  originalWidth?: number;
  originalHeight?: number;
  fileSizeBytes?: number;
  mimeType?: string;
  originalFilename?: string;
  isUsed: boolean;
  createdAt: string;
}

export interface RenderedFile {
  id: string;
  projectId: string;
  fileType: 'cover_pdf' | 'block_pdf' | 'full_pdf';
  fileUrl: string;
  renderStatus: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
}

// ============================================================================
// PRICE CALCULATION TYPES
// ============================================================================

export interface PriceCalculation {
  basePrice: number;           // from SIZE
  paperSurcharge: number;      // per page from PAPER
  pagePricePerPage: number;    // from page_config
  totalPages: number;
  extraPages: number;          // above 24
  subtotal: number;
  tax?: number;
  total: number;
  currency: string;
  breakdown: {
    label: string;
    amount: number;
  }[];
}
