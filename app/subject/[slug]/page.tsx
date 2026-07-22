import { notFound } from 'next/navigation';
import { getSubjectBySlug, getResources } from '@/lib/data';
import SubjectView from '@/components/SubjectView';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

interface SubjectPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SubjectPageProps): Promise<Metadata> {
  const subject = await getSubjectBySlug(params.slug);
  if (!subject) return { title: 'Subject Not Found' };
  return {
    title: `${subject.name} Notes & Resources`,
    description: `Download ${subject.name} ${subject.subject_code ? `(${subject.subject_code})` : ''} handwritten notes and mind maps directly.`,
  };
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const subject = await getSubjectBySlug(params.slug);
  if (!subject) {
    notFound();
  }

  const resources = await getResources(subject.id);

  return (
    <div className="space-y-6">
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

      {/* Render SubjectView */}
      <SubjectView subject={subject} resources={resources} />
    </div>
  );
}
