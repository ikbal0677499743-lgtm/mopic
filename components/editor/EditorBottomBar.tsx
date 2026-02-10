'use client';

import { useProjectStore } from '@/lib/store/projectStore';
import { useUIStore } from '@/lib/store/uiStore';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Grid, Eye } from 'lucide-react';

export default function EditorBottomBar() {
  const {
    currentSpreadIndex,
    getTotalSpreads,
    getSpreadLabel,
    nextSpread,
    prevSpread,
    setCurrentSpread,
    pages,
  } = useProjectStore();
  
  const {
    zoomLevel,
    zoomIn,
    zoomOut,
    viewMode,
    setViewMode,
  } = useUIStore();

  const totalSpreads = getTotalSpreads();
  const canGoPrev = currentSpreadIndex > 0;
  const canGoNext = currentSpreadIndex < totalSpreads - 1;

  return (
    <div className="bg-white border-t border-gray-200">
      {/* Top Row: Controls */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('spread')}
            className={`px-3 py-1.5 text-sm font-medium rounded ${
              viewMode === 'spread'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={16} className="inline mr-1" />
            Spread View
          </button>
          <button
            onClick={() => setViewMode('allPages')}
            className={`px-3 py-1.5 text-sm font-medium rounded ${
              viewMode === 'allPages'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Grid size={16} className="inline mr-1" />
            All Pages
          </button>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSpread}
            disabled={!canGoPrev}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="text-sm font-medium min-w-32 text-center">
            {getSpreadLabel(currentSpreadIndex)}
            <span className="text-gray-500 ml-2">
              ({currentSpreadIndex + 1} / {totalSpreads})
            </span>
          </div>
          
          <button
            onClick={nextSpread}
            disabled={!canGoNext}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={zoomOut}
            disabled={zoomLevel <= 50}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ZoomOut size={20} />
          </button>
          
          <div className="text-sm font-medium min-w-16 text-center">
            {zoomLevel}%
          </div>
          
          <button
            onClick={zoomIn}
            disabled={zoomLevel >= 200}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ZoomIn size={20} />
          </button>
        </div>
      </div>

      {/* Bottom Row: Page Thumbnails */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2">
          {pages.map((page, index) => {
            const isActive = index === currentSpreadIndex;
            const isCover = page.pageType === 'cover_spread';
            
            return (
              <button
                key={page.id}
                onClick={() => setCurrentSpread(index)}
                className={`flex-shrink-0 relative ${
                  isActive
                    ? 'ring-2 ring-black'
                    : 'ring-1 ring-gray-300 hover:ring-gray-400'
                } rounded overflow-hidden`}
              >
                {/* Thumbnail */}
                <div
                  className={`${
                    isCover ? 'w-24' : 'w-20'
                  } h-14 bg-gray-100 flex items-center justify-center`}
                >
                  <span className="text-xs text-gray-500">
                    {isCover ? 'Cover' : `${page.pageNumber}-${page.pageNumber + 1}`}
                  </span>
                </div>
                
                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-70 text-white text-xs py-0.5 text-center">
                  {getSpreadLabel(index)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
