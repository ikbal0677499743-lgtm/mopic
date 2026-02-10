'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Preview Your Book</h1>
          <div className="flex gap-4">
            <Link href="/editor">
              <Button variant="secondary">Back to Editor</Button>
            </Link>
            <Link href="/summary">
              <Button>Continue to Summary</Button>
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow">
          <div className="flex items-center justify-center">
            <div className="h-[600px] w-[850px] bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400">Book Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
