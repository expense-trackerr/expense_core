// const express = require('express');
// const { ApolloServer, gql } = require('apollo-server-express');
// // import db from './db/database';
// const db = require('../src/db/database');

// // GraphQL schema
// const schema = gql`
//     type Query {
//         categories(userUid: String!): {name: String}[]
//     }
// `;

// // Root resolver
// const resolvers = {
//   categories: async ({ userUid }: { userUid: string }) => {
//     try {
//       if (!userUid) {
//         throw new Error(
//           'User ID is not present. Ensure that you are logged in to the application'
//         );
//       }
//       const categories = await db.query(
//         'SELECT name FROM categories WHERE user_uid = ?',
//         [userUid]
//       );
//       return categories[0];
//     } catch (error) {
//       throw new Error((error as Error).message);
//     }
//   },
// };

// const server = new ApolloServer({
//   schema,
//   resolvers,
// });

// const app = express();
// server.applyMiddleware({ app });

// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// );
