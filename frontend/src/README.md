📌 Project Management Utility (MERN Stack)

A simple full-stack Project Management Utility built using the MERN stack
(MongoDB, Express.js, React, Node.js).
This application demonstrates CRUD operations, SDLC phase tracking, and task history logging.

🚀 Features

Create, Read, Update, Delete (CRUD) tasks

Kanban-style board with SDLC phases

Track task movement history across phases

Persist tasks in MongoDB

REST API with Express.js

Clean and responsive React UI

🧱 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Fetch API

Backend

Node.js

Express.js

MongoDB (Mongoose)

dotenv

CORS

🗂 Folder Structure
sdlc/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── users.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-link>
cd sdlc

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend server:

npx nodemon index.js


Backend runs at:
👉 http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:
👉 http://localhost:5173

🔄 SDLC Phase Mapping
Phase	Meaning
To Do	Requirements / Planning
In Progress	Development
Testing	QA / Verification
Done	Deployment / Completion
📜 Task History Tracking

Each time a task changes its status, a new history entry is added:

{
  "status": "In Progress",
  "changedAt": "2026-01-22T13:53:01.176Z"
}


This allows viewing the full lifecycle of a task across SDLC phases.

🔐 Basic Security

CORS enabled

Environment variables used for secrets

.env excluded using .gitignore

🛠 Future Improvements

User authentication (Login/Signup)

Assign tasks to different users

Role-based access control

Drag-and-drop Kanban UI

Deployment (Render / Vercel)

API authentication (JWT)