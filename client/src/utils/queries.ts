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
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;