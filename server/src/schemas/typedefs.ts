const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type BudgetItem {
        _id: ID!
        name: String!
        amount: Float!
        projectId: ID!
    }

    type Project {
        _id: ID!
        name: String!
        description: String!
        budgetId: ID!
        userId: ID!
    }

    type Material {
        _id: ID!
        name: String!
        quantity: Int!
        projectId: ID!
    }

    type Task {
        _id: ID!
        name: String!
        description: String!
        projectId: ID!
    }

    type Query {
        getAllUsers: [User]
        getUserById(id: ID!): User
        getAllBudgetItems: [BudgetItem]
        getBudgetItemById(id: ID!): BudgetItem
        getAllProjects: [Project]
        getProjectById(id: ID!): Project
        getAllMaterials: [Material]
        getMaterialById(id: ID!): Material
        getAllTasks: [Task]
        getTaskById(id: ID!): Task
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        updateUser(id: ID!, username: String, email: String, password: String): User
        deleteUser(id: ID!): User

        createBudgetItem(name: String!, amount: Float!, projectId: ID!): BudgetItem
        updateBudgetItem(id: ID!, name: String, amount: Float): BudgetItem
        deleteBudgetItem(id: ID!): BudgetItem

        createProject(name: String!, description: String!, budgetId: ID!, userId: ID!): Project
        updateProject(id: ID!, name: String, description: String, budgetId: ID, userId: ID): Project
        deleteProject(id: ID!): Project

        createMaterial(name: String!, quantity: Int!, projectId: ID!): Material
        updateMaterial(id: ID!, name: String, quantity: Int): Material
        deleteMaterial(id: ID!): Material

        createTask(name: String!, description: String!, projectId: ID!): Task
        updateTask(id: ID!, name: String, description: String, projectId: ID): Task
        deleteTask(id: ID!): Task
    }
`;

export default typeDefs;