'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/lib/store/projectStore';
import { useEditorStore } from '@/lib/store/editorStore';
import { useHistoryStore } from '@/lib/store/historyStore';
import { 
  ArrowLeft, 
  Undo2, 
  Redo2, 
  Clock, 
  Settings2, 
  Save, 
  Eye, 
  ArrowRight,
  Play,
  Check
} from 'lucide-react';

export default function EditorHeader() {
  const router = useRouter();
  const { projectId, projectName } = useProjectStore();
  const { isDirty, isSaving } = useEditorStore();
  const { canUndo, canRedo, undo, redo } = useHistoryStore();
  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [autoAlignment, setAutoAlignment] = useState(true);
  const [spellCheck, setSpellCheck] = useState(true);

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

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={() => router.push('/wizard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Logo */}
        <div className="font-display text-lg font-black tracking-tight lowercase">
          mopic
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-3" />

        {/* Undo Button */}
        <button
          onClick={handleUndo}
          disabled={!canUndo()}
          className={`flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition ${
            !canUndo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Undo"
        >
          <Undo2 size={20} />
          <span className="text-[10px] text-gray-600 mt-0.5">Undo</span>
        </button>

        {/* Redo Button */}
        <button
          onClick={handleRedo}
          disabled={!canRedo()}
          className={`flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition ${
            !canRedo() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Redo"
        >
          <Redo2 size={20} />
          <span className="text-[10px] text-gray-600 mt-0.5">Redo</span>
        </button>

        {/* History Button */}
        <button
          className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition"
          title="History"
        >
          <Clock size={20} />
          <span className="text-[10px] text-gray-600 mt-0.5">History</span>
        </button>

        {/* Project Button with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition"
            title="Project Settings"
          >
            <Settings2 size={20} />
            <span className="text-[10px] text-gray-600 mt-0.5">Project</span>
          </button>

          {showProjectMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProjectMenu(false)}
              />
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition">
                  Global project settings
                </button>
                <button 
                  onClick={() => setShowRuler(!showRuler)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <span>Show ruler</span>
                  {showRuler && <Check size={16} />}
                </button>
                <button 
                  onClick={() => setAutoAlignment(!autoAlignment)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <span>Auto alignment</span>
                  {autoAlignment && <Check size={16} />}
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-400 cursor-not-allowed flex items-center justify-between">
                  <span>Share</span>
                  <span className="text-xs">Beta</span>
                </button>
                <button 
                  onClick={() => setSpellCheck(!spellCheck)}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition flex items-center justify-between"
                >
                  <span>Spell check</span>
                  {spellCheck && <Check size={16} />}
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition">
                  Verify project
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition">
                  Show keyboard shortcuts
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button 
                  onClick={() => window.open('https://example.com', '_blank')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition"
                >
                  Home page
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CENTER SECTION */}
      <div className="flex items-center">
        <button className="bg-black text-white text-xs rounded-full px-5 py-2 flex items-center gap-2 hover:bg-gray-800 transition">
          <Play size={14} fill="white" />
          Video Tutorial
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Save Button */}
        <button
          className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition relative"
          title="Save"
        >
          <div className="relative">
            <Save size={20} />
            {/* Status Indicator */}
            <div 
              className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                isSaving ? 'bg-amber-500' : isDirty ? 'bg-amber-500' : 'bg-green-500'
              }`}
            />
          </div>
          <span className="text-[10px] text-gray-600 mt-0.5">Save</span>
        </button>

        {/* Preview Button */}
        <button
          onClick={() => router.push(`/preview?projectId=${projectId || ''}`)}
          className="flex flex-col items-center justify-center p-2 hover:bg-gray-50 rounded-md transition"
          title="Preview"
        >
          <Eye size={20} />
          <span className="text-[10px] text-gray-600 mt-0.5">Preview</span>
        </button>

        {/* Next Button */}
        <button
          onClick={() => router.push(`/summary?projectId=${projectId || ''}`)}
          className="bg-black text-white rounded-xl px-6 py-2.5 font-bold flex items-center gap-2 hover:bg-gray-800 transition"
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </header>
  );
}
