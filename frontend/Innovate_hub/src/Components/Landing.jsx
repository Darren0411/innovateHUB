"use client";

import { useState, useEffect } from "react";
import {
  FaSearch,
  FaArrowRight,
  FaStar,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Landing = () => {
  // State for featured projects (placeholder data)
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API calls when backend is ready
        // const response = await fetch('http://localhost:9000/api/featured-projects');
        // const data = await response.json();
        // setFeaturedProjects(data);

        // Placeholder data for now
        setFeaturedProjects([
          {
            id: 1,
            title: "Interactive Animation",
            type: "Animation",
            sdg: "Quality Education",
            rating: 4.8,
            image:
              "http://static1.squarespace.com/static/5c3efe28620b85867727f998/t/5de57665e59abc3a72ddef84/1575319152244/blog+photo1.jpg?format=1500w",
          },
          {
            id: 2,
            title: "Climate Change Visualization",
            type: "Data Visualization",
            sdg: "Climate Action",
            rating: 4.7,
            image:
              "https://www.climatecouncil.org.au/wp-content/uploads/2018/08/Climate-change-for-kids.jpg",
          },
          {
            id: 3,
            title: "Sustainable City Game",
            type: "Game",
            sdg: "Sustainable Cities",
            rating: 4.9,
            image:
              "https://aoarchitect.us/wp-content/uploads/2018/07/wetown-avoid-obvious-farmers-raingarden.jpg",
          },
          {
            id: 4,
            title: "Ocean Cleanup Simulator",
            type: "Interactive",
            sdg: "Life Below Water",
            rating: 4.6,
            image:
              "https://tse4.mm.bing.net/th?id=OIP.IFMl7h22Nz6Q-AGR0S7sHQAAAA&pid=Api&P=0&h=180",
          },
        ]);

        setTrendingProjects([
          {
            id: 5,
            title: "AI for Good",
            type: "Web App",
            sdg: "Partnerships for the Goals",
            rating: 4.5,
            views: 1250,
            image:
              "https://cdn.pixabay.com/photo/2024/03/22/14/34/ai-generated-8649777_1280.jpg",
          },
          {
            id: 6,
            title: "Renewable Energy Tracker",
            type: "Dashboard",
            sdg: "Affordable and Clean Energy",
            rating: 4.7,
            views: 980,
            image:
              "https://tse4.mm.bing.net/th?id=OIP.oyhIcZk-lCX7lvdjvqI0cAHaEK&pid=Api&P=0&h=180",
          },
          {
            id: 7,
            title: "Gender Equality Documentary",
            type: "Documentary",
            sdg: "Gender Equality",
            rating: 4.8,
            views: 1560,
            image:
              "https://tse4.mm.bing.net/th?id=OIP.hil88Ac1wqYeWUkJCslOpgHaE4&pid=Api&P=0&h=180",
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Project types for filter
  const projectTypes = [
    "All",
    "Animation",
    "Game",
    "Website",
    "Documentary",
    "Digital Art",
    "Data Visualization",
  ];

  // SDGs for filter
  const sdgOptions = [
    "All SDGs",
    "No Poverty",
    "Zero Hunger",
    "Good Health and Well-being",
    "Quality Education",
    "Gender Equality",
    "Clean Water and Sanitation",
    "Affordable and Clean Energy",
    "Decent Work and Economic Growth",
    "Industry, Innovation and Infrastructure",
    "Reduced Inequality",
    "Sustainable Cities and Communities",
    "Responsible Consumption and Production",
    "Climate Action",
    "Life Below Water",
    "Life on Land",
    "Peace, Justice and Strong Institutions",
    "Partnerships for the Goals",
  ];

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#A9B5DF] to-[#FFF2F2] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white "></div>
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-white "></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-white "></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full bg-white "></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
            Creative Coding Showcase Platform
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700">
            Explore, Create, and Showcase Your Innovation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
              Browse Projects
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 ">
          <svg
            className="w-10 h-10 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path> */}
          </svg>
        </div>
      </section>

      {/* About the Platform */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
              About the Platform
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              The Creative Coding Showcase Platform is designed for students in
              the "Creative Coding Using Python" course to display their
              innovative projects. Our platform bridges the gap between academic
              learning and real-world impact by mapping creative works to
              Sustainable Development Goals (SDGs).
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you're a student looking to showcase your work, a faculty
              member guiding the next generation of creators, or an industry
              professional seeking fresh talent, our platform provides a space
              for collaboration, learning, and growth.
            </p>
            <div className="mt-10 inline-block bg-[#A9B5DF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8a96c0] transition duration-300">
              Learn More About SDG Integration
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-20 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Featured Projects
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className=" rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A9B5DF]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-[#A9B5DF] text-white text-xs rounded-full">
                        {project.type}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {project.rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      SDG: {project.sdg}
                    </p>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center transition duration-300">
                      View Project <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-100 text-[#A9B5DF] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg border border-[#A9B5DF]">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Panel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Find Projects
          </h2>

          <div className="max-w-4xl mx-auto bg-[#FFF2F2] rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="project-type"
                >
                  Project Type
                </label>
                <select
                  id="project-type"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                >
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sdg-goal"
                >
                  SDG Goal
                </label>
                <select
                  id="sdg-goal"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                >
                  {sdgOptions.map((sdg, index) => (
                    <option key={index} value={sdg}>
                      {sdg}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="rating"
                >
                  Minimum Rating
                </label>
                <select
                  id="rating"
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                >
                  <option value="0">All Ratings</option>
                  <option value="3">3+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by project name or keywords..."
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#A9B5DF] text-white px-4 py-1 rounded-lg hover:bg-[#8a96c0] transition duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard & Trending Projects */}
      <section className="py-20 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Trending Projects
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className=" rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A9B5DF]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {trendingProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden relative"
                >
                  <div className="absolute top-4 left-4 z-10 bg-[#A9B5DF] text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center">
                    #{index + 1}
                  </div>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      SDG: {project.sdg}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {project.type}
                      </span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">
                          {project.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {project.views} views
                      </span>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button className="bg-white hover:bg-gray-100 text-[#A9B5DF] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg border border-[#A9B5DF]">
              View Leaderboard
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-[#FFF2F2] rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                For Students
              </h3>
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Create an Account
                    </h4>
                    <p className="text-gray-600">
                      Sign up using your student credentials to access the
                      platform.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Upload Your Project
                    </h4>
                    <p className="text-gray-600">
                      Submit your code, documentation, and a preview of your
                      creative work.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Map to SDGs</h4>
                    <p className="text-gray-600">
                      Connect your project to relevant Sustainable Development
                      Goals.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Receive Feedback</h4>
                    <p className="text-gray-600">
                      Get valuable insights from peers, faculty, and industry
                      professionals.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                For Faculty & Mentors
              </h3>
              <ul className="space-y-6">
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Register as Faculty
                    </h4>
                    <p className="text-gray-600">
                      Create an account with faculty credentials for evaluation
                      access.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Browse Student Projects
                    </h4>
                    <p className="text-gray-600">
                      View submissions from your students or across departments.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      Provide Evaluation
                    </h4>
                    <p className="text-gray-600">
                      Offer constructive feedback and grade projects based on
                      criteria.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#A9B5DF] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Mentor Students</h4>
                    <p className="text-gray-600">
                      Connect directly with students to guide their creative
                      process.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            Testimonials & Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#A9B5DF] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sarah Johnson</h4>
                  <p className="text-gray-600">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This platform helped me showcase my interactive data
                visualization project to potential employers. I received
                valuable feedback from industry professionals and even got an
                internship offer!"
              </p>
              <div className="mt-4 flex">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#A9B5DF] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  P
                </div>
                <div>
                  <h4 className="font-bold text-lg">Prof. Michael Chen</h4>
                  <p className="text-gray-600">Faculty Mentor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a faculty member, this platform has transformed how I
                evaluate student projects. The SDG mapping feature helps
                students understand the real-world impact of their work."
              </p>
              <div className="mt-4 flex">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#A9B5DF] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-lg">Rachel Torres</h4>
                  <p className="text-gray-600">Industry Partner</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "We've discovered amazing talent through this platform. The
                quality of projects and the innovative approaches to
                sustainability challenges have impressed our entire team."
              </p>
              <div className="mt-4 flex">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration & Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-[#A9B5DF] rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 text-white">
                <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
                <p className="mb-6">
                  Whether you're a student, faculty member, or industry
                  professional, we invite you to join our growing community of
                  creative coders making an impact through technology.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-[#A9B5DF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <span>contact@creativecoding.edu</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                      <svg
                        className="w-5 h-5 text-[#A9B5DF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                    </div>
                    <span>(555) 123-4567</span>
                  </div>
                </div>
                <div className="mt-8 flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A9B5DF] hover:bg-gray-100 transition duration-300"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A9B5DF] hover:bg-gray-100 transition duration-300"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A9B5DF] hover:bg-gray-100 transition duration-300"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#A9B5DF] hover:bg-gray-100 transition duration-300"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              <div className="bg-white p-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Become an Industry Partner
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="company"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                      placeholder="Your Company"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                      placeholder="How would you like to collaborate?"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#A9B5DF] hover:bg-[#8a96c0] text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
