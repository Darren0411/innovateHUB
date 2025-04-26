import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../StudendNavbar';

const UploadProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [githubError, setGithubError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    mentorName: '',
    readMe: '',
    githubRepoUrl: '',
    deployedUrl: '',
    projectImage: null, // Changed from media array to single image
    sdgMapping: [],
    techStack: [],
    category: ''
  });

  // Project category options
  const categoryOptions = [
    'Web Development',
    'Mobile App',
    'Game',
    'Animation',
    'Video/Documentary',
    'Creative Art',
    'Data Visualization',
    'Machine Learning/AI',
    'IoT/Hardware',
    'Educational Tool',
    'Utility/Tool',
    'Social Impact',
    'Other'
  ];

  // Tech stack options (same as before)
  const techStackOptions = [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'MongoDB', 
    'PostgreSQL', 'MySQL', 'Django', 'Flask', 'Ruby on Rails', 'PHP',
    'Laravel', 'Spring Boot', 'ASP.NET', 'GraphQL', 'AWS', 'Firebase',
    'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch', 'Flutter',
    'React Native', 'Swift', 'Kotlin', 'Go', 'Rust', 'TypeScript',
    'Next.js', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Redux',
    'WebSockets'
  ];

  // SDG options (same as before)
  const sdgOptions = [
    'No Poverty', 'Zero Hunger', 'Good Health and Well-being',
    'Quality Education', 'Gender Equality', 'Clean Water and Sanitation',
    'Affordable and Clean Energy', 'Decent Work and Economic Growth',
    'Industry, Innovation and Infrastructure', 'Reduced Inequalities',
    'Sustainable Cities and Communities', 'Responsible Consumption and Production',
    'Climate Action', 'Life Below Water', 'Life on Land',
    'Peace, Justice and Strong Institutions', 'Partnerships for the Goals'
  ];

  // Function to parse GitHub URL into owner and repo (same as before)
  const parseGithubUrl = (url) => {
    try {
      const githubRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(githubRegex);
      if (match && match.length >= 3) {
        return { owner: match[1], repo: match[2].replace('.git', '') };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Function to fetch README from GitHub (same as before)
  const fetchReadme = async (url) => {
    setIsLoadingReadme(true);
    setGithubError('');
    
    try {
      const repoInfo = parseGithubUrl(url);
      if (!repoInfo) {
        setGithubError('Invalid GitHub URL format');
        setIsLoadingReadme(false);
        return;
      }
      
      // First try to get the default README.md
      try {
        const readmeResponse = await axios.get(
          `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/README.md`
        );
        
        if (readmeResponse.data && readmeResponse.data.content) {
          const decodedContent = atob(readmeResponse.data.content);
          setFormData(prevData => ({
            ...prevData,
            readMe: decodedContent,
            title: prevData.title || repoInfo.repo.replace(/-/g, ' ')
          }));
        }
      } catch (readmeError) {
        try {
          const lowercaseReadmeResponse = await axios.get(
            `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents/readme.md`
          );
          
          if (lowercaseReadmeResponse.data && lowercaseReadmeResponse.data.content) {
            const decodedContent = atob(lowercaseReadmeResponse.data.content);
            setFormData(prevData => ({
              ...prevData,
              readMe: decodedContent,
              title: prevData.title || repoInfo.repo.replace(/-/g, ' ')
            }));
          }
        } catch (lowercaseReadmeError) {
          setGithubError('README not found in repository');
        }
      }
    } catch (error) {
      console.error('Error fetching README:', error);
      setGithubError(
        error.response?.status === 404
          ? 'Repository not found or README file does not exist'
          : 'Error fetching repository data'
      );
    } finally {
      setIsLoadingReadme(false);
    }
  };

  // Debounce function to delay README fetch (same as before)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.githubRepoUrl && formData.githubRepoUrl.includes('github.com')) {
        fetchReadme(formData.githubRepoUrl);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.githubRepoUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'githubRepoUrl') {
      setGithubError('');
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file in form data
      setFormData({ ...formData, projectImage: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSdgChange = (e) => {
    const value = e.target.value;
    if (formData.sdgMapping.includes(value)) {
      setFormData({
        ...formData,
        sdgMapping: formData.sdgMapping.filter(sdg => sdg !== value)
      });
    } else {
      setFormData({
        ...formData,
        sdgMapping: [...formData.sdgMapping, value]
      });
    }
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value;
    if (formData.techStack.includes(value)) {
      setFormData({
        ...formData,
        techStack: formData.techStack.filter(tech => tech !== value)
      });
    } else {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, value]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData object for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('mentorName', formData.mentorName);
      formDataToSend.append('readMe', formData.readMe);
      formDataToSend.append('githubRepoUrl', formData.githubRepoUrl);
      formDataToSend.append('deployedUrl', formData.deployedUrl);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('projectImage', formData.projectImage);
      
      // Append arrays
      formData.sdgMapping.forEach(sdg => formDataToSend.append('sdgMapping', sdg));
      formData.techStack.forEach(tech => formDataToSend.append('techStack', tech));

      // Make API call with FormData
      const response = await axios.post('http://localhost:9000/student/projects', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      console.log('Project submitted successfully:', response.data);
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error submitting project:', error.response?.data || error.message);
      alert('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2] py-12 px-4 sm:px-6 lg:px-8">
      <StudentNavbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-100 p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">Submit Your Project</h1>
          <p className="text-center text-gray-600 mt-2">
            Share your creative coding project with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title (same as before) */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter a descriptive title for your project"
            />
          </div>
          <div>
            <label htmlFor="mentorName" className="block text-sm font-medium text-gray-700">
              Mentor Name*
            </label>
            <input
              type="text"
              id="mentorName"
              name="mentorName"
              required
              value={formData.mentorName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter your mentor's name"
            />
            <p className="mt-1 text-xs text-gray-500">
              Please enter the name of the mentor who guided your project
            </p>
          </div>

          {/* Project Category (same as before) */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Project Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Choose the category that best describes your project
            </p>
          </div>

          {/* GitHub Repository URL (same as before) */}
          <div>
            <label htmlFor="githubRepoUrl" className="block text-sm font-medium text-gray-700">
              GitHub Repository URL*
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="url"
                id="githubRepoUrl"
                name="githubRepoUrl"
                required
                value={formData.githubRepoUrl}
                onChange={handleInputChange}
                className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                  githubError ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="https://github.com/yourusername/project-repo"
              />
              {isLoadingReadme && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
            {githubError && (
              <p className="mt-1 text-sm text-red-600">{githubError}</p>
            )}
            {!githubError && formData.readMe && (
              <p className="mt-1 text-sm text-green-600">README successfully loaded!</p>
            )}
          </div>

          {/* Project Description (ReadMe) (same as before) */}
          <div>
            <label htmlFor="readMe" className="block text-sm font-medium text-gray-700">
              Project Description* <span className="text-xs text-gray-500">(Auto-populated from GitHub README)</span>
            </label>
            <textarea
              id="readMe"
              name="readMe"
              rows="10"
              required
              value={formData.readMe}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
              placeholder={isLoadingReadme ? "Loading README from GitHub..." : "Describe your project, the problem it solves, technologies used, etc."}
            />
          </div>

          {/* Tech Stack Selection (same as before) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
              {techStackOptions.map((tech, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`tech-${index}`}
                    type="checkbox"
                    value={tech}
                    checked={formData.techStack.includes(tech)}
                    onChange={handleTechStackChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`tech-${index}`} className="ml-2 block text-sm text-gray-700">
                    {tech}
                  </label>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Select the technologies used in your project (optional)
            </p>
          </div>

          {/* Deployed URL (Optional) (same as before) */}
          <div>
            <label htmlFor="deployedUrl" className="block text-sm font-medium text-gray-700">
              Deployed URL (Optional)
            </label>
            <input
              type="url"
              id="deployedUrl"
              name="deployedUrl"
              value={formData.deployedUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://your-project-demo.com"
            />
          </div>

          {/* Project Image Upload */}
          <div>
            <label htmlFor="projectImage" className="block text-sm font-medium text-gray-700">
              Project Image*
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="projectImage"
                name="projectImage"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            {previewImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                <img 
                  src={previewImage} 
                  alt="Project preview" 
                  className="h-40 object-contain border rounded-md"
                />
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Upload a screenshot or cover image for your project
            </p>
          </div>

          {/* SDG Mapping (same as before) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sustainable Development Goals
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {sdgOptions.map((sdg, index) => (
                <div key={index} className="flex items-center">
                  <input
                    id={`sdg-${index}`}
                    type="checkbox"
                    value={sdg}
                    checked={formData.sdgMapping.includes(sdg)}
                    onChange={handleSdgChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`sdg-${index}`} className="ml-2 block text-sm text-gray-700">
                    {sdg}
                  </label>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Select the UN Sustainable Development Goals that your project addresses
            </p>
          </div>

          {/* Submit Button (same as before) */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProject;