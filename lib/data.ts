import { supabase } from '@/lib/supabase/client';
import { Category, Subject, Resource } from '@/lib/types';

// Hardcoded fallback dataset matching database seed for initial offline/demo preview
const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'GATE Biotechnology', slug: 'gate-biotechnology', icon: '🧬', sort_order: 1 },
  { id: 'cat-2', name: 'B.Pharmacy — DBATU', slug: 'b-pharmacy-dbatu', icon: '🎓', sort_order: 2 }
];

const MOCK_SUBJECTS: Subject[] = [
  // GATE Biotechnology
  { id: 's-1', category_id: 'cat-1', name: 'Biochemistry', slug: 'biochemistry', subject_code: 'BT-BC', description: 'Structure & function of biomolecules, enzymes, metabolism pathways, bioenergetics.', icon: '🧪', gate_weightage: '12-15%', pdf_path: 'biochemistry.pdf', sort_order: 1 },
  { id: 's-2', category_id: 'cat-1', name: 'Molecular Biology', slug: 'molecular-biology', subject_code: 'BT-MB', description: 'DNA replication, transcription, translation, gene regulation & DNA repair mechanisms.', icon: '🧬', gate_weightage: '10-14%', pdf_path: 'molecular-biology.pdf', sort_order: 2 },
  { id: 's-3', category_id: 'cat-1', name: 'Microbiology', slug: 'microbiology', subject_code: 'BT-MC', description: 'Bacterial structure, viral replication, microbial growth kinetics & sterilization.', icon: '🧫', gate_weightage: '8-10%', pdf_path: 'microbiology.pdf', sort_order: 3 },
  { id: 's-4', category_id: 'cat-1', name: 'Immunology', slug: 'immunology', subject_code: 'BT-IM', description: 'Innate and adaptive immunity, antibodies, MHC complexes & immunological techniques.', icon: '🛡️', gate_weightage: '6-8%', pdf_path: 'immunology.pdf', sort_order: 4 },
  { id: 's-5', category_id: 'cat-1', name: 'Recombinant DNA Technology', slug: 'recombinant-dna-technology', subject_code: 'BT-RD', description: 'Restriction enzymes, vectors, cloning strategies, PCR & genomic libraries.', icon: '✂️', gate_weightage: '8-12%', pdf_path: 'recombinant-dna.pdf', sort_order: 5 },
  { id: 's-6', category_id: 'cat-1', name: 'Cell Biology', slug: 'cell-biology', subject_code: 'BT-CB', description: 'Membrane transport, organelle biogenesis, cell cycle regulation & signaling pathways.', icon: '🔬', gate_weightage: '6-8%', pdf_path: 'cell-biology.pdf', sort_order: 6 },
  { id: 's-7', category_id: 'cat-1', name: 'Plant Biotechnology', slug: 'plant-biotechnology', subject_code: 'BT-PB', description: 'Totipotency, tissue culture, transgenic plants & secondary metabolites.', icon: '🌱', gate_weightage: '5-7%', pdf_path: 'plant-biotech.pdf', sort_order: 7 },
  { id: 's-8', category_id: 'cat-1', name: 'Animal Biotechnology', slug: 'animal-biotechnology', subject_code: 'BT-AB', description: 'Animal cell culture, stem cell technology, transfection & monoclonal antibodies.', icon: '🧫', gate_weightage: '4-6%', pdf_path: 'animal-biotech.pdf', sort_order: 8 },
  { id: 's-9', category_id: 'cat-1', name: 'Environmental Biotechnology', slug: 'environmental-biotechnology', subject_code: 'BT-EV', description: 'Wastewater treatment, bioremediation, bioenergy & biosensors.', icon: '🌿', gate_weightage: '3-5%', pdf_path: 'environmental-biotech.pdf', sort_order: 9 },
  { id: 's-10', category_id: 'cat-1', name: 'Food Biotechnology', slug: 'food-biotechnology', subject_code: 'BT-FB', description: 'Food preservation, fermentation technology & food quality evaluation.', icon: '🍎', gate_weightage: '3-5%', pdf_path: 'food-biotech.pdf', sort_order: 10 },
  { id: 's-11', category_id: 'cat-1', name: 'Bioprocess Engineering', slug: 'bioprocess-engineering', subject_code: 'BT-BE', description: 'Stoichiometry, microbial growth kinetics, bioreactor design & oxygen transfer.', icon: '⚙️', gate_weightage: '12-16%', pdf_path: 'bioprocess.pdf', sort_order: 11 },
  { id: 's-12', category_id: 'cat-1', name: 'Downstream Processing', slug: 'downstream-processing', subject_code: 'BT-DP', description: 'Cell disruption, filtration, chromatography, extraction & crystallization.', icon: '⚗️', gate_weightage: '6-8%', pdf_path: 'downstream.pdf', sort_order: 12 },
  { id: 's-13', category_id: 'cat-1', name: 'Genetics', slug: 'genetics', subject_code: 'BT-GN', description: 'Mendelian inheritance, linkage mapping, population genetics & mutations.', icon: '📊', gate_weightage: '5-7%', pdf_path: 'genetics.pdf', sort_order: 13 },
  { id: 's-14', category_id: 'cat-1', name: 'Bioinformatics', slug: 'bioinformatics', subject_code: 'BT-BI', description: 'Sequence alignment algorithms, BLAST, phylogenetic trees & structural databases.', icon: '💻', gate_weightage: '4-6%', pdf_path: 'bioinformatics.pdf', sort_order: 14 },
  { id: 's-15', category_id: 'cat-1', name: 'Instrumentation', slug: 'instrumentation', subject_code: 'BT-IN', description: 'Spectrophotometry, NMR, mass spectrometry, X-ray crystallography & electrophoresis.', icon: '🔬', gate_weightage: '5-7%', pdf_path: 'instrumentation.pdf', sort_order: 15 },
  { id: 's-16', category_id: 'cat-1', name: 'Engineering Mathematics', slug: 'engineering-mathematics', subject_code: 'BT-EM', description: 'Linear algebra, calculus, differential equations & probability statistics.', icon: '📐', gate_weightage: '13-15%', pdf_path: 'eng-math.pdf', sort_order: 16 },
  { id: 's-17', category_id: 'cat-1', name: 'General Aptitude', slug: 'general-aptitude', subject_code: 'BT-GA', description: 'Verbal ability, numerical reasoning, analytical skills & spatial aptitude.', icon: '💡', gate_weightage: '15%', pdf_path: 'general-aptitude.pdf', sort_order: 17 },

  // B.Pharmacy DBATU
  { id: 's-18', category_id: 'cat-2', name: 'Pharmaceutical Organic Chemistry I', slug: 'pharmaceutical-organic-chemistry-1', subject_code: 'BP202T', description: 'Classification, isomerism, reactions of alkanes, alkenes, conjugated dienes & alkyl halides.', icon: '🧪', gate_weightage: null, pdf_path: 'bp202t.pdf', sort_order: 1 },
  { id: 's-19', category_id: 'cat-2', name: 'Pharmaceutical Organic Chemistry II', slug: 'pharmaceutical-organic-chemistry-2', subject_code: 'BP301T', description: 'Benzene & derivative aromaticity, phenols, aromatic amines, fats & oils.', icon: '⚗️', gate_weightage: null, pdf_path: 'bp301t.pdf', sort_order: 2 },
  { id: 's-20', category_id: 'cat-2', name: 'Pharmaceutical Organic Chemistry III', slug: 'pharmaceutical-organic-chemistry-3', subject_code: 'BP401T', description: 'Stereoisomerism, optical activity, heterocycles & named organic reactions.', icon: '🔬', gate_weightage: null, pdf_path: 'bp401t.pdf', sort_order: 3 },
  { id: 's-21', category_id: 'cat-2', name: 'Medicinal Chemistry I', slug: 'medicinal-chemistry-1', subject_code: 'BP402T', description: 'SAR, mechanism of action & synthesis of autonomic and central nervous system drugs.', icon: '💊', gate_weightage: null, pdf_path: 'bp402t.pdf', sort_order: 4 },
  { id: 's-22', category_id: 'cat-2', name: 'Medicinal Chemistry II', slug: 'medicinal-chemistry-2', subject_code: 'BP501T', description: 'Antihistamines, cardiovascular agents, endocrine drugs, local anesthetics & diuretics.', icon: '🩸', gate_weightage: null, pdf_path: 'bp501t.pdf', sort_order: 5 },
  { id: 's-23', category_id: 'cat-2', name: 'Medicinal Chemistry III', slug: 'medicinal-chemistry-3', subject_code: 'BP601T', description: 'Antibiotics, anti-infective agents, antimalarials, anti-TB & anticancer drugs.', icon: '🩺', gate_weightage: null, pdf_path: 'bp601t.pdf', sort_order: 6 },
  { id: 's-24', category_id: 'cat-2', name: 'Pharmacognosy & Phytochemistry I', slug: 'pharmacognosy-phytochemistry-1', subject_code: 'BP405T', description: 'Plant metabolites, crude drug evaluation, plant tissue culture & primary metabolites.', icon: '🌱', gate_weightage: null, pdf_path: 'bp405t.pdf', sort_order: 7 },
  { id: 's-25', category_id: 'cat-2', name: 'Pharmacognosy & Phytochemistry II', slug: 'pharmacognosy-phytochemistry-2', subject_code: 'BP504T', description: 'Biosynthetic pathways (shikimic/mevalonic), isolation & estimation of phytoconstituents.', icon: '🌿', gate_weightage: null, pdf_path: 'bp504t.pdf', sort_order: 8 },
  { id: 's-26', category_id: 'cat-2', name: 'Pharmaceutical Biotechnology', slug: 'pharmaceutical-biotechnology', subject_code: 'BP605T', description: 'Enzyme technology, protein engineering, vaccines, immunity & rDNA pharmaceuticals.', icon: '🧬', gate_weightage: null, pdf_path: 'bp605t.pdf', sort_order: 9 }
];

const MOCK_RESOURCES: Resource[] = [
  // GATE Biotechnology
  { id: 'r-1', subject_id: 's-1', title: 'Biochemistry — Handwritten Notes (Complete PDF)', type: 'notes_pdf', file_path: 'notes/biochemistry.pdf', file_size: '14.2 MB', is_featured: true, download_count: 1240, created_at: '2026-01-10T00:00:00Z' },
  { id: 'r-2', subject_id: 's-1', title: 'Enzyme Kinetics & Metabolic Pathways Quick Sheet', type: 'notes_pdf', file_path: 'notes/biochemistry-summary.pdf', file_size: '3.8 MB', is_featured: false, download_count: 480, created_at: '2026-01-12T00:00:00Z' },
  { id: 'r-3', subject_id: 's-2', title: 'Molecular Biology — Handwritten Notes (Complete PDF)', type: 'notes_pdf', file_path: 'notes/molecular-biology.pdf', file_size: '16.5 MB', is_featured: true, download_count: 1150, created_at: '2026-01-10T00:00:00Z' },
  { id: 'r-4', subject_id: 's-2', title: 'DNA Replication & Repair Mechanisms Mind Map', type: 'mind_map', file_path: 'notes/molecular-biology-mindmap.pdf', file_size: '4.1 MB', is_featured: false, download_count: 560, created_at: '2026-01-14T00:00:00Z' },
  { id: 'r-5', subject_id: 's-3', title: 'Microbiology — Complete Handwritten Notes', type: 'notes_pdf', file_path: 'notes/microbiology.pdf', file_size: '11.8 MB', is_featured: false, download_count: 820, created_at: '2026-01-15T00:00:00Z' },
  { id: 'r-6', subject_id: 's-4', title: 'Immunology — Complete Handwritten Notes', type: 'notes_pdf', file_path: 'notes/immunology.pdf', file_size: '9.4 MB', is_featured: false, download_count: 690, created_at: '2026-01-16T00:00:00Z' },
  { id: 'r-7', subject_id: 's-5', title: 'Recombinant DNA Tech — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/recombinant-dna-technology.pdf', file_size: '12.1 MB', is_featured: false, download_count: 910, created_at: '2026-01-17T00:00:00Z' },
  { id: 'r-8', subject_id: 's-6', title: 'Cell Biology — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/cell-biology.pdf', file_size: '8.7 MB', is_featured: false, download_count: 540, created_at: '2026-01-18T00:00:00Z' },
  { id: 'r-9', subject_id: 's-7', title: 'Plant Biotechnology — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/plant-biotechnology.pdf', file_size: '7.3 MB', is_featured: false, download_count: 420, created_at: '2026-01-19T00:00:00Z' },
  { id: 'r-10', subject_id: 's-8', title: 'Animal Biotechnology — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/animal-biotechnology.pdf', file_size: '6.9 MB', is_featured: false, download_count: 380, created_at: '2026-01-20T00:00:00Z' },
  { id: 'r-11', subject_id: 's-9', title: 'Environmental Biotechnology — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/environmental-biotechnology.pdf', file_size: '5.5 MB', is_featured: false, download_count: 310, created_at: '2026-01-21T00:00:00Z' },
  { id: 'r-12', subject_id: 's-10', title: 'Food Biotechnology — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/food-biotechnology.pdf', file_size: '5.2 MB', is_featured: false, download_count: 290, created_at: '2026-01-22T00:00:00Z' },
  { id: 'r-13', subject_id: 's-11', title: 'Bioprocess Engineering — Formulae & Notes', type: 'notes_pdf', file_path: 'notes/bioprocess-engineering.pdf', file_size: '15.0 MB', is_featured: true, download_count: 1310, created_at: '2026-01-23T00:00:00Z' },
  { id: 'r-14', subject_id: 's-12', title: 'Downstream Processing — Handwritten Notes', type: 'notes_pdf', file_path: 'notes/downstream-processing.pdf', file_size: '8.9 MB', is_featured: false, download_count: 670, created_at: '2026-01-24T00:00:00Z' },
  { id: 'r-15', subject_id: 's-13', title: 'Genetics — Problem Solving & Notes', type: 'notes_pdf', file_path: 'notes/genetics.pdf', file_size: '7.8 MB', is_featured: false, download_count: 490, created_at: '2026-01-25T00:00:00Z' },
  { id: 'r-16', subject_id: 's-14', title: 'Bioinformatics — Algorithm Notes', type: 'notes_pdf', file_path: 'notes/bioinformatics.pdf', file_size: '6.1 MB', is_featured: false, download_count: 430, created_at: '2026-01-26T00:00:00Z' },
  { id: 'r-17', subject_id: 's-15', title: 'Instrumentation — Spectrophotometry & NMR Notes', type: 'notes_pdf', file_path: 'notes/instrumentation.pdf', file_size: '9.2 MB', is_featured: false, download_count: 610, created_at: '2026-01-27T00:00:00Z' },
  { id: 'r-18', subject_id: 's-16', title: 'Engineering Mathematics — GATE Formula Sheet', type: 'notes_pdf', file_path: 'notes/engineering-mathematics.pdf', file_size: '10.5 MB', is_featured: false, download_count: 880, created_at: '2026-01-28T00:00:00Z' },
  { id: 'r-19', subject_id: 's-17', title: 'General Aptitude — GATE Practice PDF', type: 'notes_pdf', file_path: 'notes/general-aptitude.pdf', file_size: '6.8 MB', is_featured: false, download_count: 750, created_at: '2026-01-29T00:00:00Z' },
  
  // GATE Extra Resources
  { id: 'r-20', subject_id: 's-1', title: 'GATE BT Question Bank (2019–2024)', type: 'question_bank', file_path: 'notes/gate-bt-question-bank-2019-2024.pdf', file_size: '24.5 MB', is_featured: true, download_count: 2150, created_at: '2026-02-01T00:00:00Z' },
  { id: 'r-21', subject_id: 's-2', title: 'GATE BT Mind Maps Collection', type: 'mind_map', file_path: 'notes/gate-bt-mind-maps.pdf', file_size: '18.2 MB', is_featured: true, download_count: 1890, created_at: '2026-02-02T00:00:00Z' },
  { id: 'r-22', subject_id: 's-1', title: 'All GATE Papers Hub — GATE 2027 (30 papers)', type: 'paper', file_path: 'notes/all-gate-papers-hub-2027.pdf', file_size: '45.0 MB', is_featured: true, download_count: 3400, created_at: '2026-02-03T00:00:00Z' },

  // B.Pharmacy DBATU
  { id: 'r-23', subject_id: 's-18', title: 'BP202T — Pharmaceutical Organic Chem I (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp202t-poc1.pdf', file_size: '12.5 MB', is_featured: true, download_count: 730, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-24', subject_id: 's-19', title: 'BP301T — Pharmaceutical Organic Chem II (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp301t-poc2.pdf', file_size: '13.1 MB', is_featured: true, download_count: 680, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-25', subject_id: 's-20', title: 'BP401T — Pharmaceutical Organic Chem III (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp401t-poc3.pdf', file_size: '11.9 MB', is_featured: true, download_count: 620, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-26', subject_id: 's-21', title: 'BP402T — Medicinal Chemistry I (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp402t-medchem1.pdf', file_size: '14.0 MB', is_featured: true, download_count: 810, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-27', subject_id: 's-22', title: 'BP501T — Medicinal Chemistry II (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp501t-medchem2.pdf', file_size: '13.8 MB', is_featured: true, download_count: 760, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-28', subject_id: 's-23', title: 'BP601T — Medicinal Chemistry III (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp601t-medchem3.pdf', file_size: '14.5 MB', is_featured: true, download_count: 840, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-29', subject_id: 's-24', title: 'BP405T — Pharmacognosy & Phytochemistry I (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp405t-cognosy1.pdf', file_size: '10.8 MB', is_featured: true, download_count: 590, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-30', subject_id: 's-25', title: 'BP504T — Pharmacognosy & Phytochemistry II (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp504t-cognosy2.pdf', file_size: '11.2 MB', is_featured: true, download_count: 610, created_at: '2026-02-05T00:00:00Z' },
  { id: 'r-31', subject_id: 's-26', title: 'BP605T — Pharmaceutical Biotechnology (25-Page Notes)', type: 'notes_pdf', file_path: 'notes/bp605t-pharmbiotech.pdf', file_size: '12.0 MB', is_featured: true, download_count: 720, created_at: '2026-02-05T00:00:00Z' }
];

const isConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('example.supabase.co')
);

export async function getCategories(): Promise<Category[]> {
  if (isConfigured) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Category[];
    } catch (e) {
      console.warn('Supabase fetch failed, using fallback categories', e);
    }
  }
  return MOCK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isConfigured) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Category;
    } catch (e) {
      console.warn(`Supabase category fetch failed for ${slug}, using fallback`);
    }
  }
  return MOCK_CATEGORIES.find(c => c.slug === slug) || null;
}

export async function getSubjects(categoryId?: string): Promise<Subject[]> {
  if (isConfigured) {
    try {
      let query = supabase.from('subjects').select('*, category:categories(*)');
      if (categoryId) query = query.eq('category_id', categoryId);
      const { data, error } = await query.order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data as Subject[];
    } catch (e) {
      console.warn('Supabase subjects fetch failed, using fallback', e);
    }
  }
  
  let list = MOCK_SUBJECTS.map(s => ({
    ...s,
    category: MOCK_CATEGORIES.find(c => c.id === s.category_id)
  }));
  if (categoryId) {
    list = list.filter(s => s.category_id === categoryId);
  }
  return list;
}

export async function getSubjectBySlug(slug: string): Promise<Subject | null> {
  if (isConfigured) {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*, category:categories(*)')
        .eq('slug', slug)
        .single();
      if (!error && data) return data as Subject;
    } catch (e) {
      console.warn(`Supabase subject fetch failed for ${slug}, using fallback`);
    }
  }
  const found = MOCK_SUBJECTS.find(s => s.slug === slug);
  if (!found) return null;
  return {
    ...found,
    category: MOCK_CATEGORIES.find(c => c.id === found.category_id)
  };
}

export async function getResources(subjectId?: string): Promise<Resource[]> {
  if (isConfigured) {
    try {
      let query = supabase.from('resources').select('*, subject:subjects(*, category:categories(*))');
      if (subjectId) query = query.eq('subject_id', subjectId);
      const { data, error } = await query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Resource[];
    } catch (e) {
      console.warn('Supabase resources fetch failed, using fallback', e);
    }
  }

  const subjectsMap = new Map(MOCK_SUBJECTS.map(s => [s.id, {
    ...s,
    category: MOCK_CATEGORIES.find(c => c.id === s.category_id)
  }]));

  let list = MOCK_RESOURCES.map(r => ({
    ...r,
    subject: subjectsMap.get(r.subject_id)
  }));

  if (subjectId) {
    list = list.filter(r => r.subject_id === subjectId);
  }

  return list.sort((a, b) => {
    if (a.is_featured === b.is_featured) return 0;
    return a.is_featured ? -1 : 1;
  });
}

export async function getAllResourcesWithMetadata(): Promise<Resource[]> {
  return getResources();
}
