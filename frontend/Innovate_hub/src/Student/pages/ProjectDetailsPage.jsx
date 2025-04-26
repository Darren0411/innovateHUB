import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader2,
  Github,
  Globe,
  User,
  Eye,
  Heart,
  ExternalLink,
} from "lucide-react";
import StudentNavbar from "../StudendNavbar";
import { Link } from "react-router-dom";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({ project: null, user: null });
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showIframe, setShowIframe] = useState(false); // for iframe toggle

  useEffect(() => {
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '{}');
    setLiked(!!likedProjects[id]);
  }, [id]);

  useEffect(() => {
    if (liked !== null) {
      const likedProjects = JSON.parse(localStorage.getItem('likedProjects')) || {};
      likedProjects[id] = liked;
      localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
    }
  }, [liked, id]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/projects/${id}`, {
          withCredentials: true,
        });
        setData(res.data);
        setLikeCount(res.data.project?.likes || 0);
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleLike = async () => {
    try {
      const newLikeCount = liked ? likeCount - 1 : likeCount + 1;
      setLikeCount(newLikeCount);
      setLiked(!liked);

      await axios.patch(
        `http://localhost:9000/projects/${id}/like`,
        {},
        { withCredentials: true }
      );

      setData(prev => ({
        ...prev,
        project: {
          ...prev.project,
          likes: newLikeCount
        }
      }));
    } catch (error) {
      console.error("Failed to like project:", error);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);
      setLiked(prev => !prev);
    }
  };

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
                          ? `http://localhost:9000${user.ProfileUrl.replace(/\\/g, "/")}`
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

            <div className="rounded-xl overflow-hidden mb-6 border border-gray-200">
              <img
                src={
                  project.projectImage
                    ? `http://localhost:9000/${project.projectImage.replace(/\\/g, "/")}`
                    : "/project-placeholder.jpg"
                }
                alt={project.title}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.src = "/project-placeholder.jpg";
                }}
              />
            </div>

            <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>{project.views || 0} views</span>
              </div>
              <div 
                className="flex items-center cursor-pointer hover:text-red-500 transition-colors"
                onClick={handleLike}
              >
                <Heart 
                  className={`h-4 w-4 mr-2 transition-all duration-200 ${
                    liked ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600'
                  }`} 
                />
                <span>{likeCount} likes</span>
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

            {/* Toggle View Project iframe */}
            {project.deployedUrl && (
              <div className="mb-6">
                <button
                  onClick={() => setShowIframe(!showIframe)}
                  className="inline-flex items-center px-4 py-2 bg-[#A9B5DF] text-white rounded-md hover:bg-[#8f9fd1] transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {showIframe ? "Hide Project" : "View Project"}
                </button>
              </div>
            )}

            {/* Iframe to preview deployed project */}
            {showIframe && (
              <div className="w-full h-[600px] mt-4 border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={project.deployedUrl}
                  title="Project Preview"
                  className="w-full h-full"
                  frameBorder="0"
                />
              </div>
            )}
          </div>

          <div className="md:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Project Details
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Category</h4>
                  <p className="text-gray-800">
                    {project.category || "Not specified"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tech Stack</h4>
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
                  <h4 className="text-sm font-medium text-gray-500">Mapped SDGs</h4>
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

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created At</h4>
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

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Project Description
          </h2>
          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
            {project.readMe || "No description provided."}
          </div>
        </div>

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
