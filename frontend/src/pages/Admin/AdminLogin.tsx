import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiAlertCircle, FiKey } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

interface LoginInput {
  emailOrUsername: string;
  passwordHash: string; // matches password variable name
}

export const AdminLogin: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/auth/login', {
        username: data.emailOrUsername.includes('@') ? undefined : data.emailOrUsername,
        email: data.emailOrUsername.includes('@') ? data.emailOrUsername : undefined,
        password: data.passwordHash,
      });

      if (response.data.success) {
        login(response.data.token, response.data.data.username);
        navigate('/admin/dashboard');
      } else {
        setError(response.data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Connection to authentication service failed.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-6 relative overflow-hidden bg-grid">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-card p-8 rounded-3xl border border-zinc-900 bg-zinc-950/40 relative z-10"
      >
        {/* Top Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 animate-float">
            <FiLock className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Admin Portal Access</h2>
          <p className="text-xs text-zinc-500">Provide authorization tokens to manage CMS fields</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 text-xs mb-6 text-left">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
          {/* Email/Username field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiUser className="w-3.5 h-3.5" /> Email or Username
            </label>
            <input
              type="text"
              placeholder="admin or admin@example.com"
              {...register('emailOrUsername', { required: 'Email or username is required' })}
              className={`w-full bg-zinc-950/80 border rounded-xl py-3 px-4 text-sm text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-violet-500 transition-colors ${
                errors.emailOrUsername ? 'border-red-500/50' : 'border-zinc-850'
              }`}
            />
            {errors.emailOrUsername && <span className="text-[10px] text-red-400 font-semibold">{errors.emailOrUsername.message}</span>}
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiKey className="w-3.5 h-3.5" /> Authorization Key
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('passwordHash', { required: 'Password is required' })}
              className={`w-full bg-zinc-950/80 border rounded-xl py-3 px-4 text-sm text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-violet-500 transition-colors ${
                errors.passwordHash ? 'border-red-500/50' : 'border-zinc-850'
              }`}
            />
            {errors.passwordHash && <span className="text-[10px] text-red-400 font-semibold">{errors.passwordHash.message}</span>}
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold tracking-wider cursor-pointer shadow-lg shadow-violet-600/20 hover:-translate-y-0.5 transition-all text-sm uppercase"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
          <Link
            to="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
          >
            ← Return to Main Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
export default AdminLogin;
