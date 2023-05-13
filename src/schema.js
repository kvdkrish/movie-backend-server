const gql = require("graphql-tag");

const typeDefs = gql`
	scalar Date

	enum ModelSort {
		ASC
		DESC
	}

	input MoviesSort {
		ratings: ModelSort
		title: ModelSort
		year: ModelSort
	}

	input ModelIDInput {
		eq: ID
		ne: ID
	}

	input ModelTitleInput {
		regex: String
	}

	input ModelDirectorIDInput {
		eq: ID
	}

	input ModelRatingsInput {
		eq: Int
		ne: Int
		gte: Int
		lte: Int
	}

	input ModelYearInput {
		eq: Int
		ne: Int
		gte: Int
		lte: Int
	}

	input MoviesFilter {
		directorId: ModelDirectorIDInput
		title: ModelTitleInput
		ratings: ModelRatingsInput
		year: ModelYearInput
		_id: ModelIDInput
	}

	type MoviesList {
		items: [Movie!]!
		totalCount: Int
	}

	type Query {
		movies(
			sort: MoviesSort
			filter: MoviesFilter
			limit: Int
			offset: Int
		): MoviesList!
		directors: [Director!]!
		movie(id: ID!): Movie!
		director(id: ID!): Director!
	}

	type Movie {
		id: ID!
		title: String!
		image: String
		genre: String
		description: String
		ratings: Float
		year: Int!
		casts: [String]!
		director: Director!
	}

	type Director {
		id: ID!
		name: String!
		photo: String
		age: Int
	}

	type Mutation {
		createMovie(
			title: String!
			image: String
			genre: String!
			description: String
			ratings: Float!
			year: Int!
			casts: [String]
			directorId: ID!
		): Movie!
		updateMovie(
			id: ID!
			title: String
			image: String
			genre: String
			description: String
			ratings: Float
			year: Int
			casts: [String]
			directorId: ID
		): Movie!
		deleteMovie(id: ID!): Movie!
		createDirector(name: String!, age: Int, photo: String): Director!
		updateDirector(id: ID!, name: String, age: Int, photo: String): Director!
		deleteDirector(id: ID!): Director!
	}
`;

module.exports = typeDefs;
