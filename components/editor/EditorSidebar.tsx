'use client';

import { useUIStore } from '@/lib/store/uiStore';
import { Camera, LayoutTemplate, LayoutGrid, Palette, Puzzle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TABS = [
  { id: 'images' as const, label: 'Images', icon: Camera },
  { id: 'templates' as const, label: 'Templates', icon: LayoutTemplate },
  { id: 'layouts' as const, label: 'Layouts', icon: LayoutGrid },
  { id: 'backgrounds' as const, label: 'Backgrounds', icon: Palette },
  { id: 'cliparts' as const, label: 'Cliparts', icon: Puzzle },
];

export default function EditorSidebar() {
  const { activeSidebarTab, isSidebarOpen, setActiveSidebarTab } = useUIStore();

  return (
    <div className="flex h-full">
      {/* TAB STRIP (always visible) */}
      <div className="w-[72px] bg-white border-r border-gray-200 flex flex-col">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSidebarTab(tab.id)}
              className={`h-[72px] w-full flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                isActive
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title={tab.label}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SLIDE-OUT PANEL */}
      <AnimatePresence>
        {isSidebarOpen && activeSidebarTab && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-r border-gray-200 overflow-hidden"
          >
            <div className="w-[280px] h-full overflow-y-auto p-4">
              <h3 className="font-bold text-lg mb-4 capitalize">
                {activeSidebarTab}
              </h3>
              
              {/* IMAGES PANEL */}
              {activeSidebarTab === 'images' && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload photos or drag & drop
                  </p>
                  <button className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition flex flex-col items-center gap-2">
                    <Camera size={32} className="text-gray-400" />
                    <span>Click to Upload</span>
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Photo thumbnails will appear here */}
                  </div>
                </div>
              )}

              {/* TEMPLATES PANEL */}
              {activeSidebarTab === 'templates' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search themes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-sm text-gray-600">
                    Browse themes
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <button
                        key={i}
                        className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
                      >
                        <span className="text-xs text-gray-500">Theme {i}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* LAYOUTS PANEL */}
              {activeSidebarTab === 'layouts' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search layouts..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-sm text-gray-600">
                    Page layouts
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                      <button
                        key={i}
                        className="aspect-square bg-gray-100 rounded-lg hover:bg-gray-200 transition flex items-center justify-center text-xs"
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BACKGROUNDS PANEL */}
              {activeSidebarTab === 'backgrounds' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search backgrounds..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-sm text-gray-600">
                    Colors & patterns
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {['#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#000000'].map((color) => (
                      <button
                        key={color}
                        className="aspect-square rounded-lg border-2 border-gray-200 hover:border-gray-400 hover:scale-110 transition"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              )}

              {/* CLIPARTS PANEL */}
              {activeSidebarTab === 'cliparts' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Search cliparts..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-sm text-gray-600">
                    Stickers & cliparts
                  </p>
                  <div className="space-y-2">
                    {['Hearts', 'Stars', 'Flowers', 'Shapes', 'Frames'].map((category) => (
                      <button
                        key={category}
                        className="w-full py-2 px-3 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
