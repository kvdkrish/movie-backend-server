const { MongoDataSource } = require("apollo-datasource-mongodb");

class MovieAPI extends MongoDataSource {
	async getMovies(args) {
		const { sort = {}, filter = {}, limit = 10, offset = 1 } = args;
		const filterData = Object?.fromEntries(
			Object?.entries(filter)?.map(([k, v]) => [
				k,
				Object?.fromEntries(
					Object?.entries(v)?.map(([k1, v1]) => [`$${k1}`, v1])
				),
			])
		);

		const response = await this.model
			.find({
				...(Object?.keys(filterData)?.length ? { ...filterData } : {}),
			})
			.collation({ locale: "en" })
			.sort({ ...sort })
			.skip((offset - 1) * limit)
			.limit(limit);

		const totalCount = await this.model
			.find({
				...(Object?.keys(filterData)?.length ? { ...filterData } : {}),
			})
			.countDocuments();

		return { items: [...response], totalCount };
	}

	async getMovie(id) {
		return await this.model.findById(id);
	}

	async createMovie(args) {
		return await this.model.create({ ...args });
	}

	async updateMovie(id, args) {
		return await this.model.findByIdAndUpdate(id, { ...args }, { new: true });
	}

	async deleteMovie(id) {
		return await this.model.findByIdAndRemove(id);
	}
}

module.exports = MovieAPI;
