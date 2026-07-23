import Gate3DApp from '@/components/Gate3DApp';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D GATE 2027 Preparation Hub — Interactive 3D Papers & Mock Tests',
  description: 'Modern 3D GATE preparation web application. Email OTP authentication, 3D flip tilt cards for Civil (CE), Biotechnology (BT), Computer Science (CS), Electrical (EE), Mechanical (ME), dynamic subjects & study checklists.',
};

export default function Home() {
  return <Gate3DApp />;
}
