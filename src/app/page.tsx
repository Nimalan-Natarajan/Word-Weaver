'use client';

import dynamic from 'next/dynamic';

const PoetryGenerator = dynamic(() => import('@/components/PoetryGenerator'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Poetry Generator...</p>
      </div>
    </div>
  )
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <PoetryGenerator />
    </div>
  );
}
