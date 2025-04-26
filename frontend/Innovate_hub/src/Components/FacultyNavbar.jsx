import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  BarChart3,
  MessageSquare,
  Menu,
  X,
  LogOut,
  Info,
  Home,
} from "lucide-react";
import axios from "axios";

const FacultyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [facultyProfile, setFacultyProfile] = useState({
    name: "Faculty",
    role: "Faculty Coordinator",
    avatar: "/placeholder.svg",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/faculty/profile",
          {
            withCredentials: true,
          }
        );

        const data = response.data;

        setFacultyProfile({
          name: data.name || "Faculty",
          role: "Faculty Coordinator",
          avatar: data.ProfileUrl
            ? `http://localhost:9000${data.ProfileUrl}`
            : "/placeholder.svg",
        });
      } catch (err) {
        console.error("Error fetching faculty profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:9000/faculty/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { to: "/faculty/dashboard", icon: Home, label: "Dashboard" },
    { to: "/faculty/students", icon: Users, label: "Students" },
    { to: "/faculty/allFeedbacks", icon: MessageSquare, label: "Feedback" },
    { to: "/projects", icon: BookOpen, label: "Projects" },
    {to: "/about",icon: Info,label: "About Us"},
    { to: "/leaderboard", icon: BarChart3, label: "Leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF2F2] shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/game-development.png"
              alt="Logo"
              className="h-12 w-auto"
            />
            <Link
              to="/faculty/dashboard"
              className="text-2xl font-bold text-gray-800 ml-2"
            >
              InnovateHub
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-lg flex items-center transition-all duration-300 ${
                  location.pathname === to
                    ? "bg-[#A9B5DF] text-white"
                    : "text-gray-800 hover:bg-[#A9B5DF] hover:text-white"
                }`}
              >
                <Icon size={20} className="mr-2" />
                {label}
              </Link>
            ))}
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">
                      {facultyProfile.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {facultyProfile.role}
                    </span>
                  </div>
                  <img
                    src={facultyProfile.avatar}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#A9B5DF] shadow"
                    onError={(e) => (e.target.src = "/placeholder.svg")}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#A9B5DF] hover:text-white"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-[#A9B5DF] p-2 rounded-lg shadow"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 bg-[#FFF2F2] rounded-lg shadow px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2 rounded-lg flex items-center ${
                  location.pathname === to
                    ? "bg-[#A9B5DF] text-white"
                    : "text-gray-800 hover:bg-[#A9B5DF] hover:text-white"
                }`}
              >
                <Icon className="mr-2" size={20} />
                {label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
            >
              <LogOut className="mr-2" size={20} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FacultyNavbar;
