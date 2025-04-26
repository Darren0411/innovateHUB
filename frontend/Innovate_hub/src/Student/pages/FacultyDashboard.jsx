import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FacultyNavbar from "../../components/FacultyNavbar";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  BookOpen,
  MessageSquare,
  Award,
  Star,
  Eye,
  Heart,
  Info,
  X,
  Send,
} from "lucide-react";

const FacultyDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [currentProject, setCurrentProject] = useState(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true);

  const statusColors = {
    Approved: "bg-green-100 text-green-800 border-green-200",
    Rejected: "bg-red-100 text-red-800 border-red-200",
    Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Needs Review": "bg-blue-100 text-blue-800 border-blue-200",
  };

  const sdgColors = {
    "No Poverty": "bg-red-100 border-red-200 text-red-800",
    "Zero Hunger": "bg-orange-100 border-orange-200 text-orange-800",
    "Good Health and Well-being":
      "bg-green-100 border-green-200 text-green-800",
    "Quality Education": "bg-red-100 border-red-200 text-red-800",
    "Gender Equality": "bg-yellow-100 border-yellow-200 text-yellow-800",
    "Clean Water and Sanitation": "bg-blue-100 border-blue-200 text-blue-800",
    "Affordable and Clean Energy":
      "bg-yellow-100 border-yellow-200 text-yellow-800",
    "Decent Work and Economic Growth":
      "bg-green-100 border-green-200 text-green-800",
    "Industry, Innovation and Infrastructure":
      "bg-orange-100 border-orange-200 text-orange-800",
    "Reduced Inequalities": "bg-red-100 border-red-200 text-red-800",
    "Sustainable Cities and Communities":
      "bg-orange-100 border-orange-200 text-orange-800",
    "Responsible Consumption and Production":
      "bg-yellow-100 border-yellow-200 text-yellow-800",
    "Climate Action": "bg-green-100 border-green-200 text-green-800",
    "Life Below Water": "bg-blue-100 border-blue-200 text-blue-800",
    "Life on Land": "bg-green-100 border-green-200 text-green-800",
    "Peace, Justice and Strong Institutions":
      "bg-blue-100 border-blue-200 text-blue-800",
    "Partnerships for the Goals": "bg-blue-100 border-blue-200 text-blue-800",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/faculty/faculty-projects-students",
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data)) {
          setProjects(
            response.data.map((project) => ({
              ...project,
              id: project._id || Math.random().toString(36).substr(2, 9),
              image: project.projectImage
                ? `http://localhost:9000/${project.projectImage}`
                : "/placeholder.svg",
              description: project.readMe || project.description || "",
              sdgs: project.sdgMapping || project.sdgs || [],
              status: project.status || "Pending",
              teamMembers: project.teamMembers || [
                project.creator?.name || "Unknown",
              ],
              score: project.score || 0,
              createdAt: project.createdAt || new Date().toISOString(),
            }))
          );
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch projects"
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentFeedbacks = async () => {
      try {
        setLoadingFeedbacks(true);
        const response = await axios.get(
          "http://localhost:9000/faculty/recent-feedbacks?limit=3",
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data)) {
          setRecentFeedbacks(response.data);
        }
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      } finally {
        setLoadingFeedbacks(false);
      }
    };

    fetchProjects();
    fetchRecentFeedbacks();
  }, []);

  const countSDGs = () => {
    const sdgCounts = {};

    const allSDGs = [
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice and Strong Institutions",
      "Partnerships for the Goals",
    ];

    allSDGs.forEach((sdg) => {
      sdgCounts[sdg] = 0;
    });

    projects.forEach((project) => {
      if (project.sdgs && Array.isArray(project.sdgs)) {
        project.sdgs.forEach((sdg) => {
          if (allSDGs.includes(sdg)) {
            sdgCounts[sdg]++;
          }
        });
      }
    });

    return sdgCounts;
  };

  const handleOpenFeedback = (project) => {
    setCurrentProject(project);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      setError("Please write your feedback before submitting");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:9000/faculty/feedback/${currentProject.id}`,
        { feedback: feedbackText },
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccessMessage("✓ Feedback submitted successfully!");
        setFeedbackText("");

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
          setShowFeedbackModal(false);
        }, 2000);
      } else {
        setError(response.data.message || "Failed to submit feedback");
      }
    } catch (err) {
      console.error("Feedback error:", err);
      setError(err.response?.data?.message || "Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === "all" || project.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={16} className="mr-1 text-green-600" />;
      case "Rejected":
        return <XCircle size={16} className="mr-1 text-red-600" />;
      case "Needs Review":
        return <Info size={16} className="mr-1 text-blue-600" />;
      default:
        return <AlertCircle size={16} className="mr-1 text-yellow-600" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const getFeedbackIcon = (feedback) => {
    if (feedback.type === "approval") {
      return <CheckCircle size={20} className="text-green-500" />;
    } else if (feedback.type === "rejection") {
      return <XCircle size={20} className="text-red-500" />;
    } else if (feedback.type === "evaluation") {
      return <Award size={20} className="text-yellow-500" />;
    }
    return <MessageSquare size={20} className="text-purple-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <FacultyNavbar />
        <div className="pt-16 p-6 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <FacultyNavbar />
        <div className="pt-16 p-6 container mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
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
      <FacultyNavbar />

      <div className="pt-16 p-6 container mx-auto">
        {/* Dashboard Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold">{projects.length}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <h3 className="text-2xl font-bold">
                {projects.filter((p) => p.status === "Approved").length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-2xl font-bold">
                {projects.filter((p) => p.status === "Pending").length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Students</p>
              <h3 className="text-2xl font-bold">
                {new Set(projects.map((p) => p.creator?.email)).size}
              </h3>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Project Overview</h1>

          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="relative">
              <select
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Projects</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg text-gray-600">
              No projects found matching your criteria
            </p>
            <button
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
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
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${
                        statusColors[project.status]
                      }`}
                    >
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.description.replace(/^#\s+/, "")}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.sdgs &&
                      project.sdgs.map((sdg, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          SDG: {sdg}
                        </span>
                      ))}
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex -space-x-2">
                      <div
                        className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium"
                        title={project.creator?.name || "Unknown"}
                      >
                        {project.creator?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      1 Student
                    </span>
                    {project.creator?.rollNo && (
                      <span className="ml-2 text-xs text-gray-500">
                        Roll No: {project.creator.rollNo}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star size={16} className="text-yellow-500" />
                        <span className="text-xs text-gray-600">
                          {project.score.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} className="text-gray-500" />
                        <span className="text-xs text-gray-600">
                          {project.views}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={16} className="text-red-500" />
                        <span className="text-xs text-gray-600">
                          {project.likes}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">
                    Submitted on{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        navigate(`/projects/${project.id}`, {
                          state: { student: project.creator },
                        })
                      }
                      className="bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOpenFeedback(project)}
                      className="bg-purple-500 text-white py-2 rounded text-sm hover:bg-purple-600 transition-colors flex items-center justify-center"
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
              {/* Close button */}
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackText("");
                  setError("");
                }}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>

              {/* Success message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center">
                  <CheckCircle className="mr-2" size={18} />
                  {successMessage}
                </div>
              )}

              <h3 className="text-lg font-semibold mb-4">Provide Feedback</h3>

              <div className="mb-4">
                <p className="text-sm font-medium">
                  Project:{" "}
                  <span className="text-blue-600">{currentProject?.title}</span>
                </p>
                <p className="text-sm font-medium">
                  Student:{" "}
                  <span className="text-blue-600">
                    {currentProject?.creator?.name}
                  </span>
                </p>
              </div>

              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Write your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                disabled={isSubmitting}
              />

              {error && (
                <div className="text-red-500 text-sm mb-4">{error}</div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedbackText("");
                    setError("");
                  }}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
                  disabled={isSubmitting || !feedbackText.trim()}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={16} />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SDG Compliance Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            SDG Compliance Overview
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(countSDGs()).map(
                ([sdg, count]) =>
                  count > 0 && (
                    <div
                      key={sdg}
                      className={`p-4 border rounded-lg ${
                        sdgColors[sdg] ||
                        "bg-gray-100 border-gray-200 text-gray-800"
                      }`}
                    >
                      <h3 className="font-semibold text-sm truncate">{sdg}</h3>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-xs">projects</p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity/Feedback Section */}
        <div className="mt-8 mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Feedback
          </h2>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {loadingFeedbacks ? (
              <div className="p-8 flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : recentFeedbacks.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No feedbacks found
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentFeedbacks.map((feedback) => (
                  <li key={feedback._id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="mr-4">{getFeedbackIcon(feedback)}</div>
                      <div>
                        <p className="font-medium">
                          {feedback.sender?.name || "You"} provided feedback on{" "}
                          <span className="text-blue-600">
                            {feedback.project?.title || "a project"}
                          </span>{" "}
                          {feedback.project?.creator?.name && (
                            <>
                              created by{" "}
                              <span className="text-blue-600">
                                {feedback.project.creator.name}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          "{feedback.message}"
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {formatDate(feedback.createdAt)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="p-4 bg-gray-50 text-center">
              <button
                onClick={() => navigate("/faculty/allFeedbacks")}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
