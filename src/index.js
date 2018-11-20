const { ApolloServer, gql } = require('apollo-server');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.

  type Book {
    id: ID!
    name: String
    author: User
    image: String
    tags: [Tag]
  }

  type Copy {
    id: ID!
    book: Book
    borrower: User
    status: CopyStatus
    quality: Quality
  }

  interface User {
    id: ID!
    firstName: String
    lastName: String
    address: String
    photo: String
    dob: String
  }

  type Student implements User {
    id: ID!
    firstName: String
    lastName: String
    address: String
    photo: String
    dob: String

    school: String
    isActive: Boolean
    interests: [Tag]
    favoriteBooks: [Book]
  }

  type Teacher implements User {
    id: ID!
    firstName: String
    lastName: String
    address: String
    photo: String
    dob: String
  }

  enum Quality {
    POOR
    GOOD
    EXCELLENT
  }

  enum CopyStatus {
    CHECKED
    AVAILABLE
    MISSING
  }

  type Tag {
    id: ID!
    name: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books(name: String): [Book]
    users(firstName: String): [User]
    tags(tag: String): [Book]
    interests(interest: String): [User]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
