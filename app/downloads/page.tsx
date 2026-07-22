import { getAllResourcesWithMetadata } from '@/lib/data';
import AllDownloadsTable from '@/components/AllDownloadsTable';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Downloads',
  description: 'Complete database of handwritten notes, question banks, mind maps, and papers for GATE Biotechnology and B.Pharmacy DBATU.',
};

export const revalidate = 60;

export default async function AllDownloadsPage() {
  const resources = await getAllResourcesWithMetadata();

  return (
    <div className="space-y-6">
      {/* Notion Title Header */}
      <header className="space-y-2 pb-4 border-b border-notion-divider">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📁</span>
          <h1 className="text-3xl font-extrabold text-notion-text tracking-tight">
            All Downloads
          </h1>
        </div>
        <p className="text-sm text-notion-muted">
          Filter and directly download any study material across GATE Biotechnology & B.Pharmacy DBATU.
        </p>
      </header>

      {/* Notion Database Table View */}
      <AllDownloadsTable resources={resources} />
    </div>
  );
}
