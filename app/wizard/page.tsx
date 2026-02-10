'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Image, Layout } from 'lucide-react';
import ShortcutMode from '@/components/wizard/ShortcutMode';
import ManualMode from '@/components/wizard/ManualMode';
import { SIZE_WORKSPACE_MAP, WORKSPACES } from '@/lib/data/workspaces';

function WizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [type, setType] = useState('HC');
  const [size, setSize] = useState('HC_Square');
  const [theme, setTheme] = useState('');
  const [workspacesResolved, setWorkspacesResolved] = useState(false);

  useEffect(() => {
    // Read query params from Shopify
    const typeParam = searchParams.get('type');
    const sizeParam = searchParams.get('size');
    const themeParam = searchParams.get('theme');

    if (typeParam) setType(typeParam);
    if (sizeParam) setSize(sizeParam);
    if (themeParam) setTheme(themeParam);

    // Resolve workspaces from size parameter
    if (sizeParam) {
      const workspaceMapping = SIZE_WORKSPACE_MAP[sizeParam];
      
      if (workspaceMapping) {
        const coverWorkspace = WORKSPACES[workspaceMapping.cover];
        const blockWorkspace = WORKSPACES[workspaceMapping.block];
        const pageConfig = workspaceMapping.pageConfig;

        // Store in sessionStorage for editor
        sessionStorage.setItem('coverWorkspace', JSON.stringify(coverWorkspace));
        sessionStorage.setItem('blockWorkspace', JSON.stringify(blockWorkspace));
        sessionStorage.setItem('pageConfig', pageConfig);
        
        setWorkspacesResolved(true);
      }
    } else {
      // Default resolution if no size param
      const defaultMapping = SIZE_WORKSPACE_MAP['HC_Square'];
      const coverWorkspace = WORKSPACES[defaultMapping.cover];
      const blockWorkspace = WORKSPACES[defaultMapping.block];
      const pageConfig = defaultMapping.pageConfig;

      sessionStorage.setItem('coverWorkspace', JSON.stringify(coverWorkspace));
      sessionStorage.setItem('blockWorkspace', JSON.stringify(blockWorkspace));
      sessionStorage.setItem('pageConfig', pageConfig);
      
      setWorkspacesResolved(true);
    }
  }, [searchParams]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background scattered icons */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Left side icons */}
        <div className="absolute top-20 left-10">
          <Layout size={80} className="text-gray-400" />
        </div>
        <div className="absolute top-1/2 left-20">
          <Image size={60} className="text-gray-400" />
        </div>
        <div className="absolute bottom-40 left-16">
          <Layout size={100} className="text-gray-400" />
        </div>
        
        {/* Right side icons */}
        <div className="absolute top-32 right-16">
          <Image size={90} className="text-gray-400" />
        </div>
        <div className="absolute top-2/3 right-24">
          <Layout size={70} className="text-gray-400" />
        </div>
        <div className="absolute bottom-32 right-12">
          <Image size={85} className="text-gray-400" />
        </div>
      </div>

      {/* Header */}
      <header className="h-14 border-b border-gray-200 px-6 flex items-center justify-between relative z-10">
        <button
          onClick={handleBack}
          className="flex flex-col items-start group"
        >
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="text-xs text-gray-500 group-hover:text-gray-700">BACK</span>
        </button>
        
        <h1 className="font-display text-xl font-medium lowercase">mopic</h1>
        
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-[65%_35%] min-h-[calc(100vh-3.5rem)] relative">
        {/* Left Column - Shortcut Mode */}
        <div className="bg-gray-50/80 relative z-10 py-12 lg:py-20">
          <ShortcutMode type={type} size={size} theme={theme} />
        </div>

        {/* Right Column - Manual Mode */}
        <div className="bg-white relative z-10 py-12 lg:py-20">
          <ManualMode type={type} size={size} theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Loading...</h1>
            <p className="text-gray-600">Preparing your photobook wizard</p>
          </div>
        </div>
      }
    >
      <WizardContent />
    </Suspense>
  );
}
