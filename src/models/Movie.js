const { Schema, model } = require("mongoose");

const Movie = new Schema({
	title: String,
	image: String,
	genre: String,
	description: String,
	ratings: Number,
	year: Number,
	casts: [
		{
			type: String,
		},
	],
	directorId: String,
});

module.exports = model("Movie", Movie);
