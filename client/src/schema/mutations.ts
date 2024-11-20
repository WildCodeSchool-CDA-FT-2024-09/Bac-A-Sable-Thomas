import { gql } from "@apollo/client";

export const CREATE_NEW_COMMENT = gql`
  mutation CreateNewComment($data: NewComment!) {
    createNewComment(data: $data) {
      id
      author
      createdAt
      text
      repo {
        id
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      id
      role
      email
      username
    }
  }
`;
