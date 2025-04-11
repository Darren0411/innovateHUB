"use client"

import { useState, useEffect } from "react"
import { GitlabIcon as GitHub, Globe, Mail, MapPin, FileText, Download } from "lucide-react"
import axios from "axios"
import StudentNavbar from "../StudendNavbar"
import ProjectCard from "../dashboard/ProjectCard"

const Portfolio = () => {
  const [student, setStudent] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/student/projects", {
          withCredentials: true,
        });

        const { projects, user } = response.data;

        const userData = {
          name: user.name,
          avatar: `http://localhost:9000${user.ProfileUrl}`,
          role: user.role,
          rollNo: user.rollNo,
          email: user.email,
          github: user.githubUrl || null,
          linkedin: user.linkedinUrl || null,
          skills: user.skills || [],
        };

        const projectsData = projects.map((project) => ({
          id: project._id,
          title: project.title,
          description: project.readMe?.substring(0, 100) + "..." || "No description",
          image: project.projectImage
            ? `http://localhost:9000${
                project.projectImage.startsWith("/") ? "" : "/"
              }${project.projectImage}`
            : "/placeholder.svg",
          status: project.status || "Pending",
          sdgs: project.sdgMapping || [],
          rating: project.averageRating || 0,
          comments: project.feedback?.length || 0,
          views: project.views || 0,
          likes: project.likes || 0,
          github: project.githubRepoUrl || null,
        }));

        setStudent(userData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Loading portfolio...</div>
  }

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] mb-8">
          <div className="relative">
            <div className="h-48 w-full bg-gradient-to-r from-[#A9B5DF] to-[#C8D3FA] rounded-t-lg"></div>
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <img
                src={student?.avatar || "/placeholder.svg"}
                alt={student?.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                onError={(e) => { e.target.src = "/placeholder.svg" }}
              />
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student?.name}</h1>
                <p className="text-gray-600 capitalize">{student?.role}</p>
                <p className="text-sm text-gray-500">Roll No: {student?.rollNo}</p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <a
                  href="/portfolio/download"
                  className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  Export PDF
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                {student?.email}
              </div>

              {student?.github && (
                <a href={student.github} target="_blank" className="flex items-center hover:underline">
                  <GitHub size={18} className="mr-2" />
                  GitHub
                </a>
              )}

              {student?.linkedin && (
                <a href={student.linkedin} target="_blank" className="flex items-center hover:underline">
                  <Globe size={18} className="mr-2" />
                  LinkedIn
                </a>
              )}
            </div>

            {student?.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {student.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-[#FFF2F2] text-gray-700 px-3 py-1 rounded-full text-sm shadow-[2px_2px_4px_#e6d6d6,-2px_-2px_4px_#ffffff]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                imageUrl={project.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio;
