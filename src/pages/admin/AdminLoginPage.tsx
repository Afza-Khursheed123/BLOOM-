import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Leaf, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const { login, loginAsDemoUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('avis.lee@bloomnursery.com');
  const [password, setPassword] = useState('bloom2026');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleDemoLogin = () => {
    loginAsDemoUser();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F6] text-[#2C3E35] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background soft botanical ambience */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-[#3A7D6A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-[#1E3A2F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Return to Storefront link */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-[#3A7D6A] hover:text-[#1E3A2F] font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Customer Storefront</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-[#E8EDEA] rounded-2xl shadow-xl p-8 relative z-10">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#1E3A2F] text-[#F9F9F6] flex items-center justify-center mx-auto mb-3 shadow-md">
            <Leaf className="w-6 h-6 fill-current text-[#E8EDEA]" />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#3A7D6A] block">
            BLOOM Nursery
          </span>
          <h1 className="font-serif italic text-3xl font-normal text-[#1E3A2F] mt-1">
            Nursery Intelligence
          </h1>
          <p className="text-xs text-gray-500 mt-1.5">
            Authorized Operations &amp; Inventory Management
          </p>
        </div>

        {/* Demo Quick Login Helper Banner */}
        <div className="mb-6 bg-[#F4F6F4] border border-[#E8EDEA] rounded-lg p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#3A7D6A] shrink-0" />
            <div className="text-left">
              <p className="text-xs font-semibold text-[#1E3A2F]">Previewing as Evaluator?</p>
              <p className="text-[11px] text-gray-500">One-click sign in as Avis Lee</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-xs bg-[#1E3A2F] text-white font-medium px-3 py-1.5 rounded-md hover:bg-[#152a22] transition-colors"
          >
            Quick Access
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1E3A2F] mb-1">
              Authorized Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@bloomnursery.com"
                className="w-full bg-[#FAFBF9] border border-gray-300 text-xs text-[#1E3A2F] rounded-md pl-9 pr-3.5 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-[#3A7D6A] focus:ring-1 focus:ring-[#3A7D6A]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#1E3A2F]">
                Password
              </label>
              <a href="#reset" className="text-[11px] text-[#3A7D6A] hover:underline font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAFBF9] border border-gray-300 text-xs text-[#1E3A2F] rounded-md pl-9 pr-3.5 py-2.5 placeholder:text-gray-400 focus:outline-none focus:border-[#3A7D6A] focus:ring-1 focus:ring-[#3A7D6A]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-[#1E3A2F] focus:ring-[#3A7D6A]"
              />
              <span>Remember this terminal</span>
            </label>
            <span className="text-[11px] text-gray-400">256-bit TLS</span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 bg-[#1E3A2F] hover:bg-[#152a22] text-white font-medium text-xs tracking-wider rounded-md transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Nursery Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#3A7D6A]" />
          <span>Restricted to verified greenhouse personnel &amp; operators</span>
        </div>
      </div>
    </div>
  );
};
