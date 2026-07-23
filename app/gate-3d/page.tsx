import Gate3DApp from '@/components/Gate3DApp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D GATE Preparation Hub',
  description: 'Interactive 3D GATE preparation web application.',
};

export default function Gate3DPage() {
  return <Gate3DApp />;
}
