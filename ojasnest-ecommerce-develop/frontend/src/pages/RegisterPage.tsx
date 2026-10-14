import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiUser, FiArrowRight, FiShield } from 'react-icons/fi';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please agree to the Terms of Use and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      // Add your registration API call here
      navigate('/login');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Account registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="text-3xl font-black tracking-tight text-[#0066d4] inline-block">
          OJASNEST
        </Link>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
          Create an Ojasnest account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-medium text-[#0066d4] hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-2xl sm:px-10">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiUser className="text-base" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#0066d4] focus:ring-1 focus:ring-[#0066d4] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiMail className="text-base" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#0066d4] focus:ring-1 focus:ring-[#0066d4] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiLock className="text-base" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#0066d4] focus:ring-1 focus:ring-[#0066d4] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <FiLock className="text-base" />
                </div>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat password"
                  className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#0066d4] focus:ring-1 focus:ring-[#0066d4] transition-all"
                />
              </div>
            </div>

            <div className="flex items-start pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="h-4 w-4 mt-0.5 text-[#0066d4] focus:ring-[#0066d4] border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-slate-600 leading-normal">
                I agree to the{' '}
                <Link to="/terms" className="text-[#0066d4] hover:underline">
                  Terms of Use
                </Link>{' '}
                and understand the{' '}
                <Link to="/privacy" className="text-[#0066d4] hover:underline">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-sm font-semibold text-white bg-[#0066d4] hover:bg-[#0055b3] transition-colors focus:outline-none shadow-sm disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              <FiArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <FiShield className="text-[#0066d4] text-base" />
            <span>Guaranteed data privacy & warranty integration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;