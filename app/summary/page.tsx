'use client';

import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/lib/store/projectStore';
import { calculatePrice, formatPrice } from '@/lib/utils/priceCalculator';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function SummaryPage() {
  const router = useRouter();
  const {
    projectName,
    selectedType,
    selectedSize,
    selectedPaper,
    pageConfig,
    pages,
  } = useProjectStore();

  // Calculate total pages (cover counts as 2)
  const totalPages = (pages.length - 1) * 2 + 2;

  // Calculate price
  const priceCalc = calculatePrice({
    selectedSize,
    selectedPaper,
    pageConfigName: pageConfig.name,
    totalPages,
  });

  const handleAddToCart = () => {
    // TODO: Implement add to cart
    alert('Add to cart functionality coming soon!');
  };

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
          <h1 className="font-display text-2xl font-bold">Mopic</h1>
          <div></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="font-display text-4xl font-bold mb-8 text-center">
          Order Summary
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="font-display text-2xl font-bold mb-6">
              {projectName}
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Type</span>
                <span className="font-medium">
                  {selectedType === 'HC' ? 'Hardcover' : 'Softcover'}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Size</span>
                <span className="font-medium">
                  {selectedSize.replace('_', ' ')}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Paper</span>
                <span className="font-medium">
                  {selectedPaper === 'standardPaper'
                    ? 'Standard Glossy'
                    : selectedPaper === 'deepMatte'
                    ? 'Deep Matte'
                    : 'Silk'}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Total Pages</span>
                <span className="font-medium">{totalPages} pages</span>
              </div>
            </div>

            {/* Preview Thumbnail */}
            <div className="mt-6 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Cover Preview</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="font-display text-2xl font-bold mb-6">
              Price Breakdown
            </h3>

            <div className="space-y-4 mb-6">
              {priceCalc.breakdown.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-3 border-b border-gray-200"
                >
                  <span className="text-gray-600 text-sm">{item.label}</span>
                  <span className="font-medium">
                    {formatPrice(item.amount)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-4 border-t-2 border-gray-900">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-2xl">
                {formatPrice(priceCalc.total)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Example Calculations Note */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pricing Examples:</strong>
              </p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>• HC Square + Glossy + 24p = $35.00</li>
                <li>• HC Square + Silk + 40p = $89.00</li>
                <li>• SC Horizontal + Matte + 60p = $86.00</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
