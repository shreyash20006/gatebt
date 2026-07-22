import { notFound } from 'next/navigation';
import { getSubjectBySlug, getResources } from '@/lib/data';
import ResourceCard from '@/components/ResourceCard';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import DirectDownloadButton from '@/components/DirectDownloadButton';

interface SubjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subject = await getSubjectBySlug(params.slug);
  if (!subject) return { title: 'Subject Not Found' };
  return {
    title: `${subject.name} Notes & Resources`,
    description: `Download ${subject.name} ${subject.subject_code ? `(${subject.subject_code})` : ''} handwritten notes and study material directly.`,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const subject = await getSubjectBySlug(params.slug);
  if (!subject) {
    notFound();
  }

  const resources = await getResources(subject.id);
  const featuredResources = resources.filter(r => r.is_featured);
  const otherResources = resources.filter(r => !r.is_featured);

  const primaryResource = resources[0];
  const primaryFilePath = primaryResource?.file_path || `notes/${subject.slug}.pdf`;
  const primaryResourceId = primaryResource?.id || subject.id;

  return (
    <article className="space-y-8">
      {/* Notion Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-notion-muted">
        <Link href="/" className="hover:text-notion-text hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Home
        </Link>
        {subject.category && (
          <>
            <span>/</span>
            <Link
              href={`/category/${subject.category.slug}`}
              className="hover:text-notion-text hover:underline"
            >
              {subject.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-notion-text font-medium">{subject.name}</span>
      </div>

      {/* Notion Document Header */}
      <header className="space-y-4 pb-6 border-b border-notion-divider">
        <div className="text-4xl">{subject.icon || '📚'}</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-notion-text tracking-tight">
          {subject.name}
        </h1>

        {/* Notion Property Metadata Rows */}
        <div className="bg-notion-hover/50 border border-notion-divider rounded-md p-3.5 space-y-2 text-xs">
          {subject.subject_code && (
            <div className="flex items-center gap-4">
              <span className="w-28 text-notion-muted font-medium">Subject Code:</span>
              <span className="font-mono text-notion-text bg-white px-2 py-0.5 rounded border border-notion-divider">
                {subject.subject_code}
              </span>
            </div>
          )}
          {subject.gate_weightage && (
            <div className="flex items-center gap-4">
              <span className="w-28 text-notion-muted font-medium">GATE Weightage:</span>
              <span className="text-emerald-700 font-semibold">{subject.gate_weightage}</span>
            </div>
          )}
          <div className="flex items-start gap-4">
            <span className="w-28 text-notion-muted font-medium shrink-0">Overview:</span>
            <span className="text-notion-text leading-relaxed">{subject.description}</span>
          </div>
        </div>
      </header>

      {/* Downloads Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-notion-text uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-notion-blue" />
            <span>Downloads ({resources.length})</span>
          </h2>
          <DirectDownloadButton
            resourceId={primaryResourceId}
            filePath={primaryFilePath}
            title={`${subject.name} Primary Notes`}
            label="Download Notes PDF"
            compact
          />
        </div>

        {resources.length === 0 ? (
          <div className="p-4 border border-notion-divider rounded-md text-center text-xs text-notion-muted">
            No specific files uploaded yet for this subject.
          </div>
        ) : (
          <div className="space-y-3">
            {/* Featured Resources */}
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}

            {/* Other Resources */}
            {otherResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
