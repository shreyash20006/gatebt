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
  Flame,
  Clock,
  Target,
  Trophy,
  Edit3,
  Save,
  HelpCircle,
  RotateCcw,
  Check,
  TrendingUp,
  PieChart,
  Bell,
  Calendar,
  AlertTriangle,
  Activity,
} from 'lucide-react';

// ==========================================
// CONFIGURATION & DATA MAPS
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
      checklist: ['Solid Mechanics (SOM) Basics', 'Bending & Shear Stresses', 'Trusses & Frames', 'RCC Beam Design', 'Steel Connections & Beams'],
    },
    {
      id: 'ce-geotech',
      name: 'Geotechnical Engineering',
      weightage: '15–18%',
      weightagePercent: 18,
      iconName: 'Layers',
      desc: 'Soil Mechanics, Permeability, Shear Strength, Consolidation & Foundations.',
      checklist: ['Phase Relationships', 'Permeability & Seepage', 'Consolidation Theory', 'Direct Shear & Triaxial Test', 'Shallow & Deep Foundations'],
    },
    {
      id: 'ce-water',
      name: 'Water Resources Engineering',
      weightage: '12–16%',
      weightagePercent: 15,
      iconName: 'Zap',
      desc: 'Fluid Mechanics, Hydraulics, Open Channel Flow, Hydrology & Irrigation.',
      checklist: ['Fluid Statics & Dynamics', 'Pipe Flow & Losses', 'Open Channel Uniform Flow', 'Hydrograph Analysis', 'Irrigation Water Requirements'],
    },
    {
      id: 'ce-environmental',
      name: 'Environmental Engineering',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Sparkles',
      desc: 'Water Quality, Treatment Processes, Sewage Treatment & Air Pollution.',
      checklist: ['Water Quality Parameters', 'Sedimentation & Filtration', 'Activated Sludge Process', 'Air Pollutants & Dispersion', 'Municipal Solid Waste'],
    },
    {
      id: 'ce-transport',
      name: 'Transportation Engineering',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Award',
      desc: 'Highway Design, Traffic Engineering, Pavement Design & Railways.',
      checklist: ['Highway Geometric Design', 'Sight Distances (SSD/OSD)', 'Traffic Flow Characteristics', 'Flexible Pavement Design', 'Rail Geometry'],
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
      checklist: ['Amino Acids & Protein Folding', 'Michaelis-Menten Kinetics', 'Glycolysis & TCA Cycle', 'Oxidative Phosphorylation', 'Lipid & Nucleotide Metabolism'],
    },
    {
      id: 'bt-bioprocess',
      name: 'Bioprocess Engineering',
      weightage: '20–25%',
      weightagePercent: 22,
      iconName: 'Cog',
      desc: 'Mass & Energy Balances, Bioreactor Design, Sterilization & Downstream.',
      checklist: ['Stoichiometry of Cell Growth', 'Design of CSTR & Batch Reactors', 'Aeration & Oxygen Transfer (kLa)', 'Media Sterilization Kinetics', 'Filtration & Chromatography'],
    },
    {
      id: 'bt-molbio',
      name: 'Genetics & Molecular Biology',
      weightage: '15–18%',
      weightagePercent: 16,
      iconName: 'Dna',
      desc: 'DNA Replication, Transcription, Translation, Operons & Recombinant DNA.',
      checklist: ['Replication Machinery', 'Eukaryotic Transcription', 'Lac & Trp Operon Regulation', 'Restriction Enzymes & Cloning Vectors', 'PCR & DNA Sequencing'],
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
      checklist: ['Asymptotic Notation (Big-O)', 'Binary Search Trees & AVL', 'Graph BFS/DFS & Shortest Path', 'Sorting Algorithms', 'Dynamic Programming Patterns'],
    },
    {
      id: 'cs-os',
      name: 'Operating Systems',
      weightage: '8–10%',
      weightagePercent: 10,
      iconName: 'Layers',
      desc: 'Process Management, Threads, CPU Scheduling, Deadlocks & Memory.',
      checklist: ['Process State & Context Switching', 'Semaphores & Mutex', 'Banker\'s Deadlock Algorithm', 'Paging & Virtual Memory'],
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
      checklist: ['Transformer Equivalent Circuit', 'Induction Motor Torque-Speed', 'Synchronous Generator Phasing', 'DC Motor Speed Control'],
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
      checklist: ['First & Second Law Systems', 'Otto, Diesel & Rankine Cycles', 'Refrigeration COP', 'Psychrometric Chart Properties'],
    },
  ],
};

interface Question {
  id: string;
  paper_code: string;
  subject: string;
  question: string;
  options: string[];
  correct_answer: number;
  marks: number;
  negative_marks: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    paper_code: 'CE',
    subject: 'Structural Engineering',
    question: 'What is the maximum shear stress in a circular shaft subjected to torque T and diameter D?',
    options: ['16T / (π D³)', '32T / (π D³)', '8T / (π D³)', '64T / (π D³)'],
    correct_answer: 0,
    marks: 1,
    negative_marks: 0.33,
    explanation: 'The maximum shear stress τ_max in a circular solid shaft under torsion is given by τ = 16T / (π D³).',
  },
  {
    id: 'q2',
    paper_code: 'CE',
    subject: 'Structural Engineering',
    question: 'In a simply supported beam of span L with a central point load W, the maximum bending moment is:',
    options: ['W L / 8', 'W L / 4', 'W L / 2', 'W L'],
    correct_answer: 1,
    marks: 2,
    negative_marks: 0.67,
    explanation: 'Maximum bending moment for a simply supported beam under central point load W occurs at center and equals W L / 4.',
  },
  {
    id: 'q3',
    paper_code: 'CE',
    subject: 'Geotechnical Engineering',
    question: 'According to Terzaghi, the ultimate bearing capacity for a continuous strip footing is:',
    options: [
      'c N_c + q N_q + 0.5 γ B N_γ',
      '1.3 c N_c + q N_q + 0.4 γ B N_γ',
      'c N_c + q N_q + 0.3 γ B N_γ',
      '1.3 c N_c + q N_q + 0.3 γ B N_γ',
    ],
    correct_answer: 0,
    marks: 1,
    negative_marks: 0.33,
    explanation: 'Terzaghi ultimate bearing capacity equation for strip footing: q_u = c N_c + q N_q + 0.5 γ B N_γ.',
  },
  {
    id: 'q4',
    paper_code: 'BT',
    subject: 'Biochemistry',
    question: 'The Km value of an enzyme represents:',
    options: ['Substrate concentration at Vmax', 'Substrate concentration at half Vmax', 'Maximum reaction velocity', 'Enzyme concentration'],
    correct_answer: 1,
    marks: 1,
    negative_marks: 0.33,
    explanation: 'Michaelis constant Km equals the substrate concentration at which reaction rate is half of Vmax.',
  },
];

// Custom 3D Tilt Hook
function use3DTilt(maxTilt = 15) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 640) return;
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
  // Screens: 'login' | 'dashboard' | 'paper-select' | 'subjects' | 'subject-detail' | 'mock-test' | 'test-result' | 'analytics'
  const [currentScreen, setCurrentScreen] = useState<
    'login' | 'dashboard' | 'paper-select' | 'subjects' | 'subject-detail' | 'mock-test' | 'test-result' | 'analytics'
  >('login');

  // Supabase Auth
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Email OTP
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpStep, setOtpStep] = useState<'email' | 'verify'>('email');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Content Selection & Progress
  const [selectedPaperCode, setSelectedPaperCode] = useState<string>('CE');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [topicNotes, setTopicNotes] = useState<Record<string, string>>({});
  const [activeTopicNoteId, setActiveTopicNoteId] = useState<string | null>(null);
  const [savingNote, setSavingNote] = useState(false);

  // Analytics & Reminders States
  const [dailyGoalHours, setDailyGoalHours] = useState<number>(4.0);
  const [targetGateScore, setTargetGateScore] = useState<number>(700);
  const [studyMinutesToday, setStudyMinutesToday] = useState<number>(145);
  const [notifPermission, setNotifPermission] = useState<string>('default');

  // Countdown to Feb 6, 2027
  const [daysLeft, setDaysLeft] = useState<number>(0);

  // Theme
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Confetti Animation Ref
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mock Test Engine States
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(SAMPLE_QUESTIONS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [quizTimer, setQuizTimer] = useState<number>(600);
  const [testResult, setTestResult] = useState<{
    score: number;
    maxScore: number;
    accuracy: number;
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
  } | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Time Tracker Auto-Logger (Logs 1 minute every 60s when subject-detail page is open)
  useEffect(() => {
    let interval: any;
    if (currentScreen === 'subject-detail' && selectedSubject && user) {
      interval = setInterval(() => {
        setStudyMinutesToday((prev) => prev + 1);
        // Log to Supabase study_sessions
        supabase.from('study_sessions').insert({
          user_id: user.id,
          subject_id: selectedSubject.id,
          minutes: 1,
          session_date: new Date().toISOString().split('T')[0],
        });
      }, 60000); // every 1 min
    }
    return () => clearInterval(interval);
  }, [currentScreen, selectedSubject, user]);

  // Countdown calculation
  useEffect(() => {
    const examDate = new Date('2027-02-06T09:30:00+05:30').getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, Math.ceil((examDate - now) / (1000 * 60 * 60 * 24)));
    setDaysLeft(diff);
  }, []);

  // Resend Timer
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Quiz Timer
  useEffect(() => {
    let interval: any;
    if (currentScreen === 'mock-test' && quizTimer > 0) {
      interval = setInterval(() => {
        setQuizTimer((prev) => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, quizTimer]);

  // Supabase Auth Initialization
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotifPermission(Notification.permission);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        loadUserData(session.user.id);
        setCurrentScreen('dashboard');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthLoading(false);
      if (session?.user) {
        loadUserData(session.user.id);
        setCurrentScreen('dashboard');
      } else {
        setCurrentScreen('login');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load User Data
  const loadUserData = async (userId: string) => {
    const localPaper = localStorage.getItem(`gate3d_paper_${userId}`);
    if (localPaper) setSelectedPaperCode(localPaper);

    try {
      const { data: topicsData } = await supabase.from('topics').select('*').eq('user_id', userId);
      if (topicsData) {
        const map: Record<string, boolean> = {};
        topicsData.forEach((t) => {
          map[`${t.subject_id}_${t.topic_name}`] = t.is_completed;
        });
        setCompletedTopics(map);
      }
    } catch (e) {}

    try {
      const { data: notesData } = await supabase.from('notes').select('*').eq('user_id', userId);
      if (notesData) {
        const map: Record<string, string> = {};
        notesData.forEach((n) => {
          map[n.topic_id] = n.content;
        });
        setTopicNotes(map);
      }
    } catch (e) {}
  };

  // Request Native Browser Notifications
  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((perm) => {
        setNotifPermission(perm);
        if (perm === 'granted') {
          new Notification('GATE 3D Reminders Active 🚀', {
            body: 'You will receive study streak & weak subject nudges!',
          });
        }
      });
    }
  };

  // Handle Select Paper
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
      } catch (e) {}
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
        setAuthError(error.message || 'Failed to send OTP code.');
      } else {
        setOtpStep('verify');
        setResendTimer(60);
        setAuthSuccess(`6-digit OTP code sent to ${email}!`);
      }
    } catch (err: any) {
      setOtpLoading(false);
      setAuthError(err.message || 'Network failure.');
    }
  };

  // OTP Digit Change
  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join('');
    if (token.length < 6) {
      setAuthError('Please enter all 6 digits.');
      return;
    }
    setAuthError(null);
    setAuthSuccess(null);
    setOtpLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
      setOtpLoading(false);
      if (error) {
        setAuthError(error.message || 'Invalid or expired OTP code.');
      } else if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setCurrentScreen('dashboard');
      }
    } catch (err: any) {
      setOtpLoading(false);
      setAuthError(err.message || 'Verification failed.');
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setOtpStep('email');
    setOtpDigits(['', '', '', '', '', '']);
    setCurrentScreen('login');
  };

  // Toggle Topic Completion & Trigger Confetti 🎉 on 100%
  const toggleTopicCompletion = async (subjectId: string, topicName: string) => {
    const key = `${subjectId}_${topicName}`;
    const newStatus = !completedTopics[key];

    setCompletedTopics((prev) => {
      const updated = { ...prev, [key]: newStatus };
      const currentSub = (PAPER_SUBJECTS[selectedPaperCode] || []).find((s) => s.id === subjectId);
      if (currentSub) {
        const completedCount = currentSub.checklist.filter((item) => updated[`${subjectId}_${item}`]).length;
        if (completedCount === currentSub.checklist.length) {
          triggerConfetti();
        }
      }
      return updated;
    });

    if (user?.id) {
      try {
        await supabase.from('topics').upsert(
          {
            user_id: user.id,
            subject_id: subjectId,
            topic_name: topicName,
            is_completed: newStatus,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,subject_id,topic_name' }
        );
      } catch (e) {}
    }
  };

  // Confetti Animation 🎉
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#1CA3DC', '#A855F7', '#EC4899', '#3B82F6', '#F59E0B', '#10B981'];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.alpha > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.4;
          p.alpha -= 0.015;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.restore();
        }
      });
      if (alive) requestAnimationFrame(animate);
    };
    animate();
  };

  // Save Personal Notes
  const handleSaveTopicNote = async (topicKey: string, content: string) => {
    setTopicNotes((prev) => ({ ...prev, [topicKey]: content }));
    setSavingNote(true);
    if (user?.id) {
      try {
        await supabase.from('notes').upsert(
          {
            user_id: user.id,
            topic_id: topicKey,
            content,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,topic_id' }
        );
      } catch (e) {}
    }
    setTimeout(() => setSavingNote(false), 800);
  };

  // Start Quiz
  const startMockQuiz = () => {
    setQuizQuestions(SAMPLE_QUESTIONS);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setMarkedForReview({});
    setQuizTimer(600);
    setTestResult(null);
    setCurrentScreen('mock-test');
  };

  // Quiz Options
  const handleSelectQuizOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }));
  };

  // Finish Quiz & Compute GATE Score
  const handleFinishQuiz = async () => {
    let score = 0;
    let maxScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    quizQuestions.forEach((q, idx) => {
      maxScore += q.marks;
      const selectedOpt = userAnswers[idx];

      if (selectedOpt === undefined) {
        skippedCount++;
      } else if (selectedOpt === q.correct_answer) {
        correctCount++;
        score += q.marks;
      } else {
        wrongCount++;
        score -= q.negative_marks;
      }
    });

    const finalScore = Math.max(0, parseFloat(score.toFixed(2)));
    const attemptedCount = correctCount + wrongCount;
    const accuracy = attemptedCount > 0 ? parseFloat(((correctCount / attemptedCount) * 100).toFixed(1)) : 0;

    const result = {
      score: finalScore,
      maxScore,
      accuracy,
      correctCount,
      wrongCount,
      skippedCount,
    };

    setTestResult(result);
    setCurrentScreen('test-result');

    if (user?.id) {
      try {
        await supabase.from('test_attempts').insert({
          user_id: user.id,
          paper_code: selectedPaperCode,
          score: finalScore,
          max_score: maxScore,
          accuracy,
          taken_at: new Date().toISOString(),
        });
      } catch (e) {}
    }
  };

  const selectedPaperObj = GATE_PAPERS.find((p) => p.code === selectedPaperCode) || GATE_PAPERS[0];
  const currentSubjectsList = PAPER_SUBJECTS[selectedPaperCode] || PAPER_SUBJECTS['CE'];

  // Overall Syllabus Completion Calculation
  const totalTopicsInPaper = currentSubjectsList.reduce((acc, sub) => acc + sub.checklist.length, 0);
  const totalTopicsCompleted = currentSubjectsList.reduce((acc, sub) => {
    return acc + sub.checklist.filter((item) => completedTopics[`${sub.id}_${item}`]).length;
  }, 0);
  const overallPercentage = totalTopicsInPaper > 0 ? Math.round((totalTopicsCompleted / totalTopicsInPaper) * 100) : 0;

  // Predictor Calculations
  const mockAccuracy = testResult ? testResult.accuracy : 72; // default estimate
  const predictedGateMarks = Math.round((mockAccuracy / 100) * 100 * 0.75 + overallPercentage * 0.25);
  const predictedGateScore = Math.min(1000, Math.round(predictedGateMarks * 9.5));

  // Weak Subject Detection
  const weakSubjectsList = currentSubjectsList
    .map((sub) => {
      const completedCount = sub.checklist.filter((item) => completedTopics[`${sub.id}_${item}`]).length;
      const subAcc = testResult ? testResult.accuracy : Math.round((completedCount / sub.checklist.length) * 100);
      let status: 'Weak' | 'Average' | 'Strong' = 'Strong';
      if (subAcc < 50) status = 'Weak';
      else if (subAcc <= 75) status = 'Average';

      const priorityScore = (100 - subAcc) * sub.weightagePercent;
      return { ...sub, subAcc, status, priorityScore };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-[#1CA3DC] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Loading 3D GATE Pro Engine...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative overflow-hidden font-sans selection:bg-[#1CA3DC] selection:text-slate-950 ${
        themeMode === 'dark' ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* 3D Floating Background Spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse delay-700" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header Navigation */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all ${
          themeMode === 'dark' ? 'bg-slate-950/80 border-slate-800/80 text-white' : 'bg-white/80 border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => user && setCurrentScreen('dashboard')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-[#1CA3DC] to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg style-3d">
                3D
              </div>
              <div>
                <div className="text-base font-black tracking-tight flex items-center gap-1.5">
                  <span>GATE Prep Hub</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold uppercase">
                    3D Pro
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Analytics &amp; Rank Predictor Ready</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            {user && (
              <div className="hidden md:flex items-center gap-1 text-xs font-bold">
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    currentScreen === 'dashboard' ? 'bg-[#1CA3DC] text-slate-950' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentScreen('paper-select')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    currentScreen === 'paper-select' ? 'bg-[#1CA3DC] text-slate-950' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Paper ({selectedPaperCode})
                </button>
                <button
                  onClick={() => setCurrentScreen('subjects')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    currentScreen === 'subjects' ? 'bg-[#1CA3DC] text-slate-950' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Subjects
                </button>
                <button
                  onClick={startMockQuiz}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    currentScreen === 'mock-test' ? 'bg-[#1CA3DC] text-slate-950' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  Mock Test
                </button>
                <button
                  onClick={() => setCurrentScreen('analytics')}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                    currentScreen === 'analytics' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-slate-900'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Analytics &amp; Insights</span>
                </button>
              </div>
            )}

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-xl border transition-all ${
                  themeMode === 'dark' ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-200 border-slate-300 text-slate-700'
                }`}
              >
                {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {user && (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-bold text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-[#1CA3DC] text-slate-950 font-black text-[10px] flex items-center justify-center">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate">{user.email}</span>
                  </div>

                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1.5"
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

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* STEP 1 — 🔐 LOGIN SCREEN */}
        {currentScreen === 'login' && (
          <div className="max-w-md mx-auto space-y-8 animate-fade-rise">
            <Tilt3DCard maxTilt={10}>
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-2xl space-y-6 relative overflow-hidden ${
                themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-[#1CA3DC] to-blue-600 flex items-center justify-center mx-auto text-white shadow-lg style-3d">
                  <Shield className="w-7 h-7" />
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight">GATE 2027 Aspirant Portal</h1>
                  <p className="text-xs text-slate-400">Enter your email for a passwordless 6-digit OTP code.</p>
                </div>

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
                          placeholder="student@iit.ac.in"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full text-xs font-semibold pl-10 pr-4 py-3 rounded-2xl border focus:outline-none focus:border-[#1CA3DC] ${
                            themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#1CA3DC] to-blue-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg active:translate-y-0.5 disabled:opacity-50"
                    >
                      {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Send 6-Digit OTP</span><ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                )}

                {otpStep === 'verify' && (
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Enter 6-Digit OTP</label>
                        <button type="button" onClick={() => setOtpStep('email')} className="text-[11px] font-bold text-cyan-400 hover:underline">
                          Change Email
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => { otpInputRefs.current[idx] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-black text-lg sm:text-xl rounded-2xl border transition-all ${
                              digit ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 scale-105' : ''
                            } ${themeMode === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-[#1CA3DC] to-blue-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {otpLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /><span>Verify OTP &amp; Enter App</span></>}
                    </button>
                  </form>
                )}
              </div>
            </Tilt3DCard>
          </div>
        )}

        {/* STEP 2 — 📊 DASHBOARD PAGE */}
        {currentScreen === 'dashboard' && (
          <div className="space-y-8 animate-fade-rise">
            {/* Top Welcome Banner & Days-Left Countdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>GATE 2027 Preparation Portal</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CA3DC] to-purple-400">{user?.email?.split('@')[0] || 'Aspirant'}</span>!
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    Selected Paper: <strong className="text-cyan-300 font-mono">{selectedPaperObj.name} ({selectedPaperCode})</strong>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setCurrentScreen('subjects')}
                    className="px-4 py-2.5 rounded-xl bg-[#1CA3DC] hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Browse {selectedPaperCode} Subjects</span>
                  </button>

                  <button
                    onClick={startMockQuiz}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Take GATE Mock Test</span>
                  </button>

                  <button
                    onClick={() => setCurrentScreen('analytics')}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-purple-300 text-xs font-bold flex items-center gap-1.5"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Analytics &amp; Rank Predictor</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exam Target</div>
                    <div className="text-sm font-bold text-white">Feb 6, 2027</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-black flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{daysLeft} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 transform -rotate-90">
                      <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-800" fill="transparent" />
                      <circle
                        cx="28"
                        cy="28"
                        r="22"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={138}
                        strokeDashoffset={138 - (138 * overallPercentage) / 100}
                        strokeLinecap="round"
                        className="text-cyan-400 transition-all duration-1000"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-cyan-300 font-mono">{overallPercentage}%</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white">Overall Syllabus Progress</div>
                    <div className="text-[11px] text-slate-400">
                      {totalTopicsCompleted} of {totalTopicsInPaper} topics completed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Study Streak & Daily Goal Setting */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Weekly Study Streak</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                    3 Days Active
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center">
                  {[
                    { day: 'M', active: true },
                    { day: 'T', active: true },
                    { day: 'W', active: true },
                    { day: 'T', active: false },
                    { day: 'F', active: false },
                    { day: 'S', active: false },
                    { day: 'S', active: false },
                  ].map((d, i) => (
                    <div key={i} className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 ${d.active ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-600'}`}>
                      <Flame className={`w-4 h-4 ${d.active ? 'text-amber-400' : 'text-slate-700'}`} />
                      <span className="text-[10px] font-bold">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Target Goal Card */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Daily Goal Target</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-cyan-300">{(studyMinutesToday / 60).toFixed(1)} / {dailyGoalHours} hrs</span>
                </div>

                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round(((studyMinutesToday / 60) / dailyGoalHours) * 100))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Adjust daily goal:</span>
                  <select
                    value={dailyGoalHours}
                    onChange={(e) => setDailyGoalHours(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 text-cyan-300 rounded-lg px-2 py-0.5 text-xs"
                  >
                    <option value={2}>2 hrs / day</option>
                    <option value={4}>4 hrs / day</option>
                    <option value={6}>6 hrs / day</option>
                  </select>
                </div>
              </div>

              {/* Notification Reminders Card */}
              <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-purple-400" />
                    <span>Study Reminders</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    {notifPermission === 'granted' ? 'Enabled' : 'Prompt'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Receive browser nudges if you miss a daily study streak or neglect a weak subject.
                </p>

                {notifPermission !== 'granted' && (
                  <button
                    onClick={requestNotificationPermission}
                    className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Enable Reminders</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — 📄 PAPER SELECTION PAGE */}
        {currentScreen === 'paper-select' && (
          <div className="space-y-8 animate-fade-rise">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Authenticated Student Session</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CA3DC] to-purple-400">{user?.email?.split('@')[0] || 'Aspirant'}</span>! Choose your GATE Paper
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Select your engineering discipline to load syllabus weightage and 3D study modules.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {GATE_PAPERS.map((paper) => {
                const Icon = paper.icon;
                const isSelected = selectedPaperCode === paper.code;

                return (
                  <Tilt3DCard key={paper.code} onClick={() => handleSelectPaper(paper.code)} maxTilt={15}>
                    <div
                      className={`p-6 sm:p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition-all h-full flex flex-col justify-between space-y-6 group ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/30 ring-2 ring-cyan-500/50'
                          : themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-white/90 border-slate-200'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] font-extrabold font-mono text-cyan-300">
                            PAPER CODE: {paper.code}
                          </span>
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${paper.color} flex items-center justify-center text-white shadow-lg style-3d`}>
                            <Icon className="w-6 h-6" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-black tracking-tight">{paper.name}</h3>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{paper.category}</div>
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

        {/* STEP 4 — 📚 SUBJECTS PAGE */}
        {currentScreen === 'subjects' && (
          <div className="space-y-8 animate-fade-rise">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <button onClick={() => setCurrentScreen('dashboard')} className="hover:text-cyan-400 transition-colors">
                  Home
                </button>
                <span>&gt;</span>
                <span className="text-cyan-400 font-mono">{selectedPaperCode} Paper</span>
                <span>&gt;</span>
                <span className="text-white">Subjects</span>
              </nav>

              <button
                onClick={() => setCurrentScreen('paper-select')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span>Change Paper</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold mb-1">
                  <span>{selectedPaperObj.category}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {selectedPaperObj.name} ({selectedPaperCode}) Core Subjects
                </h1>
                <p className="text-xs text-slate-300">
                  Select a subject below to view topic notes, GATE weightage breakdown, and topic checklists.
                </p>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0">
                <div className="text-2xl font-black text-cyan-400 font-mono">{currentSubjectsList.length}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Subjects</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentSubjectsList.map((subject) => {
                const completedCount = subject.checklist.filter((item) => completedTopics[`${subject.id}_${item}`]).length;
                const subPercent = Math.round((completedCount / subject.checklist.length) * 100);

                return (
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
                        themeMode === 'dark' ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/60' : 'bg-white/90 border-slate-200'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black font-mono">
                            {subject.weightage}
                          </span>

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
                                strokeDashoffset={100 - subPercent}
                                strokeLinecap="round"
                                className="text-cyan-400 transition-all duration-1000"
                                fill="transparent"
                              />
                            </svg>
                            <span className="absolute text-[10px] font-black text-cyan-300 font-mono">{subPercent}%</span>
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
                        <span className="text-xs text-slate-400 font-semibold">{completedCount} / {subject.checklist.length} Done</span>
                        <button className="px-3.5 py-2 rounded-xl bg-[#1CA3DC] group-hover:bg-cyan-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all">
                          <span>Start Studying</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </Tilt3DCard>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5 — 📖 SUBJECT DETAILS & PERSONAL NOTES PAGE */}
        {currentScreen === 'subject-detail' && selectedSubject && (
          <div className="space-y-8 animate-fade-rise">
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <button onClick={() => setCurrentScreen('dashboard')} className="hover:text-cyan-400 transition-colors">
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
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span>Back to Subjects</span>
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-extrabold">
                  {selectedSubject.weightage} GATE Weightage
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{selectedSubject.name}</h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">{selectedSubject.desc}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-400" />
                  <span>Topic Progress &amp; Personal Notes</span>
                </h3>

                <div className="space-y-4">
                  {selectedSubject.checklist.map((topic, idx) => {
                    const topicKey = `${selectedSubject.id}_${topic}`;
                    const isDone = !!completedTopics[topicKey];
                    const isNoteActive = activeTopicNoteId === topicKey;
                    const noteText = topicNotes[topicKey] || '';

                    return (
                      <div key={idx} className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                        <div className="flex items-center justify-between">
                          <div
                            onClick={() => toggleTopicCompletion(selectedSubject.id, topic)}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            {isDone ? (
                              <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 shrink-0" />
                            )}
                            <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>{topic}</span>
                          </div>

                          <button
                            onClick={() => setActiveTopicNoteId(isNoteActive ? null : topicKey)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                              isNoteActive ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                            }`}
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{noteText ? 'Edit Notes' : 'Add Note'}</span>
                          </button>
                        </div>

                        {isNoteActive && (
                          <div className="pt-3 border-t border-slate-800 space-y-3">
                            <textarea
                              rows={3}
                              placeholder="Write key formulas, important concepts, or solved PYQ notes..."
                              value={noteText}
                              onChange={(e) => setTopicNotes({ ...topicNotes, [topicKey]: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                            />
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-slate-500 font-medium">Cloud Auto-Saved</span>
                              <button
                                onClick={() => handleSaveTopicNote(topicKey, noteText)}
                                disabled={savingNote}
                                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
                              >
                                {savingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                                <span>Save Note</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Syllabus &amp; Lectures</span>
                </h3>

                <div className="space-y-4">
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
                      <p className="text-xs text-slate-400">Complete topic breakdown from IIT Madras.</p>
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
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">NPTEL GATE Videos</h4>
                      <p className="text-xs text-slate-400">Free video lectures &amp; PYQ solutions.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROMPT 3 — 📈 ANALYTICS & INSIGHTS PAGE */}
        {currentScreen === 'analytics' && (
          <div className="space-y-8 animate-fade-rise">
            {/* Navigation Header */}
            <div className="flex items-center justify-between">
              <nav className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <button onClick={() => setCurrentScreen('dashboard')} className="hover:text-cyan-400">
                  Home
                </button>
                <span>&gt;</span>
                <span className="text-white">Analytics &amp; Smart Insights</span>
              </nav>

              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300"
              >
                Back to Dashboard
              </button>
            </div>

            {/* Hero Stat & Rank Predictor Header */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-bold">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GATE Rank Predictor &amp; Analytics Engine</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">Smart Preparation Insights</h1>
                </div>

                <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-slate-400">Predicted Score</div>
                    <div className="text-2xl font-black text-cyan-400 font-mono">{predictedGateScore} / 1000</div>
                  </div>
                  <div className="pl-4 border-l border-slate-800">
                    <div className="text-[10px] font-bold uppercase text-slate-400">Est. GATE Marks</div>
                    <div className="text-2xl font-black text-purple-300 font-mono">{predictedGateMarks} / 100</div>
                  </div>
                </div>
              </div>

              {/* Target College Tier Benchmark */}
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Target College Admission Tier</span>
                  <span className="text-cyan-300">Goal: {targetGateScore} Score</span>
                </div>

                <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                    style={{ width: `${Math.min(100, Math.round((predictedGateScore / targetGateScore) * 100))}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Current Prediction: <strong className="text-cyan-300">{predictedGateScore >= 650 ? 'Top IITs (Bombay, Delhi, Madras)' : predictedGateScore >= 500 ? 'Old NITs & Mid IITs' : 'Newer NITs & State Tech Univ'}</strong></span>
                  <span>{Math.round((predictedGateScore / targetGateScore) * 100)}% of Target Goal</span>
                </div>
              </div>
            </div>

            {/* 🎯 WEAK SUBJECT DETECTION & REVISION ORDER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weak Subjects Card */}
              <div className="bg-slate-900/90 p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Weak Subject Ranking (High Yield)</span>
                  </h3>
                  <span className="text-xs text-slate-400">Low Accuracy × Weightage</span>
                </div>

                <div className="space-y-3">
                  {weakSubjectsList.map((sub, idx) => (
                    <div key={sub.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-900 font-mono font-bold text-xs flex items-center justify-center text-slate-400">
                          #{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">{sub.name}</div>
                          <div className="text-[10px] text-slate-400">{sub.weightage} GATE Weightage</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          sub.status === 'Weak' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : sub.status === 'Average' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {sub.status} ({sub.subAcc}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Revision Roadmap */}
              <div className="bg-slate-900/90 p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span>Smart Revision Strategy</span>
                  </h3>

                  <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
                    <div className="text-xs font-bold text-purple-300">Priority 1 Focus:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Spend 60% of daily study hours on <strong>{weakSubjectsList[0]?.name}</strong> ({weakSubjectsList[0]?.weightage} weightage). Resolving 50 PYQs in this area will yield up to +12 marks.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                    <div className="text-xs font-bold text-cyan-300">Priority 2 Focus:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Maintain mock test practice for <strong>{weakSubjectsList[1]?.name || 'Engineering Mathematics'}</strong>.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedSubject(weakSubjectsList[0]);
                    setCurrentScreen('subject-detail');
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Revise {weakSubjectsList[0]?.name} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 30-DAY STUDY HEATMAP & TIME SPLIT */}
            <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <span>30-Day Activity Heatmap</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">Today: {studyMinutesToday} mins</span>
              </div>

              {/* GitHub-style Heatmap Grid */}
              <div className="grid grid-cols-10 sm:grid-cols-15 gap-2 pt-2">
                {Array.from({ length: 30 }).map((_, idx) => {
                  const intensity = idx % 5;
                  let bg = 'bg-slate-950 border-slate-800';
                  if (intensity === 1) bg = 'bg-cyan-950 border-cyan-800';
                  if (intensity === 2) bg = 'bg-cyan-800 border-cyan-600';
                  if (intensity === 3) bg = 'bg-cyan-600 border-cyan-400';
                  if (intensity === 4) bg = 'bg-[#1CA3DC] border-white text-slate-950';

                  return (
                    <div
                      key={idx}
                      className={`h-8 sm:h-9 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold transition-transform hover:scale-110 ${bg}`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6 — 📝 MOCK TEST SIMULATOR */}
        {currentScreen === 'mock-test' && quizQuestions[currentQuestionIndex] && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-rise">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GATE Test Simulator</div>
                <h2 className="text-lg font-black text-white">{selectedPaperCode} Paper Practice Exam</h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-amber-300 font-mono text-sm font-black flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>
                    {Math.floor(quizTimer / 60)}:{(quizTimer % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <button onClick={handleFinishQuiz} className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg">
                  Submit Exam
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <span className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Marks: <strong className="text-white">{quizQuestions[currentQuestionIndex].marks}</strong> | Neg:{' '}
                      <strong className="text-red-400">-{quizQuestions[currentQuestionIndex].negative_marks}</strong>
                    </span>
                  </div>

                  <p className="text-base font-bold text-white leading-relaxed">
                    {quizQuestions[currentQuestionIndex].question}
                  </p>

                  <div className="space-y-3">
                    {quizQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = userAnswers[currentQuestionIndex] === oIdx;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(oIdx)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-xs font-semibold">{opt}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={toggleMarkForReview}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                        markedForReview[currentQuestionIndex] ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{markedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {currentQuestionIndex > 0 && (
                        <button onClick={() => setCurrentQuestionIndex((prev) => prev - 1)} className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold">
                          Previous
                        </button>
                      )}
                      {currentQuestionIndex < quizQuestions.length - 1 && (
                        <button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)} className="px-4 py-2 rounded-xl bg-[#1CA3DC] text-slate-950 font-bold text-xs">
                          Next Question
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Palette</h4>
                  <div className="grid grid-cols-4 gap-2.5">
                    {quizQuestions.map((_, idx) => {
                      const isAns = userAnswers[idx] !== undefined;
                      const isReview = markedForReview[idx];
                      const isCurrent = idx === currentQuestionIndex;
                      let btnColor = 'bg-slate-950 border-slate-800 text-slate-400';
                      if (isAns) btnColor = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold';
                      if (isReview) btnColor = 'bg-purple-500/20 border-purple-500/40 text-purple-300 font-bold';
                      if (isCurrent) btnColor += ' ring-2 ring-cyan-400';
                      return (
                        <button key={idx} onClick={() => setCurrentQuestionIndex(idx)} className={`p-3 rounded-xl border text-xs font-mono transition-all ${btnColor}`}>
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7 — 📈 TEST RESULTS SCREEN */}
        {currentScreen === 'test-result' && testResult && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-rise">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-purple-600 via-[#1CA3DC] to-blue-600 flex items-center justify-center mx-auto text-white shadow-xl style-3d">
                <Trophy className="w-8 h-8 text-amber-300" />
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl font-black text-white">GATE Mock Test Performance Summary</h1>
                <p className="text-xs text-slate-300">Attempt saved to Secure Cloud Storage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Final Score</div>
                  <div className="text-3xl font-black text-cyan-400 font-mono mt-1">
                    {testResult.score} <span className="text-xs text-slate-400 font-normal">/ {testResult.maxScore}</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
                  <div className="text-3xl font-black text-emerald-400 font-mono mt-1">{testResult.accuracy}%</div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Correct / Wrong</div>
                  <div className="text-xl font-black text-white font-mono mt-2">
                    <span className="text-emerald-400">{testResult.correctCount}</span> / <span className="text-red-400">{testResult.wrongCount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button onClick={startMockQuiz} className="px-4 py-2.5 rounded-xl bg-[#1CA3DC] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg">
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
                <button onClick={() => setCurrentScreen('dashboard')} className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-bold text-xs">
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

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
