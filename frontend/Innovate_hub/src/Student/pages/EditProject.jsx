import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StudentNavbar from "../StudendNavbar";


const techOptions = [
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Django",
  "Flask",
  "Ruby on Rails",
  "PHP",
];

const categories = [
    "Web Development",
    "Mobile App",
    "Game",
    "Animation",
    "Video/Documentary",
    "Creative Art",
    "Data Visualization",
    "Machine Learning/AI",
    "IoT/Hardware",
    "Educational Tool",
    "Utility/Tool",
    "Social Impact",
    "Other",
  ];



const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    githubUrl: "", 
    deployedUrl: "",
    techStack: [],
    sdgs: [],
    category: "",
  });
  
  const [previewImage, setPreviewImage] = useState("");
  const [readmeFetched, setReadmeFetched] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/projects/${id}`);
        const data = res.data;
        const p = data.project;

        setForm({
          title: p.title || "",
          category: p.category || "",
          githubUrl: p.githubRepoUrl || "",
          description: p.readMe || "",
          techStack: p.techStack || [],
          deployedUrl: p.deployedUrl || "",
          sdgs: p.sdgMapping || [],
          image: null,
        });

        setPreviewImage(`http://localhost:9000/${p.projectImage}`);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSDGCheckbox = (e) => {
    const { value, checked } = e.target;
    const num = parseInt(value);
    setForm((prev) => ({
      ...prev,
      sdgs: checked
        ? [...prev.sdgs, num]
        : prev.sdgs.filter((item) => item !== num),
    }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      techStack: checked
        ? [...prev.techStack, value]
        : prev.techStack.filter((item) => item !== value),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const fetchReadme = async () => {
    try {
      const urlParts = form.githubUrl.split("/");
      const username = urlParts[3];
      const repo = urlParts[4];
      const res = await axios.get(
        `https://raw.githubusercontent.com/${username}/${repo}/main/README.md`
      );
      setForm((prev) => ({ ...prev, description: res.data }));
      setReadmeFetched(true);
    } catch (err) {
      console.error("Error fetching README:", err);
      setReadmeFetched(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedData = {
      title: form.title,
      readMe: form.description, // ← MAPPING this correctly
      githubRepoUrl: form.githubUrl, // ← MAPPING this correctly
      deployedUrl: form.deployedUrl,
      techStack: form.techStack,
      sdgMapping: form.sdgs, // ← MAPPING this correctly
      category: form.category,
    };
  
    try {
      await axios.put(
        `http://localhost:9000/student/projects/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-pink-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Edit Your Project
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Update your creative coding project details
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Title */}
            <div>
              <label className="block font-semibold mb-1">
                Project Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter a descriptive title for your project"
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>

            {/* Category & GitHub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">
                  Project Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">
                  GitHub Repository URL<span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={form.githubUrl}
                  onChange={handleChange}
                  onBlur={fetchReadme}
                  placeholder="https://github.com/yourusername/project-repo"
                  className="w-full border border-gray-300 p-3 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block font-semibold mb-1">
                Project Description{" "}
                <span className="text-sm text-gray-500">
                  (Auto-filled from GitHub README)
                </span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="6"
                className="w-full border border-gray-300 p-3 rounded-md"
                required
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block font-semibold mb-3">
                Tech Stack Used
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {techOptions.map((tech) => (
                  <label
                    key={tech}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={tech}
                      checked={form.techStack.includes(tech)}
                      onChange={handleCheckbox}
                    />
                    <span>{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Deployed URL */}
            <div>
              <label className="block font-semibold mb-1">Deployed URL</label>
              <input
                type="url"
                name="deployedUrl"
                value={form.deployedUrl}
                onChange={handleChange}
                placeholder="https://yourprojectsite.com"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
            </div>

            {/* SDG Goals */}
            <div>
              <label className="block font-semibold mb-2">
                Sustainable Development Goals
              </label>
              <p className="text-sm text-gray-500 mb-2">
                Select the UN Sustainable Development Goals your project
                addresses:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
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
                ].map((goal, i) => (
                  <label
                    key={i + 1}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      value={goal}
                      checked={form.sdgs.includes(goal)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setForm((prev) => ({
                          ...prev,
                          sdgs: checked
                            ? [...prev.sdgs, value]
                            : prev.sdgs.filter((item) => item !== value),
                        }));
                      }}
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Image */}
            <div>
              <label className="block font-semibold mb-2">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-2"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-48 object-contain rounded-md border"
                />
              )}
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold"
              >
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProject;
