import React, { useState } from 'react';
import { User, Lock, Mail, AtSign } from 'lucide-react';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    console.log('Signup attempted', { fullName, email, password });
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl p-8 shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 pl-10 py-3 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]
                shadow-[inset_3px_3px_6px_#e6d6d6,inset_-3px_-3px_6px_#ffffff]"
                required
              />
            </div>
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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="text-gray-400" size={20} />
              </div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account? {' '}
              <a 
                href="/login" 
                className="text-[#A9B5DF] hover:underline font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;