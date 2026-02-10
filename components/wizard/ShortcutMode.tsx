'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Monitor, Smartphone, FolderOpen, Upload, X } from 'lucide-react';

interface ShortcutModeProps {
  type: string;
  size: string;
  theme: string;
}

interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
}

export default function ShortcutMode({ type, size, theme }: ShortcutModeProps) {
  const router = useRouter();
  const [showSourceButtons, setShowSourceButtons] = useState(false);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/heic': ['.heic'],
    },
    multiple: true,
    noClick: showSourceButtons, // Disable click when buttons are shown
  });

  const handleAddPhotosClick = () => {
    setShowSourceButtons(true);
  };

  const handleComputerClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/jpeg,image/png,image/webp,image/heic';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const files = Array.from(target.files);
        onDrop(files);
      }
    };
    input.click();
  };

  const handlePhoneClick = () => {
    setShowQRCode(true);
  };

  const handleMyPhotosClick = () => {
    // TODO: Implement "My Photos" feature
    alert('My Photos feature coming soon!');
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => {
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return prev.filter(p => p.id !== id);
    });
  };

  const handleContinue = () => {
    // Store photos in sessionStorage
    const photosData = photos.map(p => ({
      id: p.id,
      name: p.file.name,
      size: p.file.size,
      type: p.file.type,
    }));
    sessionStorage.setItem('uploadedPhotos', JSON.stringify(photosData));
    
    // Navigate to editor in smart mode
    const params = new URLSearchParams({
      mode: 'smart',
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
        <h2 className="font-display text-3xl font-black mb-3">Shortcut</h2>
        <p className="text-gray-500 text-sm">
          Upload your photos, review the AI-created layout, customize to your liking.
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
          {/* Hand-drawn style illustration of hand clicking stopwatch over book */}
          <circle cx="100" cy="80" r="30" strokeLinecap="round" />
          <path d="M100 50 L100 80 L115 95" strokeLinecap="round" />
          <path d="M90 40 L110 40" strokeLinecap="round" strokeWidth="3" />
          {/* Book pages */}
          <path
            d="M60 120 L60 160 L140 160 L140 120"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M60 120 L140 120" strokeLinecap="round" />
          <path d="M100 120 L100 160" strokeLinecap="round" strokeDasharray="4 4" />
          {/* Hand */}
          <path
            d="M110 60 Q120 55, 125 60 L125 75 Q120 80, 115 75 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Upload Area */}
      {!showSourceButtons ? (
        <div className="space-y-4">
          <button
            onClick={handleAddPhotosClick}
            className="w-full py-4 px-8 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-900 transition-colors"
          >
            Add Photos
          </button>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl py-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-black bg-gray-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <p className="text-sm font-medium text-gray-500">
              or drag & drop here
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Source Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleComputerClick}
              className="py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Monitor size={18} />
              Computer
            </button>
            <button
              onClick={handlePhoneClick}
              className="py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Smartphone size={18} />
              Add from phone
            </button>
          </div>
          <button
            onClick={handleMyPhotosClick}
            className="w-full py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          >
            <FolderOpen size={18} />
            My Photos
          </button>

          {/* Drag & Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl py-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-black bg-gray-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-500">
              {isDragActive ? 'Drop files here' : 'or drag & drop here'}
            </p>
          </div>
        </div>
      )}

      {/* Photo Thumbnails */}
      {photos.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {photos.length} photo{photos.length !== 1 ? 's' : ''} uploaded
            </p>
          </div>
          <div className="grid grid-cols-4 gap-3 max-h-60 overflow-y-auto">
            {photos.map(photo => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.preview}
                  alt={photo.file.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemovePhoto(photo.id)}
                  className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleContinue}
            className="w-full py-4 px-8 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            Continue →
          </button>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowQRCode(false)}>
          <div className="bg-white rounded-xl p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-xl font-bold">Scan to Upload from Phone</h3>
              <button onClick={() => setShowQRCode(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
              <p className="text-gray-500 text-sm">QR Code placeholder</p>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Scan this QR code with your phone to upload photos
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
