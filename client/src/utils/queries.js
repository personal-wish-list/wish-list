import gql from 'graphql-tag';

export const QUERY_USER = gql`
{
    user {
    _id
    email
    friends{
      _id
      firstName
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
