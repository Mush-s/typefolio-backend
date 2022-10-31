import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    friends: [Friend!]!
  }

  type Mutation {
    postCreate(
      title: String!
      content: String!
      date: String!
      length: Int!
    ): PostPayloadType!
    postUpdate(lengthId: Int!, title: String, content: String): PostPayloadType!
    postDelete(lengthId: Int!): PostPayloadType!
    friendCreate(name: String!, relation: String!): FriendPayloadType!
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
    relation:String!
  }

  type Friend {
    id: Int!
    name: String!
    relation: String!
  }
`;
