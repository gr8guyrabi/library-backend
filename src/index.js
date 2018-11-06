const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 1,
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 2,
  },
  {
    id: 3,
    title: 'The Cave',
    author: 3,
  },
];

const users = [
  {
    id: 1,
    name: 'J.K. Rowling',
    address: 'U.K.',
    favoriteBook: 1,
  },
  {
    id: 2,
    name: 'Michael Crichton',
    address: 'USA',
    favoriteBook: 2,
  },
  {
    id: 3,
    name: 'Batman',
    address: 'Gotham',
    favoriteBook: 1,
  },
  {
    id: 4,
    name: 'Spiderman',
    address: 'New York',
    favoriteBook: 2,
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: User
  }

  type User {
    name: String
    address: String
    favoriteBook: Book
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    users(name: String): [User]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    users: (obj, args) =>
      users.filter(user => (args.name ? user.name === args.name : true)),
  },
  User: {
    favoriteBook: user => books.find(book => book.id === user.favoriteBook),
  },
  Book: {
    author: author => users.find(user => user.id === author.id),
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
