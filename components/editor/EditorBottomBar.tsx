'use client';

import { useProjectStore } from '@/lib/store/projectStore';
import { useUIStore } from '@/lib/store/uiStore';
import { Columns2, Grid3x3, Minus, Plus, FilePlus, Copy, Trash2 } from 'lucide-react';

export default function EditorBottomBar() {
  const {
    currentSpreadIndex,
    getTotalSpreads,
    getTotalPages,
    getSpreadLabel,
    nextSpread,
    prevSpread,
    setCurrentSpread,
    addPages,
    duplicateSpread,
    deleteSpread,
    pages,
    pageConfig,
  } = useProjectStore();
  
  const {
    zoom,
    zoomIn,
    zoomOut,
    viewMode,
    setViewMode,
    showThumbnails,
    toggleThumbnails,
  } = useUIStore();

  const totalSpreads = getTotalSpreads();
  const totalPages = getTotalPages();
  const canGoPrev = currentSpreadIndex > 0;
  const canGoNext = currentSpreadIndex < totalSpreads - 1;
  const canAddPages = totalPages < pageConfig.pagesMax;
  const canRemovePages = totalPages > pageConfig.pagesMin;
  const canDeleteSpread = currentSpreadIndex > 0 && canRemovePages;
  const canDuplicateSpread = currentSpreadIndex > 0 && canAddPages;

  return (
    <div className="h-32 bg-white border-t border-gray-200">
      {/* TOP ROW: CONTROLS */}
      <div className="h-8 border-b border-gray-100 bg-white flex items-center justify-between px-4">
        {/* LEFT: View Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('spread')}
            className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition ${
              viewMode === 'spread'
                ? 'font-medium text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            <Columns2 size={14} />
            Single Page
          </button>
          <button
            onClick={() => setViewMode('allPages')}
            className={`px-2 py-1 text-xs font-medium rounded flex items-center gap-1 transition ${
              viewMode === 'allPages'
                ? 'font-medium text-black'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            <Grid3x3 size={14} />
            All Pages
          </button>
        </div>

        {/* CENTER: Page Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSpread}
            disabled={!canGoPrev}
            className={`text-sm hover:text-black transition ${
              !canGoPrev ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'
            }`}
          >
            ‹ Previous page
          </button>
          
          <div className="text-sm font-medium">
            {getSpreadLabel(currentSpreadIndex)}
          </div>
          
          <button
            onClick={nextSpread}
            disabled={!canGoNext}
            className={`text-sm hover:text-black transition ${
              !canGoNext ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'
            }`}
          >
            Next page ›
          </button>
        </div>

        {/* RIGHT: Thumbnails Toggle & Zoom */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-gray-700">
            <input
              type="checkbox"
              className="w-3 h-3"
              checked={showThumbnails}
              onChange={toggleThumbnails}
            />
            Hide page thumbnails
          </label>
          
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={zoom <= 50}
              className={`w-7 h-7 rounded border hover:bg-gray-100 flex items-center justify-center transition ${
                zoom <= 50 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <Minus size={14} />
            </button>
            
            <div className="text-xs font-medium w-12 text-center">
              {zoom}%
            </div>
            
            <button
              onClick={zoomIn}
              disabled={zoom >= 200}
              className={`w-7 h-7 rounded border hover:bg-gray-100 flex items-center justify-center transition ${
                zoom >= 200 ? 'opacity-30 cursor-not-allowed' : ''
              }`}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: THUMBNAILS */}
      {showThumbnails && (
        <div className="h-24 bg-white border-t border-gray-100 flex items-center px-4">
          {/* LEFT: Thumbnail Strip */}
          <div className="flex-1 overflow-x-auto">
            <div className="flex gap-3 items-end" style={{ scrollSnapType: 'x mandatory' }}>
              {pages.map((page, index) => {
                const isActive = index === currentSpreadIndex;
                const isCover = page.pageType === 'cover_spread';
                
                let label = '';
                if (isCover) {
                  label = 'Cover';
                } else if (index === 1) {
                  label = 'Page 1';
                } else {
                  const leftPage = (index - 1) * 2;
                  const rightPage = leftPage + 1;
                  label = `Page ${leftPage}-${rightPage}`;
                }
                
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentSpread(index)}
                    className={`flex-shrink-0 cursor-pointer transition-transform ${
                      isActive ? 'scale-105' : ''
                    }`}
                  >
                    {/* Thumbnail Box */}
                    <div
                      className={`${
                        isCover ? 'w-20' : 'w-20'
                      } h-14 rounded border bg-gray-50 overflow-hidden ${
                        isActive
                          ? 'ring-2 ring-black'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                        {label}
                      </div>
                    </div>
                    
                    {/* Label Below */}
                    <div className="text-[10px] text-gray-500 text-center mt-1">
                      {label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          <div className="flex flex-col gap-1 px-3 border-l border-gray-200 ml-3">
            <button
              onClick={() => addPages(4)}
              disabled={!canAddPages}
              className={`text-xs px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1.5 transition ${
                !canAddPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Add 4 pages (2 spreads)"
            >
              <FilePlus size={14} />
              Add Pages
            </button>
            
            <button
              onClick={() => duplicateSpread(currentSpreadIndex)}
              disabled={!canDuplicateSpread}
              className={`text-xs px-3 py-1.5 rounded hover:bg-gray-100 flex items-center gap-1.5 transition ${
                !canDuplicateSpread ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Duplicate current spread"
            >
              <Copy size={14} />
              Duplicate
            </button>
            
            <button
              onClick={() => deleteSpread(currentSpreadIndex)}
              disabled={!canDeleteSpread}
              className={`text-xs px-3 py-1.5 rounded hover:bg-red-50 hover:text-red-600 flex items-center gap-1.5 transition ${
                !canDeleteSpread ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Delete current spread"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
