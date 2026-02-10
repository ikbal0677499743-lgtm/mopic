'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if query params present (e.g., from Shopify)
    if (searchParams.toString()) {
      router.push(`/wizard?${searchParams.toString()}`);
    } else {
      // Redirect to Shopify store URL (placeholder)
      window.location.href = 'https://mopic-store.myshopify.com';
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Mopic</h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Mopic</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
