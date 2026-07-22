export type Paper = {
  id: number;
  paper: string;
  code: string;
  category: string;
  target_year: string;
  priority: string;
  notes: string | null;
  syllabus_pdf: string;
  youtube: string;
  pdf_resources: string;
  source_name?: string;
  source_url?: string;
  is_official?: boolean;
  syllabus_year?: number;
  is_revised?: boolean;
};

export type PaperPlan = Paper;

export type Pyq = {
  id: number;
  question: string;
  year: number;
  subject: string;
  subject_slug: string;
  marks: number;
  difficulty: string;
  options: string;
  answer: string;
};

export type Resource = {
  id: number | string;
  name?: string;
  type: string;
  subject?: string | { id: number | string; name: string; slug?: string; subject_code?: string | null; category?: Category | { id: number | string; slug: string; name: string } | null };
  subject_slug?: string;
  link?: string;
  rating?: number | null;
  subject_id?: string;
  is_featured?: boolean;
  file_path?: string;
  title?: string;
  download_count?: number;
  file_size?: string;
  created_at?: string;
};

export interface ResourceItem {
  id: number;
  name: string;
  type: string;
  subject: string;
  subject_slug: string;
  link: string;
  rating: number | null;
}

export type Subject = {
  id: number | string;
  slug: string;
  name: string;
  tagline?: string | null;
  notes_md?: string | null;
  category_slug?: string;
  pdf_path?: string | null;
  mindmap_path?: string | null;
  icon?: string | null;
  description?: string | null;
  subject_code?: string | null;
  gate_weightage?: string | null;
  category_id?: string;
  sort_order?: number;
  category?: Category | { id: number | string; slug: string; name: string } | null;
};

export interface Category {
  id: number | string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  sort_order?: number;
}

