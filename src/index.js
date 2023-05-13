const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const MovieAPI = require('./datasources/movieAPI');
const DirectorAPI = require('./datasources/DirectorAPI');
const Movie = require('./models/Movie');
const Director = require('./models/Director');

async function connectDB() {
  await mongoose.connect('mongodb+srv://kvdkrish:dOxuqy8e7s99F2tF@cluster0.0cwyobx.mongodb.net/movie-db', { useNewUrlParser: true, useUnifiedTopology: true });
}

async function startApolloServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(apolloServer, {
    context: async () => {
      return {
        dataSources: {
          movieAPI: new MovieAPI(Movie),
          directorAPI: new DirectorAPI(Director),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

connectDB()
  .then(() => console.log('Successfully connected to database!'))
  .catch((error) => console.log('Error', error));
startApolloServer();
