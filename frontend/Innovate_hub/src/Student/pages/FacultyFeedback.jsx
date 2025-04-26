import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FacultyNavbar from "../../components/FacultyNavbar";
import { CheckCircle, XCircle, MessageSquare, Award } from "lucide-react";

const FacultyFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/faculty/all-feedbacks",
          { withCredentials: true }
        );

        if (response.data && Array.isArray(response.data)) {
          setFeedbacks(response.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

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
            <p className="text-gray-700">Loading feedbacks...</p>
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
        <h1 className="text-2xl font-bold text-gray-800 mb-6">InnovateHub</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h2 className="text-xl font-bold text-gray-800 p-4 border-b">Recent Feedback</h2>
          
          {feedbacks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No feedbacks found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {feedbacks.map((feedback) => (
                <li key={feedback._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="mr-4">
                      {getFeedbackIcon(feedback)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {feedback.sender?.name || "Unknown"} provided feedback on{" "}
                        <span className="text-blue-600">
                          {feedback.project?.title || "a project"}
                        </span>{" "}
                        {feedback.project?.creator?.name && (
                          <>created by <span className="text-blue-600">{feedback.project.creator.name}</span></>
                        )}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 pl-2 border-l-4 border-gray-200">
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
        </div>
      </div>
    </div>
  );
};

export default FacultyFeedbackPage;