'use client';

import { useUIStore } from '@/lib/store/uiStore';
import { Image, Layout, Layers, Palette, Sparkles } from 'lucide-react';

const TABS = [
  { id: 'photos' as const, label: 'Photos', icon: Image },
  { id: 'templates' as const, label: 'Templates', icon: Sparkles },
  { id: 'layouts' as const, label: 'Layouts', icon: Layout },
  { id: 'backgrounds' as const, label: 'Backgrounds', icon: Palette },
  { id: 'cliparts' as const, label: 'Cliparts', icon: Layers },
];

export default function EditorSidebar() {
  const { activeSidebarTab, isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="flex">
      {/* Tab Strip (always visible) */}
      <div className="w-18 bg-gray-900 flex flex-col py-4 gap-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => toggleSidebar(tab.id)}
              className={`flex flex-col items-center justify-center py-3 px-2 gap-1 transition-colors ${
                isActive
                  ? 'bg-white text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
              title={tab.label}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sliding Panel */}
      {isSidebarOpen && (
        <div className="w-70 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-bold text-lg mb-4 capitalize">
            {activeSidebarTab}
          </h3>
          
          {/* Placeholder content per tab */}
          {activeSidebarTab === 'photos' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Upload photos to add them to your photobook
              </p>
              <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium hover:border-gray-400">
                Click to Upload Photos
              </button>
              <div className="grid grid-cols-2 gap-2">
                {/* Photo thumbnails will appear here */}
              </div>
            </div>
          )}

          {activeSidebarTab === 'templates' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Choose from pre-designed page templates
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Template {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSidebarTab === 'layouts' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select a layout for your photos
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <button
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Layout {i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSidebarTab === 'backgrounds' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Choose a background for your pages
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af'].map((color) => (
                  <button
                    key={color}
                    className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400"
                    style={{ backgroundColor: color }}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {activeSidebarTab === 'cliparts' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Add decorative elements to your pages
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <button
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Clip {i}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
