import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    friends: [Friend!]!
  }

  type Mutation {
    postCreate(
      length: Int!
      title: String!
      content: String!
      date: String!
      color: String!
    ): PostPayloadType!
    postUpdate(
      lengthId: Int!
      title: String
      content: String
      color: String
      done: Boolean
    ): PostPayloadType!
    postDelete(lengthId: Int!): PostPayloadType!
    friendCreate(name: String!, color: String!): FriendPayloadType!
    friendDelete(id: Int!): FriendPayloadType!
  }

  type UserError {
    message: String!
  }

  type PostPayloadType {
    userErrors: [UserError!]!
    post: Post
  }

  type FriendPayloadType {
    userErrors: [UserError!]!
    friend: Friend
  }
  type Post {
    length: Int!
    title: String!
    content: String!
    date: String!
    color: String!
    done: Boolean!
  }

  type Friend {
    id: Int!
    name: String!
    color: String!
  }
`;
