import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Buyer');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      // Get existing users from localStorage or initialize empty array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        setError('User not found. Please check your email or sign up first.');
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Create session
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        name: user.name,
        isLoggedIn: true,
        role: role
      }));

      // Success message and redirect
      setSuccess('Login successful! Redirecting...');
      setIsLoading(false);
      
      // Delay navigation to show success message
      setTimeout(() => {
        if (role === 'Buyer') {
          navigate('/');
        } else if (role === 'Installer') {
          navigate('/installer/dashboard');
        } else if (role === 'Admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#000066] flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-[0_8px_32px_rgba(0,255,255,0.2)] border border-white/20">
        <h2 className="text-4xl font-bold text-[#00ffff] text-center mb-8 font-['Orbitron']">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[#00ffff] font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-white/5 border border-[#00ffff]/30 rounded-lg focus:ring-2 focus:ring-[#00ffff] focus:outline-none text-white placeholder-white/50 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-[#00ffff] font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-white/5 border border-[#00ffff]/30 rounded-lg focus:ring-2 focus:ring-[#00ffff] focus:outline-none text-white placeholder-white/50 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="block text-[#00ffff] font-medium">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-white/5 border border-[#00ffff]/30 rounded-lg focus:ring-2 focus:ring-[#00ffff] focus:outline-none text-white placeholder-white/50 transition duration-200"
              required
            >
              <option value="Buyer">Buyer</option>
              <option value="Installer">Installer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-400/20">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm bg-green-900/20 p-3 rounded-lg border border-green-400/20">{success}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#00ffff] text-[#0a0a1a] py-4 rounded-lg font-bold text-lg transition duration-300
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#00cccc] hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transform hover:scale-[1.02]'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0a0a1a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
          <p className="text-center text-[#00ffff]/80">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#00ffff] hover:text-white font-semibold transition duration-200">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;