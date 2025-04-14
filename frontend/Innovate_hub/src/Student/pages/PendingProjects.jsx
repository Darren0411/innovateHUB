import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Components/Admin-Navbar";
import {
  GitlabIcon as GitHub,
  Star,
  MessageSquare,
  Eye,
  Heart,
} from "lucide-react";

const PendingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/admin/pending-projects", 
          { withCredentials: true }
        );
        
        if (response.data && Array.isArray(response.data)) {
          setProjects(response.data.map(project => ({
            ...project,
            id: project._id,
            image: project.projectImage ? `http://localhost:9000/${project.projectImage}` : "/placeholder.svg",
            description: project.readMe || "",
            sdgs: project.sdgs || [],
            status: "Pending",
          })));
        } else {
          setError("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingProjects();
  }, []);

  const handleApprove = async (projectId) => {
    try {
      await axios.patch(
        `http://localhost:9000/admin/projects/approve/${projectId}`,
        {},
        { withCredentials: true }
      );
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error("Approval failed:", err);
      setError(err.response?.data?.message || "Approval failed");
    }
  };

  const handleReject = async (projectId) => {
    try {
      await axios.patch(
        `http://localhost:9000/admin/projects/reject/${projectId}`,
        {},
        { withCredentials: true }
      );
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error("Rejection failed:", err);
      setError(err.response?.data?.message || "Rejection failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <AdminNavbar />
        <div className="pt-16 p-6 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Loading pending projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <AdminNavbar />
        <div className="pt-16 p-6 container mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <strong>Error: </strong> {error}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
      <AdminNavbar />
      <div className="pt-16 p-6 container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Pending Project Approvals</h2>
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
           
          </div>
        </div>
        
        {projects.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg text-gray-600">No pending projects found</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.sdgs && project.sdgs.map((sdg, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        SDG {sdg}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-600">0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-600">0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-600">0</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} className="text-red-500" />
                        <span className="text-xs text-gray-600">0</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="flex items-center text-blue-600 text-sm hover:text-blue-800 transition-colors"
                    >
                      <GitHub size={16} className="mr-1" />
                      View on GitHub
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleReject(project.id)}
                      className="bg-red-500 text-white py-2 rounded text-sm hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(project.id)}
                      className="bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      Approve
                    </button>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="mt-3 w-full bg-gray-100 text-gray-700 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingProjects;