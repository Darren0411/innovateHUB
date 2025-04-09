"use client"

import { useState } from "react"
import { Upload, X, Plus } from "lucide-react"
import SDGSelector from "./SDGSelector"
import GitHubIntegration from "./GithubIntegration"

const ProjectForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    sdgs: initialData.sdgs || [],
    status: initialData.status || "Draft",
    thumbnail: initialData.thumbnail || null,
    media: initialData.media || [],
    github: initialData.github || null,
    ...initialData,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSDGChange = (sdgs) => {
    setFormData((prev) => ({ ...prev, sdgs }))
  }

  const handleGitHubConnect = (repo) => {
    setFormData((prev) => ({ ...prev, github: repo }))
  }

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real app, you would upload this to your server/cloud storage
      // For demo, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, thumbnail: { file, url: imageUrl } }))
    }
  }

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // Create local URLs for preview
      const newMedia = files.map((file) => ({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        file,
        url: URL.createObjectURL(file),
        type: file.type.startsWith("image/") ? "image" : "video",
      }))

      setFormData((prev) => ({
        ...prev,
        media: [...prev.media, ...newMedia],
      }))
    }
  }

  const removeMedia = (id) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((item) => item.id !== id),
    }))
  }

  const removeThumbnail = () => {
    setFormData((prev) => ({ ...prev, thumbnail: null }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "Project thumbnail is required"
    }

    if (formData.sdgs.length === 0) {
      newErrors.sdgs = "Please select at least one SDG"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would handle file uploads and form submission
      // For demo, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSubmit(formData)
    } catch (error) {
      console.error("Error submitting project:", error)
      setErrors((prev) => ({ ...prev, form: "Failed to submit project. Please try again." }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{errors.form}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6 md:col-span-1">
          {/* Basic Information */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF] ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter project title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF] ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe your project..."
            ></textarea>
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Project Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* SDG Selector */}
          <div>
            <SDGSelector selectedSDGs={formData.sdgs} onChange={handleSDGChange} />
            {errors.sdgs && <p className="mt-1 text-sm text-red-600">{errors.sdgs}</p>}
          </div>
        </div>

        <div className="space-y-6 md:col-span-1">
          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Thumbnail</label>
            {formData.thumbnail ? (
              <div className="relative">
                <img
                  src={formData.thumbnail.url || "/placeholder.svg"}
                  alt="Thumbnail preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  errors.thumbnail ? "border-red-500" : "border-gray-300"
                }`}
              >
                <div className="space-y-2">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label
                      htmlFor="thumbnail-upload"
                      className="relative cursor-pointer text-[#A9B5DF] hover:underline"
                    >
                      <span>Upload a thumbnail</span>
                      <input
                        id="thumbnail-upload"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleThumbnailUpload}
                      />
                    </label>
                    <p>or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            )}
            {errors.thumbnail && <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>}
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Media (Images & Videos)</label>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {formData.media.map((item) => (
                <div key={item.id} className="relative">
                  {item.type === "image" ? (
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt="Media preview"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <video src={item.url} className="w-full h-24 object-cover rounded-lg" controls />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(item.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label
                htmlFor="media-upload"
                className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-24 cursor-pointer hover:bg-gray-50"
              >
                <div className="text-center">
                  <Plus className="mx-auto h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-500">Add Media</span>
                  <input
                    id="media-upload"
                    name="media"
                    type="file"
                    accept="image/*,video/*"
                    className="sr-only"
                    multiple
                    onChange={handleMediaUpload}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* GitHub Integration */}
          <GitHubIntegration projectId={initialData.id} currentRepo={formData.github} onConnect={handleGitHubConnect} />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9B5DF]"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[#A9B5DF] text-white rounded-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A9B5DF]"
        >
          {isSubmitting ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm

