import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  repo: Repo;
  text: Scalars['String']['output'];
};

export type Language = {
  __typename?: 'Language';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
  register: User;
};


export type MutationCreateNewCommentArgs = {
  data: NewComment;
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type NewComment = {
  author: Scalars['String']['input'];
  repoId: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  languages: Array<Language>;
  login: User;
  repo: Repo;
  repos: Array<Repo>;
  reposRestricted: Array<RepoRestricted>;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryRepoArgs = {
  id: Scalars['String']['input'];
};


export type QueryReposArgs = {
  language?: InputMaybe<Scalars['String']['input']>;
};

export type Repo = {
  __typename?: 'Repo';
  comments?: Maybe<Array<Comment>>;
  id: Scalars['String']['output'];
  languages?: Maybe<Array<Language>>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoRestricted = {
  __typename?: 'RepoRestricted';
  comments?: Maybe<Array<Comment>>;
  id: Scalars['String']['output'];
  languages?: Maybe<Array<Language>>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
  repos?: Maybe<Array<Repo>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  role: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateNewCommentMutationVariables = Exact<{
  data: NewComment;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', id: number, author: string, createdAt: any, text: string, repo: { __typename?: 'Repo', id: string } } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, role: string, email: string, username: string } };

export type ReposQueryVariables = Exact<{
  language?: InputMaybe<Scalars['String']['input']>;
}>;


export type ReposQuery = { __typename?: 'Query', repos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, status: { __typename?: 'Status', id: number, label: string }, languages?: Array<{ __typename?: 'Language', id: number, label: string }> | null }>, languages: Array<{ __typename?: 'Language', id: number, label: string }> };

export type RepoQueryVariables = Exact<{
  repoId: Scalars['String']['input'];
}>;


export type RepoQuery = { __typename?: 'Query', repo: { __typename?: 'Repo', id: string, name: string, url: string, status: { __typename?: 'Status', id: number, label: string }, languages?: Array<{ __typename?: 'Language', id: number, label: string }> | null, comments?: Array<{ __typename?: 'Comment', author: string, createdAt: any, id: number, text: string }> | null } };

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'User', role: string, username: string, email: string, id: number } };


export const CreateNewCommentDocument = gql`
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
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    id
    role
    email
    username
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ReposDocument = gql`
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

/**
 * __useReposQuery__
 *
 * To run a query within a React component, call `useReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReposQuery({
 *   variables: {
 *      language: // value for 'language'
 *   },
 * });
 */
export function useReposQuery(baseOptions?: Apollo.QueryHookOptions<ReposQuery, ReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReposQuery, ReposQueryVariables>(ReposDocument, options);
      }
export function useReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReposQuery, ReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReposQuery, ReposQueryVariables>(ReposDocument, options);
        }
export function useReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ReposQuery, ReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ReposQuery, ReposQueryVariables>(ReposDocument, options);
        }
export type ReposQueryHookResult = ReturnType<typeof useReposQuery>;
export type ReposLazyQueryHookResult = ReturnType<typeof useReposLazyQuery>;
export type ReposSuspenseQueryHookResult = ReturnType<typeof useReposSuspenseQuery>;
export type ReposQueryResult = Apollo.QueryResult<ReposQuery, ReposQueryVariables>;
export const RepoDocument = gql`
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

/**
 * __useRepoQuery__
 *
 * To run a query within a React component, call `useRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRepoQuery({
 *   variables: {
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useRepoQuery(baseOptions: Apollo.QueryHookOptions<RepoQuery, RepoQueryVariables> & ({ variables: RepoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RepoQuery, RepoQueryVariables>(RepoDocument, options);
      }
export function useRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RepoQuery, RepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RepoQuery, RepoQueryVariables>(RepoDocument, options);
        }
export function useRepoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RepoQuery, RepoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RepoQuery, RepoQueryVariables>(RepoDocument, options);
        }
export type RepoQueryHookResult = ReturnType<typeof useRepoQuery>;
export type RepoLazyQueryHookResult = ReturnType<typeof useRepoLazyQuery>;
export type RepoSuspenseQueryHookResult = ReturnType<typeof useRepoSuspenseQuery>;
export type RepoQueryResult = Apollo.QueryResult<RepoQuery, RepoQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    role
    username
    email
    id
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;