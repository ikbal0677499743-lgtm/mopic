'use client';

import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface ManualModeProps {
  type: string;
  size: string;
  theme: string;
}

export default function ManualMode({ type, size, theme }: ManualModeProps) {
  const router = useRouter();

  const handleGoToEditor = () => {
    const params = new URLSearchParams({
      mode: 'manual',
      type,
      size,
      theme,
    });
    router.push(`/editor?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full justify-center px-8 lg:px-12">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="font-display text-3xl font-black mb-3">Manual Mode</h2>
        <p className="text-gray-500 text-sm">
          Take full control of the creation process.
        </p>
      </div>

      {/* Illustration */}
      <div className="mb-8 flex justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="text-gray-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Hand-drawn style illustration of hand flipping book pages */}
          <path
            d="M80 80 Q100 60, 120 80 L120 140 Q100 160, 80 140 Z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M120 80 Q140 60, 160 80 L160 140 Q140 160, 120 140"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Hand */}
          <path
            d="M140 100 Q150 95, 155 100 L155 115 Q150 120, 145 115 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleGoToEditor}
        className="w-full py-3 px-8 border border-gray-300 bg-white text-black rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
      >
        Go to Editor
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
