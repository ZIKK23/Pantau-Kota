'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type MapViewType from '@/components/map/MapView';

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full bg-surface-container-low rounded-xl animate-pulse" />
  ),
});

export default function MapViewClient(props: ComponentProps<typeof MapViewType>) {
  return <MapView {...props} />;
}
