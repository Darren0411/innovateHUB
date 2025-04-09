import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FFF2F2] min-h-screen">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Explore Student Projects
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover innovations built by creative minds.
        </p>
        <input
          type="text"
          placeholder="Find a project..."
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 pb-16">
        {filteredProjects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-300"
          >
            <img
              src={project.media[0] || "/placeholder.png"}
              alt="project visual"
              className="rounded-xl w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {project.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {project.readMe.substring(0, 100)}...
            </p>
            <div className="flex justify-between items-center text-sm">
              <a
                href={project.githubRepoUrl}
                target="_blank"
                className="text-blue-600 underline"
              >
                GitHub
              </a>
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  className="text-green-600 underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
     
    </div>
  );
};

export default Projects;
