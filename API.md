# 📡 Project-Buddy API Documentation

> **Note:**
> Project-Buddy uses a **GraphQL API**.
>
> -   Explore and test the API using [Apollo Studio](https://studio.apollographql.com/), [Insomnia](https://insomnia.rest/), or [Postman](https://www.postman.com/) with the `/graphql` endpoint.
> -   Ensure your server is running, your database is seeded, and you have a valid JWT token for authenticated operations.

---

## 🛡️ Authentication

All authenticated requests require a JWT token in the `Authorization` header:

```http
Authorization: Bearer <your-jwt-token>
```

---

## 🔑 Login & Sign Up

### Login

```graphql
mutation login($email: String!, $password: String!) {
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

**_Example Variables_**

```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

### Sign Up

```graphql
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
```

**_Example Variables_**

```json
{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123"
}
```

---

## 👤 Users

### Get Current User

```graphql
query {
    currentUser {
        _id
        username
        email
        createdAt
    }
}
```

### Get User By ID

```graphql
query getUserById($id: ID!) {
    getUserById(id: $id) {
        _id
        username
        email
        createdAt
    }
}
```

---

## 📁 Projects

### Get All Projects

```graphql
query {
    getAllProjects {
        _id
        title
        description
        type
        dimensions {
            length
            width
            height
        }
        estimatedBudget
        dueDate
        materialIds
        createdAt
        userId
    }
}
```

### Get Projects By User

```graphql
query getProjectByUser($userId: ID!) {
    getProjectByUser(userId: $userId) {
        _id
        title
        description
        type
        dimensions {
            length
            width
            height
        }
        estimatedBudget
        dueDate
        materialIds
        createdAt
        userId
    }
}
```

### Create Project

```graphql
mutation createProject(
    $title: String!
    $description: String
    $type: String
    $estimatedBudget: Float
    $dimensions: DimensionsInput
    $dueDate: String
    $materialIds: [ID]
    $userId: ID!
) {
    createProject(
        title: $title
        description: $description
        type: $type
        estimatedBudget: $estimatedBudget
        dimensions: $dimensions
        dueDate: $dueDate
        materialIds: $materialIds
        userId: $userId
    ) {
        _id
        title
        description
        estimatedBudget
        materialIds
        userId
    }
}
```

**_Sample Variables_**

```json
{
    "title": "Bookshelf",
    "description": "A wooden bookshelf",
    "type": "Furniture",
    "estimatedBudget": 150,
    "dimensions": { "length": 120, "width": 30, "height": 180 },
    "dueDate": "2025-07-01",
    "materialIds": ["mat1", "mat2"],
    "userId": "user1"
}
```

### Update Project

```graphql
mutation updateProject($id: ID!, $input: ProjectInput!) {
    updateProject(id: $id, input: $input) {
        _id
        title
        description
        estimatedBudget
        materialIds
        userId
    }
}
```

**_Sample Variables_**

```json
{
    "id": "proj1",
    "input": {
        "title": "Updated Bookshelf",
        "description": "Updated description"
    }
}
```

### Delete Project

```graphql
mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
        _id
        title
    }
}
```

**_Sample Variables_**

```json
{
    "id": "proj1"
}
```

---

### ProjectInput Type

| Field           | Type            | Description               |
| --------------- | --------------- | ------------------------- |
| title           | String!         | Project title             |
| description     | String          | Project description       |
| type            | String          | Project type/category     |
| dimensions      | DimensionsInput | { length, width, height } |
| estimatedBudget | Float           | Estimated budget in USD   |
| dueDate         | String          | Due date (ISO format)     |
| materialIds     | [ID]            | Array of Material IDs     |

---

## 🛒 Materials

### Get All Materials

```graphql
query {
    getAllMaterials {
        _id
        name
        category
        unit
        unitCoverage {
            length
            width
            height
        }
        quantity
        priceUSD
        vendor
    }
}
```

### Create Material

```graphql
mutation createMaterial(
    $name: String!
    $category: String!
    $unit: String!
    $unitCoverage: UnitCoverageInput
    $quantity: Int
    $priceUSD: Float
    $vendor: String
) {
    createMaterial(
        name: $name
        category: $category
        unit: $unit
        unitCoverage: $unitCoverage
        quantity: $quantity
        priceUSD: $priceUSD
        vendor: $vendor
    ) {
        _id
        name
        priceUSD
    }
}
```

**_Sample Variables_**

```json
{
    "name": "Pine Wood",
    "category": "Wood",
    "unit": "board",
    "unitCoverage": { "length": 120, "width": 30, "height": 2 },
    "quantity": 5,
    "priceUSD": 20,
    "vendor": "LumberYard"
}
```

### Update Material

```graphql
mutation updateMaterial($id: ID!, $input: MaterialInput!) {
    updateMaterial(id: $id, input: $input) {
        _id
        name
        priceUSD
    }
}
```

**_Sample Variables_**

```json
{
    "id": "mat1",
    "input": {
        "name": "Oak Wood",
        "priceUSD": 25
    }
}
```

### Delete Material

```graphql
mutation deleteMaterial($id: ID!) {
    deleteMaterial(id: $id) {
        _id
        name
    }
}
```

**_Sample Variables_**

```json
{
    "id": "mat1"
}
```

---

### MaterialInput Type

| Field        | Type              | Description           |
| ------------ | ----------------- | --------------------- |
| name         | String!           | Material name         |
| category     | String!           | Material category     |
| unit         | String!           | Unit of measurement   |
| unitCoverage | UnitCoverageInput | Coverage per unit     |
| quantity     | Int               | Quantity              |
| priceUSD     | Float             | Price per unit in USD |
| vendor       | String            | Vendor name           |

---

## 📝 Tasks

### Create Task

```graphql
mutation createTask(
    $projectId: ID!
    $title: String!
    $description: String
    $dueDate: String
    $completed: Boolean
) {
    createTask(
        projectId: $projectId
        title: $title
        description: $description
        dueDate: $dueDate
        completed: $completed
    ) {
        _id
        title
        completed
    }
}
```

**_Sample Variables_**

```json
{
    "projectId": "proj1",
    "title": "Cut wood",
    "description": "Cut all boards to size",
    "dueDate": "2025-06-20",
    "completed": false
}
```

### Update Task

```graphql
mutation updateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
        _id
        title
        completed
    }
}
```

**_Sample Variables_**

```json
{
    "id": "task1",
    "input": {
        "completed": true
    }
}
```

### Delete Task

```graphql
mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
        _id
        title
    }
}
```

**_Sample Variables_**

```json
{
    "id": "task1"
}
```

---

### TaskInput Type

| Field       | Type    | Description       |
| ----------- | ------- | ----------------- |
| title       | String! | Task title        |
| description | String  | Task description  |
| dueDate     | String  | Due date (ISO)    |
| completed   | Boolean | Completion status |

---

## 🤖 Chatbot

### Ask the Project-Buddy Chatbot

```graphql
mutation askChatbot($message: String!) {
    askChatbot(message: $message) {
        response
    }
}
```

**_Sample Variables_**

```json
{
    "message": "How do I estimate wood for a bookshelf?"
}
```

---

## 🚨 Error Handling

Errors are returned in the `errors` array of the GraphQL response.

**_Sample Error Response_**

```json
{
    "errors": [
        {
            "message": "Unauthorized",
            "extensions": {
                "code": "UNAUTHENTICATED"
            }
        }
    ],
    "data": null
}
```

**Common errors:**

-   401 Unauthorized: Invalid or missing JWT token.
-   400 Bad Request: Missing or invalid fields.
-   404 Not Found: Resource does not exist.
-   409 Conflict: Duplicate resource (e.g., email already registered).

---

## ℹ️ Notes

-   All mutations and queries requiring authentication expect a valid JWT in the Authorization header.
-   Use the GraphQL Playground or Apollo Studio for schema introspection and testing.
-   Replace variables in queries/mutations with your actual data.

© 2025 Project-Buddy Group
