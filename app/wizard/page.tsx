'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function WizardPage() {
  const [mode, setMode] = useState<'shortcut' | 'manual'>('shortcut')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
          Create Your Photobook
        </h1>

        <div className="mb-8 flex justify-center gap-4">
          <Button
            variant={mode === 'shortcut' ? 'primary' : 'secondary'}
            onClick={() => setMode('shortcut')}
          >
            Quick Start
          </Button>
          <Button
            variant={mode === 'manual' ? 'primary' : 'secondary'}
            onClick={() => setMode('manual')}
          >
            Custom Setup
          </Button>
        </div>

        {mode === 'shortcut' ? (
          <div className="rounded-lg bg-white p-8 shadow">
            <h2 className="mb-4 text-2xl font-semibold">Quick Start</h2>
            <p className="mb-6 text-gray-600">
              Choose a theme and we'll set up your photobook with recommended settings.
            </p>
            <div className="mb-6 grid grid-cols-3 gap-4">
              {['Travel', 'Classic', 'Modern'].map((theme) => (
                <div
                  key={theme}
                  className="cursor-pointer rounded-lg border-2 border-gray-200 p-4 text-center transition-colors hover:border-pink-600"
                >
                  <div className="mb-2 h-32 bg-gray-100 rounded"></div>
                  <p className="font-medium">{theme}</p>
                </div>
              ))}
            </div>
            <Link href="/editor">
              <Button className="w-full">Start Editing</Button>
            </Link>
          </div>
        ) : (
          <div className="rounded-lg bg-white p-8 shadow">
            <h2 className="mb-4 text-2xl font-semibold">Custom Setup</h2>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-medium">Book Size</label>
                <div className="grid grid-cols-3 gap-4">
                  {['Horizontal', 'Vertical', 'Square'].map((size) => (
                    <div
                      key={size}
                      className="cursor-pointer rounded-lg border-2 border-gray-200 p-4 text-center transition-colors hover:border-pink-600"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block font-medium">Cover Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Hardcover', 'Softcover'].map((type) => (
                    <div
                      key={type}
                      className="cursor-pointer rounded-lg border-2 border-gray-200 p-4 text-center transition-colors hover:border-pink-600"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/editor">
                <Button className="w-full">Continue to Editor</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
