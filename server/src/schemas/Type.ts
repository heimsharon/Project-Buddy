const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        skills: [String]
    }

    type BudgetItem {
        _id: ID!
        name: String!
        estimatedCost: Float!
        actualCost: Float
        quantity: Int!
    }

    type Dimensions {
        length: Float
        width: Float
        height: Float
    }

    input DimensionsInput {
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
        estimatedBudget: Float
        actualBudget: Float
        userId: ID!
        materialIds: [ID]
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

    input UnitCoverageInput {
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
        createUser(username: String!, email: String!, password: String!, skills: [String]): Auth
        login(email: String!, password: String!): Auth
        updateUser(id: ID!, username: String!, email: String!, password: String!, skills: [String]): User
        deleteUser(id: ID!): User

        createBudgetItem(
            name: String!,
            estimatedCost: Float!,
            quantity: Int!,
            projectId: ID!,
        ): BudgetItem
        updateBudgetItem(
            id: ID!,
            name: String,
            estimatedCost: Float,
            actualCost: Float,
            quantity: Int
            ): BudgetItem
        deleteBudgetItem(id: ID!): BudgetItem

        createProject(
            title: String!,
            description: String,
            type: String,
            dimensions: DimensionsInput,
            estimatedBudget: Float,
            dueDate: String,
            materialIds: [ID],
            userId: ID!
        ): Project
        updateProject(
            id: ID!,
            title: String!,
            description: String,
            type: String,
            dimensions: DimensionsInput,
            actualBudget: Float,
            dueDate: String,
            materialIds: [ID],
        ): Project
        deleteProject(id: ID!): Project

        createMaterial(
            name: String!, 
            category: String!, 
            unit: String!,
            unitCoverage: UnitCoverageInput,
            quantity: Int,
            priceUSD: Float,
            vendor: String
        ): Material
        updateMaterial(
            id: ID!, 
            name: String,
            category: String,
            unit: String,
            unitCoverage: UnitCoverageInput,
            quantity: Int,
            priceUSD: Float,
            vendor: String
        ): Material
        deleteMaterial(id: ID!): Material

        createTask(
            title: String!,
            notes: String!,
            projectId: ID!,
            dueDate: String
        ): Task
            updateTask(
            id: ID!,
            title: String,
            notes: String,
            projectId: ID,
            completed: Boolean
        ): Task
        deleteTask(id: ID!): Task
    }
`;

export default typeDefs;
