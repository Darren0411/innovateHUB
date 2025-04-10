import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [facultyDetails, setFacultyDetails] = useState({
    department: "",
    instituteName: "",
    licenseNumber: "",
  });
  const [skills, setSkills] = useState(""); // Comma-separated input
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      navigate("/user/login");
    }
  }, [role, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) formData.append("profilePic", profilePic);

    if (role === "student") {
      formData.append("rollNo", rollNo);
      formData.append(
        "skills",
        JSON.stringify(skills.split(",").map((s) => s.trim()))
      ); // Convert comma-separated string to array
      formData.append("githubUrl", githubUrl);
      formData.append("linkedinUrl", linkedinUrl);
    } else if (role === "faculty") {
      formData.append("teacherDetails", JSON.stringify(facultyDetails));
    }

    try {
      await axios.post("http://localhost:9000/user/signup", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/user/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            placeholder="Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />

          {role === "student" && (
            <>
              <input
                type="text"
                placeholder="Roll No"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </>
          )}

          {role === "faculty" && (
            <>
              <input
                type="text"
                placeholder="Department"
                value={facultyDetails.department}
                onChange={(e) =>
                  setFacultyDetails({
                    ...facultyDetails,
                    department: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Institute Name"
                value={facultyDetails.instituteName}
                onChange={(e) =>
                  setFacultyDetails({
                    ...facultyDetails,
                    instituteName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="License Number"
                value={facultyDetails.licenseNumber}
                onChange={(e) =>
                  setFacultyDetails({
                    ...facultyDetails,
                    licenseNumber: e.target.value,
                  })
                }
                className="w-full p-2 border rounded-lg"
                required
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/user/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
