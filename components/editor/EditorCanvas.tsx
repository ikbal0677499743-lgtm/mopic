'use client'

export function EditorCanvas() {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100">
      <div className="relative">
        <div className="h-[600px] w-[850px] bg-white shadow-xl">
          <div className="flex h-full items-center justify-center text-gray-400">
            Canvas Area
          </div>
        </div>
      </div>
    </div>
  )
}
