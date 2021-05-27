import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
    user {
    _id
    username
    email
    friends{
      _id
      firstName
      lastName
      username
      lists {
        _id
        name
      }
    }
    lists{
      _id
      name
      items{
        _id
        name
        link
      }
    }
  }
}
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_USERNAME = gql`
  query ($username: String!) {
    username (username: $username) {
      _id
      username
      firstName
      lastName
      email
    }
  }
`