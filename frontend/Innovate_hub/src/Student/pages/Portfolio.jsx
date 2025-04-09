"use client"

import { useState, useEffect } from "react"
import { GitlabIcon as GitHub, Globe, Mail, MapPin, FileText, Download } from "lucide-react"
import StudentNavbar from "../StudendNavbar"
import ProjectCard from "../dashboard/ProjectCard"

const Portfolio = () => {
  const [student, setStudent] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch student profile and projects
    const fetchData = async () => {
      try {
        // Mock data for demo
        const mockStudent = {
          name: "John Doe",
          avatar: "/placeholder.svg?height=150&width=150",
          role: "Computer Science Student",
          bio: "Passionate about sustainable technology and creating solutions that make a positive impact on the world. Focused on developing applications that address the UN Sustainable Development Goals.",
          location: "New York, USA",
          email: "john.doe@example.com",
          website: "johndoe.dev",
          github: "github.com/johndoe",
          skills: ["React", "Node.js", "Python", "Machine Learning", "UI/UX Design", "Sustainable Development"],
          education: [
            {
              institution: "University of Technology",
              degree: "Bachelor of Science in Computer Science",
              year: "2020 - Present",
            },
          ],
        }

        // Reuse the same projects from dashboard
        const mockProjects = [
          {
            id: 1,
            title: "Eco-Friendly Smart Home System",
            description:
              "A sustainable smart home system that reduces energy consumption and promotes eco-friendly living.",
            image: "/placeholder.svg?height=200&width=300",
            status: "In Progress",
            sdgs: [7, 11, 13],
            rating: 4.5,
            comments: 12,
            views: 245,
            likes: 56,
            github: "https://github.com/username/eco-smart-home",
          },
          {
            id: 2,
            title: "Community Water Purification",
            description: "Low-cost water purification system for communities with limited access to clean water.",
            image: "/placeholder.svg?height=200&width=300",
            status: "Completed",
            sdgs: [3, 6, 10],
            rating: 4.8,
            comments: 24,
            views: 312,
            likes: 89,
            github: "https://github.com/username/water-purification",
          },
          {
            id: 3,
            title: "Educational AR Application",
            description: "Augmented reality application for interactive learning experiences in STEM subjects.",
            image: "/placeholder.svg?height=200&width=300",
            status: "Draft",
            sdgs: [4, 9],
            rating: 3.9,
            comments: 5,
            views: 120,
            likes: 32,
            github: null,
          },
        ]

        setStudent(mockStudent)
        setProjects(mockProjects)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF2F2]">
        <StudentNavbar />
        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded mb-8 w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
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
                src={student.avatar || "/placeholder.svg"}
                alt={student.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                <p className="text-gray-600">{student.role}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <a
                  href="/portfolio/edit"
                  className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner transition-all duration-300 ease-in-out"
                >
                  Edit Portfolio
                </a>
                <a
                  href="/portfolio/download"
                  className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out flex items-center"
                >
                  <Download size={18} className="mr-2" />
                  Export PDF
                </a>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{student.bio}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                {student.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2" />
                {student.email}
              </div>
              {student.website && (
                <div className="flex items-center text-gray-600">
                  <Globe size={18} className="mr-2" />
                  {student.website}
                </div>
              )}
              {student.github && (
                <div className="flex items-center text-gray-600">
                  <GitHub size={18} className="mr-2" />
                  {student.github}
                </div>
              )}
            </div>

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

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Education</h3>
              {student.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <h4 className="font-medium text-gray-800">{edu.institution}</h4>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Projects</h2>
            <a href="/portfolio/projects" className="text-[#A9B5DF] hover:underline text-sm flex items-center">
              <FileText size={16} className="mr-2" />
              Manage Projects
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio

