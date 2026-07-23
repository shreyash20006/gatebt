'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import {
  Shield,
  KeyRound,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Building2,
  Dna,
  Cpu,
  Zap,
  Cog,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckSquare,
  Square,
  Moon,
  Sun,
  LogOut,
  ChevronRight,
  FileText,
  Video,
  Layers,
  Award,
  BarChart3,
  RefreshCw,
  ExternalLink,
  BookMarked,
} from 'lucide-react';

// ==========================================
// CONFIGURATION BLOCK
// ==========================================
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key";

// ==========================================
// DATA MAPS: PAPERS & SUBJECTS
// ==========================================
interface GatePaper {
  code: string;
  name: string;
  category: string;
  icon: any;
  color: string;
  borderColor: string;
  glowColor: string;
  desc: string;
}

const GATE_PAPERS: GatePaper[] = [
  {
    code: 'CE',
    name: 'Civil Engineering',
    category: 'Core Infrastructure',
    icon: Building2,
    color: 'from-[#1CA3DC] to-blue-600',
    borderColor: 'hover:border-cyan-500/80',
    glowColor: 'shadow-cyan-500/20',
    desc: 'Structures, Geotechnical, Water Resources, Transport & Surveying',
  },
  {
    code: 'BT',
    name: 'Biotechnology',
    category: 'Biosciences & Tech',
    icon: Dna,
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'hover:border-purple-500/80',
    glowColor: 'shadow-purple-500/20',
    desc: 'Biochemistry, Microbiology, Bioprocess & Molecular Biology',
  },
  {
    code: 'CS',
    name: 'Computer Science',
    category: 'Software & Computing',
    icon: Cpu,
    color: 'from-cyan-400 to-blue-600',
    borderColor: 'hover:border-blue-400/80',
    glowColor: 'shadow-blue-500/20',
    desc: 'Data Structures, Algorithms, OS, DBMS & Computer Networks',
  },
  {
    code: 'EE',
    name: 'Electrical Engineering',
    category: 'Power & Circuits',
    icon: Zap,
    color: 'from-amber-400 to-orange-600',
    borderColor: 'hover:border-amber-400/80',
    glowColor: 'shadow-amber-500/20',
    desc: 'Electrical Machines, Power Systems, Control Systems & Signals',
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    category: 'Thermal & Mechanics',
    icon: Cog,
    color: 'from-rose-500 to-red-600',
    borderColor: 'hover:border-rose-400/80',
    glowColor: 'shadow-rose-500/20',
    desc: 'Thermodynamics, Fluid Mechanics, Manufacturing & SOM',
  },
];

interface Subject {
  id: string;
  name: string;
  weightage: string;
  weightagePercent: number;
  iconName: string;
  desc: string;
  notesCount: number;
  checklist: string[];
}

const PAPER_SUBJECTS: Record<string, Subject[]> = {
  CE: [
    {
      id: 'ce-structural',
      name: 'Structural Engineering',
      weightage: '20–25%',
      weightagePercent: 25,
      iconName: 'Building2',
      desc: 'Engineering Mechanics, SOM, Structural Analysis, RCC & Steel Structures.',
      notesCount: 14,
      checklist: ['Solid Mechanics (SOM) Basics', 'Bending & Shear Stresses', 'Trusses & Frames', 'RCC Beam Design', 'Steel Connections & Beams'],
    },
    {
      id: 'ce-geotech',
      name: 'Geotechnical Engineering',
      weightage: '15–18%',
      weightagePercent: 18,
      iconName: 'Layers',
      desc: 'Soil Mechanics, Permeability, Shear Strength, Consolidation & Foundations.',
      notesCount: 12,
      checklist: ['Phase Relationships', 'Permeability & Seepage', 'Consolidation Theory', 'Direct Shear & Triaxial Test', 'Shallow & Deep Foundations'],
    },
    {
      id: 'ce-water',
      name: 'Water Resources Engineering',
      weightage: '12–16%',
      weightagePercent: 15,
      iconName: 'Zap',
      desc: 'Fluid Mechanics, Hydraulics, Open Channel Flow, Hydrology & Irrigation.',
      notesCount: 10,
      checklist: ['Fluid Statics & Dynamics', 'Pipe Flow & Losses', 'Open Channel Uniform Flow', 'Hydrograph Analysis', 'Irrigation Water Requirements'],
    },
    {
      id: 'ce-environmental',
      name: 'Environmental Engineering',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Sparkles',
      desc: 'Water Quality, Treatment Processes, Sewage Treatment & Air Pollution.',
      notesCount: 9,
      checklist: ['Water Quality Parameters', 'Sedimentation & Filtration', 'Activated Sludge Process', 'Air Pollutants & Dispersion', 'Municipal Solid Waste'],
    },
    {
      id: 'ce-transport',
      name: 'Transportation Engineering',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Award',
      desc: 'Highway Design, Traffic Engineering, Pavement Design & Railways.',
      notesCount: 8,
      checklist: ['Highway Geometric Design', 'Sight Distances (SSD/OSD)', 'Traffic Flow Characteristics', 'Flexible Pavement Design', 'Rail Geometry'],
    },
    {
      id: 'ce-geomatics',
      name: 'Geomatics (Surveying)',
      weightage: '5–7%',
      weightagePercent: 7,
      iconName: 'BarChart3',
      desc: 'Levelling, Compass Surveying, Photogrammetry & Remote Sensing.',
      notesCount: 6,
      checklist: ['Traverse & Compass Survey', 'Differential Levelling', 'Contouring', 'Photogrammetry Formulas', 'GIS & GPS Fundamentals'],
    },
    {
      id: 'ce-maths',
      name: 'Engineering Mathematics',
      weightage: '~13 Marks',
      weightagePercent: 13,
      iconName: 'FileText',
      desc: 'Linear Algebra, Calculus, Differential Equations & Numerical Methods.',
      notesCount: 15,
      checklist: ['Matrices & Eigenvalues', 'Partial Derivatives & Integrals', 'First Order ODEs', 'Probability Distributions', 'Numerical Integration'],
    },
    {
      id: 'ce-aptitude',
      name: 'General Aptitude',
      weightage: '15 Marks',
      weightagePercent: 15,
      iconName: 'GraduationCap',
      desc: 'Verbal Ability, Quantitative Aptitude & Analytical Reasoning.',
      notesCount: 8,
      checklist: ['English Grammar & Vocabulary', 'Percentage, Ratio & Proportion', 'Data Interpretation', 'Spatial & Logical Reasoning'],
    },
  ],
  BT: [
    {
      id: 'bt-biochem',
      name: 'Biochemistry',
      weightage: '15–18%',
      weightagePercent: 18,
      iconName: 'Dna',
      desc: 'Structure of Biomolecules, Enzyme Kinetics & Metabolic Pathways.',
      notesCount: 12,
      checklist: ['Amino Acids & Protein Folding', 'Michaelis-Menten Kinetics', 'Glycolysis & TCA Cycle', 'Oxidative Phosphorylation', 'Lipid & Nucleotide Metabolism'],
    },
    {
      id: 'bt-microbio',
      name: 'Microbiology',
      weightage: '12–15%',
      weightagePercent: 15,
      iconName: 'Sparkles',
      desc: 'Prokaryotic Diversity, Bacterial Growth Kinetics & Virology.',
      notesCount: 10,
      checklist: ['Bacterial Staining & Morphology', 'Microbial Growth Curve', 'Sterilization Techniques', 'Viral Structure & Replication', 'Antibiotics Mechanism'],
    },
    {
      id: 'bt-bioprocess',
      name: 'Bioprocess Engineering',
      weightage: '20–25%',
      weightagePercent: 22,
      iconName: 'Cog',
      desc: 'Mass & Energy Balances, Bioreactor Design, Sterilization & Downstream.',
      notesCount: 14,
      checklist: ['Stoichiometry of Cell Growth', 'Design of CSTR & Batch Reactors', 'Aeration & Oxygen Transfer (kLa)', 'Media Sterilization Kinetics', 'Filtration & Chromatography'],
    },
    {
      id: 'bt-molbio',
      name: 'Genetics & Molecular Biology',
      weightage: '15–18%',
      weightagePercent: 16,
      iconName: 'Dna',
      desc: 'DNA Replication, Transcription, Translation, Operons & Recombinant DNA.',
      notesCount: 11,
      checklist: ['Replication Machinery', 'Eukaryotic Transcription', 'Lac & Trp Operon Regulation', 'Restriction Enzymes & Cloning Vectors', 'PCR & DNA Sequencing'],
    },
    {
      id: 'bt-maths',
      name: 'Engineering Mathematics',
      weightage: '~13 Marks',
      weightagePercent: 13,
      iconName: 'FileText',
      desc: 'Linear Algebra, Calculus, Differential Equations & Statistics.',
      notesCount: 12,
      checklist: ['Matrix Operations', 'Derivatives & Integrals', 'Differential Equations', 'Mean, Variance & Normal Distribution'],
    },
    {
      id: 'bt-aptitude',
      name: 'General Aptitude',
      weightage: '15 Marks',
      weightagePercent: 15,
      iconName: 'GraduationCap',
      desc: 'Verbal Ability, Numerical Reasoning & Spatial Aptitude.',
      notesCount: 8,
      checklist: ['Verbal Reasoning', 'Algebra & Arithmetic', 'Logical Puzzles'],
    },
  ],
  CS: [
    {
      id: 'cs-dsa',
      name: 'Data Structures & Algorithms',
      weightage: '18–22%',
      weightagePercent: 20,
      iconName: 'Cpu',
      desc: 'Arrays, Trees, Graphs, Sorting, Dynamic Programming & Complexity.',
      notesCount: 16,
      checklist: ['Asymptotic Notation (Big-O)', 'Binary Search Trees & AVL', 'Graph BFS/DFS & Shortest Path', 'Sorting Algorithms', 'Dynamic Programming Patterns'],
    },
    {
      id: 'cs-os',
      name: 'Operating Systems',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Layers',
      desc: 'Process Management, Threads, CPU Scheduling, Deadlocks & Memory.',
      notesCount: 10,
      checklist: ['Process State & Context Switching', 'Semaphores & Mutex', 'Banker\'s Deadlock Algorithm', 'Paging & Virtual Memory'],
    },
    {
      id: 'cs-dbms',
      name: 'Database Management Systems',
      weightage: '7–9%',
      weightagePercent: 8,
      iconName: 'BookMarked',
      desc: 'ER Models, Relational Algebra, SQL, Normalization & Transactions.',
      notesCount: 9,
      checklist: ['ER to Relational Schema', 'Relational Algebra Queries', 'SQL Joins & Grouping', 'Normal Forms (1NF to BCNF)', 'ACID & Concurrency Control'],
    },
    {
      id: 'cs-networks',
      name: 'Computer Networks',
      weightage: '8–10%',
      weightagePercent: 9,
      iconName: 'Zap',
      desc: 'OSI Layers, IP Addressing, Routing Algorithms, TCP/UDP & Congestion.',
      notesCount: 10,
      checklist: ['IPv4 Addressing & Subnetting', 'Sliding Window Protocols', 'Dijkstra & Distance Vector', 'TCP Handshake & Congestion'],
    },
    {
      id: 'cs-maths',
      name: 'Discrete & Engg Mathematics',
      weightage: '13–15%',
      weightagePercent: 14,
      iconName: 'FileText',
      desc: 'Propositional Logic, Combinatorics, Graph Theory & Linear Algebra.',
      notesCount: 12,
      checklist: ['Logic & Quantifiers', 'Permutations & Recurrence', 'Graph Colorings & Trees', 'Eigenvalues & System of Equations'],
    },
    {
      id: 'cs-aptitude',
      name: 'General Aptitude',
      weightage: '15 Marks',
      weightagePercent: 15,
      iconName: 'GraduationCap',
      desc: 'Verbal Ability & Analytical Quantitative Aptitude.',
      notesCount: 8,
      checklist: ['Verbal Reasoning', 'Quantitative Ability', 'Spatial Reasoning'],
    },
  ],
  EE: [
    {
      id: 'ee-machines',
      name: 'Electrical Machines',
      weightage: '12–15%',
      weightagePercent: 14,
      iconName: 'Zap',
      desc: 'Transformers, Induction Motors, Synchronous Machines & DC Drives.',
      notesCount: 12,
      checklist: ['Transformer Equivalent Circuit', 'Induction Motor Torque-Speed', 'Synchronous Generator Phasing', 'DC Motor Speed Control'],
    },
    {
      id: 'ee-powersys',
      name: 'Power Systems',
      weightage: '10–13%',
      weightagePercent: 12,
      iconName: 'Layers',
      desc: 'Transmission Lines, Load Flow, Symmetrical Faults & Protection.',
      notesCount: 11,
      checklist: ['ABCD Parameters', 'Y-Bus & Gauss-Seidel Method', 'Symmetrical Fault Analysis', 'Circuit Breakers & Relays'],
    },
    {
      id: 'ee-controls',
      name: 'Control Systems',
      weightage: '8–10%',
      weightagePercent: 9,
      iconName: 'BarChart3',
      desc: 'Transfer Functions, Root Locus, Bode Plot & State Space Analysis.',
      notesCount: 9,
      checklist: ['Block Diagram Reduction', 'Routh-Hurwitz Stability', 'Root Locus Construction', 'Bode Plot Gain & Phase Margin', 'State Transition Matrix'],
    },
    {
      id: 'ee-maths',
      name: 'Engineering Mathematics',
      weightage: '13 Marks',
      weightagePercent: 13,
      iconName: 'FileText',
      desc: 'Linear Algebra, Calculus, Complex Variables & Probability.',
      notesCount: 12,
      checklist: ['Matrices & Vector Calculus', 'Differential Equations', 'Complex Integration', 'Probability Distributions'],
    },
    {
      id: 'ee-aptitude',
      name: 'General Aptitude',
      weightage: '15 Marks',
      weightagePercent: 15,
      iconName: 'GraduationCap',
      desc: 'Verbal, Numerical & Analytical Reasoning.',
      notesCount: 8,
      checklist: ['Verbal Comprehension', 'Data Interpretation', 'Numerical Puzzles'],
    },
  ],
  ME: [
    {
      id: 'me-thermo',
      name: 'Thermodynamics & Applied',
      weightage: '12–15%',
      weightagePercent: 14,
      iconName: 'Zap',
      desc: 'Laws of Thermodynamics, Power Cycles, Refrigeration & IC Engines.',
      notesCount: 12,
      checklist: ['First & Second Law Systems', 'Otto, Diesel & Rankine Cycles', 'Refrigeration COP', 'Psychrometric Chart Properties'],
    },
    {
      id: 'me-fluid',
      name: 'Fluid Mechanics & Thermal',
      weightage: '10–13%',
      weightagePercent: 12,
      iconName: 'Sparkles',
      desc: 'Fluid Kinematics, Bernoulli, Boundary Layer, Heat Conduction & Convection.',
      notesCount: 11,
      checklist: ['Bernoulli Equation & Venturimeter', 'Boundary Layer Thickness', '1D Heat Conduction', 'Convective Heat Transfer Coefficients'],
    },
    {
      id: 'me-som',
      name: 'Strength of Materials',
      weightage: '10–12%',
      weightagePercent: 11,
      iconName: 'Building2',
      desc: 'Stress-Strain, Shear Force & Bending Moment, Torsion & Columns.',
      notesCount: 10,
      checklist: ['Principal Stresses & Mohr Circle', 'SFD & BMD Diagrams', 'Torsion of Circular Shafts', 'Euler Column Buckling'],
    },
    {
      id: 'me-manufacturing',
      name: 'Manufacturing & Industrial',
      weightage: '15–18%',
      weightagePercent: 16,
      iconName: 'Cog',
      desc: 'Casting, Welding, Metal Cutting, Metrology & Production Control.',
      notesCount: 14,
      checklist: ['Riser & Gating Design', 'Merchant Circle Orthogonal Cutting', 'Resistance Welding', 'EOQ & Inventory Control', 'PERT/CPM Networks'],
    },
    {
      id: 'me-maths',
      name: 'Engineering Mathematics',
      weightage: '13 Marks',
      weightagePercent: 13,
      iconName: 'FileText',
      desc: 'Linear Algebra, Calculus, Fourier Series & Numerical Methods.',
      notesCount: 12,
      checklist: ['Matrix Eigenvalues', 'Vector Calculus Gradient/Divergence', 'Differential Equations', 'Numerical Methods'],
    },
    {
      id: 'me-aptitude',
      name: 'General Aptitude',
      weightage: '15 Marks',
      weightagePercent: 15,
      iconName: 'GraduationCap',
      desc: 'Verbal, Quantitative & Analytical Reasoning.',
      notesCount: 8,
      checklist: ['Verbal Ability', 'Numerical Computation', 'Logical Aptitude'],
    },
  ],
};

// Custom Hook for 3D Tilt Effect on Mouse move
function use3DTilt(maxTilt = 15) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Responsive safety check
    if (window.innerWidth < 640) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-(y / (rect.height / 2)) * maxTilt).toFixed(2);
    const rotateY = ((x / (rect.width / 2)) * maxTilt).toFixed(2);

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return { cardRef, handleMouseMove, handleMouseLeave };
}

// 3D Tilt Card Component Wrapper
const Tilt3DCard = ({ children, className = '', maxTilt = 12, onClick }: any) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = use3DTilt(maxTilt);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`transition-transform duration-200 ease-out style-3d cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
};

export default function Gate3DApp() {
  // Navigation Screens: 'login' | 'paper-select' | 'subjects' | 'subject-detail'
  const [currentScreen, setCurrentScreen] = useState<'login' | 'paper-select' | 'subjects' | 'subject-detail'>('login');

  // Supabase Auth States
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Email OTP States
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpStep, setOtpStep] = useState<'email' | 'verify'>('email');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // App Content Selection States
  const [selectedPaperCode, setSelectedPaperCode] = useState<string>('CE');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  // Theme Mode: Dark (default) vs Light
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // OTP Input Box References
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for Resend OTP
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Supabase Session Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        loadUserSelectedPaper(session.user.id);
        setCurrentScreen('paper-select');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        loadUserSelectedPaper(session.user.id);
      } else {
        setCurrentScreen('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load Saved Paper from localStorage or Supabase
  const loadUserSelectedPaper = (userId: string) => {
    const localPaper = localStorage.getItem(`gate3d_paper_${userId}`);
    if (localPaper) {
      setSelectedPaperCode(localPaper);
    }
  };

  // Save Selected Paper to Supabase user_profiles & localStorage
  const handleSelectPaper = async (paperCode: string) => {
    setSelectedPaperCode(paperCode);

    if (user?.id) {
      localStorage.setItem(`gate3d_paper_${user.id}`, paperCode);

      try {
        await supabase.from('user_profiles').upsert(
          {
            user_id: user.id,
            selected_paper: paperCode,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
      } catch (err) {
        // Fallback gracefully if user_profiles table doesn't exist yet
      }
    }

    setCurrentScreen('subjects');
  };

  // Handle Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    setAuthError(null);
    setAuthSuccess(null);
    setOtpLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== 'undefined' ? window.location.origin : undefined,
        },
      });

      setOtpLoading(false);

      if (error) {
        setAuthError(error.message || 'Failed to send OTP code. Please try again.');
      } else {
        setOtpStep('verify');
        setResendTimer(60);
        setAuthSuccess(`6-digit OTP code sent to ${email}!`);
      }
    } catch (err: any) {
      setOtpLoading(false);
      setAuthError(err.message || 'Network error occurred.');
    }
  };

  // Handle OTP Input Box Digit Change
  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input box
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace Key in OTP Boxes
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join('');

    if (token.length < 6) {
      setAuthError('Please enter all 6 digits of your OTP code.');
      return;
    }

    setAuthError(null);
    setAuthSuccess(null);
    setOtpLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      setOtpLoading(false);

      if (error) {
        setAuthError(error.message || 'Invalid or expired OTP code. Check and try again.');
      } else if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setAuthSuccess('Successfully authenticated with Supabase!');
        setCurrentScreen('paper-select');
      }
    } catch (err: any) {
      setOtpLoading(false);
      setAuthError(err.message || 'Verification failed. Please retry.');
    }
  };

  // Handle Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setOtpStep('email');
    setOtpDigits(['', '', '', '', '', '']);
    setCurrentScreen('login');
  };

  // Toggle Checklist Task
  const toggleChecklist = (taskId: string) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const selectedPaperObj = GATE_PAPERS.find((p) => p.code === selectedPaperCode) || GATE_PAPERS[0];
  const currentSubjectsList = PAPER_SUBJECTS[selectedPaperCode] || PAPER_SUBJECTS['CE'];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-[#1CA3DC] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Loading 3D GATE Engine...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-hidden font-sans selection:bg-[#1CA3DC] selection:text-slate-950 ${
        themeMode === 'dark' ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* 3D Floating Background Parallax Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Persistent 3D Glass Header Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
          themeMode === 'dark'
            ? 'bg-slate-950/80 border-slate-800/80 text-white'
            : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => user && setCurrentScreen('paper-select')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-[#1CA3DC] to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20 border border-white/20 style-3d hover:scale-105 transition-all">
                3D
              </div>
              <div>
                <div className="text-base font-black tracking-tight flex items-center gap-1.5">
                  <span>GATE Prep Hub</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                    3D Edition
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Powered by Supabase OTP Auth</div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Light / Dark Mode Toggle */}
              <button
                onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-xl border transition-all ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                    : 'bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300'
                }`}
                aria-label="Toggle Theme"
              >
                {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Logged in User Bar */}
              {user && (
                <div className="flex items-center gap-2">
                  <div
                    className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                      themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-200 border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1CA3DC] text-slate-950 font-black text-[10px] flex items-center justify-center">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[120px] truncate">{user.email}</span>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with 3D Slide Entrance */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* STEP 1 — 🔐 LOGIN SCREEN */}
        {currentScreen === 'login' && (
          <div className="max-w-md mx-auto space-y-8 animate-fade-rise">
            <Tilt3DCard maxTilt={10}>
              <div
                className={`p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden ${
                  themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'
                }`}
              >
                {/* 3D Floating Top Accent */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-[#1CA3DC] to-blue-600 flex items-center justify-center mx-auto text-white shadow-lg shadow-cyan-500/30 border border-white/20 style-3d">
                  <Shield className="w-7 h-7" />
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Supabase 3D Auth Portal</h1>
                  <p className="text-xs text-slate-400">Enter your email to receive a passwordless 6-digit OTP code.</p>
                </div>

                {/* Feedback Banners */}
                {authError && (
                  <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-semibold flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                {/* STEP 1A: EMAIL INPUT FORM */}
                {otpStep === 'email' && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
                        Student Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="gate.aspirant@iit.ac.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-2xl border focus:outline-none focus:border-[#1CA3DC] transition-all ${
                            themeMode === 'dark'
                              ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
                              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#1CA3DC] to-blue-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:translate-y-0.5 active:shadow-inner transition-all disabled:opacity-50"
                    >
                      {otpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <>
                          <span>Send 6-Digit OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 1B: 6-DIGIT 3D OTP BOXES */}
                {otpStep === 'verify' && (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                          Enter 6-Digit OTP
                        </label>
                        <button
                          type="button"
                          onClick={() => setOtpStep('email')}
                          className="text-[11px] font-bold text-cyan-400 hover:underline"
                        >
                          Change Email
                        </button>
                      </div>

                      {/* 6 3D Pop Boxes */}
                      <div className="flex items-center justify-between gap-2">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpInputRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-black text-lg sm:text-xl rounded-2xl border transition-all duration-150 transform focus:scale-110 focus:border-[#1CA3DC] focus:shadow-lg focus:shadow-cyan-500/30 focus:outline-none ${
                              digit ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 scale-105' : ''
                            } ${
                              themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#1CA3DC] to-blue-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:translate-y-0.5 transition-all disabled:opacity-50"
                    >
                      {otpLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Verify OTP & Enter App</span>
                        </>
                      )}
                    </button>

                    {/* Resend OTP Button with 60s Countdown */}
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <p className="text-xs text-slate-400 font-medium">
                          Resend code available in <strong className="text-cyan-400 font-mono">{resendTimer}s</strong>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpLoading}
                          className="text-xs font-bold text-cyan-400 hover:underline inline-flex items-center gap-1"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Resend OTP Code</span>
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </Tilt3DCard>
          </div>
        )}

        {/* STEP 2 — 📄 PAPER SELECTION PAGE */}
        {currentScreen === 'paper-select' && (
          <div className="space-y-8 animate-fade-rise">
            {/* Header Greeting */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Supabase Authenticated Session</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CA3DC] to-purple-400">{user?.email?.split('@')[0] || 'Aspirant'}</span>! Choose your GATE Paper
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Select your engineering discipline to load syllabus weightage and 3D study modules.
              </p>
            </div>

            {/* 3D Paper Tilt Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GATE_PAPERS.map((paper) => {
                const Icon = paper.icon;
                const isSelected = selectedPaperCode === paper.code;

                return (
                  <Tilt3DCard key={paper.code} onClick={() => handleSelectPaper(paper.code)} maxTilt={15}>
                    <div
                      className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition-all h-full flex flex-col justify-between space-y-6 group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-cyan-500/20 ring-2 ring-cyan-500/50'
                          : themeMode === 'dark'
                          ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                          : 'bg-white/90 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-extrabold font-mono text-cyan-300">
                            PAPER CODE: {paper.code}
                          </span>
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${paper.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform style-3d`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-black tracking-tight">{paper.name}</h3>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                            {paper.category}
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{paper.desc}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 group-hover:underline flex items-center gap-1">
                          <span>Select Discipline</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {isSelected && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </Tilt3DCard>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3 — 📚 SUBJECTS PAGE (DYNAMIC) */}
        {currentScreen === 'subjects' && (
          <div className="space-y-8 animate-fade-rise">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <button onClick={() => setCurrentScreen('paper-select')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
                <span>&gt;</span>
                <span className="text-cyan-400 font-mono">{selectedPaperCode} Paper</span>
                <span>&gt;</span>
                <span className="text-white">Subjects</span>
              </nav>

              <button
                onClick={() => setCurrentScreen('paper-select')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span>Change Paper</span>
              </button>
            </div>

            {/* Header Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold mb-1">
                  <span>{selectedPaperObj.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedPaperObj.name} ({selectedPaperCode}) Core Subjects
                </h1>
                <p className="text-xs text-slate-300">
                  Select a subject below to view topic notes, GATE weightage breakdown, and preparation checklists.
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0">
                <div className="text-2xl font-black text-cyan-400 font-mono">{currentSubjectsList.length}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Subjects</div>
              </div>
            </div>

            {/* 3D Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSubjectsList.map((subject) => (
                <Tilt3DCard
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setCurrentScreen('subject-detail');
                  }}
                  maxTilt={12}
                >
                  <div
                    className={`p-6 rounded-3xl border backdrop-blur-xl shadow-xl transition-all h-full flex flex-col justify-between space-y-6 group ${
                      themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/60' : 'bg-white/90 border-slate-200 hover:border-cyan-500/60'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black font-mono">
                          {subject.weightage}
                        </span>

                        {/* Animated SVG Progress Ring */}
                        <div className="relative w-10 h-10 flex items-center justify-center">
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" className="text-slate-800" fill="transparent" />
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray={100}
                              strokeDashoffset={100 - subject.weightagePercent}
                              strokeLinecap="round"
                              className="text-cyan-400 transition-all duration-1000"
                              fill="transparent"
                            />
                          </svg>
                          <span className="absolute text-[10px] font-black text-cyan-300 font-mono">
                            {subject.weightagePercent}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                          {subject.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{subject.desc}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold">{subject.checklist.length} Topic Checklists</span>
                      <button className="px-3.5 py-2 rounded-xl bg-[#1CA3DC] group-hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 active:scale-95 transition-all">
                        <span>Start Studying</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 — 📖 SUBJECT DETAILS PAGE */}
        {currentScreen === 'subject-detail' && selectedSubject && (
          <div className="space-y-8 animate-fade-rise">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <button onClick={() => setCurrentScreen('paper-select')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
                <span>&gt;</span>
                <button onClick={() => setCurrentScreen('subjects')} className="hover:text-cyan-400 font-mono transition-colors">
                  {selectedPaperCode}
                </button>
                <span>&gt;</span>
                <span className="text-white">{selectedSubject.name}</span>
              </nav>

              <button
                onClick={() => setCurrentScreen('subjects')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span>Back to Subjects</span>
              </button>
            </div>

            {/* Subject Detail Header */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-extrabold">
                  {selectedSubject.weightage} GATE Weightage
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-extrabold">
                  {selectedSubject.notesCount} Curated Modules
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{selectedSubject.name}</h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">{selectedSubject.desc}</p>
            </div>

            {/* Content Columns: Resources & Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left 2 Columns: Study Resources */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Notes &amp; Learning Resources</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="https://gate2026.iitg.ac.in/doc/GATE2026_Syllabus/CE_2026_Syllabus.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">Official Syllabus PDF</h4>
                      <p className="text-xs text-slate-400">Complete section topic breakdown published by organizing institute.</p>
                    </div>
                  </a>

                  <a
                    href="https://gate.nptel.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/60 transition-all flex items-start gap-4 group"
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">NPTEL Video Lectures</h4>
                      <p className="text-xs text-slate-400">Free video courses & solved PYQ walkthroughs by IIT faculty.</p>
                    </div>
                  </a>
                </div>

                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Topper Strategy Note</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Master formulas, standard derivations, and solved PYQs from the last 15 years. Re-solve previous GATE problems twice before attempting full-length mock exams.
                  </p>
                </div>
              </div>

              {/* Right Column: 3D Interactive Study Checklist */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                  <span>Topic Checklist</span>
                </h3>

                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-400">Completion</span>
                      <span className="text-cyan-400 font-mono">
                        {selectedSubject.checklist.filter((item) => completedTasks[`${selectedSubject.id}_${item}`]).length} / {selectedSubject.checklist.length}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                        style={{
                          width: `${
                            (selectedSubject.checklist.filter((item) => completedTasks[`${selectedSubject.id}_${item}`]).length /
                              selectedSubject.checklist.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-2.5 pt-2">
                    {selectedSubject.checklist.map((topic, idx) => {
                      const taskId = `${selectedSubject.id}_${topic}`;
                      const isDone = !!completedTasks[taskId];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleChecklist(taskId)}
                          className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                            isDone ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-400 line-through' : 'bg-slate-950 border-slate-800 text-white hover:border-slate-700'
                          }`}
                        >
                          {isDone ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" /> : <Square className="w-4 h-4 text-slate-600 shrink-0" />}
                          <span className="text-xs font-semibold">{topic}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global CSS for 3D animations */}
      <style jsx global>{`
        .style-3d {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        @keyframes fadeRise {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-rise {
          animation: fadeRise 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
