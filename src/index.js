const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    id: 1,
    name: 'Harry Potter and the Chamber of Secrets',
    author: 1,
    tags: ['SciFi', 'Adventure'],
    status: 'Available',
  },
  {
    id: 2,
    name: 'Jurassic Park',
    author: 2,
    tags: ['SciFi'],
    status: 'Missing',
  },
  {
    id: 3,
    name: 'The Cave',
    author: 3,
    tags: ['Adventure'],
    status: 'Checked',
  },
];

const users = [
  {
    id: 1,
    firstName: 'J.K.',
    lastName: 'Rowling',
    address: 'U.K.',
    dob: '21/03/1980',
    interest: ['SciFi', 'Adventure'],
    isActive: true,
    favoriteBooks: [1],
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Crichton',
    address: 'USA',
    dob: '04/03/1970',
    interest: ['SciFi'],
    isActive: true,
    favoriteBooks: [1, 2],
  },
  {
    id: 3,
    firstName: 'Batman',
    lastName: '',
    address: 'Gotham',
    dob: '21/03/1988',
    interest: ['Adventure'],
    isActive: true,
    favoriteBooks: [1, 3],
  },
  {
    id: 4,
    firstName: 'Spiderman',
    lastName: 'Amazing',
    address: 'New York',
    dob: '23/07/1992',
    interest: ['SciFi', 'Adventure'],
    isActive: false,
    favoriteBooks: [1, 2, 3],
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    name: String
    author: User
    image: String
    tags: [Tags]
    Status: BookStatus
  }

  enum BookStatus {
    Checked
    Available
    Missing
  }

  enum Tags {
    SciFi
    Adventure
  }

  type User {
    firstName: String
    lastName: String
    address: String
    photo: String
    dob: String
    interest: [Tags]
    isActive: Boolean
    favoriteBooks: [Book]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    users(firstName: String): [User]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    users: (obj, args) =>
      users.filter(
        user => (args.firstName ? user.firstName === args.firstName : true)
      ),
  },
  User: {
    favoriteBooks: user =>
      books.filter(book => user.favoriteBooks.includes(book.id)),
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
