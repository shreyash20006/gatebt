import type { Metadata } from 'next';
import './globals.css';
import { getCategories, getSubjects } from '@/lib/data';
import AppLayoutClient from '@/components/AppLayoutClient';

export const metadata: Metadata = {
  title: {
    default: 'GateBT Prep — Open Access Study Notes Hub',
    template: '%s | GateBT Prep',
  },
  description: 'Clean open-access study notes repository for GATE Biotechnology & B.Pharmacy DBATU. Direct PDF download without login.',
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, subjects] = await Promise.all([
    getCategories(),
    getSubjects(),
  ]);

  return (
    <html lang="en">
      <body>
        <AppLayoutClient categories={categories} subjects={subjects}>
          {children}
        </AppLayoutClient>
      </body>
    </html>
  );
}
