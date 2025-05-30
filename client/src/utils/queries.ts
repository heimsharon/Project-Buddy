import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      _id
      email
      password
      skills
      username
    }
  }
`;

export const QUERY_USER = gql`
  query GetUserById($getUserByIdId: ID!) {
  getUserById(id: $getUserByIdId) {
    _id
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

export const QUERY_SINGLE_PROJECT = gql`
  query GetProjectById($getProjectByIdId: ID!) {
  getProjectById(id: $getProjectByIdId) {
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
    cost
    name
    notes
    quantity
  }
}
`;

export const QUERY_SINGLE_BUDGET_ITEM = gql`
  query GetBudgetItemById($getBudgetItemByIdId: ID!) {
  getBudgetItemById(id: $getBudgetItemByIdId) {
    _id
    cost
    name
    notes
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