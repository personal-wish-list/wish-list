const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type WishList {
    _id: ID!
    name: String!
    month: Int!
    day: Int!
    year: Int!
    items: [Item]
  }

  type User {
<<<<<<< HEAD
    _id: ID!
    firstName: String!
    lastName: String!
    username: String
    email: String!
=======
    _id: ID
    firstName: String
    lastName: String
    username: String!
    email: String
>>>>>>> 08026780fa13d21ac81f5a874b1f67309f0d0c8c
    friends: [User]
    lists: [WishList]
  }

  type Item {
    _id: ID!
    name: String!
    link: String!
    specialNote: String
    price: Int!
    isClaimed: Boolean
  }

  input ItemInput {
    name: String!
    link: String!
    specialNote: String
    price: Int!
    isClaimed: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    user: User
    users: [User]
    wishlists: [WishList]
    username(username: String!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addWishList(name: String!, month: Int!, day: Int!, year: Int!, items: [ItemInput]!): WishList
    updateWishList(_id: ID!, input: ItemInput!): WishList
  }
`;

module.exports = typeDefs;
