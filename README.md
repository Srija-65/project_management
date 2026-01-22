# 📌 Project Management Utility (MERN Stack)

A simple full-stack Project Management Utility built using the MERN stack  
(MongoDB, Express.js, React, Node.js).

This application demonstrates:
- CRUD operations
- SDLC phase tracking (Kanban-style)
- Task movement history
- Basic backend security practices
- Clean and intuitive UI

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) tasks  
- Kanban-style board with SDLC phases  
- Track task movement history across phases  
- Persist tasks in MongoDB  
- REST API with Express.js  
- Inline task history view  
- Simple three-dot menu for task actions  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- CORS

---

## 🗂 Folder Structure

# 📌 Project Management Utility (MERN Stack)

A simple full-stack Project Management Utility built using the MERN stack  
(MongoDB, Express.js, React, Node.js).

This application demonstrates:
- CRUD operations
- SDLC phase tracking (Kanban-style)
- Task movement history
- Basic backend security practices
- Clean and intuitive UI

---

## 🚀 Features

- Create, Read, Update, Delete (CRUD) tasks  
- Kanban-style board with SDLC phases  
- Track task movement history across phases  
- Persist tasks in MongoDB  
- REST API with Express.js  
- Inline task history view  
- Simple three-dot menu for task actions  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- CORS

---

## 🗂 Folder Structure

sdlc/
├── backend/
│ ├── models/
│ │ ├── Task.js
│ │ └── users.js
│ ├── routes/
│ │ └── taskRoutes.js
│ ├── index.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ └── App.jsx
│ ├── index.html
│ └── package.json
│
├── .gitignore
└── README.
⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Srija-65/project_management.git
cd project_management
Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
PORT=5000


Run backend:

npx nodemon index.js


Backend runs at:
http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:
http://localhost:5173

🔄 SDLC Phase Mapping

The Kanban columns represent SDLC phases:

Phase	SDLC Meaning
To Do	Requirements / Planning
In Progress	Development
Testing	QA / Verification
Done	Deployment / Completion

Tasks move left → right as they progress through the SDLC.

📜 Task History Tracking

Each time a task changes status, a new history entry is added in MongoDB:

{
  "status": "In Progress",
  "changedAt": "2026-01-22T13:53:01.176Z"
}


This history is visible inline in the UI under each task card.

👤 User Schema

A simple User model is used to associate tasks with a user.

Example user document:

{
  "name": "Demo User",
  "email": "demo@gmail.com"
}


Each task stores a reference to a user using userId.

🔐 Basic Security

CORS enabled

Secrets stored in .env

.env excluded via .gitignore

Backend validates required fields

🛠 Design Decisions

Used a Kanban layout to visually map SDLC phases

Used MongoDB sub-documents for task history

Kept UI minimal and readable

No authentication to keep scope simple

Manual demo user for task ownership