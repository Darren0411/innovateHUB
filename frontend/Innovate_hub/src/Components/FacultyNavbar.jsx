import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Users, Award, MessageSquare } from "lucide-react";

const FacultyNavbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link to="/faculty/dashboard" className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>
            <span className="text-xl font-bold">InnovateHub</span>
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link
            to="/faculty/dashboard"
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive("/faculty/dashboard")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BookOpen size={18} className="mr-2" />
            Projects
          </Link>
          <Link
            to="/faculty/students"
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive("/faculty/students")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Users size={18} className="mr-2" />
            Students
          </Link>
          <Link
            to="/faculty/feedback"
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive("/faculty/feedback")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MessageSquare size={18} className="mr-2" />
            Feedback
          </Link>
          <Link
            to="/faculty/evaluations"
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              isActive("/faculty/evaluations")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Award size={18} className="mr-2" />
            Evaluations
          </Link>
        </div>

        <div className="flex items-center">
          <div className="relative mr-3">
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <img
              src="/api/placeholder/40/40"
              alt="Faculty Profile"
              className="h-9 w-9 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-800">Prof. Johnson</p>
              <p className="text-xs text-gray-500">Faculty Coordinator</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FacultyNavbar;