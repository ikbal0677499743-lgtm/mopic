'use client';

import { useEffect, useRef } from 'react';
import { useProjectStore } from '@/lib/store/projectStore';
import { useUIStore } from '@/lib/store/uiStore';
import { inchesToPx, formatDimension } from '@/lib/utils/units';

export default function EditorCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    currentSpreadIndex,
    getCurrentSpread,
    getSpreadInfo,
    isOnCoverSpread,
  } = useProjectStore();
  const { zoomLevel } = useUIStore();

  const spread = getCurrentSpread();
  const spreadInfo = getSpreadInfo(currentSpreadIndex);
  const isCover = isOnCoverSpread();

  if (!spread || !spreadInfo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-editor-workspace">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { workspace, totalWidth, totalHeight } = spreadInfo;
  
  // Calculate CSS pixels at current zoom
  const widthPx = inchesToPx(totalWidth, zoomLevel);
  const heightPx = inchesToPx(totalHeight, zoomLevel);
  
  // Calculate spine width for hardcover
  const isHardcover = workspace.bindingType === 'hardcover';
  const spineWidthPx = isHardcover ? inchesToPx(workspace.spineWidth, zoomLevel) : 0;
  
  return (
    <div className="flex-1 flex flex-col bg-editor-workspace overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <div className="text-white text-sm">
          <span className="font-medium">{spreadInfo.label}</span>
          <span className="text-gray-400 ml-3">
            {formatDimension(totalWidth)} × {formatDimension(totalHeight)}
          </span>
        </div>
        <div className="text-white text-sm">
          {workspace.displayName}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-8">
        <div
          ref={canvasRef}
          className="relative bg-white shadow-2xl"
          style={{
            width: `${widthPx}px`,
            height: `${heightPx}px`,
          }}
        >
          {/* Cover Spread (backCover + spine + frontCover) */}
          {isCover && (
            <>
              {/* Back Cover (left) */}
              <div
                className="absolute left-0 top-0 bottom-0 border-r-2 border-gray-300"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Back Cover
                </div>
              </div>

              {/* Spine (center, only for hardcover) */}
              {isHardcover && spineWidthPx > 0 && (
                <div
                  className="absolute top-0 bottom-0 bg-gray-100 border-x-2 border-gray-300"
                  style={{
                    left: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                    width: `${spineWidthPx}px`,
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs transform -rotate-90 whitespace-nowrap">
                      Spine
                    </span>
                  </div>
                </div>
              )}

              {/* Front Cover (right) */}
              <div
                className="absolute right-0 top-0 bottom-0 border-l-2 border-gray-300"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Front Cover
                </div>
              </div>
            </>
          )}

          {/* Inner Spread (left page + right page) */}
          {!isCover && (
            <>
              {/* Left Page */}
              <div
                className="absolute left-0 top-0 bottom-0 border-r border-gray-300"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Page {spreadInfo.leftPageNumber}
                </div>
              </div>

              {/* Center Line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-gray-400"
                style={{
                  left: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                }}
              ></div>

              {/* Right Page */}
              <div
                className="absolute right-0 top-0 bottom-0 border-l border-gray-300"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoomLevel)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Page {spreadInfo.rightPageNumber}
                </div>
              </div>
            </>
          )}

          {/* Safe Zone Guides (optional) */}
          <div className="absolute inset-0 pointer-events-none border-4 border-dashed border-blue-300 opacity-20"></div>
        </div>
      </div>
    </div>
  );
}
