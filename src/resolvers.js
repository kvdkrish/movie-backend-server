const resolvers = {
	Query: {
		movies: (_, args, { dataSources }) => {
			return dataSources.movieAPI.getMovies(args);
		},
		directors: (_, __, { dataSources }) => {
			return dataSources.directorAPI.getDirectors();
		},
		movie: (_, { id }, { dataSources }) => {
			return dataSources.movieAPI.getMovie(id);
		},
		director: (_, { id }, { dataSources }) => {
			return dataSources.directorAPI.getDirector(id);
		},
	},
	Movie: {
		director: ({ directorId }, _, { dataSources }) => {
			return dataSources.directorAPI.getDirector(directorId);
		},
	},
	Mutation: {
		createMovie: (_, args, { dataSources }) => {
			return dataSources.movieAPI.createMovie(args);
		},
		updateMovie: (_, { id, ...rest }, { dataSources }) => {
			return dataSources.movieAPI.updateMovie(id, rest);
		},
		deleteMovie: (_, { id }, { dataSources }) => {
			return dataSources.movieAPI.deleteMovie(id);
		},
		createDirector: (_, args, { dataSources }) => {
			return dataSources.directorAPI.createDirector(args);
		},
		updateDirector: (_, { id, ...rest }, { dataSources }) => {
			return dataSources.directorAPI.updateDirector(id, rest);
		},
		deleteDirector: (_, { id }, { dataSources }) => {
			return dataSources.directorAPI.deleteDirector(id);
		},
	},
};

module.exports = resolvers;
