'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import SupabaseAuthCard from '@/components/auth/SupabaseAuthCard';
import { UserProfile } from '@/components/onboarding/OnboardingModal';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Target,
  Save,
  RefreshCw,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  KeyRound,
  BookOpen,
  Calendar,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const [copiedId, setCopiedId] = useState(false);

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

  // Sync Supabase user email into profile
  useEffect(() => {
    if (user?.email) {
      setProfile((prev) => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

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

  const handleCopyUserId = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleResetOnboarding = () => {
    if (confirm('Re-run the onboarding walkthrough?')) {
      localStorage.removeItem('gatebt_onboarded');
      window.location.reload();
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-[#1CA3DC] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-medium">Loading Student Session...</p>
      </div>
    );
  }

  // Get Auth Provider Badge
  const getProviderBadge = () => {
    if (!user) return 'Guest';
    const provider = user.app_metadata?.provider;
    if (provider === 'google') return 'Google Auth';
    if (provider === 'github') return 'GitHub Auth';
    if (user.email) return 'Email OTP Verified';
    return 'Secure Auth';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-cyan-400 border border-blue-500/30 text-xs font-bold mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Student Profile & Goal Center</h1>
          <p className="text-xs text-slate-400 mt-0.5">Manage your login identity, target GATE papers, and preparation goals.</p>
        </div>

        <button
          onClick={handleResetOnboarding}
          className="text-xs font-semibold text-slate-400 hover:text-white px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5 transition-all w-max"
        >
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Re-run Onboarding</span>
        </button>
      </div>

      {/* If Not Logged In: Prompt Auth Card */}
      {!user && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center justify-between gap-3">
            <span>💡 You are currently browsing in guest mode. Sign in below via <strong>Email OTP</strong> or <strong>Google/GitHub</strong> to sync your profile across devices.</span>
          </div>

          <SupabaseAuthCard />
        </div>
      )}

      {/* If Logged In: User Info Banner */}
      {user && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
            <div className="flex items-center gap-4">
              {/* User Avatar Circle */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1CA3DC] to-blue-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shrink-0">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{profile.name || user.email?.split('@')[0]}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">
                    {getProviderBadge()}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <button
              onClick={signOut}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Account Details Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-slate-400 font-medium">Student Account ID</div>
              <div className="flex items-center justify-between text-white font-mono text-[11px]">
                <span>{user.id.slice(0, 12)}...</span>
                <button onClick={handleCopyUserId} className="text-cyan-400 hover:text-white p-1">
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-slate-400 font-medium">Auth Provider</div>
              <div className="text-cyan-300 font-bold flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>{getProviderBadge()}</span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-slate-400 font-medium">Account Created</div>
              <div className="text-white font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile & exam goals updated successfully!</span>
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
