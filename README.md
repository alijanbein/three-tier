# Three-Tier Web Application

This project is a simple three-tier web application that I built for a school exercise.  
It consists of:

- **Frontend:** A React application that displays data from the backend.  
- **Backend:** A Node.js/Express API that connects to a MongoDB database.  
- **Database:** MongoDB running in Docker, storing user or message data.  

All three components are containerized using Docker and can communicate with each other.

---

## **Folder Structure**

three-tier-app/
├── backend/ # Node.js backend
├── frontend/ # React frontend
├── docker-compose.yml
└── README.md

Before running the app, make sure you have:

- **Docker** installed on your computer.
- **Docker Compose** installed (usually comes with Docker Desktop).
- Optional: Node.js if you want to run frontend or backend locally without Docker.

---

## **Setup and Run**

1. **Clone the repository:**

```bash
git clone <your-repo-link>
cd three-tier-app

run docker-compose up --build
