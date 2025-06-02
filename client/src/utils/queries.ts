import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      avatar
      email
      password
      skills
      username
    }
  }
`;

export const QUERY_USER = gql`
  query GetUserById($id: ID!) {
  getUserById(id: $id) {
    _id
    avatar
    email
    password
    skills
    username
  }
}
`;

export const QUERY_CURRENT_USER = gql`
  query {
    currentUser {
      _id
      avatar
      email
      password
      skills
      username
    }
  }
`;

export const QUERY_ALL_PROJECTS = gql`
query GetAllProjects {
  getAllProjects {
    _id
    createdAt
    description
    dimensions {
      height
      length
      width
    }
    dueDate
    materialIds
    title
    type
    userId
  }
}
`;

export const QUERY_PROJECTS_BY_USER = gql`
  query GetProjectByUser($userId: ID!) {
    getProjectByUser(userId: $userId) {
      _id
      createdAt
      description
      estimatedBudget
      dimensions {
        height
        length
        width
      }
      dueDate
      materialIds
      title
      type
      userId
    }
  }
`;

export const QUERY_ALL_TASKS = gql`
  query GetAllTasks {
  getAllTasks {
    _id
    completed
    dueDate
    notes
    projectId {
      _id
    }
    title
  }
}
`;

export const QUERY_SINGLE_TASK = gql`
  query GetTaskById($getTaskByIdId: ID!) {
  getTaskById(id: $getTaskByIdId) {
    _id
    completed
    dueDate
    notes
    projectId {
      _id
    }
    title
  }
}
`;

export const QUERY_ALL_BUDGET_ITEMS = gql`
  query GetAllBudgetItems {
  getAllBudgetItems {
    _id
    name
    estimatedCost
    actualCost
    quantity
  }
}
`;

export const QUERY_SINGLE_BUDGET_ITEM = gql`
  query GetBudgetItemById($getBudgetItemByIdId: ID!) {
  getBudgetItemById(id: $getBudgetItemByIdId) {
    _id
    name
    estimatedCost
    actualCost
    quantity
  }
}
`;

export const QUERY_ALL_MATERIALS = gql`
  query GetAllMaterials {
  getAllMaterials {
    _id
    category
    lastUpdated
    name
    priceUSD
    quantity
    unit
    unitCoverage {
      height_ft
      length_ft
      length_in
      sqft
      thickness_in
      weight_lb
      weight_ton
      width_ft
      width_in
    }
    vendor
  }
}
`;

export const QUERY_SINGLE_MATERIAL = gql`
  query GetMaterialById($getMaterialByIdId: ID!) {
  getMaterialById(id: $getMaterialByIdId) {
    _id
    category
    lastUpdated
    name
    priceUSD
    quantity
    unit
    unitCoverage {
      length_ft
      width_ft
      height_ft
      width_in
      length_in
      thickness_in
      weight_lb
      weight_ton
      sqft
    }
    vendor
  }
}
`;