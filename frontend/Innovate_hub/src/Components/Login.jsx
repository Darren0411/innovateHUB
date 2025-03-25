import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempted', { email, password });
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400" size={20} />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 pl-10 py-3 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]
                shadow-[inset_3px_3px_6px_#e6d6d6,inset_-3px_-3px_6px_#ffffff]"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 pl-10 py-3 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]
                shadow-[inset_3px_3px_6px_#e6d6d6,inset_-3px_-3px_6px_#ffffff]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#A9B5DF] text-white py-3 rounded-lg 
              shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] 
              hover:shadow-inner transition-all duration-300 ease-in-out 
              flex items-center justify-center"
            >
              <User className="mr-2" size={20} />
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? {' '}
              <a 
                href="/signup" 
                className="text-[#A9B5DF] hover:underline font-semibold"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;