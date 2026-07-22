import { supabase } from '@/lib/supabase/client';
import { Category, Subject, Resource, Pyq, ResourceItem } from '@/lib/types';

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
  { id: 'r-1', subject_id: 's-1', title: 'Biochemistry — Handwritten Notes (Complete PDF)', type: 'notes_pdf', file_path: 'biochemistry.pdf', file_size: '14.2 MB', is_featured: true, download_count: 1240, created_at: '2026-01-10T00:00:00Z' },
  { id: 'r-2', subject_id: 's-1', title: 'Enzyme Kinetics & Metabolic Pathways Quick Sheet', type: 'notes_pdf', file_path: 'biochemistry-summary.pdf', file_size: '3.8 MB', is_featured: false, download_count: 480, created_at: '2026-01-12T00:00:00Z' },
  { id: 'r-3', subject_id: 's-2', title: 'Molecular Biology — Handwritten Notes (Complete PDF)', type: 'notes_pdf', file_path: 'molecular-biology.pdf', file_size: '16.5 MB', is_featured: true, download_count: 1150, created_at: '2026-01-10T00:00:00Z' },
  { id: 'r-4', subject_id: 's-2', title: 'DNA Replication & Repair Mechanisms Mind Map', type: 'mind_map', file_path: 'molecular-biology-mindmap.pdf', file_size: '4.1 MB', is_featured: false, download_count: 560, created_at: '2026-01-14T00:00:00Z' },
  { id: 'r-5', subject_id: 's-3', title: 'Microbiology — Complete Handwritten Notes', type: 'notes_pdf', file_path: 'microbiology.pdf', file_size: '11.8 MB', is_featured: false, download_count: 820, created_at: '2026-01-15T00:00:00Z' },
  { id: 'r-6', subject_id: 's-4', title: 'Immunology — Complete Handwritten Notes', type: 'notes_pdf', file_path: 'immunology.pdf', file_size: '9.4 MB', is_featured: false, download_count: 690, created_at: '2026-01-16T00:00:00Z' },
  { id: 'r-7', subject_id: 's-5', title: 'Recombinant DNA Tech — Handwritten Notes', type: 'notes_pdf', file_path: 'recombinant-dna.pdf', file_size: '12.1 MB', is_featured: false, download_count: 910, created_at: '2026-01-17T00:00:00Z' },
  { id: 'r-8', subject_id: 's-11', title: 'Bioprocess Engineering — Formulae & Notes', type: 'notes_pdf', file_path: 'bioprocess.pdf', file_size: '15.0 MB', is_featured: true, download_count: 1310, created_at: '2026-01-23T00:00:00Z' },
  { id: 'r-9', subject_id: 's-1', title: 'GATE BT Question Bank (2019–2024)', type: 'question_bank', file_path: 'gate-bt-question-bank-2019-2024.pdf', file_size: '24.5 MB', is_featured: true, download_count: 2150, created_at: '2026-02-01T00:00:00Z' },
  { id: 'r-10', subject_id: 's-2', title: 'GATE BT Mind Maps Collection', type: 'mind_map', file_path: 'gate-bt-mind-maps.pdf', file_size: '18.2 MB', is_featured: true, download_count: 1890, created_at: '2026-02-02T00:00:00Z' }
];

const MOCK_PYQS: Pyq[] = [
  { id: 1, question: 'Which of the following enzymes is responsible for unwinding the DNA double helix during replication in Escherichia coli?', year: 2024, subject: 'Molecular Biology', subject_slug: 'molecular-biology', marks: 1, difficulty: 'Easy', options: 'A) DNA Polymerase I  B) DnaB Helicase  C) Topoisomerase II  D) Primase', answer: 'B' },
  { id: 2, question: 'Michaelis-Menten kinetics of an enzyme-catalyzed reaction yields KM = 5 mM. At a substrate concentration of 15 mM, the reaction velocity is what percentage of Vmax?', year: 2023, subject: 'Biochemistry', subject_slug: 'biochemistry', marks: 2, difficulty: 'Medium', options: 'A) 50%  B) 66.7%  C) 75%  D) 80%', answer: 'C' },
  { id: 3, question: 'In a stirred tank bioreactor, the oxygen transfer rate (OTR) increases directly with an increase in:', year: 2024, subject: 'Bioprocess Engineering', subject_slug: 'bioprocess-engineering', marks: 2, difficulty: 'Medium', options: 'A) Volumetric mass transfer coefficient (kLa)  B) Liquid volume  C) Viscosity of fermentation broth  D) Substrate concentration', answer: 'A' },
  { id: 4, question: 'Which antibody isotype is primarily present in human mucosal secretions such as saliva, tears, and colostrum?', year: 2022, subject: 'Immunology', subject_slug: 'immunology', marks: 1, difficulty: 'Easy', options: 'A) IgG  B) IgM  C) IgA  D) IgE', answer: 'C' },
  { id: 5, question: 'During cell division, sister chromatids are held together by a protein complex called:', year: 2023, subject: 'Cell Biology', subject_slug: 'cell-biology', marks: 1, difficulty: 'Easy', options: 'A) Cohesin  B) Condensin  C) Kinesin  D) Tubulin', answer: 'A' },
  { id: 6, question: 'In Recombinant DNA Technology, which enzyme is utilized to generate complementary DNA (cDNA) from an mRNA template?', year: 2024, subject: 'Recombinant DNA Technology', subject_slug: 'recombinant-dna-technology', marks: 1, difficulty: 'Easy', options: 'A) Taq Polymerase  B) Reverse Transcriptase  C) DNA Ligase  D) Restriction Endonuclease', answer: 'B' },
  { id: 7, question: 'What is the probability of obtaining an AABB offspring from a cross between two heterozygous Parents (AaBb x AaBb)?', year: 2023, subject: 'Genetics', subject_slug: 'genetics', marks: 2, difficulty: 'Medium', options: 'A) 1/4  B) 1/8  C) 1/16  D) 9/16', answer: 'C' },
  { id: 8, question: 'BLAST (Basic Local Alignment Search Tool) algorithm uses which approach for fast sequence comparison?', year: 2024, subject: 'Bioinformatics', subject_slug: 'bioinformatics', marks: 1, difficulty: 'Easy', options: 'A) Needleman-Wunsch Dynamic Programming  B) Heuristic Seed Matching  C) Smith-Waterman Alignment  D) Markov Chain Monte Carlo', answer: 'B' },
  { id: 9, question: 'The primary function of Agrobacterium tumefaciens T-DNA during plant transformation is to insert into:', year: 2022, subject: 'Plant Biotechnology', subject_slug: 'plant-biotechnology', marks: 2, difficulty: 'Hard', options: 'A) Chloroplast DNA  B) Plant Nuclear Genome  C) Mitochondrial DNA  D) Cell Wall Glycoproteins', answer: 'B' },
  { id: 10, question: 'Monoclonal antibodies of specified antigen specificity are commercially produced by fusing myeloma cells with:', year: 2021, subject: 'Animal Biotechnology', subject_slug: 'animal-biotechnology', marks: 1, difficulty: 'Easy', options: 'A) T-lymphocytes  B) B-lymphocytes (Plasma cells)  C) Macrophages  D) Fibroblasts', answer: 'B' },
  { id: 11, question: 'Which of the following organic reactions follows an SN1 mechanism characterized by a carbocation intermediate?', year: 2023, subject: 'Pharmaceutical Organic Chemistry I', subject_slug: 'pharmaceutical-organic-chemistry-1', marks: 2, difficulty: 'Medium', options: 'A) Hydrolysis of tert-butyl bromide  B) Reaction of primary alcohol with HBr  C) Bromination of benzene  D) Dehydration of ethanol', answer: 'A' },
  { id: 12, question: 'A complete turn of a standard B-DNA double helix contains approximately how many base pairs?', year: 2024, subject: 'General Aptitude', subject_slug: 'general-aptitude', marks: 1, difficulty: 'Easy', options: 'A) 10.5  B) 12  C) 8.5  D) 15', answer: 'A' },
  { id: 13, question: 'Thermal death time (TDT) of micro-organisms during thermal sterilization is defined as time required to kill:', year: 2022, subject: 'Microbiology', subject_slug: 'microbiology', marks: 2, difficulty: 'Medium', options: 'A) 90% of population at given temp  B) 100% of population at given temp  C) 50% of population at given temp  D) 99.9% of population', answer: 'B' },
  { id: 14, question: 'Which parameter is used in downstream processing to characterize the resolution of two chromatographic peaks?', year: 2021, subject: 'Downstream Processing', subject_slug: 'downstream-processing', marks: 2, difficulty: 'Hard', options: 'A) Retention volume  B) Peak capacity  C) Separation factor & resolution (Rs)  D) Void volume', answer: 'C' },
  { id: 15, question: 'Which structural element in proteins is predominantly stabilized by intrachain hydrogen bonds parallel to the helix axis?', year: 2020, subject: 'Biochemistry', subject_slug: 'biochemistry', marks: 1, difficulty: 'Easy', options: 'A) Beta-pleated sheet  B) Alpha-helix  C) Reverse turn  D) Random coil', answer: 'B' }
];

const MOCK_RESOURCE_LIBRARY: ResourceItem[] = [
  { id: 1, name: 'Lehninger Principles of Biochemistry (Nelson & Cox)', type: 'Book', subject: 'Biochemistry', subject_slug: 'biochemistry', link: 'https://archive.org/details/lehninger-principles-of-biochemistry-7th-edition', rating: 9.8 },
  { id: 2, name: 'NPTEL Video Course: Biochemistry by Prof. Swagata Dasgupta (IIT KGP)', type: 'Video', subject: 'Biochemistry', subject_slug: 'biochemistry', link: 'https://nptel.ac.in/courses/102105034', rating: 9.5 },
  { id: 3, name: 'Molecular Biology of the Cell (Alberts et al.)', type: 'Book', subject: 'Molecular Biology', subject_slug: 'molecular-biology', link: 'https://www.ncbi.nlm.nih.gov/books/NBK21054/', rating: 9.9 },
  { id: 4, name: 'Khan Academy: DNA Replication, Transcription & Translation', type: 'Video', subject: 'Molecular Biology', subject_slug: 'molecular-biology', link: 'https://www.khanacademy.org/science/biology/gene-expression-central-dogma', rating: 9.4 },
  { id: 5, name: 'Prescott’s Microbiology (Willey et al.)', type: 'Book', subject: 'Microbiology', subject_slug: 'microbiology', link: 'https://archive.org/details/prescotts-microbiology-10th-edition', rating: 9.6 },
  { id: 6, name: 'Kuby Immunology (Punt, Stranford, Jones, Owen)', type: 'Book', subject: 'Immunology', subject_slug: 'immunology', link: 'https://archive.org/details/kuby-immunology-8th-edition', rating: 9.7 },
  { id: 7, name: 'Principles of Gene Manipulation and Genomics (Primrose & Twyman)', type: 'Book', subject: 'Recombinant DNA Technology', subject_slug: 'recombinant-dna-technology', link: 'https://archive.org/details/principles-of-gene-manipulation', rating: 9.5 },
  { id: 8, name: 'NCBI Molecular Biology Techniques & PCR Protocols Handbook', type: 'PDF', subject: 'Recombinant DNA Technology', subject_slug: 'recombinant-dna-technology', link: 'https://www.ncbi.nlm.nih.gov/pmc/', rating: 9.2 },
  { id: 9, name: 'Bioprocess Engineering Principles (Pauline M. Doran)', type: 'Book', subject: 'Bioprocess Engineering', subject_slug: 'bioprocess-engineering', link: 'https://archive.org/details/bioprocess-engineering-principles-doran', rating: 9.8 },
  { id: 10, name: 'NPTEL Bioprocess Engineering Video Series (IIT Madras)', type: 'Video', subject: 'Bioprocess Engineering', subject_slug: 'bioprocess-engineering', link: 'https://nptel.ac.in/courses/102106022', rating: 9.6 },
  { id: 11, name: 'Protein Purification Protocols & Chromatography Guide (GE Healthcare)', type: 'PDF', subject: 'Downstream Processing', subject_slug: 'downstream-processing', link: 'https://www.cytivalifesciences.com/en/us/solutions/protein-purification', rating: 9.4 },
  { id: 12, name: 'Principles of Genetics (Snustad & Simmons)', type: 'Book', subject: 'Genetics', subject_slug: 'genetics', link: 'https://archive.org/details/principles-of-genetics-snustad', rating: 9.4 },
  { id: 13, name: 'NCBI BLAST Quick Reference & Algorithm Tutorial', type: 'Website', subject: 'Bioinformatics', subject_slug: 'bioinformatics', link: 'https://blast.ncbi.nlm.nih.gov/Blast.cgi', rating: 9.7 },
  { id: 14, name: 'Bioinformatics: Sequence and Genome Analysis (David W. Mount)', type: 'Book', subject: 'Bioinformatics', subject_slug: 'bioinformatics', link: 'https://archive.org/details/bioinformatics-mount', rating: 9.3 },
  { id: 15, name: 'Plant Biotechnology: The Genetic Manipulation of Plants (Slater et al.)', type: 'Book', subject: 'Plant Biotechnology', subject_slug: 'plant-biotechnology', link: 'https://archive.org/details/plant-biotechnology-slater', rating: 9.1 },
  { id: 16, name: 'Culture of Animal Cells: A Manual of Basic Technique (R. Ian Freshney)', type: 'Book', subject: 'Animal Biotechnology', subject_slug: 'animal-biotechnology', link: 'https://archive.org/details/freshney-animal-cell-culture', rating: 9.5 },
  { id: 17, name: 'Advanced Engineering Mathematics (Erwin Kreyszig)', type: 'Book', subject: 'Engineering Mathematics', subject_slug: 'engineering-mathematics', link: 'https://archive.org/details/advanced-engineering-mathematics-kreyszig', rating: 9.6 },
  { id: 18, name: 'GATE Aptitude Formulae & Practice Questions (IIT GATE Portal)', type: 'PDF', subject: 'General Aptitude', subject_slug: 'general-aptitude', link: 'https://gate2024.iisc.ac.in/', rating: 9.3 },
  { id: 19, name: 'Foye’s Principles of Medicinal Chemistry (Lemke et al.)', type: 'Book', subject: 'Medicinal Chemistry I', subject_slug: 'medicinal-chemistry-1', link: 'https://archive.org/details/foyes-principles-medicinal-chemistry', rating: 9.7 },
  { id: 20, name: 'Trease and Evans Pharmacognosy (Evans)', type: 'Book', subject: 'Pharmacognosy & Phytochemistry I', subject_slug: 'pharmacognosy-phytochemistry-1', link: 'https://archive.org/details/trease-and-evans-pharmacognosy', rating: 9.6 },
  { id: 21, name: 'Organic Chemistry by Morrison & Boyd', type: 'Book', subject: 'Pharmaceutical Organic Chemistry I', subject_slug: 'pharmaceutical-organic-chemistry-1', link: 'https://archive.org/details/organic-chemistry-morrison-boyd', rating: 9.8 },
  { id: 22, name: 'PharmaPathshala & DBATU B.Pharmacy Official Curriculum Guides', type: 'Website', subject: 'Pharmaceutical Organic Chemistry I', subject_slug: 'pharmaceutical-organic-chemistry-1', link: 'https://dbatu.ac.in/', rating: 9.2 }
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

export async function getPyqs(subjectSlug?: string): Promise<Pyq[]> {
  if (isConfigured) {
    try {
      let query = supabase
        .from('pyqs')
        .select('id,question,year,subject,subject_slug,marks,difficulty,options,answer')
        .order('subject', { ascending: true })
        .order('year', { ascending: false });
      if (subjectSlug) {
        query = query.eq('subject_slug', subjectSlug);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as Pyq[];
    } catch (e) {
      console.warn('Supabase PYQs fetch failed, using fallback dataset', e);
    }
  }

  if (subjectSlug) {
    return MOCK_PYQS.filter(p => p.subject_slug === subjectSlug);
  }
  return MOCK_PYQS;
}

export async function getResourceLibrary(subjectSlug?: string): Promise<ResourceItem[]> {
  if (isConfigured) {
    try {
      let query = supabase
        .from('resource_library')
        .select('id,name,type,subject,subject_slug,link,rating')
        .order('subject', { ascending: true });
      if (subjectSlug) {
        query = query.eq('subject_slug', subjectSlug);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) return data as ResourceItem[];
    } catch (e) {
      console.warn('Supabase Resource Library fetch failed, using fallback dataset', e);
    }
  }

  if (subjectSlug) {
    return MOCK_RESOURCE_LIBRARY.filter(r => r.subject_slug === subjectSlug);
  }
  return MOCK_RESOURCE_LIBRARY;
}
