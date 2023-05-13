const { MongoDataSource } = require("apollo-datasource-mongodb");

class DirectorAPI extends MongoDataSource {
	async getDirectors() {
		return await this.model.find();
	}

	async getDirector(id) {
		return await this.model.findById(id);
	}

	async createDirector(args) {
		return await this.model.create({ ...args });
	}

	async updateDirector(id, args) {
		return await this.model.findByIdAndUpdate(id, { ...args });
	}

	async deleteDirector(id) {
		return await this.model.findByIdAndRemove(id);
	}
}

module.exports = DirectorAPI;
