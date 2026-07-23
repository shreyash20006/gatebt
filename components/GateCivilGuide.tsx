'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  FileText,
  Sparkles,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Target,
  Award,
  Layers,
  Search,
  ChevronRight,
  ShieldAlert,
  Compass,
  CheckSquare,
  Square,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
  Bookmark,
  Share2,
} from 'lucide-react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function GateCivilGuide() {
  const [activeSection, setActiveSection] = useState<string>('eligibility');
  const [countdown, setCountdown] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [resourceSearch, setResourceSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [targetScore, setTargetScore] = useState<number>(650);
  const [checkedSubjects, setCheckedSubjects] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Exam Date: Feb 6, 2027
  useEffect(() => {
    const examDate = new Date('2027-02-06T09:30:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = examDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for Section Navigation
  useEffect(() => {
    const sections = ['eligibility', 'cutoffs', 'resources', 'mtech-structural', 'study-plan'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const toggleSubjectCheck = (name: string) => {
    setCheckedSubjects((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Resource items data
  const resources = [
    {
      category: 'official',
      categoryName: 'Official',
      title: 'GATE 2027 Official Website (IIT Madras)',
      url: 'https://gate2027.iitm.ac.in/',
      desc: 'Official portal for GATE 2027 candidate registration, notifications, key dates, and information brochure.',
      badge: 'IIT Madras',
      color: 'border-blue-200 bg-blue-50/50 text-blue-800',
    },
    {
      category: 'official',
      categoryName: 'Official',
      title: 'Official GATE CE Syllabus PDF',
      url: 'https://gate2026.iitg.ac.in/doc/GATE2026_Syllabus/CE_2026_Syllabus.pdf',
      desc: 'Complete detailed section-wise topic breakdown for Civil Engineering (CE) paper.',
      badge: 'Official PDF',
      color: 'border-red-200 bg-red-50/50 text-red-800',
    },
    {
      category: 'official',
      categoryName: 'Official',
      title: 'Official GATE Cutoff Marks Archive',
      url: 'https://gate2026.iitg.ac.in/cut-off.html',
      desc: 'Historical qualifying cutoff scores across all categories published by organizing institutes.',
      badge: 'Official Data',
      color: 'border-slate-200 bg-slate-100 text-slate-800',
    },
    {
      category: 'video',
      categoryName: 'Free Video + PYQ Platforms',
      title: 'NPTEL GATE Portal (IIT Madras)',
      url: 'https://gate.nptel.ac.in/',
      desc: 'Free video lectures, solved PYQs, and interactive mock tests curated by IIT faculty.',
      badge: 'Free Video + Mocks',
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-800',
    },
    {
      category: 'video',
      categoryName: 'Free Video + PYQ Platforms',
      title: 'NPTEL Civil Engineering Video Library',
      url: 'https://gate.nptel.ac.in/video.php?branchID=5&cid=1',
      desc: 'Direct subject-wise video lectures for Structural, Geotechnical, Environmental, FM, and Transport.',
      badge: 'Lectures',
      color: 'border-cyan-200 bg-cyan-50/50 text-cyan-800',
    },
    {
      category: 'notes',
      categoryName: 'Notes & PDFs',
      title: 'PW GATE Civil Notes',
      url: 'https://www.pw.live/gate/exams/gate-civil-engineering-notes',
      desc: 'Comprehensive subject notes, formula sheets, and practice problem sets by Physics Wallah.',
      badge: 'PW Notes',
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-800',
    },
    {
      category: 'notes',
      categoryName: 'Notes & PDFs',
      title: 'Made Easy Handwritten Notes',
      url: 'https://civilenggforall.com/made-easy-civil-engineering-gate-notes-pdf-free-download/',
      desc: 'Topper-recommended handwritten classroom notes covering all core Civil Engineering subjects.',
      badge: 'Made Easy Notes',
      color: 'border-amber-200 bg-amber-50/50 text-amber-900',
    },
    {
      category: 'notes',
      categoryName: 'Notes & PDFs',
      title: 'ACE Academy Notes PDF',
      url: 'https://deewanbittal.wordpress.com/ace-notes-pdf-subjectwise/',
      desc: 'Subject-wise high quality PDF notes covering Solid Mechanics, RCC, Steel, and Geotech.',
      badge: 'ACE Academy',
      color: 'border-violet-200 bg-violet-50/50 text-violet-800',
    },
    {
      category: 'notes',
      categoryName: 'Notes & PDFs',
      title: 'ESE & GATE Civil Engineering PDF Notes',
      url: 'https://esenotes.com/civil-engineering-pdf-notes/',
      desc: 'Free downloadable subject PDFs tailored for combined GATE & Engineering Services Exam (ESE).',
      badge: 'ESE + GATE',
      color: 'border-teal-200 bg-teal-50/50 text-teal-800',
    },
    {
      category: 'strategy',
      categoryName: 'Strategy & Analysis',
      title: 'Subject-wise Weightage Analysis (Made Easy)',
      url: 'https://blog.madeeasy.in/gate-ce-subject-wise-weightage',
      desc: 'Detailed breakdown of mark distribution and high-yield topics over the past 10 years.',
      badge: 'Weightage Guide',
      color: 'border-orange-200 bg-orange-50/50 text-orange-900',
    },
    {
      category: 'strategy',
      categoryName: 'Strategy & Analysis',
      title: 'GATE 2027 CE Complete Prep Guide (APSEd)',
      url: 'https://www.apsed.in/post/gate-2027-civil-engineering-complete-guide',
      desc: 'In-depth roadmap, recommended standard textbooks, and step-by-step preparation strategy.',
      badge: 'Strategy Guide',
      color: 'border-blue-200 bg-blue-50/50 text-blue-900',
    },
    {
      category: 'strategy',
      categoryName: 'Strategy & Analysis',
      title: 'IITs & NITs Structural Cutoffs (APSEd)',
      url: 'https://www.apsed.in/post/iits-nits-cut-off-structural',
      desc: 'Historical closing GATE scores for M.Tech Structural Engineering across premier institutes.',
      badge: 'Cutoff Analysis',
      color: 'border-purple-200 bg-purple-50/50 text-purple-900',
    },
  ];

  const filteredResources = resources.filter((res) => {
    const matchesCat = activeCategory === 'all' || res.category === activeCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      res.desc.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      res.badge.toLowerCase().includes(resourceSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Study plan data
  const studyPlanItems = [
    {
      name: 'Structural Engineering',
      topics: 'Engineering Mechanics, Solid Mechanics (SOM), Structural Analysis, RCC, Steel Structures',
      weightage: '20–25% of core',
      resources: 'Syllabus PDF, NPTEL videos, Made Easy SOM notes',
      schedule: 'Days 1–20',
      priority: 'High',
      priorityColor: 'bg-red-500 text-white',
      badgeDot: '🔴',
    },
    {
      name: 'Engineering Mathematics',
      topics: 'Linear Algebra, Calculus, Differential Equations, Complex Variables, Probability & Statistics, Numerical Methods',
      weightage: '~13 marks (fixed)',
      resources: 'Syllabus PDF, PW notes, NPTEL portal',
      schedule: 'Days 1–15 (Parallel daily 1 hr)',
      priority: 'High',
      priorityColor: 'bg-red-500 text-white',
      badgeDot: '🔴',
    },
    {
      name: 'Geotechnical Engineering',
      topics: 'Soil Mechanics, Permeability, Consolidation, Shear Strength, Foundation Engineering, Earth Pressure',
      weightage: '15–18%',
      resources: 'NPTEL videos, ACE notes',
      schedule: 'Days 21–35',
      priority: 'High',
      priorityColor: 'bg-red-500 text-white',
      badgeDot: '🔴',
    },
    {
      name: 'Water Resources Engineering',
      topics: 'Fluid Mechanics, Hydraulics, Open Channel Flow, Hydrology, Irrigation Engineering',
      weightage: '12–16%',
      resources: 'NPTEL videos, ESE notes',
      schedule: 'Days 36–48',
      priority: 'Medium-High',
      priorityColor: 'bg-orange-500 text-white',
      badgeDot: '🟠',
    },
    {
      name: 'General Aptitude',
      topics: 'Verbal Ability, Numerical Ability, Spatial Aptitude, Analytical & Logical Reasoning',
      weightage: '15 marks (fixed)',
      resources: 'NPTEL mocks, PW notes',
      schedule: 'Daily 30 min from Day 1',
      priority: 'Medium-High',
      priorityColor: 'bg-orange-500 text-white',
      badgeDot: '🟠',
    },
    {
      name: 'Environmental Engineering',
      topics: 'Water Supply, Sewage Treatment, Air & Noise Pollution, Municipal Solid Waste',
      weightage: '8–10%',
      resources: 'NPTEL videos, Made Easy notes',
      schedule: 'Days 49–56 (Easy scoring, don\'t skip)',
      priority: 'Medium',
      priorityColor: 'bg-amber-500 text-white',
      badgeDot: '🟡',
    },
    {
      name: 'Transportation Engineering',
      topics: 'Highway Geometric Design, Pavement Materials & Design, Traffic Engineering, Railway & Airport',
      weightage: '8–10%',
      resources: 'NPTEL videos, ESE notes',
      schedule: 'Days 57–64',
      priority: 'Medium',
      priorityColor: 'bg-amber-500 text-white',
      badgeDot: '🟡',
    },
    {
      name: 'Geomatics Engineering',
      topics: 'Principles of Surveying, Traversing, Levelling, Photogrammetry, Remote Sensing & GIS',
      weightage: '5–7%',
      resources: 'NPTEL videos, ACE notes',
      schedule: 'Days 65–70 (Short subject)',
      priority: 'Low',
      priorityColor: 'bg-emerald-600 text-white',
      badgeDot: '🟢',
    },
    {
      name: 'PYQs + Mock Tests',
      topics: 'Topic-wise PYQs (last 20 yrs), Subject Tests, Full-Length GATE Mock Exams',
      weightage: 'Comprehensive Review',
      resources: 'NPTEL PYQ & mock tests',
      schedule: 'After each subject + Full mocks from Day 71',
      priority: 'High',
      priorityColor: 'bg-red-500 text-white',
      badgeDot: '🔴',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-[#1CA3DC] selection:text-white pb-16">

      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-950 via-[#0B2A63] to-slate-900 border-b border-blue-800/40 text-xs py-2 px-4 text-center font-medium tracking-wide text-blue-200 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md font-bold text-[11px] border border-amber-500/30">
          🏗️ GATE 2027 EDITION
        </span>
        <span>Organizing Institute: <strong className="text-white">IIT Madras</strong> · Paper Code: <strong className="text-cyan-300">CE</strong></span>
      </div>

      {/* Hero Header Section */}
      <header className="relative overflow-hidden bg-slate-950 border-b border-slate-800 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative Grid Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative max-w-6xl mx-auto space-y-8">
          {/* Main Title Block */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Aspirants Complete Master Guide & Strategic Roadmap</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              GATE Civil Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CA3DC] via-cyan-300 to-amber-400">(CE) 2027</span>
              <span className="block text-2xl sm:text-4xl text-slate-300 font-bold mt-2">Complete Guide & Roadmap 🏗️</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
              Everything you need for GATE CE 2027 — official eligibility criteria, 4-year cutoff trends, top IIT/NIT admission scores, curated resource links, M.Tech Structural Engineering guide, and a structured 70-day study plan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
              </button>
              <a
                href="https://gate2027.iitm.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#1CA3DC] hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
              >
                <span>IIT Madras GATE 2027 Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Interactive Live Countdown Widget */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-blue-950/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Countdown to Exam Day</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">GATE 2027 CE Exam</h3>
                <p className="text-xs sm:text-sm text-slate-300">Target Date: <strong className="text-cyan-300">February 6, 2027</strong> (IIT Madras)</p>
              </div>

              {/* Countdown Numbers */}
              <div className="grid grid-cols-4 gap-3 text-center w-full md:w-auto">
                <div className="bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[70px] sm:min-w-[85px]">
                  <div className="text-2xl sm:text-4xl font-black text-cyan-400 tracking-tight font-mono">
                    {countdown.days}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Days</div>
                </div>
                <div className="bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[70px] sm:min-w-[85px]">
                  <div className="text-2xl sm:text-4xl font-black text-cyan-400 tracking-tight font-mono">
                    {countdown.hours}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Hours</div>
                </div>
                <div className="bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[70px] sm:min-w-[85px]">
                  <div className="text-2xl sm:text-4xl font-black text-cyan-400 tracking-tight font-mono">
                    {countdown.minutes}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Mins</div>
                </div>
                <div className="bg-slate-950/80 p-3 sm:p-4 rounded-2xl border border-slate-700/70 min-w-[70px] sm:min-w-[85px]">
                  <div className="text-2xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">
                    {countdown.seconds}
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Secs</div>
                </div>
              </div>
            </div>

            {/* Key Dates Bar */}
            <div className="mt-6 pt-6 border-t border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <Calendar className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-slate-400 font-medium">Registration Opens</div>
                  <div className="text-white font-bold text-sm">14 August 2026</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-slate-400 font-medium">Exam Dates</div>
                  <div className="text-white font-bold text-sm">6, 7, 13, 14, 20 & 21 Feb 2027</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-slate-400 font-medium">Organizing Institute</div>
                  <div className="text-white font-bold text-sm">IIT Madras</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation Sub-Bar */}
      <nav className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-xl transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => scrollToSection('eligibility')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === 'eligibility'
                    ? 'bg-[#1CA3DC] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🎓 Eligibility</span>
              </button>

              <button
                onClick={() => scrollToSection('cutoffs')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === 'cutoffs'
                    ? 'bg-[#1CA3DC] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>📊 Cutoffs</span>
              </button>

              <button
                onClick={() => scrollToSection('resources')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === 'resources'
                    ? 'bg-[#1CA3DC] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>📚 Resources</span>
              </button>

              <button
                onClick={() => scrollToSection('mtech-structural')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === 'mtech-structural'
                    ? 'bg-[#1CA3DC] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🏗️ M.Tech Structural Guide</span>
              </button>

              <button
                onClick={() => scrollToSection('study-plan')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeSection === 'study-plan'
                    ? 'bg-[#1CA3DC] text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>📅 Study Plan</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center text-xs text-slate-400 font-medium">
              <span>Paper Code: <strong className="text-amber-400">CE</strong></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">

        {/* SECTION 1 — ELIGIBILITY */}
        <section id="eligibility" className="scroll-mt-24 space-y-8">
          <div className="border-l-4 border-[#1CA3DC] pl-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1CA3DC] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Section 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              GATE 2027 Eligibility Criteria
            </h2>
            <p className="text-slate-400 text-sm mt-1">Official candidate qualification rules set by IIT Madras for GATE 2027 examination.</p>
          </div>

          {/* Golden Highlight Box */}
          <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-xl backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-300 text-2xl font-bold">
                ✨
              </div>
              <div className="space-y-1">
                <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Key Takeaway</div>
                <h3 className="text-xl sm:text-2xl font-black text-amber-200">
                  No age limit, no minimum percentage/CGPA, unlimited attempts.
                </h3>
                <p className="text-amber-100/80 text-xs sm:text-sm pt-1">
                  Candidates who qualify GATE can apply for M.Tech/Ph.D admissions across IITs, NITs, and IIITs, or recruitments in top PSUs like ONGC, IOCL, NTPC, BHEL, and HPCL regardless of graduation percentage.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Criteria Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Who can apply */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Who Can Apply</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Candidates currently studying in the <strong className="text-cyan-300">3rd year or higher</strong> of any undergraduate degree program (10+2+2 or 10+3+1 pattern onwards), OR those who have already completed any government-approved Bachelor’s degree in Engineering / Technology / Architecture / Science / Commerce / Arts / Humanities.
              </p>
            </div>

            {/* Age Limit & Attempts */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Age Limit & Attempts</h3>
              <ul className="text-slate-300 text-xs sm:text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span><strong>Age Limit:</strong> None (No upper age ceiling).</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span><strong>Attempts:</strong> Unlimited attempts allowed.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span><strong>Min Marks:</strong> No minimum CGPA/percentage required to appear.</span>
                </li>
              </ul>
            </div>

            {/* Nationality & Validity */}
            <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700/80 hover:border-cyan-500/50 transition-all shadow-lg space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Nationality & Validity</h3>
              <ul className="text-slate-300 text-xs sm:text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></span>
                  <span><strong>Nationality:</strong> Open to Indian nationals & international candidates (Bangladesh, Nepal, Sri Lanka, Ethiopia, UAE, etc.).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5"></span>
                  <span><strong>Score Validity:</strong> GATE score is valid for <strong className="text-cyan-300">3 years</strong> from the date of result announcement.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Accepted Qualifying Degrees Grid */}
          <div className="bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-700/70 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1CA3DC]" />
              <span>Accepted Qualifying Degrees for GATE 2027</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {[
                'B.E. / B.Tech',
                'B.Arch',
                'B.Pharm',
                'B.Sc (Research) / B.S',
                'B.Sc (Agri / Horti / Forestry)',
                'M.Sc / MA / MCA',
                'MBBS / BDS / B.V.Sc',
                'Integrated M.E. / M.Tech',
                'Integrated M.Sc / BS-MS',
                'Pharm.D',
                'AMIE / AMICE / AMIETE (Section A passed)',
              ].map((degree, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition-all"
                >
                  {degree}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — CUTOFFS */}
        <section id="cutoffs" className="scroll-mt-24 space-y-8">
          <div className="border-l-4 border-[#1CA3DC] pl-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1CA3DC] flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              <span>Section 2</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              GATE CE Cutoffs & Admission Benchmarks
            </h2>
            <p className="text-slate-400 text-sm mt-1">4-year historical qualifying cutoffs and expected admission GATE scores (out of 1000) for IITs & NITs.</p>
          </div>

          {/* Table A: Qualifying Cutoff */}
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-5 sm:p-6 border-b border-slate-700/80 bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Table A: GATE CE Qualifying Cutoffs (Marks out of 100)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Minimum marks required to qualify GATE Civil Engineering paper.</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/30 text-xs font-bold w-max">
                Past 4 Years Trend
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 text-xs font-bold uppercase border-b border-slate-700">
                    <th className="py-4 px-6">Year</th>
                    <th className="py-4 px-6">General (GN)</th>
                    <th className="py-4 px-6">OBC-NCL / EWS</th>
                    <th className="py-4 px-6">SC / ST / PwD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>2026</span>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">28.7</td>
                    <td className="py-4 px-6 text-amber-300">25.8</td>
                    <td className="py-4 px-6 text-emerald-400">19.1</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <span>2025</span>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">28.3</td>
                    <td className="py-4 px-6 text-amber-300">25.4</td>
                    <td className="py-4 px-6 text-emerald-400">18.8</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <span>2024</span>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">28.2</td>
                    <td className="py-4 px-6 text-amber-300">25.3</td>
                    <td className="py-4 px-6 text-emerald-400">18.7</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                      <span>2023</span>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">26.6</td>
                    <td className="py-4 px-6 text-amber-300">23.9</td>
                    <td className="py-4 px-6 text-emerald-400">17.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Warning Callout Box */}
          <div className="bg-red-950/40 p-6 rounded-3xl border border-red-500/50 flex items-start gap-4 shadow-lg backdrop-blur-md">
            <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-red-400 font-bold text-xs uppercase tracking-wider">Critical Warning</div>
              <h3 className="text-lg sm:text-xl font-bold text-red-200">
                Qualifying ≠ Admission
              </h3>
              <p className="text-red-100/90 text-xs sm:text-sm leading-relaxed">
                Just passing the qualifying cutoff (e.g. ~28 marks) only makes you GATE qualified. Top IITs & NITs require a <strong>GATE Score (out of 1000)</strong> of <strong>650–800+ for IITs</strong> and <strong>500–750 for NITs</strong> for General CE candidates.
              </p>
            </div>
          </div>

          {/* Table B: Admission Benchmarks */}
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-5 sm:p-6 border-b border-slate-700/80 bg-slate-800/60">
              <h3 className="text-lg font-bold text-white">Table B: Admission Benchmarks (CE / Structural Specialization — General Category)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Realistic GATE Score ranges required for M.Tech admissions across premier institutes.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 text-xs font-bold uppercase border-b border-slate-700">
                    <th className="py-4 px-6">Institute Tier</th>
                    <th className="py-4 px-6">Expected GATE Score Range (out of 1000)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>Top IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur)</span>
                    </td>
                    <td className="py-4 px-6 text-amber-300 font-bold">600–800+</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>Mid/New IITs (BHU, Roorkee, Guwahati, Hyderabad, newer IITs)</span>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">550–700</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-400" />
                      <span>Top NITs (Trichy, Surathkal, Warangal, Rourkela)</span>
                    </td>
                    <td className="py-4 px-6 text-emerald-300 font-bold">650–750</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      <span>Mid-tier NITs (Jaipur, Bhopal, Allahabad, Calicut, etc.)</span>
                    </td>
                    <td className="py-4 px-6 text-blue-300 font-bold">500–650</td>
                  </tr>
                  <tr className="hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6 text-white font-bold flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>Newer NITs (Agartala, Meghalaya, Patna, Silchar, etc.)</span>
                    </td>
                    <td className="py-4 px-6 text-purple-300 font-bold">350–500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Cutoff Facts & Statistics Notes */}
          <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/70 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Key Cutoff Notes & Exam Scale Facts</span>
            </h4>
            <ul className="text-slate-300 text-xs sm:text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></span>
                <span><strong>IIT Bombay CE Min Qualifying Cutoff 2025:</strong> 600 (GN), 540 (OBC-NCL), 400 (SC/ST), with realistic final admission closing range around <strong>550–650</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></span>
                <span><strong>IIT (BHU) Varanasi Civil Closing Score 2025:</strong> ~579 (General category).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2"></span>
                <span><strong>GATE 2026 CE Scale & Competition:</strong> 97,486 registered / 76,385 appeared — making Civil Engineering the <strong>3rd largest GATE paper</strong> nationwide after CS and EC.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Target Score Explorer Widget */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-amber-400" />
                  <span>Interactive Target Score Predictor</span>
                </h3>
                <p className="text-xs text-slate-400">Slide to see institute eligibility based on your target GATE Score (out of 1000).</p>
              </div>
              <div className="text-2xl font-black text-cyan-400 font-mono bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800 w-max">
                {targetScore} Score
              </div>
            </div>

            <input
              type="range"
              min="350"
              max="800"
              step="10"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#1CA3DC]"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className={`p-4 rounded-2xl border transition-all ${targetScore >= 700 ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="text-xs font-bold uppercase">700+ Score Tier</div>
                <div className="text-sm font-extrabold text-white mt-1">IIT Bombay, Madras, Delhi</div>
                <div className="text-xs mt-1">Direct interview calls for core M.Tech Structural & top PSU shortlisting.</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${targetScore >= 600 && targetScore < 700 ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200' : targetScore >= 700 ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="text-xs font-bold uppercase">600–700 Score Tier</div>
                <div className="text-sm font-extrabold text-white mt-1">IIT Kanpur, Kharagpur, Roorkee, NIT Trichy</div>
                <div className="text-xs mt-1">Excellent admission chances for Structural Engineering & Geotech.</div>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${targetScore < 600 ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
                <div className="text-xs font-bold uppercase">350–600 Score Tier</div>
                <div className="text-sm font-extrabold text-white mt-1">NITs via CCMT & CFTIs</div>
                <div className="text-xs mt-1">Solid options in Old/New NITs and state government technical universities.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — RESOURCE LIBRARY */}
        <section id="resources" className="scroll-mt-24 space-y-8">
          <div className="border-l-4 border-[#1CA3DC] pl-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1CA3DC] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Section 3</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              Curated Resource Library
            </h2>
            <p className="text-slate-400 text-sm mt-1">Direct links to official portals, free NPTEL video courses, handwritten notes, and weightage analysis guides.</p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notes, syllabus, NPTEL..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
                className="w-full bg-slate-900 text-xs text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
              {[
                { id: 'all', label: 'All Resources' },
                { id: 'official', label: 'Official' },
                { id: 'video', label: 'Videos & PYQs' },
                { id: 'notes', label: 'Notes & PDFs' },
                { id: 'strategy', label: 'Strategy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-[#1CA3DC] text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Link Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-800/90 hover:bg-slate-800 p-6 rounded-3xl border border-slate-700/80 hover:border-cyan-500/60 transition-all shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${res.color}`}>
                      {res.badge}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:underline">
                  <span>Open Resource Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12 bg-slate-800/40 rounded-3xl border border-slate-700/60 space-y-2">
              <p className="text-slate-400 text-sm">No resources match your search prompt "{resourceSearch}".</p>
              <button
                onClick={() => {
                  setResourceSearch('');
                  setActiveCategory('all');
                }}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* SECTION 4 — M.TECH STRUCTURAL ENGINEERING GUIDE */}
        <section id="mtech-structural" className="scroll-mt-24 space-y-8">
          <div className="border-l-4 border-[#1CA3DC] pl-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1CA3DC] flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Section 4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              M.Tech Structural Engineering Guide 🏗️
            </h2>
            <p className="text-slate-400 text-sm mt-1">Specialization overview, PG curriculum, career prospects, and target admission cutoffs across IITs & NITs.</p>
          </div>

          {/* Specialization Intro Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                <span>Top Core Civil Specialization</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">What is M.Tech Structural Engineering?</h3>
              <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed">
                A 2-year Postgraduate (M.Tech) specialization of Civil Engineering focused on structural design, stability, safety, and structural reliability — encompassing tall skyscrapers, bridges, dams, flyovers, industrial facilities, and earthquake-resistant (seismic) design.
              </p>
            </div>

            {/* Curriculum Chips */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core M.Tech Curriculum Courses:</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Advanced Theory & Design of Concrete Structures',
                  'Structural Dynamics & Seismic Design',
                  'Finite Element Analysis (FEA)',
                  'Theory of Plates and Shells',
                  'Theory of Elasticity & Plasticity',
                  'Design of Metal / Steel Structures',
                  'Stability of Structures',
                  'Design of Tall Buildings, Industrial & Offshore Structures',
                ].map((course, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-medium text-slate-200"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Why Choose It */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Why Choose Structural Engineering?</span>
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Structural Engineering has the <strong>highest weightage</strong> among core Civil Engineering sections in GATE (<strong>~20–25%</strong> of the paper). Graduates secure lucrative design roles at <strong>L&T, Tata Projects, AECOM, WSP, Ramboll, PSUs</strong>, leading structural consultancy firms, or pursue PhD/research at premier international universities.
              </p>
            </div>
          </div>

          {/* Cutoff Tables: IITs & NITs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top IITs Cutoff Table */}
            <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-slate-700/80 bg-slate-800/60">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Top IITs Structural Cutoffs</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">GATE Score cutoff range for M.Tech Structural Engineering.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-400 font-bold border-b border-slate-700">
                        <th className="py-3 px-4">IIT Institute</th>
                        <th className="py-3 px-4">GATE Score Range (General)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium">
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Bombay</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">600+ (min 2025); realistically 650–750</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Madras</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">650–780</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Delhi</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">650–750</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Kanpur</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">600–700</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Kharagpur</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">600–700</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Roorkee</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">580–680</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT (BHU) Varanasi</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">~579 (2025 closing score)</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">IIT Guwahati / Hyderabad</td>
                        <td className="py-3 px-4 text-cyan-300 font-bold">550–650</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top NITs Cutoff Table */}
            <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-slate-700/80 bg-slate-800/60">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Top NITs Structural Cutoffs (CCMT)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">20 of 31 NITs offer M.Tech Structural Engineering via CCMT counseling.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900/90 text-slate-400 font-bold border-b border-slate-700">
                        <th className="py-3 px-4">NIT Institute Tier</th>
                        <th className="py-3 px-4">GATE Score Range (General)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-medium">
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">NIT Trichy</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">680–750</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">NIT Surathkal</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">650–720</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">NIT Rourkela</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">600–680</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">NIT Calicut</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">580–660</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">MNIT Jaipur / MANIT Bhopal / MNNIT Allahabad</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">550–630</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">NIT Kurukshetra / Jamshedpur / Durgapur / Surat / Nagpur</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">500–600</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-white font-bold">Newer NITs (Agartala, Meghalaya, Patna, Silchar, Srinagar, Uttarakhand, Raipur)</td>
                        <td className="py-3 px-4 text-emerald-400 font-bold">350–500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* "Where Should You Study?" Decision Box */}
          <div className="bg-slate-800/90 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>"Where Should You Study?" Decision Matrix</span>
              </h3>
              <p className="text-xs text-slate-400">Quick decision guide based on your expected GATE score target.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  700+ Score
                </span>
                <h4 className="text-sm font-bold text-white pt-1">IIT Bombay / Madras / Delhi</h4>
                <p className="text-slate-400 text-xs">Premier choice for research, top placement packages, and structural consultancy.</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                  600–700 Score
                </span>
                <h4 className="text-sm font-bold text-white pt-1">IIT Kanpur / Kharagpur / Roorkee / BHU or NIT Trichy / Surathkal</h4>
                <p className="text-slate-400 text-xs">Top tier structural engineering departments with state-of-the-art testing labs.</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                  500–600 Score
                </span>
                <h4 className="text-sm font-bold text-white pt-1">Old NITs (Rourkela, Calicut, Jaipur, Allahabad) via CCMT</h4>
                <p className="text-slate-400 text-xs">Strong academic record and excellent industry ties for core placements.</p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-2">
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  350–500 Score
                </span>
                <h4 className="text-sm font-bold text-white pt-1">Newer NITs, IIITs, CFTIs</h4>
                <p className="text-slate-400 text-xs">GATE score also unlocks PSU job applications (ONGC, IOCL, NTPC, BHEL).</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — STUDY PLAN TABLE */}
        <section id="study-plan" className="scroll-mt-24 space-y-8">
          <div className="border-l-4 border-[#1CA3DC] pl-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1CA3DC] flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Section 5</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
              70-Day GATE CE Study Plan & Weightage Strategy
            </h2>
            <p className="text-slate-400 text-sm mt-1">Structured schedule organized by subject weightage, day-wise priority, and recommended learning resources.</p>
          </div>

          {/* Interactive Table with Checkbox Progress */}
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-5 sm:p-6 border-b border-slate-700/80 bg-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Subject × Weightage × Resources × Day Priority</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Click checkboxes to track your preparation progress across subjects.</p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                <span>Completed:</span>
                <strong className="text-cyan-400 font-bold">
                  {Object.values(checkedSubjects).filter(Boolean).length} / {studyPlanItems.length}
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 text-xs font-bold uppercase border-b border-slate-700">
                    <th className="py-4 px-4 w-10">Done</th>
                    <th className="py-4 px-6 min-w-[200px]">Subject & Core Topics</th>
                    <th className="py-4 px-4 min-w-[120px]">Weightage</th>
                    <th className="py-4 px-6 min-w-[200px]">Recommended Resources</th>
                    <th className="py-4 px-6 min-w-[180px]">Day Schedule</th>
                    <th className="py-4 px-4">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 font-medium">
                  {studyPlanItems.map((item, idx) => {
                    const isChecked = !!checkedSubjects[item.name];
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isChecked ? 'bg-slate-900/80 opacity-60' : 'hover:bg-slate-700/30'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleSubjectCheck(item.name)}
                            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
                            aria-label={`Toggle ${item.name}`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-cyan-400" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-500" />
                            )}
                          </button>
                        </td>

                        <td className="py-4 px-6">
                          <div className={`font-bold text-white ${isChecked ? 'line-through text-slate-400' : ''}`}>
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {item.topics}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold whitespace-nowrap">
                            {item.weightage}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-slate-300 text-xs">
                          {item.resources}
                        </td>

                        <td className="py-4 px-6 text-slate-200 text-xs font-semibold whitespace-nowrap">
                          {item.schedule}
                        </td>

                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide inline-flex items-center gap-1 ${item.priorityColor}`}>
                            <span>{item.badgeDot}</span>
                            <span>{item.priority}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Closing Strategy Tip Callout */}
          <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-xl relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Pro Strategy Callout</div>
                <h3 className="text-lg sm:text-xl font-black text-cyan-100">
                  Structural-First Strategy
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  "Since you're targeting M.Tech Structural Engineering, master <strong>Solid Mechanics + Structural Analysis + RCC/Steel</strong> deeply — they help both your GATE score and written tests/interviews at top IITs."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Quick Navigation Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden flex justify-around">
        <button
          onClick={() => scrollToSection('eligibility')}
          className="text-[10px] font-bold text-slate-300 hover:text-cyan-400 flex flex-col items-center gap-0.5 px-2 py-1"
        >
          <span>🎓 Eligibility</span>
        </button>
        <button
          onClick={() => scrollToSection('cutoffs')}
          className="text-[10px] font-bold text-slate-300 hover:text-cyan-400 flex flex-col items-center gap-0.5 px-2 py-1"
        >
          <span>📊 Cutoffs</span>
        </button>
        <button
          onClick={() => scrollToSection('resources')}
          className="text-[10px] font-bold text-slate-300 hover:text-cyan-400 flex flex-col items-center gap-0.5 px-2 py-1"
        >
          <span>📚 Resources</span>
        </button>
        <button
          onClick={() => scrollToSection('mtech-structural')}
          className="text-[10px] font-bold text-slate-300 hover:text-cyan-400 flex flex-col items-center gap-0.5 px-2 py-1"
        >
          <span>🏗️ Structural</span>
        </button>
        <button
          onClick={() => scrollToSection('study-plan')}
          className="text-[10px] font-bold text-slate-300 hover:text-cyan-400 flex flex-col items-center gap-0.5 px-2 py-1"
        >
          <span>📅 Plan</span>
        </button>
      </div>

    </div>
  );
}
