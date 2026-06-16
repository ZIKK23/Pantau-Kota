'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type AdminMapViewType from '@/components/map/AdminMapView';

const AdminMapView = dynamic(() => import('@/components/map/AdminMapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-surface-container-low rounded-xl animate-pulse" />
  ),
});

export default function AdminMapViewClient(props: ComponentProps<typeof AdminMapViewType>) {
  return <AdminMapView {...props} />;
}
