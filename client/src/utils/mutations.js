import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation addFriend($friendId: ID!) {
  addFriend(friendId: $friendId) {
    _id
    firstName
    lastName
    friends {
      _id
      firstName
      lastName
    }
  }
}`

export const ADD_WISHLIST = gql`
mutation addWishList($name: String!, $month: Int!, $day: Int!, $year: Int!, $items: [ItemInput]!){
  addWishList(name: $name, month: $month, day: $day, year: $year, items: $items){
    _id
    name
    month
    day
    year
    items{
      name
      link
      specialNote
      price
      isClaimed
    }
    }
  }`