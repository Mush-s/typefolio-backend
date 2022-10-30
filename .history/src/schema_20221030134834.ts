import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    frineds: [Friend!]!
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
  }

  type UserError {
    message: String!
  }

  type PostPayloadType {
    userErrors: [UserError!]!
    post: Post
  }

  type Post {
    length: Int!
    title: String!
    content: String!
    date: String!
  }

  type Friend {
    id: Int!
    name: String!
    relation: String!
  }
`;
