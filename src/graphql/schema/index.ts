import { buildSchema } from "graphql";

export const schema = buildSchema(`
scalar Date

type User {
  _id: ID!
  email: String!
  bio: String
  createdAt: Date!
  updatedAt: Date!
}

type Auth {
  _id: ID!
  email: String!
  bio: String
  token: String!
}

type Post {
  _id: ID!
  content: String!
  author_id: ID!
  createdAt: Date!
  updatedAt: Date!
}


type RootQuery{
  getUser(email: String!): User
  getAllUsers: [User!]!
}

type RootMutation{
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteUser(userId: String!): User
    updateUser(userId: String!, email: String, bio: String): User!
    createPost(content: String!): Post
}

schema{
  query: RootQuery
  mutation: RootMutation
}

`);
