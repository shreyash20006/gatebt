'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, Check, Sparkles, User, Mail, GraduationCap, Target, BookOpen } from 'lucide-react';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

export interface UserProfile {
  name: string;
  email: string;
  course: string;
  scoreType: 'cgpa' | 'percentage' | 'none';
  scoreValue: string;
  gradYear: string;
  targetExam: string;
  targetPaper: string;
  interests: string[];
}

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onboarded = localStorage.getItem('gatebt_onboarded');
      if (!onboarded) {
        setIsOpen(true);
      }
    }
  }, []);

  if (!isOpen) return null;

  const handleSkip = () => {
    localStorage.setItem('gatebt_onboarded', 'true');
    setIsOpen(false);
  };

  const validateStep = () => {
    setError('');
    if (step === 1) {
      if (!profile.name.trim()) {
        setError('Please enter your name');
        return false;
      }
      if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else if (step === 3) {
      if (profile.scoreType === 'cgpa' && profile.scoreValue) {
        const val = parseFloat(profile.scoreValue);
        if (isNaN(val) || val < 0 || val > 10) {
          setError('CGPA must be between 0.0 and 10.0');
          return false;
        }
      }
      if (profile.scoreType === 'percentage' && profile.scoreValue) {
        const val = parseFloat(profile.scoreValue);
        if (isNaN(val) || val < 0 || val > 100) {
          setError('Percentage must be between 0% and 100%');
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Save profile
      localStorage.setItem('gatebt_profile', JSON.stringify(profile));
      localStorage.setItem('gatebt_onboarded', 'true');
      setIsOpen(false);
    }
  };

  const handleBack = () => {
    setError('');
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (item: string) => {
    setProfile((prev) => {
      const exists = prev.interests.includes(item);
      const updated = exists ? prev.interests.filter((i) => i !== item) : [...prev.interests, item];
      return { ...prev, interests: updated };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col relative">
        {/* Top Header & Progress */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={OFFICIAL_LOGO_URL}
              alt="GateBT Prep Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div>
              <h3 className="font-extrabold text-[#0B2A63] text-sm leading-tight">Welcome to GateBT Prep</h3>
              <p className="text-[10px] text-slate-500 font-semibold">Step {step} of 6 — Quick Personalization</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-200/50"
          >
            Skip
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-[#1CA3DC] h-1 transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Step Body Content */}
        <div className="p-6 flex-1 min-h-[300px] flex flex-col justify-between">
          {error && (
            <div className="mb-4 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 px-3.5 py-2 rounded-xl">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-6">
                <h4 className="text-lg font-bold text-[#0B2A63]">What should we call you?</h4>
                <p className="text-xs text-slate-500">Personalize your GateBT study experience</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#1CA3DC] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#1CA3DC] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-lg font-bold text-[#0B2A63]">Select your current degree/course</h4>
                <p className="text-xs text-slate-500">We will tailor relevant subjects for you</p>
              </div>

              <div className="space-y-2">
                {[
                  'B.Tech Biotechnology',
                  'B.Pharmacy',
                  'B.Sc Biotechnology / Life Sciences',
                  'M.Sc Biotechnology / Biochemistry',
                  'Other Stream',
                ].map((c) => (
                  <button
                    key={c}
                    onClick={() => setProfile({ ...profile, course: c })}
                    className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      profile.course === c
                        ? 'border-[#0B2A63] bg-[#0B2A63]/5 text-[#0B2A63] shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c}</span>
                    {profile.course === c && <Check className="w-4 h-4 text-[#0B2A63]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-lg font-bold text-[#0B2A63]">Academic Performance</h4>
                <p className="text-xs text-slate-500">Helps track your GATE eligibility benchmarks</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Score System</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cgpa', label: '10-pt CGPA' },
                    { id: 'percentage', label: 'Percentage (%)' },
                    { id: 'none', label: 'Not Listed' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setProfile({ ...profile, scoreType: s.id as any, scoreValue: '' })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold ${
                        profile.scoreType === s.id
                          ? 'border-[#1CA3DC] bg-[#1CA3DC]/10 text-[#1077a3]'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {profile.scoreType !== 'none' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {profile.scoreType === 'cgpa' ? 'Your CGPA (0.0 - 10.0)' : 'Your Aggregate Percentage (0 - 100%)'}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={profile.scoreValue}
                    onChange={(e) => setProfile({ ...profile, scoreValue: e.target.value })}
                    placeholder={profile.scoreType === 'cgpa' ? 'e.g. 8.45' : 'e.g. 82.5'}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#1CA3DC] focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
                <select
                  value={profile.gradYear}
                  onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#1CA3DC]"
                >
                  {['2025', '2026', '2027', '2028', '2029'].map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-lg font-bold text-[#0B2A63]">Target Exam Goal</h4>
                <p className="text-xs text-slate-[#64748B]">Select your target GATE attempt year</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['GATE 2026', 'GATE 2027', 'GATE 2028', 'Other Exam'].map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setProfile({ ...profile, targetExam: exam })}
                    className={`p-3.5 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                      profile.targetExam === exam
                        ? 'border-[#0B2A63] bg-[#0B2A63] text-white shadow-md'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Target className="w-5 h-5" />
                    <span>{exam}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Paper</label>
                <select
                  value={profile.targetPaper}
                  onChange={(e) => setProfile({ ...profile, targetPaper: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#1CA3DC]"
                >
                  <option>Biotechnology (BT)</option>
                  <option>Life Sciences (XL)</option>
                  <option>Biomedical Engineering (BM)</option>
                  <option>Engineering Sciences (XE)</option>
                  <option>Chemical Engineering (CH)</option>
                </select>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-lg font-bold text-[#0B2A63]">What study resources do you need?</h4>
                <p className="text-xs text-slate-500">Select all that apply</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'Notes', label: '📄 Handwritten Notes' },
                  { id: 'Mind Maps', label: '🧠 Mind Maps' },
                  { id: 'PYQs', label: '📝 Solved PYQs' },
                  { id: 'Videos', label: '▶️ Video Lectures' },
                  { id: 'Books', label: '📚 Standard Books' },
                  { id: 'GATE Papers', label: '🎓 GATE Papers' },
                ].map((item) => {
                  const selected = profile.interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleInterest(item.id)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                        selected
                          ? 'border-[#1CA3DC] bg-[#1CA3DC]/10 text-[#1077a3]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {selected && <Check className="w-4 h-4 text-[#1CA3DC]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-[#0B2A63]">You&apos;re All Set, {profile.name || 'Aspirant'}!</h4>
                <p className="text-xs text-slate-500 mt-1">Your GateBT Study Store is personalized for {profile.targetExam}</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Exam:</span>
                  <strong className="text-[#0B2A63] font-bold">{profile.targetExam} ({profile.targetPaper})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Course:</span>
                  <strong className="text-slate-800 font-semibold">{profile.course}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Saved Preferences:</span>
                  <strong className="text-[#1CA3DC] font-semibold">{profile.interests.join(', ')}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#0B2A63] hover:bg-[#06193E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>{step === 6 ? 'Start Learning' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
