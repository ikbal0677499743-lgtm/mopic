import { create } from 'zustand'
import { Project, ProjectPage, PageElement, ProjectPhoto } from '../types/project'

interface ProjectStore {
  project: Project | null
  loadProject: (project: Project) => void
  updatePage: (pageId: string, updates: Partial<ProjectPage>) => void
  addPage: (page: ProjectPage) => void
  removePage: (pageId: string) => void
  addElement: (pageId: string, element: PageElement) => void
  updateElement: (pageId: string, elementId: string, updates: Partial<PageElement>) => void
  removeElement: (pageId: string, elementId: string) => void
  addPhoto: (photo: ProjectPhoto) => void
  removePhoto: (photoId: string) => void
  reorderPages: (fromIndex: number, toIndex: number) => void
}

export const useProjectStore = create<ProjectStore>((set) => ({
  project: null,
  
  loadProject: (project) => set({ project }),
  
  updatePage: (pageId, updates) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((page) =>
            page.id === pageId ? { ...page, ...updates } : page
          ),
        },
      }
    }),
  
  addPage: (page) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: [...state.project.pages, page],
          totalPages: state.project.totalPages + 1,
        },
      }
    }),
  
  removePage: (pageId) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: state.project.pages.filter((page) => page.id !== pageId),
          totalPages: state.project.totalPages - 1,
        },
      }
    }),
  
  addElement: (pageId, element) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((page) =>
            page.id === pageId
              ? { ...page, elements: [...page.elements, element] }
              : page
          ),
        },
      }
    }),
  
  updateElement: (pageId, elementId, updates) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((page) =>
            page.id === pageId
              ? {
                  ...page,
                  elements: page.elements.map((el) =>
                    el.id === elementId ? { ...el, ...updates } : el
                  ),
                }
              : page
          ),
        },
      }
    }),
  
  removeElement: (pageId, elementId) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          pages: state.project.pages.map((page) =>
            page.id === pageId
              ? {
                  ...page,
                  elements: page.elements.filter((el) => el.id !== elementId),
                }
              : page
          ),
        },
      }
    }),
  
  addPhoto: (photo) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          photos: [...state.project.photos, photo],
        },
      }
    }),
  
  removePhoto: (photoId) =>
    set((state) => {
      if (!state.project) return state
      return {
        project: {
          ...state.project,
          photos: state.project.photos.filter((photo) => photo.id !== photoId),
        },
      }
    }),
  
  reorderPages: (fromIndex, toIndex) =>
    set((state) => {
      if (!state.project) return state
      const pages = [...state.project.pages]
      const [moved] = pages.splice(fromIndex, 1)
      pages.splice(toIndex, 0, moved)
      return {
        project: {
          ...state.project,
          pages,
        },
      }
    }),
}))
