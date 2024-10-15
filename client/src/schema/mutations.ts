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
