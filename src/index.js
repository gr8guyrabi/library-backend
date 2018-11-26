const { prisma } = require('../generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    books(root, args, context) {
      return context.prisma.books({ where: { name: args.name } });
    },
    students(root, args, context) {
      return context.prisma.students({ where: { name: args.firstName } });
    },
    teachers(root, args, context) {
      return context.prisma.teachers({ where: { name: args.firstName } });
    },
  },
  Mutation: {
    createTeacher(root, args, context) {
      return context.prisma.createTeacher({
        firstName: args.firstName,
        lastName: args.lastName,
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma,
  },
});
server.start(() =>
  console.log(`🚀  Server is running on http://localhost:4000 `)
);
