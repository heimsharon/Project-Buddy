const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Auth {
        token: String
        user: User
    }
    
    type userInput {
        username: String!
        email: String!
        password: String!
    }
    

`;

export default typeDefs;