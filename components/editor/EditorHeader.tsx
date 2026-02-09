'use client'

import { ArrowLeft, Undo, Redo, Save, Eye } from 'lucide-react'
import { Button } from '../ui/Button'
import { useEditorStore } from '@/lib/store/editorStore'
import { useHistoryStore } from '@/lib/store/historyStore'

export function EditorHeader() {
  const { currentPageIndex, isDirty } = useEditorStore()
  const { canUndo, canRedo, undo, redo } = useHistoryStore()

  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <input
          type="text"
          defaultValue="My Travel Book"
          className="text-lg font-medium border-none outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          disabled={!canUndo()}
          onClick={() => undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={!canRedo()}
          onClick={() => redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPageIndex + 1}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm">
          <Save className="h-4 w-4 mr-2" />
          {isDirty ? 'Save' : 'Saved'}
        </Button>
        <Button variant="secondary" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button size="sm">
          Next: Summary →
        </Button>
      </div>
    </header>
  )
}
