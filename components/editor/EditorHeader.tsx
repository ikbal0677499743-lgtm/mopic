'use client';

import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/lib/store/projectStore';
import { useEditorStore } from '@/lib/store/editorStore';
import { useHistoryStore } from '@/lib/store/historyStore';
import { ArrowLeft, Undo, Redo, History, Settings, Save, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils/priceCalculator';

export default function EditorHeader() {
  const router = useRouter();
  const { projectName, calculatedPrice } = useProjectStore();
  const { isDirty, isSaving, lastSaved } = useEditorStore();
  const { canUndo, canRedo, undo, redo } = useHistoryStore();

  const handleUndo = () => {
    if (canUndo()) {
      undo();
    }
  };

  const handleRedo = () => {
    if (canRedo()) {
      redo();
    }
  };

  const saveStatus = isDirty ? 'Unsaved' : isSaving ? 'Saving...' : 'Saved';

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.push('/wizard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Logo */}
        <div className="h-6 w-px bg-gray-300"></div>
        <h1 className="font-display text-xl font-bold">Mopic</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Undo/Redo */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo()}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={handleRedo}
            disabled={!canRedo()}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>

        {/* History & Settings */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-gray-100 rounded"
            title="History"
          >
            <History size={18} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded"
            title="Project Settings"
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Save Status */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className={`w-2 h-2 rounded-full ${
            isDirty ? 'bg-yellow-500' : isSaving ? 'bg-blue-500' : 'bg-green-500'
          }`}></div>
          <span>{saveStatus}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <Save size={18} />
            Save
          </button>
          <button
            onClick={() => router.push('/preview')}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center gap-2"
          >
            <Eye size={18} />
            Preview
          </button>
          <button
            onClick={() => router.push('/summary')}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900"
          >
            Next
          </button>
        </div>
      </div>

      {/* Mobile: Project Name & Price */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-center hidden lg:block">
        <div className="font-medium">{projectName}</div>
        <div className="text-sm text-gray-600">{formatPrice(calculatedPrice)}</div>
      </div>
    </header>
  );
}
