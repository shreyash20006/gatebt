'use client';

import React, { useState, useMemo } from 'react';
import Logo from '@/components/brand/Logo';
import DirectDownloadButton from '@/components/DirectDownloadButton';
import {
  Search,
  Download,
  FileText,
  Brain,
  BookOpen,
  Sparkles,
  Building2,
  Dna,
  Cpu,
  Zap,
  Cog,
  GraduationCap,
  Calculator,
  CheckCircle2,
  Eye,
  X,
  Star,
  Layers,
  ArrowRight,
  Filter,
  FileCheck,
  Flame,
  Award,
} from 'lucide-react';

// ==========================================
// TYPES & DISCIPLINE CONFIG
// ==========================================
export interface StudyResource {
  id: string;
  title: string;
  discipline: 'CE' | 'BT' | 'CS' | 'EE' | 'ME' | 'Pharmacy' | 'Maths/GA';
  disciplineName: string;
  subject: string;
  subjectCode?: string;
  type: 'Handwritten Notes' | 'Formula Sheet' | 'Mind Map' | 'PYQ Solutions' | 'Standard Book';
  description: string;
  fileSize: string;
  pageCount: number;
  downloadCount: number;
  rating: number;
  badge?: string;
  filePath: string;
  previewTopics: string[];
}

const DISCIPLINES = [
  { code: 'ALL', name: 'All Disciplines', icon: Sparkles, color: 'from-[#1CA3DC] to-blue-600' },
  { code: 'CE', name: 'Civil (CE)', icon: Building2, color: 'from-cyan-500 to-blue-600' },
  { code: 'BT', name: 'Biotechnology (BT)', icon: Dna, color: 'from-purple-500 to-indigo-600' },
  { code: 'CS', name: 'Computer Science (CS)', icon: Cpu, color: 'from-cyan-400 to-blue-600' },
  { code: 'EE', name: 'Electrical (EE)', icon: Zap, color: 'from-amber-400 to-orange-600' },
  { code: 'ME', name: 'Mechanical (ME)', icon: Cog, color: 'from-rose-500 to-red-600' },
  { code: 'Maths/GA', name: 'Maths & Aptitude', icon: Calculator, color: 'from-emerald-400 to-teal-600' },
  { code: 'Pharmacy', name: 'B.Pharmacy DBATU', icon: GraduationCap, color: 'from-pink-500 to-rose-600' },
];

const RESOURCE_TYPES = [
  'All Material',
  'Handwritten Notes',
  'Formula Sheet',
  'Mind Map',
  'PYQ Solutions',
  'Standard Book',
];

// Comprehensive Study Materials Dataset
const STUDY_MATERIALS_DATA: StudyResource[] = [
  // CIVIL ENGINEERING (CE)
  {
    id: 'ce-som-notes',
    title: 'Solid Mechanics (SOM) — Complete Handwritten Notes',
    discipline: 'CE',
    disciplineName: 'Civil Engineering',
    subject: 'Structural Engineering',
    subjectCode: 'CE-SOM',
    type: 'Handwritten Notes',
    description: 'Detailed toppers handwritten notes covering Stress-Strain, Bending Stresses, Torsion of Shafts, SFD & BMD, Thin Cylinders and Deflection of Beams.',
    fileSize: '18.4 MB',
    pageCount: 142,
    downloadCount: 3420,
    rating: 4.9,
    badge: '🔥 Topper Recommended',
    filePath: 'notes/ce-solid-mechanics.pdf',
    previewTopics: ['Hooke’s Law & Elastic Constants', 'Shear Force & Bending Moment Diagrams', 'Euler’s Column Buckling Theory', 'Principal Stresses & Mohr’s Circle'],
  },
  {
    id: 'ce-geotech-notes',
    title: 'Geotechnical Engineering & Soil Mechanics Notes',
    discipline: 'CE',
    disciplineName: 'Civil Engineering',
    subject: 'Geotechnical Engineering',
    subjectCode: 'CE-GT',
    type: 'Handwritten Notes',
    description: 'Comprehensive Soil Mechanics & Foundation Engineering notes with solved GATE numerical problems, phase relationships, consolidation & shear strength.',
    fileSize: '22.1 MB',
    pageCount: 168,
    downloadCount: 2890,
    rating: 4.9,
    badge: 'High Yield',
    filePath: 'notes/ce-geotechnical.pdf',
    previewTopics: ['Index Properties of Soils', 'Terzaghi 1D Consolidation Theory', 'Direct Shear & Triaxial Test Equations', 'Shallow & Pile Foundation Capacity'],
  },
  {
    id: 'ce-fluid-formula',
    title: 'Fluid Mechanics & Hydraulics — Formula & Summary Sheet',
    discipline: 'CE',
    disciplineName: 'Civil Engineering',
    subject: 'Water Resources',
    subjectCode: 'CE-FM',
    type: 'Formula Sheet',
    description: 'Quick revision formula cheat-sheet for Open Channel Flow, Hydrographs, Pipe Losses, Navier-Stokes and Bernoulli Equation.',
    fileSize: '4.8 MB',
    pageCount: 32,
    downloadCount: 4120,
    rating: 4.8,
    badge: 'Quick Revision',
    filePath: 'notes/ce-fluid-mechanics-formula.pdf',
    previewTopics: ['Bernoulli & Continuity Equations', 'Hazen-Williams Pipe Friction Losses', 'Open Channel Uniform & Rapidly Varied Flow', 'Unit Hydrograph Derivation'],
  },
  {
    id: 'ce-transport-pyq',
    title: 'Transportation Engineering — GATE PYQ Solutions (2015-2024)',
    discipline: 'CE',
    disciplineName: 'Civil Engineering',
    subject: 'Transportation Engineering',
    subjectCode: 'CE-TE',
    type: 'PYQ Solutions',
    description: 'Chapterwise solved previous 10 years GATE questions with step-by-step solutions for SSD, OSD, Flexible Pavement Design and Traffic Signal Timing.',
    fileSize: '15.6 MB',
    pageCount: 96,
    downloadCount: 1980,
    rating: 4.7,
    filePath: 'notes/ce-transportation-pyqs.pdf',
    previewTopics: ['Stopping Sight Distance (SSD) Equations', 'Overtaking Sight Distance (OSD) Mechanics', 'CBR Method Pavement Thickness', 'Webster Method Signal Timing'],
  },

  // BIOTECHNOLOGY (BT)
  {
    id: 'bt-biochem-notes',
    title: 'Biochemistry — Complete Topper Handwritten Notes',
    discipline: 'BT',
    disciplineName: 'Biotechnology',
    subject: 'Biochemistry',
    subjectCode: 'BT-BC',
    type: 'Handwritten Notes',
    description: 'Detailed handwritten notes on Amino Acid Properties, Protein Folding, Enzyme Kinetics (Michaelis-Menten, Lineweaver-Burk), Glycolysis, TCA & OXPHOS.',
    fileSize: '14.2 MB',
    pageCount: 118,
    downloadCount: 5210,
    rating: 5.0,
    badge: '⭐ #1 Rated Notes',
    filePath: 'biochemistry.pdf',
    previewTopics: ['Ramachandran Plot Analysis', 'Michaelis-Menten Kinetics Derivation', 'Glycolysis & Citric Acid Cycle ATP Yield', 'Oxidative Phosphorylation Complexes'],
  },
  {
    id: 'bt-molbio-mindmap',
    title: 'Molecular Biology & Recombinant DNA — 3D Mind Maps',
    discipline: 'BT',
    disciplineName: 'Biotechnology',
    subject: 'Molecular Biology',
    subjectCode: 'BT-MB',
    type: 'Mind Map',
    description: 'Visual 3D mind maps connecting DNA Replication machinery, Transcription factors, Lac & Trp Operons, PCR principles & Cloning Vectors.',
    fileSize: '6.5 MB',
    pageCount: 24,
    downloadCount: 3840,
    rating: 4.9,
    badge: 'Visual Revision',
    filePath: 'notes/bt-molbio-mindmap.pdf',
    previewTopics: ['DNA Polymerase I, III Functions', 'Prokaryotic vs Eukaryotic Transcription', 'Restriction Endonuclease Cutting Maps', 'Sanger vs Next-Gen Sequencing Workflow'],
  },
  {
    id: 'bt-bioprocess-formula',
    title: 'Bioprocess Engineering — Master Formula Book & Kinetics',
    discipline: 'BT',
    disciplineName: 'Biotechnology',
    subject: 'Bioprocess Engineering',
    subjectCode: 'BT-BE',
    type: 'Formula Sheet',
    description: 'Complete formula sheet for Cell Growth Stoichiometry, Monod Kinetics, CSTR & Batch Bioreactor Design, kLa Mass Transfer & Sterilization Kinetics.',
    fileSize: '8.2 MB',
    pageCount: 48,
    downloadCount: 4620,
    rating: 4.9,
    badge: '25% GATE Weightage',
    filePath: 'bioprocess.pdf',
    previewTopics: ['Monod Growth Model & Yield Coefficients', 'Batch & Continuous CSTR Mass Balances', 'Oxygen Transfer Rate (OTR) & kLa Evaluation', 'Del Factor Sterilization Calculations'],
  },
  {
    id: 'bt-pyq-book',
    title: 'GATE Biotechnology Complete Solved Question Bank (2019-2024)',
    discipline: 'BT',
    disciplineName: 'Biotechnology',
    subject: 'All BT Subjects',
    subjectCode: 'BT-ALL',
    type: 'PYQ Solutions',
    description: 'Comprehensive 5-year solved GATE BT papers with detailed explanations for NAT (Numerical Answer Type) questions and MCQ shortcuts.',
    fileSize: '24.5 MB',
    pageCount: 210,
    downloadCount: 6100,
    rating: 5.0,
    badge: 'Must Have',
    filePath: 'gate-bt-question-bank-2019-2024.pdf',
    previewTopics: ['Enzyme Kinetics NAT Calculations', 'Bioprocess Reactor Volume Numerical Solutions', 'Genetics Linkage & Recombination Frequency', 'Thermodynamics Free Energy Problems'],
  },

  // COMPUTER SCIENCE (CS)
  {
    id: 'cs-dsa-notes',
    title: 'Data Structures & Algorithms — Complete Notes & Code Patterns',
    discipline: 'CS',
    disciplineName: 'Computer Science',
    subject: 'DSA & Algorithms',
    subjectCode: 'CS-DSA',
    type: 'Handwritten Notes',
    description: 'Master notes covering Asymptotic Analysis, Trees (AVL, Red-Black), Graph Algorithms (Dijkstra, Prim, Kruskal, BFS/DFS) and Dynamic Programming patterns.',
    fileSize: '19.8 MB',
    pageCount: 160,
    downloadCount: 7890,
    rating: 4.9,
    badge: '🔥 Essential CS',
    filePath: 'notes/cs-dsa-notes.pdf',
    previewTopics: ['Big-O, Big-Omega & Theta Notations', 'Binary Search Tree Balancing Rules', 'Dijkstra & Floyd-Warshall Algorithms', 'DP Knapsack & Longest Common Subsequence'],
  },
  {
    id: 'cs-os-formula',
    title: 'Operating Systems — Quick Revision & Formula Cheat-Sheet',
    discipline: 'CS',
    disciplineName: 'Computer Science',
    subject: 'Operating Systems',
    subjectCode: 'CS-OS',
    type: 'Formula Sheet',
    description: 'Concise summary of CPU Scheduling (FCFS, SJF, Round Robin), Banker\'s Deadlock Avoidance, Paging, Page Replacement (LRU, FIFO) & Virtual Memory.',
    fileSize: '5.1 MB',
    pageCount: 36,
    downloadCount: 3950,
    rating: 4.8,
    filePath: 'notes/cs-operating-systems.pdf',
    previewTopics: ['Turnaround Time & Waiting Time Formulas', 'Semaphores & Producer-Consumer Problem', 'Page Table Entry & TLB Hit Ratio Math', 'Disk Scheduling (SCAN, C-LOOK)'],
  },

  // ELECTRICAL ENGINEERING (EE)
  {
    id: 'ee-machines-notes',
    title: 'Electrical Machines — Complete Comprehensive Notes',
    discipline: 'EE',
    disciplineName: 'Electrical Engineering',
    subject: 'Electrical Machines',
    subjectCode: 'EE-EM',
    type: 'Handwritten Notes',
    description: 'In-depth notes on Transformers (Equivalent Circuit, Losses, Efficiency), 3-Phase Induction Motors, Synchronous Generators and DC Machines.',
    fileSize: '21.0 MB',
    pageCount: 154,
    downloadCount: 3120,
    rating: 4.9,
    badge: 'High Yield',
    filePath: 'notes/ee-electrical-machines.pdf',
    previewTopics: ['Transformer Voltage Regulation & Open/Short Circuit Test', 'Induction Motor Torque-Speed Characteristics', 'Synchronous Machine Phasor Diagrams', 'DC Generator Armature Reaction'],
  },

  // MECHANICAL ENGINEERING (ME)
  {
    id: 'me-thermo-notes',
    title: 'Thermodynamics & Thermal Engineering — Master Notes',
    discipline: 'ME',
    disciplineName: 'Mechanical Engineering',
    subject: 'Thermodynamics',
    subjectCode: 'ME-TH',
    type: 'Handwritten Notes',
    description: 'Clear concepts on 1st & 2nd Laws of Thermodynamics, Entropy, Avogadro Cycle, Otto, Diesel, Rankine Power Cycles and Refrigeration COP.',
    fileSize: '17.3 MB',
    pageCount: 130,
    downloadCount: 4210,
    rating: 4.8,
    filePath: 'notes/me-thermodynamics.pdf',
    previewTopics: ['First Law Steady Flow Energy Equation (SFEE)', 'Carnot Efficiency & Clausius Inequality', 'Air Standard Otto & Diesel Cycle Relations', 'Psychrometric Chart Properties'],
  },

  // MATHS & APTITUDE
  {
    id: 'maths-gate-book',
    title: 'Engineering Mathematics for All GATE Papers — Complete Notes',
    discipline: 'Maths/GA',
    disciplineName: 'Maths & Aptitude',
    subject: 'Engineering Mathematics',
    subjectCode: 'ALL-EM',
    type: 'Handwritten Notes',
    description: '15 Marks guaranteed! Covers Linear Algebra (Eigenvalues & Eigenvectors), Calculus (Limits, Partial Derivatives, Maxima/Minima), Differential Equations & Probability.',
    fileSize: '16.2 MB',
    pageCount: 110,
    downloadCount: 8940,
    rating: 5.0,
    badge: '15 GATE Marks',
    filePath: 'eng-math.pdf',
    previewTopics: ['Cayley-Hamilton Theorem & Matrix Inverse', 'Taylor & Maclaurin Series Expansions', 'First Order & Second Order Differential Equations', 'Binomial, Poisson & Normal Probability Distributions'],
  },
  {
    id: 'general-aptitude-sheet',
    title: 'General Aptitude (GA) — 15 Marks Formula & Practice Sheet',
    discipline: 'Maths/GA',
    disciplineName: 'Maths & Aptitude',
    subject: 'General Aptitude',
    subjectCode: 'ALL-GA',
    type: 'Formula Sheet',
    description: 'Shortcut tricks for Numerical Ability, Time & Work, Speed Distance, Spatial Reasoning, Syllogisms & English Grammar rules.',
    fileSize: '7.5 MB',
    pageCount: 52,
    downloadCount: 9200,
    rating: 4.9,
    badge: 'Mandatory 15 Marks',
    filePath: 'general-aptitude.pdf',
    previewTopics: ['Time, Speed & Distance Relative Velocity Formulas', 'Permutations, Combinations & Probability Tricks', 'Data Interpretation Charts & Percentages', 'Spatial Reasoning Cube Folding Patterns'],
  },

  // B.PHARMACY
  {
    id: 'pharma-organic-notes',
    title: 'Pharmaceutical Organic Chemistry — Complete Notes (BP202T)',
    discipline: 'Pharmacy',
    disciplineName: 'B.Pharmacy DBATU',
    subject: 'Organic Chemistry',
    subjectCode: 'BP202T',
    type: 'Handwritten Notes',
    description: 'Detailed notes for DBATU B.Pharmacy students covering SN1/SN2 mechanisms, Electrophilic Additions, Isomerism and Alkyl Halide reactions.',
    fileSize: '13.4 MB',
    pageCount: 105,
    downloadCount: 2650,
    rating: 4.8,
    filePath: 'bp202t.pdf',
    previewTopics: ['SN1 vs SN2 Reaction Mechanisms', 'Markovnikov & Anti-Markovnikov Rule', 'Reactions of Conjugated Dienes', 'E1 and E2 Elimination Kinetics'],
  },
];

export default function Gate3DApp() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('All Material');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewResource, setPreviewResource] = useState<StudyResource | null>(null);

  // Filtered Study Materials
  const filteredMaterials = useMemo(() => {
    return STUDY_MATERIALS_DATA.filter((item) => {
      const matchesDiscipline = selectedDiscipline === 'ALL' || item.discipline === selectedDiscipline;
      const matchesType = selectedType === 'All Material' || item.type === selectedType;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        (item.subjectCode && item.subjectCode.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.previewTopics.some((t) => t.toLowerCase().includes(query));

      return matchesDiscipline && matchesType && matchesSearch;
    });
  }, [selectedDiscipline, selectedType, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-[#1CA3DC] selection:text-slate-950 pb-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 space-y-8">
        {/* ========================================== */}
        {/* HERO BANNER & INSTANT SEARCH BAR */}
        {/* ========================================== */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>100% Free Open Access • Direct PDF Downloads</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              GATE Notes &amp; Study Materials Hub
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
              Instant direct downloads for handwritten notes, formula cheat-sheets, mind maps &amp; solved PYQs across all GATE disciplines &amp; Pharmacy streams.
            </p>
          </div>

          {/* Instant Search Bar */}
          <div className="relative max-w-2xl pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-cyan-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, subjects, codes (e.g. SOM, Biochemistry, Formula Sheet, 2024 PYQ)..."
                className="w-full bg-slate-950/90 border-2 border-slate-700 hover:border-cyan-500 focus:border-[#1CA3DC] rounded-2xl pl-12 pr-10 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 shadow-xl focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* DISCIPLINE SELECTOR CHIPS */}
        {/* ========================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Select Engineering Discipline
            </span>
            <span className="text-cyan-300 font-mono">{filteredMaterials.length} Resources Available</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {DISCIPLINES.map((disc) => {
              const Icon = disc.icon;
              const isSelected = selectedDiscipline === disc.code;
              return (
                <button
                  key={disc.code}
                  onClick={() => setSelectedDiscipline(disc.code)}
                  className={`px-4 py-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all shadow-sm ${
                    isSelected
                      ? 'bg-[#1CA3DC] text-slate-950 border-cyan-400 shadow-cyan-500/20 scale-105'
                      : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                  <span>{disc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* RESOURCE TYPE FILTER TABS */}
        {/* ========================================== */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80">
          {RESOURCE_TYPES.map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* DOWNLOAD CARDS GRID */}
        {/* ========================================== */}
        {filteredMaterials.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-3xl text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Notes Found</h3>
            <p className="text-xs text-slate-400">Try resetting your search query or discipline filter.</p>
            <button
              onClick={() => {
                setSelectedDiscipline('ALL');
                setSelectedType('All Material');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-[#1CA3DC] text-slate-950 font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6 transition-all duration-200 hover:-translate-y-1 group relative"
              >
                <div className="space-y-4">
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-black">
                      {item.discipline} • {item.subjectCode || 'GATE'}
                    </span>

                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Topics Preview Chips */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Key Topics Included:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.previewTopics.slice(0, 3).map((topic, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                          ✓ {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.pageCount} Pages ({item.fileSize})</span>
                    </span>

                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.rating} ({item.downloadCount} DLs)</span>
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewResource(item)}
                      className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>

                    <DirectDownloadButton
                      resourceId={item.id}
                      filePath={item.filePath}
                      title={item.title}
                      label="Download"
                      compact
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* 📖 IN-PAGE PREVIEW & READ MODAL */}
      {/* ========================================== */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-6 shadow-2xl animate-fade-rise relative">
            <button
              onClick={() => setPreviewResource(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                {previewResource.discipline} • {previewResource.type}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{previewResource.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{previewResource.description}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-300">Complete Table of Contents:</div>
              <ul className="space-y-1 text-xs text-slate-300">
                {previewResource.previewTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400">
                File format: <strong className="text-white font-mono">PDF ({previewResource.fileSize})</strong>
              </div>

              <DirectDownloadButton
                resourceId={previewResource.id}
                filePath={previewResource.filePath}
                title={previewResource.title}
                label="Direct Download PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
