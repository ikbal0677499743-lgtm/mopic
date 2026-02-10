'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProjectStore } from '@/lib/store/projectStore';
import { useEditorStore } from '@/lib/store/editorStore';
import EditorLayout from '@/components/editor/EditorLayout';
import EditorHeader from '@/components/editor/EditorHeader';
import EditorSidebar from '@/components/editor/EditorSidebar';
import EditorCanvas from '@/components/editor/EditorCanvas';
import EditorBottomBar from '@/components/editor/EditorBottomBar';

function EditorContent() {
  const searchParams = useSearchParams();
  const { initProject } = useProjectStore();
  const { isInitialized, setInitialized } = useEditorStore();

  useEffect(() => {
    if (!isInitialized) {
      // Initialize project from URL params
      const type = searchParams.get('type') || 'HC';
      const size = searchParams.get('size') || 'HC_Square';
      const paper = searchParams.get('paper') || 'standardPaper';
      const theme = searchParams.get('theme') || undefined;
      const name = searchParams.get('name') || 'My Photobook';

      initProject({
        name,
        selectedType: type,
        selectedSize: size,
        selectedPaper: paper,
        selectedTheme: theme,
      });

      setInitialized(true);
    }
  }, [isInitialized, searchParams, initProject, setInitialized]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-editor-workspace">
        <div className="text-center text-white">
          <h2 className="font-display text-2xl font-bold mb-2">Loading Editor...</h2>
          <p className="text-gray-400">Initializing your photobook project</p>
        </div>
      </div>
    );
  }

  return (
    <EditorLayout>
      <EditorHeader />
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar />
        <EditorCanvas />
      </div>
      <EditorBottomBar />
    </EditorLayout>
  );
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-editor-workspace">
        <div className="text-center text-white">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <EditorContent />
    </Suspense>
  );
}
