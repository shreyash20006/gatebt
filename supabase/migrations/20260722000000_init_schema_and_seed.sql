-- Supabase SQL Migration: GateBT Prep Schema, RLS, Functions & Seed Data
-- Storage Bucket: Create a public bucket named "notes" in Supabase Dashboard.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- 2. Create Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subject_code TEXT,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL,
  gate_weightage TEXT,
  pdf_path TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Add pdf_path if missing on existing table
ALTER TABLE subjects ADD COLUMN IF NOT EXISTS pdf_path TEXT;

-- 3. Create Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('notes_pdf', 'mind_map', 'question_bank', 'paper', 'other')),
  file_path TEXT NOT NULL,
  file_size TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  download_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_subjects_category_id ON subjects(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_subject_id ON resources(subject_id);
CREATE INDEX IF NOT EXISTS idx_subjects_slug ON subjects(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public read (SELECT) allowed on all tables
CREATE POLICY "Allow public select on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public select on subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Allow public select on resources" ON resources FOR SELECT USING (true);

-- RPC Function for incrementing download count safely
CREATE OR REPLACE FUNCTION increment_download_count(resource_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE resources
  SET download_count = download_count + 1
  WHERE id = resource_id;
$$;


-- ============================================================================
-- SEED DATA & PDF PATH UPDATES
-- ============================================================================

DO $$
DECLARE
  cat_gate_id UUID := gen_random_uuid();
  cat_bpharm_id UUID := gen_random_uuid();
  
  -- GATE Subjects UUIDs
  s_biochem UUID := gen_random_uuid();
  s_molbio UUID := gen_random_uuid();
  s_microbio UUID := gen_random_uuid();
  s_immuno UUID := gen_random_uuid();
  s_rdna UUID := gen_random_uuid();
  s_cellbio UUID := gen_random_uuid();
  s_plantbio UUID := gen_random_uuid();
  s_animalbio UUID := gen_random_uuid();
  s_envbio UUID := gen_random_uuid();
  s_foodbio UUID := gen_random_uuid();
  s_bioprocess UUID := gen_random_uuid();
  s_downstream UUID := gen_random_uuid();
  s_genetics UUID := gen_random_uuid();
  s_bioinfo UUID := gen_random_uuid();
  s_instrument UUID := gen_random_uuid();
  s_engmath UUID := gen_random_uuid();
  s_aptitude UUID := gen_random_uuid();
  
  -- B.Pharm Subjects UUIDs
  s_poc1 UUID := gen_random_uuid();
  s_poc2 UUID := gen_random_uuid();
  s_poc3 UUID := gen_random_uuid();
  s_medchem1 UUID := gen_random_uuid();
  s_medchem2 UUID := gen_random_uuid();
  s_medchem3 UUID := gen_random_uuid();
  s_cognosy1 UUID := gen_random_uuid();
  s_cognosy2 UUID := gen_random_uuid();
  s_pharmbiotech UUID := gen_random_uuid();
BEGIN

  -- Insert Categories
  INSERT INTO categories (id, name, slug, icon, sort_order) VALUES
    (cat_gate_id, 'GATE Biotechnology', 'gate-biotechnology', '🧬', 1),
    (cat_bpharm_id, 'B.Pharmacy — DBATU', 'b-pharmacy-dbatu', '🎓', 2)
  ON CONFLICT (slug) DO NOTHING;

  -- Insert GATE Biotechnology Subjects
  INSERT INTO subjects (id, category_id, name, slug, subject_code, description, icon, gate_weightage, pdf_path, sort_order) VALUES
    (s_biochem, cat_gate_id, 'Biochemistry', 'biochemistry', 'BT-BC', 'Structure & function of biomolecules, enzymes, metabolism pathways, bioenergetics.', '🧪', '12-15%', 'biochemistry.pdf', 1),
    (s_molbio, cat_gate_id, 'Molecular Biology', 'molecular-biology', 'BT-MB', 'DNA replication, transcription, translation, gene regulation & DNA repair mechanisms.', '🧬', '10-14%', 'molecular-biology.pdf', 2),
    (s_microbio, cat_gate_id, 'Microbiology', 'microbiology', 'BT-MC', 'Bacterial structure, viral replication, microbial growth kinetics & sterilization.', '🧫', '8-10%', 'microbiology.pdf', 3),
    (s_immuno, cat_gate_id, 'Immunology', 'immunology', 'BT-IM', 'Innate and adaptive immunity, antibodies, MHC complexes & immunological techniques.', '🛡️', '6-8%', 'immunology.pdf', 4),
    (s_rdna, cat_gate_id, 'Recombinant DNA Technology', 'recombinant-dna-technology', 'BT-RD', 'Restriction enzymes, vectors, cloning strategies, PCR & genomic libraries.', '✂️', '8-12%', 'recombinant-dna.pdf', 5),
    (s_cellbio, cat_gate_id, 'Cell Biology', 'cell-biology', 'BT-CB', 'Membrane transport, organelle biogenesis, cell cycle regulation & signaling pathways.', '🔬', '6-8%', 'cell-biology.pdf', 6),
    (s_plantbio, cat_gate_id, 'Plant Biotechnology', 'plant-biotechnology', 'BT-PB', 'Totipotency, tissue culture, transgenic plants & secondary metabolites.', '🌱', '5-7%', 'plant-biotech.pdf', 7),
    (s_animalbio, cat_gate_id, 'Animal Biotechnology', 'animal-biotechnology', 'BT-AB', 'Animal cell culture, stem cell technology, transfection & monoclonal antibodies.', '🧫', '4-6%', 'animal-biotech.pdf', 8),
    (s_envbio, cat_gate_id, 'Environmental Biotechnology', 'environmental-biotechnology', 'BT-EV', 'Wastewater treatment, bioremediation, bioenergy & biosensors.', '🌿', '3-5%', 'environmental-biotech.pdf', 9),
    (s_foodbio, cat_gate_id, 'Food Biotechnology', 'food-biotechnology', 'BT-FB', 'Food preservation, fermentation technology & food quality evaluation.', '🍎', '3-5%', 'food-biotech.pdf', 10),
    (s_bioprocess, cat_gate_id, 'Bioprocess Engineering', 'bioprocess-engineering', 'BT-BE', 'Stoichiometry, microbial growth kinetics, bioreactor design & oxygen transfer.', '⚙️', '12-16%', 'bioprocess.pdf', 11),
    (s_downstream, cat_gate_id, 'Downstream Processing', 'downstream-processing', 'BT-DP', 'Cell disruption, filtration, chromatography, extraction & crystallization.', '⚗️', '6-8%', 'downstream.pdf', 12),
    (s_genetics, cat_gate_id, 'Genetics', 'genetics', 'BT-GN', 'Mendelian inheritance, linkage mapping, population genetics & mutations.', '📊', '5-7%', 'genetics.pdf', 13),
    (s_bioinfo, cat_gate_id, 'Bioinformatics', 'bioinformatics', 'BT-BI', 'Sequence alignment algorithms, BLAST, phylogenetic trees & structural databases.', '💻', '4-6%', 'bioinformatics.pdf', 14),
    (s_instrument, cat_gate_id, 'Instrumentation', 'instrumentation', 'BT-IN', 'Spectrophotometry, NMR, mass spectrometry, X-ray crystallography & electrophoresis.', '🔬', '5-7%', 'instrumentation.pdf', 15),
    (s_engmath, cat_gate_id, 'Engineering Mathematics', 'engineering-mathematics', 'BT-EM', 'Linear algebra, calculus, differential equations & probability statistics.', '📐', '13-15%', 'eng-math.pdf', 16),
    (s_aptitude, cat_gate_id, 'General Aptitude', 'general-aptitude', 'BT-GA', 'Verbal ability, numerical reasoning, analytical skills & spatial aptitude.', '💡', '15%', 'general-aptitude.pdf', 17)
  ON CONFLICT (slug) DO UPDATE SET pdf_path = EXCLUDED.pdf_path;

  -- Insert B.Pharmacy DBATU Subjects
  INSERT INTO subjects (id, category_id, name, slug, subject_code, description, icon, gate_weightage, pdf_path, sort_order) VALUES
    (s_poc1, cat_bpharm_id, 'Pharmaceutical Organic Chemistry I', 'pharmaceutical-organic-chemistry-1', 'BP202T', 'Classification, isomerism, reactions of alkanes, alkenes, conjugated dienes & alkyl halides.', '🧪', NULL, 'bp202t.pdf', 1),
    (s_poc2, cat_bpharm_id, 'Pharmaceutical Organic Chemistry II', 'pharmaceutical-organic-chemistry-2', 'BP301T', 'Benzene & derivative aromaticity, phenols, aromatic amines, fats & oils.', '⚗️', NULL, 'bp301t.pdf', 2),
    (s_poc3, cat_bpharm_id, 'Pharmaceutical Organic Chemistry III', 'pharmaceutical-organic-chemistry-3', 'BP401T', 'Stereoisomerism, optical activity, heterocycles & named organic reactions.', '🔬', NULL, 'bp401t.pdf', 3),
    (s_medchem1, cat_bpharm_id, 'Medicinal Chemistry I', 'medicinal-chemistry-1', 'BP402T', 'SAR, mechanism of action & synthesis of autonomic and central nervous system drugs.', '💊', NULL, 'bp402t.pdf', 4),
    (s_medchem2, cat_bpharm_id, 'Medicinal Chemistry II', 'medicinal-chemistry-2', 'BP501T', 'Antihistamines, cardiovascular agents, endocrine drugs, local anesthetics & diuretics.', '🩸', NULL, 'bp501t.pdf', 5),
    (s_medchem3, cat_bpharm_id, 'Medicinal Chemistry III', 'medicinal-chemistry-3', 'BP601T', 'Antibiotics, anti-infective agents, antimalarials, anti-TB & anticancer drugs.', '🩺', NULL, 'bp601t.pdf', 6),
    (s_cognosy1, cat_bpharm_id, 'Pharmacognosy & Phytochemistry I', 'pharmacognosy-phytochemistry-1', 'BP405T', 'Plant metabolites, crude drug evaluation, plant tissue culture & primary metabolites.', '🌱', NULL, 'bp405t.pdf', 7),
    (s_cognosy2, cat_bpharm_id, 'Pharmacognosy & Phytochemistry II', 'pharmacognosy-phytochemistry-2', 'BP504T', 'Biosynthetic pathways (shikimic/mevalonic), isolation & estimation of phytoconstituents.', '🌿', NULL, 'bp504t.pdf', 8),
    (s_pharmbiotech, cat_bpharm_id, 'Pharmaceutical Biotechnology', 'pharmaceutical-biotechnology', 'BP605T', 'Enzyme technology, protein engineering, vaccines, immunity & rDNA pharmaceuticals.', '🧬', NULL, 'bp605t.pdf', 9)
  ON CONFLICT (slug) DO UPDATE SET pdf_path = EXCLUDED.pdf_path;

  -- Insert Resources
  INSERT INTO resources (subject_id, title, type, file_path, file_size, is_featured, download_count) VALUES
    (s_biochem, 'Biochemistry — Handwritten Notes (Complete PDF)', 'notes_pdf', 'biochemistry.pdf', '14.2 MB', true, 1240),
    (s_biochem, 'Enzyme Kinetics & Metabolic Pathways Quick Sheet', 'notes_pdf', 'biochemistry-summary.pdf', '3.8 MB', false, 480),
    (s_molbio, 'Molecular Biology — Handwritten Notes (Complete PDF)', 'notes_pdf', 'molecular-biology.pdf', '16.5 MB', true, 1150),
    (s_molbio, 'DNA Replication & Repair Mechanisms Mind Map', 'mind_map', 'molecular-biology-mindmap.pdf', '4.1 MB', false, 560),
    (s_microbio, 'Microbiology — Complete Handwritten Notes', 'notes_pdf', 'microbiology.pdf', '11.8 MB', false, 820),
    (s_immuno, 'Immunology — Complete Handwritten Notes', 'notes_pdf', 'immunology.pdf', '9.4 MB', false, 690),
    (s_rdna, 'Recombinant DNA Tech — Handwritten Notes', 'notes_pdf', 'recombinant-dna.pdf', '12.1 MB', false, 910),
    (s_bioprocess, 'Bioprocess Engineering — Formulae & Notes', 'notes_pdf', 'bioprocess.pdf', '15.0 MB', true, 1310),
    (s_biochem, 'GATE BT Question Bank (2019–2024)', 'question_bank', 'gate-bt-question-bank-2019-2024.pdf', '24.5 MB', true, 2150),
    (s_molbio, 'GATE BT Mind Maps Collection', 'mind_map', 'gate-bt-mind-maps.pdf', '18.2 MB', true, 1890),
    (s_biochem, 'All GATE Papers Hub — GATE 2027 (30 papers)', 'paper', 'all-gate-papers-hub-2027.pdf', '45.0 MB', true, 3400),
    (s_poc1, 'BP202T — Pharmaceutical Organic Chem I (25-Page Notes)', 'notes_pdf', 'bp202t.pdf', '12.5 MB', true, 730),
    (s_poc2, 'BP301T — Pharmaceutical Organic Chem II (25-Page Notes)', 'notes_pdf', 'bp301t.pdf', '13.1 MB', true, 680),
    (s_poc3, 'BP401T — Pharmaceutical Organic Chem III (25-Page Notes)', 'notes_pdf', 'bp401t.pdf', '11.9 MB', true, 620),
    (s_medchem1, 'BP402T — Medicinal Chemistry I (25-Page Notes)', 'notes_pdf', 'bp402t.pdf', '14.0 MB', true, 810),
    (s_medchem2, 'BP501T — Medicinal Chemistry II (25-Page Notes)', 'notes_pdf', 'bp501t.pdf', '13.8 MB', true, 760),
    (s_medchem3, 'BP601T — Medicinal Chemistry III (25-Page Notes)', 'notes_pdf', 'bp601t.pdf', '14.5 MB', true, 840),
    (s_cognosy1, 'BP405T — Pharmacognosy & Phytochemistry I (25-Page Notes)', 'notes_pdf', 'bp405t.pdf', '10.8 MB', true, 590),
    (s_cognosy2, 'BP504T — Pharmacognosy & Phytochemistry II (25-Page Notes)', 'notes_pdf', 'bp504t.pdf', '11.2 MB', true, 610),
    (s_pharmbiotech, 'BP605T — Pharmaceutical Biotechnology (25-Page Notes)', 'notes_pdf', 'bp605t.pdf', '12.0 MB', true, 720);

END $$;
