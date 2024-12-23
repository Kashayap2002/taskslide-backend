# TaskSlide Backend

TaskSlide is a task management application designed to help users organize their tasks with time-based features. This document outlines the backend of the application, providing detailed explanations of its structure, code functionalities, database schema, and the connection between backend, frontend, and database.

---

## Overview
The backend of TaskSlide is built using **Node.js** and **Express.js**, with **MySQL** as the database. It implements a secure JWT-based authentication system, task management functionalities, and serves as the backbone of the application.

---

## Folder Structure

backend/
├── config/               
│   └── db.js             # MySQL database connection
├── middleware/           
│   └── authMiddleware.js # JWT authentication middleware
├── models/               
│   └── user.js           # User model with database queries
├── routes/               
│   ├── authRoutes.js     # Routes for user authentication
│   └── taskRoutes.js     # Routes for task management
├── utils/                
│   └── hashPassword.js   # Utility for generating hashed passwords
├── node_modules/         # Node.js dependencies
├── app.js                # Entry point for the backend application
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Auto-generated dependency tree lock file
└── README.md             # Project documentation

## Architecture Overview

### High-Level Workflow
1. **Frontend (React)**: Handles user interface and sends requests to the backend.
2. **Backend (Node.js + Express.js)**:
   - Manages API endpoints for user authentication and task management.
   - Interacts with the MySQL database using `mysql2` for storing user and task data.
3. **Database (MySQL)**: Stores persistent data including user details and tasks.

### Architecture Diagram

Frontend (React)
   |
   | HTTP Requests (Axios)
   ↓
Backend (Node.js + Express.js)
   |
   | SQL Queries (mysql2)
   ↓
Database (MySQL) 

---

## Key Features

1. **User Authentication**:
   - **Register**: Creates new users and hashes passwords securely using `bcrypt`.
   - **Login**: Verifies user credentials and generates a JWT token for authentication.
   - **JWT Middleware**: Protects sensitive routes by validating tokens in requests.

2. **Task Management**:
   - **Add Task**: Allows users to create tasks with titles and timestamps.
   - **Fetch Tasks**: Retrieves tasks for the logged-in user, ordered by the earliest task.
   - **Mark as Done**: Deletes tasks marked as completed.

3. **Modular Design**:
   - Separate folders for database configuration, middleware, models, routes, and utilities ensure the project is scalable and maintainable.
   - Easy to extend functionalities or integrate new features.

---

## Database Schema

### Users Table
| Column     | Type         | Description               |
|------------|--------------|---------------------------|
| id         | INT (PK)     | Unique user identifier    |
| username   | VARCHAR(255) | User's name               |
| email      | VARCHAR(255) | User's email address      |
| password   | VARCHAR(255) | Encrypted user password   |

### Tasks Table
| Column     | Type         | Description                     |
|------------|--------------|---------------------------------|
| id         | INT (PK)     | Unique task identifier          |
| title      | VARCHAR(255) | Task title                      |
| time       | DATETIME     | Scheduled time for the task     |
| user_id    | INT (FK)     | Foreign key referencing `users` |

---

## Backend API Endpoints

### Authentication Endpoints
- **POST /api/auth/register**
  - Registers a new user.
  - Request Body:
    ```json
    {
      "username": "JohnDoe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **POST /api/auth/login**
  - Logs in a user and returns a JWT token.
  - Request Body:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### Task Management Endpoints
- **POST /api/tasks**
  - Adds a new task for the logged-in user.
  - Protected Route: Requires JWT in headers.
  - Request Body:
    ```json
    {
      "title": "Complete project",
      "time": "2024-12-25T12:00:00"
    }
    ```

- **GET /api/tasks**
  - Fetches all tasks for the logged-in user.
  - Protected Route: Requires JWT in headers.

- **DELETE /api/tasks/:id**
  - Deletes a task marked as completed.
  - Protected Route: Requires JWT in headers.

---

## How to Set Up and Run the Backend Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Kashayap2002/taskslide-backend.git
   cd taskslide-backend
2. **Install Dependencies**:
   Run the following command to install all the required dependencies for the backend:
   ```bash
   npm install
## Set Up the Database

Follow these steps to set up the MySQL database for the TaskSlide backend:

1. **Ensure MySQL is Installed**:
   - Install and run MySQL on your local system.
   - Use MySQL Workbench or any other preferred MySQL client for database management.

2. **Create a Database**:
   - Open your MySQL client and execute the following command to create a new database:
     ```sql
     CREATE DATABASE taskslide;
     ```

3. **Configure Database Connection**:
   - Update the database credentials in `config/db.js` to match your local setup:
     ```javascript
     const pool = mysql.createPool({
         host: 'localhost',
         user: 'your_mysql_user',      // Replace with your MySQL username
         password: 'your_mysql_password', // Replace with your MySQL password
         database: 'taskslide',
         port: 3306
     });
     module.exports = pool.promise();
     ```

4. **Create Tables**:
   - Execute the following SQL commands to create the required tables in the `taskslide` database:
     ```sql
     CREATE TABLE users (
         id INT AUTO_INCREMENT PRIMARY KEY,
         username VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL
     );

     CREATE TABLE tasks (
         id INT AUTO_INCREMENT PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         time DATETIME NOT NULL,
         user_id INT NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id)
     );
     ```

5. **Run the Server**:
   - Navigate to the backend directory in your terminal and start the server:
     ```bash
     node app.js
     ```
   - Once the server is running, the backend API will be available at:
     ```
     http://localhost:5000
     ```

# Workflow of TaskSlide

## User Registration and Login
- **Registration**: New users can register through the `/api/auth/register` endpoint, which securely stores their credentials in the database.
- **Login**: Registered users can log in through `/api/auth/login` to receive a JWT token for secure communication.

## Task Management
- **Create Tasks**: Users can create tasks via the `/api/tasks` endpoint by attaching a title and a scheduled time.
- **Fetch Tasks**: The `/api/tasks` (GET) endpoint allows users to fetch all their tasks, sorted by the scheduled time.
- **Complete Tasks**: Completed tasks can be deleted via the `/api/tasks/:id` endpoint.

## Data Flow
- **Frontend to Backend**: The frontend communicates with the backend API via HTTP requests using Axios.
- **Backend to Database**: The backend processes these requests, interacts with the MySQL database, and sends the appropriate responses back to the frontend.

---

# Future Enhancements

1. **Add Task Editing**:
   - Allow users to edit the title and time of their tasks after creation.

2. **Notification System**:
   - Notify users of upcoming tasks through email or push notifications for better task management.

3. **Analytics**:
   - Provide insights into task completion rates and productivity trends to help users stay organized.

4. **Mobile App**:
   - Extend the functionality to mobile platforms to offer better accessibility and user experience.

---

# Contact and Support
For any issues, suggestions, or contributions, feel free to open an issue in the [repository](https://github.com/Kashayap2002/taskslide-backend).

---



