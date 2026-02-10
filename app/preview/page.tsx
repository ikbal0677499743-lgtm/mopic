'use client';

import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/lib/store/projectStore';
import { ArrowLeft } from 'lucide-react';

export default function PreviewPage() {
  const router = useRouter();
  const { projectName, pages, getSpreadLabel } = useProjectStore();

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/editor')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Editor</span>
          </button>
          <h1 className="font-display text-2xl font-bold">{projectName}</h1>
          <button
            onClick={() => router.push('/summary')}
            className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900"
          >
            Continue
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">
          Preview Your Photobook
        </h2>

        <div className="space-y-12">
          {pages.map((page, index) => (
            <div
              key={page.id}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h3 className="font-bold text-lg mb-4">
                {getSpreadLabel(index)}
              </h3>
              <div className="aspect-[2/1] bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">
                  Spread {index + 1} Preview
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
