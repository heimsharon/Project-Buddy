# 📡 Project-Buddy API Documentation

> > **Note:**
> > Project-Buddy uses a **GraphQL API**.
> > You can explore and test the API using [Apollo Studio](https://studio.apollographql.com/), [Insomnia](https://insomnia.rest/), or [Postman](https://www.postman.com/) with the `/graphql` endpoint.
> > Make sure your server is running, your database is seeded with initial data, and you have a valid JWT token for authenticated operations.

---

## 🛡️ Authentication

All authenticated requests require a JWT token in the `Authorization` header:

---

### 🔑 Login Mutation

```graphql
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
```

---

### 🆕 Sign Up Mutation

```graphql
mutation Signup($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
```

---

## 📁 Projects

📄 Get All Projects

```graphql

getAllProjects {
                _id
                    title
                    description
                    type
                    dimensions { length width height }
                    estimatedBudget
                    dueDate
                    materialIds { _id name quantity priceUSD }
                    createdAt
            }
```

➕ Create Project

```graphql
mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
        _id
        title
        description
        estimatedBudget
        materialIds {
            name
            quantity
            priceUSD
        }
    }
}
```

📝 Update Project

```graphql
mutation UpdateProject($id: ID!, $input: ProjectInput!) {
    updateProject(_id: $id, input: $input) {
        _id
        title
        description
    }
}
```

❌ Delete Project

```graphql
mutation DeleteProject($id: ID!) {
    deleteProject(_id: $id) {
        _id
        title
    }
}
```

---

## 🛒 Materials

📄 Get All Materials

```graphql
query {
    getAllMaterials {
        _id
        name
        category
        priceUSD
    }
}
```

➕ Add Material to Project

```graphql
mutation AddMaterial($projectId: ID!, $materialInput: MaterialInput!) {
    addMaterialToProject(projectId: $projectId, materialInput: $materialInput) {
        _id
        materialIds {
            name
            quantity
            priceUSD
        }
    }
}
```

📝 Update Material

```graphql
mutation UpdateMaterial($materialId: ID!, $input: MaterialInput!) {
    updateMaterial(_id: $materialId, input: $input) {
        _id
        name
        quantity
        priceUSD
    }
}
```

❌ Delete Material

```graphql
mutation DeleteMaterial($materialId: ID!) {
    deleteMaterial(_id: $materialId) {
        _id
        name
    }
}
```

---

## 📝 Tasks

➕ Add Task to Project

```graphql
mutation AddTask($projectId: ID!, $taskInput: TaskInput!) {
    addTaskToProject(projectId: $projectId, taskInput: $taskInput) {
        _id
        tasks {
            _id
            title
            completed
        }
    }
}
```

📝 Update Task

```graphql
mutation UpdateTask($taskId: ID!, $input: TaskInput!) {
    updateTask(_id: $taskId, input: $input) {
        _id
        title
        completed
    }
}
```

❌ Delete Task

```graphql
mutation DeleteTask($taskId: ID!) {
    deleteTask(_id: $taskId) {
        _id
        title
    }
}
```

---

## 👤 Users

🙋‍♂️ Get Current User

```graphq

query {
  me {
    _id
    username
    email
    avatar
    createdAt
  }
}
```

---

## 🤖 Chatbot

💬 Ask the Project-Buddy Chatbot

```graphq

mutation AskChatbot($message: String!) {
  askChatbot(message: $message) {
    response
  }
}
```

---

## 🚨 Error Handling

Errors are returned in the errors array of the GraphQL response.
Common errors:
401 Unauthorized: Invalid or missing JWT token.
400 Bad Request: Missing or invalid fields.
404 Not Found: Resource does not exist.
409 Conflict: Duplicate resource (e.g., email already registered).

---

## ℹ️ Notes

All mutations and queries requiring authentication expect a valid JWT in the Authorization header.
Use the GraphQL Playground or Apollo Studio for schema introspection and testing.
Replace variables in queries/mutations with your actual data.

© 2025 Project-Buddy Group
