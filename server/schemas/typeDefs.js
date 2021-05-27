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
    _id: ID
    firstName: String
    lastName: String
    username: String!
    email: String
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
    wishlist(_id: ID!): WishList
    username(username: String!): User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addFriend(friendId: ID!): User
    addWishList(name: String!, month: Int!, day: Int!, year: Int!): WishList
    updateWishList(_id: ID!, input: ItemInput!): WishList
    claimItem(wishListId: ID!, itemId: ID!): WishList
  }
`;

module.exports = typeDefs;
