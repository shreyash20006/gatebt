import { notFound } from 'next/navigation';
import { getSubjectBySlug, getResources, getSubjects } from '@/lib/data';
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

  const [resources, siblingSubjects] = await Promise.all([
    getResources(subject.id),
    getSubjects(subject.category_id),
  ]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-navy hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        {subject.category && (
          <>
            <span>/</span>
            <Link
              href={`/category/${subject.category.slug}`}
              className="hover:text-brand-navy hover:underline"
            >
              {subject.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-brand-navy font-bold">{subject.name}</span>
      </div>

      {/* Render Vibrant SubjectView */}
      <SubjectView
        subject={subject}
        resources={resources}
        siblingSubjects={siblingSubjects}
      />
    </div>
  );
}
