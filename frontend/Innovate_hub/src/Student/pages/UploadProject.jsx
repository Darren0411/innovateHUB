import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);
  const [githubError, setGithubError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    readMe: '',
    githubRepoUrl: '',
    deployedUrl: '',
    media: [''],
    sdgMapping: []
  });

  // SDG options based on UN Sustainable Development Goals
  const sdgOptions = [
    'No Poverty',
    'Zero Hunger',
    'Good Health and Well-being',
    'Quality Education',
    'Gender Equality',
    'Clean Water and Sanitation',
    'Affordable and Clean Energy',
    'Decent Work and Economic Growth',
    'Industry, Innovation and Infrastructure',
    'Reduced Inequalities',
    'Sustainable Cities and Communities',
    'Responsible Consumption and Production',
    'Climate Action',
    'Life Below Water',
    'Life on Land',
    'Peace, Justice and Strong Institutions',
    'Partnerships for the Goals'
  ];

  // Function to parse GitHub URL into owner and repo
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

  // Function to fetch README from GitHub
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
          // GitHub API returns base64 encoded content
          const decodedContent = atob(readmeResponse.data.content);
          
          // Update form data with readme content
          setFormData(prevData => ({
            ...prevData,
            readMe: decodedContent,
            // Optionally set the title if it's empty
            title: prevData.title || repoInfo.repo.replace(/-/g, ' ')
          }));
        }
      } catch (readmeError) {
        // If README.md not found, try readme.md (lowercase)
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

  // Debounce function to delay README fetch
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
    
    // Clear GitHub error when URL is changed
    if (name === 'githubRepoUrl') {
      setGithubError('');
    }
  };

  const handleMediaChange = (index, value) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index] = value;
    setFormData({ ...formData, media: updatedMedia });
  };

  const addMediaField = () => {
    setFormData({ ...formData, media: [...formData.media, ''] });
  };

  const removeMediaField = (index) => {
    const updatedMedia = formData.media.filter((_, i) => i !== index);
    setFormData({ ...formData, media: updatedMedia });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty media URLs
      const cleanedData = {
        ...formData,
        media: formData.media.filter(url => url.trim() !== '')
      };

      // Make API call to your Express backend
      const response = await axios.post('http://localhost:9000/student/projects', cleanedData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log('Project submitted successfully:', response.data);
      navigate('/projects'); // Navigate to projects page on success
    } catch (error) {
      console.error('Error submitting project:', error.response?.data || error.message);
      alert('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-100 p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">Submit Your Project</h1>
          <p className="text-center text-gray-600 mt-2">
            Share your creative coding project with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Title */}
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

          {/* GitHub Repository URL */}
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

          {/* Project Description (ReadMe) */}
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

          {/* Deployed URL (Optional) */}
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

          {/* Media URLs */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Media (Screenshots/Videos)
              </label>
              <button
                type="button"
                onClick={addMediaField}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Media
              </button>
            </div>
            
            <div className="space-y-3">
              {formData.media.map((url, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleMediaChange(index, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter URL for image or video"
                  />
                  {formData.media.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMediaField(index)}
                      className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Add links to images or videos showcasing your project
            </p>
          </div>

          {/* SDG Mapping */}
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

          {/* Submit Button */}
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