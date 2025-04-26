import React, { useState, useEffect } from "react";
import axios from "axios";
import FacultyNavbar from "../../components/FacultyNavbar";
import { Search, Filter, Heart, MessageSquare, Folder, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MentorStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:9000/faculty/faculty-projects-students",
          { withCredentials: true }
        );
        
        if (response.data && Array.isArray(response.data)) {
          const studentMap = new Map();
          
          response.data.forEach(project => {
            if (project.creator) {
              const studentId = project.creator._id;
              if (!studentMap.has(studentId)) {
                studentMap.set(studentId, {
                  ...project.creator,
                  projectsCount: 1,
                  totalLikes: project.likes || 0,
                  lastLogin: project.creator.updatedAt 
                    ? new Date(project.creator.updatedAt).toLocaleDateString() 
                    : "Recently",
                  status: "Active",
                  skills: project.creator.skills || []
                });
              } else {
                const existingStudent = studentMap.get(studentId);
                studentMap.set(studentId, {
                  ...existingStudent,
                  projectsCount: existingStudent.projectsCount + 1,
                  totalLikes: existingStudent.totalLikes + (project.likes || 0)
                });
              }
            }
          });
          
          setStudents(Array.from(studentMap.values()));
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All Roles" || (student.role || "Student").toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "All Statuses" || student.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewProfile = (studentId) => {
    navigate(`/portfolio/${studentId}`);
  };


  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <FacultyNavbar />
        <div className="pt-16 p-6 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700">Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
        <FacultyNavbar />
        <div className="pt-16 p-6 container mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <strong>Error: </strong> {error}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF2F2" }}>
      <FacultyNavbar />
      
      <div className="pt-16 p-6 container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Management</h1>
        
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">All Students</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {students.length} students
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
          </div>
        </div>
        
        {filteredStudents.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-lg text-gray-600">No students found matching your criteria</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("All Roles");
                setStatusFilter("All Statuses");
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={student.ProfileUrl ? `http://localhost:9000${student.ProfileUrl}` : "/default-profile.png"} 
                              alt={student.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/default-profile.png";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                            {student.rollNo && (
                              <div className="text-xs text-gray-400">Roll No: {student.rollNo}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          student.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : student.status === "Inactive" 
                              ? "bg-red-100 text-red-800" 
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.projectsCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-red-500 mr-1" fill="currentColor" />
                          <span className="text-sm text-gray-900">{student.totalLikes}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.lastLogin}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewProfile(student._id)}
                            className="flex items-center text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                            title="View Profile"
                          >
                            <User className="h-4 w-4 mr-1" />
                            Profile
                          </button>
                         
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorStudents;