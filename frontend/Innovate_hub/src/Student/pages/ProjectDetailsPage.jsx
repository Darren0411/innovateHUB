import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Github,
  Globe,
  MapPin,
  Mail,
  User,
  ChevronRight,
  Eye,
  Heart,
} from "lucide-react";
import StudentNavbar from "../StudendNavbar";
import { Link } from "react-router-dom";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({ project: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/projects/${id}`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (!data.project) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Project not found or failed to load.
      </div>
    );
  }

  const { project, user } = data;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <StudentNavbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Project Header with Creator Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="md:w-2/3">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {project.title}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : project.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Creator Profile Section */}
            {user && (
              <div className="flex items-center mb-6">
                <Link
                  to={`/portfolio/${user._id}`}
                  className="flex items-center group"
                >
                  <div className="relative mr-3">
                    <img
                      src={
                        user.ProfileUrl
                          ? `http://localhost:9000${user.ProfileUrl.replace(
                              /\\/g,
                              "/"
                            )}`
                          : "/default-avatar.png"
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#A9B5DF]"
                      onError={(e) => {
                        e.target.src = "/default-avatar.png";
                      }}
                    />

                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <User className="h-3 w-3 text-[#A9B5DF]" />
                    </div>
                  </div>
                  <div className="group-hover:text-[#A9B5DF] transition-colors">
                    <p className="font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">Project Creator</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Project Image */}
            <div className="rounded-xl overflow-hidden mb-6 border border-gray-200">
              <img
                src={
                  project.projectImage
                    ? `http://localhost:9000/${project.projectImage.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "/project-placeholder.jpg"
                }
                alt={project.title}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = "/project-placeholder.jpg";
                }}
              />
            </div>

            {/* Project Stats */}
            <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>{project.views || 0} views</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                <span>{project.likes || 0} likes</span>
              </div>
              {project.githubRepoUrl && (
                <a
                  href={project.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#A9B5DF] hover:underline"
                >
                  <Github className="h-4 w-4 mr-2" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Sidebar with Project Details */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Project Details
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Category
                  </h4>
                  <p className="text-gray-800">
                    {project.category || "Not specified"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.techStack?.length > 0 ? (
                      project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Not specified</span>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Mapped SDGs
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.sdgMapping?.length > 0 ? (
                      project.sdgMapping.map((sdg, idx) => (
                        <span
                          key={idx}
                          className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full"
                        >
                          {sdg}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Not specified</span>
                    )}
                  </div>
                </div>

                {project.deployedUrl && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Live Demo
                    </h4>
                    <a
                      href={project.deployedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A9B5DF] hover:underline flex items-center"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Site
                    </a>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Created At
                  </h4>
                  <p className="text-gray-800">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Project Description
          </h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {project.readMe || "No description provided."}
          </div>
        </div>

        {/* Feedback Section */}
        {project.feedback?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Feedback
            </h2>
            <div className="space-y-4">
              {project.feedback.map((feedback, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={feedback.user?.avatar || "/default-avatar.png"}
                      alt={feedback.user?.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {feedback.user?.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
