'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/components/onboarding/OnboardingModal';
import { User, Mail, GraduationCap, Target, Save, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    course: 'B.Tech Biotechnology',
    scoreType: 'cgpa',
    scoreValue: '',
    gradYear: '2026',
    targetExam: 'GATE 2026',
    targetPaper: 'Biotechnology (BT)',
    interests: ['Notes', 'Mind Maps', 'PYQs'],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('gatebt_profile');
      if (raw) {
        try {
          setProfile(JSON.parse(raw));
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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#0B2A63] tracking-tight">Your Student Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage your exam goals and personalization preferences</p>
        </div>

        <button
          onClick={handleResetOnboarding}
          className="text-xs font-semibold text-slate-500 hover:text-[#0B2A63] px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-run Onboarding
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Personal Details */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-[#0B2A63] uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-[#1CA3DC]" /> Personal Info
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1CA3DC]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1CA3DC]"
            />
          </div>
        </div>

        {/* Academic Benchmark */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <h3 className="text-sm font-bold text-[#0B2A63] uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#1CA3DC]" /> Degree &amp; Academic Benchmark
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Degree / Course</label>
              <select
                value={profile.course}
                onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option>B.Tech Biotechnology</option>
                <option>B.Pharmacy</option>
                <option>B.Sc Biotechnology / Life Sciences</option>
                <option>M.Sc Biotechnology / Biochemistry</option>
                <option>Other Stream</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
              <select
                value={profile.gradYear}
                onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
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
          <h3 className="text-sm font-bold text-[#0B2A63] uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#1CA3DC]" /> Target Exam Goal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Attempt Year</label>
              <select
                value={profile.targetExam}
                onChange={(e) => setProfile({ ...profile, targetExam: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option>GATE 2026</option>
                <option>GATE 2027</option>
                <option>GATE 2028</option>
                <option>Other Exam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary GATE Paper</label>
              <select
                value={profile.targetPaper}
                onChange={(e) => setProfile({ ...profile, targetPaper: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
              >
                <option>Biotechnology (BT)</option>
                <option>Life Sciences (XL)</option>
                <option>Biomedical Engineering (BM)</option>
                <option>Engineering Sciences (XE)</option>
                <option>Chemical Engineering (CH)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-[#0B2A63] hover:bg-[#06193E] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
}
