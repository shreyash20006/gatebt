export type ResourceType = 'notes_pdf' | 'mind_map' | 'question_bank' | 'paper' | 'other';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
}

export interface Subject {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  subject_code: string | null;
  description: string;
  icon: string;
  gate_weightage: string | null;
  sort_order: number;
  pdf_path?: string | null;
  category?: Category;
  resources_count?: number;
}

export interface Resource {
  id: string;
  subject_id: string;
  title: string;
  type: ResourceType;
  file_path: string;
  file_size: string | null;
  is_featured: boolean;
  download_count: number;
  created_at: string;
  subject?: Subject;
}
