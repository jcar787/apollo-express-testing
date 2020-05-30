const express = require('express');
const cors = require('cors');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(cors());

const users = {
  1: {
    id: 1,
    username: 'Another Jeff'
  },
  2: {
    id: 2,
    username: 'The Real Jeff'
  }
};

const schema = gql`
  type Query {
    users: [User!]
    me: User
    user(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => ({ username: 'Jeff C.' }),
    user: (parent, args) => users[args.id],
    users: (parent, args) => Object.values(users)
  }
};
const PORT = process.env.PORT || 9999;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log('Apollo server on PORT', PORT);
});
