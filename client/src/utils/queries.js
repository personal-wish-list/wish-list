import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    wishList {
      _id
      name
    }
  }
}
`;
