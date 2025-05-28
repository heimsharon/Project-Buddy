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
        cost: Float!
        quantity: Int!
        notes: String
    }

    type Dimensions {
        length: Float
        width: Float
        height: Float
    }

    type Project {
        _id: ID!
        title: String!
        description: String
        type: String
        dimensions: Dimensions
        userId: ID!
        materialId: ID
        createdAt: String!
        dueDate: String
    }

     type UnitCoverage {
        length_ft: Float
        width_ft: Float
        height_ft: Float
        width_in: Float
        length_in: Float
        thickness_in: Float
        weight_lb: Float
        weight_ton: Float
        sqft: Float
    }

    type Material {
        _id: ID!
        name: String!
        category: String!
        unit: String!
        unitCoverage: UnitCoverage
        quantity: Int
        priceUSD: Float
        vendor: String
        lastUpdated: String
    }

    type Task {
        _id: ID!
        projectId: Project!
        title: String!
        dueDate: String
        completed: Boolean!
        notes: String
    }

    type Auth {
        token: ID!
        user: User
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
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(id: ID!, name: String, email: String, password: String): User
        deleteUser(id: ID!): User

        createBudgetItem(name: String!, amount: Float!, projectId: ID!): BudgetItem
        updateBudgetItem(id: ID!, name: String, amount: Float): BudgetItem
        deleteBudgetItem(id: ID!): BudgetItem

        createProject(title: String!, description: String!, userId: ID!): Project
        updateProject(id: ID!, title: String, description: String): Project
        deleteProject(id: ID!): Project

        createMaterial(name: String!, category: String!, unit: String!): Material
        updateMaterial(id: ID!, name: String, quantity: Int): Material
        deleteMaterial(id: ID!): Material

        createTask(title: String!, description: String!, projectId: ID!): Task
        updateTask(id: ID!, title: String, description: String, projectId: ID): Task
        deleteTask(id: ID!): Task
    }
`;

export default typeDefs;
