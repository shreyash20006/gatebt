'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Mail, KeyRound, ArrowRight, CheckCircle2, AlertCircle, Loader2, Shield, Sparkles } from 'lucide-react';

interface SupabaseAuthCardProps {
  onSuccess?: () => void;
}

export default function SupabaseAuthCard({ onSuccess }: SupabaseAuthCardProps) {
  const { sendEmailOtp, verifyEmailOtp, signInWithProvider } = useAuth();
  const [email, setEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const { error } = await sendEmailOtp(email);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Failed to send OTP code. Please try again.');
    } else {
      setStep('otp');
      setSuccessMsg(`OTP code & magic link sent to ${email}. Check your inbox!`);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpToken || otpToken.length < 6) {
      setErrorMsg('Please enter the 6-digit OTP code sent to your email.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    const { error } = await verifyEmailOtp(email, otpToken);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Invalid or expired OTP code. Please check and try again.');
    } else {
      setSuccessMsg('Successfully authenticated!');
      if (onSuccess) onSuccess();
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setErrorMsg(null);
    setOauthLoading(provider);
    const { error } = await signInWithProvider(provider);
    setOauthLoading(null);

    if (error) {
      setErrorMsg(error.message || `Failed to sign in with ${provider}.`);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 max-w-md w-full mx-auto">
      {/* Card Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#1CA3DC]/10 border border-[#1CA3DC]/30 flex items-center justify-center mx-auto text-[#1CA3DC]">
          <Shield className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">GATE Student Portal</h2>
        <p className="text-xs text-slate-400">Sign in with Email OTP or OAuth Providers to save notes & sync prep progress.</p>
      </div>

      {/* Error & Success Feedback Alerts */}
      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-semibold flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* OAuth Provider Buttons */}
      <div className="space-y-2.5">
        <button
          onClick={() => handleOAuthLogin('google')}
          disabled={!!oauthLoading || loading}
          className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
        >
          {oauthLoading === 'google' ? (
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => handleOAuthLogin('github')}
          disabled={!!oauthLoading || loading}
          className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-200 flex items-center justify-center gap-3 transition-all disabled:opacity-50"
        >
          {oauthLoading === 'github' ? (
            <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
          ) : (
            <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          )}
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800" />
        </div>
        <span className="relative bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Or Email Passwordless OTP
        </span>
      </div>

      {/* Email OTP Form Step 1 */}
      {step === 'email' && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 text-xs text-white pl-10 pr-4 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-[#1CA3DC] transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#1CA3DC] hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <>
                <span>Send 6-Digit OTP</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {/* Email OTP Verification Step 2 */}
      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-300">Enter 6-Digit Code</label>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-[11px] text-cyan-400 font-semibold hover:underline"
              >
                Change Email
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otpToken}
                onChange={(e) => setOtpToken(e.target.value.trim())}
                className="w-full bg-slate-950 text-center tracking-[0.4em] font-mono text-base text-cyan-300 py-3 rounded-2xl border border-slate-700 focus:outline-none focus:border-[#1CA3DC] transition-all placeholder:tracking-normal placeholder:text-slate-600 placeholder:text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-[#1CA3DC] hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP & Sign In</span>
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="text-xs text-slate-400 hover:text-cyan-400 font-medium transition-colors"
            >
              Didn't receive code? Resend OTP
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
