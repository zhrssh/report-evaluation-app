/**
 * This module acts as a component to control the creation,
 * read, update, and deletion of the documents in the collection.
 */
import Evaluation from "../models/Evaluations.js";

/**
 * Creates a new entry in the database.
 * @param {Object} data
 */
export async function create(data) {
	try {
		const result = await Evaluation.create(data);
		return result._id;
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieves all entries ids from the database.
 * @returns {Promise<Document>}
 */
export async function fetchIds() {
	try {
		const results = await Evaluation.find().exec();

		// Gets all the ids
		const ids = [];
		results.forEach((element) => {
			ids.push(element._id);
		});

		return ids;
	} catch (err) {
		throw err;
	}
}

/**
 * Retrieve an entry that satisfies the specified filter.
 * @param {Object} filter
 * @param {Object} projection
 * @returns {Array<Document>}
 */
export async function read(filter = {}, projection = null) {
	try {
		const result = await Evaluation.find(filter, projection).exec();
		return result;
	} catch (err) {
		throw err;
	}
}

/**
 * Updates a single entry from the database
 * @param {Object | String} _id
 * @param {Object} data
 * @returns {Document}
 */
export async function update(_id, data) {
	try {
		const result = await Evaluation.findOneAndUpdate({ _id }, data, {
			new: true,
		});

		return result;
	} catch (err) {
		throw err;
	}
}

/**
 * Delete evaluation by id
 * @param {*} _id
 * @returns
 */
export async function deleteOne(_id) {
	try {
		await Evaluation.findByIdAndDelete(_id).exec();
		return true;
	} catch (err) {
		throw err;
	}
}
