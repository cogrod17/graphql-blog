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
  author: User!
  createdAt: Date!
  updatedAt: Date!
}

type PaginatedPost{
  count: Float
  posts: [Post]!
  page: Float
  limit: Float
}

type PostByUser {
  user: User!
  posts: [Post]!
  count: Float
}


type RootQuery{
  getUser(email: String!): User
  getAllUsers: [User!]!
  getPosts(page: Float, limit: Float, keyword: String): PaginatedPost
  getPostsByUser(id: String): PostByUser
}


type RootMutation{
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteUser(userId: String!): User
    updateUser(userId: String!, email: String, bio: String): User!
    createPost(content: String!): Post
    updatePost(content: String!, postId: String!): Post
    deletePost(postId: String!): Post
}

schema{
  query: RootQuery
  mutation: RootMutation
}

`);
