'use client'

import { Camera, Layout, Grid, Image, Smile } from 'lucide-react'
import { useUIStore } from '@/lib/store/uiStore'
import { cn } from '@/lib/utils/cn'

export function EditorSidebar() {
  const { activePanel, setActivePanel } = useUIStore()

  const tabs = [
    { id: 'photos' as const, icon: Camera, label: 'Photos' },
    { id: 'templates' as const, icon: Layout, label: 'Templates' },
    { id: 'layouts' as const, icon: Grid, label: 'Layouts' },
    { id: 'backgrounds' as const, icon: Image, label: 'Backgrounds' },
    { id: 'cliparts' as const, icon: Smile, label: 'Cliparts' },
  ]

  return (
    <aside className="flex w-72 flex-col border-r bg-white">
      <div className="flex border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors',
                activePanel === tab.id
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-sm text-gray-500">
          {activePanel === 'photos' && 'Upload your photos here'}
          {activePanel === 'templates' && 'Choose a theme template'}
          {activePanel === 'layouts' && 'Select a page layout'}
          {activePanel === 'backgrounds' && 'Pick a background'}
          {activePanel === 'cliparts' && 'Add clipart elements'}
        </div>
      </div>
    </aside>
  )
}
