'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/components/brand/Logo';
import { UserProfile } from '@/components/onboarding/OnboardingModal';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Target,
  Save,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Calendar,
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    course: 'B.Tech Civil Engineering',
    scoreType: 'cgpa',
    scoreValue: '',
    gradYear: '2026',
    targetExam: 'GATE 2027',
    targetPaper: 'Civil Engineering (CE)',
    interests: ['Notes', 'Mind Maps', 'PYQs', 'M.Tech Structural'],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('gatebt_profile');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setProfile((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gatebt_profile', JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetOnboarding = () => {
    if (confirm('Re-run the onboarding walkthrough?')) {
      localStorage.removeItem('gatebt_onboarded');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Logo size="sm" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Student Profile &amp; Goal Setup</h1>
          <p className="text-xs text-slate-400">Manage your target GATE papers, degree details, and preparation preferences.</p>
        </div>

        <button
          onClick={handleResetOnboarding}
          className="text-xs font-semibold text-slate-400 hover:text-white px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all w-max"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Re-run Onboarding</span>
        </button>
      </div>

      {/* Profile Card Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1CA3DC] to-blue-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shrink-0">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'G'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{profile.name || 'GATE Aspirant'}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                  {profile.targetPaper || 'CE 2027'}
                </span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.course || 'B.Tech Engineering'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">Student Status</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Profile Active</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">Selected Discipline</div>
            <div className="text-cyan-300 font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.targetPaper || 'CE 2027'}</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">Target Exam</div>
            <div className="text-white font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.targetExam || 'GATE 2027'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Message */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile &amp; exam goals updated successfully!</span>
        </div>
      )}

      {/* Editable Academic & Target Goals Form */}
      <form onSubmit={handleSave} className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Personal Info */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-[#1CA3DC]" /> Student Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#1CA3DC]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                placeholder="student@university.edu"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#1CA3DC]"
              />
            </div>
          </div>
        </div>

        {/* Academic Stream */}
        <div className="space-y-4 pb-6 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1CA3DC]" /> Degree &amp; Graduation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Current Degree / Branch</label>
              <select
                value={profile.course}
                onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option>B.Tech Civil Engineering</option>
                <option>B.E. Structural / Infrastructure</option>
                <option>B.Tech Biotechnology</option>
                <option>B.Pharmacy</option>
                <option>B.Sc / M.Sc Life Sciences</option>
                <option>Other Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Graduation Year</label>
              <select
                value={profile.gradYear}
                onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                {['2025', '2026', '2027', '2028', '2029'].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Target Goal */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#1CA3DC]" /> Target GATE Exam Goals
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Attempt Year</label>
              <select
                value={profile.targetExam}
                onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option>GATE 2027</option>
                <option>GATE 2026</option>
                <option>GATE 2028</option>
                <option>Other Exam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Primary GATE Paper</label>
              <select
                value={profile.targetPaper}
                onChange={(e) => setProfile({ ...profile, targetPaper: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option>Civil Engineering (CE)</option>
                <option>Biotechnology (BT)</option>
                <option>Life Sciences (XL)</option>
                <option>Biomedical Engineering (BM)</option>
                <option>Engineering Sciences (XE)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-[#1CA3DC] hover:bg-cyan-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Save className="w-4 h-4" /> Save Profile Preferences
        </button>
      </form>
    </div>
  );
}
