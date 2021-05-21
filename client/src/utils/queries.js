import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    friends{
      firstName
      lastName
      email
    }
    wishList {
      _id
      name
    }
  }
}
`;
