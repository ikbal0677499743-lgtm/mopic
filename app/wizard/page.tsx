'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WizardPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'quick' | 'custom'>('quick');
  const [step, setStep] = useState(1);
  
  // Selections
  const [selectedType, setSelectedType] = useState('HC');
  const [selectedSize, setSelectedSize] = useState('HC_Square');
  const [selectedPaper, setSelectedPaper] = useState('standardPaper');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [projectName, setProjectName] = useState('My Photobook');

  const handleStartEditor = () => {
    const params = new URLSearchParams({
      type: selectedType,
      size: selectedSize,
      paper: selectedPaper,
      ...(selectedTheme && { theme: selectedTheme }),
      name: projectName,
    });
    router.push(`/editor?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Mopic</h1>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to Store
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">
            Create Your Photobook
          </h2>
          <p className="text-lg text-gray-600">
            Choose how you'd like to get started
          </p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => setMode('quick')}
            className={`p-8 rounded-lg border-2 transition-all ${
              mode === 'quick'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <h3 className="font-display text-2xl font-bold mb-2">
              Quick Start
            </h3>
            <p className={mode === 'quick' ? 'text-gray-300' : 'text-gray-600'}>
              Choose a theme and start editing
            </p>
          </button>

          <button
            onClick={() => setMode('custom')}
            className={`p-8 rounded-lg border-2 transition-all ${
              mode === 'custom'
                ? 'border-black bg-black text-white'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <h3 className="font-display text-2xl font-bold mb-2">
              Custom Setup
            </h3>
            <p className={mode === 'custom' ? 'text-gray-300' : 'text-gray-600'}>
              Configure all options step by step
            </p>
          </button>
        </div>

        {mode === 'quick' ? (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-6">
              Choose a Theme
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {['Classic', 'Modern', 'Elegant', 'Minimal', 'Vintage', 'Bold'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme.toLowerCase())}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedTheme === theme.toLowerCase()
                      ? 'border-black'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 rounded mb-3"></div>
                  <p className="font-medium">{theme}</p>
                </button>
              ))}
            </div>
            <button
              onClick={handleStartEditor}
              className="w-full py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900"
            >
              Start Editing
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {/* Step 1: Type */}
            {step === 1 && (
              <>
                <h3 className="font-display text-2xl font-bold mb-6">
                  Choose Cover Type
                </h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <button
                    onClick={() => setSelectedType('HC')}
                    className={`p-8 rounded-lg border-2 ${
                      selectedType === 'HC'
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-bold text-xl mb-2">Hardcover</h4>
                    <p className="text-gray-600">Premium quality with rigid cover</p>
                  </button>
                  <button
                    onClick={() => setSelectedType('SC')}
                    className={`p-8 rounded-lg border-2 ${
                      selectedType === 'SC'
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-bold text-xl mb-2">Softcover</h4>
                    <p className="text-gray-600">Flexible and lightweight</p>
                  </button>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-black text-white rounded-lg font-medium"
                >
                  Next: Choose Size
                </button>
              </>
            )}

            {/* Step 2: Size */}
            {step === 2 && (
              <>
                <h3 className="font-display text-2xl font-bold mb-6">
                  Choose Size & Orientation
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { key: `${selectedType}_Horizontal`, label: 'Horizontal', desc: '11.8" × 8.3"' },
                    { key: `${selectedType}_Vertical`, label: 'Vertical', desc: '8.3" × 11.8"' },
                    { key: `${selectedType}_Square`, label: 'Square', desc: '11.8" × 11.8"' },
                  ].map((size) => (
                    <button
                      key={size.key}
                      onClick={() => setSelectedSize(size.key)}
                      className={`p-6 rounded-lg border-2 ${
                        selectedSize === size.key
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-bold mb-2">{size.label}</h4>
                      <p className="text-sm text-gray-600">{size.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-black text-white rounded-lg font-medium"
                  >
                    Next: Choose Paper
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Paper */}
            {step === 3 && (
              <>
                <h3 className="font-display text-2xl font-bold mb-6">
                  Choose Paper Type
                </h3>
                <div className="space-y-4 mb-8">
                  {[
                    { key: 'standardPaper', label: 'Standard Glossy', price: '+$0.00/page' },
                    { key: 'deepMatte', label: 'Deep Matte', price: '+$0.50/page' },
                    { key: 'silk', label: 'Silk', price: '+$0.75/page' },
                  ].map((paper) => (
                    <button
                      key={paper.key}
                      onClick={() => setSelectedPaper(paper.key)}
                      className={`w-full p-6 rounded-lg border-2 flex justify-between items-center ${
                        selectedPaper === paper.key
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-bold">{paper.label}</h4>
                      <p className="text-gray-600">{paper.price}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 py-4 bg-black text-white rounded-lg font-medium"
                  >
                    Next: Choose Theme
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Theme */}
            {step === 4 && (
              <>
                <h3 className="font-display text-2xl font-bold mb-6">
                  Choose a Theme (Optional)
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {['Classic', 'Modern', 'Elegant', 'Minimal', 'Vintage', 'Bold'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setSelectedTheme(theme.toLowerCase())}
                      className={`p-6 rounded-lg border-2 ${
                        selectedTheme === theme.toLowerCase()
                          ? 'border-black'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="aspect-square bg-gray-100 rounded mb-3"></div>
                      <p className="font-medium">{theme}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 border border-gray-300 rounded-lg font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartEditor}
                    className="flex-1 py-4 bg-black text-white rounded-lg font-medium"
                  >
                    Start Editing
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
