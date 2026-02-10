// V3 Mopic Project Store (Zustand)

import { create } from 'zustand';
import { Project, ProjectPage, ProjectPhoto, Workspace, PageConfig } from '@/lib/types/project';
import { SpreadInfo } from '@/lib/types/editor';
import { resolveWorkspaces } from '@/lib/utils/attributeCascade';
import { calculatePrice } from '@/lib/utils/priceCalculator';
import { WORKSPACES, DEFAULT_PAGE_CONFIG } from '@/lib/data/workspaces';

interface ProjectState {
  // Project identity
  projectId: string | null;
  projectName: string;
  storeId: string | null;

  // 4-attribute selections
  selectedType: string;    // 'HC' | 'SC'
  selectedSize: string;    // 'HC_Square' | 'SC_Horizontal' etc
  selectedPaper: string;   // 'standardPaper' | 'deepMatte' | 'silk'
  selectedTheme: string | null;

  // Resolved workspaces (from SIZE)
  coverWorkspace: Workspace | null;
  blockWorkspace: Workspace | null;
  pageConfig: PageConfig;

  // Pages
  pages: ProjectPage[];
  photos: ProjectPhoto[];

  // Navigation (spread-based)
  currentSpreadIndex: number;

  // Price
  calculatedPrice: number;

  // Selected component on canvas
  selectedComponentId: string | null;

  // Actions
  initProject: (config: {
    name?: string;
    selectedType: string;
    selectedSize: string;
    selectedPaper: string;
    selectedTheme?: string;
  }) => void;
  
  setSelectedType: (type: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedPaper: (paper: string) => void;
  setSelectedTheme: (theme: string | null) => void;
  
  setCurrentSpread: (index: number) => void;
  nextSpread: () => void;
  prevSpread: () => void;
  
  selectComponent: (id: string | null) => void;
  
  addPages: (count: number) => void;
  removePages: (count: number) => void;
  duplicateSpread: (index: number) => void;
  deleteSpread: (index: number) => void;
  
  updateComponent: (spreadIndex: number, componentId: string, updates: any) => void;
  
  recalculatePrice: () => void;
  
  // Computed helpers
  getCurrentSpread: () => ProjectPage | null;
  isOnCoverSpread: () => boolean;
  getActiveWorkspace: () => Workspace | null;
  getTotalSpreads: () => number;
  getTotalPages: () => number;
  getSpreadLabel: (index: number) => string;
  getSpreadInfo: (index: number) => SpreadInfo | null;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial state
  projectId: null,
  projectName: 'My Photobook',
  storeId: null,
  
  selectedType: 'HC',
  selectedSize: 'HC_Square',
  selectedPaper: 'standardPaper',
  selectedTheme: null,
  
  coverWorkspace: null,
  blockWorkspace: null,
  pageConfig: DEFAULT_PAGE_CONFIG,
  
  pages: [],
  photos: [],
  
  currentSpreadIndex: 0,
  calculatedPrice: 0,
  selectedComponentId: null,

  // Initialize project with selections
  initProject: (config) => {
    const { name = 'My Photobook', selectedType, selectedSize, selectedPaper, selectedTheme } = config;
    
    // Resolve workspaces from size
    const { coverWorkspace, blockWorkspace, pageConfigName } = resolveWorkspaces(selectedSize);
    
    // Generate initial pages: 1 cover_spread + 11 inner spreads (24 pages)
    const initialPages: ProjectPage[] = [];
    
    // Cover spread (spread 0)
    initialPages.push({
      id: `page-cover`,
      projectId: 'temp',
      pageType: 'cover_spread',
      pageNumber: 0,
      spreadIndex: 0,
      designData: {
        version: 104,
        slides: [{
          id: 'cover-slide',
          background: {
            primary: { type: 'color', value: '#ffffff' },
            secondary: { type: 'color', value: '#ffffff' },
          },
          components: [],
        }],
      },
      position: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    // Inner spreads (11 spreads = 22 pages + 2 pages on cover = 24 total)
    for (let i = 1; i <= 11; i++) {
      const leftPageNumber = (i - 1) * 2 + 1;
      initialPages.push({
        id: `page-spread-${i}`,
        projectId: 'temp',
        pageType: 'inner',
        pageNumber: leftPageNumber,
        spreadIndex: i,
        designData: {
          version: 104,
          slides: [{
            id: `spread-${i}-slide`,
            background: {
              primary: { type: 'color', value: '#ffffff' },
              secondary: { type: 'color', value: '#ffffff' },
            },
            components: [],
          }],
        },
        position: i,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    set({
      projectName: name,
      selectedType,
      selectedSize,
      selectedPaper,
      selectedTheme: selectedTheme || null,
      coverWorkspace,
      blockWorkspace,
      pages: initialPages,
      currentSpreadIndex: 0,
    });
    
    // Calculate initial price
    get().recalculatePrice();
  },

  setSelectedType: (type) => set({ selectedType: type }),
  setSelectedSize: (size) => {
    const { coverWorkspace, blockWorkspace } = resolveWorkspaces(size);
    set({ selectedSize: size, coverWorkspace, blockWorkspace });
    get().recalculatePrice();
  },
  setSelectedPaper: (paper) => {
    set({ selectedPaper: paper });
    get().recalculatePrice();
  },
  setSelectedTheme: (theme) => set({ selectedTheme: theme }),

  setCurrentSpread: (index) => {
    const { pages } = get();
    if (index >= 0 && index < pages.length) {
      set({ currentSpreadIndex: index, selectedComponentId: null });
    }
  },

  nextSpread: () => {
    const { currentSpreadIndex, pages } = get();
    if (currentSpreadIndex < pages.length - 1) {
      set({ currentSpreadIndex: currentSpreadIndex + 1, selectedComponentId: null });
    }
  },

  prevSpread: () => {
    const { currentSpreadIndex } = get();
    if (currentSpreadIndex > 0) {
      set({ currentSpreadIndex: currentSpreadIndex - 1, selectedComponentId: null });
    }
  },

  selectComponent: (id) => set({ selectedComponentId: id }),

  addPages: (count) => {
    const { pages, pageConfig } = get();
    const currentTotalPages = (pages.length - 1) * 2 + 2; // (inner spreads × 2) + 2 for cover
    const newTotalPages = currentTotalPages + count;
    
    // Validate against max pages
    if (newTotalPages > pageConfig.pagesMax) {
      console.warn(`Cannot add pages: would exceed max of ${pageConfig.pagesMax}`);
      return;
    }
    
    // Add spreads (count / 2)
    const spreadsToAdd = count / 2;
    const newPages = [...pages];
    
    for (let i = 0; i < spreadsToAdd; i++) {
      const spreadIndex = pages.length + i;
      const leftPageNumber = (spreadIndex - 1) * 2 + 1;
      
      newPages.push({
        id: `page-spread-${spreadIndex}`,
        projectId: 'temp',
        pageType: 'inner',
        pageNumber: leftPageNumber,
        spreadIndex,
        designData: {
          version: 104,
          slides: [{
            id: `spread-${spreadIndex}-slide`,
            background: {
              primary: { type: 'color', value: '#ffffff' },
              secondary: { type: 'color', value: '#ffffff' },
            },
            components: [],
          }],
        },
        position: spreadIndex,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    set({ pages: newPages });
    get().recalculatePrice();
  },

  removePages: (count) => {
    const { pages, pageConfig } = get();
    const currentTotalPages = (pages.length - 1) * 2 + 2;
    const newTotalPages = currentTotalPages - count;
    
    // Validate against min pages
    if (newTotalPages < pageConfig.pagesMin) {
      console.warn(`Cannot remove pages: would be below min of ${pageConfig.pagesMin}`);
      return;
    }
    
    // Remove spreads (count / 2) from the end
    const spreadsToRemove = count / 2;
    const newPages = pages.slice(0, pages.length - spreadsToRemove);
    
    // Adjust currentSpreadIndex if it's beyond new length
    const { currentSpreadIndex } = get();
    const newSpreadIndex = Math.min(currentSpreadIndex, newPages.length - 1);
    
    set({ pages: newPages, currentSpreadIndex: newSpreadIndex });
    get().recalculatePrice();
  },

  duplicateSpread: (index) => {
    const { pages } = get();
    
    // Can only duplicate inner spreads (not cover)
    if (index === 0) {
      console.warn('Cannot duplicate cover spread');
      return;
    }
    
    const spreadToDuplicate = pages[index];
    if (!spreadToDuplicate) return;
    
    // Create a new spread with the same design data
    const newSpreadIndex = pages.length;
    const leftPageNumber = (newSpreadIndex - 1) * 2 + 1;
    
    const newSpread: ProjectPage = {
      ...spreadToDuplicate,
      id: `page-spread-${newSpreadIndex}`,
      pageNumber: leftPageNumber,
      spreadIndex: newSpreadIndex,
      position: newSpreadIndex,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Deep clone the design data
      designData: JSON.parse(JSON.stringify(spreadToDuplicate.designData)),
    };
    
    set({ pages: [...pages, newSpread] });
    get().recalculatePrice();
  },

  deleteSpread: (index) => {
    const { pages, pageConfig } = get();
    
    // Can only delete inner spreads (not cover)
    if (index === 0) {
      console.warn('Cannot delete cover spread');
      return;
    }
    
    // Check min pages
    const currentTotalPages = (pages.length - 1) * 2 + 2;
    if (currentTotalPages <= pageConfig.pagesMin) {
      console.warn(`Cannot delete spread: would be below min of ${pageConfig.pagesMin} pages`);
      return;
    }
    
    // Remove the spread
    const newPages = pages.filter((_, i) => i !== index);
    
    // Re-index remaining spreads
    newPages.forEach((page, i) => {
      page.spreadIndex = i;
      page.position = i;
      if (i > 0) {
        page.pageNumber = (i - 1) * 2 + 1;
      }
    });
    
    // Adjust currentSpreadIndex if needed
    const { currentSpreadIndex } = get();
    const newSpreadIndex = currentSpreadIndex >= newPages.length 
      ? newPages.length - 1 
      : currentSpreadIndex;
    
    set({ pages: newPages, currentSpreadIndex: newSpreadIndex });
    get().recalculatePrice();
  },

  updateComponent: (spreadIndex, componentId, updates) => {
    // TODO: Implement
  },

  recalculatePrice: () => {
    const { selectedSize, selectedPaper, pageConfig, pages } = get();
    
    // Calculate total pages (cover counts as 2 pages)
    const totalPages = (pages.length - 1) * 2 + 2; // (inner spreads * 2) + 2 for cover
    
    const price = calculatePrice({
      selectedSize,
      selectedPaper,
      pageConfigName: pageConfig.name,
      totalPages,
    });
    
    set({ calculatedPrice: price.total });
  },

  // Computed helpers
  getCurrentSpread: () => {
    const { pages, currentSpreadIndex } = get();
    return pages[currentSpreadIndex] || null;
  },

  isOnCoverSpread: () => {
    return get().currentSpreadIndex === 0;
  },

  getActiveWorkspace: () => {
    const { currentSpreadIndex, coverWorkspace, blockWorkspace } = get();
    return currentSpreadIndex === 0 ? coverWorkspace : blockWorkspace;
  },

  getTotalSpreads: () => {
    return get().pages.length;
  },

  getTotalPages: () => {
    const { pages } = get();
    // Total pages = (inner spreads × 2) + 2 for cover
    return (pages.length - 1) * 2 + 2;
  },

  getSpreadLabel: (index) => {
    const { pages } = get();
    const page = pages[index];
    if (!page) return '';
    
    if (page.pageType === 'cover_spread') {
      return 'Cover';
    }
    
    const leftPage = page.pageNumber;
    const rightPage = leftPage + 1;
    return `Pages ${leftPage}-${rightPage}`;
  },

  getSpreadInfo: (index) => {
    const { pages, coverWorkspace, blockWorkspace } = get();
    const page = pages[index];
    if (!page) return null;
    
    const workspace = page.pageType === 'cover_spread' ? coverWorkspace : blockWorkspace;
    if (!workspace) return null;
    
    const isCover = page.pageType === 'cover_spread';
    const totalWidth = isCover && workspace.bindingType === 'hardcover'
      ? workspace.pageWidth * 2 + workspace.spineWidth + (pages.length - 1) * 2 * workspace.paperThickness
      : workspace.pageWidth * 2;
    
    return {
      index,
      label: get().getSpreadLabel(index),
      pageType: page.pageType,
      workspace,
      leftPageNumber: isCover ? undefined : page.pageNumber,
      rightPageNumber: isCover ? undefined : page.pageNumber + 1,
      totalWidth,
      totalHeight: workspace.pageHeight,
    };
  },
}));
