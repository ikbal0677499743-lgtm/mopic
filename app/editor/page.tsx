'use client'

import { EditorLayout } from '@/components/editor/EditorLayout'
import { EditorHeader } from '@/components/editor/EditorHeader'
import { EditorSidebar } from '@/components/editor/EditorSidebar'
import { EditorCanvas } from '@/components/editor/EditorCanvas'
import { EditorBottomBar } from '@/components/editor/EditorBottomBar'

export default function EditorPage() {
  return (
    <EditorLayout>
      <EditorHeader />
      <div className="flex flex-1 overflow-hidden">
        <EditorSidebar />
        <EditorCanvas />
      </div>
      <EditorBottomBar />
    </EditorLayout>
  )
}
