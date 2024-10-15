import { gql } from "@apollo/client";

export const GET_REPOS = gql`
  query Repos($language: String) {
    repos(language: $language) {
      id
      name
      url
      status {
        id
        label
      }
      languages {
        id
        label
      }
    }
    languages {
      id
      label
    }
  }
`;

export const GET_REPO = gql`
  query Repo($repoId: String!) {
    repo(id: $repoId) {
      id
      name
      url
      status {
        id
        label
      }
      languages {
        id
        label
      }
      comments {
        author
        createdAt
        id
        text
      }
    }
  }
`;
