import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      _id
    }
    token
  }
}
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $avatar: String,
    $username: String,
    $email: String,
    $password: String
  ) {
    updateUser(avatar: $avatar, username: $username, email: $email, password: $password) {
      _id
      avatar
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      _id
      username
      email
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject(
    $title: String!,
    $description: String,
    $type: String,
    $estimatedBudget: Float,
    $dimensions: DimensionsInput,
    $dueDate: String,
    $materialIds: [ID],
    $userId: ID!
  ) {
    createProject(
      title: $title,
      description: $description,
      type: $type,
      estimatedBudget: $estimatedBudget,
      dimensions: $dimensions,
      dueDate: $dueDate,
      materialIds: $materialIds,
      userId: $userId
    ) {
      _id
      title
      description
      type
      estimatedBudget
      dimensions {
        length
        width
        height
      }
      dueDate
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!,
    $title: String,
    $description: String,
    $type: String,
    $dimensions: DimensionsInput,
    $dueDate: String,
    $materialIds: [ID!]
  ) {
    updateProject(
      id: $id,
      title: $title,
      description: $description,
      type: $type,
      dimensions: $dimensions,
      dueDate: $dueDate,
      materialIds: $materialIds
    ) {
      _id
      title
      description
      type
      dimensions {
        length
        width
        height
      }
      dueDate
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      _id
      title
      description
      type
      dimensions {
        length
        width
        height
      }
      dueDate
    }
  }
`;

export const CREATE_MATERIAL = gql`
  mutation createMaterial(
    $name: String!,
    $category: String!,
    $unit: String!,
    $unitCoverage: UnitCoverageInput,
    $quantity: Int,
    $priceUSD: Float,
    $vendor: String
  ) {
    createMaterial(
      name: $name,
      category: $category,
      unit: $unit,
      unitCoverage: $unitCoverage,
      quantity: $quantity,
      priceUSD: $priceUSD,
      vendor: $vendor
    ) {
      _id
      name
      category
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
      quantity
      priceUSD
      vendor
    }
  }
`;

export const UPDATE_MATERIAL = gql`
  mutation updateMaterial(
    $id: ID!,
    $name: String,
    $category: String,
    $unit: String,
    $unitCoverage: UnitCoverageInput,
    $quantity: Int,
    $priceUSD: Float,
    $vendor: String
  ) {
    updateMaterial(
      id: $id,
      name: $name,
      category: $category,
      unit: $unit,
      unitCoverage: $unitCoverage,
      quantity: $quantity,
      priceUSD: $priceUSD,
      vendor: $vendor
    ) {
      _id
      name
      category
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
      quantity
      priceUSD
      vendor
    }
  }
`;

export const DELETE_MATERIAL = gql`
  mutation deleteMaterial($id: ID!) {
    deleteMaterial(id: $id) {
      _id
      name
      category
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
      quantity
      priceUSD
      vendor
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!,
    $notes: String,
    $projectId: ID!,
    $dueDate: String,
) {
    createTask(
      title: $title,
      notes: $notes,
      projectId: $projectId,
      dueDate: $dueDate
    ) {
      _id
      title
      notes
      dueDate
      projectId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: ID!,
    $title: String,
    $notes: String,
    $dueDate: String
  ) {
    updateTask(
      id: $id,
      title: $title,
      notes: $notes,
      dueDate: $dueDate
    ) {
      _id
      title
      notes
      dueDate
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      _id
      title
      notes
      dueDate
    }
  }
`;

export const CREATE_BUDGET_ITEM = gql`
  mutation createBudgetItem(
    $name: String!,
    $cost: Float!,
    $quantity: Int!,
    $notes: String,
    $projectId: ID!
  ) {
    createBudgetItem(
      name: $name,
      cost: $cost,
      quantity: $quantity,
      notes: $notes,
      projectId: $projectId
    ) {
      _id
      name
      cost
      quantity
      notes
      projectId
    }
  }
`;

export const UPDATE_BUDGET_ITEM = gql`
  mutation updateBudgetItem(
    $id: ID!,
    $name: String,
    $cost: Float,
    $quantity: Int,
    $notes: String
  ) {
    updateBudgetItem(
      id: $id,
      name: $name,
      cost: $cost,
      quantity: $quantity,
      notes: $notes
    ) {
      _id
      name
      cost
      quantity
      notes
    }
  }
`;

export const DELETE_BUDGET_ITEM = gql`
  mutation deleteBudgetItem($id: ID!) {
    deleteBudgetItem(id: $id) {
      _id
      name
      cost
      quantity
      notes
    }
  }
`;
