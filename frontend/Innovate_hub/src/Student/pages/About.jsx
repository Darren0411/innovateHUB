"use client";

import { FaStar } from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
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
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-white rounded-xl p-8 shadow-md">
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

            <div className="bg-white rounded-xl p-8 shadow-md">
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
    </>
  );
};

export default AboutPage;