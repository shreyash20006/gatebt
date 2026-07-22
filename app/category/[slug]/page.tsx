import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSubjects, getResources } from '@/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, BookOpen } from 'lucide-react';
import DirectDownloadButton from '@/components/DirectDownloadButton';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category Not Found' };
  return {
    title: `${category.name} Subjects & Notes`,
    description: `Open-access study material for ${category.name}. Direct PDF downloads.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    notFound();
  }

  const subjects = await getSubjects(String(category.id));
  const resources = await getResources();

  const featuredMap = new Map();
  resources.forEach(r => {
    if (!featuredMap.has(r.subject_id) || r.is_featured) {
      featuredMap.set(r.subject_id, r);
    }
  });

  return (
    <div className="space-y-8">
      {/* Notion Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-notion-muted">
        <Link href="/" className="hover:text-notion-text hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" /> Home
        </Link>
        <span>/</span>
        <span className="text-notion-text font-medium">{category.name}</span>
      </div>

      {/* Notion Page Header */}
      <header className="space-y-3 pb-4 border-b border-notion-divider">
        <div className="text-4xl">{category.icon}</div>
        <h1 className="text-3xl font-extrabold text-notion-text tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-notion-muted">
          Showing {subjects.length} subjects. Click any subject or download notes directly below.
        </p>
      </header>

      {/* Subjects Notion Database List View */}
      <div className="border border-notion-divider rounded-md divide-y divide-notion-divider bg-white">
        {subjects.map(subject => {
          const targetRes = featuredMap.get(subject.id);
          const filePath = targetRes?.file_path || `notes/${subject.slug}.pdf`;
          const resId = targetRes?.id || subject.id;

          return (
            <div
              key={subject.id}
              className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-notion-hover/60 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <span className="text-xl shrink-0 mt-0.5 sm:mt-0">{subject.icon || '📚'}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/subject/${subject.slug}`}
                      className="font-medium text-sm text-notion-text hover:text-notion-blue transition-colors truncate"
                    >
                      {subject.name}
                    </Link>
                    {subject.subject_code && (
                      <span className="px-1.5 py-0.5 rounded bg-notion-tag text-[10px] font-mono text-notion-muted border border-notion-divider">
                        {subject.subject_code}
                      </span>
                    )}
                    {subject.gate_weightage && (
                      <span className="text-[11px] text-emerald-700 font-medium">
                        • {subject.gate_weightage}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-notion-muted line-clamp-1 mt-0.5">
                    {subject.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <Link
                  href={`/subject/${subject.slug}`}
                  className="text-xs text-notion-muted hover:text-notion-text px-2 py-1 hover:bg-notion-hover rounded transition-colors"
                >
                  View
                </Link>
                <DirectDownloadButton
                  resourceId={resId}
                  filePath={filePath}
                  title={`${subject.name} Notes`}
                  label="Download"
                  compact
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
