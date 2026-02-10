'use client'

import { Button } from '@/components/ui/Button'

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold">Order Summary</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Book Preview</h2>
            <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400">Preview</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">11.5" × 8.5" Horizontal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cover Type:</span>
                <span className="font-medium">Hardcover</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paper Quality:</span>
                <span className="font-medium">Premium Lustre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pages:</span>
                <span className="font-medium">24</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>$50.00</span>
              </div>
            </div>
            <Button className="mt-6 w-full">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
