"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaArrowRight, FaEye, FaHeart, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Landing = () => {
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authModal, setAuthModal] = useState({ show: false, message: "", projectId: null });
  const navigate = useNavigate();

  const handleViewDetails = async (project) => {
    try {
      // First check if user can view the project (will trigger auth check)
      await axios.get(
        `http://localhost:9000/projects/${project._id}`,
        { withCredentials: true }
      );
      
      // If successful, increment view count and navigate
      await axios.patch(
        `http://localhost:9000/projects/${project._id}/view`,
        {},
        { withCredentials: true }
      );
      navigate(`/projects/${project._id}`);
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthModal({
          show: true,
          message: "Please login to view project details",
          projectId: project._id
        });
      } else {
        console.error("Error:", error);
        // Still try to navigate - some details might be publicly visible
        navigate(`/projects/${project._id}`);
      }
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.svg";
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:9000/${imagePath}`;
  };

  useEffect(() => {
    const fetchTrendingProjects = async () => {
      try {
        const response = await axios.get("http://localhost:9000/top-projects");
        setTrendingProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching trending projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      {/* Authentication Modal */}
      {authModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <FaLock className="text-3xl text-red-500" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Login Required
              </h3>
              <p className="text-gray-600 mb-6">
                {authModal.message}
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    navigate("/user/login", { 
                      state: { from: `/projects/${authModal.projectId}` } 
                    });
                    setAuthModal({ show: false, message: "", projectId: null });
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
                >
                  Login Now
                </button>
                <button
                  onClick={() => setAuthModal({ show: false, message: "", projectId: null })}
                  className="flex-1 border border-gray-300 hover:bg-gray-100 font-medium py-3 rounded-lg transition"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#A9B5DF] to-[#FFF2F2] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full bg-white"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
            Creative Showcase
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
            Discover and share innovative projects from our community
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/projects")}
              className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Trending Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most viewed and liked projects this week
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
          ) : trendingProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">No trending projects found</p>
              <button 
                onClick={() => navigate("/submit-project")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
              >
                Submit Your Project
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {trendingProjects.map((project, index) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={getImageUrl(project.projectImage)}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.sdgMapping?.slice(0, 2).map((sdg, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                          >
                            {sdg}
                          </span>
                        ))}
                        {project.sdgMapping?.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                            +{project.sdgMapping.length - 2} more
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-gray-500">
                          {project.category || "General"}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center text-sm text-gray-500">
                            <FaEye className="mr-1" /> {project.views || 0}
                          </span>
                          <span className="flex items-center text-sm text-gray-500">
                            <FaHeart className="mr-1 text-red-500" /> {project.likes || 0}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewDetails(project)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                      >
                        View Project
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => navigate("/projects")}
                  className="inline-flex items-center bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-full transition duration-300 shadow-sm hover:shadow-md"
                >
                  View All Projects <FaArrowRight className="ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;