const TypeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        skills: [String]
    }

    type Project {
        _id: ID
        name: String
        description: String
        type: String
        dimensions: [Dimensions]
        createdBy: [User]
        materials: [Material]
        checklist: [Task]
        budget: [BudgetItem]
        createdAt: String
        dueDate: String
    }

    type Dimensions {
        _id: ID
        length: Float
        width: Float
        height: Float
    }

    type Task {
        _id: ID
        title: String
        dueDate: String
        completed: Boolean
        notes: String
    }

    type BudgetItem {
        _id: ID
        projectId: [Project]
        material: [Material]
        name: String
        cost: Float
        quantity: Int
        notes: String
    }

    type Material {
        _id: ID
        name: String
        category: String
        unit: String
        unitCoverage: UnitCoverage
        priceUSD: Float
        vendor: String
        lastUpdated: String
        projectId: [Project]
    }

    type UnitCoverage {
        length_ft: Float
        width_ft: Float
        height_ft: Float
        sqft: Float
        quantity: Float
    }

    type ChatLog {
        _id: ID
        projectId: [Project]
        messages: [Message]
    }

    type Message {
        _id: ID
        sender: User
        content: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        getUser(_id: ID!): [User]
        getAllUsers: [User]
        getProject(_id: ID!): [Project]
        getAllProjects: [Project]
        getMaterial(_id: ID!): [Material]
        getAllMaterials: [Material]
        getTask(_id: ID!): [Task]
        getAllTasks: [Task]
        getBudgetItem(_id: ID!): [BudgetItem]
        getAllBudgetItems: [BudgetItem]
        getChatLog(_id: ID!): [ChatLog]
        getAllChatLogs: [ChatLog]
        getMessages(chatLogId: ID!): [Message]
        getallMessages: [Message]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        login(email: String!, password: String!): Auth
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User
        createProject(name: String!, description: String, type: String, dimensions: Dimensions): Project
        updateProject(_id: ID!, name: String, description: String, type: String, dimensions: Dimensions): Project
        deleteProject(_id: ID!): Project
        createTask(title: String!, dueDate: String, completed: Boolean, notes: String): Task
        updateTask(_id: ID!, title: String, dueDate: String, completed: Boolean, notes: String): Task
        deleteTask(_id: ID!): Task
        createBudgetItem(projectId: ID!, material: Material, name: String!, cost: Float!, quantity: Int!, notes: String): BudgetItem
        updateBudgetItem(_id: ID!, projectId: ID, material: Material, name: String, cost: Float, quantity: Int, notes: String): BudgetItem
        deleteBudgetItem(_id: ID!): BudgetItem
        createMaterial(name: String!, category: String!, unit: String!, unitCoverage: UnitCoverage, priceUSD: Float!, vendor: String): Material
        updateMaterial(_id: ID!, name: String, category: String, unit: String, unitCoverage: UnitCoverage, priceUSD: Float, vendor: String): Material
        deleteMaterial(_id: ID!): Material
        createChatLog(projectId: ID!, messages: [Message]): ChatLog
        updateChatLog(_id: ID!, projectId: ID, messages: [Message]): ChatLog
        deleteChatLog(_id: ID!): ChatLog
    }
`;

export default TypeDefs;
