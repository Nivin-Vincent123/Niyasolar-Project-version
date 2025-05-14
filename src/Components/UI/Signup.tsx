import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "", 
    password: "",
    confirmPassword: "",
    role: "Buyer"
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const { email, name, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      if (existingUsers.some((user: any) => user.email === email)) {
        setError("Email already exists. Please use a different email.");
        setIsLoading(false);
        return;
      }

      const newUser = {
        email,
        name,
        password,
        role: formData.role,
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: newUser.email,
          name: newUser.name,
          isLoggedIn: true,
          role: newUser.role,
          loginTime: new Date().toISOString()
        })
      );

      setSuccess("Account created successfully! Redirecting...");
      setIsLoading(false);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#2a2a5a] to-[#0a0a1a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,255,255,0.2)] border border-white/20 p-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00ffff] to-[#6495ED] bg-clip-text text-transparent text-center mb-8">
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#00ffff] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-300 border-2 border-[#00ffff]/50 focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent backdrop-blur-sm transition duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Role Selector */}
            <div>
              <label htmlFor="role" className="block text-[#00ffff] mb-2">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-300 border-2 border-[#00ffff]/50 focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent backdrop-blur-sm transition duration-300"
                required
              >
                <option value="Buyer">Buyer</option>
                <option value="Installer">Installer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="name" className="block text-[#00ffff] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-300 border-2 border-[#00ffff]/50 focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent backdrop-blur-sm transition duration-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#00ffff] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-300 border-2 border-[#00ffff]/50 focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent backdrop-blur-sm transition duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-[#00ffff] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-gray-300 border-2 border-[#00ffff]/50 focus:outline-none focus:ring-2 focus:ring-[#00ffff] focus:border-transparent backdrop-blur-sm transition duration-300"
                placeholder="Confirm your password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/20">{error}</p>}
            {success && <p className="text-green-400 text-sm bg-green-900/20 p-3 rounded-lg border border-green-400/20">{success}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#00ffff] via-[#6495ED] to-[#00e5e5] text-[#0a0a1a] rounded-xl font-bold hover:from-[#00e5e5] hover:via-[#4169E1] hover:to-[#00cccc] transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.4)] disabled:opacity-50 backdrop-blur-sm"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="bg-gradient-to-r from-[#00ffff] to-[#6495ED] bg-clip-text text-transparent hover:from-[#00e5e5] hover:to-[#4169E1] transition duration-300">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
