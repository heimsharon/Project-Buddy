# 📡 Project-Buddy API Documentation

> **Note:**
> These API endpoints are intended for use in development mode and can be tested using API clients such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/).
> Make sure your server is running, your database is seeded with initial data, and you have a valid JWT token for authenticated routes.

---

## 🛡️ Authentication

### 🔑 POST `/api/auth/login`

- **Request:**
    `{ "email": "user@example.com", "password": "yourpassword" }`
- **Response:**
    `{ "token": "JWT_TOKEN", "user": { ... } }`
- **Errors:**
  - `401 Unauthorized`: Invalid credentials
  - `400 Bad Request`: Missing required fields

### 🆕 POST `/api/auth/signup`

- **Request:**
    `{ "username": "newuser", "email": "user@example.com", "password": "yourpassword" }`
- **Response:**
    `{ "token": "JWT_TOKEN", "user": { ... } }`
- **Errors:**
  - `400 Bad Request`: Missing or invalid fields
  - `409 Conflict`: Email already in use

---

## 📁 Projects

### 📄 GET `/api/projects`

- Get all projects for the authenticated user (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Errors:**
  - `401 Unauthorized`: Missing or invalid token

### ➕ POST `/api/projects`

- Create a new project (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "name": "New Project", "budget": 5000 }`
- **Errors:**
  - `400 Bad Request`: Missing required fields

### 📝 PUT `/api/projects/:id`

- Update a project (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "name": "Updated Project Name" }`
- **Errors:**
  - `404 Not Found`: Project not found

### ❌ DELETE `/api/projects/:id`

- Delete a project (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Errors:**
  - `404 Not Found`: Project not found

---

## 📝 Tasks

### ➕ POST `/api/projects/:projectId/tasks`

- Add a task to a project (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "title": "Install drywall", "completed": false }`

### 📝 PUT `/api/projects/:projectId/tasks/:taskId`

- Update a task (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "title": "Paint walls", "completed": true }`

### ❌ DELETE `/api/projects/:projectId/tasks/:taskId`

- Delete a task (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`

---

## 🛒 Materials

### ➕ POST `/api/projects/:projectId/materials`

- Add a material to a project (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "name": "2x4 Lumber", "quantity": 10, "price": 3.50 }`

### 📝 PUT `/api/projects/:projectId/materials/:materialId`

- Update a material (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request Example:**
    `{ "quantity": 12 }`

### ❌ DELETE `/api/projects/:projectId/materials/:materialId`

- Delete a material (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`

---

## 👤 Users

### 🙋‍♂️ GET `/api/users/me`

- Get the currently authenticated user's profile (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`

---

## 🤖 Chatbot

### 💬 POST `/api/chat`

- Ask the Project-Buddy chatbot a question (🔒 requires JWT)
- **Headers:**
    `Authorization: Bearer JWT_TOKEN`
- **Request:**
    `{ "message": "How much drywall do I need for a 10x12 room?" }`
- **Response:**
    `{ "response": "For a 10x12 room, you will need approximately..." }`

---

## 🚨 Common Errors

- `401 Unauthorized`: Missing or invalid JWT token.
- `400 Bad Request`: Missing required fields or invalid data.
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Duplicate resource (e.g., email already registered).

---

## ℹ️ Notes

- All endpoints requiring authentication expect a valid JWT in the `Authorization` header.
- Replace `:id`, `:projectId`, `:taskId`, and `:materialId` with actual IDs.
- This is a summary; see the codebase for full details and validation rules.

---

© 2025 Project-Buddy Group
