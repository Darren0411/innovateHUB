"use client"
import { useNavigate } from "react-router-dom"
import StudentNavbar from "../StudendNavbar"
import ProjectForm from "../dashboard/ProjectForm"

const ProjectCreate = () => {
  const navigate = useNavigate()

  const handleSubmit = (formData) => {
    // In a real app, you would submit to your backend
    console.log("Submitting project:", formData)

    // Redirect to the projects page after successful creation
    navigate("/projects")
  }

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <p className="mt-1 text-sm text-gray-500">Fill in the details below to create a new project</p>
        </div>

        <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
          <ProjectForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default ProjectCreate

