const typeDefs = `
    type User {
        _id: ID!
        name: String!
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

    type ChatLog {
        _id: ID!
        projectId: ID!
        messages: [Message!]!
        createdAt: String!
    }

    type Message {
        sender: String!
        message: String!
        timestamp: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    
    input MessageInput {
        sender: String!
        message: String!
        timestamp: String!
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
        getChatLogById(id: ID!): ChatLog
        getChatLogsByProjectId(projectId: ID!): [ChatLog]
        getChatLogs: [ChatLog]
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): Auth
        updateUser(id: ID!, name: String, email: String, password: String): User
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

        createChatLog(projectId: ID!, messages: [MessageInput]!): ChatLog
        updateChatLog(id: ID!, messages: [MessageInput]!): ChatLog
        deleteChatLog(id: ID!): ChatLog
    }
`;

export default typeDefs;