import GateCivilGuide from '@/components/GateCivilGuide';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GATE Civil Engineering (CE) 2027 — Complete Guide, Cutoffs & Study Plan',
  description: 'Complete guide for GATE Civil Engineering 2027 aspirants. Eligibility criteria, 4-year cutoff trends, M.Tech Structural Engineering guide, resource library, and 70-day study plan.',
};

export default function Home() {
  return <GateCivilGuide />;
}
