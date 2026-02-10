'use client';

import { useEffect, useRef } from 'react';
import { useProjectStore } from '@/lib/store/projectStore';
import { useUIStore } from '@/lib/store/uiStore';
import { inchesToPx, formatDimension } from '@/lib/utils/units';
import { Type, Image as ImageIcon, LayoutGrid, Square, Circle } from 'lucide-react';

const TOOL_BUTTONS = [
  { id: 'text', label: 'Text', icon: Type },
  { id: 'photo', label: 'Photo', icon: ImageIcon },
  { id: 'layout', label: 'Layout', icon: LayoutGrid },
  { id: 'rectangle', label: 'Rectangle', icon: Square },
  { id: 'ellipse', label: 'Ellipse', icon: Circle },
];

export default function EditorCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    currentSpreadIndex,
    getCurrentSpread,
    getSpreadInfo,
    isOnCoverSpread,
    getTotalPages,
  } = useProjectStore();
  const { zoom } = useUIStore();

  const spread = getCurrentSpread();
  const spreadInfo = getSpreadInfo(currentSpreadIndex);
  const isCover = isOnCoverSpread();
  const totalPages = getTotalPages();

  if (!spread || !spreadInfo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1a1a2e]">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { workspace, totalWidth, totalHeight } = spreadInfo;
  
  // Calculate CSS pixels at current zoom
  const widthPx = inchesToPx(totalWidth, zoom);
  const heightPx = inchesToPx(totalHeight, zoom);
  
  // Calculate dynamic spine width for hardcover covers
  const isHardcover = workspace.bindingType === 'hardcover';
  const dynamicSpine = isHardcover && isCover
    ? workspace.spineWidth + (totalPages * workspace.paperThickness)
    : workspace.spineWidth;
  const spineWidthPx = isHardcover && isCover ? inchesToPx(dynamicSpine, zoom) : 0;
  
  return (
    <div className="flex-1 flex flex-col bg-[#1a1a2e] overflow-hidden relative">
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative">
        {/* Spread Container */}
        <div
          ref={canvasRef}
          className="relative bg-white shadow-2xl"
          style={{
            width: `${widthPx}px`,
            height: `${heightPx}px`,
          }}
        >
          {/* COVER SPREAD RENDERING */}
          {isCover && (
            <>
              {/* Back Cover (left) */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-white"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 border-r border-gray-300">
                  <span className="text-sm">Back Cover</span>
                </div>
              </div>

              {/* Spine (center, only for hardcover) */}
              {isHardcover && spineWidthPx > 0 && (
                <div
                  className="absolute top-0 bottom-0 bg-gray-50 border-x border-dashed border-gray-400"
                  style={{
                    left: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                    width: `${spineWidthPx}px`,
                  }}
                >
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-500 text-xs transform -rotate-90 whitespace-nowrap">
                      Spine
                    </span>
                  </div>
                </div>
              )}

              {/* SC Cover Center Line (no spine) */}
              {!isHardcover && (
                <div
                  className="absolute top-0 bottom-0 w-px bg-gray-300"
                  style={{
                    left: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                  }}
                ></div>
              )}

              {/* Front Cover (right) */}
              <div
                className="absolute right-0 top-0 bottom-0 bg-white"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 border-l border-gray-300">
                  <span className="text-sm">Front Cover</span>
                </div>
              </div>
            </>
          )}

          {/* INNER SPREAD RENDERING */}
          {!isCover && (
            <>
              {/* Left Page */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-white"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <span className="text-sm">Page {spreadInfo.leftPageNumber}</span>
                </div>
              </div>

              {/* Center Line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-gray-300 border-dashed"
                style={{
                  left: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                }}
              ></div>

              {/* Right Page */}
              <div
                className="absolute right-0 top-0 bottom-0 bg-white"
                style={{
                  width: `${inchesToPx(workspace.pageWidth, zoom)}px`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <span className="text-sm">Page {spreadInfo.rightPageNumber}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* LEFT FLOATING TOOLBAR */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {TOOL_BUTTONS.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={`left-${tool.id}`}
                className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:bg-gray-50 hover:shadow-md transition"
                title={tool.label}
              >
                <Icon size={16} />
                <span className="text-[8px] text-gray-500">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* RIGHT FLOATING TOOLBAR */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          {TOOL_BUTTONS.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={`right-${tool.id}`}
                className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer hover:bg-gray-50 hover:shadow-md transition"
                title={tool.label}
              >
                <Icon size={16} />
                <span className="text-[8px] text-gray-500">{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* DIMENSIONS INFO OVERLAY */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1.5 rounded-lg text-xs">
          {formatDimension(totalWidth)} × {formatDimension(totalHeight)} @ {zoom}%
        </div>
      </div>
    </div>
  );
}
