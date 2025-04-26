import {
  GitlabIcon as GitHub,
  Star,
  MessageSquare,
  Eye,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectCard = ({ project, showEditButton }) => {
  const navigate = useNavigate(); // ✅ Moved inside

  const handleViewDetails = async () => {
    try {
      // Increment view count before navigating
      await axios.patch(
        `http://localhost:9000/${project.id}/view`,
        {},
        { withCredentials: true }
      );
      navigate(`/projects/${project.id}`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
      navigate(`/projects/${project.id}`); // Still navigate even if view count fails
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] overflow-hidden transition-all duration-300 hover:shadow-[8px_8px_16px_#e6d6d6,-8px_-8px_16px_#ffffff] transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-[#A9B5DF] text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
          {project.status}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* SDG Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.sdgs.map((sdg, index) => (
            <span
              key={index}
              className="bg-[#FFF2F2] text-gray-700 px-2 py-1 rounded-md text-xs font-medium shadow-[2px_2px_4px_#e6d6d6,-2px_-2px_4px_#ffffff]"
            >
              SDG {sdg}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-500" />
            <span>{project.rating}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare size={16} className="mr-1" />
            <span>{project.comments}</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-1" />
            <span>{project.views}</span>
          </div>
          <div className="flex items-center">
            <Heart size={16} className="mr-1 text-red-500" />
            <span>{project.likes}</span>
          </div>
        </div>

        {/* GitHub Link */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-700 hover:text-[#A9B5DF] text-sm mb-4"
          >
            <GitHub size={16} className="mr-2" />
            View on GitHub
          </a>
        )}

        {/* Actions */}
        <div
          className={`flex mt-4 ${
            showEditButton ? "justify-between" : "justify-end"
          }`}
        >
          {showEditButton && (
            <button
              className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out text-sm"
              onClick={() => navigate(`/student/project/${project.id}`)}
            >
              Edit Project
            </button>
          )}

          <button
            className={`bg-white text-gray-700 px-4 py-2 rounded-lg shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner transition-all duration-300 ease-in-out text-sm ${
              !showEditButton ? "w-full" : ""
            }`}
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;