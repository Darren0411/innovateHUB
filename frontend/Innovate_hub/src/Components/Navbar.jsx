import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Menu, 
  X, 
  Home, 
  Info,
  BookOpen, 
  Contact2, 
  Award 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle smooth scrolling
  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF2F2] shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Website Name - Left Side */}
          <div className="flex-shrink-0 flex items-center">
            <img src="/game-development.png" alt="Game Development" className="h-12 w-auto" />
            <Link to="/" className="text-2xl font-bold text-gray-800 mr-4">
              InnovateHub
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
            <Link 
              to="/" 
              className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
            >
              <Home className="mr-2" size={20} />
              Home
            </Link>
        
            <Link 
              to="/projects" 
              className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
            >
              <Home className="mr-2" size={20} />
              Projects
            </Link>

    
            {/* <Link 
              to="/leaderboard" 
              className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
            >
              <Award className="mr-2" size={20} />
              Leaderboard
            </Link> */}
            <Link 
              to="/about" 
              className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
            >
              <Info className="mr-2" size={20} />
              About Us
            </Link>

            <Link 
              to="/contact" 
              className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
            >
              <Contact2 className="mr-2" size={20} />
              Contact
            </Link>
          </div>

          {/* Account/Signup - Right Side */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link 
                to="/user/login"
                className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg 
                shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] 
                hover:shadow-inner transition-all duration-300 ease-in-out flex items-center"
              >
                <User className="mr-2" size={20} />
                Login
              </Link>
              <Link 
                to="/user/signup"
                className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg 
                shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] 
                hover:shadow-inner transition-all duration-300 ease-in-out flex items-center"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#A9B5DF] focus:outline-none 
              shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] p-2 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#FFF2F2] rounded-lg 
            shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
              <Link 
                to="/" 
                className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
              >
                <Home className="mr-2" size={20} />
                Home
              </Link>
              <a 
                href="#projects"
                onClick={(e) => {
                  setIsOpen(false);
                  scrollToProjects(e);
                }}
                className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
              >
                <BookOpen className="mr-2" size={20} />
                Projects
              </a>
              <Link 
                to="/leaderboard" 
                className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
              >
                <Award className="mr-2" size={20} />
                Leaderboard
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
              >
                <Contact2 className="mr-2" size={20} />
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;