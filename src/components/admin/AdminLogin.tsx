import React, { useState } from 'react';
import { Lock, Shield, ArrowRight, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { MechanicalCard, TactileButton, StatusLed } from '../common/TactileElements';

interface AdminLoginProps {
  onLoginSuccess: (token: string, user: { username: string; role: string }) => void;
  onCancel: () => void;
}

export function AdminLogin({ onLoginSuccess, onCancel }: AdminLoginProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('ironclad2026!');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication denied.');
      }

      onLoginSuccess(data.token, data.user);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid authorization credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 max-w-md mx-auto px-4">
      <div className="rounded-[32px] bg-[#F3EDF7] p-6 sm:p-8 border border-[#E7E0EC] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#6750A4] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8DEF8] text-[#6750A4] text-xs font-bold uppercase tracking-wider">
            Dispatcher Authentication
          </div>
          <h2 className="text-2xl font-extrabold text-[#1C1B1F] tracking-tight">
            Operations Console
          </h2>
          <p className="text-xs text-[#49454F]">
            Enter administrative credentials to manage leads, quotes, field inspections, and CMS parameters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C1B1F] mb-1">
              Operator ID / Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C1B1F] mb-1">
              Security Key / Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-t-xl bg-[#E7E0EC] border-b-2 border-[#79747E] focus:border-[#6750A4] focus:bg-[#ECE6F0] text-[#1C1B1F] text-sm font-medium outline-none transition-all"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-[#FFDAD6] text-[#BA1A1A] text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Helper hint for demo credentials */}
          <div className="p-4 bg-[#21005D] text-white rounded-2xl text-xs space-y-1 shadow-xs">
            <div className="text-[#C8E6C9] font-bold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              <span>DEFAULT DEMO CREDENTIALS:</span>
            </div>
            <div className="text-white/80">Username: <strong className="text-white">admin</strong></div>
            <div className="text-white/80">Password: <strong className="text-white">ironclad2026!</strong></div>
          </div>

          <div className="pt-2 flex justify-between gap-3">
            <TactileButton variant="ghost" onClick={onCancel} className="!py-2.5 !px-4 text-xs">
              Cancel
            </TactileButton>
            <TactileButton
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="!py-2.5 !px-6 text-xs flex-1"
            >
              <span>{isLoading ? 'Authenticating...' : 'Access Console'}</span>
              <ArrowRight className="w-4 h-4" />
            </TactileButton>
          </div>
        </form>
      </div>
    </div>
  );
}
