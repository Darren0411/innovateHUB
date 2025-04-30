InnovateHUB
🌐 Creative Coding Showcase Platform
innovateHUB is a web-based platform built to showcase student projects developed during the "Creative Coding Using Python" course. The goal is to provide students a stage to demonstrate their creativity while aligning their work with the United Nations Sustainable Development Goals (SDGs).

🧩 Problem Statement
Creative Coding Showcase Platform for "Creative Coding Using Python" Projects

The platform is designed to:

Display creative projects like animations, games, websites, videos, documentaries, and digital art.

Map each student project to specific Sustainable Development Goals (SDGs).

Offer tailored views and functionalities for students, faculty coordinators, admins, and management.

Enable peer evaluation, mentorship, feedback, and project progress tracking.

🚀 Features
Student portfolio and project uploads

SDG tagging and filtering

Faculty and admin panels for oversight

Peer review and feedback system

Mentorship and progress tracking

Multi-role authentication and dashboard views

🛠️ Tech Stack
Frontend: React

Backend: Node.js, Express.js

Database: MongoDB (or Mongoose ORM)

Authentication: JWT 

🧑‍💻 How to Set Up the Project Locally
Prerequisites
Make sure you have the following installed:

Node.js

MongoDB

Git

Installation Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/9096467169/innovateHUB.git
cd innovateHUB
Install backend dependencies:

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root directory and add your configuration:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/innovateHUB
JWT_SECRET=your_jwt_secret_here
Start the server:

bash
Copy
Edit
npm start
(Optional) Start frontend if applicable:
If the frontend is in a different directory (like client/), navigate and run:

bash
Copy
Edit
cd client
npm install
npm start
📁 Project Structure (Example)
bash
Copy
Edit
innovateHUB/
│
├── models/              # Mongoose schemas
├── routes/              # Express route handlers
├── controllers/         # Logic for each route
├── public/              # Static assets
├── views/               # HTML templates (if using server-side rendering)
├── client/              # Frontend code (if using React/Vue/etc.)
├── .env                 # Environment variables
├── server.js            # Entry point for backend
└── README.md
📌 Future Enhancements
Integration with SDG API for real-time mapping

Analytics dashboard for faculty and admins

Public view for showcasing top projects

Real-time chat or comment section for feedback

🤝 Contributing
Pull requests are welcome! If you want to contribute:

Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes

Push to the branch

Open a Pull Request

📜 License
This project is licensed under the MIT License.


[Presentation link](https://www.canva.com/design/DAGmFv-2szY/fd3J8nce7f8Owf8Tk2NJ_w/edit?utm_content=DAGmFv-2szY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

[Demo video link](https://www.loom.com/share/0f186bee017049569d403780da3ec1c0?sid=3a8f1026-8d99-45c2-bdf0-791fbdaed06d)


