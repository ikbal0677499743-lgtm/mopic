'use client'

import { Plus } from 'lucide-react'
import { useEditorStore } from '@/lib/store/editorStore'

export function EditorBottomBar() {
  const { currentPageIndex, setCurrentPage } = useEditorStore()
  
  // Placeholder pages
  const pages = Array.from({ length: 24 }, (_, i) => ({ id: `page-${i}`, number: i + 1 }))

  return (
    <div className="flex h-24 items-center border-t bg-white px-4">
      <div className="flex gap-2 overflow-x-auto">
        {pages.map((page, index) => (
          <button
            key={page.id}
            onClick={() => setCurrentPage(index)}
            className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded border-2 bg-gray-50 text-xs transition-colors ${
              currentPageIndex === index
                ? 'border-pink-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {page.number}
          </button>
        ))}
        <button className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded border-2 border-dashed border-gray-300 hover:border-gray-400">
          <Plus className="h-6 w-6 text-gray-400" />
        </button>
      </div>
    </div>
  )
}
