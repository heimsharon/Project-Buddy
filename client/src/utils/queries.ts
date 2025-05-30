import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    userById(id: $id) {
      _id
      username
      email
      password
    }
  }
`;
